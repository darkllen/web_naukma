let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('ukr_dict.txt')
})

lineReader.on('line', function (line) {
    console.log(line)
});