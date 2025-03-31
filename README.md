# App (React/Vite, Python/FastAPI)

> Helpful note: Find/Replace "App" with the application name throughout the entire templated repository!

## Table of Contents

1. [Overview](#overview)
2. [Development Server](#development-server)
3. [Dependencies](#dependencies)
4. [Project Structure](#project-structure)
5. [External Resources](#external-resources)

## Overview

> Quick excerpt describing the intention of the application

More detail explaining the application itself. Provide reference resources for more context.

## Development Server

### Running the Development Server

## Dependencies

Detailed dependencies for the API are available in [API README.md](./api/README.md), and for the UI in [UI README.md](./ui/README.md).

Each dependency should be described in detail, including its:

1. Purpose for use
2. Required version

## Project Structure

```
app/
│
├─ ui/
│   ├─ src/                 # UI source code
│   ├─ public/              # Public user facing content. No secret files!
│   ├─ eslist.config.js     # Configuration for ESLint
│   ├─ index.html           # Root HTML file for the application
│   ├─ package.json         # Local dependency manager
│   ├─ package-lock.json    # Repository-wide dependency management
│   ├─ vite-config.js       # Vite configuration file
│
├─ api/
│   ├─ src/                 # API origin source code
│       ├─ middleware/      # FastAPI request middleware
│       ├─ util/            # Basic API global utility functions
│   ├─ routers/             # API routers for sections of the application
│   ├─ models/              # Pydantic models for API route standardization
│   ├─ services/            # Individual service modules in use throughout the application
│
├─ .env                     # App-wide environment variables to configure application state.
└─
```

## External Resources

> External resources for reference relating to this application.
