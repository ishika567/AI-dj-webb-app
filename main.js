song1="";
song2="";
song1_status="";
song2_status="";
leftWristx=0;
leftWristy=0;
rightWristy=0;
rightWristx=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

   video=createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotposes);
}
function modelLoaded(){
    console.log('Postnet Is Initialized');
}

function gotposes(results)
{
    if(results.length > 0)

    {


        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRighttWrist = " + scoreRightWrist);

        rightWristx=results[0].pose.rightWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("leftWristx = " + leftWristx+"leftWristy = "+ leftWristy )
        console.log("rightWristy = " + rightWristx+"rightWristx = "+ rightWristy )
        
    }
}


function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("FF0000");
   
if(scoreRightWrist > 0.2)
{
    circle(rightWristx,rightWristy,20);
   song2.stop();
   if(song1_status ==false){
       song1.play();
       document.getElementById("song").innerHTML="playing-harry potter theme song"
   } 
}

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        song1.stop();
   if(song2_status ==false){
       song2.play();
       document.getElementById("song").innerHTML="playing-instrumental"
   } 
    }
}


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}