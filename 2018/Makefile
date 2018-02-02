.PHONY: default

default: babili uglify


server:
	npx http-server


babili:
	npx babili index.js -o code_babili.js

uglify:
	npx uglifyjs index.js --screw-ie8 --mangle toplevel --compress collapse_vars,pure_getters  > code_uglify.js
