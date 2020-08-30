require('colors');
const getWbfLists = require('./utils').getWbfLists;
const getWbfDetails = require('./utils').getWbfDetails;
const linkList = require('./_data').linkList;
const fs = require("fs")
const weight = 0.75;
const saveLog = "./src/assets/log.txt";

(async input =>{
  if(input=="clean") {
    fs.readFile( saveLog, "utf-8", (err, data) => {
      if(err) throw err;
      console.log(data)
    })
    // 重複をなくす
    // ATASごとにソート
  
  } else if(input=="log") {
    fs.readFile( saveLog, "utf-8", (err, data) => {
      if(err) throw err;
      console.log("") // 改行
      data.split("\n").forEach( (v,i) => {
	let vs = v.split(" ")
	let sp = [...Array(7-vs[0].length)].map(()=>" ").join("")
        process.stdout.write(`${vs[0]}`.green)
        process.stdout.write(sp)
        console.log(vs.slice(-1)[0])
      })
    })

  } else {
    const target = input.length==1 ? linkList[input] : input
    const links = await getWbfLists(target)
    const result = await getWbfDetails(links, weight, target, saveLog)
  }
})(require('fs').readFileSync('/dev/stdin', 'utf8').slice(0,-1))
