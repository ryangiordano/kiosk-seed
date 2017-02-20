class Animation {
    constructor(options, animation, setup) {
        for (let key in options) {
          console.log(key);
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.animation = animation;
        this.setup = setup;
        this.tl = new TimelineMax();
        this.init();
    }
    init() {
        if (this.requireSetup) {
            this.setUpAnimation();
        }
        if (this.immediate) {
            return this.runAnimation();
        }
        this.setEventListeners(this.triggerSelector);
    }
    runAnimation(destination) {
        return this.animation(this.tl, destination);
    }
    setUpAnimation() {
        return this.setup(this.tl);
    }
    setEventListeners(triggerSelector) {
        console.log("setting event listeners");
        let that = this;
        $(triggerSelector).on('click', function(e) {
            e.preventDefault();
            that.runAnimation($(this).attr('href'));
        })
    }

}
class Slide extends Animation {
    constructor(options, animation, setup) {
        super(options);
        if(this.from && this.to){
          console.error("Can only specifiy one direction")
        }
    }
    runAnimation(destination) {
        this.tl.staggerTo(redBoxes, 1, {
            opacity: 1,
            y: 0,
            onComplete: Kiosk.test,
            onCompleteParams: [destination]
        }, .3)
    }
    setUpAnimation() {
        let axis, plusMinus;
        this.from === "top" || this.from === "bottom" ? axis = "y";
        this.to === ""
        this.tl.set(redBoxes, {
            opacity: this.fadeIn ? 0 : 1,
            y:
        })
    }
}
