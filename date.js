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

module.exports.getDay = getDay;

// just an example with 2 functions and how to recall
function getDay(){
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