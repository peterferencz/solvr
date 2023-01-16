const sharp = require('sharp')
const Tesseract = require('tesseract.js')

const WIDTH = 1040
const HEIGHT = 1035

exports.process = async () => {
    await sharp("temp/screenshot.png").extract({
        top: 310,
        left: 20,
        width: WIDTH,
        height: HEIGHT
    }).grayscale().threshold(200)
    .toFile("temp/edited.png")
}

exports.recognise = async () => {
    Tesseract.setLogging(false)
    const worker = Tesseract.createWorker({
        logger: (msg) => {}
    })
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize("eng", Tesseract.OEM.TESSERACT_ONLY)
    await worker.setParameters({
        tessedit_char_whitelist: "123456789",
        //tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR, TODO SOMEHOW IT BREAKS IT, HAVE NO CLUE WHY
        tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_ONLY,
        tessjs_create_hocr: 0,
        tessjs_create_tsv: 0,
        tessjs_create_box: 0,
        tessjs_create_unlv: 0,
        tessjs_create_osd: 0,
        // user_defined_dpi: 480 NOT WORKING bc we cropped the image :'(
    })

    const matrix = []
    for (let x = 0; x < 9; x++) {
        matrix.push([...Array(9).fill('X')])
    }

    const xinc = parseInt(WIDTH / 9)
    const yinc = parseInt(HEIGHT / 9)
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            
            //TODO debug
            await sharp("temp/edited.png").extract({
                left: x*xinc + 10,
                width: xinc - 20,
                top: y*yinc + 10,
                height: yinc - 20
            }).toFile(`temp/grid/${x}x${y}.png`)

            const data = await worker.recognize(`temp/edited.png`, {
                rectangle: {
                    left: x*xinc + 10,
                    width: xinc - 20,
                    top: y*yinc + 10,
                    height: yinc - 20
                }
            })
            if(data.data.text == ""){
                matrix[x][y] = 0
                continue;
            }
            const number = parseInt(data.data.text.replace(/\r?\n|\r/g))
            matrix[x][y] = number
        }
    }

    
    
    await worker.terminate()    
    return matrix
}