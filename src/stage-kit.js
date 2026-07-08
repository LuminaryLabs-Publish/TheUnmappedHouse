import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { DESIGN_ASPECT, DESIGN_HEIGHT, DESIGN_WIDTH, applyAspectFrame, computeAspectFrame } from "./aspect-frame.js";

const STAGE_VERTEX = `
varying vec3 vWorld;
varying vec3 vNormal;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const STAGE_FRAGMENT = `
precision highp float;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;
uniform float scale;
uniform float time;
uniform float toonSteps;
uniform vec3 lightDir;
varying vec3 vWorld;
varying vec3 vNormal;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p *= 2.01;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 weights = abs(n);
  weights /= weights.x + weights.y + weights.z;

  vec3 p = vWorld * scale;
  float tx = fbm(p.yz + vec2(time * 0.01, 0.0));
  float ty = fbm(p.xz + vec2(0.0, time * 0.007));
  float tz = fbm(p.xy + vec2(time * 0.006, time * 0.004));
  float tri = tx * weights.x + ty * weights.y + tz * weights.z;

  vec3 base = mix(colorA, colorB, tri);
  base = mix(base, colorC, smoothstep(0.62, 1.0, tri) * 0.34);

  float lit = max(dot(n, normalize(lightDir)), 0.0);
  float toon = floor(lit * toonSteps) / max(toonSteps - 1.0, 1.0);
  float rim = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.0) * 0.12;

  gl_FragColor = vec4(base * (0.38 + toon * 0.72 + rim), 1.0);
}`;

const POST_VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const POST_FRAGMENT = `
precision highp float;
uniform sampler2D tDiffuse;
uniform float time;
uniform float grain;
uniform float vignette;
uniform float chromatic;
uniform float distortion;
uniform float memory;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.0, 289.0))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float radius = length(centered);

  float warp = sin((uv.y + time * 0.04) * 28.0) * distortion * memory;
  vec2 warped = uv + centered * distortion * radius + vec2(warp, 0.0);

  vec4 base;
  base.r = texture2D(tDiffuse, warped + vec2(chromatic * radius, 0.0)).r;
  base.g = texture2D(tDiffuse, warped).g;
  base.b = texture2D(tDiffuse, warped - vec2(chromatic * radius, 0.0)).b;
  base.a = 1.0;

  float g = hash(uv * vec2(1200.0, 800.0) + time);
  base.rgb += (g - 0.5) * grain;

  float vig = smoothstep(0.88, 0.24, radius);
  base.rgb *= mix(1.0, vig, vignette);

  float scan = sin((uv.y + time * 0.02) * 900.0) * 0.012 * memory;
  base.rgb -= scan;

  gl_FragColor = base;
}`;

export class StageKit {
  constructor({ root, hoverLabel, onHotspot }) {
    if (!root) throw new Error("StageKit requires a root element.");

    this.root = root;
    this.hoverLabel = hoverLabel;
    this.onHotspot = onHotspot;
    this.clock = new THREE.Clock();
    this.pointer = new THREE.Vector2();
    this.mouse = new THREE.Vector2();
    this.hovered = null;
    this.hotspots = [];
    this.materials = [];
    this.parallax = { x: 0, y: 0 };
    this.frameElement = root.closest("#aspect-frame") ?? root;
    this.viewport = { x: 0, y: 0, width: DESIGN_WIDTH, height: DESIGN_HEIGHT, scale: 1, aspect: DESIGN_ASPECT };

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.pixelRatio = Math.min(devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(DESIGN_WIDTH, DESIGN_HEIGHT, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.stageGroup = new THREE.Group();
    this.scene.add(this.stageGroup);

    this.camera = new THREE.PerspectiveCamera(42, DESIGN_ASPECT, 0.1, 250);
    this.raycaster = new THREE.Raycaster();

    this.light = new THREE.DirectionalLight(0xffdfb0, 3.0);
    this.light.position.set(-5, 8, 5);
    this.light.castShadow = true;
    this.scene.add(this.light, new THREE.HemisphereLight(0xf6e6d0, 0x1c2230, 1.1));

    this.target = new THREE.WebGLRenderTarget(DESIGN_WIDTH * this.pixelRatio, DESIGN_HEIGHT * this.pixelRatio, { samples: 2 });
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.postMaterial = new THREE.ShaderMaterial({
      vertexShader: POST_VERTEX,
      fragmentShader: POST_FRAGMENT,
      uniforms: {
        tDiffuse: { value: this.target.texture },
        time: { value: 0 },
        grain: { value: 0.16 },
        vignette: { value: 0.36 },
        chromatic: { value: 0.001 },
        distortion: { value: 0.002 },
        memory: { value: 0.0 }
      }
    });
    this.postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.postMaterial));

    this.resize();
    addEventListener("resize", () => this.resize());
    this.renderer.domElement.addEventListener("mousemove", (event) => this.handlePointer(event));
    this.renderer.domElement.addEventListener("click", () => this.clickHotspot());

    this.animate();
  }

  animeMaterial(preset = {}) {
    const colors = preset.colors ?? ["#4e5668", "#161b24", "#d8b36b"];
    const material = new THREE.ShaderMaterial({
      vertexShader: STAGE_VERTEX,
      fragmentShader: STAGE_FRAGMENT,
      uniforms: {
        colorA: { value: new THREE.Color(colors[0]) },
        colorB: { value: new THREE.Color(colors[1]) },
        colorC: { value: new THREE.Color(colors[2]) },
        scale: { value: preset.scale ?? 0.12 },
        time: { value: 0 },
        toonSteps: { value: preset.toonSteps ?? 4 },
        lightDir: { value: new THREE.Vector3(-0.45, 0.76, 0.28).normalize() }
      }
    });
    this.materials.push(material);
    return material;
  }

  loadScene(sceneData) {
    this.sceneData = sceneData;
    this.stageGroup.clear();
    this.hotspots = [];
    this.materials = [];

    this.scene.background = new THREE.Color(sceneData.backgroundColor ?? "#121722");
    if (sceneData.fog) {
      this.scene.fog = new THREE.FogExp2(sceneData.backgroundColor ?? "#121722", sceneData.fog);
    } else {
      this.scene.fog = null;
    }

    const cam = sceneData.camera;
    this.baseCamera = {
      position: new THREE.Vector3(...cam.position),
      lookAt: new THREE.Vector3(...cam.lookAt),
      fov: cam.fov ?? 40
    };
    this.camera.fov = this.baseCamera.fov;
    this.camera.aspect = DESIGN_ASPECT;
    this.camera.updateProjectionMatrix();

    for (const layer of sceneData.stage.layers ?? []) this.createLayer(layer);
    for (const prop of sceneData.stage.props ?? []) this.createProp(prop);
    for (const hotspot of sceneData.hotspots ?? []) this.createHotspot(hotspot);

    const post = sceneData.post ?? {};
    this.postMaterial.uniforms.grain.value = post.grain ?? 0.16;
    this.postMaterial.uniforms.vignette.value = post.vignette ?? 0.36;
    this.postMaterial.uniforms.chromatic.value = post.chromatic ?? 0.001;
    this.postMaterial.uniforms.distortion.value = post.distortion ?? 0.002;
    this.postMaterial.uniforms.memory.value = post.memory ?? 0.0;
  }

  createLayer(layer) {
    const material = this.animeMaterial(layer.material);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(layer.size[0], layer.size[1], 6, 6), material);
    mesh.position.set(...layer.position);
    mesh.rotation.set(...(layer.rotation ?? [0, 0, 0]));
    mesh.receiveShadow = true;
    this.stageGroup.add(mesh);
  }

  createProp(prop) {
    const material = this.animeMaterial(prop.material);
    const geometry = prop.kind === "plane"
      ? new THREE.PlaneGeometry(prop.size[0], prop.size[1], 4, 4)
      : prop.kind === "cylinder"
        ? new THREE.CylinderGeometry(prop.radiusTop ?? 0.5, prop.radiusBottom ?? 0.5, prop.height ?? 1, prop.segments ?? 12)
        : new THREE.BoxGeometry(...(prop.size ?? [1, 1, 1]));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...prop.position);
    mesh.rotation.set(...(prop.rotation ?? [0, 0, 0]));
    mesh.scale.set(...(prop.scale ?? [1, 1, 1]));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.stageGroup.add(mesh);
  }

  createHotspot(hotspot) {
    const geometry = new THREE.BoxGeometry(...(hotspot.size ?? [1, 1, 0.1]));
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, depthWrite: false });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...hotspot.position);
    mesh.rotation.set(...(hotspot.rotation ?? [0, 0, 0]));
    mesh.userData.hotspot = hotspot;
    this.stageGroup.add(mesh);
    this.hotspots.push(mesh);
  }

  handlePointer(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouse.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    this.mouse.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));

    const hit = this.pick();
    this.hovered = hit?.object?.userData?.hotspot ?? null;
    if (this.hoverLabel) {
      this.hoverLabel.hidden = !this.hovered;
      if (this.hovered) {
        this.hoverLabel.textContent = this.hovered.label;
        const frameRect = this.frameElement.getBoundingClientRect();
        this.hoverLabel.style.left = `${event.clientX - frameRect.left + 14}px`;
        this.hoverLabel.style.top = `${event.clientY - frameRect.top + 14}px`;
      }
    }
  }

  pick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    return this.raycaster.intersectObjects(this.hotspots, false)[0] ?? null;
  }

  clickHotspot() {
    const hit = this.pick();
    const hotspot = hit?.object?.userData?.hotspot;
    if (hotspot && this.onHotspot) this.onHotspot(hotspot);
  }

  resize() {
    this.pixelRatio = Math.min(devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.viewport = applyAspectFrame(this.frameElement, computeAspectFrame(innerWidth, innerHeight));

    this.camera.aspect = DESIGN_ASPECT;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.viewport.width, this.viewport.height, false);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.inset = "0";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";

    this.target.setSize(
      Math.max(1, Math.floor(this.viewport.width * this.pixelRatio)),
      Math.max(1, Math.floor(this.viewport.height * this.pixelRatio))
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = this.clock.getElapsedTime();

    if (this.baseCamera) {
      const p = this.baseCamera.position.clone();
      p.x += this.mouse.x * 0.16;
      p.y += this.mouse.y * 0.08;
      this.camera.position.copy(p);
      this.camera.lookAt(this.baseCamera.lookAt);
    }

    for (const material of this.materials) {
      material.uniforms.time.value = time;
    }
    this.postMaterial.uniforms.time.value = time;

    this.renderer.setRenderTarget(this.target);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCamera);
  }
}
