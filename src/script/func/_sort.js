
exports.main = (savePath_atas) => {
  const fs = require("fs")
  fs.readFile( savePath_atas, "utf-8", (err, data) => {
    if(err) throw err;
    // ソート
    const sortedData = data.split('\n').sort( (a,b) => {
      const cutOnlyNum = x => Number(x.split(" ")[0])
      if(cutOnlyNum(a) > cutOnlyNum(b)) return -1
      if(cutOnlyNum(a) < cutOnlyNum(b)) return 1
      return 0;
    })
    // 重複削除
    const slimedData = sortedData.filter( (x,i,self) => {
      return self.indexOf(x) === i
    })
    fs.writeFile(savePath_atas, slimedData.join('\n'), ()=>{
      if(err) throw err
      console.log('Removed duplicate.\n'.green)
    })
  })
}
