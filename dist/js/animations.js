"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(options, animation, setup) {
        _classCallCheck(this, Animation);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.requireSetup = this.requireSetup || true;
        this.axis = this.from === "top" || this.from === "bottom" ? "y" : "x";
        this.direction = this.from === "left" || this.from === "top" ? "-" : "";
        this.target = document.querySelectorAll(this.target);
        this.animation = animation;
        this.setup = setup;
        this.tl = new TimelineMax();
        this.init();
    }

    _createClass(Animation, [{
        key: "init",
        value: function init() {
            if (this.requireSetup) {
                this.setUpAnimation();
            }

            if (!this.triggerSelector) {
                return this.runAnimation();
            }
            this.setEventListeners(this.triggerSelector);
        }
    }, {
        key: "runAnimation",
        value: function runAnimation(destination) {
            return this.animation(this.tl, destination);
        }
    }, {
        key: "setUpAnimation",
        value: function setUpAnimation() {
            return this.setup(this.tl);
        }
    }, {
        key: "setEventListeners",
        value: function setEventListeners(triggerSelector) {
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
        key: "runAnimation",
        value: function runAnimation(destination) {
            var axis = this.axis,
                plusMinus = void 0;
            var animateObject = {};
            animateObject['opacity'] = this.fadeIn ? 1 : 0;
            animateObject[axis] = 0;
            this.tl.staggerTo(redBoxes, 1, animateObject, .3);
        }
    }, {
        key: "setUpAnimation",
        value: function setUpAnimation() {
            var axis = this.axis,
                plusMinus = void 0;
            var setObject = {};
            setObject['opacity'] = this.fadeIn ? 0 : 1;
            setObject[axis] = this.direction + "100";
            console.log(setObject);
            this.tl.set(redBoxes, setObject);
        }
    }]);

    return Slide;
}(Animation);

var SlideDown = function (_Slide) {
    _inherits(SlideDown, _Slide);

    function SlideDown(options) {
        _classCallCheck(this, SlideDown);

        var _this2 = _possibleConstructorReturn(this, (SlideDown.__proto__ || Object.getPrototypeOf(SlideDown)).call(this, options));

        _this2.from = "top";
        console.log(_this2.from);
        _this2.axis = _this2.from === "top" || _this2.from === "bottom" ? "y" : "x";
        _this2.direction = _this2.from === "left" || _this2.from === "top" ? "-" : "";
        return _this2;
    }

    return SlideDown;
}(Slide);