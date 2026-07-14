# Known gaps: The Unmapped House terminal completion settlement and resume

**Timestamp:** `2026-07-14T06-00-41-04-00`  
**Status:** `audited`

## Summary

Final completion has no canonical outcome state, durable settlement result, resume path or visible-frame proof. The player can reload into an already-complete final scene with no way to recover the terminal interlude.

## Plan ledger

**Goal:** make every terminal identity, settlement participant, storage result, control route and visible outcome explicit and testable.

- [x] Trace final completion and reload.
- [x] Confirm terminal DOM copy is not saved.
- [x] Confirm boot does not reconstruct terminal presentation.
- [x] Define the missing authority and proof.
- [ ] Implement and execute it.

## Identity gaps

```txt
StoryManifestRevision: absent
TerminalOutcomeId: absent
TerminalOutcomeSchemaVersion: absent
TerminalOutcomeRevision: absent
SettlementCommandId: absent
DurableSaveGeneration: absent
TerminalProjectionRevision: absent
TerminalControlManifestRevision: absent
FirstTerminalOutcomeFrameId: absent
```

## Settlement gaps

```txt
final completion command: absent
expected story-state revision: absent
premature completion rejection: absent
duplicate completion result: absent
immutable outcome candidate: absent
atomic outcome/route/Notebook/control adoption: absent
terminal settlement result: absent
```

## Persistence and resume gaps

```txt
terminal outcome in saved state: absent
staged durable write: absent
readback fingerprint verification: absent
storage failure classification: absent
terminal outcome admission on boot: absent
terminal route reconstruction: absent
terminal resume result: absent
```

## Interaction gaps

```txt
route-specific terminal controls: absent
generic Continue retirement: absent
repeated terminal command handling: absent
terminal reset command result: absent
terminal exit command result: absent
focus restoration on terminal resume: absent
```

## Reachable dead end

```txt
complete final scene
  -> open interlude
  -> press Continue
  -> terminal copy appears
  -> no terminal save
  -> reload
  -> final scene remains complete
  -> interlude hidden
  -> every hotspot already inspected
  -> re-read branch returns before completion scheduling
  -> terminal UI cannot be recovered
```

## Visible proof gaps

```txt
terminal projection receipt: absent
outcome-to-save correlation: absent
outcome-to-final-scene correlation: absent
terminal control revision correlation: absent
first terminal visible-frame acknowledgement: absent
reloaded terminal visible-frame acknowledgement: absent
```

## Validation gaps

```txt
final completion model fixture: absent
duplicate and stale command fixtures: absent
storage failure and readback fixtures: absent
browser completion/reload fixture: absent
terminal control fixture: absent
production-artifact fixture: absent
Pages-origin fixture: absent
```

## Retained independent gaps

```txt
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot input and picking
save commit/reset convergence
ordinary interlude progression and focus
stage resource lifecycle and WebGL recovery
```

## Completion boundary

Do not claim terminal completion is implemented because prototype-complete copy appears. Completion requires one accepted outcome identity, idempotent settlement, durable readback or explicit degraded status, reload reconstruction, route-specific terminal controls and a first visible frame tied to the accepted outcome revision.