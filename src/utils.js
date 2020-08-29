// webサイトのリンクからサードパーティサイトのリンクを抽出
exports.getWbfLists = async num => {
  const request = require('request-promise')
  const linkList = require('./_data').linkList
  const resultActiveLink = []

  await request(linkList[num]).then( htmlString => {
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


exports.writeScriptCode = links => {
  const request = require('request-promise')
  const wbfProperty = require('./_data').wbfProperty
  
  // 取得されるWBFの詳細を表示
  const showWbfDetails = code => {
    let wbfCodeList = code.split(";")
    Object.keys(wbfProperty).forEach( key => {
      let targetCodeList = wbfCodeList.filter( v =>
        // v.includes(wbfProperty.key["name"])
        v.includes(wbfProperty[key].name)
      )
      if(targetCodeList.length){
        console.log(`* ${key} | ${targetCodeList.length}`)
      }
    })
    console.log(`\n`)
  }

  try {
    fs.statSync(savePath)
    console.log(`* The file already exists...`);
  } catch {
    links.forEach( async link => {
      // 3rd-Party上のスクリプトファイルを取得
      await request("http://"+`${link}`).then( code => {
        console.log(`--- ${link.slice(0,25)}... ---`)
        showWbfDetails(code) // WBF探索
      }).catch( err => console.error(err) )
    })
  }
}
