// webサイトのリンクからサードパーティサイトのリンクを抽出
exports.getWbfLists = async num => {
  const request = require('request-promise')
  const _data = require('./_data')
  const resultActiveLink = []

  await request(_data.linkList[num]).then( htmlString => {
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(htmlString)
    const scriptTagData = dom.window.document.getElementsByTagName("script")
    // 取得
    const resultLink = [...Array(scriptTagData.length)]
      .map( (_, i) => scriptTagData[i].getAttribute("src") )
      .filter(v => v)
      .map(v => v.slice(0, 1)=="/" ? v.slice(1) : v)
      .map(v => v.slice(0, 2)=="//" ? v.slice(2) : v)
      .map(v => v.slice(0, 7)=="http://" ? v.slice(7) : v)
      .map(v => v.slice(0, 8)=="https://" ? v.slice(8) : v)
    // 整形
    const domainPattern = /^([A-Za-z0-9][A-Za-z0-9\-]{1,61}[A-Za-z0-9]\.)+[A-Za-z]+/
    resultActiveLink.push(
      ...resultLink.filter( v => {
        const domainName = v.slice(0, v.indexOf("/"))
        return domainPattern.test(domainName)
      })
    )
  }).catch( err => console.error(err))
  return resultActiveLink 
}


// サードパーティサイトのソースコードを取得
// また、テキストファイルに書き込む
exports.writeScriptCode = (links, input) => {
  const request = require('request-promise')
  const fs = require("fs");
  const savePath = `./src/assets/${input}_a_${links.length}.txt`

  try {
    fs.statSync(savePath)
    console.log(`* The file already exists...`);
  } catch {
    links.forEach( async link => {
      await request(`http://${link}`).then( code => {
        // 書き込み
        fs.appendFileSync(savePath, code)
        console.log(`* Success!! | ${link.slice(0, 25)}...`)
      }).catch( err => console.error(err))
    })
  }
}
