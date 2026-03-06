# Carcassonne Scoreboard (https://carcassonne.netlify.app/)

Small web application designed to manage the player's scores in Carcassonne and Carcassonne StarWars plays.

Specially designed to be used in mobile devices and tablets. It works on desktop computers also but it is not so fancy.

![](https://repository-images.githubusercontent.com/225129639/ab351100-3704-11ea-992c-7ea7cecf24d5)

## Installation

```sh
npm install
```

## Run local server

Available in `http://localhost:1234`

```sh
parcel index.html
```

## Build production

```sh
parcel build index.html
```

## Update app

App is stored in Git Hub pages. To deply 

```sh
npm run build
npm run deploy
```

## Release History

* 0.0.1
  * First release

## Meta

Carlos Cabo – [@putuko](https://twitter.com/putuko) – carloscabo AT gmail DOT com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/carloscabo/carcassonne-scoreboard](https://github.com/carloscabo/carcassonne-scoreboard)

## Contributing

1. Fork it (https://github.com/carloscabo/carcassonne-scoreboard)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki

## TO-DO
- Review Firefox / Opera mobile
- Review in iPhone 7
- UX / UI
  - Show leader player in other way than blinking (?)
  - Add control to enable / disable sound
- Preload final music
- Empty score input on focus in? (restore 1 on focus out?)
