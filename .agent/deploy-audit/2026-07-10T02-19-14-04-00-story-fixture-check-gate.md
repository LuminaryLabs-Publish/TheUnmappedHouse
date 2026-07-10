# Deploy audit: story fixture check gate

Timestamp: `2026-07-10T02-19-14-04-00`

## Existing commands

`package.json` currently exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks the browser source files.

## Missing deploy gate

There is no DOM-free fixture proving story authority. Browser smoke would not prove command/result/readback rows because the rows do not exist yet.

## Required next gate

Add:

```txt
scripts/validate-story-authority.mjs
```

Then wire it into `npm run check` after the source-authority modules exist.

## Fixture must cover

```txt
initial scene resolution
accepted first inspect
repeat no-mutation inspect
unknown/stale hotspot rejection
scene completion
interlude intent
continue next scene
terminal route intent
save intent
stage-load intent
projection record
browser adapter plan shape
```

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
```

## Deploy guidance

Do not treat a static-server smoke as sufficient until the fixture exists. The next durable deploy gate is source-owned story fixture first, browser smoke second.
