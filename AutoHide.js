// Generated by CoffeeScript 2.0.2
(function() {
  var AutoHide, m, u;

  m = require('mithril');

  u = require('./utils');

  AutoHide = class AutoHide {
    constructor({
        widget: widget, // mithril view
        onHide = u.noOp // () -> a
      }) {
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.widget = widget;
      this.onHide = onHide;
      this.showWidget = false; // Boolean
    }

    onHideInternal(elem) {
      return (e) => {
        if (!elem.contains(e.target)) {
          this.showWidget = false;
        }
        m.redraw();
        // don't cancel event bubbling
        this.onHide();
        return true;
      };
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
      return m('.HideOnBlur', {
        oncreate: function(vnode) {
          return window.addEventListener('click', self.onHideInternal(vnode.dom), true);
        },
        onremove: function() {
          return window.removeEventListener('click', self.onHideInternal(vnode.dom), true);
        }
      }, this.showWidget ? this.widget.view() : void 0);
    }

  };

  module.exports = AutoHide;

}).call(this);
