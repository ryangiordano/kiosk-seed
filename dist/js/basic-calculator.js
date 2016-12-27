
window.onload = function() {

    var current,
        screen = document.getElementById("result"),
        output,
        limit,
        zero,
        period,
        operator;

    //Add an event listener to each calculator button
    var elem = document.querySelectorAll(".num");

    var len = elem.length;

    for (var i = 0; i < len; i++) {

        elem[i].addEventListener("click", function() {

            num = this.value;

            output = screen.innerHTML += num;

            if (limit >= 14) {

                alert("Limit Reached")

            }

        }, false);

    }

    document.querySelector(".zero").addEventListener("click", function() {

        zero = this.value;

        if (screen.innerHTML === "") {

            output = screen.innerHTML = zero;
        } else if (screen.innerHTML === output) {

            output = screen.innerHTML += zero;

        }

    }, false);

    document.querySelector(".period").addEventListener("click", function() {

        period = this.value;

        if (screen.innerHTML === "") {

            output = screen.innerHTML = screen.innerHTML.concat("0.");

        } else if (screen.innerHTML === output) {

            screen.innerHTML = screen.innerHTML.concat(".");

        }

    }, false);


    document.querySelector("#eqn-bg").addEventListener("click", function() {

        if (screen.innerHTML === output) {

            screen.innerHTML = eval(output);
        } else {
            screen.innerHTML = "";
        }

    }, false);

    document.querySelector("#clear").addEventListener("click", function() {

        screen.innerHTML = "";

    }, false);
    document.querySelector('#del').addEventListener("click",function(){
      screen.innerHTML= screen.innerHTML.slice(0,-1);
    },false);

    var elem1 = document.querySelectorAll(".operator");

    var len1 = elem1.length;

    for (var i = 0; i < len1; i++) {

        elem1[i].addEventListener("click", function() {

            operator = this.value;

            if (screen.innerHTML === "") {

                screen.innerHTML = screen.innerHTML.concat("");

            } else if (output) {

                screen.innerHTML = output.concat(operator);

            }

        }, false);

    }
}
