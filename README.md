# 環境構築

以下を実行

```
docker compose run --rm frontend-react-app npm i
docker compose up --build

docker exec -it api bash
# コンテナの中に入って
go mod tidy
go run main.go
```

# Reactのディレクトリ構成

[./frontend-react-app/README.md](./frontend-react-app/README.md) を参照

# エンドポイント

```
GET /restaurants・・・店舗一覧を取得する
GET /restaurants/:id・・・特定の店舗の情報を取得する
GET /restaurants/categories・・・店舗のカテゴリ一覧を取得する
GET /restaurants/{id}/menus・・・特定の店舗のメニュー一覧を取得する
GET /restaurants/:id/menus/:menuid・・・特定の店舗の特定のメニューを取得する
GET /restaurants/:id/menus/yosan・・・特定の店舗で予算内でのセットを返す
GET /menus/categories・・・メニューのカテゴリ一覧を取得する
POST /restaurants/:id/menus/add・・・メニューを追加する
POST /restaurants/:id/menus/edit・・・メニューを編集する
POST /restaurants/login・・・ログインする（店）
POST /restaurants/signup・・・新規登録する（店）
```

## 新規登録をする方法
method: POST

bodyに以下のようなjsonを入れることで新規登録ができます。
``` json
{
    "email": "menbo@gmail.com",
    "password": "123456",
    "name": "hogehoge",
    "phone_number": "853985930",
    "address": "fugafuga",
    "description": "hogefuga",
    "category_id": 1
}

登録する事ができれば次のようなレスポンスが帰ってきます。
``` json
{
    "message": "ok",
    "restaurant_id": 4
}
```

登録に失敗すると次のようなレスポンスが帰ってきます。
``` json
{"message":"failed to create restaurant"}
```

## ログインする方法
method: POST

bodyに以下のようなjsonを入れてください。
``` json
{
    "email": "menbo@gmail.com",
    "password": "123456"
}
```

ログインできれば以下のようなレスポンスが帰ってきます
``` json
{
    "message": "ok",
    "restaurant_id": 1
}
```

ログインできなかった場合は以下のようなレスポンスです
``` json
{
    "message": "unauthorized"
}
```

## メニューを検索する方法
/restaurants/{id}/menusに次のURLパラメーターを付与する事で検索ができます。
- lower・・・X円以下のメニューを検索する
- higher・・・X円以上のメニューを検索する
- keyword・・・メニュー名で検索する

## 店の検索
/restaurantsに次のURLパラメーターを付与する事で検索ができます。
- keyword・・・店名で検索する

## メニューを編集する方法
bodyに以下のようなjsonを入れてください。
``` json
{
    "id": 17,
    "name": "鮪",
    "price": 1000,
    "description": "hogehogehogehoge",
    "restaurant_id": 1,
    "category": "粉料理",
    "photo_url": "",
    "is_sold_out": false,
    "like_count": 0
}
```

## メニューを追加する方法
bodyに以下のようなjsonを入れてください。
``` json
{
    "name": "鯖",
    "price": 1000,
    "description": "hogehogehogehoge",
    "restaurant_id": 1,
    "category": "粉料理",
    "photo_url": "",
    "is_sold_out": false,
    "like_count": 0
}
```


## 実装予定のエンドポイント
自分実装する場合はGitHubのissueにアサインしてください。
- ~~POST /restaurants/yosan・・・bodyに予算をくっつけて送るとその予算で食べられるメニューを~~返す
- ~~GET /restaurants/{id}/menus/{id}・・・指定したメニューの情報を返す。~~
- ~~POST /restaurants/signup・・・新規登録する~~
- ~~POST /restaurants/{id}/menus/action・・・メニューの追加とか削除とか編集とか~~