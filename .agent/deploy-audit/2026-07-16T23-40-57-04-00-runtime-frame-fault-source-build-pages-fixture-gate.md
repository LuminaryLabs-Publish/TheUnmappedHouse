# Deploy audit: runtime frame fault source/build/Pages fixture gate

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Current validation surface

`npm run check` performs JavaScript syntax checks only. It does not create a browser, execute RAF, inject renderer failures, observe retry cadence, inspect a fallback surface, or verify restart behavior.

## Required source fixtures

```txt
inject camera update throw
inject material update throw
inject offscreen renderer throw
inject post renderer throw
assert one terminal attempt result
assert bounded retry count
assert minimum retry backoff
assert stale callback rejection
assert safe fallback projection
assert explicit restart result
assert FirstSafeFaultFrameAck
assert FirstRecoveredFrameAck
```

## Artifact gate

The staged static artifact must use the same frame-fault policy, result taxonomy and retry limits as source. File presence and syntax are insufficient.

## Pages gate

At the deployed origin:

- Load the game and establish one successful baseline frame.
- Inject or simulate each supported frame-phase failure.
- Confirm retries are bounded and not tied to raw display refresh indefinitely.
- Confirm story interaction is suspended after terminal retirement.
- Confirm one safe public failure surface appears.
- Confirm restart produces one matching recovered frame without replaying story commands.

## Release boundary

Do not claim runtime fault containment, browser recovery, artifact parity, Pages parity or production readiness until these fixtures pass and their evidence is retained.

No workflow, test, build or deployment file was changed.