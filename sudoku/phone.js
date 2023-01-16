const { exec } = require("child_process")

exports.takeScreenshot = async () => {
    await new Promise((resolve, reject) => {
        exec(`adb exec-out screencap -p > temp/screenshot.png`, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
                return;
            }
            if (stderr) {
                reject(stderr)
                return;
            }
            resolve(stdout)
        });
    })
}


exports.tap = async (x,y) => {
    await new Promise((resolve, reject) => {
        exec(`adb shell input tap ${x} ${y}`, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
                return;
            }
            if (stderr) {
                reject(stderr)
                return;
            }
            resolve(stdout)
        });
    })
}


exports.sendMatrix = async (original, matrix) => {
    const xinc = parseInt(1040 / 9)
    const yinc = parseInt(1035 / 9)
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if(original[x][y] != 0){
                continue;
            }
            
            const num = matrix[x][y]
            if(num == 0){
                continue;
            }
            await this.tap(20 + x*xinc + 10 + ((xinc - 20)/2), 310 + y*yinc + 10 + ((yinc - 20)/2))
            await this.tap(80 + (num-1)*112, 1666)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}