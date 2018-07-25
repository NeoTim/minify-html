'use babel';

//import MinifyHtmlView from './minify-html-view';
import { CompositeDisposable } from 'atom'

export default {

  //minifyHtmlView: null,
  //modalPanel: null,
  subscriptions: null,

  activate() {
  //activate(state) {
    //this.minifyHtmlView = new MinifyHtmlView(state.minifyHtmlViewState);
    //this.modalPanel = atom.workspace.addModalPanel({
    //  item: this.minifyHtmlView.getElement(),
    //  visible: false
    //});

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'minify-html:minify': () => this.minify()
    }))
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    //this.minifyHtmlView.destroy();
  },
  /*
  serialize() {
    return {
      minifyHtmlViewState: this.minifyHtmlView.serialize()
    };
  },
  */
  minify() {
    //console.log('MinifyHtml was toggled!');

    /*
    console.log('MinifyHtml was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
    */
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
    /*
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      editor.insertText("4")
    }
    */


  }

};
