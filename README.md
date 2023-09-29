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
POST /restaurants/login・・・ログインする（店）
POST /restaurants/signup・・・新規登録する（店）
```