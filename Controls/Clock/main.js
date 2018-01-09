'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
    function Clock(id) {
        _classCallCheck(this, Clock);

        var el = document.getElementById(id);
        this.handHr = el.querySelector('.clock__hand--hour');
        this.handMin = el.querySelector('.clock__hand--minute');
        this.handSec = el.querySelector('.clock__hand--second');

        this.setTime();
        this.init();
    }

    Clock.prototype.tick = function tick(hrs, mins, secs) {
        var degHrs = hrs / 12 * 360 + 90;
        var degMins = mins / 60 * 360 + 90;
        var degSecs = secs / 60 * 360 + 90;

        this.handHr.style.transform = 'rotate(' + degHrs + 'deg)';
        this.handMin.style.transform = 'rotate(' + degMins + 'deg)';
        this.handSec.style.transform = 'rotate(' + degSecs + 'deg)';

        if (degSecs === 90) {
            this.handSec.style.transitionDuration = "0s";
        } else {
            this.handSec.style.transitionDuration = "0.1s";
        }
    };

    Clock.prototype.setTime = function setTime() {
        var now = new Date();
        var hrs = now.getHours();
        var mins = now.getMinutes();
        var secs = now.getSeconds();

        this.tick(hrs, mins, secs);
    };

    Clock.prototype.init = function init() {
        setInterval(this.setTime.bind(this), 1000);
    };

    return Clock;
}();

var clock = new Clock("new-clock");