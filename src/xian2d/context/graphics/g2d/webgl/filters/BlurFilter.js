var AbstractFilter = require("./AbstractFilter");
var BlurXFilter = require("./BlurXFilter");
var BlurYFilter = require("./BlurYFilter");

BlurFilter = function (opts) {
    opts || (opts = {});

    AbstractFilter.call(this, opts);

    this.blurXFilter = new BlurXFilter();
    this.blurYFilter = new BlurYFilter();

    this.passes = [this.blurXFilter, this.blurYFilter];

    if (opts.blur) this.blur = opts.blur;
    if (opts.blurX) this.blurX = opts.blurX;
    if (opts.blurY) this.blurY = opts.blurY;

};

BlurFilter.prototype = Object.create(AbstractFilter.prototype);
BlurFilter.prototype.constructor = BlurFilter;

Object.defineProperty(BlurFilter.prototype, 'blur', {
    get: function () {
        return this.blurXFilter.blur;
    },
    set: function (value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    }
});

Object.defineProperty(BlurFilter.prototype, 'blurX', {
    get: function () {
        return this.blurXFilter.blur;
    },
    set: function (value) {
        this.blurXFilter.blur = value;
    }
});

Object.defineProperty(BlurFilter.prototype, 'blurY', {
    get: function () {
        return this.blurYFilter.blur;
    },
    set: function (value) {
        this.blurYFilter.blur = value;
    }
});
BlurFilter.prototype.fromJSON = function (json) {

    this.blurX = json.blurX;
    this.blurY = json.blurY;

    return this;
};

BlurFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "BlurFilter";
    //json.blur = this.blur;
    json.blurX = this.blurX;
    json.blurY = this.blurY;

    return json;
};

//AbstractFilter._classes.BlurFilter = BlurFilter;

module.exports = BlurFilter;