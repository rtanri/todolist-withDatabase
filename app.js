// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

//create app constant by using express
const app = express()

// basic setup, below the constant "app"
app.set('view engine', 'ejs');

// to allow you grab the "body.newItem"
app.use(bodyParser.urlencoded({extended: true}));
// to set the express check Public folder for CSS and JS
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = {
    name: String
};

// model based on schema
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];



// Item.deleteMany({name:"Hit the + button to add new item."}, function (err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Successfully delete");
//         mongoose.connection.close();
//     }
    
// })

//create route for HOME page
app.get("/", function(req, res){

    
    Item.find({}, function(err, foundItems){

        if (foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Succesfully Added all items to DB");
                }}
            );
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    });
});

// to prevent undefined value of items, we create empty items array
app.post("/", function(req, res){

    // to check what captured in submit
    // console.log(req.body);
    const item = req.body.newItem;

    // use the value of listTitle in the form-button to redirect and push item to arrays
    if (req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

//create route for WORK page
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

//create the route for ABOUT page
app.get("/about", function (req, res){
    res.render("about");
}) 

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

