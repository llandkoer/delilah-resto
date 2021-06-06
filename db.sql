CREATE DATABASE deliah_resto;

USE delilah_resto;

CREATE TABLE `favorites` (
  `favorite_id` int primary key auto_increment not null unique,
  `user_id` int not null,
  `product_id` int not null
);

CREATE TABLE `products_orders` (
  `product_order_id` int primary key auto_increment not null unique,
  `product_id` int not null,
  `product_amount` int not null,
  `order_id` int not null
);

CREATE TABLE `products` (
  `product_id` int primary key auto_increment not null unique,
  `name` varchar (255) unique not null,
  `price` int not null,
  `photo` varchar (255) not null
);

CREATE TABLE `orders` (
  `order_id` int primary key auto_increment not null unique,
  `user_id` int not null,
  `order_state_id` int not null,
  `details` text not null,
  `final_cost` int not null,
  `payment_method_id` int not null,
  `address` varchar (255) not null,
  `time` timestamp not null
);

CREATE TABLE `users` (
  `user_id` int primary key auto_increment not null unique,
  `username` varchar (255) unique not null,
  `full_name` varchar (255) not null,
  `email` varchar (255) not null unique,
  `phone_number` int unsigned not null unique,
  `address` varchar (255) not null,
  `role_id` int not null,
  `password` varchar (255) not null
);

CREATE TABLE `roles` (
  `role_id` int primary key auto_increment not null unique,
  `name` varchar (255) not null unique
);

CREATE TABLE `payment_method` (
  `payment_method_id` int primary key auto_increment not null unique,
  `payment_method` varchar (255) not null unique
);

CREATE TABLE `order_state` (
  `order_state_id` int primary key auto_increment not null unique,
  `state` varchar (255) not null unique
);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE users
ADD FOREIGN KEY (role_id) REFERENCES roles(role_id);

ALTER TABLE favorites
ADD FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE favorites
ADD FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE products_orders
ADD FOREIGN KEY (order_id) REFERENCES orders(order_id);

ALTER TABLE products_orders
ADD FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE orders
ADD FOREIGN KEY (payment_method_id) REFERENCES payment_method(payment_method_id);

ALTER TABLE orders
ADD FOREIGN KEY (order_state_id) REFERENCES order_state(order_state_id);

INSERT INTO roles (name)
VALUES ('admin');

INSERT INTO roles (name)
VALUES ('client');

INSERT INTO order_state (state)
VALUES ('nuevo');

INSERT INTO order_state (state)
VALUES ('confirmado');

INSERT INTO order_state (state)
VALUES ('preparando');

INSERT INTO order_state (state)
VALUES ('enviando');

INSERT INTO order_state (state)
VALUES ('entregado');

INSERT INTO order_state (state)
VALUES ('cancelado');

INSERT INTO payment_method (payment_method)
VALUES ('efectivo');

INSERT INTO payment_method (payment_method)
VALUES ('tarjeta');

INSERT INTO users (username, full_name, email, phone_number, address, role_id, password)
VALUES ('admin', 'Admin Admin', 'admin@admin.com', 3203333333, 'IDK', 1, '$2a$10$..1rLuMT3PWI6a8LK7MXV.PPge82SspvMc5eJuB1rYCv8844Ycf1m');

INSERT INTO products (name, price, photo)
VALUES ('Soupe à l’oignon', 250, 'https://www.expatica.com/app/uploads/sites/5/2020/03/French-onion-soup.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Coq au vin', 350, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Coq-au-vin-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Cassoulet', 400, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Cassoulet.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Boeuf bourguignon', 500, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Boeuf-bourguignon.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Chocolate soufflé', 150, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Chocolate-souffle%CC%81%EF%BB%BF-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Flamiche', 300, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Flamiche-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Confit de canard', 350, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Confit-de-canard-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Salade Niçoise', 250, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Salade-Nic%CC%A7oise-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Ratatouille', 550, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Ratatouille-1024x683.jpg');

INSERT INTO products (name, price, photo)
VALUES ('Tarte Tatin', 400, 'https://www.expatica.com/app/uploads/sites/5/2020/03/Tarte-tatin.jpg');