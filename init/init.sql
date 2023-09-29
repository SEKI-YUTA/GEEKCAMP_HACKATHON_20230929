CREATE DATABASE restaurant_db;
\c restaurant_db

CREATE TABLE restaurant_categories (
    id SERIAL not null,
    name VARCHAR(255) not null,
    primary key(id)
);
CREATE TABLE menu_categories (
    id SERIAL not null,
    name VARCHAR(255) not null,
    primary key(id)
);
INSERT INTO restaurant_categories (name) VALUES
('居酒屋'),
('カレー屋'),
('ラーメン屋'),
('中華料理屋'),
('イタリアン'),
('焼肉屋'),
('韓国料理屋'),
('洋食屋'),
('和食屋'),
('その他');
INSERT INTO menu_categories (name) VALUES
('肉料理'),
('魚料理'),
('野菜料理'),
('粉料理'),
('アルコール'),
('デザート'),
('その他');

CREATE TABLE restaurants (
    id SERIAL not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    name VARCHAR(255) not null,
    address VARCHAR(255) DEFAULT '',
    description VARCHAR(1000) DEFAULT '',
    category_id INTEGER not null,
    phone_number VARCHAR(255) DEFAULT '',
    foreign key(category_id) references restaurant_categories(id),
    primary key(id)
);

CREATE TABLE menus (
    id SERIAL not null,
    name VARCHAR(255) not null,
    price INTEGER not null,
    description VARCHAR(1000) DEFAULT '',
    photo_url VARCHAR(255) DEFAULT '',
    is_sold_out BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    category_id INTEGER not null,
    restaurant_id INTEGER not null,
    foreign key(category_id) references menu_categories(id),
    foreign key(restaurant_id) references restaurants(id),
    primary key(id)
);

INSERT INTO restaurants (email, password, name, phone_number, address, description, category_id)
VALUES (
    'menbo@gmail.com',
    '123456',
    'めん坊',
    '072XXXXXX',
    '〒530-0022 大阪府大阪市北区浪花町５−３',
    'やすくておいしくて居酒屋らしい居酒屋',
    1
), 
(
    'curry@gmail.com',
    '123456',
    '熟爛 欧風カレー 伽麗伊屋',
    '090XXXXXXX',
    '〒542-0012 大阪府大阪市中央区谷町７丁目１−３９ 新谷町第２ビル 1F',
    '値段が手頃でおいしいカレー屋',
    2
),
(
    'saika@gmail.com',
    '123456',
    'ラーメン彩華',
    '080XXXXXXX',
    '〒543-0001 大阪府大阪市天王寺区上本町５丁目３−１８',
    '野菜が結構入ってるラーメン屋',
    3
);


INSERT INTO menus (name, price, description,  restaurant_id, category_id)
VALUES (
    '肉じゃが',
    300,
    '俺の推し',
    1,
    1
),
(
    '刺身７種盛り合わせ',
    780,
    'コスパ最高！！',
    1,
    2
),
(
    'チンジャオロース',
    360,
    '中華もおいしい',
    1,
    1
),
(
    'うなきゅう',
    500,
    '',
    1,
    7
),
(
    '生姜焼き',
    760,
    '中華もおいしい',
    1,
    1
),
(
    'お好み焼き',
    500,
    '',
    1,
    4
),
(
    'たこ焼き',
    500,
    '',
    1,
    4
);