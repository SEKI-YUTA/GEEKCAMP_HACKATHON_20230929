package common

type Restaurant struct {
	Id      int    `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Address string `json:"address"`
	Description string `json:"description"`
	Category string `json:"category"`
}

type Menu struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Price int `json:"price"`
	Description string `json:"description"`
	RestaurantId int `json:"restaurant_id"`
	PhotoUrl string `json:"photo_url"`
	Category string `json:"category"`
	IsSoldOut bool `json:"is_sold_out"`
	LikeCount int `json:"like_count"`
}

type Category struct {
	Id int `json:"id"`
	Name string `json:"name"`
}

type CategoryResponse struct {
	CategoryName string `json:"category_name"`
	Categories []Category `json:"categories"`
}

type MenuSetResponse struct {
	Status string `json:"status"`
	Yosan int `json:"yosan"`
	MenuSet []Menu `json:"menu_set"`
}

type LoginPost struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type SignupPost struct {
	Id      int    `json:"id"`
	Email   string `json:"email"`
	Password string `json:"password"`
	Name    string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Address string `json:"address"`
	Description string `json:"description"`
	CategoryId int `json:"category_id"`
}

// 編集するときにしかつかわんみたいな名前やけどメニューを追加するときにも使う
// type ModifyMenuPost struct {
// 	Id int `json:"id"`
// 	Name string `json:"name"`
// 	Price int `json:"price"`
// 	Description string `json:"description"`
// 	PhotoUrl string `json:"photo_url"`
// 	CategoryId string `json:"category_id"`
// 	IsSoldOut bool `json:"is_sold_out"`
// 	LikeCount int `json:"like_count"`
// }