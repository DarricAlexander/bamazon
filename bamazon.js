const mysql = require("mysql");

const inquirer = require("inquirer");

const conTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err){
        console.error("error connecting: " + err.stack);
    }
    getProducts();
});

function getProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        getItem(res);
    });
}

function getItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would like to buy?",
            validate: function(val){
                return !isNaN(val)
            }
        }
    ]).then(function(val){
        exitBamazon(val.choice);
        var choiceId = parseInt(val.choice);
        var product = verifyInventory(choiceId, inventory);
        if (product){
            getQuantity(product);
        }
        else {
            console.log("Item is not in the Bamazon inventory.");
            getProducts();
        }
    });
}

function getQuantity (products) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How man would you like to purchase?",
            validate: function(val) {
                return val > 0;
            }
        }
    ]).then(function(val) {
        var quantity = parseInt(val.quantity);
        if (quantity > products.stock_quantity){
            console.log("Sorry, Insufficent quantity!");
            getProducts();
        }
        else{
            purchaseProduct(products, quantity);
        }
    });
}

function purchaseProduct(products, quantity){
    connection.query("UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE item_id = ?",
    [quantity, products.item_id], 
    function (err, res){
        console.log("You have purchased " + quantity + " " + products.product_name);
        // verifyInventory();
    })
};

function verifyInventory(choiceId, inventory){
    for (var i = 0; i < inventory.length; i++) {
        if(inventory[i].item_id === choiceId){
            return inventory[i];
        }
    }
    return null;
}

function exitBamazon(choice){
    if (choice.toLowerCase() === "q") {
        console.log("Thank you for shopping with Bamazon!!");
        process.exit(0);
    }
}

