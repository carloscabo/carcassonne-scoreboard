# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

No build step. Serve the folder with any static HTTP server:

```bash
python -m http.server 8000   # or: npx serve .
```

No test or lint tooling is configured. Deploy = copy the folder to a static host.

## Tech Stack

- **Alpine.js 3** + **@alpinejs/persist** (vendored in `vendor/`, loaded with `defer`, Alpine core last)
- Plain **CSS with native nesting** (modern browsers only)
- **Howler.js** — audio (vendored)
- The previous Vue 2 + Vuex + Parcel version is tagged `v1-vue`.

## Architecture

### State Machine

The app is a linear state machine in `Alpine.store('game')` ([js/store.js](js/store.js)). The `game_state` field controls which screen is shown:

1. `choosing_mode` → `choosing_players` → `playing` → `ended`

[index.html](index.html) contains the 4 screens, each inside `<template x-if="$store.game.game_state === '...'">`, so screens mount/unmount and their `init()`/`destroy()` run like Vue lifecycle hooks.

`game_state`, `current_game_mode` and `players` are persisted to localStorage with `$persist` (keys `carcassonne_v2_*`).

### Player Data

8 players are defined statically in `DEFAULT_PLAYERS` in `store.js`. Each has:
- `color`, `name[2]` (index 0 = StarWars name, index 1 = Classic name)
- `score`, `active` (selected for this game), `available_in[]` (which game modes)
- Optional `end_music` (StarWars character-specific victory track)

Classic mode uses 6 players; StarWars mode uses 5.

### JS files

- [js/store.js](js/store.js) — game store (state, getters, actions)
- [js/components.js](js/components.js) — `Alpine.data` per screen (`modeSelect`, `playersSelect`, `playingView`, `scoreRow`, `endedView`) + `Alpine.store('dialog')` (native `<dialog>` confirm)
- [js/sounds.js](js/sounds.js) — Howler sounds (`snd` global)
- [js/viewport.js](js/viewport.js) — `--vh` fix, iOS class, `.player-card[data-ratio]`

### Alpine gotchas

- `:class` accepts a string **or** an object, never Vue's mixed array `['a', {b: x}]` (Alpine joins arrays → `[object Object]`). Use a static `class="a"` plus `:class="{ b: x }"`; dynamic names via computed keys: `{ ['player-' + p.color]: true }`.
- `x-if` / `x-for` templates must have exactly one root element.

### Styling

One CSS file per module in [css/](css/), linked in order from `index.html` (no `@import`). `classic.css` must load after `starwars.css`. Colors/sizes are custom properties in `vars.css`; breakpoints are literal in media queries (mobile ≤767px, tablet ≥768px, desktop ≥1024px).

### Assets

All paths are **relative** (`static/...` in HTML/JS, `../static/...` in CSS) so the app works from any subfolder.

- `static/img/` — player character PNGs, backgrounds, SVG badges
- `static/snd/` — coin click MP3s and character end-music MP3s
