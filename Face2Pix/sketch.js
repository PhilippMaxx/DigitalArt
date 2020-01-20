// Face2Pix
//
// credits: Philipp Möhl
//
//

let sketch = function(p) {
  
  
  let x = 100;
  let y = 100;
  let d = 0;
  let startDist = 0;
  let newPerson = -10000;

  let leftEyeX = 0;
  let leftEyeY = 0
  let rightEyeX = 0;
  let rightEyeY = 0;

  let colors = [];

  let cap;
  let poseNet;

  p.setup = function() {
    p.createCanvas(640, 480);
    cap = p.createCapture(p.VIDEO);
    p.noStroke()
    poseNet = ml5.poseNet(cap);
    poseNet.on('pose', p.gotPoses);
    cap.hide()
  };

  p.gotPoses = function(poses){
    if (poses.length > 0){
      lEX = poses[0].pose.keypoints[1].position.x;
      lEY = poses[0].pose.keypoints[1].position.y;
      rEX = poses[0].pose.keypoints[2].position.x;
      rEY = poses[0].pose.keypoints[2].position.y;
      leftEyeX = p.lerp(leftEyeX, lEX, 0.9);
      leftEyeY = p.lerp(leftEyeY, lEY, 0.9);
      rightEyeX = p.lerp(rightEyeX, rEX, 0.9);
      rightEyeY = p.lerp(rightEyeY, rEY, 0.9);
    } else {
      leftEyeX = 0;
      leftEyeY = 0
      rightEyeX = 0;
      rightEyeY = 0;
    }
  }

  p.draw = function() {
    if (d > 0) {
      if (startDist == 0){ 
          startDist = d;
      }
      
    }else{
      startDist = 0;
    }

    
    d = p.int(p.dist(leftEyeX, leftEyeY,
                 rightEyeX, rightEyeY));

    var tileCount = p.max(p.int(p.max(d-startDist, 1)/5)*(p.width/80),5);
    if (tileCount == 5){


      if (cap.loadedmetadata) {
        let c = cap.get(p.int(p.random(p.width/4, p.width/2)), p.int(p.random(p.height/4, p.height/2)), p.width/4, p.height/4);
        //c.filter(INVERT);
        p.image(c, 3*p.width/8, 3*p.height/8,p.width/4, p.height/4);
      }
      p.filter(p.INVERT);

    } else {
      tileCount = p.floor(p.width /tileCount);
      var rectSize = p.width / tileCount;

      cap.loadPixels();

      colors = [];
      for (var gridY = 0; gridY < tileCount; gridY++) {
        for (var gridX = 0; gridX < tileCount; gridX++) {
          var px = p.int(gridX * rectSize);
          var py = p.int(gridY * rectSize);
          var i = (py * cap.width + px) * 4;
          var c = p.color(cap.pixels[i], cap.pixels[i + 1], cap.pixels[i + 2], cap.pixels[i + 3]);
          colors.push(c);
        }
      }

      var i = 0;
      for (var gridY = 0; gridY < tileCount; gridY++) {
        for (var gridX = 0; gridX < tileCount; gridX++) {
          p.fill(colors[i]);
          p.rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
          i++;
        }
      }
    }
    
  }

  p.keyPressed = function(){
    if (p.key == 's' || p.key == 'S') p.saveCanvas('face2pix', 'png');
  }
}

let myp5 = new p5(sketch);