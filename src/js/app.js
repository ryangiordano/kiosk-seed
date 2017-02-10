/* JavaScript Document */

/* Firefly Credit Union */

/* Website Produced by Codigo |  gocodigo.com */

/* --------------------------------------------------
Javascript Table of Contents
-----------------------------------------------------

1.Fastclick
2.Email Dialog Box
3.Close Dialog Box When Clicked Outside
4.Alert Dialog Box Email Form Success/Fail
  4a.Detect parameters in the URL, placed by the php form
  4b.If success parameter exists, show success message
  4c.If fail parameter exists, show fail message
5. Responsive Dialog Boxes */

/* ******************************************** */
/*1. Fast Click */
//Attaches fastclick.js to the body //Helps with touch delay
$(function() {
    FastClick.attach(document.body);
});

class Kiosk{
  constructor(){

  }
  init(){

  }
  getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
              return pair[1];
          }
      }
      return false;
  }


}

class DialogBox{
  constructor(options){
    $(options.dialogId).dialog({
        title: "",
        closeOnEscape: true,
        resizable: false,
        dialogClass: "kiosk-modal",
        modal: true,
        autoOpen: false,
        draggable: false,
        hide: {
            effect: "fade",
            duration: 440
        },
        show: {
            effect: "fade",
            duration: 440
        },
        height: options.height,
        width: options.width,
        fluid: true, //new option
        open: function(event, ui) {
            this.fluidDialog();
        },
        close: function() {}
    });
    $("body").on('click', '.ui-widget-overlay', function() {
        if ($("div.ui-dialog").is(":visible")) {
            var openDialogId = $(".ui-dialog").find(".ui-dialog-content:visible").attr("id");
            if ($("#" + openDialogId).dialog("isOpen")) {
                $("#" + openDialogId).dialog('close');
            }
        }
    });
    this.addEventListener(options.listenerId, options.dialogId);
  }
  addEventListener(clickedId, dialogId){
    $(clickedId).click(function() {
        $(dialogId).dialog("open");
    })
  }
  fluidDialog() {
      var $visible = $(".ui-dialog:visible");
      // each open dialog
      $visible.each(function() {
          var $this = $(this);
          var dialog = $this.find(".ui-dialog-content").data("dialog");
          // if fluid option == true
          if (dialog.options.maxWidth && dialog.options.width) {
              // fix maxWidth bug
              $this.css("max-width", dialog.options.maxWidth);
              //reposition dialog
              dialog.option("position", dialog.options.position);
          }

          if (dialog.options.fluid) {
              // namespace window resize
              $(window).on("resize.responsive", function() {
                  var wWidth = $(window).width();
                  // check window width against dialog width
                  if (wWidth < dialog.options.maxWidth + 50) {
                      // keep dialog from filling entire screen
                      $this.css("width", "90%");

                  }
                  //reposition dialog
                  dialog.option("position", dialog.options.position);
              });
          }

      });
  }
}

(function() {
    /* ******************************************** */
    /* 3.Close Dialog Box When Clicked Outside */

    /* ******************************************** */
    /* 4. Alert Dialog Box Email Form Success/Fail */
    /* ******************************************** */
    /* 4a.If success parameter exists, show success message*/
    var alertMessage, success;
    switch (getQueryVariable("status")) {
        case "success":
            alertMessage = '<h1>Thank You!</h1>The PDF was sent to your email address. We hope you enjoy your visit.';
            success = true;
            break;
        case "fail":
            alertMessage = '<h1>Sorry!</h1>No PDFs can be sent at this time. Please speak with a representative for assistance.';
            success = false;
            break;
        case "success2":
            alertMessage = '<h1>Thank you!</h1>Your e-mail address will be added to the mailing list.  We hope you enjoy your visit!';
            success = true;
            break;
        case "fail2":
            alertMessage = '<h1>Sorry!</h1>There was an error sending your message. Please speak with a representative for assistance.';
            success = false;
    }
    if (getQueryVariable("status")) {
        $('#alert').html(alertMessage).dialog({
            modal: true,
            resizable: false,
            hide: {
                effect: "fold",
                duration: 440
            },
            show: {
                effect: "drop",
                duration: 440
            },
            dialogClass: 'alert',
            fluid: true, //new option
            open: function(event, ui) {

                fluidDialog();
            }
        });
        document.cookie = success ? 'success=opened' : "fail=opened";
    }
    /* ******************************************** */
    /*5. Responsive Dialog Boxes*/
    // run function on all dialog opens
    $(document).on("dialogopen", ".ui-dialog", function(event, ui) {
        fluidDialog();
    });
    // remove window resize namespace
    $(document).on("dialogclose", ".ui-dialog", function(event, ui) {
        $(window).off("resize.responsive");
    });
    function
})();

$("#submit-button").click(function() {
    $("#form").submit();
    return false;
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
