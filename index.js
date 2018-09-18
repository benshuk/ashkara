let index = 0;
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span class="typewriter" aria-hidden="true"></span>';
let badukCounter,randomAchieveKey,firstBaduckAchieveKey,secondBaduckAchieveKey,thirdBaduckAchieveKey,fourthBaduckAchieveKey;
let start = new Date();
initCoockies();

// one liners
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let getElement = id => document.getElementById(id);

// Achievement keys
let oneMinAchieveKey = 0;
let fiveMinAchieveKey = 0;
let halfHourAchieveKey = 0;
let satanMinAchieveKey = 0;

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
        let currentChar = title.charAt(index + 1);
        let currentSpeed = (currentChar === " ") ? QUICKEST_SPEED : DEFAULT_SPEED;
        getElement("title").innerHTML = title.substring(0, index + 1) + ariaHiddenElement;
        index++;
        setTimeout(type, currentSpeed);
    } else {
        setTimeout(erase, ERASE_TIMEOUT);
    }
}

// Erase the title
function erase() {
    if(index >= 0) {
        let currentChar = title.charAt(index);
        let currentSpeed = (currentChar === " ") ? QUICKEST_SPEED : DEFAULT_SPEED;
        getElement("title").innerHTML = title.substring(0, index) + ariaHiddenElement;
        index--;
        setTimeout(erase, currentSpeed);
    } else {
        updatePage();
        checkForAchievements();
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
function popAchievement(title, details) {
    let element = getElement("ach");
    getElement("achieveTitle").innerHTML = "<strong>אשכרה הישג</strong>: " + title;
    getElement("detail").innerText = details;
    element.classList.remove("achieved");
    setTimeout(() => element.classList.add("achieved"), 1);
}

// Check if user got any new achievements
function checkForAchievements() {
    spentTimeAchieveCheck();
    baduckAchieveCheck();
    randomChanceAchieve();
}

// Check if user is lucky - 1 chance in 1000 every second of earning this achievement
function randomChanceAchieve() {
    if (randomAchieveKey == 0) {
        let randomValue = Math.floor((Math.random() * 1000) + 1);
        if (randomValue == LUCKY_NUMBER_ACHIVE) {
            randomAchieveKey = updateCookie("randomAchieveKey",1);
            popAchievement("פאקינג מזליסט", "הסיכוי לזכות בלוטו קטן יותר");
        }
    }
}

// Check how much time user spend on the website
function spentTimeAchieveCheck() {
    // Calculate the run time in seconds
    let runTime = (new Date() - start) / MILISEC_TO_SEC;
    if (runTime >= ONE_MIN_RUN_TIME && oneMinAchieveKey == 0) {
        oneMinAchieveKey = 1;
        popAchievement("אתה עדיין פה?", "נשרפה לך דקה מהחיים על האתר הזה");
    } else if (runTime >= FIVE_MIN_RUN_TIME && fiveMinAchieveKey == 0) {
        fiveMinAchieveKey = 1;
        popAchievement("לך מפה צעיר", "בזבזת יותר מחמש דקות על העמוד הזה");
    } else if (runTime >= THIRTY_MIN_RUN_TIME && halfHourAchieveKey == 0) {
        halfHourAchieveKey = 1;
        popAchievement("משועמם רצח", "וואי וואי, העברת חצי שעה באתר הזה");
    } else if (runTime >= SATAN_MIN_RUN_TIME && satanMinAchieveKey == 0) {
        satanMinAchieveKey = 1;
        popAchievement("אתה השטן", "שרפת יותר מ-666 דקות על העמוד הזה");
    }
}

// Set an event listener for Baduk counter
function setBaudkListener() {
    if (title === "בדוק") {
        getElement("title").addEventListener("click", inceaseBaduckCounter);
    } else {
        getElement("title").removeEventListener("click", inceaseBaduckCounter);
    }
}

// Increase Baduk counter by one and remove the event listener
function inceaseBaduckCounter() {
    badukCounter++;
    updateCookie("baduckCounter", badukCounter);
    getElement("title").removeEventListener("click", inceaseBaduckCounter);
}

// Check how many Baduck strings were clicked
function baduckAchieveCheck() {
    if (badukCounter >= BADUCK_TEN_TIMES && firstBaduckAchieveKey == 0) {
        firstBaduckAchieveKey = updateCookie("firstBaduckAchieveKey",1);
        popAchievement("בדוק אתה משועמם", "לחצת 10 פעמים על בדוק, שאפו");
    } else if (badukCounter >= BADUCK_ONE_HUNDRED_TIMES && secondBaduckAchieveKey == 0) {
        secondBaduckAchieveKey = updateCookie("secondBaduckAchieveKey",1);
        popAchievement("בדוק אתה מובטל", "בדקת 100 פעמים כפרה עליך");
    } else if (badukCounter >= BADUCK_FIVE_HUNDRED_TIMES && thirdBaduckAchieveKey == 0) {
        thirdBaduckAchieveKey = updateCookie("thirdBaduckAchieveKey",1);
        popAchievement("בדוק אין לך חיים", "נתת בבדוק לפחות 500 פעם");
    } else if (badukCounter >= BADUCK_THOUSAND_TIMES && fourthBaduckAchieveKey == 0) {
        fourthBaduckAchieveKey = updateCookie("fourthBaduckAchieveKey",1);
        popAchievement("מלך הבדוק", "פירגנת אלף לחיצות, בדוק!");
    }
}

/** ---------- Coockies Function ---------- **/

function setCookie(cookieName, cookieVal, expiry) {
    let d = new Date();
    d.setTime(d.getTime() + (expiry * DAY));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (var c of ca) {
        let cookie = c.trim();
        if (cookie.startsWith(name)) {
            return c.substring(name.length, cookie.length);
        }
    };
    return "";
}

function updateCookie(cookieName,cookieVal) {
    let value = getCookie(cookieName);
    if (value == "" || cookieVal > Number(value)) {
        setCookie(cookieName, cookieVal, 365);
    }
}

function initCoockies() {
    badukCounter = getCookie("baduckCounter") == "" ? 0 : Number(getCookie("baduckCounter"));
    randomAchieveKey = getCookie("randomAchieveKey") == "" ? 0 : 1;
    firstBaduckAchieveKey = getCookie("firstBaduckAchieveKey") == "" ? 0 : 1;
    secondBaduckAchieveKey = getCookie("firstBaduckAchieveKey") == "" ? 0 : 1;
    thirdBaduckAchieveKey = getCookie("firstBaduckAchieveKey") == "" ? 0 : 1;
    fourthBaduckAchieveKey = getCookie("firstBaduckAchieveKey") == "" ? 0 : 1;
}
