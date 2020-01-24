import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r112/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r112/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

function main() {
  const canvas = document.querySelector('#c');
  const view1Elem = document.querySelector('#view1');
  const view2Elem = document.querySelector('#view2');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // first camera - outside
  const fov = 90;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(40, 20, 40);

  const cameraHelper = new THREE.CameraHelper(camera);

  const controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 15, 0);
  controls.update();

  // GUI helpers
  class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min;  // this will call the min setter
    }
  }

  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 40).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }

  // second camera - inner
  const camera2 = new THREE.PerspectiveCamera(
    70,  // fov
    2,   // aspect
    0.1, // near
    500, // far
  );
  camera2.position.set(0, 15, -5);
  //camera2.lookAt(0, 5, 0);

  const controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 15, 0);
  controls2.update();

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');
  scene.add(cameraHelper);

  // plane 
  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  // cube with windows design
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(-1, -1,  1),  // 0
    new THREE.Vector3( 1, -1,  1),  // 1
    new THREE.Vector3(-1,  1,  1),  // 2
    new THREE.Vector3( 1,  1,  1),  // 3
    new THREE.Vector3(-1, -1, -1),  // 4
    new THREE.Vector3( 1, -1, -1),  // 5
    new THREE.Vector3(-1,  1, -1),  // 6
    new THREE.Vector3( 1,  1, -1),  // 7

    new THREE.Vector3(-0.5, -0.5,  1),  // 8
    new THREE.Vector3( 0.5, -0.5,  1),  // 9
    new THREE.Vector3(-0.5,  0.5,  1),  // 10
    new THREE.Vector3( 0.5,  0.5,  1),  // 11

  );

  /*
       6----7
      /|   /|
     2----3 |
     | |  | |
     | 4--|-5
     |/   |/
     0----1
  */

  geometry.faces.push(
     // front
     new THREE.Face3(0, 8, 10),
     new THREE.Face3(0, 1, 8),
     new THREE.Face3(1, 8, 9),
     new THREE.Face3(1, 9, 3),
     new THREE.Face3(3, 9, 11),
     new THREE.Face3(3, 11, 2),
     new THREE.Face3(2, 11, 10),
     new THREE.Face3(2, 10, 0),
     // right
     new THREE.Face3(1, 7, 3),
     new THREE.Face3(1, 5, 7),
     // back
     new THREE.Face3(5, 6, 7),
     new THREE.Face3(5, 4, 6),
     // left
     new THREE.Face3(4, 2, 6),
     new THREE.Face3(4, 0, 2),
     // top
     new THREE.Face3(2, 7, 6),
     new THREE.Face3(2, 3, 7),
     // bottom
     new THREE.Face3(4, 1, 0),
     new THREE.Face3(4, 5, 1),
  );

  geometry.computeFaceNormals();

  function makeInstance(geometry, color, x, y, z) {
    const material = new THREE.MeshPhongMaterial({
      color,
      side: THREE.DoubleSide
    });

    const cube = new THREE.Mesh(geometry, material);

    // cube position
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;


    //scene.add(cube);

    return cube;
  }



  const cube1 = makeInstance(geometry, "#white",  0, 15, 0);
  // cube scale
  cube1.scale.x = 5;
  cube1.scale.y = 5;
  cube1.scale.z = 5;
  cube1.castShadow = true;
  cube1.receiveShadow = true;
  scene.add(cube1);

  function addObject(x, y, z, obj) {
    obj.position.x = x * 1;
    obj.position.y = y * 1;
    obj.position.z = z * 1;

    scene.add(obj);
    objects.push(obj);
  }

  {
    const loader = new THREE.FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

    async function doit() {
      const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');  
      const geometry = new THREE.TextBufferGeometry('HELP', {
        font: font,
        size: 30.0,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: .2,
        bevelSegments: 5,
      });
      const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 'blue'}));
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

      const parent = new THREE.Object3D();
      parent.add(mesh);

      addObject(0, 20, -15, parent);
    }
    doit();
  }

  const shape = new THREE.Shape();
  const x = -2.5;
  const y = -5;
  shape.moveTo(x + 2.5, y + 2.5);
  shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  const extrudeSettings = {
    steps: 3,
    depth: 3,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2,
  };
  
  const heart = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  
  // const cubeSize = 2;
  // const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({color: 'blue'});
  const cube2 = new THREE.Mesh(heart, cubeMat);
  cube2.position.set(0, 15, 30);
  cube2.castShadow = true;
  cube2.receiveShadow = true;
  scene.add(cube2);


  const targetGeometry = new THREE.SphereBufferGeometry(.5, 6, 3);
  const targetMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
  const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);

  const targetOrbit = new THREE.Object3D();
  
  const targetElevation = new THREE.Object3D();
  
  const targetBob = new THREE.Object3D();
  
  targetMesh.castShadow = true;
  scene.add(targetOrbit);
  targetOrbit.add(targetElevation);
  targetElevation.position.z = 3;
  targetElevation.position.y = 15;
  targetElevation.add(targetBob);
  targetBob.add(targetMesh);

  const points = [];
  for (let i = 0; i < 10; ++i) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
  }
  const targetGeometry2 = new THREE.LatheBufferGeometry(points);
  const targetMaterial2 = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: false});
  const targetMesh2 = new THREE.Mesh(targetGeometry2, targetMaterial2);

  const targetOrbit2 = new THREE.Object3D();
  
  const targetElevation2 = new THREE.Object3D();
  
  const targetBob2 = new THREE.Object3D();
  
  targetMesh2.castShadow = true;
  targetMesh2.receiveShadow = true;
  scene.add(targetOrbit2);
  targetOrbit2.add(targetElevation2);
  targetElevation2.position.z = 15;
  targetElevation2.position.y = 15;
  targetElevation2.add(targetBob2);
  targetBob2.add(targetMesh2);

  const radius = 3.5;
  const tube = 1.5;
  const radialSegments = 8;
  const tubularSegments = 64;
  const p = 2;
  const q = 3;
  const targetGeometry3 = new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q);
  const targetMaterial3 = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
  const targetMesh3 = new THREE.Mesh(targetGeometry3, targetMaterial3);

  const targetOrbit3 = new THREE.Object3D();
  
  const targetElevation3 = new THREE.Object3D();
  
  const targetBob3 = new THREE.Object3D();
  
  targetMesh3.castShadow = true;
  scene.add(targetOrbit3);
  targetOrbit3.add(targetElevation3);
  targetElevation3.position.z = -10;
  targetElevation3.position.x = -10;
  targetElevation3.position.y = 15;
  targetElevation3.add(targetBob3);
  targetBob3.add(targetMesh3);



  // Create a sine-like wave
  const curve = new THREE.SplineCurve( [
    new THREE.Vector2( -10, 0 ),
    new THREE.Vector2( -5, 5 ),
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 5, -5 ),
    new THREE.Vector2( 10, 0 ),
    new THREE.Vector2( 5, 10 ),
    new THREE.Vector2( -5, 10 ),
    new THREE.Vector2( -10, -10 ),
    new THREE.Vector2( -15, -8 ),
    new THREE.Vector2( -10, 0 ),
  ] );
  {
    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    const splineObject = new THREE.Line( geometry, material );
    splineObject.rotation.x = Math.PI * .5;
    splineObject.position.y = 0.05;
    scene.add(splineObject);
  }

  // const targetPosition = new THREE.Vector3();


  // {
  //   const cubeSize = 10;
  //   const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  //   const cubeMat = new THREE.MeshPhongMaterial({
  //     color: '#8AC',
  //     side: THREE.DoubleSide
  //   });
  //   const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  //   mesh.position.set(0, 1.5 * cubeSize, 0);
  //   scene.add(mesh);
  // }

  // point light
  const color = "#c8ab76";
  const intensity = 1;
  const light = new THREE.PointLight(color, intensity);
  light.power = 600;
  light.decay = 1;
  light.distance = Infinity;
  light.position.set(0, 15, 0);

  light.castShadow = true;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 60;
  light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
  scene.add(light);

  const helper = new THREE.PointLightHelper(light);
  scene.add(helper);

  // outer light 
  const color2 = '#e14444';
  const intensity2 = 0.4;
  const light2 = new THREE.DirectionalLight(color2, intensity2);
  light2.position.set(0, 30, 0);
  light2.target.position.set(0, 15, 0);
  light2.castShadow = true;
  light2.shadow.camera.near = 1;
  light2.shadow.camera.far = 60;
  light2.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
  scene.add(light2);
  scene.add(light2.target);
  
  const helper2 = new THREE.DirectionalLightHelper(light2);
  scene.add(helper2);
  
  function updateLight() {
    helper.update();
    light2.target.updateMatrixWorld();
    helper2.update();
  }


  const gui = new GUI();

  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color inner');
  gui.add(light, 'decay', 0, 4, 0.01).name('decay inner');
  gui.add(light, 'power', 0, 2000).name('power inner');

  makeXYZGUI(gui, light.position, 'position inner');

  gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('color outer');
  
  gui.add(light2, 'intensity', 0, 2, 0.01).name('intensity outer');
   
  makeXYZGUI(gui, light2.position, 'position outer', updateLight);
  makeXYZGUI(gui, light2.target.position, 'target outer', updateLight);

  gui.add(camera, 'fov', 1, 180).name('fov outer');
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near outer');
  gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far outer');
  var obj = {
    add: function() {
      render();
      canvas.toBlob((blob) => {
        saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
      });
    }
  };
  gui.add(obj, "add").name("Save as png");

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function setScissorForElement(elem) {
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  function render(time) {
    time *= 0.001;

    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set("black");

      // render
      renderer.render(scene, camera);
    }

    // render from the 2nd camera
    {
      const aspect = setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set("black");

      renderer.render(scene, camera2);
    }

    // move target
    targetOrbit.rotation.y = time * .27;
    targetBob.position.y = Math.sin(time * 2) * 4;
    targetMesh.rotation.x = time * 7;
    targetMesh.rotation.y = time * 13;
    targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
    targetMaterial.color.setHSL(time * 10 % 1, 1, .25);

    // move target 2
    targetOrbit2.rotation.y = time * .83;
    targetBob2.position.y = Math.sin(time * 2) * 4;
    targetMesh2.rotation.x = time * 20;
    targetMesh2.rotation.y = time * 13;

    // move target 3
    targetOrbit3.rotation.y = time * .40;
    targetBob3.position.y = Math.sin(time * 2) * 4;
    targetMesh3.rotation.x = time * 10;
    targetMesh3.rotation.y = time * 5;
    targetMaterial3.emissive.setHSL(time * 10 % 1, 1, .25);
    targetMaterial3.color.setHSL(time * 10 % 1, 1, .25);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  const saveBlob = (function() {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function saveData(blob, fileName) {
       const url = window.URL.createObjectURL(blob);
       a.href = url;
       a.download = fileName;
       a.click();
    };
  }());

}

main();
