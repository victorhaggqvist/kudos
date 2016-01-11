/**
 * Kudoable
 *
 * Based of https://github.com/masukomi/kudos kudos.js
 *
 * @author Victor Häggqvist
 * @since 2016-01-11
 */

class Kudoable {

    constructor(element) {
        this.element = document.querySelector(element);
        this.bindEvents();

        this.counter = this.element.querySelector('.count .num');
    }

    bindEvents() {
        this.element.onmouseover = this.start.bind(this);
        this.element.onmouseout = this.end.bind(this);
        this.element.onclick = this.unkudo.bind(this);
        this.element.ontouchstart = this.start.bind(this);
        this.element.ontouchend = this.end.bind(this);
    }

    isKudoable() {
        return this.element.classList.contains('kudoable');
    }

    isKudod() {
        return this.element.classList.contains('complete');
    }

    start() {
        if (this.isKudoable() && !this.isKudod()) {
            let event = new Event('kudo:active');
            this.element.dispatchEvent(event);
            this.element.classList.add('active');
            return this.timer = setTimeout(this.complete.bind(this), 700);
        }
    }

    complete() {
        this.end();
        this.incrementCount();
        this.element.classList.add('complete');

        let event = new Event('kudo:added');
        this.element.dispatchEvent(event);
    }

    end() {
        if (this.isKudoable() && !this.isKudod()) {
            this.element.dispatchEvent(new Event('kudo:inactive'));
            this.element.classList.remove('active');

            if (this.timer != null) {
                clearTimeout(this.timer);
            }
        }
    }

    unkudo(event) {
        event.preventDefault();
        if (this.isKudod()) {
            this.decrementCount();
            this.element.classList.remove('complete');
            this.element.dispatchEvent(new Event('kudo:removed'));
        }
    }

    setCount(count) {
        this.counter.innerHTML = count;
    }

    currentCount() {
        return parseInt(this.counter.innerHTML);
    }

    incrementCount() {
        this.setCount(this.currentCount() + 1);
    }

    decrementCount() {
        this.setCount(this.currentCount() - 1);
    }

}
