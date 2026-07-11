# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T08-11-14-04-00`

## Goal

Document the canonical story-definition and persistence boundary required before inspection authority, atomic Continue transitions and runtime lifecycle work.

## Selection ledger

- [x] Read the complete ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repos with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm no eligible repo is new, ledger-missing or missing root `.agent` state.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central record at `2026-07-11T06-21-57-04-00`.

## Breakdown ledger

- [x] Identify the load, inspect, save, Continue and reset interaction loop.
- [x] Identify all runtime, story, persistence, render, input, validation and deployment domains.
- [x] Inventory all 24 implemented kit responsibilities and services.
- [x] Trace the `.v1` key, raw object shape and shallow merge.
- [x] Trace unknown-scene fallback and persisted identity divergence.
- [x] Trace forged clue, orphaned inspection and malformed-field admission.
- [x] Define manifest, snapshot, migration, reconciliation and typed persistence kits.
- [x] Define fixture rows and implementation order.
- [x] Change documentation only.
- [x] Push only to `main`.

## Main finding

The runtime has a storage key that looks versioned but no versioned story contract. Arbitrary parsed fields are admitted through a shallow merge, while the active scene can silently fall back without correcting the persisted scene id. Story definitions also have no canonical indexes or fingerprint, so later inspection and render transactions cannot prove which definition they consumed.

## Output set

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T08-11-14-04-00.md
.agent/architecture-audit/2026-07-11T08-11-14-04-00-story-manifest-persistence-dsk-map.md
.agent/render-audit/2026-07-11T08-11-14-04-00-manifest-scene-render-provenance-gap.md
.agent/gameplay-audit/2026-07-11T08-11-14-04-00-load-inspect-save-reload-loop.md
.agent/interaction-audit/2026-07-11T08-11-14-04-00-load-save-reset-result-map.md
.agent/persistence-audit/2026-07-11T08-11-14-04-00-save-admission-migration-reconciliation-contract.md
.agent/deploy-audit/2026-07-11T08-11-14-04-00-manifest-persistence-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Versioned Story Manifest Authority
+ Save Admission, Migration and Reconciliation Fixture Gate
```
