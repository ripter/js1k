#!/bin/bash
FILE_SIZE=$(stat -f%z ./code_rp.js)
echo SIZE: $FILE_SIZE

cp ./code.js ./$FILE_SIZE\_code_FAIL.js
rm ./code_c.js
rm ./code_rp.js
