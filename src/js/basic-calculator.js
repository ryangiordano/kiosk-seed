class BasicCalculator {
    constructor() {
        this.current;
        this.output;
        this.limit;
        this.operator;
        this.screen = document.getElementById('result');
    }
    init() {
      console.log("Calculator initialized");
      this.numberButtonSetup();
    }
    numberButtonSetup() {
        let that = this;
        let numberButtons = $('.num'),
            length = numberButtons.length;
        for (let i = 0; i < length; i++) {
            $(numberButtons[i]).on("click", function() {
                let num = this.value;
                console.log(that.screen.innerHTML);
                that.output = that.screen.innerHTML += num;
                if (that.limit >= 14) {
                    alert("Limit Reached")
                }
            });
        }
        $(".zero").on("click", function() {
            let zero = this.value;
            if (that.screen.innerHTML === "") {
                that.output = that.screen.innerHTML = zero;
            } else if (that.screen.innerHTML === that.output) {
                that.output = that.screen.innerHTML += zero;
            }
        });
        $(".period").on("click", function(e) {
            e.preventDefault();
            let period = this.value;
            if (that.screen.innerHTML === "") {
                that.output = that.screen.innerHTML = that.screen.innerHTML.concat("0.");
            } else if (that.screen.innerHTML === that.output) {
                that.screen.innerHTML = that.screen.innerHTML.concat(".");
            }
        });
        $("#eqn-bg").on("click", function(e) {
            e.preventDefault();
            if (that.screen.innerHTML === that.output) {
                that.screen.innerHTML = eval(that.output);
            } else {
                that.screen.innerHTML = "";
            }
        });
        $("#clear").on("click", function(e) {
            e.preventDefault();
            that.screen.innerHTML = "";
        });
        $('#del').on("click", function(e) {
            that.screen.innerHTML = that.screen.innerHTML.slice(0, -1);
        });

        let operator = $(".operator");
        let operatorLength = operator.length;
        for (let i = 0; i < operatorLength; i++) {
            operator[i].addEventListener("click", function(e) {
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
}
