import {
    pictureMaterials
} from "./materials";
import {sceneFacade} from "./scene-facade";

const SHOW_ANSWER_DURATION = 2000;

const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const Time = require('Time');

const facade = new sceneFacade();
const face = FaceTracking.face(0);

let accept;
setNextFrame();

FaceGestures.onNod(face, {})
    .subscribe(function () {
        setAnswer(true);
    });

FaceGestures.onShake(face, {})
    .subscribe(function () {
        setAnswer(false);
    });

function setNextFrame() {
    const number = getRandomFrameId();
    accept = facade.setFrame(number);
}

function setAnswer(value) {
    facade.showAnswer(value === accept);

    Time.setTimeout(function () {
        facade.hideAnswer();

        if (pictureMaterials.length > 0) {
            setNextFrame();
        } else {
            facade.hideFrame();
        }
    }, SHOW_ANSWER_DURATION)
}

function getRandomFrameId() {
    return Math.floor(Math.random() * (pictureMaterials.length));
}
