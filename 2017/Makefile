.PHONY: all server compress babili uglify rename rename.fail fix.regpack
BIN := ./node_modules/.bin

all: server

server:
	$(BIN)/http-server

compress: babili

babili:
	$(BIN)/babili code.js -o code_babili.js
	$(BIN)/regpack code_babili.js --useES6 true > code_babili_rp.js
	stat -f%z ./code_babili_rp.js

uglify:
	$(BIN)/uglifyjs code.js --screw-ie8 --mangle toplevel --compress collapse_vars,pure_getters  > code_uglify.js
	$(BIN)/regpack code_uglify.js > code_uglify_rp.js
	stat -f%z ./code_uglify_rp.js

rename:
	./rename.sh

rename.fail:
	./rename_fail.sh

fix.regpack:
	dos2unix ./node_modules/regpack/bin/regpack
