const closedValue = null;

window.Modal = new class {
  constructor() {
    this._currentModal = new ReactiveVar(closedValue);
    this._onCloseGoTo = '';
  }

  getStyle() {
    const currentModal = this._currentModal.get();
    return currentModal && currentModal.style;
  }

  getHeaderName() {
    const currentModal = this._currentModal.get();
    return currentModal && currentModal.header;
  }

  getTemplateName() {
    const currentModal = this._currentModal.get();
    return currentModal && currentModal.modalName;
  }

  isOpen() {
    return this.getTemplateName() !== closedValue;
  }

  close() {
    this._currentModal.set(closedValue);
    if (this._onCloseGoTo) {
      FlowRouter.go(this._onCloseGoTo);
    }
  }

  open(modalName, { header = '', onCloseGoTo = '', style = '' } = {}) {
    this._currentModal.set({ header, modalName, style });
    this._onCloseGoTo = onCloseGoTo;
  }
}();

Blaze.registerHelper('Modal', Modal);

EscapeActions.register('modalWindow',
  () => Modal.close(),
  () => Modal.isOpen(),
  { noClickEscapeOn: '.modal-content' }
);
