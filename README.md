# AI Flash Card Generator

A lightweight web app that lets users describe a flash-card deck, choose card quantity, and use an OpenAI-compatible AI model to generate flash cards with a front/back format.

## Features

- Prompt-driven deck generation (e.g. "Introductory Polish Phrases")
- Adjustable card count (1-100)
- OpenAI-compatible API settings in the UI
- Virtual flash cards with click-to-flip interaction
- Deck navigation (previous/next) and shuffle

## Run locally

Because this is a static app, you can run it with any simple server:

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## Usage

1. Enter your deck topic.
2. Set the number of cards you want.
3. Add your API key and (optionally) customize base URL/model.
4. Click **Generate Flash Cards**.
5. Click a card to flip it and use previous/next to review.
