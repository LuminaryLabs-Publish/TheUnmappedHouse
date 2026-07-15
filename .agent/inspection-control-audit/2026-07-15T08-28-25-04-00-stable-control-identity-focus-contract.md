# Inspection-control audit: stable identity and focus contract

**Timestamp:** `2026-07-15T08-28-25-04-00`

## Summary

Hotspot descriptor IDs are already stable story identities, but they are not projected into stable DOM control identity. The contract below uses those authored IDs to retain nodes, update state in place and settle focus predictably.

## Plan ledger

**Goal:** adopt one keyed control generation that preserves focus for surviving controls and deliberately transfers it when controls retire.

- [x] Identify authored hotspot IDs as the canonical control key source.
- [x] Separate label/state updates from list replacement.
- [x] Define focus retention and fallback rules.
- [x] Define scene and interlude handoff rules.
- [x] Define proof fields.
- [ ] Implement the contract.

## Stable identity

```txt
HotspotControlId = `${sceneId}:${hotspotId}`
HotspotControlListRevision = monotonic per document generation
FocusRevision = monotonic after accepted control adoption
```

Each button should expose its stable ID through an internal map and optionally `data-hotspot-control-id`. Existing controls should be updated in place when label or inspected state changes.

## Focus policy

```txt
accepted DOM inspection and control remains present
  -> retain focus on the same stable control

accepted canvas inspection
  -> do not steal focus from an existing semantic control
  -> optionally expose the inspected control as the next logical focus target

control removed by scene replacement
  -> transfer focus to the new scene heading or first eligible hotspot

interlude opens
  -> delegate to interlude modal focus authority

interlude closes into a new scene
  -> focus new scene heading or authored first hotspot

projection failure
  -> preserve predecessor DOM and focus state
```

## Atomicity

Story state, control labels, inspected markers and focus target must be prepared before the accepted control-list revision is published. A failed DOM adoption must not leave story state claiming a control revision that was never projected.

## Proof

```txt
active element is connected
active control ID equals expected control ID or authored fallback
control label matches inspected state
scene revision matches control-list revision
no duplicate controls share a stable ID
Tab order matches authored hotspot order
```

No runtime implementation is claimed.