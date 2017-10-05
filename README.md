# Simply React
> My personal React boilerplate with React Hot Loader.

## Installing / Getting started

Just clone, install, and start!

```shell
git clone https://github.com/satiewaltz/simply-react
cd simply-react/
yarn install
yarn start
```

Open `localhost:8080` to the app.

## Developing

### Built With
- React
- React Hot Loader
- Jest
- Prettier
- Eslint
- Babel
- Webpack
- SCSS
- CSS Modules

### Setting up Dev

Just clone

```shell
git clone https://github.com/satiewaltz/simply-react
cd simply-react/
yarn install
```

### Building

Just run:

```shell
yarn build
```

## Licensing

MIT

    "moduleNameMapper": {
      "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/test/mocks/fileMock.js",
      "^.+\\.(css|scss)$": "<rootDir>/test/mocks/styleMock.js"
    }

"unmockedModulePathPatterns": [
  "<rootDir>/node_modules/react",
  "<rootDir>/node_modules/react-dom"
],
"testFileExtensions": [
  "jsx",
  "js"
],
"moduleFileExtensions": [
  "jsx",
  "js",
  "json",
  "es6"
],
"testPathDirs": [
  "<rootDir>/src/"
]
