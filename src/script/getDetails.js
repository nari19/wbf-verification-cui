
//  ----------- TAを求め、ログの書き込みを行う ----------- 
exports.getWbfDetails = (links, threshold, target, savePath) => {
  const request = require('request-promise')
  const fs = require("fs").promises
  const oldProps = require('../_data').oldProps
  const newProps = require('../_data').newProps
    
  const wbfCalc = []
  const wbfDiff = []

  // 出力文字の列をスペースで揃える
  const mySpace = (num, str) => {
    return [...Array(num - str.length)].map(()=>" ").join("")
  }
  // 取得されるWBFの詳細を表示
  const showWbfDetails = (wbfCodeList, weight) => {
    wbfCalc.push([])
    Object.keys(newProps).forEach( (key, index) => {
      // wbfを取得していないコードは配列から除く
      let targetCodeList = wbfCodeList.filter( v =>
        v.includes(newProps[key].name)
      )
      // 表示・計算
      if(targetCodeList.length){
        let len = targetCodeList.length
        let wKey = newProps[key]
        let wName = wKey.name
        let ta = ((weight * wKey.e)+((1-weight) * wKey.d))*len
        // 配列の末端にTAを格納
        wbfCalc.slice(-1)[0].push(ta)
        // 関連研究と提案内容の差分
        if(Object.keys(oldProps).includes(key)) wbfDiff.push(ta)
        console.log(`* ${len} | ${key}${mySpace(5,key)}: ${wName}`)
      }
    })
  }
    
  links.forEach( async (link, _i) => {
    // 3rd-Party上のスクリプトファイルを取得
    await request("http://"+link).then( code => {
      // console.log(`\n--- ${link.slice(0, link.indexOf("/"))} ---`.green)
      console.log(`\n--- ${link} ---`.green)
      // WBF探索
      showWbfDetails(code.split(/;|\n/), threshold["weight"])
      // 出力: TA
      let sumTA = wbfCalc.slice(-1)[0].reduce((a,x) => a+=x, 0)
      if(sumTA > 20) console.log(link.gray)
      console.log(`[TA: ${sumTA}]`.cyan)
    }).catch( err => console.error(err) )

    // ループ最後
    if(links.slice(-1)[0] == links[_i]) {
      setTimeout(()=>{
        // 10以下のものは含めない
        const atas = wbfCalc
          .map(v => v.reduce((x,y) => x+= y, 0))
          .reduce( (a,x)=> a += (x>threshold["low"] ? x : 0), 0)
        const tas = wbfDiff.reduce((a,x)=> a+=x, 0)
        // 総トラッキング力(ATAS)の表示
        console.log(`\n=> ATAS: ${atas} (${tas})`.red)
        // テキストファイルにログを書き込む
        const point = `${atas} ${mySpace(7, String(atas))} ${tas} ${mySpace(8, String(tas))}`
        const textLog = target ? `${point} ${target}\n` : `${point} ${link}\n`
        fs.appendFile( savePath, textLog)
      }, 1500)
    }
  })

}
