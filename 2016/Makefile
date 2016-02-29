.PHONY: all server run clean compress

LIB := ./node_modules
BIN := $(LIB)/.bin
DIST := public

all: node_modules run

run: server
	open http://localhost:3000/index.html

server:
	$(BIN)/http-server -p 3000

compress:
	$(BIN)/uglifyjs $(DIST)/code.js --screw-ie8 --mangle --compress > $(DIST)/code_c.js

clean:
	npm cache clean
	-rm -R node_modules/

node_modules/: package.json
	npm install
	touch $@
