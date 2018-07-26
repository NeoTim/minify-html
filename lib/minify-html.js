
CompositeDisposable = require('atom').CompositeDisposable;

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
    /*
    var fs = require('fs');

    fs.writeFile("output.txt", "heyyyyy", function() {
      console.log('yo');
    });
    */
    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      console.log(atom.project.getPaths());

      //atom.workspace.open("test.js");
      /*
      console.log('test 0.0');
      var fs = require('fs');
      console.log(fs);
      //console.log(__dirname);
      var path = __dirname + "\\" + "test123.html";
      //console.log(path);
      fs.writeFileSync(path, "data stuff");
      //console.log('File write complete.');
      //var data = fs.readFileSync("test123.html");
      //console.log(data);
      //fs.writeFileSync("hello.txt", "hello!");
      //fs.writeFileSync
      */
    }

    //fs.writeFileSync("hello.txt", "hello!");

    /*
    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      var selection = editor.getSelectedText();
      var reversed = selection.split('').reverse().join('');
      editor.insertText(reversed);


    }*/

  }

};
