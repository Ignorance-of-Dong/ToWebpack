import './style/index.css'
import './style/index.scss'
import ReactDOM from 'react-dom';
import React from 'react'
console.log(111)
document.write(111)

let foo = () => 1;

let obj = {
  a: 2,
  b: 3
}
let {
  a
} = obj
let objs = {
  ...obj,
  f: 4
}
console.log(foo())

class Name {
  suert() {
    return 1123599999
  }
}
console.log(new Name().suert())
console.log(React)
const element = <h1>Hello, world!</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);

function fn() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('加载promise')
    }, 1000)
  })
}
fn()


let arr = [1,2,3,5,4,5,8,9,8,100]

new Set(arr)

console.log(arr)


// function* helloWorldGenerator() {
//   yield 'hello';
//   yield 'world';
//   return 'ending';
// }

// var hw = helloWorldGenerator();


// hw.next()
@log
function logs(s){
  console.log(s)
}

