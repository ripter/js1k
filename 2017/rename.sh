#!/bin/bash
FILE_SIZE=$(stat -f%z ./code_rp.js)
echo SIZE: $FILE_SIZE
# echo ./$FILE_SIZE\_code.js
cp ./code.js ./$FILE_SIZE\_code.js
mv ./code_c.js ./$FILE_SIZE\_code_c.js
mv ./code_rp.js ./$FILE_SIZE\_code_rp.js
