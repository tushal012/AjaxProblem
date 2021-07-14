let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    const xhr = new XMLHttpRequest();

    //Registering the Event Listener
    //To know what are the things going to happen when the state changes
    xhr.onreadystatechange = function() {
        //  console.log(methodType + " State Change Called at: " +showTime() + ". " + 
        //          xhr.readyState + " Status: " + xhr.status);

        // readyState = 4; When the http connection is closed & the status code is 200, the only do a callback i.e getUserDetails()
        if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
            callback(xhr.responseText);
        } else if (xhr.status >= 400) {
            console.log("Handle 400 Client Error or 500 Server Error at: " +showTime());
        }
    }
    }

    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+ " request sent to the server at: " +showTime());
}


const getURL =  "http://127.0.0.1:3000/employees/5";
function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " +data);
}

makeAJAXCall("GET", getURL, getUserDetails, true);
//executes before the state change activities
console.log("Made GET AJAX call to Server at " +showTime());

const deleteURL = "http://127.0.0.1:3000/employees/4";
function userDeleted(data) {
    console.log("User Deleted at: " + showTime() + " data: " +data);
}
// false - to make the POST call execute only after DELETE
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX call to Server at " +showTime());

// id is automatically created by the server... so no need to pass the id
const postURL = "http://127.0.0.1:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};
function userAdded(data) {
    console.log("User Added at: " + showTime() + " data: " +data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX call to Server at " +showTime());