DROP DATABASE IF EXISTS bamazonCustomerDB;

CREATE DATABASE bamazonCustomerDB;
-- Use the bamazonCustomer database
USE bamazonCustomerDB;
-- Created the table products
CREATE TABLE products (
-- Create item id column
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Create product name column
product_name VARCHAR(255),
-- Create department name column
department_name VARCHAR(255),
-- Create price column
price DECIMAL(10,2),
-- Create quantity in stock column
stock_quantity INT NOT NULL
);
-- Adding items into the database
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Hair Dryer","Personal Care",26.78,67);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Tooth Brush","Personal Care",5.74,200);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Hair Brush","Personal Care",16.98,80);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Diapers 24 pack","Baby",9.87,102);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Formula","Baby",28.99,74);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Carseat","Baby",126.78,20);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Shampoo","Personal Care",6.88,203);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Laptop","Computer",426.78,26);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Ipad","Computer",376.99,30);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Desktop","Computer",188.56,15);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUE ("Bottle Warmer","Baby",24.77,40);
