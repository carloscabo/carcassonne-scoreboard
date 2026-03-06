# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start         # Dev server at http://localhost:1234
npm run build     # Production build
npm run deploy    # Build + deploy to GitHub Pages
```

No test or lint tooling is configured.

## Tech Stack

- **Vue 2** + **Vuex 3** (Options API, Single File Components)
- **Parcel** (bundler, zero-config)
- **SCSS** for styling
- **vuex-persistedstate** — game state auto-persisted to localStorage
- **Howler.js** — audio; **EasyTimer.js** — timers

## Architecture

### State Machine

The app is a linear state machine managed in Vuex ([js/store.js](js/store.js)). The `game_state` field controls which screen is shown:

1. `choosing_mode` → `choosing_players` → `playing` → `ended`

`app.vue` routes between screens based on `game_state`.

### Player Data

8 players are defined statically in `store.js`. Each has:
- `color`, `name[2]` (index 0 = StarWars name, index 1 = Classic name)
- `score`, `active` (selected for this game), `available_in[]` (which game modes)
- Optional `end_music` (StarWars character-specific victory track)

Classic mode uses 6 players; StarWars mode uses all 8.

### Component Tree

```
App.vue
├── ChoosingMode.vue       — pick Classic or StarWars
├── ChoosingPlayers.vue    — toggle which players participate
│   └── PlayerSelectRow.vue
├── Playing.vue            — main scoring screen + timer
│   └── PlayerScoreRow.vue — score +/- controls per player
└── Ended.vue              — winner display + rankings
```

### Styling

SCSS is split into modules under [css/src/](css/src/) and imported via [css/app.scss](css/app.scss). Theme-specific styles are in `classic.scss` and `starwars.scss`. Responsive breakpoints and color palette are in `vars.scss`.

### Assets

- `static/img/` — player character PNGs, backgrounds, SVG badges
- `static/snd/` — coin click MP3s and character end-music MP3s
