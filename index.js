let index = 0;
let speed = 125;
let eraseTimeout = 2000;
let typeTimeout = 125;
let choose = arr => arr[Math.floor(Math.random() * arr.length)];
let titles = ["בדוק", "קללל", "תכל'ס", "חד משמעית", "ברור", "וואלה", "וואי וואי"];
let backgrounds = ["#FF5A5A", "#ffb25a", "#19c78d","#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c", "#114b5f", "#028090", "#456990", "#f45b69"];
let ariaHiddenElement = '<span aria-hidden="true"></span>';

// Init background
let bg = choose(backgrounds);
document.body.style.backgroundColor = bg;

// Init title
let title = choose(titles);
setTimeout(type,speed);

// Type the title
function type() {
    if(index < title.length) {
        document.getElementById("title").innerHTML = title.substring(0, index + 1) + ariaHiddenElement;
        index++;
        setTimeout(type, speed);
    } else {
        setTimeout(erase, eraseTimeout);
    }
}

// Erase the title
function erase() {
    if(index >= 0) {
        var temp = title.substring(0,index);
        document.getElementById("title").innerHTML = title.substring(0, index) + ariaHiddenElement;
        index--;
        setTimeout(erase, speed);
    } else {
        updatePage();
        setTimeout(type, typeTimeout);
    }
}

// Update the title and the background of the page, without repeating
function updatePage() {
    // Set new title from the list of titles
    var index = titles.indexOf(title);
    if (index !== -1) {
        var subTitles = titles.slice();
        subTitles.splice(index, 1);
        title = choose(subTitles);
    }

    // Set new background from the list of backgrounds
    var index = backgrounds.indexOf(bg);
    if (index !== -1) {
        var subBg = backgrounds.slice();
        subBg.splice(index, 1);
        bg = choose(subBg);
        document.body.style.backgroundColor = bg;
    }
}