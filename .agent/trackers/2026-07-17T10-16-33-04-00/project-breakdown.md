# Project breakdown: The Unmapped House custom-material lighting and shadow projection

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `custom-material-shadow-lighting-projection-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledgers, root `.agent` state and `main` heads matching their documented repo-local heads. `TheUnmappedHouse` had the oldest synchronized central timestamp and was the only selected repository.

The focused finding is a render-contract mismatch. `StageKit` enables renderer shadow maps, creates a shadow-casting `DirectionalLight`, adds a `HemisphereLight`, marks props as shadow casters/receivers and marks stage layers as receivers. Every visible authored surface, however, uses a custom `ShaderMaterial` whose fragment shader derives light only from a fixed `lightDir` uniform and never samples Three.js light or shadow state.

This means scene light position, intensity, color and hemisphere contribution do not govern visible material shading. Shadow-map work can still be produced for shadow-casting props while the custom materials never consume it. No measured performance regression or visible production defect is claimed; this is a source-backed semantic and render-cost gap.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-17T05-03-18-04-00 selected
TheOpenAbove       2026-07-17T05-41-10-04-00
PrehistoricRush    2026-07-17T06-23-59-04-00
PhantomCommand     2026-07-17T06-38-14-04-00
AetherVale         2026-07-17T07-02-59-04-00
TheLongHaul        2026-07-17T07-38-20-04-00
MyCozyIsland       2026-07-17T08-01-59-04-00
IntoTheMeadow      2026-07-17T08-45-46-04-00
HorrorCorridor     2026-07-17T09-17-19-04-00
ZombieOrchard      2026-07-17T09-43-24-04-00
TheCavalryOfRome   excluded
```

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
```

## Complete interaction loop

```txt
boot
  -> load story state and resolve the current scene
  -> construct StageKit, renderer, scene, camera, lights and render target
  -> register pointer, click, resize and keyboard inputs
  -> load authored scene descriptors
  -> render story UI, persist state and start recursive RAF

player interaction
  -> inspect hotspot through canvas raycast or DOM inspection button
  -> mark inspection, grant clues and update Notebook state
  -> complete scene requirements
  -> present interlude and advance to the next authored scene
  -> persist the updated story aggregate

render and lighting loop
  -> loadScene creates layers and props using custom anime ShaderMaterial
  -> props receive castShadow=true and receiveShadow=true
  -> layers receive receiveShadow=true
  -> renderer.shadowMap.enabled=true
  -> DirectionalLight.castShadow=true
  -> frame updates custom material time uniforms
  -> renderer may generate the light shadow map
  -> stage fragment shader computes light from fixed lightDir only
  -> no scene-light or shadow-map evidence reaches visible material output
  -> post-processing composites the final frame
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport and resize projection
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, lights, shadows, shaders and raycasting
custom-material lighting identity, light binding, shadow policy and visible-frame proof
WebGL renderer, render target, post processing and recursive RAF
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude and initial Loading copy |
| `aspect-frame-kit` | fixed design aspect, window-fit calculation and DOM frame placement |
| `story-data-kit` | scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials and post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, Continue, reset, UI projection and persistence calls |
| `scene-route-kit` | scene ID resolution and authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant and clue query |
| `notebook-log-kit` | prepend narrative log and bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement and delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, shadow-map enablement, offscreen target, callbacks and recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | procedural custom ShaderMaterial, fixed light direction, toon response and elapsed-time animation |
| `post-process-kit` | animated grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | offscreen stage pass, post pass and target sizing |
| `debug-json-projection-kit` | story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers and timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned lighting-shadow authority surfaces: 19
```

## Source-backed finding

```txt
renderer shadowMap enabled: present
DirectionalLight created: present
DirectionalLight castShadow enabled: present
HemisphereLight created: present
props castShadow enabled: present
props receiveShadow enabled: present
layers receiveShadow enabled: present

visible authored surfaces use custom ShaderMaterial: present
fixed lightDir uniform: present
fragment shader uses fixed lightDir: present
Three.js light uniforms/chunks: absent
shadow-map uniforms/chunks: absent
scene light color/intensity binding: absent
hemisphere contribution binding: absent
shadow receiver sampling: absent
LightingProjectionResult: absent
ShadowMapAdmissionResult: absent
FirstLightBoundFrameAck: absent
browser lighting/shadow fixtures: 0
```

## Required authority

`the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain`

```txt
StageLightingAdmissionCommand
  -> bind scene, material, light, shadow-policy and renderer generations
  -> choose one declared lighting model
  -> publish StageLightingAdmissionResult

ShadowWorkAdmissionCommand
  -> admit shadow-map work only when accepted receivers consume it
  -> enforce caster, receiver, resolution and update budgets
  -> publish ShadowWorkAdmissionResult

LightingProjectionCommitCommand
  -> bind accepted light/shadow evidence to custom materials
  -> publish a visible-lighting digest
  -> publish LightingProjectionCommitResult
  -> publish FirstLightBoundFrameAck
```

## Planned authority surfaces

```txt
the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain
lighting-model-manifest-kit
stage-light-generation-kit
stage-light-admission-command-kit
stage-light-admission-result-kit
custom-material-light-binding-kit
material-light-revision-kit
shadow-policy-kit
shadow-caster-budget-kit
shadow-receiver-binding-kit
shadow-work-admission-command-kit
shadow-work-admission-result-kit
fixed-light-direction-compatibility-kit
visible-lighting-digest-kit
lighting-projection-commit-kit
first-light-bound-frame-ack-kit
shadow-cost-observation-kit
browser-lighting-shadow-fixture-kit
source-artifact-pages-lighting-parity-fixture-kit
```

## Required proof

```txt
move DirectionalLight and verify custom-material frame response
change DirectionalLight color/intensity and verify frame response
change HemisphereLight and verify frame response
shadow-enabled receiver fixture
shadow-disabled fallback fixture
zero-consumer shadow-work rejection fixture
caster/receiver budget fixture
visible-lighting digest fixture
first light-bound frame acknowledgement fixture
source/build/Pages lighting parity fixture
```

## Boundary

Documentation only. Runtime JavaScript, HTML, CSS, story content, interaction, rendering, lighting, shadows, persistence, package scripts, workflows and deployment are unchanged. No executable browser, performance, artifact or deployed-origin lighting fixture was run.