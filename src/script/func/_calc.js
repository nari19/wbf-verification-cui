
exports.main = (savePath_atas) => {
  const fs = require("fs")
  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    data.split("\n").slice(0,-1).forEach( v => {
      let vs = v.split(" ").filter(x => x)
      console.log(vs[0])
      console.log(vs[1])
      console.log(vs.slice(-1)[0].slice(0, 70))
    })
  })

}
