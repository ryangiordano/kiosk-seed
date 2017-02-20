let redBoxes = $('.redbox');

let testAnimation = new Animation({
        immediate: false,
        requireSetup: true,
        triggerSelector: ".items a"
    },
    (timeline, destination) => {
        //Your animation here
        timeline.staggerTo(redBoxes, 1, {
            opacity: 1,
            y: 0,
            onComplete: Kiosk.test,
            onCompleteParams: [destination]
        }, .3)
    },
    (timeline)=>{
      //your setup here
      timeline.set(redBoxes,{opacity:.3,y:-100})
    }
);
let testAlert = new AlertBox({
  message: "This is the message",
  alertBoxId: "#alert",
  trigger: ["status","success"]
});

let textDialog = new DialogBox({
  dialogId: "#dialog",
  activateId: "#open",
  height:300,
  width:400
})
