
exports.main = (savePath_atas, threshold) => {
  const fs = require("fs");
  const repeatStr = require("../utils").repeatStr;
  const { high } = threshold

  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    process.stdout.write(`\n ATAS${repeatStr(4," ")}TAの総和`)
    // テーブル上部
    console.log(`| ${repeatStr(20," ")} URL`)
    console.log(repeatStr(75,"~"))
    // テーブル下部
    data.split("\n").slice(0,-1).forEach( v => {
      let vs = v.split(" ").filter(x => x)
      let pt1 = ` ${vs[0]}`
      let pt2 = `${vs[1]}`
      const space = n => repeatStr((8-vs[n].length)," ")
      const clr = (high, pt, v) => {
        return v>=high ? pt.red : (v!=0 ? pt.green : pt.cyan)
      }
      process.stdout.write( clr(high["n"], pt1, vs[0]) + space(0) )
      process.stdout.write( clr(high["h"], pt2, vs[1]) + space(1) )
      console.log( "|  " + vs.slice(-1)[0].slice(0, 50) )
    })
  })

}
