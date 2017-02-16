'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicCalculator = function () {
    function BasicCalculator() {
        _classCallCheck(this, BasicCalculator);

        this.current;
        this.output;
        this.limit;
        this.operator;
        this.screen = document.getElementById('result');
    }

    _createClass(BasicCalculator, [{
        key: 'init',
        value: function init() {
            console.log("Calculator initialized");
            this.numberButtonSetup();
        }
    }, {
        key: 'numberButtonSetup',
        value: function numberButtonSetup() {
            var that = this;
            var numberButtons = $('.num'),
                length = numberButtons.length;
            for (var i = 0; i < length; i++) {
                $(numberButtons[i]).on("click", function () {
                    var num = this.value;
                    console.log(that.screen.innerHTML);
                    that.output = that.screen.innerHTML += num;
                    if (that.limit >= 14) {
                        alert("Limit Reached");
                    }
                });
            }
            $(".zero").on("click", function () {
                var zero = this.value;
                if (that.screen.innerHTML === "") {
                    that.output = that.screen.innerHTML = zero;
                } else if (that.screen.innerHTML === that.output) {
                    that.output = that.screen.innerHTML += zero;
                }
            });
            $(".period").on("click", function (e) {
                e.preventDefault();
                var period = this.value;
                if (that.screen.innerHTML === "") {
                    that.output = that.screen.innerHTML = that.screen.innerHTML.concat("0.");
                } else if (that.screen.innerHTML === that.output) {
                    that.screen.innerHTML = that.screen.innerHTML.concat(".");
                }
            });
            $("#eqn-bg").on("click", function (e) {
                e.preventDefault();
                if (that.screen.innerHTML === that.output) {
                    that.screen.innerHTML = eval(that.output);
                } else {
                    that.screen.innerHTML = "";
                }
            });
            $("#clear").on("click", function (e) {
                e.preventDefault();
                that.screen.innerHTML = "";
            });
            $('#del').on("click", function (e) {
                that.screen.innerHTML = that.screen.innerHTML.slice(0, -1);
            });

            var operator = $(".operator");
            var operatorLength = operator.length;
            for (var _i = 0; _i < operatorLength; _i++) {
                operator[_i].addEventListener("click", function (e) {
                    e.preventDefault();
                    operator = this.value;
                    if (that.screen.innerHTML === "") {
                        that.screen.innerHTML = that.screen.innerHTML.concat("");
                    } else if (that.output) {
                        that.screen.innerHTML = that.output.concat(operator);
                    }
                }, false);
            }
        }
    }]);

    return BasicCalculator;
}();