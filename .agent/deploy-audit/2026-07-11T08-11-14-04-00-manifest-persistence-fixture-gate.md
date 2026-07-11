# Deploy audit: manifest and persistence fixture gate

Timestamp: `2026-07-11T08-11-14-04-00`

## Current gate

`npm run check` performs JavaScript syntax checks only. GitHub Pages can deploy a build whose story manifest is internally inconsistent or whose save admission path accepts malformed and incompatible state.

## Required pre-deploy command chain

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot.mjs
node scripts/validate-save-admission.mjs
node scripts/validate-save-migration.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-save-write-results.mjs
npm run check
```

## Required blocking rows

```txt
manifest schema valid
scene/hotspot ids unique
clue ownership complete
required clues resolvable
manifest fingerprint deterministic
snapshot schema valid
load classification typed
legacy v1 migration deterministic and idempotent
unknown ids reconciled by policy
forged clues cannot create completion
save revision monotonic
failed storage write cannot report commit
reload preserves state fingerprint
```

## Browser smoke after Node fixtures

```txt
open with no save
open with valid legacy v1 save
open with malformed JSON
open with unknown scene id
open with forged clue strings
inspect and reload
complete and reload
reset and verify clear result
confirm story copy, three scenes, nine hotspots, 450 ms interlude and visual presentation are unchanged
```

## Deployment policy

- Keep deployment from `main` only.
- Do not deploy when any manifest, migration, reconciliation or write-result fixture fails.
- Do not treat syntax success as behavioral persistence proof.
- Record the manifest fingerprint and fixture result set in deployment diagnostics.

## Current validation status

```txt
runtime source changed: no
fixture scripts present: no
npm run check executed this pass: no
browser smoke executed this pass: no
deployment workflow changed: no
```
