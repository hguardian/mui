// Generated by CoffeeScript 2.3.0
(function() {
  var AutoHide, Dropdown, m, s, style, u;

  m = require('mithril');

  s = require('mss-js');

  style = require('./style');

  u = require('./utils');

  AutoHide = require('./AutoHide');

  Dropdown = class Dropdown {
    constructor({itemArray, currentIndex, placeholder: placeholder = '', onSelect: onSelect = u.noOp, ifAvailable: ifAvailable = (function() { // String // (String, Int) -> ...
          return true; // (String, Int) -> ture | false
        }), allowEmptySelect: allowEmptySelect = true}) { // Bool
      this.autoComplete = this.autoComplete.bind(this);
      this.onSelectInternal = this.onSelectInternal.bind(this);
      this.itemArray = itemArray; // [String]
      this.currentIndex = currentIndex; // Int | Undefined
      this.placeholder = placeholder;
      this.onSelect = onSelect;
      this.ifAvailable = ifAvailable;
      this.allowEmptySelect = allowEmptySelect;
      if ((this.allowEmptySelect === false) && !this.itemArray[this.currentIndex]) {
        throw "currentIndex is illegal";
      }
      this.filter = '';
      this.autoHideDropDown = new AutoHide({
        onHide: () => {
          return this.filter = '';
        },
        widget: {
          view: () => {
            var i, item;
            return m('ul.DropdownList', {
              onclick: this.onSelectInternal
            }, (function() {
              var j, len, ref, results;
              ref = this.itemArray;
              results = [];
              for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if ((item.indexOf(this.filter)) !== -1) {
                  results.push(m('li.DropdownItem', {
                    oncreate: u.scrollToView,
                    key: i,
                    className: (this.currentIndex === i ? 'Current ' : '') + (this.ifAvailable(item, i) ? 'Available' : ''),
                    'data-index': i,
                    'data-content': item
                  }, item));
                }
              }
              return results;
            }).call(this));
          }
        }
      });
    }

    autoComplete(e) {
      this.filter = (u.getTarget(e)).value;
      if (this.filter === '') {
        return this.currentIndex = void 0;
      }
    }

    onSelectInternal(e) {
      var content, index;
      if (u.targetHasClass(u.getTarget(e), 'Available')) {
        index = parseInt(u.getTargetData(e, 'index'));
        content = u.getTargetData(e, 'content');
        if (!isNaN(index)) {
          this.currentIndex = index;
          this.filter = '';
          this.autoHideDropDown.hide();
          this.onSelect(content, index);
        }
      }
      return u.cancelBubble(e);
    }

    view() {
      return m('.Dropdown', {
        onclick: this.autoHideDropDown.show
      }, m('input.DropdownInput', {
        disabled: this.allowEmptySelect ? '' : 'true',
        onkeyup: this.autoComplete,
        placeholder: this.placeholder,
        value: this.filter ? this.filter : this.currentIndex != null ? this.itemArray[this.currentIndex] : ''
      }), this.autoHideDropDown.view());
    }

  };

  Dropdown.mss = {
    Dropdown: {
      position: 'relative',
      width: '200px',
      DropdownInput: {
        display: 'block',
        lineHeight: '2em',
        fontSize: '0.9em',
        width: '100%',
        padding: 0,
        textAlign: 'center',
        border: '1px solid ' + style.border[4],
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      'DropdownInput[disabled]': {
        cursor: 'pointer'
      },
      DropdownList: {
        position: 'absolute',
        top: '1.9em',
        border: '1px solid #ccc',
        width: '198px',
        height: '200px',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        background: '#fff',
        overflowY: 'auto',
        zIndex: 999,
        DropdownItem: s.LineSize('2em', '0.9em')({
          textAlign: 'center',
          overflowX: 'hidden',
          padding: '0 4px',
          margin: 0,
          color: style.text[5],
          $hover: {
            cursor: 'pointer',
            background: style.main[5],
            color: style.text[8]
          }
        }),
        Available: {
          color: style.text[0]
        },
        Current: {
          background: style.main[4],
          color: style.text[8]
        }
      }
    }
  };

  module.exports = Dropdown;

}).call(this);
