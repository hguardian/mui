// Generated by CoffeeScript 1.10.0
(function() {
  var TextInput, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = require('mithril');

  s = require('mss-js');

  style = require('./style');

  u = require('./utils');

  TextInput = (function() {
    function TextInput(arg) {
      var ref, ref1, ref2, ref3;
      this.content = (ref = arg.content) != null ? ref : '', this.disabled = (ref1 = arg.disabled) != null ? ref1 : false, this.placeholder = (ref2 = arg.placeholder) != null ? ref2 : '', this.onChange = (ref3 = arg.onChange) != null ? ref3 : (function() {});
      this.onChangeInternal = bind(this.onChangeInternal, this);
      this.validationMsg = '';
    }

    TextInput.prototype.submit = function() {
      if (this.validationMsg === '') {
        return this.content;
      } else {
        return new Error(this.validationMsg);
      }
    };

    TextInput.prototype.validateInternal = function(c) {};

    TextInput.prototype.onChangeInternal = function(e) {
      var c;
      c = (u.getTarget(e)).value;
      e = this.onChange(c);
      this.validationMsg = '';
      if (e instanceof Error) {
        this.validationMsg = e.message;
      }
      return this.content = c;
    };

    TextInput.prototype.view = function() {
      return m('.TextInput', m('input.Input', {
        disabled: this.disabled,
        onchange: this.onChangeInternal,
        value: this.content,
        placeholder: this.placeholder
      }), this.validationMsg !== '' ? m('.ValidationMsg', this.validationMsg) : void 0);
    };

    return TextInput;

  })();

  TextInput.mss = {
    TextInput: s.LineSize('2em', '1em')({
      width: '200px',
      position: 'relative',
      Input: {
        display: 'block',
        border: '1px solid ' + style.border[5],
        width: '100%',
        height: '100%',
        padding: '0 0.4em'
      },
      ValidationMsg: {
        background: style.warn[5],
        color: style.text[8],
        position: 'absolute',
        top: 0,
        left: '100%',
        textAlign: 'center',
        width: '200px',
        zIndex: 99,
        $before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-2em',
          width: 0,
          height: 0,
          border: '1em solid transparent',
          borderRight: '1em solid ' + style.warn[5]
        }
      }
    })
  };

  module.exports = TextInput;

}).call(this);