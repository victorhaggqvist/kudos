'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Kudoable
 *
 * Based of https://github.com/masukomi/kudos kudos.js
 *
 * @author Victor Häggqvist
 * @since 2016-01-11
 */

var Kudoable = function () {
    function Kudoable(element) {
        _classCallCheck(this, Kudoable);

        this.element = document.querySelector(element);
        if (this.element === null) {
            throw 'Failed to find an element for "' + element + '", check the Kudos readme for help';
        }
        this.bindEvents();

        this.counter = this.element.querySelector('.count .num');
    }

    _createClass(Kudoable, [{
        key: 'bindEvents',
        value: function bindEvents() {
            this.element.onmouseover = this.start.bind(this);
            this.element.onmouseout = this.end.bind(this);
            this.element.onclick = this.unkudo.bind(this);
            this.element.ontouchstart = this.start.bind(this);
            this.element.ontouchend = this.end.bind(this);
        }
    }, {
        key: 'isKudoable',
        value: function isKudoable() {
            return this.element.classList.contains('kudoable');
        }
    }, {
        key: 'isKudod',
        value: function isKudod() {
            return this.element.classList.contains('complete');
        }
    }, {
        key: 'start',
        value: function start() {
            if (this.isKudoable() && !this.isKudod()) {
                this.element.dispatchEvent(new Event('kudo:active'));
                this.element.classList.add('active');
                return this.timer = setTimeout(this.complete.bind(this), 700);
            }
        }
    }, {
        key: 'complete',
        value: function complete() {
            this.end();
            this.incrementCount();
            this.element.classList.add('complete');

            this.element.dispatchEvent(new Event('kudo:added'));
            if (this.onAddedCallback !== undefined) {
                this.onAddedCallback(this.element);
            }
        }
    }, {
        key: 'end',
        value: function end() {
            if (this.isKudoable() && !this.isKudod()) {
                this.element.dispatchEvent(new Event('kudo:inactive'));
                this.element.classList.remove('active');

                if (this.timer != null) {
                    clearTimeout(this.timer);
                }
            }
        }
    }, {
        key: 'unkudo',
        value: function unkudo(event) {
            event.preventDefault();
            if (this.isKudod()) {
                this.decrementCount();
                this.element.classList.remove('complete');
                this.element.dispatchEvent(new Event('kudo:removed'));
                if (this.onRemovedCallback !== undefined) {
                    this.onRemovedCallback(this.element);
                }
            }
        }
    }, {
        key: 'setCount',
        value: function setCount(count) {
            this.counter.innerHTML = count;
        }
    }, {
        key: 'currentCount',
        value: function currentCount() {
            return parseInt(this.counter.innerHTML);
        }
    }, {
        key: 'incrementCount',
        value: function incrementCount() {
            this.setCount(this.currentCount() + 1);
        }
    }, {
        key: 'decrementCount',
        value: function decrementCount() {
            this.setCount(this.currentCount() - 1);
        }
    }, {
        key: 'onAdded',
        value: function onAdded(func) {
            this.onAddedCallback = func;
        }
    }, {
        key: 'onRemoved',
        value: function onRemoved(func) {
            this.onRemovedCallback = func;
        }
    }]);

    return Kudoable;
}();