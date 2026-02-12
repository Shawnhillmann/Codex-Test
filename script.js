const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

const STORAGE_KEY = 'codex-simple-todos';
let filter = 'all';
let todos = loadTodos();

render();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  input.value = '';
  persistAndRender();
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  persistAndRender();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    render();
  });
});

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  render();
}

function visibleTodos() {
  if (filter === 'open') return todos.filter((todo) => !todo.completed);
  if (filter === 'done') return todos.filter((todo) => todo.completed);
  return todos;
}

function render() {
  list.innerHTML = '';

  const shown = visibleTodos();

  if (shown.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'todo-item';
    empty.textContent = 'No tasks here yet. Add your first one above!';
    list.appendChild(empty);
  } else {
    shown.forEach((todo) => {
      const item = document.createElement('li');
      item.className = 'todo-item';

      const left = document.createElement('div');
      left.className = 'todo-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.setAttribute('aria-label', `Mark ${todo.text} as complete`);
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        persistAndRender();
      });

      const text = document.createElement('span');
      text.className = `todo-text${todo.completed ? ' done' : ''}`;
      text.textContent = todo.text;

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'remove-btn';
      removeButton.textContent = 'Delete';
      removeButton.addEventListener('click', () => {
        todos = todos.filter((candidate) => candidate.id !== todo.id);
        persistAndRender();
      });

      left.append(checkbox, text);
      item.append(left, removeButton);
      list.appendChild(item);
    });
  }

  const openCount = todos.filter((todo) => !todo.completed).length;
  taskCount.textContent = `${openCount} task${openCount === 1 ? '' : 's'} remaining`;
}
