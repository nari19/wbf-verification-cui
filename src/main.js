require('colors');
const fs = require("fs")
const linkList = require('./_data').linkList;

const utils = require("./utils")
const getWbfDetails = utils.getWbfDetails;
const getWbfLists = utils.getWbfLists;
const readUserInput = utils.readUserInput;
const repeatStr = utils.repeatStr;

const absPath = "/Users/nari19/Downloads/remote-folda/others/wbf-verification-cui";
const savePath = absPath + "/src/assets/log2.txt";
const startLog = "( URL / a,b,c... / 'log' / 'sort' / 'js' / 'exit' )"
const weight = 0.75;


console.log(startLog.gray);
(async () => {
  while (true) {
    let input = await readUserInput('');

    // ----------- logの表示 ----------- 
    if(input=="log") {
      fs.readFile( savePath, "utf-8", (err, data) => {
        if(err) throw err;
        console.log(`\n  ATAS  | ${repeatStr(20," ")} URL`)
        console.log(repeatStr(80,"~"))
        data.split("\n").slice(0,-1).forEach( (v,i) => {
          let vs = v.split(" ")
          let pt = ` ${vs[0]}`
          let sp = repeatStr((7-vs[0].length)," ")
          process.stdout.write(
            vs[0]>=40 ? pt.red : (vs[0]>=10 ? pt.green : pt.cyan)
          )
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
	      console.log('Removed duplicate.\n'.green)
	    })
      })
    
    //  ----------- スクリプトファイルを直接調べる ----------- 
    } else if(input=="js") {
      let input_js = await readUserInput('URL: ');
      [[2,"//"], [1,"/"], [7,"http://"], [8,"https://"]].some( v => {
        if (input_js.slice(0, v[0]) == v[1]) {
          input_js = input_js.slice(v[0])
          return true
        }
      })
      getWbfDetails([input_js], weight, "", savePath)
    
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
      let target = (input.length==1 ? linkList[input] : input)
      if(target.slice(0,4)!="http") target = "http://" + target
      getWbfLists(target).then( links => {
        if(links.length){ getWbfDetails(links, weight, target, savePath) }
        else { console.log('=> 3rd-party script is not found.'.red)}
      })
    }
  } 
})();
