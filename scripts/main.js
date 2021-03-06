import {Game} from "./game";

const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const CameraInfo = require('CameraInfo');

const game = new Game();
const face = FaceTracking.face(0);

CameraInfo.isRecordingVideo.onOn().subscribe(game.start);

FaceGestures.onNod(face, {})
    .subscribe(function () {
        game.setAnswer(true);
    });

FaceGestures.onShake(face, {})
    .subscribe(function () {
        game.setAnswer(false);
    });
