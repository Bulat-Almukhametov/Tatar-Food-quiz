import {pictureMaterials} from "./materials";
import {SceneFacade} from "./scene-facade";
import {
    SHOW_ANSWER_DURATION,
    SHOW_CONFETTI_DURATION,
    SHOW_TITLE_DURATION
} from "./constants";

const Time = require('Time');

const facade = new SceneFacade();
let accept;
let isPlaying = false;
let rightAnswers = 0;
let answers = 0;

function setNextFrame() {
    const number = getRandomFrameId();
    accept = facade.setFrame(number);
}

function getRandomFrameId() {
    return Math.floor(Math.random() * (pictureMaterials.length));
}

function canContinue() {
    return pictureMaterials.length > 0;
}

function endGame() {
    facade.hideFrame();
    isPlaying = false;
    facade.setScore(rightAnswers + ' из ' + answers);
    if (rightAnswers > answers / 2) {
        showConfetti();
    }
}

function showConfetti() {
    facade.showConfetti();

    Time.setTimeout(function () {
        facade.hideConfetti();
    }, SHOW_CONFETTI_DURATION);
}

export class Game {
    start() {
        facade.showTitle();
        Time.setTimeout(function () {
            facade.hideTitle();
            isPlaying = true;
            setNextFrame();
        }, SHOW_TITLE_DURATION);
    }

    setAnswer(value) {
        if (!isPlaying) {
            return;
        }
        answers++;
        let isRight = value === accept;
        facade.showAnswer(isRight);
        if (isRight) {
            rightAnswers++;
        }

        Time.setTimeout(function () {
            facade.hideAnswer();

            if (canContinue()) {
                setNextFrame();
            } else {
                endGame();
            }
        }, SHOW_ANSWER_DURATION)
    }
}
