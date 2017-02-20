"use strict";

var redBoxes = $('.redbox');
//
// let testAnimation = new Animation({
//         immediate: false,
//         requireSetup: true,
//         triggerSelector: ".items a"
//     },
//     (timeline, destination) => {
//         //Your animation here
//         timeline.staggerTo(redBoxes, 1, {
//             opacity: 1,
//             y: 0,
//             onComplete: Kiosk.test,
//             onCompleteParams: [destination]
//         }, .3)
//     },
//     (timeline)=>{
//       //your setup here
//       timeline.set(redBoxes,{opacity:.3,y:-100})
//     }
// );

var testAnimation = new Slide({
    immediate: false,
    requireSetup: true,
    triggerSelector: ".items a",
    fadeIn: true,
    from: "bottom", //top, bottom, left, or right,
    duration: 5, //int
    delay: 1 //int
    // to: "top"
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