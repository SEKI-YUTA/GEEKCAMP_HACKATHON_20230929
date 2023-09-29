package main

import (
	"context"
	"fmt"
	"main/common"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
)

var pool *pgxpool.Pool

// postgres://ユーザー名:パスワード@ホスト名:ポート番号/DB名
// docker環境からDocker環境のDBにアクセスする場合はホスト名はサービス名になる
const DB_URL = "postgres://root:root@db:5432/restaurant_db"

func main() {
	connConfig, err := pgx.ParseConfig(DB_URL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse db config \n%s\n", err)
		os.Exit(1)
	}
	poolConfig, err := pgxpool.ParseConfig("")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse pool config \n%s\n", err)
		os.Exit(1)
	}
	poolConfig.ConnConfig = connConfig
	pool, err = pgxpool.ConnectConfig(context.Background(), poolConfig)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to connect to db \n%s\n", err)
		os.Exit(1)
	}
	defer pool.Close()

	router := gin.Default()
	router.GET("/restaurants", responseAllRestaurants)
	router.GET("/restaurants/categories", responseRestaurantCategories)
	router.GET("/restaurants/:id", responseSpecificRestaurants)
	router.GET("/restaurants/:id/menus", responseRestaurantAllMenu)
	router.GET("/restaurants/:id/menus/:menuid", responseRestaurantSpecificMenu)
	router.GET("/restaurants/:id/menus/yosan", responseMenuSetByPrice)

	router.Run()
}

func queryCategoryName(categoryId int, tableName string) string {
	name := ""
	pool.QueryRow(
		context.Background(),
		"SELECT name FROM " + tableName + " WHERE id = $1;",
		categoryId,
	).Scan(&name)
	fmt.Println("category name: ", name)
	return name
}

func queryAllRestaurants() []common.Restaurant {
	var category_id int
	rows, err := pool.Query(
		context.Background(),
		"SELECT id, email, name, address, description, category_id FROM restaurants;",
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to query restaurants \n%s\n", err)
	}
	restaurants := []common.Restaurant{}
	for rows.Next() {
		var r common.Restaurant
		err := rows.Scan(&r.Id,&r.Email, &r.Name, &r.Address, &r.Description, &category_id)
		categoryName := queryCategoryName(category_id, "restaurant_categories")
		r.Category = categoryName
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to scan data \n%s\n", err)
		}
		r.Category = categoryName
		restaurants = append(restaurants, r)
	}
	return restaurants
}

func queryAllRestaurantCategories() []common.Category {
	rows, err := pool.Query(
		context.Background(),
		"SELECT id, name FROM restaurant_categories;",
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to query restaurant categories \n%s\n", err)
	}
	categories := []common.Category{}
	for rows.Next() {
		var c common.Category
		err := rows.Scan(&c.Id, &c.Name)
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to scan data \n%s\n", err)
		}
		categories = append(categories, c)
	}
	return categories
}

func queryRestaurantById(id int) common.Restaurant {
	var restaurant common.Restaurant
	categoryId := 0
	pool.QueryRow(
		context.Background(),
		"SELECT id, email, name, address, description, category_id FROM restaurants WHERE id = $1;",
		id,
	).Scan(&restaurant.Id, &restaurant.Email, &restaurant.Name, &restaurant.Address, &restaurant.Description, &categoryId)
	categoryName := queryCategoryName(categoryId, "restaurant_categories")
	restaurant.Category = categoryName
	return restaurant
}

func queryMenusByRestaurantId(id int, lower int, higher int, keyword string) []common.Menu {
	var menus []common.Menu
	var category_id int
	sql := ""
	if(lower != 0 && higher != 0) {
		sql = "SELECT id, name, price, description, photo_url, category_id FROM menus WHERE restaurant_id = $1 AND price BETWEEN " + strconv.Itoa(higher) + " AND " + strconv.Itoa(lower)
	} else if(lower != 0) {
		sql = "SELECT id, name, price, description, photo_url, category_id FROM menus WHERE restaurant_id = $1 AND price <= " + strconv.Itoa(lower)
	} else if(higher != 0) {
		sql = "SELECT id, name, price, description, photo_url, category_id FROM menus WHERE restaurant_id = $1 AND price >= " + strconv.Itoa(higher)
	} else {
		sql = "SELECT id, name, price, description, photo_url, category_id FROM menus WHERE restaurant_id = $1"
	}
	fmt.Printf("sql: %s\n", sql)
	rows, err := pool.Query(
		context.Background(),
		sql + " AND name LIKE '%" + keyword + "%';",
		id,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to query menus \n%s\n", err)
		return menus
	}

	for rows.Next() {
		var m common.Menu
		err := rows.Scan(
			&m.Id, &m.Name, &m.Price, &m.Description, &m.PhotoUrl, &category_id,
		)
		categoryName := queryCategoryName(category_id, "menu_categories")
		m.Category = categoryName
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to scan data \n%s\n", err)
		}
		menus = append(menus, m)
	}

	return menus
}

