'use babel';

import MinifyHtmlView from './minify-html-view';
import { CompositeDisposable } from 'atom';

export default {

  minifyHtmlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.minifyHtmlView = new MinifyHtmlView(state.minifyHtmlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.minifyHtmlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'minify-html:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.minifyHtmlView.destroy();
  },

  serialize() {
    return {
      minifyHtmlViewState: this.minifyHtmlView.serialize()
    };
  },

  toggle() {
    console.log('MinifyHtml was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
