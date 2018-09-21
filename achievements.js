class Achievements {
    constructor(cookie) {
        var info = getInfoOfAchCookie(cookie);
        this.name = info.name;
        this.subname = info.subname;
        this.cookie = cookie;
        this.status = getCookie(cookie) == "" ? 1 : 0;
    }

    setStatus(status) {
        this.status = status;
        updateCookie(this.name,status);
    }

    popAchievement() {
        this.setStatus(0);
        let element = getElement("ach");
        getElement("achieveTitle").innerHTML = "<strong>אשכרה הישג</strong>: " + this.name;
        getElement("detail").innerText = this.subname;
        element.classList.remove("achieved");
        setTimeout(() => element.classList.add("achieved"), 1);
        updateAchievementsList(this.name);
    }
}