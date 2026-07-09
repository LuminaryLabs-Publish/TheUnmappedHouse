# Deploy Audit — Check Script Fixture Gate

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Current validation/deploy posture

```txt
package.json npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This is syntax-only. It does not prove story behavior, route/save/interlude behavior, StageKit descriptor compatibility, browser adapter plans, or ledger readback.

## Required fixture gate

Add a pure Node script before browser gating:

```txt
scripts/validate-story-authority.mjs
```

Then update `npm run check` to run syntax checks plus the story authority fixture.

## Required checks

```txt
source manifest exists and matches route/source ids
all story scene ids are unique
all hotspot ids are unique within scenes
all required clues are grantable
initial state normalizes
malformed save normalizes or rejects with stable reason
first inspect produces accepted result
repeat inspect produces no_mutation result
unknown hotspot rejects
incomplete continue rejects
complete scene opens interlude projection
continue scene emits stage projection
terminal route emits terminal result
repo-local ledger readback matches latest .agent tracker
central ledger readback matches repo-local latest tracker
```

## Do not gate yet

```txt
browser-only Playwright smoke
visual screenshot diff
renderer extraction tests
localStorage mutation tests without reducer fixture
new Pages workflow changes
```

## Acceptance

```txt
node scripts/validate-story-authority.mjs passes
npm run check calls the fixture
browser route still boots manually
no branch or PR required
central ledger updated after repo-local docs and fixture facts are current
```

## Current pass validation

Documentation-only. Runtime source was not changed and the fixture does not exist yet.
