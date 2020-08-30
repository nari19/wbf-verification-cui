require('colors');
const fs = require("fs")
const linkList = require('./_data').linkList;

const utils = require("./utils")
const getWbfDetails = utils.getWbfDetails;
const getWbfLists = utils.getWbfLists;
const readUserInput = utils.readUserInput;

const dirPath = "/home/kazuki/Document/remote-file/wbf-verification-cui/"
const savePath = dirPath + "src/assets/log.txt";
const startLog = "( URL / a,b,c... / 'log' / 'clean' / 'exit' )"
const weight = 0.75;

const mySpace = (num, str) => {
  return [...Array(num)].map(()=>`${str}`).join("")
} 

console.log(startLog.gray);
(async () => {
  while (true) {
    let input = await readUserInput('');

    // ----------- logの表示 ----------- 
    if(input=="log") {
      fs.readFile( savePath, "utf-8", (err, data) => {
        if(err) throw err;
        console.log(`\n ATAS  | ${mySpace(20," ")} URL`)
        console.log(mySpace(80,"~").white)
        data.split("\n").forEach( (v,i) => {
          let vs = v.split(" ")
          let sp = mySpace((7-vs[0].length)," ")
          process.stdout.write(`${vs[0]}`.green)
          process.stdout.write( sp + "|  ")
          console.log(vs.slice(-1)[0].slice(0, 70))
        })
      })
    
    //  ----------- ソート・重複削除 ----------- 
    } else if(input=="clean") {
      fs.readFile( savePath, "utf-8", (err, data) => {
        if(err) throw err;
        console.log(data)
      })
    
    //  ----------- Enter => ----------- 
    } else if(input=="") {
      console.log(`\n${[...Array(50)].map(()=>">").join("")}`)
      console.log(startLog.grey);
    
    //  ----------- 終了 ----------- 
    } else if(input=="exit") {
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
