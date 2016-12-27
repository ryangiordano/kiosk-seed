"use strict";
//Pull the key from the url.
var key = getQueryVariable("key");
//Find the corresponding pdf in the pdf-data.
var pdf = {
    id: "",
    pdfName: "",
    pdfCopy: "",
    pdfImage: "",
    pdfLink: "",
    bullets: []
};
function populatePDFInfo(key) {
    pdfData.data.map(function (data) {
        if (data.id == key) {
            //putting the info into the pdf object above
            for (var pdfProperty in data) {
                pdf[pdfProperty] = data[pdfProperty];
            }
        }
    });
}
populatePDFInfo(key);
function populatePage() {
    var heading = void 0,
        copy = void 0,
        list = document.getElementById('pdfUl');
    $('#titleHere').html(pdf.pdfName);
    $('#pdfLink').attr('href', pdf.pdfLink);
    $('#pdfImg img').attr('src', "img/pdfs/" + pdf.pdfImage);
    $('#copy').html(pdf.pdfCopy);
    $('#input-pdf-link').attr('value', pdf.pdfLink);
    $('#input-pdf-name').attr('value', pdf.pdfName);
    $('#pdf-name-modal').html(pdf.pdfName);
    $('.message .text p').html(pdf.pdfSubCopy);
    if(pdf.hideFDIC){
      $('.disclosure').hide();
    }
    if(pdf.bullets.length){
          for(var i=0; i<pdf.bullets.length; i++){
            var template = "<div class='row'><div class='column one left-arrow'><img src='img/orange-arrow.svg'></div><div class='columns eleven'><h3>"+pdf.bullets[i].heading+"</h3>"+pdf.bullets[i].copy+"</div></div>";
            $(list).append(template)
          }
    }
    if(pdf.additionalPdfInfo){
      $('.additionalPdfInfo').html(pdf.additionalPdfInfo);
    }
    if(pdf.disclosures){
      $('.disclosures').html(pdf.disclosures);
    }
}
populatePage();
