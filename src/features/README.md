# Features

This folder contains the main building blocks of the application - application features.
The main goal of the feature - is to compose `ui`, `api`, other libs into something meaningful for business.

## Structure

- Features are folders (one folder = one feature)
- Flat structure: files directly in feature folder (no type-based sub-folders like `components/`, `hooks/`, `utils/`)
- If feature has a folder inside - it is always nested feature
- Barrel file (index.ts) required: explicitly exports public API, everything else is private

## Import Rules

- **What features cannot import**:
  - `app` - Next.js routing structure
  - `sibling features` - features cannot import other sibling features (e.g., `feature-a` cannot import from `feature-b`)
  - `parent feature` - feature cannot import from parent
  - `private in child features` - feature cannot import files directly from child feature
- **What features can import**:
  - `public in child features` - feature parent can import from barrel of feature child
  - `shared-features` - not recommended, but sometimes duplication cannot be avoided in other way. Read about shared-features in own README.md
  - `libs` - internal libraries (UI/API). Read about libs in own README.md

## Nested Features

- The most common reason to create nested feature is to hide details (some modules should be private)
- avoid features as collections of modules where everything is public and exported from barrel
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
