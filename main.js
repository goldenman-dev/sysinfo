// Modules to control application life and create native browser window

const { app, BrowserWindow, ipcMain, dialog, nativeTheme, Tray, Menu, } = require('electron')
const path = require('path')
const getuser = require('systeminformation').users;


app.disableHardwareAcceleration()

let tray = null







const gotTheLock = app.requestSingleInstanceLock()



app.on('ready', () => {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 500,
        minWidth: 600,
        show: false,
        frame: false,

        webPreferences: {

            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    mainWindow.setIcon(path.join(__dirname, 'src/imags/logoc.png'))
    mainWindow.setMenu(null)
    mainWindow.loadFile(path.join(__dirname, 'src/index.html'))
        // mainWindow.webContents.openDevTools();
    if (!gotTheLock) {
        app.quit()
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            // Someone tried to run a second instance, we should focus our window.
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore()
                mainWindow.focus()
            }
        })
    }



    getuser().then(data => {
        let user = data[0].user
        mainWindow.webContents.send('user', user)
        mainWindow.show()
    }).catch(error => {
        console.error(error)
        mainWindow.webContents.send('user', '')
    })

    const sysali = require('./src/js/Sysinfo');
    ipcMain.on("main", (ev) => {
        sysali.getdata().then(data => {
            if (data) {

                ev.reply('main_re', data)


            } else {
                ev.reply('main_re', null)
            }

        })

    });




    //================================= handl exit event
    ipcMain.on('exit', (ev) => {
            tray.destroy()
            tray = null
            app.exit()
        })
        //================================= handl min event
    ipcMain.on('min', (ev) => {
        mainWindow.minimize()
    })


    //================================= build tray


    tray = new Tray(path.join(__dirname, './src/imags/logoc.png'))

    const contextMenu = Menu.buildFromTemplate([

        {
            label: 'exit ',
            type: 'normal',
            icon: path.join(__dirname, './src/imags/power_off.png'),
            click() {
                tray = null
                app.exit()
            }
        }
    ])
    tray.setToolTip('sysinfo.')
    tray.setContextMenu(contextMenu)
    tray.on('click', (event) => {

        mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize()

    })



})

app.on('window-all-closed', function() {
    tray.destroy()
    tray = null
    if (process.platform !== 'darwin') app.quit()
})