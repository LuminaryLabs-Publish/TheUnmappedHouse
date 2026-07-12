# Render audit: reset visible-state provenance gap

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

A reset request clears storage and reloads without any receipt connecting the destructive effect to the final visible scene. The user can see a fresh opening frame without proof that storage deletion, timer retirement and runtime teardown committed coherently.

## Plan ledger

**Goal:** correlate confirmed reset generation, durable tombstone, reload and first clean canvas/DOM frame.

- [x] Trace reset effect to navigation.
- [x] Confirm no pre-reset frame id or post-reset frame acknowledgement exists.
- [x] Confirm no reset status is projected before reload.
- [x] Define first-clean-frame proof.
- [ ] Implement frame correlation.

## Gap

```txt
KeyR
  -> save deletion
  -> reload request
  -> old frame disappears
  -> new boot selects initial scene
  -> no reset generation or durable revision is visible
```

Required first-frame receipt:

```txt
resetGeneration
tombstoneRevision
storyManifestFingerprint
restoredStoryRevision
sceneId
stageGeneration
renderFrameId
domProjectionRevision
canvasPresented
status
```

A clean-looking frame is not proof that reset succeeded. It may also result from parse fallback, unavailable storage or an uncommitted deletion.
