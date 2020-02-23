Digital Art
==================
>Web based artworks powered by JavaScript. Tools used in this repository are mainly the JavaScript libraries [p5js](https://p5js.org), [threejs](https://threejs.org), [Tonejs](https://tonejs.github.io) and [ml5js](https://ml5js.org).

You can see all projects on my Github page: https://philippmaxx.github.io/DigitalArt/.

I would recommend to use Google Chrome or Safari. Make sure you allow the webpage to access your computers camera, sound or microphone if needed.

Projects
--------------------

`Face2Pix` - Transform your webcam to an art machine.

<img src="/Face2Pix/images/example1.png" width="320"> <img src="/Face2Pix/images/example2.png" width="320">

`TrumpNet` - Do you can write more than Donald Trump tweets?

<img src="/TrumpNet/images/example1.png" width="320"> <img src="/TrumpNet/images/example2.png" width="320">

`SoundEye` - Can you stand the SoundEyes?

<img src="/SoundEye/images/example1.png" width="320"> <img src="/SoundEye/images/example2.png" width="320">

`TreeHouseXSaveSpace` - A save space aka treehouse in the world of fluent love

<img src="/TreeHouseXSaveSpace/images/example1.png" width="320"> <img src="/TreeHouseXSaveSpace/images/example2.png" width="320">

`UniverseBeats` - Beats in the Universe.

<img src="/UniverseBeats/images/example1.png" width="320"> <img src="/UniverseBeats/images/example2.png" width="320">


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

On the local server for Google Chrome you need to work around the security when you want to use sound applictions at the moment. However this is kind of an advanced procedure and may only be followed when you feel confident with the steps. You need to access via a local HTTPS server. To do so, create a certificate first and follow the steps. Then execute the HTTPS server python script<sup>3</sup>.

```
$ openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
$ python simple-https-server.py
```

Next, enable localhost to use an invalid certificate. To do so, type the following<sup>4</sup> to your Google Chrome search bar and check ENABLE on the marked entry.

`chrome://flags/#allow-insecure-localhost`

Again, enable your computers camera, sound or microphone and you are good to go.

Comments
--------------------

<sup>1</sup>Some sketches work only as expected when the files are placed online, as the rely on "security" sensitive functionality like loading external files. If you try to view them locally without running a web server, you get some kind of "cross-origin" errors 😭 (see your browser's console). The solution is to serve the files using what's called a [local web server](https://github.com/processing/p5.js/wiki/Local-server). This is what happens when you run your own local server.

<sup>2</sup>The default port is `8000`, but you can change the port number by specifying the number after the command `e.g. python -m SimpleHTTPServer 5000`

<sup>3</sup>You should have python 2.x as a default installed when using mac or linux. However on windows I would recommend to use a shell and download the latest python 2.x version first. Code credit for the script: https://gist.github.com/dergachev/7028596

<sup>4</sup> From a discussion on stackoverflow: https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate?page=2&tab=votes#tab-top
