.PHONY: default

default: uglify minify

server:
	npx http-server

uglify:
	npx uglify-es index.js --screw-ie8 --mangle toplevel --compress collapse_vars,pure_getters  > code_uglify.js

minify:
	npx babel-minify index.js --mangle --evaluate -o code_minify.js
