"use strict";

var redBoxes = $('.redbox');

var testAnimation = new Animation({
  immediate: false,
  requireSetup: true,
  triggerSelector: ".items a"
}, function (timeline, destination) {
  //Your animation here
  timeline.staggerTo(redBoxes, 1, {
    opacity: 1,
    y: 0,
    onComplete: Kiosk.test,
    onCompleteParams: [destination]
  }, .3);
}, function (timeline) {
  //your setup here
  timeline.set(redBoxes, { opacity: .3, y: -100 });
});
var testAlert = new AlertBox({
  message: "This is the message",
  alertBoxId: "#alert",
  trigger: ["status", "success"]
});

var textDialog = new DialogBox({
  dialogId: "#dialog",
  activateId: "#open",
  height: 300,
  width: 400
});