let arr = [-3, 1,9,12,4,6]

let max = arr[0]
for (el in arr)
    if (max < arr[el]) max = arr[el]
console.log(max)


max = arr.reduce((acc,el)=>el>acc?el:acc)
console.log(max)