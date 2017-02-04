.PHONY: all
BIN := ./node_modules/.bin

all: server

server:
	$(BIN)/http-server

compress:
	$(BIN)/uglifyjs code.js --screw-ie8 --mangle toplevel --compress collapse_vars,pure_getters  > code_c.js
	$(BIN)/regpack code_c.js > code_rp.js
	stat -f%z ./code_rp.js

rename:
	./rename.sh

rename.fail:
	./rename_fail.sh
