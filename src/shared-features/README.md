# Shared Features

**Escape hatch**: Only create shared-features if absolutely necessary. Prefer keeping code within features or using libs (UI/API/utilities).

## Purpose

This folder is created to fix one problem: when we need a feature inside 2 or more other features, so it cannot be a child of one of them.

## Why Features Can't Solve This

### "Features cannot import sibling features"

If `feature-a` and `feature-b` are siblings, `feature-a` cannot import from `feature-b`, and `feature-b` cannot import from `feature-a`.

### "Nested features cannot be imported by parent's siblings"

If `feature-a` has a nested feature `sub-feature-a`, then `feature-b` (a sibling of `feature-a`) cannot import from `sub-feature-a`. Nested features are only accessible within their parent feature.

### The Problem

If code is needed by both `feature-a` and `feature-b`, you cannot:

- Put it in `feature-a` → `feature-b` can't import it (sibling rule)
- Put it in `feature-b` → `feature-a` can't import it (sibling rule)
- Nest it under `feature-a` → `feature-b` can't import it (nested features can't be imported by parent's siblings)
- Nest it under `feature-b` → same issue

### Solution

Put it in `shared-feature-x` in `src/shared-features/`. Both `feature-a` and `feature-b` can import from `shared-feature-x` (via its root `index.ts`).

## Import Rules

- **Can be imported from anywhere**: Features, nested shared-features, deeply nested components, etc.
- **Import rule**: Can only import from root level (via index.ts barrel file) - everything nested is implementation details
- **Root-level shared-features can import sibling shared-features**: Root-level shared-features can import other root-level shared-features (via their index.ts)
- **No parent imports**: Nested shared-features cannot import from their parent shared-feature

## Structure

- Same structure and rules as features folder:
  - Flat structure with files directly in feature folders
  - Barrel file (index.ts) required for public API exports at root level
  - Nested shared-features allowed (same rules as nested features)
  - Nested shared-features only for hiding implementation details

## Example Structure

```
shared-features/
├── shared-feature-a/  # Example shared feature (root-level)
│   ├── PublicComponent.tsx
│   ├── PrivateComponent.tsx
│   ├── index.ts
│   └── nested-shared-feature/  # Nested shared-feature (hides implementation details)
│       ├── PublicSubComponent.tsx
│       ├── helper.ts
│       └── index.ts
└── shared-feature-b/  # Example shared feature (root-level)
    ├── PublicComponent.tsx
    └── index.ts
```

**Note**: `shared-feature-a` can be imported by `feature-a`, `feature-b`, and `shared-feature-b` - but only via `shared-feature-a/index.ts` (root level public API).
