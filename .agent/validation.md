# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T12-59-11-04-00`

## Current validation status

```txt
Runtime files changed in this pass: no
Agent docs changed in this pass: yes
Central ledger changed in this pass: yes
Local build run: no, connector-only documentation/audit pass
Browser smoke run: no, connector-only documentation/audit pass
Fixture script created: no
Fixture script run: no
GitHub Pages live route checked: no
Full LuminaryLabs-Publish repo list compared to central ledger state: yes
Chosen repo root .agent exists before this pass: yes
Central status-summary rollup inclusion: yes, observed in prior status-summary.json schema 1.18.0 readback
Branch created: no
Pull request created: no
Pushed to main: yes
```

## Source readback performed

```txt
README.md read
package.json read
src/game.js read
src/stage-kit.js read
src/story-data.js read
central repo ledger read
repo-local .agent root docs read
```

## Required next validation

After the next runtime source pass, run:

```bash
npm run check
node scripts/validate-story-authority.mjs
python3 -m http.server 8080
```

Then browser-check:

```txt
index.html boots
first scene loads
hotspot hover works
hotspot click grants clue
repeat hotspot does not duplicate clue
room completion opens interlude
continue advances scene
KeyR reset preserves expected behavior
window.GameHost.getState returns additive story/stage/latestCommand/fixture diagnostics
```

## Validation boundaries

This pass only updated `.agent` documentation and central tracking.

No implementation source, package script, fixture script, browser behavior, deployment workflow, or runtime route was changed.
