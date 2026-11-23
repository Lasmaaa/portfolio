import * as THREE from 'three';


const projects = [
    {
        id: "001",
        title: "Lash Studio Website",
        category: "SMALL BUSINESS WEBSITE",
        description: "A digital home for my personal small business. The website creates a welcoming online presence and brings important studio information together in one place.",
        image: "../images/lashbook.png",
        technologies: ["Laravel", "CSS", "JavaScript"],
        link: "lashbook.html",
        github: "https://github.com/Lasmaaa/lashbook2"
    },
    {
        id: "002",
        title: "Quiz App",
        category: "INTERACTIVE WEB APP",
        description: "A simple interactive quiz application created to explore web development and build engaging user experiences.",
        image: "../images/quiz.png",
        technologies: ["Laravel", "CSS"],
        link: "quiz.html",
        github: "https://github.com/Lasmaaa/quiz4"
    },
    {
        id: "003",
        title: "Cafe Website",
        category: "WEBSITE DESIGN",
        description: "A clean and aesthetic website created for a cafe, focusing on a warm atmosphere and a welcoming online presence.",
        image: "../images/cafe.png",
        technologies: ["Laravel", "CSS", "JavaScript"],
        link: "cafe.html",
        github: "https://github.com"
    },
    {
        id: "004",
        title: "Booking Website",
        category: "BOOKING SYSTEM",
        description: "A simple and efficient booking system created during my internship.",
        image: "../images/booking.png",
        technologies: ["Laravel", "CSS", "JavaScript"],
        link: "booking.html",
        github: "https://github.com"
    },
    {
        id: "005",
        title: "Erasmus Assistant",
        category: "EDUCATIONAL WEBSITE",
        description: "A website designed to help young people travelling to Portugal as part of the Erasmus+ programme.",
        image: "../images/erasmus.png",
        technologies: ["Laravel", "CSS", "JavaScript"],
        link: "erasmus.html",
        github: "https://github.com/Lasmaaa/erasmus_assistant"
    }
];


const skillSnippets = {
    HTML: `<article class="exhibit-card">\n  <h2>Digital Museum</h2>\n  <p>Where code becomes art.</p>\n</article>`,
    CSS: `.exhibit-card {\n  display: grid;\n  place-items: center;\n  background: #171411;\n  color: #ffd9a6;\n}`,
    JavaScript: `const projects = ['Lash Studio', 'Quiz App'];\nprojects.forEach(item => console.log(\`Loaded: \${item}\`));`,
    Laravel: `Route::get('/projects', function () {\n    return view('projects.index', [\n        'projects' => Project::latest()->get()\n    ]);\n});`,
    MySQL: `SELECT title, category\nFROM projects\nWHERE status = 'published'\nORDER BY created_at DESC;`
};

const skillButtons = document.querySelectorAll("#skill-list span");
const codeBox = document.getElementById("skill-code-box");
const codeTitle = document.getElementById("skill-code-title");
const codeContent = document.getElementById("skill-code-content");
let activeSkill = null;

skillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const skillName = btn.getAttribute("data-skill");

        if (activeSkill === skillName) {
            codeBox.classList.remove("visible");
            btn.classList.remove("active-skill");
            activeSkill = null;
            return;
        }

        skillButtons.forEach((b) => b.classList.remove("active-skill"));
        btn.classList.add("active-skill");

        codeTitle.textContent = `${skillName} — EXAMPLE`;
        codeContent.textContent = skillSnippets[skillName] || "";
        codeBox.classList.add("visible");
        activeSkill = skillName;
    });
});


const container = document.getElementById("museum-canvas");

if (!container) {
    throw new Error("Museum canvas was not found.");
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x171411);
scene.fog = new THREE.Fog(0x171411, 12, 32);

const camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0, 1.7, 8);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

container.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.1
);

scene.add(ambientLight);

const mainLight = new THREE.PointLight(
    0xffd7a3,
    45,
    25
);

mainLight.position.set(0, 5, 0);
mainLight.castShadow = true;
scene.add(mainLight);

for (let i = 0; i < projects.length; i++) {
    const light = new THREE.SpotLight(
        0xffd9a6,
        65,
        12,
        Math.PI / 5,
        0.5
    );

    light.position.set(
        (i - 2) * 3,
        4.5,
        -5.5
    );

    light.target.position.set(
        (i - 2) * 3,
        2,
        -9.7
    );

    scene.add(light);
    scene.add(light.target);
}


const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x29231e,
    roughness: 0.35,
    metalness: 0.25
});

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x302923,
    roughness: 0.9
});

const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0x211c18,
    roughness: 0.9
});


function createRoom() {
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 24),
        floorMaterial
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 24),
        ceilingMaterial
    );

    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 7;
    scene.add(ceiling);

    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 7),
        wallMaterial
    );
    backWall.position.set(0, 3.5, -12);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(24, 7),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-9, 3.5, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(24, 7),
        wallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(9, 3.5, 0);
    scene.add(rightWall);
}

