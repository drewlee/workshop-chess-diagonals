import Chessboard from './chessboard.js';

document.addEventListener('DOMContentLoaded', async function ready() {
  const boardEl = document.getElementById('board');
  const clearHighlightsBtn = document.getElementById('clear-highlights-btn');

  function onClickTile(evt) {
    const clickedEl = evt.target;

    // Clicked on a board tile?
    if (clickedEl.matches('#board > div > div')) {
      Chessboard.highlight(clickedEl);
    } else {
      clearHighlights();
    }
  }

  function clearHighlights() {
    Chessboard.highlight();
  }

  Chessboard.draw(boardEl);

  boardEl.addEventListener('click', onClickTile, false);
  clearHighlightsBtn.addEventListener('click', clearHighlights, false);
});
