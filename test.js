
var fs = require('fs');

fs.writeFile("output.txt", "heyyyyy", function() {
  console.log('yo');
});
