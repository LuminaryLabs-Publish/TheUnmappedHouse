# Known gaps: The Unmapped House

Timestamp: `2026-07-12T01-41-56-04-00`

## Plan ledger

**Goal:** keep lifecycle, callback, scene-resource, rendering, story and validation gaps explicit.

- [x] Trace page-lifetime ownership of RAF, listeners, timeouts and Three.js resources.
- [x] Confirm scene replacement detaches but does not dispose resource graphs.
- [x] Confirm no session generation, lifecycle state or ordered disposal result exists.
- [x] Define callback leases, resource generations, retirement and restart-proof gaps.
- [ ] Implement and execute the Runtime Session Lifecycle Authority gate.

## Runtime session gaps

- No runtime session id or generation exists.
- No lifecycle state distinguishes constructing, ready, stopping, disposed or failed.
- No typed start, stop, restart, dispose or rollback result exists.
- Module evaluation creates the runtime immediately; no admitted startup transaction exists.
- No idempotent stop or dispose operation exists.
- No pagehide or visibility-retirement policy exists.

## Callback lease gaps

- The RAF request id is not retained.
- `animate()` always schedules another callback before rendering.
- Resize, mousemove, click, Continue and keyboard listeners are not represented as leases.
- Anonymous listener closures cannot be removed without retained references.
- The 450 ms completion timeout is not retained or cancelled.
- No callback checks a session generation or lifecycle state.
- No stale callback rejection or observation exists.

## Scene-resource gaps

- `stageGroup.clear()` detaches children but does not dispose their geometries or materials.
- The `materials` array is replaced before predecessor materials are retired.
- Hotspot geometry and transparent materials are not disposed.
- Scene loads have no resource generation, commit receipt or retirement result.
- Predecessor resources are not retained until a successor-frame acknowledgement.
- No rollback exists when successor resource construction partially fails.

## Renderer ownership gaps

- The renderer and canvas have no owner lease.
- The multisampled render target is never disposed.
- The post material and full-screen plane geometry are never disposed.
- Scene lights, groups and context are not retired through one plan.
- No context-loss handling is coordinated with lifecycle disposal.
- No detached resource inventory or leak observation exists.

## Gameplay and interaction gaps

- Completion timeout work can outlive the state that scheduled it in any future in-place reset or restart.
- Input remains admitted until the page itself disappears.
- A disposed or stale stage cannot currently reject hotspot picks because no disposed state exists.
- Continue has no session or scene generation precondition.
- Narrative, story and stage commits do not cite runtime identity.

## Existing upstream gaps

- StoryManifest, StorySnapshot, pointer, inspection, transition and narrative authorities remain unimplemented.
- Render Surface Resolution and WebGL Context Recovery remain unimplemented.
- No committed frame correlates runtime, scene-resource, story, narrative, surface and context generations.

## Validation gaps

- `npm run check` is syntax-only.
- No fixture counts live RAF chains.
- No fixture proves listener removal.
- No fixture advances a stale timeout after stop.
- No fixture records geometry/material/target disposal.
- No fixture repeats scene transitions and checks bounded resource counts.
- No fixture restarts the runtime and proves one canvas and one session.
- No deployed browser artifact exposes lifecycle or resource-retirement receipts.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
