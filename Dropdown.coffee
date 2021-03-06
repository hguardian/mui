m = require 'mithril'
s = require 'mss-js'
downIcon = require 'mmsvg/google/msvg/navigation/expand-more'
style = require './style'
u = require './utils'

AutoHide = require './AutoHide'

class Dropdown
    constructor: ({
        @itemArray               # [String]
    ,   @currentIndex            # Int | Undefined
    ,   @placeholder  = ''       # String
    ,   @onSelect = u.noOp         # (String, Int) -> ...
    ,   @ifAvailable = (-> true)   # (String, Int) -> ture | false
    ,   @allowEmptySelect = true   # Bool
    ,   @showDownArrow = true
    }) ->

        if (@allowEmptySelect == false) and !@itemArray[@currentIndex]
            throw "currentIndex is illegal"

        @filter = ''
        @autoHideDropDown = new AutoHide
            onHide: => @filter = ''
            widget: view: =>
                m 'ul.DropdownList', onclick: @onSelectInternal,
                    for item, i in @itemArray when ((item.indexOf @filter) != -1)
                        m 'li.DropdownItem'
                        ,
                            oncreate: u.scrollToView
                            key: i
                            className:
                                (if @currentIndex == i then 'Current ' else '') +
                                (if @ifAvailable(item, i) then 'Available' else '')
                            'data-index': i
                            'data-content': item
                        , item

    autoComplete: (e) =>
        @filter = (u.getTarget e).value
        if @filter == '' then @currentIndex = undefined


    onSelectInternal: (e) =>
        if u.targetHasClass (u.getTarget e), 'Available'
            index = parseInt u.getTargetData(e, 'index')
            content = u.getTargetData e, 'content'
            unless isNaN index
                @currentIndex = index
                @filter = ''
                @autoHideDropDown.hide()
                @onSelect(content, index)
        u.cancelBubble e

    view: ->
        m 'div',
            onclick: @autoHideDropDown.show
            className: if @autoHideDropDown.showWidget then "Dropdown Expanded" else "Dropdown"
        ,
            m 'input.DropdownInput',
                disabled: if @allowEmptySelect then '' else 'true'
                onkeyup: @autoComplete
                placeholder: @placeholder
                value:
                    if @filter
                        @filter
                    else if @currentIndex?
                        @itemArray[@currentIndex]
                    else ''
            if @showDownArrow = true
                m '.DownArrow', downIcon
            @autoHideDropDown.view()

Dropdown.mss =
    Dropdown:
        position: 'relative'
        width: '200px'
        DropdownInput:
            display: 'block'
            lineHeight: '2em'
            fontSize: '0.9em'
            width: '100%'
            padding: 0
            textAlign: 'center'
            border: '1px solid ' + style.border[4]
            WebkitAppearance: 'none'
            borderRadius: 0
        'DropdownInput[disabled]':
            cursor: 'pointer'

        DownArrow:
            svg: fill: '#999'
            position: 'absolute'
            top: '0.1em'
            right: '0.3em'
            transition: 'transform .3s ease'

        DropdownList:
            position: 'absolute'
            top: '1.9em'
            border: '1px solid #ccc'
            width: '198px'
            height: '200px'
            margin: 0
            padding: 0
            listStyle: 'none'
            background: '#fff'
            overflowY: 'auto'
            zIndex: 999
            DropdownItem: s.LineSize('2em', '0.9em')
                textAlign: 'center'
                overflowX: 'hidden'
                padding: '0 4px'
                margin: 0
                color: style.text[5]
                $hover:
                    cursor: 'pointer'
                    background: style.main[5]
                    color: style.text[8]

            Available:
                color: style.text[0]

            Current:
                background: style.main[4]
                color: style.text[8]
    Expanded:
        DownArrow:
            transform: 'rotate(180deg)'


module.exports = Dropdown
