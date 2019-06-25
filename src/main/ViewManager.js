import { BrowserView } from 'electron'

class ViewManager {
  constructor(browserWindow) {
    this.mainWindow = browserWindow
    this.views = []
    this.IdLen = 6
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
}

export default ViewManager
