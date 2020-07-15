![SnapVolt](https://github.com/brendengourley/snapvolt/blob/master/src/renderer/assets/logo.svg)

### What is Snapvolt?

Snapvolt is an application built with Electron and Vue.js that allows users to connect other applications in one place. However, eye strain is a real issue for those of us who spend their lives sitting in front of the computer. With that in mind, Snapvolt was built to allow for custom css styles to be created to allow for any possible look for the supported app!

### Getting Started

```bash
# Install dependencies
npm install

# Run in `DEV` mode
npm run dev

# Build installer for this app
npm run build
```

### Project structure

`src/main` contains electron main script.

`src/renderer` contains vue-js application.


### Possible Build issues (Windows)
> MAKE SURE TO RUN NPM RUN BUILD BEFORE PROCEEDING HERE

The install script can sometimes go a little haywire and miss some packages.
Install these before running the build script

```bash
npm install electron-builder

npm install webpack

npm install node-pre-gyp

# Now run build
npm run build
```
