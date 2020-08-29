const getWbfLists = require('./utils').getWbfLists;
const writeScriptCode = require('./utils').writeScriptCode;

(async input =>{
  // third-party-siteのURLを取得した後、ソースコードをファイルに書き込む
  await getWbfLists(input).then( links => writeScriptCode(links) )
  // console.log("* finish!!")
	  //
})(require('fs').readFileSync('/dev/stdin', 'utf8').slice(0,-1))


// サードパーティサイトのソースコードを取得
// また、テキストファイルに書き込む
// exports.writeScriptCode = (links, input) => {
//   const request = require('request-promise')
//   const fs = require("fs").promises;
//   const savePath = `./src/assets/${input}_a_${links.length}.txt`
// 
//   try {
//     fs.statSync(savePath)
//     console.log(`* The file already exists...`);
//   } catch {
//     links.forEach( async link => {
//       await request("http://"+`${link}`).then( code => {
//         // 書き込み
//         fs.appendFile(savePath, code)
//         console.log(`* Success!! | ${link.slice(0, 25)}...`)
//       }).catch( err => console.error(err))
//     })
//   }
// }

// console.log(`* Success!! | ${link.slice(0, 25)}...`)
