// EJS template

//requiring both packages: express and body-parser 
const express = require("express")
const bodyParser = require("body-parser")

//create app constant by using express
const app = express()

//simple get route that will send user "hello" when user try to access home route
app.get("/", function(req, res){
    var today = new Date();

    // checking if today is Saturday or Sunday
    if (today.getDay() === 6 || today.getDay() === 0){
        res.send("Yay it's Weekend!");
    } else {
        res.send("Boo! I have to work!");
    }
});

//listen in port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

