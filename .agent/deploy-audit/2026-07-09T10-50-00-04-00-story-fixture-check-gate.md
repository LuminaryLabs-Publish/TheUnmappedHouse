# Deploy Audit: Story Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Current validation surface

Current validation is documentation-only for this pass.

The existing repo check path is syntax-oriented. The next runtime pass should add source fixtures before browser-only smoke.

## Required next validation order

```txt
1. Add pure story-authority source files.
2. Add scripts/validate-story-authority.mjs.
3. Run node scripts/validate-story-authority.mjs directly.
4. Add the fixture script to npm run check only after direct fixture proof is stable.
5. Run npm run check.
6. Run local static server/browser smoke after DOM adapter consumes source-owned plans.
7. Update central ledger only after fixture/readback paths are current.
```

## Must not do first

```txt
Do not use GitHub Pages smoke as the first validation.
Do not change deployment workflow before source fixture gate exists.
Do not add browser-only assertions before reducer rows exist.
Do not change static route structure.
```

## Gate name

```txt
TheUnmappedHouse Story Command Result Ledger + Adapter Readback Fixture Gate
```
