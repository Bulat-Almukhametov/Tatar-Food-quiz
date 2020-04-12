import {pictureMaterials, recipeMaterials, rightMaterial, wrongMaterial, transparentMaterial} from "./materials";

const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const Time = require('Time');

const faceTracker = Scene.root.findFirst('faceTracker');
const picturePlane = Scene.root.findFirst('picturePlane');
const recipePlane = Scene.root.findFirst('recipePlane');
const answerPlane = Scene.root.findFirst('answerPlane');

var frameNumber = 0;
setFrame(0);

const face = FaceTracking.face(0);
FaceGestures.onNod(face).subscribe(function() {
    setAnswer(true);
});

FaceGestures.onShake(face).subscribe(function() {
    setAnswer(false);
});

function setFrame(number) {
    setMaterial(picturePlane, pictureMaterials[number]);
    setMaterial(recipePlane, recipeMaterials[number]);
}

function setAnswer(value) {
    if (value) {
        setMaterial(answerPlane, rightMaterial);
    } else {
        setMaterial(answerPlane, wrongMaterial);
    }
    Time.setTimeout(function () {
        setMaterial(answerPlane, transparentMaterial);
        setFrame(++frameNumber);
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
