class Animation {
    constructor(options, animation, setup) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.requireSetup = this.requireSetup || true;
        this.axis = this.from === "top" || this.from === "bottom" ? "y" : "x";
        this.direction = this.from ==="left" || this.from === "top" ? "-" : "";
        this.target = document.querySelectorAll(this.target);
        this.animation = animation;
        this.setup = setup;
        this.tl = new TimelineMax();
        this.init();
    }
    init() {
        if (this.requireSetup) {
            this.setUpAnimation();
        }

        if (!this.triggerSelector) {
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
      let axis = this.axis, plusMinus;
      let animateObject = {};
      animateObject['opacity'] = this.fadeIn ? 1: 0;
      animateObject[axis] = 0;
        this.tl.staggerTo(redBoxes, 1,animateObject, .3)
    }
    setUpAnimation() {
        let axis = this.axis, plusMinus;
        let setObject = {};
        setObject['opacity'] = this.fadeIn ? 0: 1;
        setObject[axis] = `${this.direction}100`;
        console.log(setObject);
        this.tl.set(redBoxes, setObject);
    }
}

class SlideDown extends Slide{
  constructor(options){
    super(options);
    this.from = "top";
    console.log(this.from);
    this.axis = this.from === "top" || this.from === "bottom" ? "y" : "x";
    this.direction = this.from ==="left" || this.from === "top" ? "-" : "";
  }
}
