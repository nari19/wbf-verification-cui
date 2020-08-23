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
