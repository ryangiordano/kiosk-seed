"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
$(function () {
    FastClick.attach(document.body);
});

var Kiosk = function () {
    function Kiosk(pageIds) {
        _classCallCheck(this, Kiosk);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = pageIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var id = _step.value;

                if (this.idScanner(id)) {
                    this.id = id;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    _createClass(Kiosk, [{
        key: "init",
        value: function init() {}
    }, {
        key: "idScanner",
        value: function idScanner(id) {
            return $(id).length;
        }
    }]);

    return Kiosk;
}();

var DialogBox = function () {
    function DialogBox(options) {
        _classCallCheck(this, DialogBox);

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
            open: function open(event, ui) {
                fluidDialog();
            },
            close: function close() {}
        });
        $("body").on('click', '.ui-widget-overlay', function () {
            if ($("div.ui-dialog").is(":visible")) {
                var openDialogId = $(".ui-dialog").find(".ui-dialog-content:visible").attr("id");
                if ($("#" + openDialogId).dialog("isOpen")) {
                    $("#" + openDialogId).dialog('close');
                }
            }
        });
        this.addEventListener(options.listenerId, options.dialogId);
    }

    _createClass(DialogBox, [{
        key: "addEventListener",
        value: function addEventListener(clickedId, dialogId) {
            $(clickedId).click(function () {
                $(dialogId).dialog("open");
            });
        }
    }]);

    return DialogBox;
}();

(function () {
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
            open: function open(event, ui) {

                fluidDialog();
            }
        });
        document.cookie = success ? 'success=opened' : "fail=opened";
    }
    /* ******************************************** */
    /*5. Responsive Dialog Boxes*/
    // run function on all dialog opens
    $(document).on("dialogopen", ".ui-dialog", function (event, ui) {
        fluidDialog();
    });
    // remove window resize namespace
    $(document).on("dialogclose", ".ui-dialog", function (event, ui) {
        $(window).off("resize.responsive");
    });
    function fluidDialog() {
        var $visible = $(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
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
                $(window).on("resize.responsive", function () {
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
})();

$("#submit-button").click(function () {
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