func queryMenuByRestaurantIdAndMenuId(id int, menuid int) common.Menu {
	var menu common.Menu
	categoryId := 0
	err := pool.QueryRow(
		context.Background(),
		"SELECT id, name, price, description, photo_url, category_id " +
		"FROM menus WHERE restaurant_id = $1 AND id = $2;",
		id,
		menuid,
	).Scan(&menu.Id, &menu.Name, &menu.Price, &menu.Description, &menu.PhotoUrl, &categoryId)

	categoryName := queryCategoryName(categoryId, "menu_categories")
	menu.Category = categoryName

	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to query menus \n%s\n", err)
		return menu
	}

	return menu
}

func queryMenuSetByPrice(price int, restaurant_id int) []common.Menu {
	var menus []common.Menu
	var category_id int
	rows, err := pool.Query(
		context.Background(),
		"SELECT id, name, price, description, photo_url, category_id " +
		"FROM menus WHERE restaurant_id = $1 ORDER BY price ASC;",
		restaurant_id,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to query menus \n%s\n", err)
		return menus
	}
	priceSum := 0
	for rows.Next() {
		var m common.Menu
		err := rows.Scan(&m.Id, &m.Name, &m.Price, &m.Description, &m.PhotoUrl, &category_id)
		categoryName := queryCategoryName(category_id, "menu_categories")
		m.Category = categoryName
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to scan data \n%s\n", err)
		}
		priceSum += m.Price
		if(priceSum > price) {
			break
		}
		menus = append(menus, m)
	}
	return menus
}

func responseAllRestaurants(ctx *gin.Context) {
	restaurants := queryAllRestaurants()
	ctx.JSON(200, restaurants)
}

func responseRestaurantCategories(ctx *gin.Context) {
	var res common.CategoryResponse
	restaurantCategories := queryAllRestaurantCategories()
	res.CategoryName = "restaurant_categories"
	res.Categories = restaurantCategories
	ctx.JSON(200, res)
}

func responseSpecificRestaurants(ctx *gin.Context) {
	id, _ := strconv.Atoi(ctx.Param("id"))
	fmt.Println("id: ", id)
	restaurants := queryRestaurantById(id)
	ctx.JSON(200, restaurants)
}

func responseRestaurantAllMenu(ctx *gin.Context) {
	id, _ := strconv.Atoi(ctx.Param("id"))
	lower := 0
	higher := 0
	lower, _ = strconv.Atoi(ctx.Query("lower"))
	higher, _ = strconv.Atoi(ctx.Query("higher"))
	keyword := ctx.Query("keyword")
	fmt.Printf("lower: %d, higher: %d\n", lower, higher)
	fmt.Println("id: ", id)
	menus := queryMenusByRestaurantId(id, lower, higher, keyword)
	ctx.JSON(200, menus)
}

func responseRestaurantSpecificMenu(ctx *gin.Context) {
	id, _ := strconv.Atoi(ctx.Param("id"))
	menuid, _ := strconv.Atoi(ctx.Param("menuid"))
	fmt.Println("id: ", id)
	fmt.Println("menuid: ", menuid)
	menu := queryMenuByRestaurantIdAndMenuId(id, menuid)
	ctx.JSON(200, menu)
}

func responseMenuSetByPrice(ctx *gin.Context) {
	var res common.MenuSetResponse
	price, err := strconv.Atoi(ctx.Query("price"))
	if err != nil {
		res.Status = "failed"
		ctx.JSON(400, res)
		return
	}
	restaurant_id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		res.Status = "failed"
		ctx.JSON(400, res)
		return
	}
	// 2000円以下or-円の値が渡ってきた場合はエラー
	if price < 0 || price < 2000 {
		res.Status = "failed"
		ctx.JSON(400, res)
		return
	}
	res.Status = "ok"
	res.MenuSet = queryMenuSetByPrice(price, restaurant_id)
	ctx.JSON(200, res)
}
