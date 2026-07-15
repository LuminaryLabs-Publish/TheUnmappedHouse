# Next steps: The Unmapped House inspection control focus continuity

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Status:** `audited`

## Summary

The smallest safe change is keyed hotspot-button projection based on authored scene and hotspot IDs, followed by explicit focus retention or fallback after the accepted inspection result.

## Plan ledger

**Goal:** preserve keyboard position through inspection without changing story progression or canvas picking.

- [ ] Define `HotspotControlId = sceneId:hotspotId`.
- [ ] Track one `HotspotControlListRevision` per scene projection.
- [ ] Replace `hotspotList.textContent = ""` with keyed create, update and retire operations.
- [ ] Keep unchanged button nodes connected.
- [ ] Update label and inspected state in place.
- [ ] Capture activation origin and the pre-command active control.
- [ ] Retain focus on the accepted control when it remains eligible.
- [ ] Define a scene-heading or first-hotspot fallback for retired controls.
- [ ] Keep canvas inspections from stealing semantic focus.
- [ ] Delegate interlude opening and closing to the retained modal-focus authority.
- [ ] Reject stale and duplicate control projections.
- [ ] Publish `InspectionControlProjectionResult`.
- [ ] Publish `FirstFocusStableInspectionFrameAck`.
- [ ] Add keyboard-only first, repeated and final-hotspot fixtures.
- [ ] Add source, artifact and Pages parity fixtures.

## Ordered implementation

### 1. Key controls

Create a `Map<HotspotControlId, HTMLButtonElement>` and derive keys from the stable authored hotspot descriptors.

### 2. Reconcile instead of replace

Create missing controls, update existing labels and retire only controls no longer present in the current scene. Preserve authored order using append or `insertBefore` without replacing surviving nodes.

### 3. Settle focus

Capture `document.activeElement` and the active control ID before mutation. After adoption, focus the surviving accepted control or one explicit fallback. Do not move focus for canvas-origin inspections unless a policy requests it.

### 4. Bind revisions

Publish the story inspection revision and control-list revision together. Preserve the predecessor DOM and focus state if projection fails.

### 5. Prove behavior

Test boot order, first inspection, repeated inspection, adjacent traversal, final scene hotspot, interlude handoff, scene replacement, canvas inspection and projection failure.

## Do not combine yet

Keep story announcements, interlude modal focus, motion preference, page lifecycle, save schema, WebGL recovery, viewport, hotspot picking and resource lifecycle as retained independent authorities.