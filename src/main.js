require('colors');
const fs = require("fs")
const linkList = require('./_data').linkList;

const utils = require("./utils")
const getWbfDetails = utils.getWbfDetails;
const getWbfLists = utils.getWbfLists;
const readUserInput = utils.readUserInput;
const repeatStr = utils.repeatStr;

const dirPath = "/home/kazuki/Document/remote-file/wbf-verification-cui/"
const savePath = dirPath + "src/assets/log.txt";
const startLog = "( URL / a,b,c... / 'log' / 'sort' / 'exit' )"
const weight = 0.75;


console.log(startLog.gray);
(async () => {
  while (true) {
    let input = await readUserInput('');

    // ----------- logの表示 ----------- 
    if(input=="log") {
      fs.readFile( savePath, "utf-8", (err, data) => {
        if(err) throw err;
        console.log(`\n ATAS  | ${repeatStr(20," ")} URL`)
        console.log(repeatStr(80,"~"))
        data.split("\n").forEach( (v,i) => {
          let vs = v.split(" ")
          let sp = repeatStr((7-vs[0].length)," ")
          process.stdout.write(`${vs[0]}`.green)
          process.stdout.write( sp + "|  ")
          console.log(vs.slice(-1)[0].slice(0, 70))
        })
      })
    
    //  ----------- ソート・重複削除 ----------- 
    } else if(input=="sort") {
      fs.readFile( savePath, "utf-8", (err, data) => {
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
        fs.writeFile(savePath, slimedData.join('\n'), ()=>{
	  if(err) throw err
	  console.log("Removed duplicate.".green)
	})
      })
    
    //  ----------- Enter => ----------- 
    } else if(input=="") {
      console.log(repeatStr(50,">"))
      console.log(startLog.grey);
    
    //  ----------- 終了 ----------- 
    } else if(input=="exit") {
      console.log("Bye! :)".green)
      break;
    
    //  ----------- WBF探索 ----------- 
    } else {
      const target = (input.length==1 ? linkList[input] : input)
      getWbfLists(target).then(
        links => getWbfDetails(links, weight, target, savePath)
      )
    } 
  } 
})();
