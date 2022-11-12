class Controller {
    constructor() {
        //these correspond to nav menu buttons.
        this.currentWindow = -1;

        this.windowColours = ["#f6d676", "#edcb66", "#f0da99", "#c4b27c"];
        this.windowColour;
    }
}

function navigationMenuHandler(buttonIndex) {
    var displayBodyElement = document.getElementById("displayBody");
    var pages = [
        document.getElementById("displayBody__aboutMe"),
        document.getElementById("displayBody__experience"),
        document.getElementById("displayBody__blog"),
        document.getElementById("displayBody__contactMe")
    ]

    displayBodyElement.style.transitionDuration = "0s";
    //Change the body background to the current div background to hide the transition.
    document.body.style.backgroundColor = windowHandler.windowColour;

    //Might have to cloneNode to keep old page active while it gets transitioned.
    //UPDATE DISPLAY: Hide all the display pages.
    for (var i = 0; i < pages.length; i++) {
        if (i != buttonIndex) {
            pages[i].style.display = "none";
        }
    }
    //UPDATE DISPLAY: Show the correct page with buttonIndex.
    pages[buttonIndex].style.display = "flex";

    //change where the window comes from!
    if (windowHandler.currentWindow == -1) { //landing page case.
        displayBodyElement.style.transform = "translateX(-100vw)";
    } else { //other cases.
        //hide landing page, but only if not clicking off landing page.
        document.getElementById("landingPage").style.display = "none";
        //decide where to move display.
        if (buttonIndex == windowHandler.currentWindow) {
            displayBodyElement.style.transform = "translateX(-100vw)";
        }
        if (buttonIndex > windowHandler.currentWindow) {
            displayBodyElement.style.transform = "translateY(100vh)";
        }
        if (buttonIndex < windowHandler.currentWindow) {
            displayBodyElement.style.transform = "translateY(-100vh)";
        }
    }
    flushCSS(displayBodyElement);
    windowHandler.currentWindow = buttonIndex; //update window.

    //get new color. check against old colour and update.
    do {
        displayBodyElement.style.backgroundColor = windowHandler.windowColours[randInt(windowHandler.windowColours.length)];
    } while (displayBodyElement.style.backgroundColor == windowHandler.windowColour)
    //update old colour.
    windowHandler.windowColour = displayBodyElement.style.backgroundColor;

    displayBodyElement.style.display = "grid";
    displayBodyElement.style.transitionDuration = "1s";
    flushCSS(displayBodyElement);

    //move the window back.
    displayBodyElement.style.transform = "translateY(0)";
    displayBodyElement.style.transform = "translateX(0)";
    flushCSS(displayBodyElement);
}
function returnToLandingPage() {
    //unhide landing page
    document.getElementById("landingPage").style.display = "block";
    //move display page away
    let displayBodyElement = document.getElementById("displayBody");
    windowHandler.currentWindow = -1;
    document.body.style.backgroundColor = "#f2f2f0";
    windowHandler.windowColour = "#f2f2f0";

    displayBodyElement.style.transform = "translateX(-100vw)";
}

//Recaches CSS to update element styles.
function flushCSS(element) {
    element.offsetHeight;
}
//Generate a random integer from 0 to max.
function randInt(maximum) {
    return Math.floor(Math.random() * maximum);
}

const windowHandler = new Controller();
function onload() {
    let navMenuButtons = [
        document.getElementById("menuBar__navigationMenu__item1__button"),
        document.getElementById("menuBar__navigationMenu__item2__button"),
        document.getElementById("menuBar__navigationMenu__item3__button"),
        document.getElementById("menuBar__navigationMenu__item4__button"),
    ]
    for (var i = 0; i < navMenuButtons.length; i++) {
        navMenuButtons[i].addEventListener("click", navigationMenuHandler.bind(null, i));
    }
    document.getElementById("menuBar__landingPageButton").addEventListener("click", returnToLandingPage);
}