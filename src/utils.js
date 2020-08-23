// webサイトのリンクからサードパーティサイトのリンクを抽出
exports.domRequest = async num => {
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
      ...resultLink.filter( v => domainPattern.test(v.slice(0, v.indexOf("/"))) )
    )
  })
  .catch( err => console.error(err))
  return resultActiveLink 
}


// サードパーティサイトのソースコードを取得
// また、テキストファイルに書き込む
exports.tpsBody = async (link, input, length) => {
  const request = require('request-promise')
  const fs = require("fs");

  await request(`http://${link}`).then( code => {
    // 書き込み
    fs.appendFile(`${input}_a_${length}.txt`, code, err => {
      if (err) throw err;
      console.log('正常に書き込みが完了しました');
    })
  }).catch( err => console.error(err))
}
