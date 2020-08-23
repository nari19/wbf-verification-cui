const utils = require('./utils')
const input = require('fs').readFileSync('/dev/stdin', 'utf8')

// 表示
utils.domRequest(input.slice(0,-1)).then(
  result => {
    console.log(`\n----- All Of Link ----`)
    result.forEach( (v,i) => console.log(`${i}. ${v}\n`) )
    console.log(`\n\n----- Only Active Link ----`)
    result.forEach( (v,i) => console.log(`${i}. ${v}\n`) )
  }
)
