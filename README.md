mui
===

A very simple ui library collection.

For demo and document, please check this little [demo page](http://winterland1989.github.io/mui/).

If you find bugs or get confused, fill a issue please.

usage
-----

+ run `npm i --save mui-js mithril mmsvg mss-js`.

+ use `webpack` as build tool.

Example usage:

```coffeescript
m = require 'mithril'
s = require 'mss-js'
Modal = require 'mui-js/Modal'  # webpack support this requiring style!

# we use coffee class instead of mithril controller here
class Demo
    constructor: ->
        @modalElem = new Modal
            widget: view: ->
                m 'h', 'hello wolrd'


    view: -> [
        m 'button', {onclick: @modalElem.show}, 'show me'
        @modalElem.view()
    ]

# inject style into page before injecting dom
s.tag Modal.mss

m.mount main, new Demo()
```

These stateful components can keep your model out of toggle flag or clutter text, and mithril's whole diff engine keep your view sync with dom. so connect them as you wish, don't worried too much about data flow.

index
-----

+ AutoHide, add *hide on blur* to a widget (click anywhere outside will hide the widget).

+ Button, button with attachable data, prefix/suffix icon.

+ Button, button group with multiple selection by default.

+ Collaspe, aka. accordion widget.

+ DatePicker, a simple date picker w/wo time select.

+ DropDown, a drop down selector.

+ Modal, add modal to a widget with auto centering.

+ Switch, a simple toggle button.

+ TextInput, a text input with validation.

+ Notify, global notify group

+ i18n/style, feel free to modify. 

+ utils, a helpers collection:

    + supporting this little library down to IE9

    + use `utils.svg` to fix `m.trust` svg glitch.

    + some widget function(spinner...).

    + `debounce` with leading/trailing trigger.

customization
-------------

This library is intended to use with customization if needed, just run `npm run dev` under mui folder and change anything you want.


license
-------

Please do whatever you want to with this library : )
