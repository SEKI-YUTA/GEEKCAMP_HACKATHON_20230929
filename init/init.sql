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