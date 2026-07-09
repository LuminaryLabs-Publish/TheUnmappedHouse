# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T13-38-15-04-00`

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
Full LuminaryLabs-Publish repo list compared to central ledger/root agent state: yes
Chosen repo root .agent exists before this pass: yes
Central ledger updated: yes
Branch created: no
Pull request created: no
Pushed to main: yes
```

## Source readback performed

```txt
package.json read
index.html read
src/aspect-frame.js read
src/game.js read
src/stage-kit.js read
src/story-data.js read
repo-local .agent root docs read
central repo ledger read
Publish repo list read
sampled root .agent/START_HERE.md for checked non-Cavalry repos
```

## Current available checks

```txt
npm run check
npm run serve
```

`npm run check` currently performs syntax checks for `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Missing validation before implementation

```txt
scripts/story-authority-fixture.mjs
DOM-free story command rows
StageKit descriptor/readback rows
Browser adapter plan/readback rows
GameHost diagnostics rows
repo-local ledger readback row
central ledger readback row
```
