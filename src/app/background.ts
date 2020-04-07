import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
} from "electron";
import url from "url";

let win: BrowserWindow;

const isDevelopment = process.env.NODE_ENV === "development";

const createWindow: () => void = () => {
    const option: BrowserWindowConstructorOptions = {
        width: 1280,
        minWidth: 1280,
        height: 600,
        minHeight: 600,
        center: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    };

    if (isDevelopment) {
        win = new BrowserWindow(
            Object.assign({ webPreferences: { devTools: false } }, option)
        );
        win.loadURL(`http://localhost:8080`);
        win.webContents.openDevTools();
    } else {
        win = new BrowserWindow(option);
        win.loadURL(
            url.format({
                pathname: __dirname + "/index.html",
                protocol: "file",
                slashes: true,
            })
        );
    }

    win.on("resize", () => {
        win.webContents.send("isMaximized", win.isMaximized());
    });
};

app
    .whenReady()
    .then(createWindow)
    .catch((err) => console.log(err));

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
