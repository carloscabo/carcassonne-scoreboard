// Viewport helpers (from the original app.js)

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) {
  document.body.classList.add('iOS-device');
}

// Real viewport height in mobile browsers -> --vh custom property
function calculateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.body.setAttribute('data-width', window.innerWidth);
  document.body.setAttribute('data-height', window.innerHeight);
}

// Used by score-control-block.css (.player-card[data-ratio="1:1"])
function calculatePlayerCardsAspectRatio() {
  const cards = document.getElementsByClassName('player-card');
  if (cards.length) {
    const first = cards[0];
    const ratio = Math.floor(first.offsetWidth / first.offsetHeight);
    Array.from(cards).forEach(el => el.setAttribute('data-ratio', `${ratio}:1`));
  }
}

calculateVh();
calculatePlayerCardsAspectRatio();

['orientationchange', 'resize'].forEach(evt => {
  window.addEventListener(evt, () => {
    calculateVh();
    calculatePlayerCardsAspectRatio();
  });
});
