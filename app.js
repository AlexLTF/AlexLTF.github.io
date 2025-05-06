
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});
    
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Load/display 3D room
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('room.glb', (gltf) => {
    scene.add(gltf.scene);
});

camera.position.set(10, 10, 8); // adjust as needed

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Adding raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    intersects.forEach((intersect) => {
      console.log("Clicked object name:", intersect.object.name); // debug
        if (intersect.object.parent.name === 'computer') {
            document.getElementById('portfolio').style.display = 'block';
        }
    });
});

// Camera setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0); 
controls.update();

camera.position.set(0, 1.6, 5); // pull back further

// Imporve lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


const portfolioDiv = document.getElementById('portfolio');
const portfolioFrame = document.getElementById('portfolio-frame');

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    intersects.forEach((intersect) => {
        if (intersect.object.name === 'computer') {
            // Set the iframe src only the first time
            if (!portfolioFrame.src || portfolioFrame.src === window.location.href) {
                portfolioFrame.src = 'portfolio.html';
            }
            portfolioFrame.style.display = 'block';
        }
    });
});












