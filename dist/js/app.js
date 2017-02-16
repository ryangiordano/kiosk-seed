"use strict";

/* Website Produced by Codigo |  gocodigo.com */
var MIT = new Kiosk({ project_name: "MIT Community Credit Union" });
MIT.init();

$(function () {
    FastClick.attach(document.body);
});

$("#submit-button").click(function () {
    $("#form").submit();
    return false;
});
var calculator = new BasicCalculator();

calculator.init();