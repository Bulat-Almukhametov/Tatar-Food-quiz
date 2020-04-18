import {pictureMaterials, rightMaterial, setMaterial, transparentMaterial, wrongMaterial} from "./materials";

const Scene = require('Scene');

const picturePlane = Scene.root.findFirst('picturePlane');
const recipePlane = Scene.root.findFirst('recipePlane');
const answerPlane = Scene.root.findFirst('answerPlane');

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
}