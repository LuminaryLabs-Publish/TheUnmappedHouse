# Deploy audit: Production Notebook Observability Fixture Gate

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

Syntax checks and local visual inspection cannot prove that the deployed public build excludes unadmitted developer diagnostics. Browser and Pages fixtures must inspect the actual DOM, channel metadata and projection receipts.

## Plan ledger

**Goal:** block production-safe notebook and diagnostic claims until public, developer and support channel matrices pass.

- [x] Record the current public Notebook behavior.
- [x] Define local browser fixture rows.
- [x] Define deployed Pages assertions.
- [ ] Add executable fixtures.
- [ ] Run fixtures against deployed Pages.

## Required local matrix

```txt
public player build with fresh state
public player build after each of nine inspections
public player build after each Continue
public player build after reset
developer channel without capability
developer channel with valid capability
support export with redaction profile
unknown aggregate field injection
prohibited field injection
stale story revision
stale projection revision
projection byte-budget overflow
```

## Required assertions

```txt
public player Notebook contains authored narrative only
public player Notebook contains no raw scene, clue or route ids
public player Notebook contains no raw inspected map
public player Notebook does not expose unadmitted diagnostic JSON
developer diagnostics fail closed without capability
developer diagnostics cite classification and redaction revisions
unknown and prohibited fields do not serialize
support export contains only SupportSafe fields
stale projections do not overwrite current Notebook
first visible frame cites story and projection revisions
observation journal is bounded and contains no prohibited values
```

## Pages smoke

```txt
load deployed route with cleared storage
inspect Notebook DOM and projection metadata
complete one scene through canvas and side-panel paths
confirm player-safe notes after each action
continue to successor scene and confirm predecessor projection is absent
reload and confirm restored player projection
attempt unadmitted developer channel activation
confirm no raw debug JSON appears
capture visible Notebook frame receipt
```

## Existing validation boundary

```txt
npm run check: syntax only
browser channel matrix: unavailable
Pages channel matrix: unavailable
field-classification fixtures: unavailable
redaction fixtures: unavailable
visible notebook frame proof: unavailable
```

## Gate

Do not mark the Notebook production-safe because it contains no server secrets. The release gate is whether the public build exposes only explicitly admitted player-safe content and whether diagnostic channels are classified, redacted, capability-gated and visibly provable.