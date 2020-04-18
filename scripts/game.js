import {pictureMaterials} from "./materials";
import {SceneFacade} from "./scene-facade";

const Time = require('Time');

const SHOW_ANSWER_DURATION = 2000;

const facade = new SceneFacade();
let accept;
let isPlaying = false;

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

export class Game {
    start() {
        isPlaying = true;
        setNextFrame();
    }

    setAnswer(value) {
        if (isPlaying)
            facade.showAnswer(value === accept);

        Time.setTimeout(function () {
            facade.hideAnswer();

            if (canContinue()) {
                setNextFrame();
            } else {
                facade.hideFrame();
                isPlaying = false
            }
        }, SHOW_ANSWER_DURATION)
    }
}