# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T20-51-16-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `interlude-progression-admission-authority-audited`

## Summary

This documentation-only audit isolates the boundary between scene completion, delayed interlude presentation, keyboard focus, Continue admission, persisted progression phase and visible scene transitions.

The current runtime stores clue and inspection facts but not an authoritative progression phase. The visually hidden Continue control remains keyboard-reachable, `nextScene()` admits advancement without checking completion, and the delayed callback reads mutable route state. The result is a fail-open progression path and a reload gap after completion.

## Plan ledger

**Goal:** ensure every scene transition is admitted once from a complete predecessor phase, survives reload, rejects stale callbacks and presents one focus-correct visible result.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify all nine eligible repositories remain centrally tracked and root-documented.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by oldest current timestamp.
- [x] Inspect `index.html`, `src/styles.css`, `src/game.js`, `src/story-data.js`, `src/stage-kit.js`, `package.json`, the Pages workflow and current audit state.
- [x] Trace boot, hotspot inspection, completion, timeout, interlude, Continue, reload, terminal and rendering.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define commands, phases, results, observations and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Complete interaction loop

```txt
boot
  -> create default state
  -> parse arbitrary localStorage JSON
  -> shallow-merge parsed fields
  -> resolve currentScene by sceneId or fall back to scene 1
  -> construct StageKit and load scene resources
  -> render story controls and Notebook
  -> persist the current mutable state

inspection
  -> canvas raycast or side-panel button selects a hotspot descriptor
  -> repeated hotspot: update text/log and save
  -> new hotspot: mark inspected, grant clues, update text/log
  -> if sceneComplete, schedule one 450 ms callback
  -> render UI and save immediately

completion callback
  -> evaluate the then-current `currentScene` variable
  -> write interlude title/text
  -> add `.open` and set `aria-hidden=false`
  -> retain existing focus and underlying controls

Continue
  -> button click calls nextScene
  -> no completion, phase, timer-generation or interlude-open admission
  -> choose the next array element
  -> mutate currentScene, sceneId, route and log
  -> close interlude, load successor, render and save

terminal
  -> no successor writes prototype-complete copy
  -> no terminal state or result is committed
  -> reload returns to the final authored scene
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scene descriptors, nine hotspots, completion requirements, interlude copy and render settings. |
| `src/game.js` | Browser state, inspection, completion timer, interlude, Continue, terminal copy, UI, persistence and reset. |
| `src/stage-kit.js` | Three.js stage, hotspot raycast, hover, camera parallax, render target and RAF. |
| `src/styles.css` | Visual hiding and pointer gating for the interlude; story-panel and control presentation. |
| `src/aspect-frame.js` | Fixed 16:9 viewport calculation and application. |
| `index.html` | Stage, story, Notebook, hover and always-mounted interlude/Continue surfaces. |
| `package.json` | Syntax-only validation and local serving. |
| `.github/workflows/deploy.yml` | Static Pages deployment from `main`. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
browser persistence and destructive reset
scene routing, inspection, clues, logs and completion
completion timeout and interlude projection
terminal copy projection
DOM keyboard and pointer interaction
modal visibility and focus behavior
Three.js CDN runtime and WebGL presentation
scene graph and scene-resource allocation
procedural geometry and shader materials
hotspot volumes and raycast picking
camera parallax and hover projection
render target and post-processing
resize, pointer, click, timeout and recursive RAF callbacks
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing progression authority:

```txt
story-run identity and generation
scene phase and scene revision
route revision
completion command/candidate/result
owned completion-timer lease
stale completion callback rejection
interlude-open command/result
Continue command with exact predecessor
completion and phase admission
exact-once scene advancement
modal focus lease and focus restoration
story-panel inertness while modal
persisted progression phase
startup phase reconciliation
terminal outcome state/result
first visible interlude frame acknowledgement
first visible successor frame acknowledgement
progression observations and bounded journal
browser and Pages progression fixtures
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount the stage, story panel, hotspot list, Notebook, hover label and interlude surfaces. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve a scene, inspect, complete, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule the delayed completion interlude through `setTimeout`. |
| `terminal-route-kit` | Project prototype-complete terminal copy into the interlude. |
| `localstorage-save-kit` | Parse, shallow-merge, write and delete one browser save key. |
| `stage-render-kit` | Create the Three.js renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into camera state, geometry, materials, hotspot volumes and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize pointer input, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Render the stage to an offscreen target and the post pass to the canvas. |
| `debug-json-projection-kit` | Serialize story aggregate fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over the four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Concrete source findings

