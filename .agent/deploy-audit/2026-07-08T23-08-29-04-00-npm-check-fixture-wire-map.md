# Deploy Audit: npm Check Fixture Wire Map

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Current validation surface

`package.json` currently has:

```txt
npm run serve
npm run check
```

`npm run check` is syntax-only:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
```

## Next deploy-safe validation cut

Add a fixture script without changing deployment first:

```txt
scripts/validate-story-authority.mjs
```

Then wire it into validation only after the fixture is stable:

```txt
node scripts/validate-story-authority.mjs
```

Recommended package order:

```txt
1. Keep existing npm run check unchanged while adding pure modules.
2. Add scripts/validate-story-authority.mjs.
3. Run the fixture directly.
4. Add npm script: "check:story": "node scripts/validate-story-authority.mjs".
5. Update npm run check to include check:story only after the script is deterministic.
```

## Required non-browser fixture boundaries

```txt
No DOM required.
No WebGL required.
No localStorage required.
No setTimeout required.
No StageKit raycasting required.
No HTTP server required.
```

## Browser smoke after fixture gate

```txt
python3 -m http.server 8080
open index.html
first scene loads
hotspot hover works
hotspot click grants clue
repeat hotspot does not duplicate clue
room completion opens interlude
continue advances scene
KeyR reset behavior remains compatible
window.GameHost.getState().story returns additive diagnostics
```

## GitHub Pages guard

Do not change `.github/workflows/deploy-pages.yml` unless the runtime source pass reveals an actual deployment gap.

The next pass should be source/fixture validation first, deploy workflow second.
