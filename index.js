// Calculate start time
let start = new Date();

let achievements = [];
// Initialize instance achievements
// Initialize Baduk achievements
let achFirstBaduk  = new Achievements(ACH_FIRST_BADUK_COOKIE);
let achSecondBaduk = new Achievements(ACH_SECOND_BADUK_COOKIE);
let achThirdBaduk  = new Achievements(ACH_THIRD_BADUK_COOKIE);
let achFourthBaduk = new Achievements(ACH_FOURTH_BADUK_COOKIE);

// Initialize spend Time achievements
let achFirstSpendTime  = new Achievements(ACH_FIRST_SPEND_TIME_COOKIE);
let achSecondSpendTime = new Achievements(ACH_SECOND_SPEND_TIME_COOKIE);
let achThirdSpendTime  = new Achievements(ACH_THIRD_SPEND_TIME_COOKIE);
let achFourthSpendTime = new Achievements(ACH_FOURTH_SPEND_TIME_COOKIE);

// Initialize unique achievements
let achLucky       = new Achievements(ACH_LUCKY_COOKIE);
let achCookieEater = new Achievements(ACH_COOKIE_EATER_COOKIE);

let index = 0;
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span class="typewriter" aria-hidden="true"></span>';
let badukCounter;
let timeSpent;
let ashkaraCounter = 0;

// Initialize needed cookies
initCookies();

// One liners functions
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let getElement = id => document.getElementById(id);
let createElement = type => document.createElement(type);

// Initialize background
let bg = choose(subBg);
document.body.style.backgroundColor = bg;

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();

    let timeCurrentlySpent = parseInt((new Date() - start) / MILISEC_TO_SEC);

    if (Number.isInteger(timeSpent))
        timeCurrentlySpent += timeSpent;

    updateCookie("timeSpent", timeCurrentlySpent);
});

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
        ashkaraEveryHalfMin();
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
    badukAchieveCheck();
    uniqueAchieveCheck();
}

function uniqueAchieveCheck() {
    // Check if user is lucky - 1 chance in 1000 every second of earning this achievement
    if (achLucky.status) {
        let randomValue = Math.floor((Math.random() * LUCKY_NUMBER_RANGE) + 1);
        if (randomValue == LUCKY_NUMBER_ACHIVE) {
            achLucky.popAchievement();
        }
    }

    if (achCookieEater.status && getCookie(COOKIE_EATER_COOKIE_NAME) == "") {
        achCookieEater.popAchievement();
    }
}

// Check how much time user spend on the website
function spentTimeAchieveCheck() {
    // Calculate the run time in seconds
    let runTime = (new Date() - start) / MILISEC_TO_SEC;

    let totalTime = runTime + timeSpent;
    if (totalTime >= ONE_MIN_RUN_TIME && achFirstSpendTime.status) {
        achFirstSpendTime.popAchievement();
    } else if (totalTime >= FIVE_MIN_RUN_TIME && achSecondSpendTime.status) {
        achSecondSpendTime.popAchievement();
    } else if (totalTime >= THIRTY_MIN_RUN_TIME && achThirdSpendTime.status) {
        achThirdSpendTime.popAchievement();
    } else if (totalTime >= SATAN_MIN_RUN_TIME && achFourthSpendTime.status) {
        achFourthSpendTime.popAchievement();
    }
}

// Set an event listener for Baduk counter
function setBaudkListener() {
    if (title === "בדוק") {
        getElement("title").addEventListener("click", inceaseBadukCounter);
    } else {
        getElement("title").removeEventListener("click", inceaseBadukCounter);
    }
}

// Increase Baduk counter by one and remove the event listener
function inceaseBadukCounter() {
    badukCounter++;
    updateCookie(BADUCK_COUNTER_COOKIE_NAME, badukCounter);
    getElement("title").removeEventListener("click", inceaseBadukCounter);
}

// Check how many Baduk strings were clicked
function badukAchieveCheck() {
    if (badukCounter >= BADUK_TEN_TIMES && achFirstBaduk.status) {
        achFirstBaduk.popAchievement();
    } else if (badukCounter >= BADUK_ONE_HUNDRED_TIMES && achSecondBaduk.status) {
        achSecondBaduk.popAchievement();
    } else if (badukCounter >= BADUK_FIVE_HUNDRED_TIMES && achThirdBaduk.status) {
        achThirdBaduk.popAchievement();
    } else if (badukCounter >= BADUK_THOUSAND_TIMES && achFourthBaduk.status) {
        achFourthBaduk.popAchievement();
    }
}

// TODO: call this function every time a new achievement is accomplished.
// TODO: style the list with css
function updateAchievementsList() {
    let aList = getElement("achievements-list");
    let subtitle = getElement("modal-subtitle");
    let amount = 0;
    let total = VISIBLE_AHCIEVEMENTS_COOKIES.length;
    let i = createElement('i');

    VISIBLE_AHCIEVEMENTS_COOKIES.forEach(cookieName => {
        let info = getInfoOfAchCookie(cookieName);
        let acheievementLi = createElement('li');

        if (getCookie(cookieName)) {
            acheievementLi.innerHTML  = "<b>" + info.name + "</b>";
            acheievementLi.innerHTML += " - " + info.subname;
            aList.appendChild(acheievementLi);
            amount += 1;
        }
    });

    if (amount > 0 && amount < total) {
        i.innerText = "חשפת " + amount +
                      " מתוך " + total + 
                      " הישגים!"
        subtitle.innerHTML = "";
        subtitle.appendChild(i);
    } else if (amount == total){
        i.innerText = "אשכרה השגת הכל בחיים. אתה יכול ללכת לישון עכשיו.";
        subtitle.innerHTML = "";
        subtitle.appendChild(i);
    }
}

function removeAchievements() {
    let aList = getElement("achievements-list");
    aList.innerHTML = '';
}

/** ---------- Cookie Functions ---------- **/

function setCookie(cookieName,cookieValue,cookieDays) {
    let expires_date = "";
    if (cookieDays) {
        let date = new Date();
        date.setTime(date.getTime() + (cookieDays * DAY));
        expires_date += "; expires=" + date.toGMTString();
    }
    document.cookie = cookieName + "=" + cookieValue + expires_date + "; path=/";
}

function getCookie(cookieName) {
    let nameEQ = cookieName + "=";
    let cookiesArray = document.cookie.split(';').map( c => c.trim() );

    for (let cookie of cookiesArray)
        if (cookie.startsWith(nameEQ))
            return cookie.substring(nameEQ.length, cookie.length);

    return "";
}

function updateCookie(cookieName, cookieVal) {
    let value = getCookie(cookieName);
    if (value == "" || cookieVal > Number(value))
        setCookie(cookieName, cookieVal, YEAR_IN_DAYS);
}

function initCookies() {
    // Get the number of Baduk clicks
    badukCounter = getCookie(BADUCK_COUNTER_COOKIE_NAME) == "" ? 0 : parseInt(getCookie(BADUCK_COUNTER_COOKIE_NAME));
    timeSpent = getCookie(TIME_SPENT_COOKIE_NAME) == "" ? 0 : parseInt(getCookie(TIME_SPENT_COOKIE_NAME));

    // Set cookie eater key to be 1
    updateCookie(COOKIE_EATER_COOKIE_NAME, 1);
}

// Plays "Ashkara" sound
function playAshkaraSound() {
	  var sound = document.getElementById("AshkaraAudio");
	  sound.play()
}

function ashkaraEveryHalfMin() {
	if (ashkaraCounter == 5) {
		playAshkaraSound();
		ashkaraCounter = 0;
	}
	ashkaraCounter++;
}
