
CompositeDisposable = require('atom').CompositeDisposable;

generator = require('./generator');

ext = "max";
encoding = "utf8";

module.exports = {

  subscriptions: null,

  activate: function activate() {

    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'minify-html:minify': this.minify
    }));
  },

  deactivate: function deactivate() {
    this.subscriptions.dispose();
  },

  minify: function minify() {
    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {

      var filePath = atom.workspace.getActiveTextEditor().getPath();
      var len = filePath.length;
      var extLen = ext.length;
      // if file name ends in .html
      if ( filePath.substring(len-5) == ".html" ) {
        //html file detected

        // if a file name that ends in .max.html exists
        if (filePath.substring(len-extLen-6) == ("." + ext + ".html")) {
          // extension detected

          // generate HTML
          generator(filePath, ext, true, encoding);
        } else {
          // generate HTML
          generator(filePath, ext, false, encoding);
          // open .max.html file
          atom.workspace.open(filePath.substring(0,len-4) + ext + ".html");
        }
        atom.notifications.addSuccess("HTML Minify Success!");
      } else {
        // no html file is detected
        atom.notifications.addError("HTML Minify Error!", {description: "Make sure the active file is an HTML file."});

      }

    }

  }

};
