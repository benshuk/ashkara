// Background and titles
const ASHKARA_BACKGROUNDS = ["#FF5A5A", "#ffb25a", "#19c78d","#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c", "#114b5f", "#028090", "#456990", "#f45b69"];
const ASHKARA_TITLES = ["בדוק", "קללל", "תכל'ס", "חד משמעית", "ברור", "וואלה", "וואי וואי", "מפחיד"];

// Speed, timeout and other numeric values
const DEFAULT_SPEED = 125;
const QUICKEST_SPEED = 0;
const ERASE_TIMEOUT = 2000;
const TYPE_TIMEOUT = 125;
const DAY = 24 * 60 * 60 * 1000;
const YEAR_IN_DAYS = 365;

// Achievements
const ONE_MIN_RUN_TIME = 1 * 60;
const FIVE_MIN_RUN_TIME = 5 * 60;
const THIRTY_MIN_RUN_TIME = 30 * 60;
const SATAN_MIN_RUN_TIME = 666 * 60;
const MILISEC_TO_SEC = 1000;
const BADUK_TEN_TIMES = 10;
const BADUK_ONE_HUNDRED_TIMES = 100;
const BADUK_FIVE_HUNDRED_TIMES = 500;
const BADUK_THOUSAND_TIMES = 1000;
const LUCKY_NUMBER_ACHIVE = 555;
const LUCKY_NUMBER_RANGE = 1000;

/** ---------- ALL Cookies Names ---------- **/

const BADUCK_COUNTER_COOKIE_NAME = "badukCounter";
const COOKIE_EATER_COOKIE_NAME = "cookieEaterKey";
const TIME_SPENT_COOKIE_NAME = "timeSpent";

/** ---------- All Achievements ---------- **/

/** ---------- Baduk Achievements ---------- **/

const ACH_FIRST_BADUK_NAME = "בדוק אתה משועמם";
const ACH_FIRST_BADUK_SUB_NAME = "לחצת 10 פעמים על בדוק, שאפו";
const ACH_FIRST_BADUK_COOKIE = "firstBadukAch";

const ACH_SECOND_BADUK_NAME = "בדוק אתה מובטל";
const ACH_SECOND_BADUK_SUB_NAME = "בדקת 100 פעמים כפרה עלייך";
const ACH_SECOND_BADUK_COOKIE = "secondBadukAch";

const ACH_THIRD_BADUK_NAME = "בדוק אין לך חיים";
const ACH_THIRD_BADUK_SUB_NAME =  "נתת בבדוק לפחות 500 פעם";
const ACH_THIRD_BADUK_COOKIE = "thirdBadukAch";

const ACH_FOURTH_BADUK_NAME = "מלך הבדוק";
const ACH_FOURTH_BADUK_SUB_NAME = "פירגנת אלף לחיצות, בדוק!"
const ACH_FOURTH_BADUK_COOKIE = "fourthBadukAch";

/** ---------- Spend Time Achievements ---------- **/

const ACH_FIRST_SPEND_TIME_NAME = "אתה עדיין פה?";
const ACH_FIRST_SPEND_TIME_SUB_NAME = "נשרפה לך דקה מהחיים על האתר הזה";
const ACH_FIRST_SPEND_TIME_COOKIE = "firstSpendTimeAch";

const ACH_SECOND_SPEND_TIME_NAME = "לך מפה צעיר";
const ACH_SECOND_SPEND_TIME_SUB_NAME = "בזבזת יותר מחמש דקות על העמוד הזה";
const ACH_SECOND_SPEND_TIME_COOKIE = "secondSpendTimeAch";

const ACH_THIRD_SPEND_TIME_NAME = "משועמם רצח";
const ACH_THIRD_SPEND_TIME_SUB_NAME = "וואי וואי, העברת חצי שעה באתר הזה";
const ACH_THIRD_SPEND_TIME_COOKIE = "thirdSpendTimeAch";

const ACH_FOURTH_SPEND_TIME_NAME = "אתה השטן";
const ACH_FOURTH_SPEND_TIME_SUB_NAME = "שרפת 666 דקות על העמוד הזה";
const ACH_FOURTH_SPEND_TIME_COOKIE = "fourthSpendTimeAch";

/** ---------- Unique Achievements ---------- **/

const ACH_LUCKY_NAME = "פאקינג מזליסט";
const ACH_LUCKY_SUB_NAME = "הסיכוי לזכות בלוטו קטן יותר";
const ACH_LUCKY_COOKIE = "luckyAch";

const ACH_COOKIE_EATER_NAME = "מפלצת העוגיות";
const ACH_COOKIE_EATER_SUB_NAME = "איך אתה מעז לאכול את העוגיות שלנו";
const ACH_COOKIE_EATER_COOKIE = "cookieEaterAch";

const VISIBLE_AHCIEVEMENTS_COOKIES = [
    ACH_FIRST_BADUK_COOKIE,
    ACH_SECOND_BADUK_COOKIE,
    ACH_THIRD_BADUK_COOKIE,
    ACH_FOURTH_BADUK_COOKIE,
    ACH_FIRST_SPEND_TIME_COOKIE,
    ACH_SECOND_SPEND_TIME_COOKIE,
    ACH_THIRD_SPEND_TIME_COOKIE,
    ACH_FOURTH_SPEND_TIME_COOKIE,
    ACH_LUCKY_COOKIE,
    ACH_COOKIE_EATER_COOKIE
];

/** ---------- Functions ---------- **/

function getInfoOfAchCookie(name) {
    if (name === ACH_FIRST_BADUK_COOKIE) {                                                    // Baduk Achievements
        return { name: ACH_FIRST_BADUK_NAME, subname: ACH_FIRST_BADUK_SUB_NAME};
    } else if (name === ACH_SECOND_BADUK_COOKIE) {
        return { name: ACH_SECOND_BADUK_NAME, subname: ACH_SECOND_BADUK_SUB_NAME};
    } else if (name === ACH_THIRD_BADUK_COOKIE) {
        return { name: ACH_THIRD_BADUK_NAME, subname: ACH_THIRD_BADUK_SUB_NAME};
    } else if (name === ACH_FOURTH_BADUK_COOKIE) {
        return { name: ACH_FOURTH_BADUK_NAME, subname: ACH_FOURTH_BADUK_SUB_NAME};
    } else if (name === ACH_FIRST_SPEND_TIME_COOKIE) {
        return { name: ACH_FIRST_SPEND_TIME_NAME, subname: ACH_FIRST_SPEND_TIME_SUB_NAME};    // Spend Time Achievements
    } else if (name === ACH_SECOND_SPEND_TIME_COOKIE) {
        return { name: ACH_SECOND_SPEND_TIME_NAME, subname: ACH_SECOND_SPEND_TIME_SUB_NAME};
    } else if (name === ACH_THIRD_SPEND_TIME_COOKIE) {
        return { name: ACH_THIRD_SPEND_TIME_NAME, subname: ACH_THIRD_SPEND_TIME_SUB_NAME};
    } else if (name === ACH_FOURTH_SPEND_TIME_COOKIE) {
        return { name: ACH_FOURTH_SPEND_TIME_NAME, subname: ACH_FOURTH_SPEND_TIME_SUB_NAME};
    } else if (name === ACH_LUCKY_COOKIE) {                                                   // Unique Achievements
        return { name: ACH_LUCKY_NAME, subname: ACH_LUCKY_SUB_NAME};
    } else if (name === ACH_COOKIE_EATER_COOKIE) {
        return { name: ACH_COOKIE_EATER_NAME, subname: ACH_COOKIE_EATER_SUB_NAME};
    }
}
