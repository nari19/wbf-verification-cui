const utils = require('./utils');

(async input =>{
  // third-party-siteのURLを取得した後、ソースコードをファイルに書き込む
  await utils.getWbfLists(input)
    .then( links => utils.writeScriptCode(links, input))
  console.log("* finish!!")
})(require('fs').readFileSync('/dev/stdin', 'utf8').slice(0,-1))
