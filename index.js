// Calculate start time
let start = new Date();

// Initialize instance achievements
// Initialize Baduck achievements
let achFirstBaduk  = new Achievements(achFirstBadukName,achFirstBadukSubName);
let achSecondBaduk = new Achievements(achSecondBadukName,achSecondBadukSubName);
let achThirdBaduk  = new Achievements(achThirdBadukName,achThirdBadukSubName);
let achFourthBaduk = new Achievements(achFourthBadukName,achFourthBadukSubName);

// Initialize spend Time achievements
let achFirstSpendTime  = new Achievements(achFirstSpendTimeName,achFirstSpendTimeSubName);
let achSecondSpendTime = new Achievements(achSecondSpendTimeName,achSecondSpendTimeSubName);
let achThirdSpendTime  = new Achievements(achThirdSpendTimeName,achThirdSpendTimeSubName);
let achFourthSpendTime = new Achievements(achFourthSpendTimeName,achFourthSpendTimeSubName);

// Initialize unique achievements
let achLucky = new Achievements(achLuckyName,achLuckySubName);

let index = 0;
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span class="typewriter" aria-hidden="true"></span>';
let badukCounter = getCookie("baduckCounter") == "" ? 0 : Number(getCookie("baduckCounter"));

// One liners functions
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let getElement = id => document.getElementById(id);
let createElement = type => document.createElement(type);

// Achievement keys
let oneMinAchieveKey = 0;
let fiveMinAchieveKey = 0;
let halfHourAchieveKey = 0;
let satanMinAchieveKey = 0;

// Initialize background
let bg = choose(subBg);
document.body.style.backgroundColor = bg;

// Initialize title
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

/** ---------- Achievement Functions ---------- **/
/** TODO: separate to a different JavaScript file **/

// Pop-up a new achievement
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
    if (achLucky.status) {
        let randomValue = Math.floor((Math.random() * LUCKY_NUMBER_RANGE) + 1);
        if (randomValue == LUCKY_NUMBER_ACHIVE) {
            achLucky.popAchievement();
        }
    }
}

// Check how much time user spend on the website
function spentTimeAchieveCheck() {
    // Calculate the run time in seconds
    let runTime = (new Date() - start) / MILISEC_TO_SEC;
    if (runTime >= ONE_MIN_RUN_TIME && achFirstSpendTime.status) {
        achFirstSpendTime.popAchievement();
    } else if (runTime >= FIVE_MIN_RUN_TIME && achSecondSpendTime.status) {
        achSecondSpendTime.popAchievement();
    } else if (runTime >= THIRTY_MIN_RUN_TIME && achThirdSpendTime.status) {
        achThirdSpendTime.popAchievement();
    } else if (runTime >= SATAN_MIN_RUN_TIME && achFourthSpendTime.status) {
        achFourthSpendTime.popAchievement();
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
    if (badukCounter >= BADUCK_TEN_TIMES && achFirstBaduk.status) {
        achFirstBaduk.popAchievement();
    } else if (badukCounter >= BADUCK_ONE_HUNDRED_TIMES && achSecondBaduk.status) {
        achSecondBaduk.popAchievement();
    } else if (badukCounter >= BADUCK_FIVE_HUNDRED_TIMES && achThirdBaduk.status) {
        achThirdBaduk.popAchievement();
    } else if (badukCounter >= BADUCK_THOUSAND_TIMES && achFourthBaduk.status) {
        achFourthBaduk.popAchievement();
    }
}

// TODO: call this function every time a new achievement is accomplished.
// TODO: style the list with css
function updateAchievementsList(ach) {
    let aList = getElement("achievements-list");
    let acheievementLi = createElement('li');

    if (getElement("nope") !== null) getElement("nope").remove();

    acheievementLi.innerText = ach;

    aList.appendChild(acheievementLi);
}

/** ---------- Cookie Functions ---------- **/

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

function updateCookie(cookieName, cookieVal) {
    let value = getCookie(cookieName);
    if (value == "" || cookieVal > Number(value)) {
        setCookie(cookieName, cookieVal, YEAR_IN_DAYS);
    }
}