
// ----------- 入力用関数 ----------- 
exports.readUserInput = question => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer)
      readline.close()
    })
  })
}

// ----------- 指定した数だけ文字列を繰り返す ----------- 
exports.repeatStr = (num, str) => {
  return [...Array(num)].map(()=>`${str}`).join("")
}
