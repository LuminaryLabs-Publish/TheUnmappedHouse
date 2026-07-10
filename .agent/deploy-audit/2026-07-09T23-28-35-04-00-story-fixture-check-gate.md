# Deploy audit: story fixture check gate

Timestamp: `2026-07-09T23-28-35-04-00`

## Current scripts

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` currently performs Node syntax checks for:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Current validation state

This pass did not run validation. Runtime source was not changed.

## Gap

There is no fixture script for story authority or browser adapter readback. The current check gate can catch syntax errors, but it cannot prove command results, repeat no-op behavior, route transitions, save intents, interlude intents, or StageKit load intents.

## Required next gate

Add a fixture script such as:

```txt
scripts/validate-story-authority.mjs
```

Then wire it into `npm run check` after the source-owned story authority modules exist.

## First fixture assertions

- Source descriptors load without DOM.
- Initial state matches scene zero.
- Hotspot inspect returns stable accepted result.
- Repeat hotspot inspect returns stable no-mutation result.
- Completion produces interlude and save intents.
- Continue produces stage-load intent.
- Final continue produces terminal result.
- Browser adapter readback rows can be serialized.

## Deploy recommendation

Do not treat a browser smoke as the first proof. Use a DOM-free fixture as the durable gate, then keep browser smoke for visual sanity after the adapter split.
