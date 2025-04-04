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

#### Requirements

##### Windows

Install Chocolatey with the following command:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

#### UI

> Run the following within the [UI](./ui) directory

##### Requirements

###### Windows

Install Node.js with the following command:

```bash
choco install nodejs.install
```

##### Setup

```bash
npm install
```

##### Start

```bash
npm run dev
```

##### Stop

##### Reset

```bash
rm -Recurse -Force node_modules
```

#### API

> Run the following within the [UI](./ui) directory

##### Requirements

Python

> Note: Run `python --version` to validate installation. If you do not see a version, follow the instructions to disable the microsoft store python alias and reboot.

##### Setup

1. Create Python virtual environment

```bash
python -m venv .venv
```

2. Activate the virtual environment

```bash
.venv/scrips/activate
```

3. Install pip requirements

```bash
pip install -r requirements.txt
```

##### Start

```
fastapi dev root.py
```

##### Stop

##### Reset

```bash
rm -Recurse -Force .venv
```

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
