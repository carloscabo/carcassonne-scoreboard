<template>
  <div
    id="app-viewport"
    :class="['view-wrapper', 'view-choose-game-mode', {'starwars':($store.state.current_game_mode === 0), 'classic':($store.state.current_game_mode === 1)}]"
  >
    <header class="main-header">
      <div class="wrapper">
        <!--button class="btn left">?</button-->
        <p class="screen-title">Select game mode</p>
      </div>
    </header>

    <main class="main-main">
      <label
        :class="{'select-game':true, 'starwars':true, 'is-selected':($store.state.current_game_mode === 0), 'is-disabled':($store.state.current_game_mode !== 0)}"
        title="Carcassonne Starwars"
      >
        <input
          name="game-style"
          value="0"
          type="radio"
          id="rb-starwars"
          v-model="current_game_mode"
        />
      </label>
      <label
        :class="{'select-game':true, 'classic':true, 'is-selected':($store.state.current_game_mode === 1), 'is-disabled':($store.state.current_game_mode !== 1)}"
        title="Carcassonne Classic"
      >
        <input name="game-style" value="1" type="radio" id="rb-classic" v-model="current_game_mode" />
      </label>
      <!-- Vuex store value: {{ $store.state.current_game_mode }} -->
      <!-- Computed property value: {{ current_game_mode }} -->
    </main>

    <footer class="main-footer">
      <div class="wrapper">
        <button
          class="btn"
          :disabled="$store.state.current_game_mode < 0"
          @click="choosePlayers"
        >Select players</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Howl, Howler } from "howler";

// window.snd = new Howl({
//   src: ["./sounds/start-01.mp3"]
// });
// window.blaster.once("load", function() {
//   console.log("Sound play");
//   blaster.play();
// });

export default {
  data() {
    return {};
  },
  prop: {},
  computed: {
    current_game_mode: {
      get() {
        return this.$store.state.current_game_mode;
      },
      set(value) {
        this.$store.commit("SET_GAME_MODE", value);
        window.snd["click"].play();
      }
    }
  },
  watch: {},
  created: function() {
    // console.log(this.$store.getters.activePlayers);
  },
  methods: {
    choosePlayers() {
      window.snd["click"].play();
      this.$store.commit("SET_GAME_STATE", "choosing_players");
    }
  },
  components: {}
};
</script>