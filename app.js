// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const _=require("lodash");

//create app constant by using express
const app = express()

// basic setup, below the constant "app"
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));// to allow you grab the "body.newItem"
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = {
    name: String
}; //create schema

const Item = mongoose.model("Item", itemsSchema); // model based on schema

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

const listSchema = {
    name: String,
    items:[itemsSchema]
};

const List = mongoose.model("List", listSchema); //mongoose model for List


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

app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if (!err){
            if(!foundList){
                //create a new List
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                //Show an existing list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });
});

// to prevent undefined value of items, we create empty items array
app.post("/", function(req, res){

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save(); //to save in item DB collection
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    
    if (listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function (err){
        if(!err){
            console.log("Successfully deleted checked item");
            res.redirect("/");
        }   
    });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: checkedItemId}}}, function(err, foundList){
            if (!err){
                res.redirect("/" + listName);
            }
        });
}
});



//create the route for ABOUT page
app.get("/about", function (req, res){
    res.render("about");
}) 


//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

