let index = 0;
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span class="typewriter" aria-hidden="true"></span>';

let start = new Date();
let counter = 0;
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
    if(subTitles.length == 1) {
        subTitles = ASHKARA_TITLES.slice();
    }
    subTitles.splice(subTitles.indexOf(title), 1);
    title = choose(subTitles);

    // Set new background from the sublist of backgrounds
    if(subBg.length == 1) {
        subBg = ASHKARA_BACKGROUNDS.slice();
    }
    subBg.splice(subBg.indexOf(bg), 1);
    bg = choose(subBg);
    document.body.style.backgroundColor = bg;
}

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
    achieve();
    counter = counter + 1;
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
}

// Check how much time user spend on the website
function spendedTimeOnPage() {
    // Calculate the run time in seconds
    var runTime = (new Date() - start) / MILISEC_TO_SEC;
    if(runTime >= ONE_MIN_RUN_TIME && oneMinAchiveKey == 0) {
        oneMinAchiveKey = 1;
        achive("אתה עדיין פה?");
    } else if(runTime >= FIVE_MIN_RUN_TIME && fiveMinAchiveKey == 0) {
        fiveMinAchiveKey = 1;
        achive("לך מפה צעיר");
    } else if(runTime >= THIRTY_MIN_RUN_TIME && halfHourAchiveKey == 0) {
        halfHourAchiveKey = 1;
        achive("משועמם רצח");
    } else if(runTime >= SATAN_MIN_RUN_TIME && satanMinAchiveKey == 0) {
        satanMinAchiveKey = 1;
        achive("אתה השטן");
    }
}