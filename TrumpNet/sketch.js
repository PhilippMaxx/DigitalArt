// Code idea is from the book 
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var textTyped = '';
var font;

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;

var centerX;
var centerY;
var offsetX;
var offsetY;
var zoom;
var state;
var splitText;

var actRandomSeed;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  shapeSpace = loadImage('data/space.svg');
  shapeSpace2 = loadImage('data/space2.svg');
  shapePeriod = loadImage('data/period.svg');
  shapeComma = loadImage('data/comma.svg');
  shapeExclamationmark = loadImage('data/exclamationmark.svg');
  shapeQuestionmark = loadImage('data/questionmark.svg');
  shapeReturn = loadImage('data/return.svg');
  splitText = loadStrings('data/tweets.txt');
}

function setup() {
  let c = createCanvas(windowWidth, windowHeight);

  textTyped += 'I am beginning!\n';
  splitText = join(splitText, '\n') 
  splitText = split(splitText, ' ');


  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;
  state = 0;

  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  if (keyIsDown(107) || keyIsDown(187)) {
    textTyped += splitText[state] + ' ';
    state++;
  }

  if (mouseIsPressed && mouseButton == LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  // allways produce the same sequence of random numbers
  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);
  

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
    case ' ': // space
      // 50% left, 50% right
      var dir = floor(random(0, 2));
      if (dir == 0) {
        image(shapeSpace, 1, -15);
        translate(4, 1);
        rotate(QUARTER_PI);
      }
      if (dir == 1) {
        image(shapeSpace2, 1, -15);
        translate(14, -5);
        rotate(-QUARTER_PI);
      }
      break;

    case ',':
      image(shapeComma, 1, -15);
      translate(35, 15);
      rotate(QUARTER_PI);
      break;

    //case 'T':
    //  text(splitText[state], 0, 0);
    //  translate(textWidth(splitText[state]), 0);
    //  var dir = floor(random(0, 2));
    //  if (dir == 0) {
    //    image(shapeSpace, 1, -15);
    //    translate(4, 1);
    //    rotate(QUARTER_PI);
    //    }
    //  if (dir == 1) {
    //    image(shapeSpace2, 1, -15);
    //    translate(14, -5);
    //    rotate(-QUARTER_PI);
    //  }
    //  state++;
    //  break;

    case '.':
      image(shapePeriod, 1, -55);
      translate(56, -56);
      rotate(-HALF_PI);
      break;

    case '!':
      image(shapeExclamationmark, 1, -27);
      translate(42.5, -17.5);
      rotate(-QUARTER_PI);
      break;

    case '?':
      image(shapeQuestionmark, 1, -27);
      translate(42.5, -17.5);
      rotate(-QUARTER_PI);
      break;

    case '\n': // return
      image(shapeReturn, 1, -15);
      translate(1, 10);
      rotate(PI);
      break;

    case '+': // return
      break;

    default: // all others
      text(letter, 0, 0);
      translate(letterWidth, 0);
    }
  }

  // blink cursor after text
  if (frameCount / 6 % 2 == 0) rect(0, 0, 15, 2);
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas('trumpnet', 'png');
  if (keyCode == ALT) actRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
  case DELETE:
  case BACKSPACE:
    textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
    print(textTyped);
    break;
  case ENTER:
  case RETURN:
    // enable linebreaks
    textTyped += '\n';
    break;
  case UP_ARROW:
    zoom += 0.05;
    break;
  case DOWN_ARROW:
    zoom -= 0.05;
    break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    print(textTyped);
  }
}
