/*eslint-disable*/
import { BrowserView } from 'electron'


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

  addViewFromRemote(x, y, widthOffset, heightOffset, url) {
    const remote = require('electron').remote
    const { BrowserView } = remote
    const view = new BrowserView()
    this.mainWindow = remote.getCurrentWindow()
    this.mainWindow.setBrowserView(view)
    const mainBounds = this.mainWindow.getBounds()
    view.setBounds({ x: x, y: y, width: mainBounds.width - widthOffset, height: mainBounds.height - heightOffset })
    view.setAutoResize({ width: true, height: true })
    view.webContents.loadURL(url)
    this.currentViewId = view.id
    this.views.push(view)
  }

  setActiveView(id) {
    const remote = require('electron').remote
    const { BrowserView } = remote
    if (id !== null) {
      const viewToUse = BrowserView.fromId(id)
      this.mainWindow.setBrowserView(viewToUse)
      this.currentViewId = id
    } else {
      const currentView = BrowserView.fromId(this.currentViewId)
      this.mainWindow.removeBrowserView(currentView)
      this.currentViewId = null
    }
  }
}

const VM = new ViewManager()

export default VM
