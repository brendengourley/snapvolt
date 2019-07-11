const fs = require('fs')

const defaultSettings = {
  darkMode = false
}

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const filepath = path.join(userDataPath, 'appsettings.json')

class SettingsManager {
  constructor() {
    this.snapSettings = []
    this.appSettings = {}
    if (!fs.existsSync(filepath)){
      let data = JSON.stringify(defaultSettings)
      fs.writeFileSync(filepath, data)
    } else {
      let rawdata = fs.readFileSync(filepath)
      this.appSettings = JSON.parse(rawdata)
    }
  }

  updateAppSettings(settings) {
    // completely overwrite the settings file
    let data = JSON.stringify(settings)
    fs.writeFileSync(filepath, data)
  }
}
