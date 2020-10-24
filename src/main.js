require('colors');
const linkList = require('./_data').linkList;

const getWbfLists = require("./script/getLists").getWbfLists;
const getWbfDetails = require("./script/getDetails").getWbfDetails;
const binaryClass = require("./script/func/_calc").main;
const showLog = require("./script/func/_log").main;
const sortLog = require("./script/func/_sort").main;
const utils = require("./script/utils")
const readUserInput = utils.readUserInput;
const repeatStr = utils.repeatStr;

const absPath = "/Users/nari19/Downloads/remote-folda/others/wbf-verification-cui";
const savePath_atas = absPath + "/src/log/atas.txt";
const savePath_ta = absPath + "/src/log/ta.txt";
const startLog = "( URL / a,b,c... / 'log' / 'calc' / 'sort' / 'js' / 'exit' )"
const weight = 0.75;


console.log(startLog.gray);
(async () => {
  while (true) {
    let input = await readUserInput('');

    if(input=="") { console.log( repeatStr(50,">")+'\n'+startLog.grey ); }//  => Enter
    else if(input=="log") { showLog(savePath_atas) }  // logの表示
    else if(input=="sort") { sortLog(savePath_atas) } // ソート・重複削除
    else if(input=="calc") { binaryClass(savePath_atas) } // 二値分類
    else if(input=="exit") { console.log("Bye! :)".green);break; } // 終了

    else if(input=="js") { // スクリプトファイルを直接調べる
      let input_js = await readUserInput('URL: ');
      [[2,"//"], [1,"/"], [7,"http://"], [8,"https://"]].some( v => {
        if (input_js.slice(0, v[0]) == v[1]) {
          input_js = input_js.slice(v[0])
          return true
        }
      })
      getWbfDetails([input_js], weight, "", savePath_ta)
    
    } else { // WBF探索
      let target = (input.length==1 ? linkList[input] : input)
      if(target.slice(0,4)!="http") target = "http://" + target
      getWbfLists(target).then( links => {
        if(links.length){ getWbfDetails(links, weight, target, savePath_atas) }
        else { console.log('=> 3rd-party script is not found.'.red)}
      })
    }
  } 
})();
