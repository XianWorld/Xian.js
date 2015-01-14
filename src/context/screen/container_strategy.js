/**
 * Created by Dianyan on 2014/12/25.
 */

function ContainerStrategy() {
}
//ContainerStrategy.initialize = function () {
//    ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame();
//};
ContainerStrategy.prototype.init = function (view) {
};
ContainerStrategy.prototype._apply = function (view, designedWidth, designedHeight) {
};
ContainerStrategy.prototype._setupContainer = function () {
    var body = document.body, style;
    if (body && (style = body.style)) {
        style.paddingTop = style.paddingTop || "0px";
        style.paddingRight = style.paddingRight || "0px";
        style.paddingBottom = style.paddingBottom || "0px";
        style.paddingLeft = style.paddingLeft || "0px";
        style.borderTop = style.borderTop || "0px";
        style.borderRight = style.borderRight || "0px";
        style.borderBottom = style.borderBottom || "0px";
        style.borderLeft = style.borderLeft || "0px";
        style.marginTop = style.marginTop || "0px";
        style.marginRight = style.marginRight || "0px";
        style.marginBottom = style.marginBottom || "0px";
        style.marginLeft = style.marginLeft || "0px";
    }
};
ContainerStrategy.prototype.destroy = function () {
};
ContainerStrategy.prototype.fromJSON = function (json) {
    return this;
};
ContainerStrategy.prototype.toJSON = function (json) {
    json || (json = {});
    return json;
};

function EqualToFrame() {
    ContainerStrategy.call(this);
}
EqualToFrame.prototype = Object.create(ContainerStrategy.prototype);
EqualToFrame.prototype.constructor = EqualToFrame;
EqualToFrame.prototype._apply = function (view) {
    this._setupContainer();
};
//ContainerStrategy.EqualToFrame = EqualToFrame;

ContainerStrategy.fromJSON = function (json) {
    return ContainerStrategy._classes[json._className].fromJSON(json);
};
ContainerStrategy.get = function (type) {
    return ContainerStrategy._classes[type];
};
//TODO should use static instance??
ContainerStrategy._classes = {
    EqualToFrame: new EqualToFrame,
};
ContainerStrategy.default = ContainerStrategy._classes.EqualToFrame;

module.exports = ContainerStrategy;
