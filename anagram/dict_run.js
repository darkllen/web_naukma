let exec = require('child_process').execSync;
let fs = require('fs');
let cliProgress = require('cli-progress');

let file = 'ss.txt'
//create line reader for file
let lineReader = require('readline').createInterface({
    input: fs.createReadStream(file)
  });
//count lines in file for progress bar
let lines_num = parseInt(exec('wc -l ' + file).toString().trim())

//create progress bar
let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(lines_num, 0);

anagrams = {}
//read file line by line (async)
lineReader.on('line', function (line) {
    let word = line.toLowerCase()
    //process word
    find_anagram(word, anagrams)
    bar.increment()
});

lineReader.on('close', function(){
    bar.stop()
    //get result ready to output
    anagrams = Array.from(Object.values(anagrams)).filter(elem => elem.length>=2).map(el => el.sort().join('--')).sort().join('\n')
    //output result
    console.log(anagrams)   
    fs.writeFile("ukr_anagrams.txt", anagrams, () => {});
})

//if there is anagram add word to it, else create new one
function find_anagram(word, anagrams) {
    if (sort_word(word) in anagrams){
        if (anagrams[sort_word(word)].indexOf(word)==-1){
            anagrams[sort_word(word)].push(word)
        }
    } else{
        anagrams[sort_word(word)] = [word]
    }
}

//sort wort lexigrafically
function sort_word(word) {
    return word.split('').sort().join('')
}

