# tv-dashboard

This is a tv dashboard that allows users to view TV shows from the tvmaze API in a simple easy to use way

## Architecture Choices

This application is designed and written in Vue, namely because that is the framework of choice of ABN AMRO.

The application is structured in a way that is as simple and component based as possible as this helps to leverage the power of VueJS.
This application uses Pinia to help to cache and reduce the number of API calls made.

Minimal boiler plate code has been used with only a couple of custom packages added to provide a ratings control and a search bar.

AI has not been used at all in producing this application

### Run locally for testing

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
