let index = 0;
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span class="typewriter" aria-hidden="true"></span>';
let badukCounter,firstBaduckAchiveKey,secondBaduckAchiveKey,thirdBaduckAchiveKey,fourthBaduckAchiveKey;
let start = new Date();
initCoockies();

// Achievement keys
let oneMinAchiveKey = 0;
let fiveMinAchiveKey = 0;
let halfHourAchiveKey = 0;
let satanMinAchiveKey = 0;

// Init background
let bg = choose(subBg);
document.body.style.backgroundColor = bg;

// Init title
let title = choose(subTitles);
setTimeout(type,DEFAULT_SPEED);
setBaudkListener();

/** ---------- Title Functions ---------- **/

// Type the title
function type() {
    if(index < title.length) {
        var currentChar = title.charAt(index + 1);
        var currentSpeed = (currentChar === " ") ? QUICKEST_SPEED : DEFAULT_SPEED;
        document.getElementById("title").innerHTML = title.substring(0, index + 1) + ariaHiddenElement;
        index++;
        setTimeout(type, currentSpeed);
    } else {
        setTimeout(erase, ERASE_TIMEOUT);
    }
}

// Erase the title
function erase() {
    if(index >= 0) {
        var currentChar = title.charAt(index);
        var currentSpeed = (currentChar === " ") ? QUICKEST_SPEED : DEFAULT_SPEED;
        document.getElementById("title").innerHTML = title.substring(0, index) + ariaHiddenElement;
        index--;
        setTimeout(erase, currentSpeed);
    } else {
        updatePage();
        checkForAchives();
        setTimeout(type, TYPE_TIMEOUT);
    }
}

// Update the title and the background of the page, without repeating
function updatePage() {
    // Set new title from the sublist of titles
    if (subTitles.length == 1) {
        subTitles = ASHKARA_TITLES.slice();
    }
    subTitles.splice(subTitles.indexOf(title), 1);
    title = choose(subTitles);
    setBaudkListener();

    // Set new background from the sublist of backgrounds
    if (subBg.length == 1) {
        subBg = ASHKARA_BACKGROUNDS.slice();
    }
    subBg.splice(subBg.indexOf(bg), 1);
    bg = choose(subBg);
    document.body.style.backgroundColor = bg;
}

/** ---------- Achievements Function ---------- **/

//  Pop-up a new achievement
function achive(achieveMainTitle) {
    var fullTitle = "<strong>אשכרה הישג</strong>: " + achieveMainTitle;
    if (achieveMainTitle === "אתה עדיין פה?") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "נשרפה לך דקה מהחיים על האתר הזה";
    }
    if (achieveMainTitle === "לך מפה צעיר") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "בזבזת יותר מחמש דקות על העמוד הזה";
    }
    if (achieveMainTitle === "משועמם רצח") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "הוצאת יותר מחצי שעה על העמוד הזה";
    }
    if (achieveMainTitle === "אתה השטן") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "שרפת יותר מ-666 דקות על העמוד הזה";
    }
    if (achieveMainTitle === "בדוק אתה משועמם") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "לחצת 10 פעמיים על בדוק";
    }
    if (achieveMainTitle === "בדוק אתה מובטל") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "לחצת 100 פעמיים על בדוק";
    }
    if (achieveMainTitle === "בדוק אין לך חיים") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "לחצת 500 פעמיים על בדוק";
    }
    if (achieveMainTitle === "מלך הבדוק") {
        document.getElementById("achiveTitle").innerHTML = fullTitle;
        document.getElementById("detail").innerText = "לחצת 1000 פעמיים על בדוק";
    }
    achieve();
}

// Update the class of the achievement pop-up
function achieve() {
    var element = document.getElementById("ach");
    element.classList.remove("achieved");
    setTimeout(function() {
        element.classList.add("achieved");
    }, 1)
}

// Check if user got any new achievements
function checkForAchives() {
    spendedTimeOnPage();
    baduckAchiveCheck();
}

// Check how much time user spend on the website
function spendedTimeOnPage() {
    // Calculate the run time in seconds
    var runTime = (new Date() - start) / MILISEC_TO_SEC;
    if (runTime >= ONE_MIN_RUN_TIME && oneMinAchiveKey == 0) {
        oneMinAchiveKey = 1;
        achive("אתה עדיין פה?");
    } else if (runTime >= FIVE_MIN_RUN_TIME && fiveMinAchiveKey == 0) {
        fiveMinAchiveKey = 1;
        achive("לך מפה צעיר");
    } else if (runTime >= THIRTY_MIN_RUN_TIME && halfHourAchiveKey == 0) {
        halfHourAchiveKey = 1;
        achive("משועמם רצח");
    } else if (runTime >= SATAN_MIN_RUN_TIME && satanMinAchiveKey == 0) {
        satanMinAchiveKey = 1;
        achive("אתה השטן");
    }
}

// Set an event listener for Baduk counter
function setBaudkListener() {
    if (title === "בדוק") {
        document.getElementById("title").addEventListener("click", inceaseBaduckCounter);
    } else {
        document.getElementById("title").removeEventListener("click", inceaseBaduckCounter);
    }
}

// Increase Baduk counter by one and remove the event listener
function inceaseBaduckCounter() {
    badukCounter++;
    updateCookie("baduckCounter", badukCounter);
    document.getElementById("title").removeEventListener("click", inceaseBaduckCounter);
}

// Check how many Baduck strings were clicked
function baduckAchiveCheck() {
    if (badukCounter >= BADUCK_TEN_TIMES && firstBaduckAchiveKey == 0) {
        firstBaduckAchiveKey = updateCookie("firstBaduckAchiveKey",1);
        achive("בדוק אתה משועמם");
    } else if (badukCounter >= BADUCK_ONE_HUNDRED_TIMES && secondBaduckAchiveKey == 0) {
        secondBaduckAchiveKey = updateCookie("secondBaduckAchiveKey",1);
        achive("בדוק אתה מובטל");
    } else if (badukCounter >= BADUCK_ONE_HUNDRED_TIMES && thirdBaduckAchiveKey == 0) {
        thirdBaduckAchiveKey = updateCookie("thirdBaduckAchiveKey",1);
        achive("בדוק אין לך חיים");
    } else if (badukCounter >= BADUCK_THOUSAND_TIMES && fourthBaduckAchiveKey == 0) {
        fourthBaduckAchiveKey = updateCookie("fourthBaduckAchiveKey",1);
        achive("מלך הבדוק");
    }
}

/** ---------- Coockies Function ---------- **/

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function updateCookie(cname,cvalue) {
    var value = getCookie(cname);
    if (value == "" || cvalue > Number(value)) {
        setCookie(cname, cvalue, 365);
    }
}

function initCoockies() {
    badukCounter = getCookie("baduckCounter") == "" ? 0 : Number(getCookie("baduckCounter"));
    firstBaduckAchiveKey = getCookie("firstBaduckAchiveKey") == "" ? 0 : 1;
    secondBaduckAchiveKey = getCookie("firstBaduckAchiveKey") == "" ? 0 : 1;
    thirdBaduckAchiveKey = getCookie("firstBaduckAchiveKey") == "" ? 0 : 1;
    fourthBaduckAchiveKey = getCookie("firstBaduckAchiveKey") == "" ? 0 : 1;
}
