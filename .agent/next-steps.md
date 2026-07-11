# Next steps: The Unmapped House

Timestamp: `2026-07-10T22-21-17-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Resume-Safe Story Phase Authority + Transition Fixture Gate
```

## Goal

Preserve the current three-scene route, copy, pacing and visuals while making every saved state resumable and every inspection, interlude and Continue transition explicit, validated and observable. A reload at any point must reconstruct the same story phase without depending on a lost browser timer or DOM-only state.

## Plan ledger

### Story source identity

- [ ] Add a versioned story schema.
- [ ] Add a stable story manifest id and source revision.
- [ ] Compute a canonical source fingerprint from scene, hotspot, clue and route descriptors.
- [ ] Validate unique scene ids, hotspot ids and clue ownership.
- [ ] Validate route order and completion requirements.

### Versioned save envelope

- [ ] Replace the shallow object merge with a versioned save envelope.
- [ ] Validate every field before use.
- [ ] Reconcile unknown scenes, hotspots, clues and route rows against the active source.
- [ ] Normalize corrupt arrays, records and log rows without throwing.
- [ ] Record source fingerprint, schema version and saved-at metadata.
- [ ] Return a typed load result with accepted, migrated, repaired or reset status.

### Story phase authority

- [ ] Introduce explicit phases: `exploring`, `interlude_pending`, `interlude_open`, `transitioning` and `terminal`.
- [ ] Derive completion from canonical scene-scoped inspection evidence.
- [ ] Persist completion proof and phase in the same state transaction.
- [ ] Replace the unretained timer with a persisted readiness rule or deterministic deadline.
- [ ] Reconstruct the correct interlude projection on load.
- [ ] Persist the terminal route state and terminal copy identity.

### Typed commands and results

- [ ] Normalize side-panel and raycast inspection into one `InspectHotspot` command.
- [ ] Add a `ContinueStory` command with phase, scene, request and source identity.
- [ ] Return accepted, rejected, failed or no-op results.
- [ ] Reject unknown, stale, already-applied and wrong-phase commands.
- [ ] Include before/after state fingerprints and completion evidence.
- [ ] Retain parent/child results when a story command requests a stage transition.

### Story transition transaction

- [ ] Prepare the next story snapshot without mutating committed state.
- [ ] Request an atomic stage commit through a typed adapter result.
- [ ] Commit story scene, route, phase and stage identity together after stage success.
- [ ] Retain the previous story/stage observation if stage preparation or commit fails.
- [ ] Save only the committed transaction result.
- [ ] Make repeated Continue requests idempotent.

### Diagnostics

- [ ] Add a bounded JSON-safe command/result/event journal.
- [ ] Expose current story phase, source fingerprint and state fingerprint.
- [ ] Expose pending interlude readiness and terminal state.
- [ ] Correlate story transition id with stage commit id and stage epoch.
- [ ] Keep DOM nodes and raw Three.js objects out of diagnostics.

### Validation

- [ ] Add `scripts/validate-story-source.mjs`.
- [ ] Add `scripts/validate-save-reconciliation.mjs`.
- [ ] Add `scripts/validate-story-phase-resume.mjs`.
- [ ] Add `scripts/validate-story-command-results.mjs`.
- [ ] Add `scripts/validate-story-stage-transition.mjs`.
- [ ] Wire the fixtures into `npm run check` after syntax checks.
- [ ] Add a browser smoke covering reloads in every phase.

## Required fixture rows

```txt
fresh-save-starts-exploring-scene-one
invalid-save-shape-repaired-without-throw
unknown-scene-id-reconciled
future-scene-clue-does-not-complete-current-scene
final-required-inspection-commits-completion-proof
completion-and-interlude-phase-save-together
reload-during-interlude-pending-resumes
reload-during-interlude-open-resumes
reinspect-after-resume-is-idempotent
continue-before-ready-rejected
continue-from-current-phase-accepted-once
duplicate-continue-is-no-op
stage-failure-retains-previous-story-state
stage-success-commits-story-and-stage-identities-together
final-continue-commits-terminal-state
reload-terminal-state-restores-terminal-copy
command-result-journal-json-safe
state-fingerprints-stable
```

## Implementation order

```txt
1. pure source schema, manifest and fingerprint
2. versioned save envelope and reconciliation
3. pure story phase reducer and completion proof
4. typed inspect/continue command results
5. deterministic interlude readiness and resume projection
6. terminal state persistence
7. atomic Stage Commit and Resource Lifecycle companion
8. composed StoryStageTransition transaction
9. browser reload smoke across every phase
```

## First implementation slice

```txt
pure StorySnapshot
  -> source validator
  -> save validator/reconciler
  -> story phase reducer
  -> headless resume fixture
```

## Second implementation slice

```txt
InspectHotspot and ContinueStory commands
  -> typed results
  -> completion proof
  -> interlude readiness
  -> terminal state
```

## Third implementation slice

```txt
atomic stage result adapter
  -> staged story transition
  -> one committed story/stage observation
  -> browser route and reload smoke
```

## Validation target

```txt
npm run check
```

## Companion queue

The existing `TheUnmappedHouse Atomic Stage Commit + Resource Lifecycle Fixture Gate` remains required. It should expose a typed stage result that the story transaction can consume; it must not own story mutation or save writes.

## Do not do first

```txt
new story rooms or branches
inventory
sound or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
