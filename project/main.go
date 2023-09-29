package main

import (
	"fmt"
	// "os"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Hello, World!")
	router := gin.Default()
	router.GET("/restaurants", responseAllRestaurants)

	router.Run()
}

func responseAllRestaurants(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}