# Features

This folder contains the main building blocks of the application - application features.

## Structure

- Features are folders (one folder = one feature)
- Flat structure: files directly in feature folder (no type-based sub-folders like `components/`, `hooks/`, `utils/`)
- If feature has a folder inside - it is always nested feature
- Barrel file (index.ts) required: explicitly exports public API, everything else is private

## Import Rules

- **No sibling feature imports allowed**: Features cannot import other sibling features (e.g., `feature-a` cannot import from `feature-b`)
- **No parent imports**: Nested features cannot import from parent
- **What features can import**:
  - `shared-features` - reusable feature components/logic (only via root level `index.ts`)
  - `libs` - internal libraries (UI/API/utilities)
- **What features cannot import**:
  - `app` - Next.js routing structure
  - Parent feature

## Nested Features

- When creating a nested feature, some modules in the parent should become private (moved into the nested feature)
- If nothing becomes private after creating a nested feature, the nested feature shouldn't exist
- Nested features follow the same rules (barrel file, flat structure, no parent imports, etc.)

## Example Structure

```
features/
├── feature-a/
│   ├── ComponentA.tsx        # Private (not exported from index.ts)
│   ├── useHookA.ts           # Private (not exported from index.ts)
│   ├── utilsA.ts             # Private (not exported from index.ts)
│   ├── PublicComponent.tsx   # Public (exported from index.ts)
│   └── index.ts               # Barrel file: exports public API only
└── feature-b/
    ├── ComponentB.tsx         # Private
    ├── PublicComponentB.tsx   # Public (exported from index.ts)
    ├── helperB.ts             # Private
    ├── index.ts               # Barrel file: exports public API
    └── sub-feature/           # Nested feature (hides implementation details)
        ├── SubComponent.tsx   # Private to sub-feature
        ├── PublicSubComponent.tsx  # Public (exported from index.ts)
        ├── helper.ts          # Private to sub-feature
        └── index.ts            # Barrel file: exports public API of sub-feature
```
