.PHONY: default server uglify ugilfy_regpack minify minify_regpack

default: uglify minify

server:
	npx http-server

uglify:
	npx uglify-es index.js --screw-ie8 --mangle toplevel,reserved=['a','b']  --compress collapse_vars,pure_getters  > code_uglify.js
	stat -f%z ./code_uglify.js

ugilfy_regpack:
	npx regpack code_uglify.js --useES6 true > code_uglify_rp.js
	stat -f%z ./code_uglify_rp.js

minify:
	npx babel-minify index.js --mangle --evaluate -o code_minify.js
	stat -f%z ./code_minify.js

minify_regpack:
	npx regpack code_minify.js --useES6 true > code_minify_rp.js
	stat -f%z ./code_minify_rp.js
