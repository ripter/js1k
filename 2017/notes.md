# Making Strings

## String + String
Use the `+` to build strings.
* Cost: `(2*n)+(n-1)` bytes
* 2*n bytes = `''`
* n-1 bytes = `,`

*n=2 Cost 5 bytes*
```
// n = 2
// (2*2)+(2-1) = 5
// Cost: 5 bytes
// ''+''
// Example:
var string = 'one'+'two'
```

*n=6 Cost 17 bytes*
```
// n = 6
// (2*6)+(6-1) = 5
// Cost: 17 bytes
// ''+''+''+''+''+''
// Example:
var string = 'one'+'two'+'three'+'four'+'five'+'six'
```


## ES6 template
* Cost: `2+(4*n)` bytes
* 2 bytes = ``
* 4*n bytes = `${i}`

*n=2 Cost: 10 bytes*
```
// n = 2
// Cost: 10 bytes
let str = `${i}${i}`;
```

*n=6 Cost 26 bytes*
```
// n = 6
// Cost: 26 bytes
let str = `${i}${i}${i}${i}${i}${i}`;
```


## Array.join('')
Using arrays to build strings.
* Cost: `11+(2*n)+(n-1)` bytes
* 2 bytes = `[]`
* n-1 bytes = `,`
* 2*n bytes = `''`
* 9 bytes = `.join('')`

*n=2 Cost: 16 bytes*
```
// n = 2
// 11+(2*2)+(2-1) = 16
// Cost: 16 bytes
// ['',''].join('')
// Example:
var str = ['one', 'two'].join('')
```

*n=6 Cost: 28 bytes*
```
// n = 6
// 11+(2*6)+(6-1) = 28
// Cost: 28 bytes
// ['','','','','',''].join('')
// Example:
var str = ['one', 'two'].join('')
```



# Making Arrays

## Array literal
Use array literal snytax `['','']`
* Cost: `2+(n-1)+(n*2)`
* 2 bytes = `[]`
* n-1 bytes = `,`
* n*2 bytes = `''`

*n=2 Cost 7 bytes*
```
// n = 2
// 2+(2-1)+(2*2) = 7
// Cost: 7 bytes
// ['','']
// Example:
var array = ['one','two']
```

*n=6 Cost 19 bytes*
```
// n = 6
// 2+(6-1)+(6*2) = 19
// Cost: 19 bytes
// ['','','','','','']
// Example:
var array = ['one','two','three','four','five','six']
```


## String.split(',')
Use `.split` to turn a string into an array.
* Cost: `13+(n-1)` bytes
* 13 bytes = `''.split(',')`
* n-1 bytes = `,`

*n=2 Cost 14 bytes*
```
// n = 2
// 13+(2-1) == 14
// Cost: 14 bytes
// ','.split(',')
// Example:
var array = 'one,two'.split(',')
```

*n=6 Cost 17 bytes*
```
// n = 6
// 13+(6-1) == 18
// Cost: 18 bytes
// ',,,,,'.split(',')
// Example:
var array = 'one,two,three,four,five,six'.split(',')
```

## Nested Array
Use array literal syntax `[['',''],['','']]`
* Cost: `2+(y*2)+(x*y-1)+(x*y*2)`
* 2 bytes = `[]`
* y*2 bytes = `[]`
* x*y-1 bytes = `,`
* x*y*2 bytes = `''`

*x=2,y=2 Cost 17 bytes*
```
// x = 2
// y = 2
// Cost: 17 bytes
// [['',''],['','']]
// Example:
var array = [['one','two'],['three', 'four']]
```

*x=2,y=4 Cost 33 bytes*
```
// x = 2
// y = 4
// Cost: 33 bytes
// [['',''],['',''],['',''],['','']]
// Example:
var array = [['one','two'],['three', 'four'],['five', 'six'],['seven', 'eight']]
```

## Nested Array String.split
Use String `.split` to create nested arrays.
* Cost `51+(y-1)+((x-1)*y)`
* 49 bytes = `.split(';').map(function(p){return p.split(',')})`
* 2 bytes = `''`
* y-1 bytes = `,`
* (x-1)*y = `,`

*x=2,y=2 Cost 54 bytes*
```
// x = 2
// y = 2
// Cost: 54 bytes
// ',;,'.split(';').map(function(p){return p.split(',')})
// Example:
var array = 'one,two;three,four'.split(';').map(function(p){return p.split(',')})
```

*x=2,y=4 Cost 58 bytes*
```
// x = 2
// y = 4
// Cost: 58 bytes
// ',;,;,;,'.split(';').map(function(p){return p.split(',')})
// Example:
var array = 'one,two;three,four;five,six;seven,eight'.split(';').map(function(p){return p.split(',')})
```


# Loops

## While
Use while()
* Cost: `25`
* 25 bytes = `while(i--){r.push(l[i]);}`

*Cost 25 bytes*
```
// Cost: 25 bytes
// while(i--){r.push(l[i]);}
// Example:
var l=['one', 'two'],i=l.length,r=[]
while(i--){r.push(l[i]);}
```


## Map
Use map()
* Cost: `28`
* 23 bytes = `.map(function(i){return`
* 1 byte = `i` something has to be returned so at least 1 byte.
* 2 bytes = `})`

*Cost 28 bytes*
```
// Cost: 28 bytes
// .map(function(i){return i})
// Example:
['one', 'two'].map(function(i){
  return i;
})
```


## Reduce
Use reduce()
* Cost: `32`
* 32 bytes = `.reduce(function(a,c){return a})`

*Cost 32 bytes*
```
// Cost 32
// .reduce(function(a,c){return a})
// Example:
['one', 'two'].reduce(function(acc, curr) {
  return acc;
});
```


## for
Use for(;;)
* Cost: `37`
* 37 bytes = `for(i=0;i<l.length;i++){r.push(l[i])}`

*Cost 37 bytes*
```
// Cost: 37 bytes
// for(i=0;i<l.length;i++){r.push(l[i])}
// Example:
var list=['one', 'two'],result=[]
for(i=0; i < list.length; i++){
  r.push(list[i])
}
```
