# Next steps: The Unmapped House

Timestamp: `2026-07-10T19-00-19-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Save Reconciliation Fixture Gate
```

## Goal

Make authored story content, persisted state, accepted hotspot commands, completion decisions and rendered scene identity derive from one validated source manifest. Preserve the current three-scene route, copy, pacing and visuals.

## Plan ledger

### Story source contract

- [ ] Add a stable story schema version and manifest id.
- [ ] Build canonical indexes for scenes, hotspots and clues.
- [ ] Generate a deterministic source fingerprint from normalized authored data.
- [ ] Validate unique scene ids and scene-local hotspot ids.
- [ ] Validate hotspot grants and scene requirements against known clue ids.
- [ ] Validate route order, camera, stage and interlude descriptor presence.
- [ ] Freeze the normalized source snapshot used by runtime authority.

### Versioned save envelope

- [ ] Replace the raw state payload with a versioned save envelope.
- [ ] Store source fingerprint, save schema version and migration metadata.
- [ ] Validate every field before it reaches live state.
- [ ] Distinguish parse failure, shape failure, stale source, future version and repairable drift.
- [ ] Preserve the current save key through a compatibility adapter or explicit migration.
- [ ] Return a JSON-safe load result with stable reason codes.

### Save reconciliation

- [ ] Repair an unknown `sceneId` and persist the repaired canonical id.
- [ ] Remove unknown scene, hotspot and clue ids with explicit repair rows.
- [ ] Rebuild route as a valid prefix of the authored scene order.
- [ ] Normalize `inspected` into canonical scene/hotspot maps.
- [ ] Derive clues from canonical inspected hotspots rather than trusting a separate array.
- [ ] Reconcile log and flags to bounded, supported values.
- [ ] Define reset behavior for unrecoverable or future-version saves.

### Canonical story commands

- [ ] Replace descriptor-object mutation with `{sceneId, hotspotId, inputOrigin, commandId}` requests.
- [ ] Resolve descriptors through the validated source manifest.
- [ ] Reject unknown, stale-source and wrong-scene hotspot ids.
- [ ] Preserve side-panel and raycast behavior through one command path.
- [ ] Return typed `accepted`, `repeated`, `rejected`, `repaired` and `no_op` results.
- [ ] Record source fingerprint and before/after state fingerprints.

### Completion proof

- [ ] Derive scene completion from canonical inspected hotspots and their grants.
- [ ] Emit one completion proof per scene/source revision.
- [ ] Correlate the interlude timer with scene id, command id and source fingerprint.
- [ ] Reject stale completion effects after scene/source changes.
- [ ] Persist explicit interlude and terminal lifecycle state.

### Render and diagnostics correlation

- [ ] Pass manifest id, source fingerprint and canonical scene id into StageKit load requests.
- [ ] Store canonical source refs on hotspot meshes instead of full descriptor objects.
- [ ] Expose save validation, repair, command and completion rows in diagnostics.
- [ ] Prove persisted scene id, resolved descriptor scene id and rendered scene id agree.
- [ ] Keep the existing atomic StageKit scene-commit plan as the next render-host slice.

### Validation

- [ ] Add `scripts/validate-story-manifest.mjs`.
- [ ] Add `scripts/validate-save-reconciliation.mjs`.
- [ ] Add `scripts/validate-story-command-authority.mjs`.
- [ ] Add `scripts/validate-completion-proof.mjs`.
- [ ] Add `scripts/validate-source-save-render-identity.mjs`.
- [ ] Wire all fixtures into `npm run check` after syntax checks.
- [ ] Test valid current saves, empty saves, malformed JSON, wrong field types, unknown ids, stale source, future schema and content drift.

## First implementation slice

```txt
normalized story source
  -> schema and graph validation
  -> canonical indexes
  -> source fingerprint
  -> JSON-safe manifest diagnostics
```

## Second implementation slice

```txt
versioned save envelope
  -> shape validation
  -> source compatibility decision
  -> reconciliation and repair rows
  -> canonical story state
```

## Third implementation slice

```txt
canonical hotspot command
  -> typed result
  -> clue derivation
  -> completion proof
  -> source/save/render identity fixture
```

## Validation target

```txt
npm run check
```

## Do not do first

```txt
new rooms or branches
inventory
audio
renderer replacement
new shaders
camera retuning
visual polish
```
