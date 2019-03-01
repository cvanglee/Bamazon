# Bamazon
This application is a command line application.  When you run the bamazonCustomer.js file, it will show you a list of items that can be purchased and asks for the item number that you would like to buy. Then will ask for the quantity.  If there is enough quantity they it will give you a total and remove the quantity from the database.

The second part is to run the bamazonManager.js file.  This will give you a menu that you can choose from of 5 things and you choose one and it will display all products in the database, display items that are low in inventory, add to inventory, add a new product, or exit.

## Installing / Getting started

In order to run this application, you will have to clone the github repository listed under links.

### Initial Configuration

Before running the two javascript file, you will need to npm init and npm install mysql, inquirer, and easy-table. 

## Running the tests for bamazonCustomer

This bamazonCustomer application will show you a list of items that can be purchased and asks for which item you want to purchase. (See Below)

Item ID | Product Name   |  Department Name | Price  | Quantity in Stock
------- | ---------------|  --------------- | ------ | -----------------
1       | Hair Dryer     |  Personal Care   | 26.78  |                57
2       | Tooth Brush    |  Personal Care   | 5.74   |               200
3       | Hair Brush     |  Personal Care   | 16.98  |                80
4       | Diapers 24 pack|  Baby            | 9.87   |               101
5       | Formula        |  Baby            | 28.99  |                74
6       | Carseat        |  Baby            | 126.78 |                 5
7       | Shampoo        |  Personal Care   | 6.88   |               198
8       | Laptop         |  Computer        | 426.78 |                 3
9       | Ipad           |  Computer        | 376.99 |                30
10      | Desktop        |  Computer        | 188.56 |                32
11      | Bottle Warmer  |  Baby            | 24.77  |                 4
12      | Comb           |  Personal Care   | 2.89   |               154
13      | Conditioner    |  Personal Care   | 8.63   |               176
14      | Tablet         |  Computer        | 149.99 |                85

? What is the Item ID of the item you want to purchase?

Once you enter the Item ID you will be prompted for quantity. After a quantity is obtained, it will check to see if there is enough in inventory.  If there is enough, the quantity will be subtracted from inventory and a total will be displayed to the customer.  If there is not enough in inventory, it will show that there is not enough quantity to fullfill the order and ask if the customer would like to update their order.  If they want to update their order it will show the list of items and prompt for an item number and quantity again.



## BamazonCustomer scenario 1

Buying an item, but not confirming the purchase.

? What is the Item ID of the item you want to purchase? = 1
? How many would you like to purchase? = 2
? Are you sure you want to purchase 2 of Item ID 1, Hair Dryer? = No
? Would you like to update your order? = No

This will exit out of the application.

![Image of scenario 1](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario1.PNG)

## BamazonCustomer scenario 2

Buying an item, but not there is not enough in stock.

? What is the Item ID of the item you want to purchase? = 11
? How many would you like to purchase? = 5
? Are you sure you want to purchase 5 of Item ID 11, Bottle Warmer? = yes
Insufficient quantity to fullfill your order.
? Would you like to update your order? = No

This will exit out of the application.

![Image of scenario 2](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario2.PNG)

## BamazonCustomer scenario 3

Buying an item, but not there is not enough in stock.

? What is the Item ID of the item you want to purchase? = 2
? How many would you like to purchase? = 11
? Are you sure you want to purchase 11 of Item ID 2, Tooth Brush? = yes

This should display total, update the quantity in the database, and exit the application.

If you run it again, it will show the updated quantity for Item ID 2 as 189.

![Image of scenario 3](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario3.PNG)

## Running the tests for bamazonManager

This bamazonCustomer application will show you a main menu of tasks. (See Below)

What do you want to do? (Use arrow keys)

> View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product
  Exit

If you select View Products for Sale, a list of all items will be displayed and the main menu will display again.

If you select View Low Inventory, a list of all items with stock quantity less than 5 will be displayed and the main menu will display again.

If you select Add to Inventory, a prompt will ask for an item number and a quantity. Then update the quantity for that item number in the database.

If you select Add New Product, a prompt will ask for an Product Name, Department Name, Price, and Quantity. Then add the product to the database.

If you select Exit, you will exit the application.

## BamazonManager scenario 1

Select View Products for Sale:

![Image of scenario 4](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario4.PNG)

## BamazonManager scenario 2

Select View Low Inventory: 

![Image of scenario 5](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario5.PNG)

## BamazonManager scenario 3

Select Add to Inventory:

? What is the Item ID of the item you want to update inventory? 1
? Enter total quantity in inventory: 98
? Are you sure you want to update quantity 65 of Item ID 1 No

This will just bring you back to the main menu.

![Image of scenario 6](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario6.PNG)

## BamazonManager scenario 4

Select Add to Inventory:

? What is the Item ID of the item you want to update inventory? 1
? Enter total quantity in inventory: 94
? Are you sure you want to update quantity 94 of Item ID 1 yes


This will update the quantity in the database for Item ID 1 and then bring you back to the main menu.

If you View Products for Sale, you will see that the quantity for Item ID is updated to 94.


![Image of scenario 7](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario7.PNG)

## BamazonManager scenario 5

Select Add New Product:

? What is the Product Name? bobby pins
? What is the Department Name? Personal Care
? What is the Price? 1.98
? What is the Stock Quantity? 320
? Are you sure you want to add the following item?

Product Name: bobby pins
Department Name: Personal Care
Price: 1.98
Stock Quantity: 320

No

This won't update the database and will bring you back to the main menu.

![Image of scenario 8](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario8.PNG)

## BamazonManager scenario 6

Select Add New Product:

? What is the Product Name? Bobby Pins
? What is the Department Name? Personal Care
? What is the Price? 1.98
? What is the Stock Quantity? 320
? Are you sure you want to add the following item?

Product Name: bobby pins
Department Name: Personal Care
Price: 1.98
Stock Quantity: 320

Yes

This will update the database, display updated items in the database, and display the main menu.

![Image of scenario 9](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario9.PNG)

## BamazonManager scenario 7

Select Exit:

This will exit the application.

![Image of scenario 10](https://github.com/cvanglee/Bamazon/blob/master/images/Scenario10.PNG)

## Links

- Repository: https://github.com/cvanglee/Bamazon
