<template>
  <li
    :class="['player-card', 'player-score', `player-${player.color}`, {'leader': (getTopScore === player.score && player.score > 0)}]"
    :id="'player-score-' + player.color"
  >
    <div class="player-content-wrapper">
      <!-- {{ player.color }} {{ player.score }} -->
      <div class="player-img">
        <img
          :src="`/static/img/${$store.state.current_game_mode}-${player.color}.png`"
          :alt="player.name[$store.state.current_game_mode]"
        />
      </div>

      <p class="player-name">{{ player.name[$store.state.current_game_mode] }}</p>

      <div class="score-control-wrapper">
        <div class="score-current">
          <p class="score-title">Score</p>
          <p class="score-value">{{ player.score }}</p>
        </div>

        <div class="score-control">
          <label :for="'aditional-player-score-'+player.color" class="score-title">Enter value</label>
          <div class="row">
            <button
              class="btn-score btn-substract"
              :disabled="player.score === 0 || player_aditional_score < 1"
              @click="playerScoreUpdate(-1*player_aditional_score)"
              title="Substract"
            ></button>
            <input
              class="additional-score"
              :name="'aditional-player-score-'+player.color"
              type="number"
              min="0"
              step="1"
              v-model="player_aditional_score"
              @keyup="validateInput"
            />
            <button
              class="btn-score btn-add"
              :disabled="player_aditional_score < 1"
              @click="playerScoreUpdate(player_aditional_score)"
              title="Add"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      player_aditional_score: 1
    };
  },
  props: ["player"],
  mounted: function() {
    // this.$root.$on("resetPlayerScore", this.resetPlayerScore);
  },
  computed: {
    ...mapGetters(["getTopScore"])
  },
  methods: {
    playerScoreUpdate: function(value) {
      const player = this.player;

      let rnd_idx = Math.floor(
        Math.random() *
          window.snd.coin[this.$store.state.current_game_mode].length
      );
      window.snd.coin[this.$store.state.current_game_mode][rnd_idx].play();

      this.$store.commit("UPDATE_PLAYER_SCORE", {
        value,
        player
      });
      this.player_aditional_score = 1;
    },
    validateInput: function(e) {
      if (e.keyCode === 13) {
        this.playerScoreUpdate(this.player_aditional_score);
      }
    },
    resetPlayerScore: function() {
      this.$store.commit("RESET_PLAYER_SCORE", this.player);
    }
  }
};
</script>