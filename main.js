song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
StatusSong = "";

scoreRightWrist = 0;
StatusSong2 = "";


function preload() {
    song1 = loadSound("Sorry_By_Alan_Walker.mp3");
    song2 = loadSound("Tones-and-I-Dance-Monkey.mp3");
}

function setup() {
    Canvas = createCanvas(600, 500);
    Canvas.center()
    Video = createCapture(VIDEO);
    Video.hide();

    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(Video, 0, 0, 600,500);
    SongStatus = song1.isPlaying()
    SongStatus2 = song2.isPlaying()

    fill('orange');
    stroke('orange');

    if (scoreLeftWrist > 0.2) {
        console.log("Left")
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if (SongStatus == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Tones and I Dance Monkey Song"

        }
    }

    if (scoreRightWrist > 0.2) {
        console.log("Right")
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (SongStatus2 == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Sorry By AlanWalker Song"


        }
    }

}

