
exports.main = (savePath_atas) => {
  const fs = require("fs");
  const repeatStr = require("../utils").repeatStr;

  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    process.stdout.write(`\n ${repeatStr(5," ")} ATAS ${repeatStr(6," ")} `)
    console.log(`| ${repeatStr(20," ")} URL`)
    console.log(repeatStr(80,"~"))
    data.split("\n").slice(0,-1).forEach( v => {
      let vs = v.split(" ").filter(x => x)
      let pt1 = ` ${vs[0]}`
      let pt2 = `(${vs[1]})`
      const space = n => repeatStr((8-vs[n].length)," ")
      process.stdout.write(
        vs[0]>=40 ? pt1.red : (vs[0]>=10 ? pt1.green : pt1.cyan)
      )
      process.stdout.write( space(0) + pt2 + space(1) + "|  ")
      console.log(vs.slice(-1)[0].slice(0, 70))
    })
  })
}
