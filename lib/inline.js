// given a css file, minifies the file and returns as a string
function minifyCss(filePath, encoding) {
  var result = "";
  fs = require('fs');

  var cssRaw = fs.readFileSync(filePath, encoding);
  result = cssRaw.replace(/;\s+/g,";").replace(/}\s+/g,"}").replace(/{\s+/g,"{");

  return result;
}

// given a javascript file, minifies the file and returns as a string
function minifyJs(filePath, encoding) {
  var result = "";
  fs = require('fs');

  var jsRaw = fs.readFileSync(filePath, encoding);
  result = jsRaw.replace(/;\s+/g,";").replace(/}\s+/g,"}").replace(/{\s+/g,"{").replace(/:\s+/g,":");

  return "<script>" + result + "</script>";
}

// given .html code in the form of a string, parses for external script links
// and places them inline with the rest of the html.
function inline(filePath, data, encoding) {
  path = require('path');
  // give result a temporary value
  var result = data;

  // store each instance index of "<link" in linkArr
  var liPos = 0; var linkArr = [];
  while (liPos != -1) {
    var temp = data.indexOf("<link", liPos+1);
    liPos = temp;
    if (liPos >= 0) linkArr.push(liPos);
  }

  // reverse array to account for offset
  linkArr = linkArr.reverse();

  // for each <link> instance
  linkArr.forEach(function (i) {
    // store end tag
    var endTag = data.indexOf(">", i)+1;
    // store entire <link> tag in linkTag
    var linkTag = data.substring(i, endTag);
    // verify the <link> tag is a stylesheet
    if ((linkTag.indexOf("rel=\"stylesheet\"") != -1) ||
        (linkTag.indexOf("rel='stylesheet'") != -1)) {
      // find href
      var hStart = linkTag.indexOf("href=") + 5;
      // look for single or double quotes respectively
      var hrefSelector = "\"";
      if (linkTag.substring(hStart,hStart+1) != hrefSelector) hrefSelector = "'";
      // store filePath
      var href = linkTag.substring(hStart+1, linkTag.indexOf(hrefSelector, hStart+1));

      // minify css and store to var
      var css = minifyCss(path.dirname(filePath)+"/"+href, encoding);

      // find media if available
      var media = "all";
      var mediaStart = linkTag.indexOf("media=");
      if ( mediaStart != -1) {
        // start at quotes
        mediaStart += 6;
        // look for single or double quotes respectively
        var mediaSelector = "\"";
        if (linkTag.substring(mediaStart,mediaStart+1) != mediaSelector) mediaSelector = "'";
        // store media tag
        media = linkTag.substring(mediaStart+1, linkTag.indexOf(mediaSelector, mediaStart+1));
      }

      // replace <link> with script(s)
      result = result.substring(0, i) + "<style>" + "@media " + media + " {" + css + "}" + "</style>" + result.substring(endTag);
    }
  });

  return result;
}


module.exports = inline;
