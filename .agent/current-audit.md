# Current audit: The Unmapped House terminal completion settlement and resume

**Timestamp:** `2026-07-14T06-00-41-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `terminal-completion-settlement-resume-authority-audited`  
**Branch:** `main`

## Summary

Final completion is not represented in story state. `nextScene()` finds no successor and changes only terminal interlude text. No outcome is saved, and boot does not reconstruct terminal presentation from a completed final scene.

## Plan ledger

**Goal:** turn final completion into one idempotent, durable and resumable story outcome with matching visible proof.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Select only `TheUnmappedHouse` under the oldest eligible rule.
- [x] Inspect final completion, terminal interlude, persistence and reload.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the parent authority, commands, results and proof.
- [x] Add timestamped architecture, render, gameplay, interaction, terminal-outcome, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and run executable terminal-outcome fixtures.

## Complete interaction loop

```txt
boot
  -> load state
  -> resolve current scene
  -> load stage
  -> render controls

inspection
  -> inspect hotspot
  -> update inspected, clues and Notebook
  -> if complete, schedule interlude
  -> save ordinary story state

final Continue
  -> no successor scene
  -> replace interlude title and text
  -> return without state mutation or save

reload
  -> final scene, clues and inspected state restore
  -> interlude remains hidden
  -> inspected-hotspot re-read exits before completion handling
  -> terminal presentation is not recoverable
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Stage shell, story controls, Notebook, hover label and interlude. |
| `src/game.js` | Story state, completion, interlude, scene advancement, terminal copy, save and reset. |
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements and interlude copy. |
| `src/stage-kit.js` | Three.js stage, picking, viewport and RAF. |
| `src/styles.css` | Interlude visibility, controls and shell presentation. |
| `package.json` | Syntax-only validation. |

## Domains in use

```txt
browser document and lifecycle
fixed-aspect shell
story manifest and scene order
story state, clues, inspections, route and Notebook
scene completion predicates
interlude scheduling and presentation
terminal outcome identity, settlement and resume
localStorage persistence and reset
DOM and canvas interaction
Three.js stage and post-processing
hotspot picking and camera parallax
terminal control admission
first terminal visible-frame evidence
syntax validation and Pages deployment
repo-local and central tracking
```

## Implemented kits and services

```txt
static-page-shell-kit: stage, story panel, hotspot list, Notebook, hover label, interlude
aspect-frame-kit: design aspect, window fitting, DOM placement
story-data-kit: scenes, hotspots, clue grants, completion, camera, materials, post
browser-story-runtime-kit: state boot, inspection, continue, reset, UI, save calls
scene-route-kit: scene resolution and authored-order advancement
inspection-ledger-kit: scene-keyed inspected state
clue-ledger-kit: clue grant and query
notebook-log-kit: bounded narrative history
interlude-timer-kit: delayed completion interlude
terminal-route-kit: prototype-complete DOM projection
localstorage-save-kit: parse, shallow merge, write and delete
stage-render-kit: renderer, scene, camera, lights, target, callbacks and RAF
scene-descriptor-consumer-kit: camera, geometry, material, hotspot and post construction
anime-material-kit: procedural shaders and time updates
post-process-kit: grain, vignette, chromatic shift, distortion and scan lines
hotspot-volume-kit: raycast volumes and descriptors
hotspot-picking-kit: coordinates, raycast and dispatch
camera-parallax-kit: pointer-driven camera offsets
render-target-composition-kit: offscreen and post passes
 debug-json-projection-kit: story serialization and Notebook projection
package-syntax-check-kit: Node syntax checks
static-pages-deploy-kit: static Pages delivery
repo-local-agent-ledger-kit: root and timestamped audit records
central-ledger-sync-kit: central selection and findings mirror
```

```txt
implemented source-backed kits: 24
planned terminal outcome coordinating kits: 20
```

## Main findings

- Final completion has no outcome identity, schema or revision.
- The final Continue branch changes DOM only and returns no result.
- No durable commit or readback follows terminal projection.
- Boot does not classify or restore terminal outcome state.
- Re-reading an inspected hotspot cannot reopen completion.
- Generic Continue remains active after terminal copy.
- No first terminal frame acknowledgement exists.
- Validation is syntax-only.

## Required authority

```txt
the-unmapped-house-terminal-completion-settlement-resume-authority-domain
```

```txt
TerminalCompletionCommand
  -> bind manifest, story and final-scene revisions
  -> validate completion evidence
  -> reject premature, stale or duplicate work
  -> prepare one immutable TerminalOutcomeCandidate
  -> settle outcome, route, Notebook and terminal controls atomically
  -> stage, read back and promote a durable save generation
  -> publish TerminalOutcomeSettlementResult
  -> project terminal presentation from accepted outcome state
  -> resume the same outcome after reload
  -> publish FirstTerminalOutcomeFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story content, persistence behavior, rendering, dependencies, scripts and deployment did not change. No browser, build or Pages terminal fixture was executed.