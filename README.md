# Simple To-Do App

This is a beginner-friendly to-do list app built with plain HTML, CSS, and JavaScript.

## Did you do the setup correctly?
Yes — your process is exactly right for a first Codex project:
1. Make a blank GitHub repository.
2. Ask Codex to build something.
3. Run it locally and test.

## Features
- Add tasks
- Mark tasks as done
- Delete tasks
- Filter by All / Open / Done
- Clear completed tasks
- Automatically saves your list in your browser (localStorage)

## How to run it in Codex (like `npm run dev`)
From this folder:

```bash
npm run dev
```

Then open:
- `http://localhost:3000`

This app is static, so no build step is needed.

## Alternate way to run (without npm)
```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

## How to test quickly
1. Start the app (`npm run dev`).
2. Add 2-3 tasks.
3. Mark one as complete.
4. Switch filters (`All`, `Open`, `Done`).
5. Refresh the page and confirm tasks are still there.
6. Click **Clear completed**.

## Helpful things to know for future Codex projects
- Ask for **specific tech** if you want it (React, Next.js, Tailwind, etc.).
- Ask Codex to also add:
  - tests,
  - CI checks,
  - deployment config (for Vercel/Netlify),
  - prettier/eslint.
- If you want `npm run dev` + hot reload next time, ask for a Vite or Next.js setup explicitly.
