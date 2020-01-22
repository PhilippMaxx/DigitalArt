// Tone.AutoPanner() --> links und rechts audio untershciend
// Tone.Noise(white) - noise
// Tone.Autofilter - lfo

var tileCount = 2;

var tileWidth;
var tileHeight;
var shapeSize = 150;
var newShapeSize = shapeSize;
var maxDist;
var currentShape;
var shapes;

var oscillator;
var autoFilter;

var sizeMode = 0;

var freqX;
var freqY;

var state = 0;

function preload() {
  shapes = [];
  shapes.push(loadImage('data/eye3.svg'));
  shapes.push(loadImage('data/eye2.svg'));
}


//create an autofilter and start it's LFO
autoFilter = new Tone.AutoFilter(2);

var autoPanner = new Tone.AutoPanner(0, type='triangle').toMaster().start();

autoFilter.baseFrequency = 2000;

// resonance
autoFilter.filter.Q.value = 4;

//autoFilter.filter.rolloff = -12;

autoFilter.connect(autoPanner).toMaster().start();
//route an oscillator through the filter and start it

oscillator = new Tone.Oscillator(50, type='sawtooth');

oscillator.detune.value = 700;

oscillator.connect(autoFilter).connect(autoPanner);

function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);
  // noCursor();
  // set the current shape to the first in the array
  currentShape = shapes[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));

  // connect p5js and Tonejs
  Tone.Transport.start();
  oscillator.start(0);


}

function draw() {

  freqX = map(mouseX, 0, displayWidth, 0, 1);
  freqY = map(mouseY, 0, displayHeight, 0, 1);
  if (state==0) background((68 - 68*2*abs(freqX - 0.5)) + (68 - 68*2*abs(freqY - 0.5)),0,0);
  if (state==1) background((255 - 255*2*abs(freqX - 0.5)) + (255 - 255*2*abs(freqY - 0.5)));
  autoFilter.frequency.value = (8 - 7*2*abs(freqX - 0.5)) + (8 - 7*2*abs(freqY - 0.5));
  autoFilter.filter.Q.value = (20 - 18*2*abs(freqX - 0.5)) + (20 - 18*2*abs(freqY - 0.5));
  oscillator.detune.value = (1000 - 650*2*abs(freqX - 0.5)) + (1000 - 650*2*abs(freqY - 0.5));
  autoPanner.frequency.value = (0.5 - abs(freqX - 0.5)) + (0.5 - abs(freqY - 0.5));
  for (var gridY = 0; gridY < int((displayHeight/displayWidth) * tileCount); gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileWidth * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) ;

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      push();
      translate(posX, posY);
      rotate(angle);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('soundeye', 'png');
  if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
  if (key == 'g' || key == 'G') {
    tileCount += 6;
    shapeSize-=10;
    if (tileCount > 20) {
      tileCount = 2;
      shapeSize+=40;
    }
    tileWidth = width / tileCount;
    tileHeight = height / tileCount;
  }

  if (key == '1') {
    currentShape = shapes[0];
    state = 0;
  }
  if (key == '2') {
    currentShape = shapes[1];
    state = 1;
  }

  if (keyCode == UP_ARROW) shapeSize = min(shapeSize + 10, 200);
  if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 10, 50);
}


