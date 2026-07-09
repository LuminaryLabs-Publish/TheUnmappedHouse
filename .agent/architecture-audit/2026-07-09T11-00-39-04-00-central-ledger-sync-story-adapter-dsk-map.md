# Central Ledger Sync + Story Adapter DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Domain map

```txt
the-unmapped-house-domain
├─ static-page-shell-domain
│  └─ static-page-shell-kit
├─ aspect-frame-domain
│  └─ aspect-frame-kit
├─ stage-render-domain
│  ├─ stage-render-kit
│  ├─ anime-material-kit
│  ├─ post-process-kit
│  ├─ hotspot-volume-kit
│  └─ hotspot-picking-kit
├─ story-source-domain
│  └─ story-data-kit
├─ browser-story-runtime-domain
│  ├─ browser-story-runtime-kit
│  ├─ localstorage-save-kit
│  └─ debug-json-projection-kit
├─ repo-local-agent-ledger-domain
│  └─ repo-local-agent-ledger-kit
└─ planned-story-authority-domain
   ├─ story-source-manifest-kit
   ├─ story-source-snapshot-kit
   ├─ story-state-snapshot-kit
   ├─ stage-scene-snapshot-kit
   ├─ story-command-envelope-kit
   ├─ story-command-reason-kit
   ├─ story-preflight-kit
   ├─ story-command-result-kit
   ├─ story-event-record-kit
   ├─ story-reducer-kit
   ├─ story-projection-kit
   ├─ save-projection-kit
   ├─ interlude-projection-kit
   ├─ stage-projection-kit
   ├─ browser-adapter-plan-kit
   ├─ browser-adapter-readback-kit
   ├─ gamehost-story-diagnostics-kit
   ├─ repo-local-ledger-readback-kit
   ├─ central-ledger-readback-kit
   └─ dom-free-story-fixture-kit
```

## Current ownership

```txt
index.html: static page shell and DOM targets
src/aspect-frame.js: aspect frame calculation and application
src/stage-kit.js: Three.js render host, shader materials, stage descriptors, hotspots, post-process, hover, click, resize, animation
src/story-data.js: game title, scenes, stage descriptors, hotspots, clue grants, completion requirements, interludes
src/game.js: browser command handling, mutation, save/load, route, interlude, StageKit consumption, UI, debug, reset
.agent/: repo-local audit and handoff state
LuminaryLabs-Dev/LuminaryLabs: central ledger state
```

## Architectural risk

`src/game.js` is still too authoritative. It should become a browser adapter over source-owned story records, not the owner of story rules.

## First source boundary

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-command-envelope.js
src/story-authority/story-preflight.js
src/story-authority/story-command-result.js
src/story-authority/story-reducer.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/repo-local-ledger-readback.js
src/story-authority/central-ledger-readback.js
scripts/validate-story-authority.mjs
```