createRoom();

const textureLoader = new THREE.TextureLoader();
const clickableObjects = [];

function createExhibit(project, index) {
    const group = new THREE.Group();

    const x = (index - 2) * 3.2;
    const y = 2.8;
    const z = -11.65;

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.45, 2.05, 0.16),
        new THREE.MeshStandardMaterial({
            color: 0xb18a55,
            metalness: 0.65,
            roughness: 0.35
        })
    );

    group.add(frame);

    const texture = textureLoader.load(
        project.image,
        () => renderer.render(scene, camera),
        undefined,
        () => console.warn("Could not load image:", project.image)
    );

    texture.colorSpace = THREE.SRGBColorSpace;

    const artwork = new THREE.Mesh(
        new THREE.PlaneGeometry(2.25, 1.55),
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
    );

    artwork.position.z = 0.09;
    group.add(artwork);

    artwork.userData.project = project;
    clickableObjects.push(artwork);

    group.position.set(x, y, z);
    scene.add(group);

    const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 0xd5a96c
        })
    );

    marker.position.set(x, 1.15, -11.3);
    scene.add(marker);
}

projects.forEach((project, index) => {
    createExhibit(project, index);
});
const keys = {};
let yaw = 0;
let pitch = 0;
let isDragging = false;
let hasDragged = false;
let startMouseX = 0;
let startMouseY = 0;
let previousMouseX = 0;
let previousMouseY = 0;
let isExploring = false;

const clock = new THREE.Clock();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const startButton = document.getElementById("start-exploring");
const modal = document.getElementById("exhibit-modal");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

/* =====================================
   FULLSCREEN & START EXPLORING
===================================== */

async function enterGallery() {
    try {
        if (!document.fullscreenElement) {
            await container.requestFullscreen();
        }
    } catch (error) {
        console.warn("Fullscreen request failed or denied:", error);
    }

    isExploring = true;
    container.classList.add("immersive");
    if (startButton) startButton.style.display = "none";
    resizeGallery();
}

if (startButton) {
    startButton.addEventListener("click", enterGallery);
}

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        container.classList.remove("immersive");
        isExploring = false;
        if (startButton) startButton.style.display = "block";
    }
    resizeGallery();
});


renderer.domElement.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || (modal && modal.classList.contains("active"))) {
        return;
    }

    isDragging = true;
    hasDragged = false;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;

    renderer.domElement.setPointerCapture(event.pointerId);
    renderer.domElement.classList.add("dragging");
});

renderer.domElement.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;

    const totalMove = Math.hypot(
        event.clientX - startMouseX,
        event.clientY - startMouseY
    );

    if (totalMove > 5) {
        hasDragged = true;
    }

    yaw -= deltaX * 0.004;
    pitch -= deltaY * 0.004;

    pitch = THREE.MathUtils.clamp(
        pitch,
        -Math.PI / 2.5,
        Math.PI / 2.5
    );

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

renderer.domElement.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    isDragging = false;
    renderer.domElement.releasePointerCapture(event.pointerId);
    renderer.domElement.classList.remove("dragging");

    if (!hasDragged && (!modal || !modal.classList.contains("active"))) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObjects(clickableObjects);

        if (intersections.length > 0) {
            const project = intersections[0].object.userData.project;
            openExhibit(project);
        }
    }

    hasDragged = false;
});

function openExhibit(project) {
    document.getElementById("exhibit-category").textContent = `EXHIBIT ${project.id} · ${project.category}`;
    document.getElementById("exhibit-title").textContent = project.title;
    document.getElementById("exhibit-description").textContent = project.description;

    const tags = document.getElementById("exhibit-tags");
    tags.replaceChildren();

    project.technologies.forEach((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        tags.appendChild(tag);
    });

    document.getElementById("exhibit-link").href = project.link;
    document.getElementById("exhibit-github").href = project.github;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}

function closeExhibit() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modal-close").addEventListener("click", closeExhibit);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeExhibit();
    }
});

function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.05);

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    if (isExploring && (!modal || !modal.classList.contains("active"))) {
        direction.set(0, 0, 0);

        if (keys["KeyW"] || keys["ArrowUp"]) direction.z -= 1;
        if (keys["KeyS"] || keys["ArrowDown"]) direction.z += 1;
        if (keys["KeyA"] || keys["ArrowLeft"]) direction.x -= 1;
        if (keys["KeyD"] || keys["ArrowRight"]) direction.x += 1;

        if (direction.lengthSq() > 0) {
            direction.normalize();
            velocity.copy(direction);
            velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
            camera.position.addScaledVector(velocity, delta * 4);
        }

        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -8, 8);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -10.8, 10.8);
        camera.position.y = 1.7;
    }

    renderer.render(scene, camera);
}

animate();

function resizeGallery() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", resizeGallery);