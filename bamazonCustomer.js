var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
// make a connection to the SQL database
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
    listProducts();
  });
 // function that pulls from mysql and displays the items to the screen 
function listProducts(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        // putting the response into the data array
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
        pickItem();
    });
}

    // function that asks the user for what item they want to buy
function pickItem(){
    let start = data[0].item_id;
    let end = data[data.length-1].item_id;
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Item ID of the item you want to purchase?",
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
            message: "How many would you like to purchase?",
            name: "quantity",
            validate: function(input){
                if (isNaN(input)===false){
                    return true;
                }
            }
        }
    ]).then(function(itemPurchase){
        inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure you want to purchase "+itemPurchase.quantity+" of Item ID "+itemPurchase.itemID+", "+data[itemPurchase.itemID-1].product_name+"?",
                name: "orderConfirm"
            }
    
        ]).then(function(oConfirm){
            // if yes to update order
            if(oConfirm.orderConfirm===true){
                checkItem(itemPurchase); 
            }
            else {
                updateorder();
            }
        });
    });
}

function checkItem(itemPurchase){
    let index = itemPurchase.itemID-1;
    let buying = parseInt(itemPurchase.quantity);
    let dbQuantity = parseInt(data[index].stock_quantity);
    if (dbQuantity > buying){
        let qleft = data[index].stock_quantity-itemPurchase.quantity;
        let total = buying*data[index].price;
        console.log("Your total is $",total.toFixed(2));
        updateQuantity(qleft,itemPurchase.itemID);
    }
    else {
        console.log("Insufficient quantity to fullfill your order.");
        updateorder();

    }
    
}

function updateorder(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to update your order?",
            name: "orderUpdate"
        }

    ]).then(function(update){
        // if yes to update order
        if(update.orderUpdate===true){
            data=[];
            listProducts();
        }
        // if no then exits
        else {
            console.log("Thank you for looking.")
            connection.end();
        }
    });
}

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
        connection.end();
});

}
