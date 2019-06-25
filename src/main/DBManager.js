const sqlite3 = require('sqlite3')
const fs = require('fs')
const filepath = './src/main/userdata.db'

class DBManager {
  constructor() {
    if (!fs.existsSync(filepath)){
      fs.closeSync(fs.openSync(filepath, 'w'));
    }
    this.db = new sqlite3.Database(filepath)
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS snaps (id INTEGER PRIMARY KEY, url TEXT)")
    })
  }

  addSnap(url) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("INSERT INTO snaps VALUES (NULL, ?)")
      stmt.run(url)
      stmt.finalize()
    })
  }

  destroy() {
    this.db.close()
  }
}

export default DBManager
