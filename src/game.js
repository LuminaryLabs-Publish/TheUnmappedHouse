import { StageKit } from "./stage-kit.js";
import { gameTitle, scenes } from "./story-data.js";

const title = document.querySelector("#scene-title");
const text = document.querySelector("#scene-text");
const hotspotList = document.querySelector("#hotspot-list");
const debug = document.querySelector("#state-debug");
const hoverLabel = document.querySelector("#hover-label");
const interlude = document.querySelector("#interlude");
const interludeTitle = document.querySelector("#interlude-title");
const interludeText = document.querySelector("#interlude-text");
const continueButton = document.querySelector("#continue-button");

const SAVE_KEY = "the-unmapped-house.stage-prototype.v1";

const state = loadState();
let currentScene = scenes.find((scene) => scene.id === state.sceneId) ?? scenes[0];

const stage = new StageKit({
  root: document.querySelector("#stage"),
  hoverLabel,
  onHotspot: inspectHotspot
});

function createInitialState() {
  return {
    sceneId: scenes[0].id,
    clues: [],
    flags: {},
    inspected: {},
    route: [scenes[0].id],
    log: ["The notebook opens to a blank page."]
  };
}

function loadState() {
  try {
    return { ...createInitialState(), ...JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function hasClue(clue) {
  return state.clues.includes(clue);
}

function grantClues(clues = []) {
  for (const clue of clues) {
    if (!state.clues.includes(clue)) state.clues.push(clue);
  }
}

function writeLog(entry) {
  state.log.unshift(entry);
  state.log = state.log.slice(0, 8);
}

function sceneComplete(scene) {
  return scene.requiresToComplete.every(hasClue);
}

function inspectHotspot(hotspot) {
  const sceneSeen = state.inspected[currentScene.id] ?? {};
  if (sceneSeen[hotspot.id]) {
    text.textContent = hotspot.text;
    writeLog(`Re-read: ${hotspot.label}`);
    renderUi();
    saveState();
    return;
  }

  sceneSeen[hotspot.id] = true;
  state.inspected[currentScene.id] = sceneSeen;
  grantClues(hotspot.grants ?? []);
  text.textContent = hotspot.text;
  writeLog(hotspot.changesText ?? `Observed ${hotspot.label}.`);

  if (sceneComplete(currentScene)) {
    writeLog("The map accepts the room.");
    setTimeout(() => showInterlude(currentScene), 450);
  }

  renderUi();
  saveState();
}

function showInterlude(scene) {
  interludeTitle.textContent = scene.interludeTitle;
  interludeText.textContent = scene.interludeText;
  interlude.classList.add("open");
  interlude.setAttribute("aria-hidden", "false");
}

function nextScene() {
  const index = scenes.findIndex((scene) => scene.id === currentScene.id);
  const next = scenes[index + 1];
  if (!next) {
    interludeTitle.textContent = "Prototype complete";
    interludeText.textContent = "The stage kit slice has proven fixed camera, hotspots, clues, state, shaders, and post-processing. The house is only partly mapped.";
    return;
  }

  currentScene = next;
  state.sceneId = currentScene.id;
  if (!state.route.includes(currentScene.id)) state.route.push(currentScene.id);
  writeLog(`Entered ${currentScene.title}.`);
  interlude.classList.remove("open");
  interlude.setAttribute("aria-hidden", "true");
  stage.loadScene(currentScene);
  renderUi();
  saveState();
}

function renderUi() {
  title.textContent = currentScene.title;
  if (!text.textContent || text.textContent === "Loading") text.textContent = currentScene.openingText;

  hotspotList.textContent = "";
  for (const hotspot of currentScene.hotspots) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inspect-button";
    button.textContent = state.inspected[currentScene.id]?.[hotspot.id] ? `${hotspot.label} ✓` : hotspot.label;
    button.addEventListener("click", () => inspectHotspot(hotspot));
    hotspotList.append(button);
  }

  debug.textContent = JSON.stringify({
    game: gameTitle,
    scene: currentScene.id,
    clues: state.clues,
    route: state.route,
    inspected: state.inspected[currentScene.id] ?? {},
    complete: sceneComplete(currentScene),
    latest: state.log.slice(0, 5)
  }, null, 2);
}

continueButton.addEventListener("click", nextScene);
addEventListener("keydown", (event) => {
  if (event.code === "KeyR") {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
});

stage.loadScene(currentScene);
renderUi();
saveState();
