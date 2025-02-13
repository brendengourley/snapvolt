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
      this.db.run("CREATE TABLE IF NOT EXISTS snaps (id INTEGER PRIMARY KEY, url TEXT, name TEXT, icon TEXT, slug TEXT)")
    })
  }

  addSnap(url, name, icon, slug) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("INSERT INTO snaps VALUES (NULL, ?, ?, ?, ?)")
      stmt.run(url, name, icon, slug)
      stmt.finalize()
      this.db.get("SELECT MAX(id) AS id FROM snaps", (err, row) => {
        this.installedSnaps.push({
          "id": row.id,
          "name": name,
          "url": url,
          "icon": icon
        })
      })
    })
  }

  getInstalledSnaps() {
    this.db.serialize(() => {
      this.db.each("SELECT id, url, name, icon, slug FROM snaps", (err, row) => {
        if(err) {
          console.error(err)
        }
        const rowObj = {
          "id": row.id,
          "name": row.name,
          "url": row.url,
          "icon": row.icon,
          "slug": row.slug
        }
        this.installedSnaps.push(rowObj)
      })
    })
  }

  destroy() {
    this.db.close()
  }
}

export default DBManager
