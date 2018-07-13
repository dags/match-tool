if (require('electron-squirrel-startup')) return;

const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    icon: path.join(__dirname, 'src/assets/icons/png/64x64.png'),
    show: false
  });

  win.maximize();
  win.setMenu(null);

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.once('ready-to-show', () => {
    win.show();
  });

  if (process.platform === 'darwin') {
    // Create our menu entries so that we can use MAC shortcuts

    var template = [{
      label: app.getName(),
      submenu: [
        { label: "About " + app.getName(), selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
      ]
    }, {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "Cmd+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Cmd+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Cmd+X", selector: "cut:" },
        { label: "Copy", accelerator: "Cmd+C", selector: "copy:" },
        { label: "Paste", accelerator: "Cmd+V", selector: "paste:" },
        { label: "Select All", accelerator: "Cmd+A", selector: "selectAll:" }
      ]
    }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  };

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  process.exit();
  app.exit(0);
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

