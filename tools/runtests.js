var files,

FS           = require('fs'),
PATH         = require('path'),

NODEUNIT     = require('nodeunit'),

FILE_MATCHER = /test\.js$/,

TESTS_DIR    = PATH.resolve(process.argv[2]);

files = FS
  .readdirSync(TESTS_DIR)
  .map(relativePath)
  .filter(filterFile);

NODEUNIT.reporters.default.run(files, null);

function relativePath(filename) {
  return PATH.join(TESTS_DIR, filename);
}

function filterFile(filepath) {
  return FILE_MATCHER.test(filepath);
}
