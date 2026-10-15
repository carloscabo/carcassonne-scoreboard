// Sounds (Howler.js). Paths are relative so the app works from any subfolder.

const snd = {
  // Common UI sounds
  click: new Howl({ src: ['static/snd/click.mp3'] }),

  // Coin sounds, indexed by game mode (0 -> sw, 1 -> classic)
  coin: [
    [
      new Howl({ src: ['static/snd/0-blaster-01.mp3'] }),
      new Howl({ src: ['static/snd/0-blaster-02.mp3'] }),
      new Howl({ src: ['static/snd/0-blaster-03.mp3'] })
    ],
    [
      new Howl({ src: ['static/snd/1-coin.mp3'] })
    ]
  ],

  winnerTune: null,

  playClick() {
    this.click.play();
  },

  playCoin(mode) {
    const coins = this.coin[mode];
    coins[Math.floor(Math.random() * coins.length)].play();
  },

  playVictory(winner, mode) {
    this.stopVictory();
    const src = mode === 0
      ? `static/snd/0-end-${winner.end_music}.mp3` // SW
      : 'static/snd/1-end.mp3'; // Classic
    this.winnerTune = new Howl({ src: [src] });
    this.winnerTune.play();
  },

  stopVictory() {
    if (this.winnerTune) {
      this.winnerTune.stop();
      this.winnerTune = null;
    }
  }
};

window.snd = snd;
