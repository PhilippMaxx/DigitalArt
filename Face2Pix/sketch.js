let cap;
let poseNet;

let leftEyeX = 0;
let leftEyeY = 0
let rightEyeX = 0;
let rightEyeY = 0;

let startDist = 0;
let newPerson = -10000;
let d = 0;

let colors = [];

function setup() {
  createCanvas(640, 480);
  cap = createCapture(VIDEO);
  // cap.hide();
  //noStroke();
  poseNet = ml5.poseNet(cap);
  poseNet.on('pose',gotPoses);
  
}

function gotPoses(poses){
  // console.log(poses)
  
  // accessing the values from the poseNet poses
  if (poses.length > 0){
    lEX = poses[0].pose.keypoints[1].position.x;
    lEY = poses[0].pose.keypoints[1].position.y;
    rEX = poses[0].pose.keypoints[2].position.x;
    rEY = poses[0].pose.keypoints[2].position.y;
    leftEyeX = lerp(leftEyeX, lEX, 0.9)
    leftEyeY = lerp(leftEyeY, lEY, 0.9)
    rightEyeX = lerp(rightEyeX, rEX, 0.9)
    rightEyeY = lerp(rightEyeY, rEY, 0.9)
  } else {
    leftEyeX = 0;
    leftEyeY = 0
    rightEyeX = 0;
    rightEyeY = 0;
  }
}

function draw() {
  
  // image(cap, 0, 0);
  
  if (d > 0) {
    if (startDist == 0){ 
        startDist = d;
    }
    
  }else{
    startDist = 0;
  }
  
  d = int(dist(leftEyeX, leftEyeY,
               rightEyeX, rightEyeY));
  
  var tileCount = int(max(d-startDist, 1)/5)*(width/80);
  
  if (tileCount < 5){
    image(cap, 0, 0);
  }else{
    tileCount = floor(width /tileCount);
    var rectSize = width / tileCount;

    console.log(tileCount);

    cap.loadPixels();

    colors = [];
    for (var gridY = 0; gridY < tileCount; gridY++) {
      for (var gridX = 0; gridX < tileCount; gridX++) {
        var px = int(gridX * rectSize);
        var py = int(gridY * rectSize);
        var i = (py * cap.width + px) * 4;
        var c = color(cap.pixels[i], cap.pixels[i + 1], cap.pixels[i + 2], cap.pixels[i + 3]);
        colors.push(c);
      }
    }

    var i = 0;
    for (var gridY = 0; gridY < tileCount; gridY++) {
      for (var gridX = 0; gridX < tileCount; gridX++) {
        fill(colors[i]);
        rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
        i++;
      }
    }
  }
}