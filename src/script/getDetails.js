
//  ----------- TAを求め、ログの書き込みを行う ----------- 
exports.getWbfDetails = (links, weight, target, savePath) => {
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
      // wbfを取得していないコードは配列から除く
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
    await request("http://"+link).then( code => {
      console.log(`\n--- ${link.slice(0, link.indexOf("/"))} ---`.green)
      // WBF探索
      showWbfDetails(code.split(/;|\n/), weight)
      // 出力: TA
      let sumTA = wbfCalc.slice(-1)[0].reduce((a,x) => a+=x, 0)
      console.log(`[TA: ${sumTA}]`.cyan)
    }).catch( err => console.error(err) )

    // ループ最後
    if(links.slice(-1)[0] == links[_i]) {
      setTimeout(()=>{
        // 総トラッキング力(ATAS)の表示
        const atas = wbfCalc.flat().reduce((a,x)=> a+=x, 0)
        console.log(`\n=> ATAS: ${atas}`.red)
        // テキストファイルにログを書き込む
        const textLog = `${atas}${mySpace(7,String(atas))} ${target}\n`
        if(target) fs.appendFile( savePath, textLog)
      }, 1000)
    }
  })

}
