# Deploy audit: Story Startup Compatibility Fixture Gate

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

Syntax checks cannot prove that deployed browser storage remains compatible with current story content. Release proof needs a manifest/snapshot matrix against both local and Pages builds.

## Plan ledger

**Goal:** block save-compatibility and safe-startup claims until content and storage matrices pass.

- [x] Record current syntax-only validation.
- [x] Define local fixture rows.
- [x] Define deployed Pages smoke.
- [ ] Implement fixtures.
- [ ] Execute against Pages.

## Required matrix

```txt
fresh storage
valid current snapshot
empty object snapshot
invalid JSON
JSON null
JSON array
wrong field types
unknown fields
unknown scene id
unknown clue ids
unknown inspected scene/hotspot ids
invalid route
old supported schema
future unsupported schema
prior manifest fingerprint
duplicate scene id manifest
duplicate hotspot id manifest
invalid clue reference manifest
invalid render descriptor manifest
```

## Required assertions

```txt
invalid manifest never reaches StageKit
invalid snapshot never reaches gameplay/UI consumers
future schema does not overwrite storage
migration order is deterministic
reconciliation report is complete
unknown fields fail closed
startup result is detached and JSON-safe
visible frame cites manifest fingerprint and snapshot revision
reload after recovery is stable
public Pages behavior matches local fixtures
```

## Existing validation boundary

```txt
npm run check: syntax only
manifest fixtures: unavailable
snapshot fixtures: unavailable
migration fixtures: unavailable
browser startup matrix: unavailable
Pages startup matrix: unavailable
visible startup frame proof: unavailable
```
