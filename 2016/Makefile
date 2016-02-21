.PHONY: all server run clean compress

LIB := ./node_modules
BIN := $(LIB)/.bin

all: node_modules run

run: server
	open http://localhost:3000/index.html

server:
	$(BIN)/http-server -p 3000

compress:
	$(BIN)/uglifyjs public/137.js --screw-ie8 --mangle --compress > public/137_c.js
	$(BIN)/uglifyjs public/137_ugly.js --screw-ie8 --mangle --compress > public/137_ugly_c.js
	$(BIN)/uglifyjs public/187.js --screw-ie8 --mangle --compress > public/187_c.js
	$(BIN)/uglifyjs public/195.js --screw-ie8 --mangle --compress > public/195_c.js
	$(BIN)/uglifyjs public/290.js --screw-ie8 --mangle --compress > public/290_c.js
	$(BIN)/uglifyjs public/296.js --screw-ie8 --mangle --compress > public/296_c.js
	$(BIN)/uglifyjs public/300.js --screw-ie8 --mangle --compress > public/300_c.js
	$(BIN)/uglifyjs public/304.js --screw-ie8 --mangle --compress > public/304_c.js
	$(BIN)/uglifyjs public/403.js --screw-ie8 --mangle --compress > public/403_c.js

clean:
	npm cache clean
	-rm -R node_modules/

node_modules/: package.json
	npm install
	touch $@
