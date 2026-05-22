const TILE_MAX = 8;
const ACTIVE_CLASS_NAME = 'highlighted';

/** @type {[number, number][]} */
const steps = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1]
];

/** @type {HTMLDivElement | null} */
let activeEl = null;

/** @type {(tileEl: HTMLDivElement) => [number, number]} */
function getPosition(tileEl) {
  const attrs = tileEl.id.split('_');
  const row = Number(attrs[1]);
  const col = Number(attrs[3]);

  return [row, col];
}

/** @type {(row: number, col: number) => string} */
function getID(row, col) {
  return `row_${row}_col_${col}`;
}

/** @type {(position: [number, number], step: [number, number]) => void} */
function traverse(position, step) {
  const [row, col] = position;

  if (row >= 0 && row < TILE_MAX && col >= 0 && col < TILE_MAX) {
    const id = getID(row, col);

    document.getElementById(id).classList.toggle(ACTIVE_CLASS_NAME);
    traverse([row + step[0], col + step[1]], step);
  }
}

/** @type {(boardEl: HTMLDivElement) => void} */
function draw(boardEl) {
  const frag = document.createDocumentFragment();

  for (let row = 0; row < TILE_MAX; row++) {
    const rowEl = document.createElement('div');

    for (let col = 0; col < TILE_MAX; col++) {
      const colEl = document.createElement('div');
      colEl.id = getID(row, col);
      rowEl.appendChild(colEl);
    }

    frag.appendChild(rowEl);
  }

  boardEl.appendChild(frag);
}

/** @type {(tileEl: HTMLDivElement | undefined) => void} */
function highlight(tileEl) {
  // Clear previous highlights
  if (activeEl) {
    const [row, col] = getPosition(activeEl);
    activeEl.classList.remove(ACTIVE_CLASS_NAME);

    for (const step of steps) {
      traverse([row + step[0], col + step[1]], step);
    }
  }

  if (!tileEl) {
    activeEl = null;
    return;
  }

  const [row, col] = getPosition(tileEl);
  activeEl = tileEl;
  tileEl.classList.add(ACTIVE_CLASS_NAME);

  // Highlight tiles along diagonals
  for (const step of steps) {
    traverse([row + step[0], col + step[1]], step);
  }
}

export default {
  draw,
  highlight
};
