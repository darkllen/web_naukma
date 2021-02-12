"use strict";
let fs=require('fs');

let data=fs.readFileSync("a.txt","utf8");
console.log(data);
data += ' New'
fs.writeFileSync("a.txt",data);