import {
    pictureMaterials,
    rightMaterial,
    setMaterial,
    titleMaterial,
    transparentMaterial,
    wrongMaterial
} from "./materials";

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');

const picturePlane = Scene.root.findFirst('picturePlane');
const recipePlane = Scene.root.findFirst('recipePlane');
const answerPlane = Scene.root.findFirst('answerPlane');
const titlePlane = Scene.root.findFirst('titlePlane');
const scoreText = Scene.root.findFirst('scoreText');

function hide(plane) {
    setMaterial(plane, transparentMaterial);
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
}
