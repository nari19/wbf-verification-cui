
const oldProps = require('./_data').oldProps
const newProps = require('./_data').newProps
const weight = 0.75;

// Eckersley
const taCustom = ['p3', 'p12', 'p12'];

const imp = taCustom.reduce( (sum,key) => {
  let wKey = oldProps[key]
  let ta = ((weight * wKey.e)+((1-weight) * wKey.d))
  return sum + ta
}, 0)
 console.log(imp)

// const imp = Object.keys(oldProps).reduce( (sum,key) => {
//   let wKey = oldProps[key]
//   let ta = ((weight * wKey.e)+((1-weight) * wKey.d))
//   return sum + ta
// }, 0)
 // console.log(imp)
