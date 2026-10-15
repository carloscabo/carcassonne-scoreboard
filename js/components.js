// Alpine components for each screen (replace the Vue SFCs)

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = String(Math.floor(total / 60) % 60).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

document.addEventListener('alpine:init', () => {

  // Confirmation dialog (replaces vuejs-dialog). Usage: $store.dialog.confirm(msg, {okText, cancelText}).then(ok => ...)
  Alpine.store('dialog', {
    open: false,
    message: '',
    okText: 'OK',
    cancelText: 'Cancel',
    _resolve: null,

    confirm(message, { okText = 'OK', cancelText = 'Cancel' } = {}) {
      this.message = message;
      this.okText = okText;
      this.cancelText = cancelText;
      this.open = true;
      return new Promise(resolve => this._resolve = resolve);
    },

    answer(ok) {
      this.open = false;
      if (this._resolve) this._resolve(ok);
      this._resolve = null;
    }
  });

  // choosing_mode
  Alpine.data('modeSelect', () => ({
    selectMode(mode) {
      this.$store.game.setGameMode(mode);
      snd.playClick();
    },

    choosePlayers() {
      snd.playClick();
      this.$store.game.setGameState('choosing_players');
    }
  }));

  // choosing_players
  Alpine.data('playersSelect', () => ({
    goBack() {
      snd.playClick();
      this.$store.game.setGameState('choosing_mode');
    },

    startGame() {
      this.$store.game.setGameState('playing');
      snd.playClick();
    },

    uncheckAll() {
      snd.playClick();
      this.$store.game.resetPlayersStatus();
    },

    togglePlayer(player, value) {
      snd.playClick();
      this.$store.game.activatePlayer(player, value);
    }
  }));

  // playing
  Alpine.data('playingView', () => ({
    totalTime: '',
    miniTime: null, // null -> mini timer stopped
    _totalStart: 0,
    _totalInterval: null,
    _miniStart: 0,
    _miniInterval: null,

    init() {
      this._totalStart = Date.now();
      this._totalInterval = setInterval(() => {
        this.totalTime = formatTime(Date.now() - this._totalStart);
      }, 1000);
      this.$nextTick(() => calculatePlayerCardsAspectRatio());
    },

    destroy() {
      clearInterval(this._totalInterval);
      this.stopMiniTimer();
    },

    get miniTimerLabel() {
      return this.miniTime === null ? 'Start timer' : this.miniTime;
    },

    toggleMiniTimer() {
      snd.playClick();
      if (this._miniInterval) {
        this.stopMiniTimer();
      } else {
        this._miniStart = Date.now();
        this.miniTime = formatTime(0);
        this._miniInterval = setInterval(() => {
          this.miniTime = formatTime(Date.now() - this._miniStart);
        }, 1000);
      }
    },

    stopMiniTimer() {
      clearInterval(this._miniInterval);
      this._miniInterval = null;
      this.miniTime = null;
    },

    finishGame() {
      snd.playClick();
      this.$store.dialog
        .confirm('Please confirm to end the current game', {
          okText: 'Finish game',
          cancelText: 'Continue playing'
        })
        .then(ok => {
          if (!ok) return;
          this.stopMiniTimer();
          this.$store.game.setGameState('ended');
        });
    }
  }));

  // One player card inside "playing"
  Alpine.data('scoreRow', (player) => ({
    player,
    additional: 1,

    get isLeader() {
      return this.$store.game.topScore === this.player.score && this.player.score > 0;
    },

    update(value) {
      snd.playCoin(this.$store.game.current_game_mode);
      this.$store.game.updatePlayerScore(this.player, value);
      this.additional = 1;
    },

    get isValidAdditional() {
      return Number.isInteger(this.additional) && this.additional >= 1;
    },

    add() {
      if (this.isValidAdditional) this.update(this.additional);
    },

    subtract() {
      if (this.isValidAdditional) this.update(-1 * this.additional);
    }
  }));

  // ended
  Alpine.data('endedView', () => ({
    init() {
      const game = this.$store.game;
      const first = game.sortedActivePlayers[0];
      if (first) snd.playVictory(first, game.current_game_mode);
    },

    destroy() {
      snd.stopVictory();
    },

    startNewGame() {
      snd.stopVictory();
      snd.playClick();
      this.$store.game.resetPlayersScore();
      this.$store.game.setGameState('choosing_players');
    }
  }));
});
