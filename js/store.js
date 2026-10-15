// Game state (replaces the Vuex store). Persisted to localStorage via @alpinejs/persist.

const GAME_MODES = ['starwars', 'classic']; // 0 -> sw, 1 -> classic

// name[0] = StarWars name, name[1] = Classic name
const DEFAULT_PLAYERS = [
  { color: 'yellow', name: ['', 'Yellow'], score: 0, active: false, available_in: [1] },
  { color: 'pink', name: ['', 'Pink'], score: 0, active: false, available_in: [1] },
  { color: 'blue', name: ['', 'Blue'], score: 0, active: false, available_in: [1] },
  { color: 'black', name: ['Darth Vader', 'Black'], score: 0, active: false, available_in: [0, 1], end_music: 'empire' },
  { color: 'green', name: ['Yoda', 'Green'], score: 0, active: false, available_in: [0, 1], end_music: 'rebels' },
  { color: 'red', name: ['Luke Skywalker', 'Red'], score: 0, active: false, available_in: [0, 1], end_music: 'luke' },
  { color: 'orange', name: ['Boba Fett', ''], score: 0, active: false, available_in: [0], end_music: 'bounty' },
  { color: 'white', name: ['Stormtrooper', ''], score: 0, active: false, available_in: [0], end_music: 'empire' }
];

document.addEventListener('alpine:init', () => {
  Alpine.store('game', {
    debug_mode: false,

    // Possible states
    // "choosing_mode" -> Eligiendo modo de juego
    // "choosing_players" -> Eligiendo jugadores
    // "playing" -> Juego corriendo, partida normal
    // "ended" -> Juego terminado, mostrar vencedor, volver a jugar
    game_state: Alpine.$persist('choosing_mode').as('carcassonne_v2_game_state'),
    game_modes: GAME_MODES,
    current_game_mode: Alpine.$persist(-1).as('carcassonne_v2_game_mode'),
    // $persist serializes with JSON.stringify inside an effect, so nested
    // changes (player.score, player.active) are persisted too.
    players: Alpine.$persist(structuredClone(DEFAULT_PLAYERS)).as('carcassonne_v2_players'),

    // Getters

    get isStarWars() {
      return this.current_game_mode === 0;
    },

    get isClassic() {
      return this.current_game_mode === 1;
    },

    get availablePlayers() {
      return this.players.filter(p => p.available_in.includes(this.current_game_mode));
    },

    get activePlayers() {
      return this.availablePlayers.filter(p => p.active);
    },

    get playersScoreSum() {
      return this.availablePlayers.reduce((sum, p) => sum + p.score, 0);
    },

    get topScore() {
      return Math.max(...this.activePlayers.map(p => p.score));
    },

    get sortedActivePlayers() {
      return [...this.activePlayers].sort((a, b) => b.score - a.score);
    },

    // Helpers

    playerName(player) {
      return player.name[this.current_game_mode];
    },

    playerImg(player) {
      return `static/img/${this.current_game_mode}-${player.color}.png`;
    },

    // Mutations / actions

    setGameMode(mode) {
      this.current_game_mode = parseInt(mode, 10);
    },

    setGameState(state) {
      this.game_state = state;
    },

    activatePlayer(player, value) {
      player.active = value;
    },

    updatePlayerScore(player, value) {
      player.score = Math.max(0, player.score + parseInt(value, 10));
    },

    resetPlayerScore(player) {
      player.score = 0;
    },

    resetPlayersScore() {
      this.players.forEach(p => p.score = 0);
    },

    resetPlayersStatus() {
      this.players.forEach(p => p.active = false);
    },

    resetGame() {
      this.game_state = 'choosing_mode';
      this.current_game_mode = -1;
    },

    initializeGame() {
      this.game_state = 'choosing_mode';
      this.resetPlayersScore();
      this.resetPlayersStatus();
    }
  });
});
