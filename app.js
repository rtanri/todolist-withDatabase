// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")

//create app constant by using express
const app = express()

let items = ["Buy Food", "Cook Food", "Eat Food"];

let workItems = [];

// basic setup, below the constant "app"
app.set('view engine', 'ejs');

// to allow you grab the "body.newItem"
app.use(bodyParser.urlencoded({extended: true}));
// to set the express check Public folder for CSS and JS
app.use(express.static("public"));


//simple get route that will send user "hello" when user try to access home route
app.get("/", function(req, res){
    let today = new Date();
 
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    // When you render, you need to pass all object key&value together
    res.render("list", {listTitle: day, newListItems: items});
});

// to prevent undefined value of items, we create empty items array
app.post("/", function(req, res){

    // to check what captured in submit
    // console.log(req.body);
    let item = req.body.newItem;

    // use the value of listTitle in the form-button to redirect and push item to arrays
    if (req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
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

