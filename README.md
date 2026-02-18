# TodoApp

A simple, modern cross-platform Todo / Notes app built with Expo Router and React Native + TypeScript.

## Preview

Simple note creation, list view, and detail pages with optional authentication (login / sign up). Works on iOS, Android and web via Expo.

## Features

- Create, view and delete notes
- Note detail view with full content
- Basic auth screens: Login and Sign Up
- Theming with shared design tokens
- Built with `expo` and `expo-router` for file-based routing

## Tech stack

- Expo (React Native)
- Expo Router (app directory routing)
- TypeScript
- React Context for state (`NotesContext`)

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- Yarn or npm
- Expo CLI (optional, you can use the `npx expo` commands)

### Install & run

```bash
# install deps
npm install

# start Metro / Expo DevTools
npm run start

# open on Android, iOS or web
npm run android   # --android
npm run ios       # --ios
npm run web       # --web
```

## Project scripts

- `start` — run the Expo dev server
- `android` / `ios` / `web` — start and open the respective platform
- `reset-project` — local helper script to reset the project (see `scripts/reset-project.js`)
- `lint` — run `expo lint`

## Project structure

- `app/` — main app routes and screens
  - `(home)/` — home routes: `index.tsx`, `create-note.tsx`, `note-detail.tsx`, `NotesContext.tsx`
  - `auth/` — auth routes: `login.tsx`, `signUp.tsx`
- `src/components/` — shared UI components (`Button.tsx`, `NoteCard.tsx`, `TextInput.tsx`)
- `constants/` and `src/theme/` — theme tokens and styles
- `assets/` — images and static assets

## Notes on development

- The app uses file-based routing from `expo-router` — adding files under `app/` creates routes automatically.
- `NotesContext` holds the notes state across the app; authentication screens are simple placeholders that can be wired to any auth provider.
- Feel free to extend the data layer (e.g., add persistence with `AsyncStorage` or a backend).

## Contributing

Contributions are welcome. Open an issue or a PR with a clear description of the change.

## License

This project is provided as-is. Add a license file if you plan to publish or share it broadly.

---

If you'd like, I can also:

- Add a `CONTRIBUTING.md` guide
- Wire up a local storage persistence example
- Add screenshots or a demo GIF to the README
