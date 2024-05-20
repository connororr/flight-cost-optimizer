# Flight-cost-optimizer

This project is an SPA that connects to a backend server, ([Flight-cost-optimizer-server](https://github.com/connororr/flight-cost-optimizer-server)),
to allow a user to do a flight search using the Amadeus API.
If the flight is a multi-city round trip flight where, apart from the beginning and end destinations, you arrive and depart from
the same location the results you will be shown will be the cheapest and shortest permutation of the input given. Ie.

NYC - MAD, MAD - LON, LON - PAR, PAR - SIN

will look through all permutations (of which there are 6 as you must depart from NYC and arrive in SIN), and find you the cheapest and shortest
flight.

This project was bootstrapped with [Create React App Configuration Override](https://github.com/dilanx/craco).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Deployment

Deployment to [exploria-test.xyz](exploria-test.xyz) happens automatically when merging to main. Ideally CI/CD is added
so tests are run automatically before releasing.

# End-to-end Tests

End-to-end tests are available via [Playwright](https://playwright.dev/). Curently they hit production
until we can get a stage environment to host these on. To run end-to-end tests via npm:

```
npm run e2e-tests
```
