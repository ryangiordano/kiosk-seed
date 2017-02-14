class Kiosk {
    constructor() {

    }
    init() {

    }
    static getQueryVariable(variable) {
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
    static navigate() {

    }
    static test() {
        console.log("This is the Kiosk test static method");
    }


}
//requires dialogId
//requires height, width
// listenerId
// let options = {
//   dialogId: "#dialog",
//   activateId: "#open"
//   height: 300,
//   width: 400
// }
class DialogBox {
    constructor(options) {
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
                DialogBox.fluidDialog();
            },
            close: function() {}
        });
        //closing the dialog box when tapping background
        $("body").on('click', '.ui-widget-overlay', function() {
            if ($("div.ui-dialog").is(":visible")) {
                var openDialogId = $(".ui-dialog").find(".ui-dialog-content:visible").attr("id");
                if ($("#" + openDialogId).dialog("isOpen")) {
                    $("#" + openDialogId).dialog('close');
                }
            }
        });
        this.addEventListener(options.activateId, options.dialogId);
    }
    addEventListener(clickedId, dialogId) {
        $(clickedId).click(function() {
            $(dialogId).dialog("open");
        })
    }
    static fluidDialog() {
        //Allows the dialog box to be centered.
        //// TODO: Solve this with Flexbox (css)
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

//Alert box receives an alert message:string,
// alert box's id: string
//the name of the trigger, as well as the result. ex: "status" (name) "success" (result)
// let options = {
//   message: "This is the message we'd like to display.",
//   alertBoxId: "#alert",
//   trigger: ["status", "success"]
// }
class AlertBox {
    constructor(options) {
        this.options = options;
        this.result = Kiosk.getQueryVariable(this.options.trigger[0]);
        if (this.result === this.options.trigger[1]) {
            this.init();
        }
    }
    init() {
        $(this.options.alertBoxId).html(this.options.message).dialog({
            modal: true,
            resizable: false,
            hide: {
                effect: "fold",
                duration: 440
            },
            show: {
                effect: "fade",
                duration: 440
            },
            dialogClass: 'alert',
            fluid: true, //new option
            open: (event, ui) => {
                DialogBox.fluidDialog();
            }
        });
        // document.cookie = success ? 'success=opened' : "fail=opened";
        $(document).on("dialogopen", ".ui-dialog", function(event, ui) {
            fluidDialog();
        });
        // remove window resize namespace
        $(document).on("dialogclose", ".ui-dialog", function(event, ui) {
            $(window).off("resize.responsive");
        });
        //closing the dialog box when tapping background
        $("body").on('click', '.ui-widget-overlay', function() {
            if ($("div.ui-dialog").is(":visible")) {
                var openDialogId = $(".ui-dialog").find(".ui-dialog-content:visible").attr("id");
                if ($("#" + openDialogId).dialog("isOpen")) {
                    $("#" + openDialogId).dialog('close');
                }
            }
        });
    }
}
//Will the animation be instantly triggered, or will we attach event-listeners to the dom? navigateOnComplete?
// {
//   immediate: true,
//   triggerSelector: ,
//   destination:"http://www.gocodigo.com"
// }
class Animation {
    constructor(options, animation, setup) {
        this.options = options;
        this.animation = animation;
        this.setup = setup;
        this.tl = new TimelineMax();
        this.init();
    }
    init() {
        if (this.options.requireSetup) {
            this.setup(this.tl);
        }
        if (this.options.immediate) {
            return this.runAnimation();
        }
        this.setEventListeners(this.options.triggerSelector);
    }
    runAnimation(destination) {
        return this.animation(this.tl, destination);
    }
    setEventListeners(triggerSelector) {
        let that = this;
        $(triggerSelector).on('click', function(e) {
            e.preventDefault();
            that.runAnimation($(this).attr('href'));
        })
    }

}

class Form {

}

class KioskPage {
    //Take animations and assign them to events.  Attach listeners.
}
