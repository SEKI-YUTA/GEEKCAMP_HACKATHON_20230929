package main

import (
	"context"
	"fmt"
	"main/common"
	"os"

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

func responseAllRestaurants(ctx *gin.Context) {
	restaurants := queryAllRestaurants()
	ctx.JSON(200, restaurants)
}