// webサイトのリンクからサードパーティサイトのリンクを抽出
exports.getWbfLists = async target => {
  const request = require('request-promise')
  const resultActiveLink = []

  await request(target).then( htmlString => {
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


exports.getWbfDetails = (links, weight, target, saveLog) => {
  const request = require('request-promise')
  const wbfProperty = require('./_data').wbfProperty
  const fs = require("fs").promises
  const wbfCalc = []

  // 出力文字の列をスペースで揃える
  const mySpace = (num, str) => {
    return [...Array(num - str.length)].map(()=>" ").join("")
  } 
  // 取得されるWBFの詳細を表示
  const showWbfDetails = (wbfCodeList, weight) => {
    wbfCalc.push([])
    Object.keys(wbfProperty).forEach( key => {
      // 関係のないコードは除く
      let targetCodeList = wbfCodeList.filter( v =>
        v.includes(wbfProperty[key].name)
      )
      // 表示・計算
      if(targetCodeList.length){
	let len = targetCodeList.length
	let wKey = wbfProperty[key]
	let wName = wKey.name
	let ta = ((weight * wKey.e)+((1-weight) * wKey.d))*len
	// 配列の末端にTAを格納
	wbfCalc.slice(-1)[0].push(ta)
        console.log(`* ${len} | ${key}${mySpace(5,key)}: ${wName}`)
      }
    })
  }
  	
  links.forEach( async (link, _i) => {
    // 3rd-Party上のスクリプトファイルを取得
    await request("http://"+`${link}`).then( code => {
      console.log(`\n--- ${link.slice(0, link.indexOf("/"))} ---`.green)
      // WBF探索
      showWbfDetails(code.split(";"), weight)
      // 出力: TA
      let sumTA = wbfCalc.slice(-1)[0].reduce((a,x) => a+=x, 0)
      console.log(`[TA: ${sumTA}]`.cyan)
    }).catch( err => console.error(err) )

    if(links.slice(-1)[0] == links[_i]) {
      setTimeout(()=>{
        // 総トラッキング力(ATAS)の表示
        let atas = wbfCalc.flat().reduce((a,x)=> a+=x, 0)
        console.log(`\n => ATAS: ${atas}`.red)
	// テキストファイルにログを書き込む
        fs.appendFile( saveLog, `${atas}${mySpace(7,String(atas))} ${target}\n` )
      }, 1000)
    }
  })

}
