# Architecture audit: Stage Resource Lifecycle DSK Map

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

Scene content, Three.js allocation, browser callbacks and shutdown currently share one `StageKit` object without explicit resource ownership or transactional boundaries.

## Plan ledger

**Goal:** separate story meaning from renderer-resource lifecycle while preserving one atomic scene presentation transaction.

- [x] Map current ownership.
- [x] Define the missing parent domain.
- [x] Define candidate kits and transaction order.
- [ ] Implement and fixture the domain.

## Current composition

```txt
browser-story-runtime-kit
  -> scene-route-kit
  -> scene-descriptor-consumer-kit
      -> anime-material-kit
      -> hotspot-volume-kit
      -> camera-parallax-kit
      -> render-target-composition-kit
  -> stage-render-kit
      -> browser listeners
      -> recursive RAF
```

## Missing parent domain

```txt
the-unmapped-house-stage-resource-lifecycle-authority-domain
```

### Identity and admission

```txt
stage-session-id-kit
stage-session-generation-kit
scene-resource-set-id-kit
scene-resource-revision-kit
scene-load-command-kit
stale-scene-load-rejection-kit
```

### Preparation and transaction

```txt
scene-resource-plan-kit
scene-resource-prepare-kit
scene-resource-commit-kit
scene-resource-rollback-kit
hover-state-reset-kit
```

### Ownership and retirement

```txt
geometry-resource-lease-kit
material-resource-lease-kit
hotspot-resource-lease-kit
render-target-resource-lease-kit
listener-lease-kit
raf-loop-lease-kit
scene-resource-retirement-kit
scene-resource-disposal-result-kit
```

### Shutdown and proof

```txt
stage-stop-command-kit
stage-stop-result-kit
first-visible-scene-frame-ack-kit
stage-lifecycle-observation-kit
stage-lifecycle-journal-kit
scene-transition-resource-fixture-kit
browser-stage-stop-smoke-kit
pages-stage-lifecycle-smoke-kit
```

## Boundary rules

```txt
story domain owns descriptor meaning
lifecycle domain owns resource identity and lifetime
renderer owns Three.js implementation details behind leases
browser host emits viewport/input/stop evidence only
no live-group mutation during candidate preparation
no predecessor disposal before rollback is impossible under declared policy
no resource is disposed twice
no frame is acknowledged without the committed resource revision
```
