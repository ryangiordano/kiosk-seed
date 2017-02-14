"use strict";

/* Website Produced by Codigo |  gocodigo.com */
var MIT = new Kiosk();

$(function () {
    FastClick.attach(document.body);
});

$("#submit-button").click(function () {
    $("#form").submit();
    return false;
});