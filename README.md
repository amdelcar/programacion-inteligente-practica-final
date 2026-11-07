# Programación Inteligente
Documentación para el curso de programación inteligente

Domina las nuevas primitivas de programación con IA para desarrollos más productivos y de calidad; 
Pasa del Vibe Coding a la Spec-Driven Development.

---

## Sample project : Astro-Bookings
API mínima en TypeScript y Express .

- **Ejemplo de proyecto**: [Astro-Bookings-Demo](https://github.com/Programacion-Inteligente/activity-bookings-express)

---

## Exercise project : Astro-Bookings-Client
Aplicación cliente para interactuar con la API de Astro-Bookings.
La implementación elegida para este repositorio es una aplicación web con
**React + Vite + TypeScript**.

- [Exercise project : Astro-Bookings-Client](./astrobookings-cli.briefing.md)
- [Project briefing and technology decision](./project/briefing.md)

La aplicación usará TanStack Query para la gestión de datos, React Router para
la navegación, Pico.css para los estilos base, Tailwind CSS para utilidades,
Vitest para pruebas unitarias y Playwright para pruebas end-to-end.

La primera entrega incluye el catálogo de lanzamientos, navegación entre las
secciones principales, estados de carga/error/vacío, una interfaz responsive
con tabla de lanzamientos y reserva de plazas.

La reserva valida la disponibilidad, crea la reserva mediante la API y muestra
su estado. El flujo usa el cliente de prueba
`test.customer@astrobookings.local` mientras no exista autenticación.

La sección **My bookings** consulta y muestra el historial de reservas del
cliente de prueba, incluyendo misión, plazas, estado y precio total.

### Desarrollo

```bash
npm install
npm run dev
```

La aplicación usa el proxy de Vite para consumir la API desplegada en
`http://localhost:3000`. Comprueba que `GET /health` responde antes de abrir
la aplicación.

La API local contiene datos de prueba para reservas: el cliente
`test.customer@astrobookings.local` y el lanzamiento activo `launch-1`.
Estos datos se reinician al reiniciar el backend.

```bash
npm run build
npm run test:unit
npm run test:e2e
```

### Project workspace

This repository includes the reusable agent workflows, prompts, and skills
under [`.agents/`](./.agents/), with project context in [`project/`](./project/)
and workspace discovery configured in [`.vscode/settings.json`](./.vscode/settings.json).
Read [`AGENTS.md`](./AGENTS.md) before making changes.

Por supuesto, puedes desarrollarlo con cualquier herramienta de IA que te guste.
- VSCode + GitHub Copilot
- Cursor
- ClaudeCode
- Antigravity
- etc.

---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Ai Code Academy en Español**: [AI code Academy](https://aicode.academy)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
