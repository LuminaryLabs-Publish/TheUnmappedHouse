# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T15-08-07-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

This audit isolates the notebook and diagnostics projection boundary in `index.html`, `src/styles.css` and `src/game.js`.

The visible player surface is labelled `Notebook`, but `renderUi()` fills it with a raw JSON serialization of internal game, scene, clue, route, inspection, completion and log state. The surface is always present in the public page and has no product-versus-development channel policy, build gate, capability admission, field classification, redaction profile, projection identity, stale-revision rejection or first-visible-frame acknowledgement.

## Plan ledger

**Goal:** define one authoritative transaction from committed story state through channel admission, field classification, redaction, notebook/diagnostic projection, visible commit and observation.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are centrally tracked and root-documented.
- [x] Select only `TheUnmappedHouse` as the oldest eligible synchronized repository.
- [x] Inspect `index.html`, `src/styles.css`, `src/game.js`, `src/story-data.js`, package checks and prior authority boundaries.
- [x] Trace boot, inspection, Continue and notebook projection paths.
- [x] Identify every field written to the public notebook.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define channel, classification, redaction, commit, observation and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-12T13-08-15-04-00 selected
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
TheCavalryOfRome   excluded
```

## Product and interaction loop

```txt
module boot
  -> parse browser save
  -> resolve current scene
  -> create StageKit
  -> load scene
  -> renderUi()
  -> create hotspot buttons
  -> serialize aggregate state into Notebook
  -> save state

canvas or side-panel inspection
  -> inspectHotspot(hotspot)
  -> mutate inspected map
  -> grant internal clue ids
  -> prepend notebook log entry
  -> derive exact scene-complete boolean
  -> renderUi()
  -> replace visible Notebook JSON
  -> persist state

Continue
  -> resolve next scene
  -> mutate scene and route ids
  -> replace stage resources
  -> renderUi()
  -> replace visible Notebook JSON
  -> persist state

frame
  -> render Three.js stage and post pass
  -> publish no notebook projection or visible-frame provenance
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, story panel, hotspot list, visible Notebook `<pre>`, hover label and interlude. |
| `src/styles.css` | Notebook and debug text visibility, panel layout, modal presentation and pointer routing. |
| `src/game.js` | Mutable story state, persistence, inspection, completion, Continue, reset and raw JSON notebook projection. |
| `src/story-data.js` | Three scenes, nine hotspots, internal clue ids, required clues, authored narrative and visual descriptors. |
| `src/stage-kit.js` | Renderer, scene consumption, pointer picking, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed `1920 x 1080` design size and aspect-frame calculation. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene routing, inspection, clues, flags, route and notebook log
scene-completion derivation
unretained completion timeout
interlude visibility, Continue and terminal projection
global keyboard and pointer input
native focus and button activation
player-visible notebook shell
raw developer-style aggregate JSON projection
Three.js CDN runtime
WebGL renderer and two-pass presentation
procedural geometry and anime materials
hotspot volumes and raycast picking
camera parallax
resize, timeout, input and recursive RAF callbacks
syntax validation
static Pages deployment
repo-local audit tracking
central ledger synchronization
```

Missing notebook-observability authority domains:

```txt
notebook surface identity
projection id and revision
story-state revision binding
player notebook versus developer diagnostic channel policy
build-channel and capability admission
field classification
redaction profile identity and revision
player-safe notebook entry model
developer diagnostic model
projection plan and typed result
stale projection rejection
atomic DOM commit
visible notebook frame acknowledgement
projection observations and bounded journal
browser and Pages notebook fixture gates
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story, hotspot, Notebook, debug, hover and interlude surfaces. |
| `aspect-frame-kit` | Fixed 16:9 viewport computation and CSS application. |
| `story-data-kit` | Scene, hotspot, clue, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspect, complete, Continue, reset, project, persist and call StageKit. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query global internal clue strings. |
| `notebook-log-kit` | Prepend and cap authored narrative log rows. |
| `interlude-timer-kit` | Schedule the current unretained completion callback. |
| `terminal-route-kit` | Project prototype-complete copy. |
| `localstorage-save-kit` | Parse, merge, write and delete the single browser save key. |
| `stage-render-kit` | Create renderer, camera, lights, target, canvas, listeners and RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into live Three.js resources. |
| `anime-material-kit` | Allocate shader materials and advance time uniforms. |
| `post-process-kit` | Render grain, vignette, chromatic, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick volumes and attach descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Serialize internal aggregate fields directly into the visible Notebook `<pre>`. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from main. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main findings

