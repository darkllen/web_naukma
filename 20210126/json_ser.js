let fs=require('fs');

let arr = [{surname: 'Yankin', age:20}]

fs.writeFileSync("ser_json.txt",JSON.stringify(arr));

let data=JSON.parse(fs.readFileSync("ser_json.txt","utf8"));
for (k of Object.keys(data)) {
    console.log(data[k]);
}
