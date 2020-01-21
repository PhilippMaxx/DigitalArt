DigitalArt
==================
>Art made with digital media in JavaScript. Tools used in this repository are mainly the JavaScript libraries [p5js](https://p5js.org) and [ml5js](https://ml5js.org).

Projects
--------------------

`Face2Pix` - Transform your webcam to an art machine.

<img src="/Face2Pix/images/example1.png" width="320"> <img src="/Face2Pix/images/example2.png" width="320">

`TrumpNet` - Do you can write more than Donald Trump tweets?

<img src="/TrumpNet/images/example1.png" width="320"> <img src="/TrumpNet/images/example2.png" width="320">

Setup
--------------------

To run the sketches, you can go to the Github page:

https://philippmaxx.github.io/DigitalArt/

Or if you want to run the sketches locally, <a href="#running-the-sketches-locally">you can download the repository to your local machine</a>.

Running the Sketches locally
--------------------

First download the repository to your local machine:

`git clone https://github.com/PhilippMaxx/DigitalArt.git`

While most of the sketches work without running a local webserver, there are some sketches that will not run properly since they use external files<sup>1</sup> (e.g. images or data) to create and inform the visualization. To run the sketches, you are welcome to use a local webserver of your liking.

There are many ways to start a local webserver. Please see the option below

**Option**

One method is to to use the local webserver of your choice (e.g. [simple python webserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)) and open up `localhost:<port>`in your browser<sup>2</sup>.

```
$ cd DigitalArt

$ python -m SimpleHTTPServer
# check localhost:8000
```

<sup>1</sup>Some sketches work only as expected when the files are placed online, as the rely on "security" sensitive functionality like loading external files. If you try to view them locally without running a web server, you get some kind of "cross-origin" errors 😭 (see your browser's console). The solution is to serve the files using what's called a [local web server](https://github.com/processing/p5.js/wiki/Local-server). This is what happens when you run your own local server.

<sup>2</sup>The default port is `8000`, but you can change the port number by specifying the number after the command `e.g. python -m SimpleHTTPServer 5000`
