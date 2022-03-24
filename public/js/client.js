// const {
//     read
// } = require("fs");

// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
        //console.log(currentElement, currentIndex, listObj);
        currentElement.addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                        this.parentNode.childNodes[i].innerHTML = "";
                        break;
                    }
                }
            }
        });
    });

    document.querySelector("#coursesJSON").addEventListener("click", function (e) {
        ajaxGET("/courses?format=json", function (data) {
            console.log("Before parsing", data);
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            console.log("Before parsing", parsedData);
            let str = "<ol>"
            for (let i = 0; i < parsedData.length; i++) {
                str += "<li>" + parsedData[i] + "</li>";
            }
            str += "</ol>";
            document.getElementById("courses-json").innerHTML = str;
        });
    });

    document.querySelector("#coursesHTML")



    ajaxGET("/courses?format=html", function (data) {
        // console.log(data);
        // since it's HTML, let's drop it right in
        document.getElementById("courses-html").innerHTML = data;
    });
});

// process the callback function
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}

// ready(doSomething);