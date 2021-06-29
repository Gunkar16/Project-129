song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
StatusSong = "";


function preload(){
    song1 = loadSound("Sorry_By_Alan_Walker.mp3");
    song2= loadSound("Tones-and-I-Dance-Monkey.mp3");
}

function setup(){
    Canvas = createCanvas(350,250);
    Canvas.position(580,250);
    Video = createCapture(VIDEO);
    Video.hide();

    poseNet = ml5.poseNet(Video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(Video,0,0,350,250);
    fill('orange');
    stroke('orange');
    SongStatus = song1.isPlaying()
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(SongStatus = "false"){
            song1.play();
        }
    }

}

