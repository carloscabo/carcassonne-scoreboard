<template>
  <div
    id="app-viewport"
    :class="['view-wrapper', 'view-playing', {'starwars':($store.state.current_game_mode === 0), 'classic':($store.state.current_game_mode === 1)}]"
  >
    <header class="main-header">
      <div class="wrapper">
        <button class="btn left cap-on-mobile" @click="goBack">
          ‹
          <span class="hide-on-mobile">Change&nbsp;</span>mode
        </button>
        <p class="screen-title right cap-on-mobile">
          <span class="hide-on-mobile">Select&nbsp;</span>players
          <small>( {{ activePlayers.length }} )</small>
        </p>
      </div>
    </header>

    <main class="main-main">
      <template v-if="$store.state.current_game_mode > -1">
        <ul class="player-list">
          <template v-for="(player, idx) in availablePlayers">
            <PlayerSelectRow v-bind:key="idx" v-bind:player="player"></PlayerSelectRow>
          </template>
        </ul>
      </template>
    </main>

    <footer class="main-footer">
      <div class="wrapper">
        <button class="btn" :disabled="activePlayers.length < 1" @click="uncheckAll">Deselect All</button>
        <button
          class="btn"
          :disabled="$store.state.current_game_mode < 0 || activePlayers.length < 2"
          @click="startGame"
        >Start game</button>
      </div>
    </footer>
  </div>
</template>

<script>
import PlayerSelectRow from "./player-select-row";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  prop: {},
  computed: {
    ...mapGetters(["availablePlayers", "activePlayers"]),
    current_game_mode: {
      get() {
        return this.$store.state.current_game_mode;
      },
      set(value) {
        this.$store.commit("SET_GAME_MODE", value);
      }
    }
  },
  watch: {},
  created: function() {
    // console.log(this.$store.getters.activePlayers);
  },
  methods: {
    goBack() {
      window.snd["click"].play();
      this.$store.commit("SET_GAME_STATE", "choosing_mode");
    },
    startGame() {
      this.$store.commit("SET_GAME_STATE", "playing");
      window.snd["click"].play();
    },
    uncheckAll() {
      window.snd["click"].play();
      this.$store.commit("RESET_PLAYERS_STATUS");
    }
  },
  components: {
    PlayerSelectRow
  }
};
</script>