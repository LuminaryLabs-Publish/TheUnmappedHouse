# Known gaps: The Unmapped House browser startup readiness authority

**Timestamp:** `2026-07-15T23-00-03-04-00`  
**Status:** `audited`

## Summary

The public shell exposes `Loading`, but startup has no owned attempt, phases, deadline, failure taxonomy, fallback, retry, retirement, or first-frame proof. Failure before or during StageKit construction can leave the document indefinitely pending or partially projected.

## Plan ledger

**Goal:** make startup identity, readiness, terminal failure, recovery, and proof explicit.

- [x] Trace startup from HTML parse through first frame.
- [x] Confirm missing startup results and fallback.
- [x] Define missing identities, policies, and acknowledgements.
- [ ] Implement and execute them.

## Identity gaps

```txt
StartupAttemptId: absent
DocumentGeneration: absent
ModuleGraphRevision: absent
ProviderRevision: absent
GraphicsCapabilityRevision: absent
StoryBootstrapRevision: absent
StagePreparationRevision: absent
FirstSceneRevision: absent
RenderGeneration: absent
StartupDeadline: absent
FirstReadyUiAck: absent
FirstPresentedStoryFrameAck: absent
StartupFallbackFrameAck: absent
```

## Phase and admission gaps

```txt
explicit startup phase model: absent
module graph admission result: absent
provider identity/version result: absent
provider integrity/policy result: absent
WebGL capability result: absent
renderer preparation result: absent
render-target preparation result: absent
story bootstrap result: absent
first-scene preparation result: absent
startup deadline/timeout: absent
stale-attempt rejection: absent
duplicate retry rejection: absent
```

## Failure and recovery gaps

```txt
module network failure class: absent
CSP/provider policy failure class: absent
provider contract failure class: absent
WebGL unavailable class: absent
shader/program failure class: absent
render-target allocation failure class: absent
story restore failure class: absent
scene descriptor failure class: absent
first-frame timeout class: absent
semantic fallback projection: absent
retry command/result: absent
save-preservation receipt: absent
failed-attempt resource retirement: absent
```

## Render convergence gaps

```txt
prepared startup frame: absent
DOM/story/stage revision binding: absent
first render submission result: absent
first public frame acknowledgement: absent
fallback frame acknowledgement: absent
late RAF/callback rejection by generation: absent
```

## Proof gaps

```txt
normal browser startup fixture: absent
provider rejection fixture: absent
CSP/policy rejection fixture: absent
WebGL unavailable fixture: absent
shader failure fixture: absent
render-target failure fixture: absent
first-scene failure fixture: absent
first-frame timeout fixture: absent
retry success fixture: absent
stale attempt after retry fixture: absent
pagehide during startup fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
story save writer lease and revision
story audio event projection
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim public startup readiness until every document generation produces one terminal startup result, recoverable failures expose Retry without losing save state, stale attempts cannot mutate the shell, and source, artifact, and Pages prove matching ready or fallback frames.