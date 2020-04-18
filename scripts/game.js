import {pictureMaterials} from "./materials";
import {SceneFacade} from "./scene-facade";

const Time = require('Time');

const SHOW_ANSWER_DURATION = 2000;
const SHOW_TITLE_DURATION = 1800;

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
