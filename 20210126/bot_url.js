var request = require('request');
let fs=require('fs');

var URL = 'https://www.google.ru/';

request(URL, function (err, res, body) {
    if (err) throw err;
    console.log(body);
    fs.writeFileSync("google.html",body);
    console.log(res.statusCode);
});
