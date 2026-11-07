# Agents Instructions

- **Root_Folder**: /.
- **Agents_Folder**: .agents.
- **Agents_file**: AGENTS.md.
- **Project_Folder**: project.

## Product Overview

AstroBookings Client is an application that consumes the AstroBookings API.
It lets users browse rocket launches, book available seats, and review booking
status and history. It is implemented as a web application with React, Vite,
and TypeScript.

The API is fictional and intended for training and architecture practice.

## Development Workflow

Keep implementation decisions aligned with `project/briefing.md`. Use the
selected React + Vite + TypeScript stack, with TanStack Query for API data,
React Router for navigation, and Tailwind CSS for styling.

```bash
# Install dependencies
npm install

# Build and run
npm run build
npm run dev

# Test
npm run test:unit
npm run test:e2e
```

Use the scripts defined in `package.json` when they are available. Run the
smallest relevant test command after each code change.

## Folder Structure

```text
.                         # Project root
|-- AGENTS.md             # Main instructions file for agents
|-- .agents/              # Agent files, prompts, and reusable skills
|   |-- agents/
|   |-- prompts/
|   `-- skills/
|-- .vscode/              # VS Code workspace configuration
|-- project/              # Project context and planning documents
|   `-- briefing.md
|-- src/                  # React application source code
|   |-- api/              # API client and request helpers
|   |-- components/       # Shared UI components
|   |-- features/         # Launches, bookings, and customer features
|   |-- pages/            # Route-level page components
|   `-- types/            # API and domain types
|-- tests/                # Automated tests
|-- README.md             # Human-oriented documentation
`-- astrobookings-cli.briefing.md
```

## Behavior And Collaboration

Write code and docs in English. Reply in the user's prompt language.
Do not invent missing requirements. Ask one focused question when blocked.
Do not revert user edits without approval. Keep edits minimal and scoped.
Run relevant tests after code changes and report assumptions and risks.
Use clear commit messages with proper prefixes.

## Environment

- **OS dev**: Windows.
- **Default branch**: main.
- **Repository**: amdelcar/programacion-inteligente-practica-final.
