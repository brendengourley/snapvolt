/* eslint-disable */
import { app, BrowserWindow, BrowserView, Menu } from 'electron'
import VM from './ViewManager'
import template from './menus/menus'
/* eslint-enable */
const pkg = require('../../package.json')
const { productName } = pkg.build

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

const isDev = process.env.NODE_ENV === 'development'

let mainWindow = null

if (isDev) {
  // eslint-disable-next-line
  require('electron-debug')()
}

async function installDevTools() {
  try {
    // eslint-disable-next-line
    require('devtron').install()
    // eslint-disable-next-line
    require('vue-devtools').install()
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // useContentSize: true,
    width: 960,
    height: 640,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      webSecurity: false,
    },
    show: false,
  })
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  VM.updateBrowserWindow(mainWindow)

  if (isDev) {
    mainWindow.loadURL('http://localhost:9080')
  } else {
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    global.__static = require('path')
      .join(__dirname, '/static')
      .replace(/\\/g, '\\\\')
  }

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.setTitle(productName)
    mainWindow.show()
    mainWindow.focus()

    if (isDev || process.argv.indexOf('--debug') !== -1) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // VM.addView(60, 0, 60, 320, 'http://slack.com/signin')
}

app.on('ready', () => {
  app.setName(productName)
  createWindow()

  if (isDev) {
    installDevTools()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/