### The visible Notebook is the diagnostic surface

`index.html` mounts `#state-debug` inside a normal visible section labelled `Notebook`. CSS gives the `<pre>` normal text color, scrolling and height. There is no hidden attribute, development-only stylesheet, query gate or build-channel gate.

### Raw aggregate fields are public UI

`renderUi()` writes:

```txt
game
scene
clues
route
inspected
complete
latest
```

The values include internal ids such as `library-blank-map` and `clue:blank-square`, exact current-scene inspection booleans and the authoritative scene-completion result.

The current projection does not expose unacquired required-clue arrays, but it still promotes implementation identifiers and aggregate structure into the player-facing contract.

### Player notebook and developer diagnostics have different semantics

The authored `state.log` already provides player-readable notebook entries. The remaining aggregate fields are developer diagnostics. Combining both in one raw JSON document prevents independent product copy, localization, accessibility, redaction and diagnostic evolution.

### Projection has no identity or state provenance

There is no:

```txt
notebook surface id
projection id
projection revision
story-state revision
scene generation
channel kind
redaction profile
field classification
commit result
first-visible-frame acknowledgement
```

A screenshot or DOM read therefore cannot prove which committed story state and channel policy produced the visible notebook.

### Diagnostics cannot be independently disabled or exported

The runtime cannot produce:

```txt
player notebook only
developer diagnostics only
redacted support diagnostics
no diagnostics in public production
explicit authorized diagnostic export
```

Any change to the internal object shape can alter the public UI.

## Required parent domain

```txt
the-unmapped-house-notebook-observability-projection-authority-domain
```

Candidate kits:

```txt
notebook-surface-id-kit
notebook-projection-id-kit
notebook-projection-revision-kit
notebook-channel-policy-kit
notebook-build-channel-kit
notebook-capability-admission-kit
notebook-field-classification-kit
notebook-redaction-profile-kit
player-notebook-entry-kit
developer-diagnostic-model-kit
notebook-projection-plan-kit
notebook-projection-result-kit
notebook-projection-commit-kit
stale-notebook-projection-rejection-kit
notebook-visible-frame-ack-kit
notebook-observation-kit
notebook-journal-kit
public-notebook-fixture-kit
developer-diagnostics-fixture-kit
browser-notebook-smoke-kit
pages-notebook-smoke-kit
```

## Required transaction

```txt
CommittedStoryState
  -> cite story revision, scene generation and mutation receipt
  -> resolve build channel and requested notebook channel
  -> admit player or developer capability
  -> classify candidate fields
  -> select immutable redaction profile
  -> build player notebook entries or diagnostic model
  -> reject stale story/projection revision
  -> commit one NotebookProjectionResult
  -> render only the admitted model
  -> acknowledge the first visible notebook frame
  -> publish detached observation and bounded journal
```

Public player mode should project authored narrative entries and player-safe progress only. Developer diagnostics should require explicit admission and must not share the public Notebook contract by accident.

## Required statuses

```txt
Planned
Committed
Duplicate
RejectedStaleStoryRevision
RejectedStaleProjectionRevision
RejectedChannel
RejectedCapability
RejectedFieldClassification
Redacted
Visible
Exported
```

## Completion boundary

Do not claim a production-safe notebook or diagnostic surface because the JSON contains only local browser state. Completion requires explicit channel policy, field classification, redaction, typed projection results, independent player/developer models and executable public-build proof.