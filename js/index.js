function clearLocalStorage() {
    localStorage.removeItem("grocery-saad0033");
}



var myList = [];

document.addEventListener("DOMContentLoaded", function (ev) {
    //this runs when the page loads
    backgroundHeight();

    if (localStorage.getItem("grocery-saad0033")) {
        myList = JSON.parse(localStorage.getItem("grocery-saad0033"));
        //convert from String to Array
    }

    showList();

    document.querySelector("#btnAdd").addEventListener("click", function (ev) {
        ev.preventDefault();
        var newItem = document.querySelector("#item");
        if ($('#item').val() != "") {
            myList.push({
                "state": 0,
                "foodItem": newItem.value
            });
            clearInput();
        }
        localStorage.setItem("grocery-saad0033", JSON.stringify(myList));
        //convert from Array to String.
        showList();
        
        return false;
    });

});

function clearInput() {
        $('#item').val("");
        $('#item').attr("placeholder", "Anything Else?");
}

function removeItem(ev) {
    var txt = ev.currentTarget.nextSibling.firstChild.nodeValue;
    for (var i = 0; i < myList.length; i++) {
        if (myList[i].foodItem == txt) {
            //found the match
            myList.splice(i, 1);
        }
    }

    localStorage.setItem("grocery-saad0033", JSON.stringify(myList));
    showList();
}

function markPurchased(ev) {
    var txt = ev.currentTarget.firstChild.nodeValue;

    for (var i = 0; i < myList.length; i++) {
        if (myList[i].foodItem == txt) {
            //found the match
            myList[i].state = 1;
        }

        localStorage.setItem("grocery-saad0033", JSON.stringify(myList));
        showList();
    }
}

function showList() {
    var output = document.querySelector(".output");
    output.innerHTML = "";
    for (var i = 0; i < myList.length; i++) {

        var div = document.createElement("div");
        var closeButton = document.createElement("button");
        closeButton.setAttribute('class', 'closeButton');


        var p = document.createElement("p");
        p.innerHTML = myList[i].foodItem;

        output.appendChild(div);
        div.appendChild(closeButton);
        div.appendChild(p);
        

        if (myList[i].state == 1) {
            div.classList.toggle('purchased')
        }
        //console.log($('#item').val());
        closeButton.addEventListener("click", removeItem);
        p.addEventListener("click", markPurchased);
    }
}

function backgroundHeight() {
    var windowHeight = $(window).height();
    var footerHeight = $('footer').height();
    var windowMinusFooter = windowHeight - footerHeight;
    var remainderDivideFour = windowMinusFooter / 4;

    $('.img').css('height', remainderDivideFour);

    var navHeight = $('nav').height();

    $('.output').css('top', navHeight + 1);
}