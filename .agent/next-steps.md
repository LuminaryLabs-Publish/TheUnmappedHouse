# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T01:50:19-04:00`

## Next safe ledge

Build the story command authority and fixture replay gate.

Do not expand story content first.

Do not rewrite the renderer first.

Do not change the route, localStorage key, scene copy, or Pages workflow unless required by validation.

## Build checklist

- [ ] Add a pure story snapshot helper for scene/source data.
- [ ] Add a pure state snapshot helper for current runtime state.
- [ ] Add command envelopes for `inspect_hotspot`, `continue_scene`, `load_save`, and `reset_save`.
- [ ] Add stable command rejection reasons.
- [ ] Move hotspot inspection mutation into a pure `applyInspectionCommand` service.
- [ ] Move scene continuation mutation into a pure `applyContinueSceneCommand` service.
- [ ] Emit result records for inspection, scene completion, scene transition, save, and reset.
- [ ] Add route journal and command journal records.
- [ ] Keep the current UI as a consumer of result records.
- [ ] Add `window.GameHost.getState()` diagnostics only after pure state projection exists.
- [ ] Add DOM-free fixture cases for first-room completion.
- [ ] Add DOM-free fixture cases for duplicate inspection.
- [ ] Add DOM-free fixture cases for unknown hotspot rejection.
- [ ] Add DOM-free fixture cases for continue-before-complete rejection.
- [ ] Add DOM-free fixture cases for transition to the next scene.
- [ ] Add DOM-free fixture cases for full route completion.
- [ ] Add DOM-free fixture cases for save/load parity.
- [ ] Add DOM-free fixture cases for reset behavior.
- [ ] Add stage descriptor validation for camera, layers, props, hotspots, post settings, and completion requirements.
- [ ] Record fixture commands and expected result signatures in `.agent/validation.md`.

## Domain split target

```txt
unmapped-house
├─ story-authority
│  ├─ story-source-snapshot-kit
│  ├─ story-state-snapshot-kit
│  ├─ story-command-envelope-kit
│  ├─ command-validation-kit
│  ├─ inspection-action-kit
│  ├─ inspection-result-contract-kit
│  ├─ scene-completion-result-kit
│  └─ scene-transition-result-kit
├─ state-and-save
│  ├─ route-journal-kit
│  ├─ command-journal-kit
│  ├─ save-result-kit
│  └─ localstorage-save-adapter-kit
├─ stage-descriptor
│  ├─ stage-scene-snapshot-kit
│  ├─ stage-layer-descriptor-kit
│  ├─ stage-prop-descriptor-kit
│  ├─ stage-hotspot-volume-kit
│  └─ stage-descriptor-validation-kit
├─ renderer-host
│  ├─ fixed-camera-diorama-kit
│  ├─ anime-material-shader-kit
│  ├─ stage-postprocess-kit
│  ├─ hotspot-raycast-kit
│  └─ hover-label-kit
└─ fixtures
   ├─ dom-free-fixture-kit
   ├─ hotspot-fixture-matrix-kit
   └─ scene-completion-fixture-kit
```

## What to avoid

- [ ] Do not put renderer setup inside story authority kits.
- [ ] Do not put DOM querying inside pure command services.
- [ ] Do not make localStorage the source of truth.
- [ ] Do not add new rooms until fixture replay proves existing progression.
- [ ] Do not make StageKit depend on story-specific clue names.
- [ ] Do not hide failed commands by silently no-oping.

## Success condition

A fixture script can replay story commands without DOM, Three.js, browser input, or localStorage and produce the same scene/clue/route result that the live UI expects.