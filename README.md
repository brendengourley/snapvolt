![SnapVolt](https://github.com/brendengourley/snapvolt/blob/master/src/renderer/assets/logo.svg)
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