### Hidden Continue admits incomplete progression

The interlude is hidden with `opacity: 0` and `pointer-events: none`, while the Continue button remains a normal enabled button. The ancestor's `aria-hidden=true` does not make the descendant inert or disabled. `nextScene()` itself performs no completion or interlude-state check.

A keyboard or programmatic activation can therefore execute:

```txt
scene 1 incomplete
  -> hidden Continue
  -> scene 2
  -> hidden Continue
  -> scene 3
  -> hidden Continue
  -> prototype-complete copy
```

The route and scene ID are persisted even though required clues were never earned.

### Completion callback is not bound to its predecessor

The callback is scheduled as:

```js
setTimeout(() => showInterlude(currentScene), 450);
```

It carries no expected scene ID, scene revision, timer ID or run generation. Because `currentScene` is read at execution time, an advancement before the timer fires can cause the callback to show the successor scene's interlude.

### Reload after completion loses the transition phase

The last required inspection is persisted before the timer opens the interlude. A reload in that interval restores a complete scene, but boot does not derive or restore `COMPLETION_PENDING`/`INTERLUDE_OPEN`, and no replacement timer is scheduled.

The state is logically complete while the normal visible Continue path is absent.

### Modal focus and input context are not owned

`showInterlude()` does not:

```txt
capture the predecessor focus
move focus to Continue
trap focus
make story controls inert
restore focus after transition
publish a focus result
```

Keyboard users can remain on or tab through controls behind the open overlay.

### Terminal state is not durable

When no successor exists, only interlude text changes. There is no terminal phase, terminal result, completion revision, persistence record or terminal-frame acknowledgement.

## Required parent domain

```txt
the-unmapped-house-scene-progression-interlude-authority-domain
```

Candidate kits:

```txt
story-run-id-kit
story-run-generation-kit
scene-phase-kit
scene-revision-kit
completion-candidate-kit
completion-result-kit
completion-timer-lease-kit
stale-completion-callback-rejection-kit
interlude-open-command-kit
interlude-open-result-kit
continue-command-kit
continue-admission-kit
exact-once-scene-advance-kit
route-revision-kit
interlude-focus-lease-kit
modal-inertness-kit
gameplay-input-context-kit
persisted-progression-phase-kit
startup-phase-reconciliation-kit
terminal-outcome-kit
scene-transition-result-kit
first-visible-interlude-frame-ack-kit
first-visible-successor-frame-ack-kit
progression-observation-kit
progression-journal-kit
keyboard-hidden-control-fixture-kit
reload-after-completion-fixture-kit
stale-timer-transition-fixture-kit
browser-progression-smoke-kit
pages-progression-smoke-kit
```

## Required transaction

```txt
HotspotInspectionResult
  -> evaluate completion against scene revision
  -> when newly complete, commit COMPLETION_PENDING
  -> allocate one completion timer lease bound to scene/run generations
  -> persist phase and lease intent

timer callback
  -> validate lease, run generation, scene ID, scene revision and phase
  -> reject stale, cancelled or duplicate callbacks
  -> atomically commit INTERLUDE_OPEN
  -> make underlying interaction inert
  -> transfer focus to the admitted Continue control
  -> acknowledge the first visible interlude frame

ContinueCommand
  -> require INTERLUDE_OPEN and exact expected scene/route revisions
  -> reject hidden, stale, duplicate, incomplete or terminal commands
  -> commit TRANSITIONING exactly once
  -> cancel/retire the timer lease
  -> commit successor scene and route revision, or terminal outcome
  -> persist the successor phase
  -> restore admitted focus/input context
  -> acknowledge the first visible successor or terminal frame

startup
  -> validate manifest/snapshot
  -> derive or restore the canonical progression phase
  -> reopen a completed interlude deterministically
  -> quarantine impossible phase/fact combinations
```

## Proof boundary

Source inspection proves the missing checks, phase state and focus/lifecycle ownership. It does not prove browser-specific tab order or deployed failure frequency. Those claims require browser fixtures using real focus navigation, timer control, reload and Pages deployment.
