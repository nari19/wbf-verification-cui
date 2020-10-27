
const oldProps = require('./_data').oldProps
const newProps = require('./_data').newProps
const weight = 0.75;

// Eckersley
// const taCustom = ['x0', 'x3', 'x8_a', 'x8_b', 'x9_a', 'x9_b', 'x10', 'x12', 'x13', 'x28', 'x32', 'x33'];

// const imp = taCustom.reduce( (sum,key) => {
//   let wKey = wbfProperty2[key]
//   let ta = ((weight * wKey.e)+((1-weight) * wKey.d))
//   return sum + ta
// }, 0)
//  console.log(imp)

const imp = Object.keys(oldProps).reduce( (sum,key) => {
  let wKey = oldProps[key]
  let ta = ((weight * wKey.e)+((1-weight) * wKey.d))
  return sum + ta
}, 0)
 console.log(imp)
