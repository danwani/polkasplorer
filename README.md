# Polkasplorer

This is a fairly simplistic implementation of a Polkadot blockchain explorer.\
It has been built to match a fairly specific spec, and can be considered only a POC level implementation.\
To utilize this as a starting point for further development, the functionality should be refactored to abstract the various components, thereby making it more maintainable.  This is most relevant to the main App.tsx file, where the bulk of the functionality resides.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  As such any bloat introduced by this should be stripped out for any real production usage.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn server`

Runs the NodeJS server to serve this content (this includes basic auth).
