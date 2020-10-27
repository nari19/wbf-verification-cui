
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
        // [False]の時だけリンク表示
        if (power >= high[z] && z=="h") console.log(`FP: ${vs[2]}`.gray)
        if (power+trFin[z] < high[z] && z=="h") console.log(`FN: ${vs[2]}`.gray)
        if (power+trCli[z] < high[z] && z=="h") console.log(`FN: ${vs[2]}`.gray)
      })
    });

    // 出力
    console.log("\nサイト数: " + `${data.split('\n').slice(0, -1).length}`.cyan);
    console.log("データ数: " + `${Object.values(result["n"]).reduce((a,x) => a += x, 0)}`.cyan);
    ["h", "n"].forEach( z => {
      console.log('\n' + (z=="h" ? "[関連研究]" : "[提案]") )
      console.log(` (Positive >= ` + `${high[z]})`.cyan)
      process.stdout.write(` `)
      console.log(result[z])
      console.log(" 再現率: " + `${Recall(z)}`.green)
      console.log(" 適合率: " + `${String(Precision(z)).slice(0,5)}`.green)
      console.log("  f値  : " + `${String(fValue(z)).slice(0,5)}`.green)
    })

  })
}
