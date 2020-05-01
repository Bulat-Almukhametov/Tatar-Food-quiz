const Audio = require('Audio');
const rightPlaybacController = Audio.getPlaybackController('right');
const wrongPlaybacController = Audio.getPlaybackController('wrong');
const partyPlaybacController = Audio.getPlaybackController('party');

export class AudioPlayer {
    right() {
        rightPlaybacController.reset();
        rightPlaybacController.play();
    }

    wrong() {
        wrongPlaybacController.reset();
        wrongPlaybacController.play();
    }

    party() {
        partyPlaybacController.play();
    }
}