#!/bin/bash
FILE_SIZE=$(stat -f%z ./code_uglify_rp.js)
echo SIZE: $FILE_SIZE
# echo ./$FILE_SIZE\_code.js
cp ./code.js versions/$FILE_SIZE\_code_FAIL.js
# babili
rm ./code_babili.js
rm ./code_babili_rp.js
# uglify
rm ./code_uglify.js
rm ./code_uglify_rp.js
