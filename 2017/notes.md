
# Making Strings

### Arrays to Strings
Using arrays to build strings.
* Cost: `11+(2*n)+(n-1)` bytes
* 2 bytes = `[]`
* n-1 bytes = `,`
* 2*n bytes = `''`
* 9 bytes = `.join('')`

*Cost: 16 bytes*
```
// n = 2
// 11+(2*2)+(2-1) = 16
// cost: 16 bytes
// ['',''].join('')
var str = ['one', 'two'].join('')
```


### + Strings
Use the `+` to build strings.
* Cost: `(2*n)+(n-1)` bytes
* 2*n bytes = `''`
* n-1 bytes = `,`

*Cost 5 bytes*
```
// n = 2
// (2*2)+(2-1) = 5
// cost: 5 bytes
// ''+''
var string = 'one'+'two'
```

*Cost 17 bytes*
```
// n = 6
// (2*6)+(6-1) = 5
// cost: 17 bytes
// ''+''+''+''+''+''
var string = 'one'+'two'+'three'+'four'+'five'+'six'
```
