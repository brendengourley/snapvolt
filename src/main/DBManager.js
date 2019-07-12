import VM from './ViewManager'
import viewEmitter from './EventManager'
// eslint-disable-next-line
const electron = require('electron')
const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require('fs')
// const filepath = './src/main/userdata.db'

class DBManager {
  constructor() {
    this.installedSnaps = []
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    const filepath = path.join(userDataPath, 'userdata.db')
    console.log(filepath)
    if (!fs.existsSync(filepath)){
      fs.closeSync(fs.openSync(filepath, 'w'));
    }
    this.db = new sqlite3.Database(filepath)
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS snaps (id INTEGER PRIMARY KEY, url TEXT, name TEXT, icon TEXT, slug TEXT, darkModeAllowed INTEGER, useDarkMode INTEGER)")
    })
  }

  addSnap(url, name, icon, slug, darkModeAllowed) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("INSERT INTO snaps VALUES (NULL, ?, ?, ?, ?, ?, 0)")
      stmt.run(url, name, icon, slug, darkModeAllowed)
      stmt.finalize()
      this.db.get("SELECT MAX(id) AS id FROM snaps", (err, row) => {
        this.installedSnaps.push({
          "id": row.id,
          "name": name,
          "url": url,
          "icon": icon,
          "slug": slug,
          "darkModeAllowed": darkModeAllowed ? 1 : 0,
          "useDarkMode": row.useDarkMode
        })
      })
    })
  }

  removeSnap(id) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("DELETE FROM snaps WHERE id = ?")
      stmt.run(id)
      stmt.finalize()
    })
  }

  setDarkMode(id, toggle) {
    const useToggle = toggle === true ? 1 : 0
    this.db.serialize(() => {
      const stmt = this.db.prepare("UPDATE snaps SET useDarkMode = ? WHERE id = ?")
      stmt.run(id, useToggle)
    })
  }

  getInstalledSnaps() {
    this.db.serialize(() => {
      this.db.each("SELECT id, url, name, icon, slug, darkModeAllowed, useDarkMode FROM snaps", (err, row) => {
        if(err) {
          console.error(err)
        }
        const rowObj = {
          "id": row.id,
          "name": row.name,
          "url": row.url,
          "icon": row.icon,
          "slug": row.slug,
          "darkModeAllowed": row.darkModeAllowed,
          "useDarkMode": row.useDarkMode
        }
        this.installedSnaps.push(rowObj)
      }, () => {
        VM.addWebViews(this.installedSnaps)
        viewEmitter.emit('viewsLoaded')
      })
    })
  }

  destroy() {
    this.db.close()
  }
}

export default DBManager
