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
    var currentDay = today.getDay();
    var day = "";

    // checking what day of the week
    switch (currentDay){
        case 0:
            day = "Sunday";
        break;
        case 1:
            day = "Monday";
        break;
        case 2:
            day = "Tuesday";
        break;
        case 3:
            day = "Wednesday";
        break;
        case 4:
            day = "Thursday";
        break;
        case 5:
            day = "Friday";
        break;
        case 6:
            day = "Saturday";
        break;
        default:
            console.log("Error: Current day is equal to: " + currentDay);
    }

    // you need to create VIEW folder with List.ejs, you pass over the logic into the Template file
    res.render("list", {kindOfDay: day});

});

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

