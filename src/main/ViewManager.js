/*eslint-disable*/
import { BrowserView } from 'electron'
const fs = require('fs')

class ViewManager {
  constructor() {
    this.mainWindow = null
    this.views = []
    this.currentViewId = null
  }

  updateBrowserWindow(browserWindow) {
    this.mainWindow = browserWindow
  }

  addView(x, y, widthOffset, heightOffset, url) {
    const view = new BrowserView()
    this.mainWindow.setBrowserView(view)
    const mainBounds = this.mainWindow.getBounds()
    view.setBounds({ x: x, y: y, width: mainBounds.width - widthOffset, height: mainBounds.height - heightOffset })
    view.setAutoResize({ width: true, height: true })
    view.webContents.loadURL(url)
    this.currentViewId = view.id
    this.views.push(view)
  }

  addViewFromRemote(x, y, widthOffset, heightOffset, url, snapName) {
    const remote = require('electron').remote
    const { BrowserView } = remote
    const view = new BrowserView()
    this.mainWindow = remote.getCurrentWindow()
    this.mainWindow.setBrowserView(view)
    const mainBounds = this.mainWindow.getBounds()
    view.setBounds({ x: x, y: y, width: mainBounds.width - widthOffset, height: mainBounds.height - heightOffset })
    view.setAutoResize({ width: true, height: true })
    view.webContents.loadURL(url)
    view.webContents.on('dom-ready', () => {
      fs.readFile(process.env.PWD+"/static/user_styles/css/" + snapName + "_dark.css", "utf-8", (error, data) => {
        if (!error) {
          let formattedData = data.replace(/\s{2,10}/g, ' ').trim()
          view.webContents.insertCSS(formattedData)
        }
      })
      if(process.env.NODE_ENV === 'development')view.webContents.openDevTools()
    })
    this.currentViewId = view.id
    this.views = this.mainWindow.getBrowserViews()
  }

  setActiveView(id, url = null, slug = null) {
    const remote = require('electron').remote
    const { BrowserView } = remote
    if (id !== null) {
      let viewToUse = null
      for (const view of this.views) {
        if (view.id === id) {
          viewToUse = view
        }
      }
      if(viewToUse !== null){
        this.mainWindow.setBrowserView(viewToUse)
        this.currentViewId = id
      } else {
        if (url !== null) this.addViewFromRemote(60, 0, 60, 20, url, slug)
      }
    } else {
      const currentView = BrowserView.fromId(this.currentViewId)
      if (currentView !== null) {
        this.mainWindow.removeBrowserView(currentView)
        this.currentViewId = null
      }
    }
  }
}

const VM = new ViewManager()

export default VM
