# Libs

This folder contains internal libraries that can be used across the application.

## Types of Libraries

- **UI libraries** - reusable UI components and design system elements
- **API libraries** - libraries for accessing data from the server
- **Utility libraries** - helpers and utility functions

## Usage

- Can be imported by `features`, `shared-features`, and `app`
- Provides shared functionality that doesn't belong to a specific feature
- Use for code that is truly generic and reusable across different parts of the application

## Example Structure

```
libs/
├── ui/           # UI library
│   └── ...
├── api/          # API library
│   └── ...
└── utils/        # Utility library
    └── ...
```
