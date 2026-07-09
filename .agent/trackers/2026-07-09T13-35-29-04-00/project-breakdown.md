# Project Breakdown - The Unmapped House

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry repo was fully new, central-ledger absent, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`TheUnmappedHouse` was selected because central tracking was still at `2026-07-09T11-00-39-04-00`, while repo-local `.agent/START_HERE.md` had already advanced to `2026-07-09T13-29-43-04-00` and other same-day Publish repo ledgers were newer. This pass records a central-ledger parity catch-up and keeps the next runtime work fixed on story authority proof.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / central-ledger parity catch-up / repo-local latest 2026-07-09T13-29-43-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The live route is small and stable:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes `npm run serve` and `npm run check`. The current check command is syntax-only across `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit and story descriptors
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads the current fixed-camera scene descriptor
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without a typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Domains in use

```txt
static page shell
static syntax check
browser app runtime
story source descriptors
story scene descriptor
story hotspot descriptor
story clue ledger
story route state
story completion check
story interlude state
story notebook log
inspected hotspot state
localStorage save state
fixed 16:9 aspect frame
fixed camera stage render
stage layer descriptors
stage prop descriptors
stage hotspot volumes
hover label projection
raycast hotspot picking
anime material shader
post-process shader
browser debug projection
repo-local agent ledger
central repo ledger
```

## Services that kits offer

```txt
AspectFrame service:
  deterministic 16:9 frame calculation
  DOM aspect-frame application

StageKit services:
  WebGL renderer setup
  fixed viewport integration
  scene descriptor loading
  camera descriptor consumption
  anime material construction
  layer/prop/hotspot mesh construction
  raycast picking
  pointer hover label projection
  resize handling
  post-process render pass
  animation loop

Story data services:
  game title source
  scene descriptor source
  camera/stage/post descriptor source
  hotspot/clue/interlude descriptor source

Browser runtime services:
  state load/save
  hotspot inspection
  clue grant
  scene completion calculation
  notebook log projection
  interlude scheduling
  scene continuation
  reset key handling
  debug JSON projection

Agent services:
  repo-local audit state
  tracker and turn-ledger handoff
  central ledger pointer sync
  next-cut fixture contract
```

## Kits identified

```txt
implemented/static-page-shell-kit
implemented/aspect-frame-kit
implemented/stage-render-kit
implemented/anime-material-kit
implemented/post-process-kit
implemented/hotspot-volume-kit
implemented/hotspot-picking-kit
implemented/story-data-kit
implemented/browser-story-runtime-kit
implemented/localstorage-save-kit
implemented/debug-json-projection-kit
implemented/repo-local-agent-ledger-kit

next-cut/story-source-manifest-kit
next-cut/story-source-snapshot-kit
next-cut/story-state-snapshot-kit
next-cut/stage-scene-snapshot-kit
next-cut/story-command-envelope-kit
next-cut/story-command-reason-kit
next-cut/story-preflight-kit
next-cut/story-command-result-kit
next-cut/story-event-record-kit
next-cut/story-reducer-kit
next-cut/story-projection-kit
next-cut/save-projection-kit
next-cut/interlude-projection-kit
next-cut/stage-projection-kit
next-cut/browser-adapter-plan-kit
next-cut/browser-adapter-readback-kit
next-cut/gamehost-story-diagnostics-kit
next-cut/repo-local-ledger-readback-kit
next-cut/central-ledger-readback-kit
next-cut/dom-free-story-fixture-kit
```

## Main finding

The visual surface is not the next blocker. `StageKit` already owns fixed aspect framing, camera descriptor consumption, scene loading, shader material, post-process, hotspot volumes, hover labels, raycast picking, resize, and animation.

The bottleneck is still `src/game.js`: story command dispatch, mutation, completion, save intent, interlude intent, stage load intent, reset, UI projection, and debug output live in the same browser-bound module.

The next implementation should add source-owned story authority and readback facts before any story expansion, audio, inventory, renderer extraction, or browser-only smoke work.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Ledger Parity + Browser Fixture Gate
```

## Validation result

No runtime source changed.

No branch or PR was created.

No local `npm run check`, fixture script, static server, browser smoke, or Pages smoke was run in this connector-only documentation pass.
