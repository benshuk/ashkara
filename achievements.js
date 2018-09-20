class Achievements {
    constructor(name,subname) {
        this.name = name;
        this.subname = subname;
        this.status = getCookie(name) == "" ? 1 : 0;
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