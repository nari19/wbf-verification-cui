
extends.outout = () = {
  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    data.split("\n").slice(0,-1).forEach( v => {
      let vs = v.split(" ").filter(x => x)
      let pt1 = ` ${vs[0]}`
      let pt2 = `(${vs[1]})`
      const space = n => repeatStr((8-vs[n].length)," ")
    })
  })
}
