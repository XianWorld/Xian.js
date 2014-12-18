
CanvasBuffer = function(width, height)
{
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = width;
    this.canvas.height = height;
};

CanvasBuffer.prototype.constructor = CanvasBuffer;

CanvasBuffer.prototype.clear = function()
{
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0,0, this.width, this.height);
};

CanvasBuffer.prototype.resize = function(width, height)
{
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
};
CanvasBuffer.prototype.destroy = function(){
    this.canvas = undefined;
    this.context = undefined;
};

module.exports = CanvasBuffer;