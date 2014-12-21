"use strict";


var defineProperty = Object.defineProperty;


function Rect(x, y, width, height) {

    this._x = x || 0.0;
    this._y = y || 0.0;
    this._width = width || 0.0;
    this._height = height || 0.0;

    this._xMin = this._x;
    this._xMax = this._x + this._width;
    this._yMin = this._y;
    this._yMax = this._y + this._height;
}

defineProperty(Rect.prototype, "x", {
    get: function () {
        return this._x;
    },
    set: function (value) {
        this._x = value;
        this._xMin = value;
        this._xMax = value + this._width;
    }
});
defineProperty(Rect.prototype, "y", {
    get: function () {
        return this._y;
    },
    set: function (value) {
        this._y = value;
        this._yMin = value;
        this._yMax = value + this._height;
    }
});
defineProperty(Rect.prototype, "width", {
    get: function () {
        return this._width;
    },
    set: function (value) {
        this._width = value;
        this._xMax = this._xMin + value;
    }
});
defineProperty(Rect.prototype, "height", {
    get: function () {
        return this._height;
    },
    set: function (value) {
        this._height = value;
        this._yMax = this._yMin + value;
    }
});
defineProperty(Rect.prototype, "xMin", {
    get: function () {
        return this._xMin;
    },
    set: function (value) {
        this._xMin = value;
        this._x = value;
        this._width = this._xMax - this._xMin;
        this._xMax = value + this._width;
    }
});
defineProperty(Rect.prototype, "xMax", {
    get: function () {
        return this._xMax;
    },
    set: function (value) {
        this._xMax = value;
        this._width = value - this._xMin;
    }
});
defineProperty(Rect.prototype, "yMin", {
    get: function () {
        return this._yMin;
    },
    set: function (value) {
        this._yMin = value;
        this._y = value;
        this._height = this._yMax - this._yMin;
        this._yMax = value + this._height;
    }
});
defineProperty(Rect.prototype, "yMax", {
    get: function () {
        return this._yMax;
    },
    set: function (value) {
        this._yMax = value;
        this._height = value - this._yMin;
    }
});
defineProperty(Rect.prototype, "z", {
    get: function () {
        return this.width;
    },
    set: function (value) {
        this.width = value;
    }
});
defineProperty(Rect.prototype, "w", {
    get: function () {
        return this.height;
    },
    set: function (value) {
        this.height = value;
    }
});

Rect.prototype.clone = function () {

    return new Rect(this.x, this.y, this.width, this.height);
};


Rect.prototype.copy = function (other) {

    this._x = other._x;
    this._y = other._y;
    this._width = other._width;
    this._height = other._height;

    this._xMin = other._xMin;
    this._xMax = other._xMax;
    this._yMin = other._yMin;
    this._yMax = other._yMax;

    return this;
};


Rect.prototype.set = function (x, y, width, height) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return this;
};

Rect.prototype.infinity = function () {

    this._x = this._xMin = Infinity;
    this._y = this._yMin = Infinity;
    this._width = this._xMax = -Infinity;
    this._height = this._yMax = -Infinity;

    return this;
};


Rect.prototype.center = function (v) {

    v.x = this._x + this._width * 0.5;
    v.y = this._y + this._height * 0.5;

    return v;
};


Rect.prototype.intersects = function (rect) {

    return !(
    rect._xMax < this._xMin || rect._xMin > this._xMax ||
    rect._yMax < this._yMin || rect._yMin > this._yMax
    );
};


Rect.prototype.contains = function (point) {
    var x = point.x,
        y = point.y;

    return !(
    x < this._xMin || x > this._xMax ||
    y < this._yMin || y > this._yMax
    );
};

Rect.prototype.updateBounds = function (rect) {
    if(this._xMin > rect._xMin) this.xMin = rect._xMin;
    if(this._yMin > rect._yMin) this.yMin = rect._yMin;

    if(this._xMax < rect._xMax) this.xMax = rect._xMax;
    if(this._yMax < rect._yMax) this.yMax = rect._yMax;
};

Rect.prototype.getBounds = function (matrix, bounds) {

    var w1 = this._xMin,
        w0 = this._xMax,
        h1 = this._yMin,
        h0 = this._yMax;

    var m = matrix.elements;
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var tx = m[4];
    var ty = m[5];

    var x1 = a * w1 + c * h1 + tx;
    var y1 = d * h1 + b * w1 + ty;

    var x2 = a * w0 + c * h1 + tx;
    var y2 = d * h1 + b * w0 + ty;

    var x3 = a * w0 + c * h0 + tx;
    var y3 = d * h0 + b * w0 + ty;

    var x4 = a * w1 + c * h0 + tx;
    var y4 = d * h0 + b * w1 + ty;

    var maxX = -Infinity;
    var maxY = -Infinity;

    var minX = Infinity;
    var minY = Infinity;

    minX = x1 < minX ? x1 : minX;
    minX = x2 < minX ? x2 : minX;
    minX = x3 < minX ? x3 : minX;
    minX = x4 < minX ? x4 : minX;

    minY = y1 < minY ? y1 : minY;
    minY = y2 < minY ? y2 : minY;
    minY = y3 < minY ? y3 : minY;
    minY = y4 < minY ? y4 : minY;

    maxX = x1 > maxX ? x1 : maxX;
    maxX = x2 > maxX ? x2 : maxX;
    maxX = x3 > maxX ? x3 : maxX;
    maxX = x4 > maxX ? x4 : maxX;

    maxY = y1 > maxY ? y1 : maxY;
    maxY = y2 > maxY ? y2 : maxY;
    maxY = y3 > maxY ? y3 : maxY;
    maxY = y4 > maxY ? y4 : maxY;

    bounds = bounds || new Rect();
    //var bounds = this;

    bounds.x = minX;
    bounds.width = maxX - minX;

    bounds.y = minY;
    bounds.height = maxY - minY;

    return bounds;
};

Rect.prototype.toJSON = function (json) {
    json || (json = {});

    json.x = this._x;
    json.y = this._y;
    json.width = this._width;
    json.height = this._height;

    return json;
};


Rect.prototype.fromJSON = function (json) {

    this.x = json.x;
    this.y = json.y;
    this.width = json.width;
    this.height = json.height;

    return this;
};


Rect.prototype.toString = function () {

    return "Rect( " + this._x + ", " + this._y + ", " + this._width + ", " + this._height + " )";
};

Rect.Empty = new Rect(0,0,0,0);

module.exports = Rect;
