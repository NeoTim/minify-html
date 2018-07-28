
// minifier function
//
// Given a .html file path, the function will return a minifed String
// of the file's HTML content.

module.exports = function(filePath) {
  fs = require('fs');

  var result;

  // store file contents into String
  var raw = fs.readFileSync(filePath, encoding);
  // minify string
  result = raw.replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/<!--.*-->/g,'');
  // output result
  return result;
}
