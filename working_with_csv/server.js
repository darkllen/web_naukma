let http = require('http');
let express = require('express');
let pug = require('pug');
let csv = require('csv-parser')
let fs = require('fs')



let csv_data = [];
let len_max = 0
fs.createReadStream('grades.csv')
  .pipe(csv({separator: ';', headers:[]}))
  .on('data', (data) => csv_data.push(data))
  .on('end', () => {
    console.log(csv_data);
    len_max = Math.max.apply(null, csv_data.map(function(x){return Object.keys(x).length}))
    console.log(len_max)
  });
 

let server=express();
server.set("view engine", "pug");

server.listen(8888);
console.log('Server is running on port 8888');



server.use('/', function(req, res){
    res.render('table', {csv_data: csv_data, len_max:len_max}); 
});
