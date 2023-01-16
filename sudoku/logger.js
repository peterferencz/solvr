exports.log = (msg) => {
    console.log(msg)
}

exports.matrix = (matrix) => {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const num = matrix[y][x]
            process.stdout.write(num == 0 ? " " : num.toString())
        }
        process.stdout.write("\n")
    }
}

exports.diff = (m1, m2) => {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const num1 = m1[y][x]
            const num2 = m2[y][x]
            if(num2 == 0){
                process.stdout.write(" ")
                continue
            }
            process.stdout.write(num1 == num2 ? num1.toString() : `\x1b[32m${num2}\x1b[0m`)
        }
        process.stdout.write("\n")
    }
}