# Validation: The Unmapped House

Timestamp: `2026-07-10T00-51-03-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
repo-local docs pushed to main: yes
central ledger update planned: yes
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Missing validation

- No DOM-free story authority fixture.
- No adapter readback fixture.
- No result rows for accepted/rejected/no-mutation commands.
- No fixture rows for continue, terminal, save, interlude, or stage-load intents.

## Required next validation gate

```txt
node scripts/validate-story-authority.mjs
npm run check
```

The fixture should be added before any story expansion or render rewrite.
