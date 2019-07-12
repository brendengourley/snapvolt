/*eslint-disable*/
import { BrowserView } from 'electron'
// import viewEmitter from 'EventManager'
const fs = require('fs')
var id = 1;

class View {
  constructor(parent, src, slug, useDarkMode) {
    this.id = id
    id ++
    this.parent = parent
    this.className = 'webview'
    this.src = src
    this.slug = slug
    this.element = null
    this.useDarkMode = useDarkMode
  }

  initWebView() {
    const webview = document.createElement('webview')
    webview.src = this.src
    webview.className = this.className
    if (this.useDarkMode) {
      webview.addEventListener('dom-ready', () => {
        fs.readFile(process.env.PWD+"/static/user_styles/css/" + this.slug + "_dark.css", "utf-8", (error, data) => {
          if (!error) {
            let formattedData = data.replace(/\s{2,10}/g, ' ').trim()
            webview.insertCSS(formattedData)
          }
        })
      })
    }
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

  addWebView(parent, url, slug, useDarkMode) {
    const view = new View(parent, url, slug, useDarkMode)
    view.initWebView()
    this.views.push(view)
  }

  addWebViews(snaps) {
    for (let snap of snaps) {
      this.addWebView(this.parent, snap.url, snap.slug, snap.useDarkMode)
    }
    if(this.views.length >= 1) this.setActiveView(this.views[0].id)
  }

  setActiveView(id, url, slug) {
    let viewToUse = null
    for (let view of this.views) {
      if (id === null) {
        view.element.style.display = 'none'
      } else {
        if (view.id === id) viewToUse = view
        else {
          if (view.element.style.display === 'flex') view.element.style.display = 'none'
        }
      }
    }
    if (viewToUse !== null) {
      viewToUse.element.style.display = 'flex'
    } else if (viewToUse === null && id !== null) {
      // Add new view created from the current session
      this.addWebView(this.parent, url, slug, false)
      this.views[this.views.length - 1].element.style.display = 'flex'
    }
  }

}

const VM = new ViewManager()

export default VM
