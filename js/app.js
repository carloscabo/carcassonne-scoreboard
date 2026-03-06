import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import store from './store';
import app from './app.vue';
import { Howl, Howler } from "howler";

import '../css/app.scss';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.use(VuejsDialog);

window.snd = {};

let vm = new Vue({
  el: "#main-app",
  store,
  render: createElement => createElement(app),
  created: function () {
    // `this` points to the vm instance
    // console.log('a is: ' + this.a)
    console.log('App created!');

    // Common UI sounds
    ['click'].forEach(item => {
      window.snd[item] = new Howl({
        src: [`./static/snd/${item}.mp3`]
      });
    });

    // Coin sounds
    window.snd.coin = [
      [
        new Howl({ src: ['./static/snd/0-blaster-01.mp3'] }),
        new Howl({ src: ['./static/snd/0-blaster-02.mp3'] }),
        new Howl({ src: ['./static/snd/0-blaster-03.mp3'] })
      ],
      [
        new Howl({ src: ['./static/snd/1-coin.mp3'] })
      ]
    ];
  }
});

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) {
  document.getElementsByTagName("body")[0].setAttribute("class", "iOS-device");
}

function calculateVh() {
  console.log('Recalculate --vh');
  let vh = window.innerHeight * 0.01;
  let $body = document.getElementsByTagName("body")[0];
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  $body.setAttribute('data-width', window.innerWidth);
  $body.setAttribute('data-height', window.innerHeight);
}
calculateVh();

function calculatePlayerCardsAspectRatio() {
  const $cards = document.getElementsByClassName("player-card");
  if ($cards.length) {
    const $first = $cards[0];
    const ratio = Math.floor($first.offsetWidth / $first.offsetHeight);
    console.log(`Card's ratio: ${ratio}`);
    Array.from($cards).forEach(el => {
      el.setAttribute('data-ratio', `${ratio}:1`);
    });
  }
}
calculatePlayerCardsAspectRatio();

window.addEventListener("orientationchange", function () {
  calculateVh();
  calculatePlayerCardsAspectRatio();
}, false);
window.addEventListener("resize", function () {
  calculateVh();
  calculatePlayerCardsAspectRatio();
}, false);

// $(document).ready(function () {
//   // La magia aquí
//   console.log('Ready!');
// });

