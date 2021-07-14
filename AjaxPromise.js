let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
              //  console.log(methodType + " State Change Called at: " +showTime() + ". " + 
               //  xhr.readyState + " Status: " + xhr.status);

            if(xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                 resolve(xhr.responseText);
            }   else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                console.log("XHR Failed");
            }
            
        }
        xhr.open(methodType, url, async);
        if(data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to the server at: "+showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at : "+showTime() + "data: " +responseText);
    })
    .catch(error => console.log("Get Error status: "+JSON.stringify(error)));
console.log("Made GET AJAX Call to server at "+showTime());

const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: "+responseText)
    })
    .catch(error => console.log("DELETE Error Status: "+
                                                JSON.stringify(error)));

                                                
const postURL = "http://127.0.0.1:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};
 makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
    console.log("User Added: "+responseText)
    })
    .catch(error => console.log("POST Error Status: "+
                                            JSON.stringify(error)));   

