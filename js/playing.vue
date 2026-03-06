<template>
  <div
    :class="['view-wrapper', 'view-choose-players', `players-${activePlayers.length}`, {'starwars':($store.state.current_game_mode === 0), 'classic':($store.state.current_game_mode === 1)}]"
  >
    <header class="main-header">
      <div class="wrapper">
        <p class="screen-title left cap-on-mobile">
          <span class="hide-on-mobile">Total&nbsp;</span>time
          <span id="current-playing-time"></span>
        </p>
        <button @click="startMiniTimer" id="mini-timer" class="btn right timer">Start timer</button>
      </div>
    </header>

    <main class="main-main">
      <ul class="player-list">
        <template v-for="(player, idx) in $store.getters.activePlayers">
          <PlayerScoreRow v-bind:key="idx" v-bind:player="player"></PlayerScoreRow>
        </template>
      </ul>
    </main>

    <footer class="main-footer">
      <div class="wrapper">
        <button class="btn" @click="finishGame">Finish game</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerScoreRow from "./player-score-row.vue";
import Timer from "easytimer.js";

function updateTotalTimer() {
  let el = document.getElementById("current-playing-time");
  if (el !== null) {
    el.innerHTML = window.total_timer
      .getTimeValues()
      .toString(["minutes", "seconds"]);
  }
}

function updateMiniTimer() {
  let el = document.getElementById("mini-timer");
  if (el !== null) {
    el.innerHTML = window.mini_timer
      .getTimeValues()
      .toString(["minutes", "seconds"]);
  }
}

export default {
  data() {
    return {};
  },
  prop: {},
  computed: {
    ...mapGetters(["activePlayers", "playersScoreSum"])
  },
  watch: {},
  created: function() {
    // Start timer
    if (typeof window.total_timer === "undefined") {
      window.total_timer = new Timer();
      window.total_timer.start();
      window.total_timer.addEventListener("secondsUpdated", updateTotalTimer);
    } else {
      window.total_timer.reset();
    }
  },
  methods: {
    finishGame() {
      window.snd["click"].play();
      var vm = this;
      this.$dialog
        .confirm("Please confirm to end the current game", {
          okText: "Finish game",
          cancelText: "Continue playing",
          animation: "none"
        })
        .then(dialog => {
          console.log("Timer");
          console.log(window.mini_timer);
          if (typeof window.mini_timer !== "undefined") {
            window.mini_timer.removeEventListener(
              "secondsUpdated",
              updateMiniTimer
            );
            window.mini_timer = undefined;
          }
          this.$store.commit("SET_GAME_STATE", "ended");
        })
        .catch(function() {
          // console.log("Clicked on cancel");
        });
    },
    startMiniTimer() {
      window.snd["click"].play();
      if (
        typeof window.mini_timer === "undefined" ||
        window.mini_timer === null
      ) {
        window.mini_timer = new Timer();
        window.mini_timer.start();
        window.mini_timer.addEventListener("secondsUpdated", updateMiniTimer);
      } else if (window.mini_timer.isRunning()) {
        window.mini_timer.stop();
        // window.mini_timer.removeEventListener(
        //   "secondsUpdated",
        //   updateMiniTimer
        // );
        document.getElementById("mini-timer").innerHTML = "Start timer";
      } else {
        window.mini_timer.reset();
      }
    }
  },
  components: {
    PlayerScoreRow
  }
};
</script>