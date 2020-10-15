// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")

//create app constant by using express
const app = express()

// basic setup, below the constant "app"
app.set('view engine', 'ejs');


//simple get route that will send user "hello" when user try to access home route
app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDate();
    var day = "";

    // checking if today is Saturday or Sunday
    if (currentDay === 6 || currentDay === 0){
        day = "Weekend";
    } else {
        day = "Weekday";
    }

    // you need to create VIEW folder with List.ejs, you pass over the logic into the Template file
    res.render("list", {kindOfDay: day});

});

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

