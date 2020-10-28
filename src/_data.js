exports.linkList = {
  a: 'http://tokasaiyasune.blog.fc2.com/',
  b: 'https://tenki.jp/suppl/emi_iwaki/2015/07/26/5521.html',
  c: 'http://recruit.net',
  d: 'https://maku77.github.io/nodejs/io/readline-from-keyboard.html',
  e: 'http://www.shopping-kurosawagakki.com/shopbrand/ct671/',
  f: 'https://arne.media/news/22792/',
  g: 'https://arne.media/news/22792/',
  h: 'https://wired.jp/2020/05/06/which-macbook-should-you-buy/<Paste>',
  i: 'https://www.kagoya.jp/howto/webhomepage/affiliate-01/',
  j: 'https://www.kagoya.jp/howto/webhomepage/affiliate-01/'
}

const workBeforeImprove = {
  p0:    {name:"navigator.plugins", d:3, e:1},
  p1:    {name:"navigator.appName", d:1,e:3},
  p2:    {name:"navigator.appVersion", d:1,e:3},
  p3:    {name:"navigator.userAgent", d:3,e:1},
  p4:    {name:"navigator.mimeTypes", d:2,e:3},
  p5:    {name:"navigator.language", d:2,e:3},
  p6:    {name:"navigator.platform", d:1,e:1},
  p7:    {name:"navigator.appCodeName", d:1,e:3},
  p8_a:  {name:"screen.height", d:2,e:2},
  p8_b:  {name:"screen.width", d:2,e:2},
  p9_a:  {name:"screen.availHeight", d:2,e:2},
  p9_b:  {name:"screen.availWidth", d:2,e:2},
  p10:   {name:"screen.colorDepth", d:2,e:2},
  p11:   {name:"screen.pixielDepth", d:2,e:2},
  p12:   {name:"getTimezoneOffset", d:3,e:1},
  p13:   {name:"getFontList", d:3,e:1},
  p14_a: {name:"toDataURL", d:3,e:1},
  p14_b: {name:"getImageData", d:3,e:1}
}

// duration: 経年変化　entropy: 端末ごとのばらつきがない 一意性
const workAfterImprove = {
  p15:    {name:"navigator.connection", d:2,e:3},
  p16:    {name:"navigator.browserLanguage", d:3,e:1},
  p17:    {name:"navigator.systemLanguage", d:3,e:1},
  p18:    {name:"navigator.deviceMemory", d:2,e:1},
  p19:    {name:"navigator.hardwareConcurrency", d:2,e:2},
  p20:    {name:"navigator.cpuClass", d:2,e:2},
  p21:    {name:"navigator.doNotTrack", d:3,e:1},
  p22:    {name:"navigator.msDoNotTrack", d:3,e:1},
  p23:    {name:"navigator.maxTouchPoints", d:2,e:2},
  p24:    {name:"navigator.msMaxTouchPoints", d:2,e:2},
  p25:    {name:"navigator.oscpu", d:1,e:2},
  p26:    {name:"navigator.platform.toLowerCase", d:2,e:1},
  p27:    {name:"navigator.platform.productSub", d:2,e:1},
  p28:    {name:"navigator.cookieEnabled", d:2,e:1},
  p29:    {name:"window.devicePixelRatio", d:2,e:2},
  p30:    {name:"window.openDatabase", d:2,e:1},
  p31:    {name:"window.ActiveXObject", d:2,e:1},
  p32:    {name:"window.sessionStorage", d:2,e:1},
  p33:    {name:"window.localStorage", d:2,e:1},
  p34:    {name:"window.indexedDB", d:2,e:1},
  p35:    {name:"window.WebGLRenderingContext", d:2,e:1},
  p36:    {name:"window.swfobject", d:2,e:1},
}

exports.oldProps = {...workBeforeImprove}
exports.newProps = {...workBeforeImprove, ...workAfterImprove}
