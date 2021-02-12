let s = 'fsaass'

let res = {}

s = s.split('')
for (i in s){
    if (s[i] in res){
        res[s[i]]+=1
    }else{
        res[s[i]]=1
    }
}
console.log(res)