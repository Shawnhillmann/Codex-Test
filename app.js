const form = document.getElementById('generator-form');
const deckTopicInput = document.getElementById('deck-topic');
const cardCountInput = document.getElementById('card-count');
const temperatureInput = document.getElementById('temperature');
const apiBaseUrlInput = document.getElementById('api-base-url');
const apiKeyInput = document.getElementById('api-key');
const modelInput = document.getElementById('model');
const statusEl = document.getElementById('status');

const flashCardBtn = document.getElementById('flash-card');
const frontTextEl = document.getElementById('card-front-text');
const backTextEl = document.getElementById('card-back-text');
const positionEl = document.getElementById('card-position');
const prevBtn = document.getElementById('prev-card');
const nextBtn = document.getElementById('next-card');
const shuffleBtn = document.getElementById('shuffle-cards');

let cards = [];
let currentIndex = 0;

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#fb7185' : '#facc15';
}

function renderCard() {
  if (!cards.length) {
    frontTextEl.textContent = 'No card generated yet.';
    backTextEl.textContent = 'Generate a deck to get started.';
    positionEl.textContent = 'Card 0 / 0';
    flashCardBtn.classList.remove('flipped');
    return;
  }

  const card = cards[currentIndex];
  frontTextEl.textContent = card.front;
  backTextEl.textContent = card.back;
  positionEl.textContent = `Card ${currentIndex + 1} / ${cards.length}`;
  flashCardBtn.classList.remove('flipped');
}

function moveCard(offset) {
  if (!cards.length) return;
  currentIndex = (currentIndex + offset + cards.length) % cards.length;
  renderCard();
}

function shuffleDeck() {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  currentIndex = 0;
  renderCard();
}

function parseFlashCardResponse(rawText, requestedCount) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    const jsonBlockMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/i);
    if (!jsonBlockMatch) {
      throw new Error('Model response was not valid JSON.');
    }
    parsed = JSON.parse(jsonBlockMatch[1]);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Model did not return an array of cards.');
  }

  const normalized = parsed
    .map((item) => ({
      front: String(item.front ?? '').trim(),
      back: String(item.back ?? '').trim(),
    }))
    .filter((item) => item.front && item.back)
    .slice(0, requestedCount);

  if (!normalized.length) {
    throw new Error('No valid flash cards were returned.');
  }

  return normalized;
}

async function generateFlashCards({ topic, count, temperature, apiBaseUrl, apiKey, model }) {
  const system = `You create concise educational flash cards. Return only JSON.\nFormat: an array of objects with keys \"front\" and \"back\".\nNo markdown, no extra keys, no prose.`;
  const user = `Create ${count} flash cards for this deck topic: ${topic}.\nFront should contain the prompt phrase or concept.\nBack should contain a short, correct answer or translation.`;

  const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const output = payload?.choices?.[0]?.message?.content;

  if (!output) {
    throw new Error('No completion text returned by the AI model.');
  }

  return parseFlashCardResponse(output, count);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const topic = deckTopicInput.value.trim();
  const count = Number(cardCountInput.value);
  const temperature = Number(temperatureInput.value);
  const apiBaseUrl = apiBaseUrlInput.value.trim();
  const apiKey = apiKeyInput.value.trim();
  const model = modelInput.value.trim();

  if (!topic) {
    setStatus('Please provide a deck topic.', true);
    return;
  }

  if (!apiKey) {
    setStatus('Please provide an API key to generate cards.', true);
    return;
  }

  if (!count || count < 1 || count > 100) {
    setStatus('Card count must be between 1 and 100.', true);
    return;
  }

  setStatus('Generating cards...');

  try {
    cards = await generateFlashCards({ topic, count, temperature, apiBaseUrl, apiKey, model });
    currentIndex = 0;
    renderCard();
    setStatus(`Generated ${cards.length} flash cards successfully.`);
  } catch (error) {
    setStatus(error.message || 'Unable to generate flash cards.', true);
  }
});

flashCardBtn.addEventListener('click', () => {
  if (!cards.length) return;
  flashCardBtn.classList.toggle('flipped');
});

prevBtn.addEventListener('click', () => moveCard(-1));
nextBtn.addEventListener('click', () => moveCard(1));
shuffleBtn.addEventListener('click', () => {
  if (!cards.length) return;
  shuffleDeck();
  setStatus('Deck shuffled.');
});

renderCard();
