const sqlite3 = require('sqlite3')
const fs = require('fs')
const filepath = './src/main/userdata.db'

class DBManager {
  constructor() {
    this.installedSnaps = []
    if (!fs.existsSync(filepath)){
      fs.closeSync(fs.openSync(filepath, 'w'));
    }
    this.db = new sqlite3.Database(filepath)
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS snaps (id INTEGER PRIMARY KEY, url TEXT, name TEXT)")
    })
  }

  addSnap(url, name) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("INSERT INTO snaps VALUES (NULL, ?, ?)")
      stmt.run(url, name)
      stmt.finalize()
      this.db.get("SELECT MAX(id) AS id FROM snaps", (err, row) => {
        this.installedSnaps.push({
          "id": row.id,
          "name": name,
          "url": url
        })
      })
    })
  }

  getInstalledSnaps() {
    this.db.serialize(() => {
      this.db.each("SELECT id, url, name FROM snaps", (err, row) => {
        if(err) {
          console.error(err)
        }
        const rowObj = {
          "id": row.id,
          "name": row.name,
          "url": row.url
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
