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


## Why you may not see files on GitHub yet
Codex created commits in your local working branch (`work`) inside this environment, but GitHub only shows commits that are pushed to your remote repository (usually the `main` branch).

Quick check commands:
```bash
git branch -vv
git remote -v
```

If `git remote -v` is empty, add your GitHub repo as `origin` first:
```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

Then publish your work:
```bash
# Option A: push your current branch and open a PR on GitHub
git push -u origin work

# Option B: if you want it directly on main
git checkout main
git merge work
git push -u origin main
```

After push, refresh GitHub and you will see the files/commits.

## Helpful things to know for future Codex projects
- Ask for **specific tech** if you want it (React, Next.js, Tailwind, etc.).
- Ask Codex to also add:
  - tests,
  - CI checks,
  - deployment config (for Vercel/Netlify),
  - prettier/eslint.
- If you want `npm run dev` + hot reload next time, ask for a Vite or Next.js setup explicitly.
