/* Website Produced by Codigo |  gocodigo.com */
const MIT = new Kiosk({project_name:"MIT Community Credit Union"});
MIT.init();

$(function() {
    FastClick.attach(document.body);
});



$("#submit-button").click(function() {
    $("#form").submit();
    return false;
});
let calculator = new BasicCalculator();

calculator.init();
