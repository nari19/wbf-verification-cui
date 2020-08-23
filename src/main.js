const utils = require('./utils')
const input = require('fs').readFileSync('/dev/stdin', 'utf8').slice(0,-1)

// third-party-siteのURLを取得した後、ソースコードをファイルに書き込む
utils.getWbfLists(input).then( links =>
  utils.writeScriptCode( links, input)
)
