const utils = require('./utils')
const input = require('fs').readFileSync('/dev/stdin', 'utf8').slice(0,-1)

// third-party-siteのURLを取得
utils.domRequest(input).then( links =>
  // third-party-siteのコードをファイルに書き込む
  links.forEach( async (link, _, array) => 
    await utils.tpsBody( link, input, array.length)
  )
)
