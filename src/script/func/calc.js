
exports.main = (savePath_atas, threshold) => {
  require('colors');
  const fs = require("fs")

  const {tracker, high} = threshold
  const trFin = tracker["fingerprintjs"]
  const trCli = tracker["clientjs"]

  const result = {
    h: {TP: 0, TN: 0, FP: 0, FN: 0},
    n: {TP: 0, TN: 0, FP: 0, FN: 0}
  }
  const cntUp = (res, val) => result[res][val]+=1

  const rate = (name, np) => result[name]["TP"] / (result[name]["TP"] + result[name][np])
  const Recall = name => rate(name, "FN") // 再現率
  const Precision = name => rate(name, "FP") // 適合率
  const fValue = name => 2 * (Recall(name) * Precision(name) / (Recall(name) + Precision(name))) // f値

  // 読み込み
  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    data.split("\n").slice(0,-1).forEach( v => {
      let vs = v.split(" ").filter(x => x);
      ["h", "n"].forEach( z => {
        let power = z=="n" ? Number(vs[0]) : Number(vs[1]);
        cntUp(z, power >= high[z] ? "FP" : "TN")
        cntUp(z, power+trFin[z] >= high[z] ? "TP" : "FN")
        cntUp(z, power+trCli[z] >= high[z] ? "TP" : "FN")
        // [FP]の時だけリンク表示
        if (power >= high[z] && z=="n") console.log(`${v[2]}`.gray)
      })
    });

    // 出力
    ["h", "n"].forEach( z => {
      console.log('\n' + "[関連研究]")
      console.log(result[z])
      console.log("再現率: " + `${Recall(z)}`.green)
      console.log("適合率: " + `${Precision(z)}`.green)
      console.log(" f値  : " + `${fValue(z)}`.green)
    })

  })
}
