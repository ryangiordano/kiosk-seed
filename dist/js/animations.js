'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(options, animation, setup) {
        _classCallCheck(this, Animation);

        for (var key in options) {
            console.log(key);
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.animation = animation;
        this.setup = setup;
        this.tl = new TimelineMax();
        this.init();
    }

    _createClass(Animation, [{
        key: 'init',
        value: function init() {
            if (this.requireSetup) {
                this.setUpAnimation();
            }
            if (this.immediate) {
                return this.runAnimation();
            }
            this.setEventListeners(this.triggerSelector);
        }
    }, {
        key: 'runAnimation',
        value: function runAnimation(destination) {
            return this.animation(this.tl, destination);
        }
    }, {
        key: 'setUpAnimation',
        value: function setUpAnimation() {
            return this.setup(this.tl);
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners(triggerSelector) {
            console.log("setting event listeners");
            var that = this;
            $(triggerSelector).on('click', function (e) {
                e.preventDefault();
                that.runAnimation($(this).attr('href'));
            });
        }
    }]);

    return Animation;
}();

var Slide = function (_Animation) {
    _inherits(Slide, _Animation);

    function Slide(options, animation, setup) {
        _classCallCheck(this, Slide);

        var _this = _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this, options));

        if (_this.from && _this.to) {
            console.error("Can only specifiy one direction");
        }
        return _this;
    }

    _createClass(Slide, [{
        key: 'runAnimation',
        value: function runAnimation(destination) {
            this.tl.staggerTo(redBoxes, 1, {
                opacity: 1,
                y: 0,
                onComplete: Kiosk.test,
                onCompleteParams: [destination]
            }, .3);
        }
    }, {
        key: 'setUpAnimation',
        value: function setUpAnimation() {
            this.tl.set(redBoxes, {
                opacity: this.fadeIn ? 0 : 1,
                y: -100
            });
        }
    }]);

    return Slide;
}(Animation);