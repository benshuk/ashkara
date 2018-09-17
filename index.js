let index = 0;
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let subTitles = ASHKARA_TITLES.slice();
let subBg = ASHKARA_BACKGROUNDS.slice();
let ariaHiddenElement = '<span aria-hidden="true"></span>';

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
