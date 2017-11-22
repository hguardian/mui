// Generated by CoffeeScript 2.0.2
(function() {
  var Modal, m, s, style, u;

  m = require('mithril');

  s = require('mss-js');

  u = require('./utils');

  style = require('./style');

  Modal = class Modal {
    constructor({
        widget: widget, // mithril view
        clickToHide = true, // Boolean
        escToHide = true, // Boolean
        onHide = u.noOp // () -> a
      }) {
      this.onClickInternal = this.onClickInternal.bind(this);
      this.onEscInternal = this.onEscInternal.bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.widget = widget;
      this.clickToHide = clickToHide;
      this.escToHide = escToHide;
      this.onHide = onHide;
      this.showWidget = false;
    }

    onClickInternal(e) {
      var t;
      t = u.getTarget(e);
      if (this.clickToHide && ((u.targetHasClass(t, 'Modal')) || (u.targetHasClass(t, 'HVCenter')))) {
        return this.hide();
      }
    }

    onEscInternal(e) {
      // esc key
      if ((e.key === 'Escape' || e.keyCode === 27) && this.escToHide) {
        this.showWidget = false;
        m.redraw();
        return true;
      }
    }

    show() {
      return this.showWidget = true;
    }

    hide() {
      this.showWidget = false;
      return this.onHide();
    }

    view() {
      var self;
      self = this;
      if (this.showWidget) {
        return m('.Modal', {
          onclick: this.onClickInternal,
          oncreate: function() {
            return window.addEventListener('keyup', self.onEscInternal, true);
          },
          onremove: function() {
            return window.removeEventListener('keyup', self.onEscInternal, true);
          }
        }, m('.HVCenter', this.widget.view()));
      }
    }

  };

  Modal.mss = {
    Modal: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      background: style.modalBG,
      zIndex: 9999,
      $before: {
        content: '""',
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle'
      },
      HVCenter: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        opacity: 1,
        verticalAlign: 'middle'
      }
    }
  };

  module.exports = Modal;

}).call(this);
