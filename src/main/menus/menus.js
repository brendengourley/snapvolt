import { app } from 'electron'
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        click () {
          app.quit()
        },
        accelerator: 'CmdOrCtrl+Q'
      },
      { type: 'separator' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' }
    ]
  }
]

export default template
