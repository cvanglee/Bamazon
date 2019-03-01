var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// Menu Select function
function menuScreen(){
    inquirer.prompt([
        {
            type: "list",
            message: "\n\nWhat do you want to do?\n",
            name: "menuDo",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Exit"]
        }

    ]).then(function(choice){
        // console.log(choice);
        if(choice.menuDo === "View Products for Sale"){
            listProducts();
        }
        else if(choice.menuDo === "View Low Inventory"){
            lowInventory();
        }
        else if(choice.menuDo === "Add to Inventory"){
            addInventory();
        }
        else if(choice.menuDo === "Add New Product"){
            addProduct();
        }
        else if(choice.menuDo === "Exit"){
            connection.end();
        }
    });
}
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonCustomerDB"
});
var data =[];
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
  });

//function to format the data to display to the screen
function tabular(res){
    for (let i=0;i<res.length;i++){
        data.push(res[i]);
    }
    // using easy-table to format output
    var output = new Table;
    data.forEach(function(product){
        output.cell("Item ID",product.item_id)
        output.cell("Product Name",product.product_name)
        output.cell("Department Name",product.department_name)
        output.cell("Price",product.price)
        output.cell("Quantity in Stock",product.stock_quantity, Table.number(0))
        output.newRow()
    })
    console.log(output.toString());
}
 // function that pulls from mysql and displays all items to the screen 
function listProducts(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        // putting the response into the data array
        data=[];
        tabular(res);  
        menuScreen();
    });
}
// shows all the inventory that is less than 5 in stock quantity
function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",function(err,res){
        if (err) throw err;
        // putting the response into the data array
        data=[];
        tabular(res);
        menuScreen();
    });    
}
// Add inventory using the pickItem function and updateQuantity function
function addInventory(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        data=[];
        tabular(res);
        pickItem();
    });   
}
// Add a product to the database
function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Product Name?",
            name: "prodName"
        },
    
        {
            type: "input",
            message: "What is the Department Name?",
            name: "deptName"
        },
        {
            type: "input",
            message: "What is the Price?",
            name: "prodPrice"
        },
        {
            type: "input",
            message: "What is the Stock Quantity?",
            name: "stockQuantity"
        }
    ]).then(function(itemUpdate){
        inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure you want to add the following item?\n" + 
                "\nProduct Name: " + itemUpdate.prodName +
                "\nDepartment Name: " + itemUpdate.deptName +
                "\nPrice: " + itemUpdate.prodPrice + 
                "\nStock Quantity: " + itemUpdate.stockQuantity + "\n\n",
                name: "orderConfirm"
            }
    
        ]).then(function(aConfirm){
            // if yes to update order
            // console.log(oConfirm.orderConfirm);
            if(aConfirm.orderConfirm===true){
                connection.query("INSERT INTO products SET ?",
                {
                    product_name: itemUpdate.prodName,
                    department_name: itemUpdate.deptName,
                    price: itemUpdate.prodPrice,
                    stock_quantity: itemUpdate.stockQuantity
                },
                function(err,res){
                    if (err) throw err;  
                });
                connection.query("SELECT * FROM products",function(err,res){
                    if (err) throw err;
                    // putting the response into the data array
                    data=[];
                    tabular(res);
                    menuScreen();
                });   
            }
            else {
                menuScreen();
            }
        });

    }); 
    
}

// Pick the item and quantity you want to update
function pickItem(){
    let start = data[0].item_id;
    let end = data[data.length-1].item_id;
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Item ID of the item you want to update inventory?",
            name: "itemID",
            validate: function(input){
                if (isNaN(input)===false){
                    if (input>=start && input<=end){
                        return true;
                    }
                    return false;
                }
            }
        },
    
        {
            type: "type",
            message: "Enter total quantity in inventory:",
            name: "quantity",
            validate: function(input){
                if (isNaN(input)===false){
                    return true;
                }
            }
        }
    ]).then(function(itemUpdate){
        inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure you want to update quantity "+itemUpdate.quantity+" of Item ID "+itemUpdate.itemID,
                name: "orderConfirm"
            }
    
        ]).then(function(pConfirm){
            // if yes to update order
            // console.log(oConfirm.orderConfirm);
            if(pConfirm.orderConfirm===true){
                let item = itemUpdate.itemID;
                let quantity = itemUpdate.quantity;
                updateQuantity(quantity,item); 
                menuScreen();
            }
            else {
                menuScreen();
            }
        });

    }); 
}
// updates the quantity in the database
function updateQuantity(quantity,itemID){
    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: quantity
        },
        {
            item_id: itemID
        }
    ],
    function(err,res) {
        
});

}
menuScreen();