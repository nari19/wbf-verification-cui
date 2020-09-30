exports.linkList = {
  'a': 'https://peraichi.com/univ/%E3%82%A2%E3%83%95%E3%82%A3%E3%83%AA%E3%82%A8%E3%82%A4%E3%83%88%E3%81%AE%E5%A7%8B%E3%82%81%E6%96%B9%E3%82%84%E7%A8%BC%E3%81%8E%E6%96%B9%E3%80%81%E7%84%A1%E6%96%99%E3%83%96%E3%83%AD%E3%82%B0%E3%82%84',
  'b': 'https://tenki.jp/suppl/emi_iwaki/2015/07/26/5521.html',
  'c': 'https://maku77.github.io/nodejs/io/readline-from-keyboard.html',
  'd': 'https://tenki.jp/suppl/emi_iwaki/2015/07/26/5521.html',
  'e': 'http://www.shopping-kurosawagakki.com/shopbrand/ct671/',
  'f': 'https://arne.media/news/22792/',
  'g': 'https://arne.media/news/22792/',
  'h': 'https://wired.jp/2020/05/06/which-macbook-should-you-buy/<Paste>',
  'i': 'https://www.kagoya.jp/howto/webhomepage/affiliate-01/',
  'j': 'https://www.kagoya.jp/howto/webhomepage/affiliate-01/'
}

const workBeforeImprove = {
  x0:    {name:"navigator.plugins", d:3, e:1},
  x1:    {name:"navigator.appName", d:1,e:3},
  x2:    {name:"navigator.appVersion", d:1,e:3},
  x3:    {name:"navigator.userAgent", d:3,e:1},
  x4:    {name:"navigator.mimeTypes", d:2,e:3},
  x5:    {name:"navigator.language", d:2,e:3},
  x6:    {name:"navigator.platform", d:1,e:1},
  x7:    {name:"navigator.appCodeName", d:1,e:3},
  x8_a:  {name:"screen.height", d:2,e:2},
  x8_b:  {name:"screen.width", d:2,e:2},
  x9_a:  {name:"screen.availHeight", d:2,e:2},
  x9_b:  {name:"screen.availWidth", d:2,e:2},
  x10:   {name:"screen.colorDepth", d:2,e:2},
  x11:   {name:"screen.pixielDepth", d:2,e:2},
  x12:   {name:"getTimezoneOffset", d:3,e:1},
  x13:   {name:"getFontList", d:3,e:1},
  x14_a: {name:"toDataURL", d:3,e:1},
  x14_b: {name:"getImageData", d:3,e:1}
}

const workAfterImprove = {
  x15:    {name:"navigator.connection", d:1,e:3},
  x16:    {name:"navigator.browserLanguage", d:1,e:3},
  x17:    {name:"navigator.systemLanguage", d:1,e:3},
  x18:    {name:"navigator.deviceMemory", d:1,e:3},
  x19:    {name:"navigator.hardwareConcurrency", d:1,e:3},
  x20:    {name:"navigator.cpuClass", d:1,e:3},
  x21:    {name:"navigator.doNotTrack", d:1,e:3},
  x22:    {name:"navigator.msDoNotTrack", d:1,e:3},
  x23:    {name:"navigator.maxTouchPoints", d:1,e:3},
  x24:    {name:"navigator.msMaxTouchPoints", d:1,e:3},
  x25:    {name:"navigator.oscpu", d:1,e:3},
  x26:    {name:"navigator.platform.toLowerCase", d:1,e:3},
  x27:    {name:"navigator.platform.productSub", d:1,e:3},
}

exports.wbfProperty = {...workBeforeImprove}
exports.wbfProperty2 = {...workBeforeImprove, ...workAfterImprove}
