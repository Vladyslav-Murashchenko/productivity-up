# Libs

This folder contains internal libraries that can be used across the application.

## Types of Libraries

- `ui` - reusable UI components and UI utils, it doesn't know that `api` exists
- `api` - data access and manipulations, it doesn't know that `ui` exists
- `your-custom-library` - any other libraries to solve any problems, it usually doesn't know `ui` and `api` exists.

## Usage

- Can be imported by `features`, `shared-features`, and `app`
- Provides shared functionality that doesn't belong to a specific feature
- Use for code that is truly reusable across different parts of the application
- You can hide some implementation details inside libs, for example hide `hero-ui` usage inside `ui` and `dexie` in `api`.

## Example Structure

```
libs/
├── ui/
│   └── ...
├── api/
│   └── ...
└── your-custom-library/
    └── ...
```
