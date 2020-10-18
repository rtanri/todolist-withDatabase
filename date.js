// jshint esversion:6
// Module.exports is a JS object
module.exports.getDate = getDate;

function getDate(){
    let today = new Date();
    
    let options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };

    let day = today.toLocaleDateString("en-US", options);

    return day;
}

// just an example with 2 functions and how to recall
module.exports.getDay = function (){
    let today = new Date();
    
    let options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };

    let day = today.toLocaleDateString("en-US", options);

    return day;
}

console.log(module);