const request = require('request')
const { JSDOM } = require('jsdom')
const input = require('fs').readFileSync('/dev/stdin', 'utf8')

const sampleData = {
    'a': 'https://bestpresent.jp/ties/ties_armani/',
    'b': 'https://customlife-media.jp/mens-skincare',
    'c': 'https://www.bellemaison.jp/cpg/interior/homebase/homebase_index.html',
    'd': 'https://wired.jp/2020/05/06/which-macbook-should-you-buy/',
    'e': 'http://www.ohtashp.com/topics/honya/',
    'f': 'http://www.shopping-kurosawagakki.com/shopbrand/ct671/',
    'g': 'https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%A4%E3%82%BA%E7%8E%8B',
    'h': 'https://news.yahoo.co.jp/articles/04fda04b9a0da3e64614038ee0198536bf66c846?page=2',
    'i': 'https://tenki.jp/suppl/emi_iwaki/2015/07/26/5521.html',
    'j': 'https://www.mangazenkan.com/item/1206.html'
}

request(sampleData[input.slice(0,-1)], (e, response, body) => {
  if (e) console.error(e)
  try {
    const dom = new JSDOM(body)
    const scriptTagData = dom.window.document.getElementsByTagName("script")
    const resultLink = [...Array(scriptTagData.length)]
      .map( (_, i) => scriptTagData[i].getAttribute("src") )
      .filter(v => v)
      .map(v => v.slice(0, 2)=="//" ? v.slice(2, v.length) : v)
      .join('\n')
    resultLink.split('\n').forEach(
      (v,i) => console.log(`${i}. ${v}\n`)
    )
  } catch (e) {
    console.error(e)
  }
})
