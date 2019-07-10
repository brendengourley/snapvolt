/*eslint-disable*/
import { BrowserView } from 'electron'
const fs = require('fs')
var id = 1;

class View {
  constructor(parent, src, slug) {
    this.id = id
    id ++
    this.parent = parent
    this.className = 'webview'
    this.src = src
    this.slug = slug
    this.element = null
  }

  initWebView() {
    const webview = document.createElement('webview')
    webview.src = this.src
    webview.className = this.className
    webview.addEventListener('dom-ready', () => {
      fs.readFile(process.env.PWD+"/static/user_styles/css/" + this.slug + "_dark.css", "utf-8", (error, data) => {
        if (!error) {
          let formattedData = data.replace(/\s{2,10}/g, ' ').trim()
          webview.insertCSS(formattedData)
        }
      })
    })
    this.element = webview
    this.parent.appendChild(webview)
  }
}

class ViewManager {
  constructor() {
    this.mainWindow = null
    this.views = []
    this.currentViewId = null
    this.parent = null
  }

  setParent(parent) {
    this.parent = parent
  }

  updateBrowserWindow(browserWindow) {
    this.mainWindow = browserWindow
  }

  addWebView(parent, url, slug) {
    const view = new View(parent, url, slug)
    view.initWebView()
    this.views.push(view)
  }

  addWebViews(snaps) {
    for (let snap of snaps) {
      this.addWebView(this.parent, snap.url, snap.slug)
    }
  }

  setActiveView(id) {
    for (let view of this.views) {
      if (view.id === id) {
        view.element.style.display = 'flex'
      } else {
        if (view.element.style.display === 'flex') view.element.style.display = "none"
      }
    }
  }

}

const VM = new ViewManager()

export default VM
