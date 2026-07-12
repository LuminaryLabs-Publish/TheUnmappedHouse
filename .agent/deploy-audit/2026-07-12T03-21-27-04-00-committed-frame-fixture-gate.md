# Committed frame fixture gate

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

Current deployment proves static file delivery and syntax only. It does not prove frame/state correlation.

## Plan ledger

**Goal:** require local and deployed browser evidence before claiming notebook/debug/canvas parity.

- [x] Record current validation.
- [x] Define local fixtures.
- [x] Define browser screenshot evidence.
- [ ] Implement and execute.

## Current gate

```txt
npm run check
  -> syntax-check four source files
```

## Required local gates

```txt
npm run validate:frames
npm run check
```

## Required browser evidence

```txt
initial committed-frame receipt and screenshot
inspection result and first frame citing it
scene transition result and first successor frame
notebook/debug/canvas revision parity
stage and post pass success
stale-frame rejection
bounded detached journal
commit SHA and artifact references
```

## Deployment claim boundary

A successful Pages deployment does not prove that visible pixels correspond to the current story or debug state.
