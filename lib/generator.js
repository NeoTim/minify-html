
// generator function
//
// Given a file path to an HTML file and an extension, create two HTML file
// copies: one minified and named the same as the original file, and the other
// named with the extension and an identical copy of the initial file.
// If the file path already includes the extension, make no changes to this file
// and minify the html file without the extension.
//
// Example:
// index.html
// is converted into
// index.html (minified) and index.ext.html (original)

// parameters are as follows:
// filePath - the path to the .html file detected.
// ext - the extension to be used.
// hasExt - boolean whether the filePath is a .max.html file.
// encoding - the encoding used for the files

module.exports = function (filePath, ext, isExt, encoding) {
  minifier = require('./minifier');
  inline = require('./inline');
  fs = require('fs');

  if (isExt) {
      // if extension is present

      var len = filePath.length;
      var extLen = ext.length;
      // store minified HTML into a String
      var data = minifier(filePath, encoding);
      // minify inline scripts
      //var data = inline(filePath, data, encoding);
      // generate filePath for regular .html file
      var minFilePath = filePath.substring(0,len-(extLen+5)) + "html";
      // write minified HTML to .html file
      fs.writeFile(minFilePath, data, function() {});
  } else {
    // if extension is not found

    var len = filePath.length;
    // read .html file and store contents in a String
    var maxData = fs.readFileSync(filePath, encoding);
    // write .html to .max.html
    fs.writeFileSync(filePath.substring(0,len-4) + ext + ".html", maxData);
    // minify data
    var data = minifier(filePath, encoding);
    // minify inline scripts
    //var data = inline(filePath, data, encoding);
    // write data to initial .html file
    fs.writeFile(filePath, data, function() {});
  }

};
