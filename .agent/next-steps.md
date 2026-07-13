# Next steps: The Unmapped House

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The next implementation should replace cached `mousemove` state plus coordinate-less canvas clicks with one pointer-event adapter and one shared inspection-command path. The first executable proof should cover first-click correctness, touch taps, pointer leave and camera-parallax correlation before story or rendering features are expanded.

## Plan ledger

**Goal:** establish exact event-bound hotspot admission and prove that canvas, touch and side-panel controls select the intended hotspot against the visible frame.

- [ ] Introduce pointer source, sample and command identity.
- [ ] Capture activation coordinates from the submitting event.
- [ ] Bind viewport, canvas rect, scene, hotspot-set and camera-frame revisions.
- [ ] Publish typed hit, miss and rejection results.
- [ ] Route canvas and exact controls through one inspection command.
- [ ] Add duplicate and stale-command rejection.
- [ ] Retire hover on leave, cancel, scene change and stop.
- [ ] Correlate accepted inspection results with visible frames.
- [ ] Add browser, touch-emulation and Pages fixtures.

## Ordered implementation

### 1. Replace mouse-only sampling

Use pointer events for mouse, touch and stylus. Keep hover observation separate from activation.

```txt
pointermove -> hover sample only
pointerup or click policy -> activation sample from that event
pointerleave/pointercancel -> retire hover and sample state
```

### 2. Add input identity

```txt
inputSessionId
commandId
eventSequence
pointerId
pointerType
sourceType
sceneRevision
hotspotSetRevision
viewportRevision
canvasRectRevision
cameraPoseRevision
renderFrameSequence
```

### 3. Capture event-bound coordinates

Do not reuse `this.pointer` for activation. Normalize `clientX/clientY` from the event that submits the command against the admitted canvas rect.

### 4. Define camera-frame policy

Choose and document one policy:

```txt
pick against last presented frame
or
commit a current camera pose before both pick and render
```

Do not mix a new pointer sample with an unversioned older camera pose.

### 5. Publish `HotspotPickResult`

Return typed terminal statuses for hit, miss, outside-canvas, stale scene, stale viewport, stale camera, duplicate and unsupported source.

### 6. Unify gameplay execution

Canvas picks and side-panel controls must both create `HotspotInspectionCommand` and receive `HotspotInspectionResult`. The story reducer should not know how the target was selected beyond validated source evidence.

### 7. Add exactly-once behavior

Bind inspection results to command IDs. Duplicate delivery should return the previous result without repeating logs, saves, timers or future effects.

### 8. Own hover lifecycle

Clear hover on pointer leave, cancel, scene transition, runtime retirement and stale viewport replacement.

### 9. Add visible-frame receipts

Record `FirstVisibleInspectionFrameAck` with inspection result, scene, hotspot, story revision, camera revision, viewport revision and render frame sequence.

### 10. Add fixture matrix

```txt
first mouse click with no prior movement
mousemove then click elsewhere
click before next parallax RAF
touch tap with no mousemove
stylus tap
pointer leave after hover
outside-canvas activation
resize between sample and activation
scene transition between sample and activation
overlapping hit candidates
canvas/button equivalent selection
duplicate activation delivery
```

## Do not combine yet

Keep save convergence, interlude progression, story-manifest admission and stage-resource lifecycle as separate parent domains. The hotspot input authority should coordinate with them through typed commands and revisions rather than absorb their internal rules.