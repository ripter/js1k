#!/bin/bash
FILE_SIZE=$(stat -f%z ./code_uglify_rp.js)
echo SIZE: $FILE_SIZE
# echo ./$FILE_SIZE\_code.js
cp ./code.js versions/$FILE_SIZE\_code.js
# babili
mv ./code_babili.js versions/$FILE_SIZE\_code_babili.js
mv ./code_babili_rp.js versions/$FILE_SIZE\_code_babili_rp.js
# uglify
mv ./code_uglify.js versions/$FILE_SIZE\_code_uglify.js
mv ./code_uglify_rp.js versions/$FILE_SIZE\_code_uglify_rp.js
