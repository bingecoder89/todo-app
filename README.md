# Todo App

A lightweight React todo application built with Tailwind CSS.

## Features

- Add new todos
- Edit existing todos
- Delete todos
- Search todos with debounced input
- Mark todos as completed
- Select/unselect all todos
- Show only completed todos
- Loading and action states for add/delete operations

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- ESLint

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local server URL shown in the terminal to view the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` — main application logic and UI
- `src/components/TodoItem.jsx` — todo list item component
- `src/index.css` — global styles and Tailwind imports
- `package.json` — dependencies and scripts
- `vite.config.js` — Vite configuration

## Notes

This app simulates asynchronous actions for adding and deleting todos using short timeout delays. It is a good starting point for extending with persistent storage or backend integration.
