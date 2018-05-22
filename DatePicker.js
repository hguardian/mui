// Generated by CoffeeScript 1.12.7
(function() {
  var AutoHide, DatePicker, dateIcon, hourArray, i18n, m, minuteArray, s, secondArray, style, u, x,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = require('mithril');

  s = require('mss-js');

  u = require('./utils');

  AutoHide = require('./AutoHide');

  style = require('./style');

  i18n = require('./i18n');

  dateIcon = require('mmsvg/google/msvg/action/date-range');

  hourArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 23; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  minuteArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 59; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  secondArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 59; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  DatePicker = (function() {
    function DatePicker(arg) {
      var date, ref, ref1;
      date = arg.date, this.selectTime = arg.selectTime, this.ifDateAvailable = (ref = arg.ifDateAvailable) != null ? ref : (function() {
        return true;
      }), this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : u.noOp;
      this.setHMS = bind(this.setHMS, this);
      this.selectDate = bind(this.selectDate, this);
      this.nextYear = bind(this.nextYear, this);
      this.preYear = bind(this.preYear, this);
      this.nextMonth = bind(this.nextMonth, this);
      this.preMonth = bind(this.preMonth, this);
      this.displayDate = new Date(date);
      this.date = new Date(date);
      this.init();
      this.autoHideDatePicker = new AutoHide({
        widget: {
          view: (function(_this) {
            return function() {
              var d, dObj, hour, i, min, second;
              return m('.DatePickerWidget', m('.NavBar', m('span.PreYear', {
                onclick: _this.preYear
              }, '<<'), m('span.PreMonth', {
                onclick: _this.preMonth
              }, '<'), m('span.CurrentMonth', m('span.CurrentYear', _this.displayDate.getFullYear() + '-' + (_this.displayDate.getMonth() + 1))), m('span.NextMonth', {
                onclick: _this.nextMonth
              }, '>'), m('span.NextYear', {
                onclick: _this.nextYear
              }, '>>')), m('.DayBar', (function() {
                var j, len, ref2, results;
                ref2 = i18n.dayName;
                results = [];
                for (j = 0, len = ref2.length; j < len; j++) {
                  d = ref2[j];
                  results.push(m('span.DayName', d));
                }
                return results;
              })()), m('.DateList', {
                onclick: _this.selectDate
              }, (function() {
                var j, ref2, results;
                results = [];
                for (d = j = 0, ref2 = this.startDay + this.totalDay - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; d = 0 <= ref2 ? ++j : --j) {
                  dObj = new Date(this.displayDate);
                  dObj.setDate(d - this.startDay + 1);
                  if (d >= this.startDay) {
                    results.push(m('span.Date', {
                      className: [this.ifDateAvailable(dObj) ? 'Available' : '', ((this.date != null) && dObj.getDate() === this.date.getDate() && dObj.getMonth() === this.date.getMonth() && dObj.getFullYear() === this.date.getFullYear()) ? 'Current' : ''].join(' '),
                      'data-year': dObj.getFullYear(),
                      'data-month': dObj.getMonth(),
                      'data-date': dObj.getDate()
                    }, d - this.startDay + 1));
                  } else {
                    results.push(m('span.NoDate', ''));
                  }
                }
                return results;
              }).call(_this)), _this.selectTime ? [
                m('.TimeBar', m('span.TimeLabel', i18n.hour), m('span.TimeLabel', i18n.minute), m('span.TimeLabel', i18n.second)), m('.TimeList', {
                  onclick: _this.setHMS
                }, m('ul.HourList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = hourArray.length; j < len; i = ++j) {
                    hour = hourArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: hour === u.formatXX(this.date.getHours()) ? 'Current' : '',
                      'data-hour': hour
                    }, hour));
                  }
                  return results;
                }).call(_this)), m('ul.MinuteList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = minuteArray.length; j < len; i = ++j) {
                    min = minuteArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: min === u.formatXX(this.date.getMinutes()) ? 'Current' : '',
                      'data-min': min
                    }, min));
                  }
                  return results;
                }).call(_this)), m('ul.SecondList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = secondArray.length; j < len; i = ++j) {
                    second = secondArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: second === u.formatXX(this.date.getSeconds()) ? 'Current' : '',
                      'data-second': second
                    }, second));
                  }
                  return results;
                }).call(_this)))
              ] : void 0);
            };
          })(this)
        }
      });
    }

    DatePicker.prototype.init = function() {
      var d;
      d = new Date(this.displayDate);
      d.setDate(0);
      this.startDay = d.getDay();
      d = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0);
      return this.totalDay = d.getDate();
    };

    DatePicker.prototype.scrollToView = function(vnode) {
      var elem, offsetTop;
      elem = vnode.dom;
      if (u.targetHasClass(elem, 'Current')) {
        offsetTop = elem.offsetTop;
        return elem.parentNode.scrollTop = offsetTop;
      }
    };

    DatePicker.prototype.preMonth = function(e) {
      this.displayDate.setMonth(this.displayDate.getMonth() - 1);
      this.init();
      return u.cancelBubble(e);
    };

    DatePicker.prototype.nextMonth = function(e) {
      this.displayDate.setMonth(this.displayDate.getMonth() + 1);
      this.init();
      return u.cancelBubble(e);
    };

    DatePicker.prototype.preYear = function(e) {
      this.displayDate.setFullYear(this.displayDate.getFullYear() - 1);
      this.init();
      return u.cancelBubble(e);
    };

    DatePicker.prototype.nextYear = function(e) {
      this.displayDate.setFullYear(this.displayDate.getFullYear() + 1);
      this.init();
      return u.cancelBubble(e);
    };

    DatePicker.prototype.selectDate = function(e) {
      if (u.targetHasClass(u.getTarget(e), 'Available')) {
        this.date.setFullYear(u.getTargetData(e, 'year'));
        this.date.setMonth(u.getTargetData(e, 'month'));
        this.date.setDate(u.getTargetData(e, 'date'));
        this.onSelect(this.date);
        this.displayDate.setDate(this.date.getDate());
        if (!this.selectTime) {
          return this.autoHideDatePicker.hide();
        }
      }
    };

    DatePicker.prototype.setHMS = function(e) {
      var hour, min, second;
      hour = parseInt(u.getTargetData(e, 'hour'));
      if (!isNaN(hour)) {
        this.date.setHours(hour);
      }
      min = parseInt(u.getTargetData(e, 'min'));
      if (!isNaN(min)) {
        this.date.setMinutes(min);
      }
      second = parseInt(u.getTargetData(e, 'second'));
      if (!isNaN(second)) {
        this.date.setSeconds(second);
      }
      return this.onSelect(this.date);
    };

    DatePicker.prototype.view = function() {
      return m('.DatePicker', m('input.DateInput', {
        readonly: true,
        onclick: this.autoHideDatePicker.show,
        value: this.selectTime ? u.formatDateWithHMS(this.date) : u.formatDate(this.date)
      }), m('span.DateIcon', u.svg(dateIcon)), this.autoHideDatePicker.view());
    };

    return DatePicker;

  })();

  DatePicker.mss = {
    DatePicker: {
      width: '250px',
      position: 'relative',
      DateInput: {
        lineHeight: '2em',
        display: 'block',
        fontSize: '0.9em',
        width: '100%',
        padding: 0,
        textAlign: 'center',
        border: '1px solid ' + style.border[4],
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      DateIcon: {
        position: 'absolute',
        svg: {
          fill: style.text[1],
          height: '1.4em',
          width: '1.4em',
          padding: '0.3em'
        },
        top: 0,
        left: 0
      },
      DatePickerWidget: {
        position: 'absolute',
        top: '1.9em',
        left: 0,
        border: '1px solid ' + style.border[4],
        width: '248px',
        background: '#fff',
        zIndex: 999,
        NavBar: {
          padding: '0.3em 0.9em',
          textAlign: 'center',
          lineHeight: '2em',
          height: '2em',
          PreYear_PreMonth_NextMonth_NextYear: {
            display: 'inline-block',
            borderRadius: '50%',
            width: '2em',
            height: '2em',
            $hover: {
              cursor: 'pointer',
              color: style.main[5]
            }
          },
          CurrentMonth: {
            display: 'inline-block'
          }
        },
        DayBar: {
          padding: '4px 12px',
          borderBottom: '1px solid #eee',
          fontSize: '0.9em',
          span: {
            width: '32px',
            display: 'inline-block',
            textAlign: 'center',
            margin: 0
          }
        },
        DateList: {
          padding: '0px 12px 12px',
          lineHeight: '28px',
          span: {
            display: 'inline-block',
            width: '28px',
            height: '28px',
            padding: '2px',
            textAlign: 'center',
            fontSize: '0.9em',
            color: style.text[5],
            margin: 0,
            borderRadius: '50%'
          },
          Current: {
            color: '#fff !important',
            background: style.main[4] + ' !important'
          },
          Available: {
            color: style.text[0],
            $hover: {
              color: '#fff',
              cursor: 'pointer',
              background: style.main[5]
            }
          }
        },
        TimeBar: {
          borderTop: '1px solid ' + style.border[4],
          TimeLabel: {
            padding: '8px 0',
            fontSize: '0.9em',
            display: 'inline-block',
            width: '80px',
            textAlign: 'center'
          }
        },
        TimeList: {
          HourList_MinuteList_SecondList: {
            position: 'relative',
            padding: 0,
            margin: 0,
            marginBottom: '8px',
            display: 'inline-block',
            height: '80px',
            width: '80px',
            overflow: 'auto',
            listStyle: 'none',
            li: {
              fontSize: '0.9em',
              textAlign: 'center',
              margin: '0.2em',
              $hover: {
                color: style.text[8],
                background: style.main[5]
              }
            },
            Current: {
              color: style.text[8],
              background: style.main[4]
            }
          }
        }
      }
    }
  };

  module.exports = DatePicker;

}).call(this);
