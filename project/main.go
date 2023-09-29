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