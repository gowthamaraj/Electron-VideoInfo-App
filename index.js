const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const {app} = electron
//for starting up the APP

const {BrowserWindow,ipcMain} = electron
// for main window setup

let mainWindow

app.on('ready',()=>{
    mainWindow = new BrowserWindow({webPreferences: {
        nodeIntegration: true
    }})
    mainWindow.loadURL(path.join(__dirname,'index.html'))
})

ipcMain.on('video:submit',(event,path)=>{
    ffmpeg.ffprobe(path,function(err,data){
        mainWindow.webContents.send('video:data',{
            duration:data.format.duration,
            rate:data.format.bit_rate,
            tags:data.format.tags
        })
    })
})

