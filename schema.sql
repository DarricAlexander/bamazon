DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE product(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key (item_id)
);

SELECT * FROM product;

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Madden 19", "Video Games", 50.00, 1000),
("EA FIFA 19", "Video Games", 50.00, 1000),
("NBA 2K19", "Video Games", 50.00, 1000),
("Air Jordan", "shoes", 250.00, 10),
("Dodgers hat", "apparel", 35.00, 22),
("Lotion", "Beauty and Personal Care", 15.00, 10000),
("Tires", "Auto", 220.00, 500),
("Diapers", "Baby", 37.00, 20000),
("Fossil Watch", "Jewelery", 90.00, 19),
("Trampoline", "Outdoor", 350.00, 8);