# Making Strings

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
var str = ['one', 'two'].join('')
```

*n=6 Cost: 28 bytes*
```
// n = 6
// 11+(2*6)+(6-1) = 28
// Cost: 28 bytes
// ['','','','','',''].join('')
var str = ['one', 'two'].join('')
```


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
var string = 'one'+'two'
```

*n=6 Cost 17 bytes*
```
// n = 6
// (2*6)+(6-1) = 5
// Cost: 17 bytes
// ''+''+''+''+''+''
var string = 'one'+'two'+'three'+'four'+'five'+'six'
```


# Making Arrays
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
var array = 'one,two'.split(',')
```

*n=6 Cost 17 bytes*
```
// n = 6
// 13+(6-1) == 18
// Cost: 18 bytes
// ',,,,,'.split(',')
var array = 'one,two,three,four,five,six'.split(',')
```

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
var array = ['one','two']
```

*n=6 Cost 19 bytes*
```
// n = 6
// 2+(6-1)+(6*2) = 19
// Cost: 19 bytes
// ['','','','','','']
var array = ['one','two','three','four','five','six']
```
