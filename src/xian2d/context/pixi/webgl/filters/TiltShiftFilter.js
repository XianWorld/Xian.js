var AbstractFilter = require("./AbstractFilter");
var TiltShiftXFilter = require("./TiltShiftXFilter");
var TiltShiftYFilter = require("./TiltShiftYFilter");

/**
 * A TiltShift Filter. Manages the pass of both a TiltShiftXFilter and TiltShiftYFilter.
 * 
 * @class TiltShiftFilter
 * @constructor
 */
TiltShiftFilter = function(opts)
{
    opts || (opts = {});
    AbstractFilter.call( this,opts );

    this.tiltShiftXFilter = new TiltShiftXFilter(opts);
    this.tiltShiftYFilter = new TiltShiftYFilter(opts);
    //this.tiltShiftXFilter.updateDelta();
    //this.tiltShiftXFilter.updateDelta();

    this.passes = [this.tiltShiftXFilter, this.tiltShiftYFilter];
};

TiltShiftFilter.prototype = Object.create( AbstractFilter.prototype );
TiltShiftFilter.prototype.constructor = TiltShiftFilter;

/**
 * The strength of the blur.
 *
 * @property blur
 * @type Number
 */
Object.defineProperty(TiltShiftFilter.prototype, 'blur', {
    get: function() {
        return this.tiltShiftXFilter.blur;
    },
    set: function(value) {
        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value;
    }
});

/**
 * The strength of the gradient blur.
 *
 * @property gradientBlur
 * @type Number
 */
Object.defineProperty(TiltShiftFilter.prototype, 'gradientBlur', {
    get: function() {
        return this.tiltShiftXFilter.gradientBlur;
    },
    set: function(value) {
        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = value;
    }
});

/**
 * The Y value to start the effect at.
 *
 * @property start
 * @type Number
 */
Object.defineProperty(TiltShiftFilter.prototype, 'start', {
    get: function() {
        return this.tiltShiftXFilter.start;
    },
    set: function(value) {
        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = value;
    }
});

/**
 * The Y value to end the effect at.
 *
 * @property end
 * @type Number
 */
Object.defineProperty(TiltShiftFilter.prototype, 'end', {
    get: function() {
        return this.tiltShiftXFilter.end;
    },
    set: function(value) {
        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = value;
    }
});

TiltShiftFilter.prototype.fromJSON = function (json) {

    this.blur = json.blur;
    this.gradientBlur = json.gradientBlur;
    this.start = json.start;
    this.end = json.end;

    return this;
};

TiltShiftFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "TiltShiftFilter";
    json.blur = this.blur;
    json.gradientBlur = this.gradientBlur;
    json.start = this.start;
    json.end = this.end;

    return json;
};


module.exports = TiltShiftFilter;