# START HERE: The Unmapped House story audio event projection

**Last updated:** `2026-07-15T12-59-24-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-audio-event-projection-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine required hotspots, clue-led progression, browser persistence, semantic DOM controls and a descriptor-driven Three.js stage.

The active audit isolates story audio projection. Accepted inspections, clue grants, interludes, scene changes and terminal completion are projected through DOM and WebGL surfaces, but no owned browser-audio context, semantic cue registry, ambience lifecycle, preferences, deduplication or audible acknowledgement exists.

## Plan ledger

**Goal:** project accepted story results through one lifecycle-safe browser-audio authority without moving story truth into input handlers or render callbacks.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace boot, inspection, clue, interlude, terminal, rendering and lifecycle paths.
- [x] Identify the full interaction loop, domains, all 24 kits and services.
- [x] Define 22 story-audio authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story, persistence, rendering and deployment unchanged.
- [ ] Implement browser audio and execute unlock, cue, lifecycle, artifact and Pages fixtures.

## Active loop

```txt
accepted inspection clue route or terminal result
  -> update visible story and Notebook state
  -> update or replace Three.js scene presentation
  -> persist accepted story state
  -> no semantic audio event
  -> no cue projection or ambience adoption
  -> no audible or audiovisual acknowledgement
```

## Required authority

```txt
the-unmapped-house-story-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document runtime story scene and audio-policy revisions
  -> observe capability and accepted user-gesture unlock
  -> consume accepted semantic story results
  -> resolve stable cues and scene ambience
  -> suppress stale duplicate muted and superseded work
  -> enforce buses preferences pooling priority and voice budgets
  -> settle visibility pagehide route and generation lifecycle
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-15T12-59-24-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-15T12-59-24-04-00-story-audio-event-projection-dsk-map.md`
5. `audio-audit/2026-07-15T12-59-24-04-00-browser-unlock-cue-lifecycle-contract.md`
6. `interaction-audit/2026-07-15T12-59-24-04-00-audio-projection-command-result-map.md`
7. `gameplay-audit/2026-07-15T12-59-24-04-00-silent-inspection-interlude-terminal-loop.md`
8. `render-audit/2026-07-15T12-59-24-04-00-silent-story-audiovisual-frame-gap.md`
9. `deploy-audit/2026-07-15T12-59-24-04-00-story-audio-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-15T12-59-24-04-00-oldest-selection-story-audio-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Inspection focus continuity, motion preference, story announcements, interlude focus/route admission, page lifecycle, terminal settlement, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save/reset convergence, interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Add a small result-driven Web Audio adapter that unlocks from an existing accepted gesture, synthesizes cues procedurally, deduplicates by semantic event ID and retires all nodes on document or route replacement.