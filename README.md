# DigitalArt
>Art made with digital media in JavaScript. Tools used in this repository are mainly the JavaScript libraries [p5js](https://p5js.org) and [ml5js](https://ml5js.org).

## Projects

`Face2Pix` - Transform your webcam to an art machine.

<img src="/Face2Pix/images/example1.png" width="320"> <img src="/Face2Pix/images/example2.png" width="320">

`TrumpNet` - Do you can write more than Donald Trump tweets?

<img src="/TrumpNet/images/example1.png" width="320"> <img src="/TrumpNet/images/example2.png" width="320">

### Install

`git clone https://github.com/PhilippMaxx/DigitalArt.git`

Running the Sketches
--------------------

While most of the sketches work without running a local webserver, there are some sketches that will not run properly since they use external files<sup>2</sup> (e.g. images or data) to create and inform the visualization. To run the sketches, you are welcome to use a local webserver of your liking.

There are many ways to start a local webserver. Please see the option below

**Option**

One method is to to use the local webserver of your choice (e.g. [simple python webserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)) and open up `localhost:<port>`in your browser<sup>1</sup>.

```
$ cd DigitalArt

$ python -m SimpleHTTPServer 8008
# check localhost:8008
```
