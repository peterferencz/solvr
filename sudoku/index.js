const phone = require('./phone')
const recognise = require('./recognise')
const solve = require('./solve')
const logger = require('./logger')

;(async ()=> {
    await solveBoard()
})()

async function solveBoard(){
    await phone.tap(330, 157) //Remove the "only x% can solve this" popup
    logger.log("Processing board...")
    await phone.takeScreenshot()
    await phone.tap(740, 132) //Pause
    await recognise.process()
    
    logger.log("Recognising digits...")
    let start = Date.now()
    const original = await recognise.recognise()
    let end = Date.now()
    let matrix = JSON.parse(JSON.stringify(original))
    logger.log(`Recognised in \x1b[32m${end-start}\x1b[0mms`)
    //logger.matrix(original)
    
    logger.log("Solving board...")
    await phone.tap(530, 1420) //Exit 
    start = Date.now()
    await solve.solve(matrix)
    end = Date.now()
    
    logger.log(`Solved in \x1b[32m${end-start}\x1b[0mms`)
    logger.diff(original, matrix)
    
    
    start = Date.now()
    await phone.sendMatrix(original, matrix)
    end = Date.now()
    logger.log(`Inputs sent in \x1b[32m${end-start}\x1b[0mms`)
}

const sleep = ms => new Promise(r => setTimeout(r, ms));