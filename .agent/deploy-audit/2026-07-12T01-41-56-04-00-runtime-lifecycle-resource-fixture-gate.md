# Runtime lifecycle resource fixture gate

Timestamp: `2026-07-12T01-41-56-04-00`

## Summary

The deployed static route has no lifecycle or resource-retirement proof beyond syntax checking.

## Plan ledger

**Goal:** add deterministic Node and browser evidence before claiming leak-free transitions or restart safety.

- [x] Record current package validation.
- [x] Define lifecycle and resource fixture rows.
- [x] Define browser evidence.
- [ ] Implement and execute.

## Current gate

```txt
npm run check
  -> node --check four source files
```

No current command creates a renderer, counts frames, removes listeners, fires stale timers, transitions scenes, inspects disposal or restarts the runtime.

## Required local gates

```txt
npm run validate:lifecycle
npm run validate:scene-resources
npm run validate:stale-callbacks
npm run validate:restart
npm run check
```

## Required browser evidence

```txt
one canvas at boot
one active session
one RAF chain
transition A -> B -> C
bounded geometry/material/hotspot counts
retirement receipt after each successor frame
stop blocks later frame and input commits
restart creates one new canvas and one new RAF chain
final stop disposes target, post and renderer resources
```

## Deployment claim boundary

A successful Pages deployment proves file delivery only. It does not prove callback retirement, resource disposal, stale-work fencing or restart idempotence.
