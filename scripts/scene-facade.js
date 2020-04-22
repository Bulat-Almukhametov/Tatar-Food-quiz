import {
    pictureMaterials,
    rightMaterial,
    setMaterial,
    titleMaterial,
    transparentMaterial,
    wrongMaterial
} from "./materials";
import {CONFETTI_COUNT} from "./constants";

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');

const picturePlane = Scene.root.findFirst('picturePlane');
const recipePlane = Scene.root.findFirst('recipePlane');
const answerPlane = Scene.root.findFirst('answerPlane');
const titlePlane = Scene.root.findFirst('titlePlane');
const scoreText = Scene.root.findFirst('scoreText');
const confetti = Scene.root.findFirst('confetti');

function hide(plane) {
    setMaterial(plane, transparentMaterial);
}

function setConfettiCount(count) {
    confetti.then(v => v.birthrate = count);
}

export class SceneFacade {

    setFrame (number) {
        setMaterial(picturePlane, pictureMaterials[number].picture);
        setMaterial(recipePlane, pictureMaterials[number].recipe);

        const accept = pictureMaterials[number].accept;
        pictureMaterials.splice(number, 1);

        return accept;
    }

    showAnswer(value) {
        if (value) {
            setMaterial(answerPlane, rightMaterial);
        } else {
            setMaterial(answerPlane, wrongMaterial);
        }
    }

    hideAnswer() {
        hide(answerPlane);
    }

    hideFrame() {
        hide(picturePlane);
        hide(recipePlane);
    }

    showTitle() {
        setMaterial(titlePlane, titleMaterial);
    }

    hideTitle() {
        hide(titlePlane);
    }

    setScore(text) {
        scoreText.then(v => v.text = text);
    }

    showConfetti() {
        setConfettiCount(CONFETTI_COUNT);
    }

    hideConfetti() {
        setConfettiCount(0);
    }
}
