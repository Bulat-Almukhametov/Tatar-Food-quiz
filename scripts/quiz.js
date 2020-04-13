import {pictureMaterials, rightMaterial, wrongMaterial, transparentMaterial} from "./materials";

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const Time = require('Time');

const faceTracker = Scene.root.findFirst('faceTracker');
const picturePlane = Scene.root.findFirst('picturePlane');
const recipePlane = Scene.root.findFirst('recipePlane');
const answerPlane = Scene.root.findFirst('answerPlane');

let accept = false;
setFrame();

const face = FaceTracking.face(0);

FaceGestures.onNod(face).subscribe(function() {
    setAnswer(true);
});

FaceGestures.onShake(face).subscribe(function() {
    setAnswer(false);
});

function setFrame() {
    const number = getRandomFrame();

    setMaterial(picturePlane, pictureMaterials[number].picture);
    setMaterial(recipePlane, pictureMaterials[number].recipe);
    accept = pictureMaterials[number].accept;

    pictureMaterials.splice(number, 1);
}

function setAnswer(value) {

    if (value === accept) {
        setMaterial(answerPlane, rightMaterial);
    } else {
        setMaterial(answerPlane, wrongMaterial);
    }
    Time.setTimeout(function () {
        setMaterial(answerPlane, transparentMaterial);

        if (pictureMaterials.length > 0) {
            setFrame();
        } else {
            setMaterial(picturePlane, transparentMaterial);
            setMaterial(recipePlane, transparentMaterial);
        }
    }, 2000)
}

function setMaterial(planeValue, materialValue) {
    planeValue.then(function (plane) {
        if (materialValue) {
            materialValue.then(function (material) {
                plane.material = material;
            });
        }
    });
}

function getRandomFrame() {
    return Math.floor(Math.random() * (pictureMaterials.length));
}
