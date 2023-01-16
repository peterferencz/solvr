const logger = require('./logger')

exports.solve = (data) => {
    // const _x = 4;
    // const _y = 7;
    // console.log(`cell value of ${_x}x${_y}: ${data[_x][_y]}`)
    // const row = getRow(data, _y)
    // const col = getCol(data, _x)
    // const square = getSquare(data, _x, _y)
    // console.log("row: " + row)
    // console.log("col: " + col)
    // console.log("square: " + square)
    // const set = [...new Set(row.concat(col).concat(square))]
    // const numbers = Array.from({length: 9}, (_, i) => i + 1)
    // const possible = numbers.filter(x => !set.includes(x))
    // console.log("manual possible: " + possible)
    // console.log("auto possible: " + getAllPossible(data, _x, _y))

    
    function setSingeltons() {
        let set = false
        
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if(data[x][y] != 0){ continue }
                const possible = getAllPossible(data, x, y)
                if(possible.length == 1){
                    // if(x == _x && y == _y){
                    //     console.log("Setting to " + possible[0])
                    //     console.log("from all " + possible)
                    // }
                    set = true
                    data[x][y] = possible[0]
                }
            }
        }
        return set
    }
    
    function solveRec(matrix) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if(matrix[x][y] == 0){
                    const possible = getAllPossible(matrix, x, y)

                    for (let i = 0; i < possible.length; i++) {
                        const testNum = possible[i];

                        

                        matrix[x][y] = testNum
                        if(solveRec(matrix)){
                            return true
                        } else{
                            matrix[x][y] = 0
                        }
                    }
                    return false
                }
            }
        }
        return true
    }

    while(setSingeltons());
    solveRec(data)
}

function getAllPossible(matrix, x, y) {

    const all = [...new Set(getRow(matrix, y).concat(getCol(matrix, x)).concat(getSquare(matrix, x, y)))]
    const numbers = Array.from({length: 9}, (_, i) => i + 1)

    return numbers.filter(x => !all.includes(x))
}

function getCol(matrix, x) {
    return matrix[x].filter(i => i !== 0)
}
function getRow(matrix, y) {
    const row = []
    for (let i = 0; i < 9; i++) {
        row.push(matrix[i][y])
    }
    return row.filter(i => i !== 0)
}
function getSquare(matrix, x, y) {
    const square = []
    const sx = parseInt(x/3)
    const sy = parseInt(y/3)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            square.push(matrix[sx*3+i][sy*3+j])
        }
    }
    return square.filter(i => i !== 0)
}