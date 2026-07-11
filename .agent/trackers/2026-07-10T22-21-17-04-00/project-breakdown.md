# Project breakdown tracker

Timestamp: `2026-07-10T22-21-17-04-00`

Repository: `LuminaryLabs-Publish/TheUnmappedHouse`

## Goal

Document the full interaction, domain, service and kit architecture, then define the smallest safe implementation boundary that guarantees every completed scene can resume after reload and every story-to-stage transition commits coherently.

## Selection ledger

```txt
LuminaryLabs-Publish inventory: 10 repositories
TheCavalryOfRome: excluded
eligible repositories: 9
new or ledger-missing repositories: 0
eligible repositories missing root .agent state: 0
selection rule used: oldest documented fallback
selected repository: TheUnmappedHouse
previous central timestamp: 2026-07-10T20-38-24-04-00
```

## Checklist

- [x] Enumerate the full accessible Publish inventory.
- [x] Compare eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select exactly one repository.
- [x] Read package, shell, story runtime, story descriptors and StageKit sources.
- [x] Read current root `.agent` state and prior lifecycle audits.
- [x] Identify the interaction loop.
- [x] Identify all active and planned domains.
- [x] Catalog current kits and services.
- [x] Trace save creation, load, completion, interlude and terminal behavior.
- [x] Trace story mutation relative to stage loading and rendering.
- [x] Identify the reload-after-completion deadlock.
- [x] Define a versioned save and explicit story-phase boundary.
- [x] Define typed inspect and Continue command results.
- [x] Define story-stage transaction composition.
- [x] Add architecture, render, gameplay, interaction, persistence, story-authority and deploy audits.
- [x] Refresh `START_HERE.md`, `current-audit.md`, `next-steps.md`, `known-gaps.md`, `validation.md` and `kit-registry.json`.
- [x] Push only to `main`.
- [ ] Synchronize the central repo ledger.
- [ ] Add the central internal change-log entry.

## Main finding

A scene can be persisted as complete while its interlude remains entirely timer/DOM-owned. Reloading any completed scene restores complete clues and inspections but no open or pending interlude, and already-seen hotspots do not reschedule it. This creates a permanent route deadlock.

## Next safe ledge

```txt
TheUnmappedHouse Resume-Safe Story Phase Authority + Transition Fixture Gate
```
