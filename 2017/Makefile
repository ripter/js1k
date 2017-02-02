.PHONY: all

BIN := ./node_modules/.bin

all: server

server:
	$(BIN)/http-server

compress:
	$(BIN)/uglifyjs $(DIST)/code.js --screw-ie8 --mangle --compress > $(DIST)/code_c.js
