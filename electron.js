import { app, BrowserWindow } from 'electron'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    center: true
  })

  if (process.argv[2] == "dev") {
    mainWindow.loadURL("http://localhost:5173/")
    mainWindow.webContents.on("did-fail-load", function () { mainWindow.loadURL("http://localhost:5173/") })
  } else {
    mainWindow.loadFile('./dist/index.html')
    mainWindow.setMenuBarVisibility(false)
  }

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
