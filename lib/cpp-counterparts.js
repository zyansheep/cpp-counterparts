'use babel';

import CppCounterpartsView from './cpp-counterparts-view';
import { CompositeDisposable } from 'atom';

export default {

  cppCounterpartsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cppCounterpartsView = new CppCounterpartsView(state.cppCounterpartsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cppCounterpartsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cpp-counterparts:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cppCounterpartsView.destroy();
  },

  serialize() {
    return {
      cppCounterpartsViewState: this.cppCounterpartsView.serialize()
    };
  },

  toggle() {
    console.log('CppCounterparts was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
