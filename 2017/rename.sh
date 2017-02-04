#!/bin/bash
FILE_SIZE=$(stat -f%z ./code_rp.js)
echo ./code_rm_$FILE_SIZE.js
cp ./code.js ./code_$FILE_SIZE.js
mv ./code_c.js ./code_c_$FILE_SIZE.js
mv ./code_rp.js ./code_rp_$FILE_SIZE.js
