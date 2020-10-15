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

    // checking if today is Saturday or Sunday
    if (currentDay === 6 || currentDay === 0){
        res.send("<h1>Yay it's Weekend!</h1>");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

