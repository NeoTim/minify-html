// given a css file, minifies the file and returns as a string
function minifyCss(filePath, data, encoding) {
  fs = require('fs');
  path = require('path');

  // temporarily store data into final variable
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
      // get css path
      var cssPath = path.dirname(filePath)+'/'+href;
      // read css
      var cssRaw = fs.readFileSync(cssPath, encoding);
      // store each css instance of url() in urlArr
      var urlPos = 0; var urlArr = [];
      while (urlPos != -1) {
        var temp = cssRaw.indexOf("url(", urlPos+1);
        urlPos = temp;
        if (urlPos >= 0) urlArr.push(urlPos);
      }
      // reverse array to account for offset
      urlArr = urlArr.reverse();
      // for each url()
      urlArr.forEach(function(u) {
        var urlEnd = cssRaw.indexOf(')',u);
        var url = cssRaw.substring(u+4, urlEnd);
        // remove quotes
        url = url.replace(/\"/g,"").replace(/'/g,"");
        // get path from html file to asset
        var newUrl = path.relative(path.dirname(filePath),path.dirname(cssPath)+'/'+url);
        // switch backslashes to forward slashes so browsers can understand urls
        newUrl = newUrl.replace(/\\/g, '/');
        // output everything before 'url(', path, then ending ')'
        cssRaw = cssRaw.substring(0,u+4)+newUrl+cssRaw.substring(urlEnd);
      });
      // minify css and store to var
      var css = cssRaw.replace(/;\s+/g,";").replace(/}\s+/g,"}").replace(/{\s+/g,"{");

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

// given a javascript file, minifies the file and returns as a string
function minifyJs(filePath, data, encoding) {
  fs = require('fs');
  path = require('path');

  // temporarily store data into final variable
  var result = data;
  var js = "";

  // store each instance index of "<script" in scriptArr
  var scPos = 0; var scriptArr = [];
  while (scPos != -1) {
    var temp = data.indexOf("<script", scPos+1);
    scPos = temp;
    if (scPos >= 0) scriptArr.push(scPos);
  }

  // reverse array to account for offset
  scriptArr = scriptArr.reverse();

  // for each <script> instance
  scriptArr.forEach(function (i) {
    // store end tag
    var endTag = data.indexOf(">", i)+1;
    // store entire <script> tag in scriptTag
    var scriptTag = data.substring(i, endTag);
    // store end </script> tag
    var endScript = data.indexOf("</script>", endTag);

    // find src
    var srcStart = scriptTag.indexOf("src=");
    // if src doesn't exist
    if (srcStart < 0) {
      // find and store js to var
      var jsRaw = data.substring(endTag, endScript);
      js = jsRaw.replace(/;\s+/g,";").replace(/}\s+/g,"}").replace(/{\s+/g,"{").replace(/:\s+/g,":");
    } else {
      srcStart += 4;
      // look for single or double quotes respectively
      var srcSelector = "\"";
      if (scriptTag.substring(srcStart,srcStart+1) != srcSelector) srcSelector = "'";
      // store filePath
      var src = scriptTag.substring(srcStart+1, scriptTag.indexOf(srcSelector, srcStart+1));

      // minify js and store to var
      var jsRaw = fs.readFileSync(path.dirname(filePath)+"/"+src, encoding);
      js = jsRaw.replace(/;\s+/g,";").replace(/}\s+/g,"}").replace(/{\s+/g,"{").replace(/:\s+/g,":");

    }
    result = result.substring(0, i) + "<script>" + js + result.substring(endScript);

  });

  return result;
}

// given .html code in the form of a string, parses for external script links
// and places them inline with the rest of the html.
function inline(filePath, data, encoding) {
  // give result a temporary value
  var result = data;

  result = minifyJs(filePath, data, encoding);
  result = minifyCss(filePath, data, encoding);

  return result;
}


module.exports = inline;
