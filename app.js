// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")

//create app constant by using express
const app = express()

var items = ["Buy Food", "Cook Food", "Eat Food"];

// basic setup, below the constant "app"
app.set('view engine', 'ejs');

// to allow you grab the "body.newItem"
app.use(bodyParser.urlencoded({extended: true}));


//simple get route that will send user "hello" when user try to access home route
app.get("/", function(req, res){
    var today = new Date();
 
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    // you need to create VIEW folder with List.ejs, you pass over the logic into the Template file
    res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

