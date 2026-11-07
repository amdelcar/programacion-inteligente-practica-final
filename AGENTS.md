# Agents Instructions

- **Root_Folder**: /.
- **Agents_Folder**: .agents.
- **Agents_file**: AGENTS.md.
- **Project_Folder**: project.

## Product Overview

AstroBookings Client is an application that consumes the AstroBookings API.
It lets users browse rocket launches, book available seats, and review booking
status and history. The client may be implemented as a web application or a
terminal application.

The API is fictional and intended for training and architecture practice.

## Development Workflow

Keep the implementation language and framework aligned with the project
briefing and document the chosen stack in `project/briefing.md`.

```bash
# Install dependencies
# Use the package manager required by the selected stack.

# Build and run
# Use the commands documented by the selected stack.

# Test
# Run the relevant unit and end-to-end tests after code changes.
```

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
|-- src/                  # Application source code
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
