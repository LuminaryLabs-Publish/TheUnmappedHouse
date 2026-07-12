# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T10-30-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

This audit isolates the destructive reset path in `src/game.js`. A global `keydown` listener checks only `event.code === "KeyR"`, then calls `localStorage.removeItem(SAVE_KEY)` and `location.reload()`. It does not inspect modifier keys, repeat, trust, focus, visibility, story phase, expected save revision or user confirmation.

## Plan ledger

**Goal:** define one reset transaction that distinguishes an explicit in-game reset from browser refresh, stale input and unowned keyboard events.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip newer unsynchronized MyCozyIsland documentation.
- [x] Select only `TheUnmappedHouse`.
- [x] Inspect `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, package checks and prior persistence/lifecycle boundaries.
- [x] Trace reset from keyboard event through storage deletion and reload.
- [x] Confirm modifier, repeat, trust, focus, confirmation and revision admission are absent.
- [x] Confirm reset has no typed effect result, tombstone or first post-reset frame proof.
- [x] Preserve the complete 24-kit inventory and service map.
- [x] Define reset command, admission, barrier, effect, observation and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       central 2026-07-12T08:00:16-04:00, repo-local 2026-07-12T10-20-02-04-00, skipped as newer unsynchronized work
TheUnmappedHouse   2026-07-12T08-10-36-04-00 selected oldest synchronized eligible repository
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
HorrorCorridor     2026-07-12T09-48-15-04-00
ZombieOrchard      2026-07-12T10-09-07-04-00
TheCavalryOfRome   excluded
```

## Product and interaction loop

```txt
module boot
  -> load and shallow-merge raw browser state
  -> resolve currentScene
  -> construct StageKit
  -> load current scene, project UI and save

inspection
  -> canvas or side-panel activation
  -> mutate inspection, clue and log state
  -> derive completion and delayed interlude
  -> render and save

Continue
  -> mutate scene and route
  -> replace stage resources
  -> project successor UI
  -> save

reset
  -> window keydown
  -> match KeyR only
  -> remove save key synchronously
  -> request page reload
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, story panel, hotspot list, debug panel and mounted interlude. |
| `src/styles.css` | Fixed composition, modal appearance and pointer routing. |
| `src/game.js` | Mutable story state, persistence, inspection, completion, Continue, terminal copy and global destructive reset. |
| `src/story-data.js` | Three scenes, nine hotspots, nine clue requirements and visual descriptors. |
| `src/stage-kit.js` | Three.js resource graph, scene replacement, pointer input, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920 by 1080 composition. |
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
unretained 450 ms completion timeout
interlude visibility, Continue and terminal projection
global keyboard input and destructive KeyR reset
native focus and button activation
Three.js CDN runtime
WebGL renderer, render target, stage scene, camera, lighting and post processing
procedural geometry and anime materials
hotspot volumes and raycast picking
camera parallax
resize, timeout, input and recursive RAF callbacks
syntax validation
static Pages deployment
repo-local audit tracking
central ledger synchronization
```

Missing reset authority domains:

```txt
reset intent and command identity
keyboard binding and browser-refresh exclusion policy
trusted-event, repeat and focus-context admission
confirmation capability
expected story and storage revisions
reset operation generation
durable reset tombstone and stale-writer barrier
timer and runtime retirement
typed storage removal and reload results
reset observation and bounded journal
browser shortcut and confirmed-reset fixtures
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story, hotspot, debug, hover and interlude surfaces. |
| `aspect-frame-kit` | Fixed 16:9 viewport computation and application. |
| `story-data-kit` | Scene, hotspot, clue, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspect, complete, Continue, reset, project, persist and call StageKit. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the current unretained 450 ms completion callback. |
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
| `debug-json-projection-kit` | Project aggregate story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from main. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding

### Browser refresh and destructive reset share `KeyR`

The global handler does not exclude modifier chords. `Ctrl+R` on Windows/Linux and `Meta+R` on macOS still produce a keydown whose physical code is `KeyR`. The game removes durable progress before the browser completes the refresh.

### Reset is admitted without intent evidence

```txt
event.isTrusted: unchecked
event.repeat: unchecked
modifier keys: unchecked
document visibility/focus: unchecked
event target or activeElement: unchecked
explicit confirmation token: absent
```

### Storage deletion and reload are untyped effects

There is no reset command id, expected save revision, durable tombstone, typed storage result, runtime retirement result, reload result or first clean-frame acknowledgement.

### Reset can race existing ownership

Pending completion timers, scene resources, RAF work and another tab's stale save writer are not coordinated with reset. Prior lifecycle and storage-convergence audits define those dependencies; this audit defines the reset admission that must invoke them.

## Required parent domain

```txt
the-unmapped-house-destructive-reset-admission-authority-domain
```

Candidate kits:

```txt
reset-intent-envelope-kit
reset-command-id-kit
reset-binding-policy-kit
browser-reload-shortcut-exclusion-kit
trusted-key-event-policy-kit
input-focus-context-kit
reset-confirmation-capability-kit
reset-command-admission-kit
expected-story-revision-kit
expected-storage-revision-kit
reset-operation-generation-kit
reset-tombstone-kit
pending-timer-reset-barrier-kit
runtime-reset-retirement-kit
storage-reset-effect-kit
reset-effect-result-kit
reload-admission-kit
reset-observation-kit
reset-journal-kit
destructive-reset-fixture-kit
browser-refresh-preserves-save-smoke-kit
confirmed-reset-clears-save-smoke-kit
```

## Required transaction

```txt
ResetIntentEnvelope
  -> classify source binding and modifier chord
  -> reject browser refresh and unsupported chords
  -> validate trusted event, focus, visibility and repeat policy
  -> acquire explicit confirmation capability
  -> include expected story and storage revisions
  -> admit one reset command id and generation
  -> install reset tombstone and stale-writer barrier
  -> cancel pending timers and retire runtime ownership
  -> execute typed storage reset effect
  -> publish ResetEffectResult
  -> admit reload only after committed reset
  -> acknowledge first clean boot/frame
  -> append detached observation and bounded journal
```

Rejected reset intent must perform zero storage, story, timer, render or navigation mutation.

## Required statuses

```txt
RejectedBrowserRefreshChord
RejectedUntrustedEvent
RejectedRepeat
RejectedFocusContext
RejectedConfirmationMissing
RejectedStaleStoryRevision
RejectedStaleStorageRevision
ResetCommitted
ResetEffectFailed
RuntimeRetirementFailed
ReloadRequested
FirstCleanFrameAcknowledged
```
