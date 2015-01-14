/**
 * Created by Dianyan on 2014/12/25.
 */
var ContentStrategy = require("./content_strategy");
var ContainerStrategy = require("./container_strategy");

function ResolutionPolicy(opts) {
    //opts || (opts = {});
    //this._containerStrategy = opts.containerStrategy || ContainerStrategy.default;
    //this._contentStrategy = opts.contentStrategy || ContentStrategy.default;

    this._containerStrategy = ContainerStrategy.default;
    this._contentStrategy = ContentStrategy.default;
    this.screen = undefined;
}
ResolutionPolicy.prototype.init = function (view) {
    this.screen = view;
    this._containerStrategy.init(view);
    this._contentStrategy.init(view);
};
ResolutionPolicy.prototype.apply = function (view, designedResolutionWidth, designedResolutionHeight) {
    this._containerStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
    this._contentStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
};
ResolutionPolicy.prototype.clear = function () {
    this.screen = undefined;
    //this._containerStrategy.destroy();
    //this._contentStrategy.destroy();
    this._containerStrategy = undefined;
    this._contentStrategy = undefined;
};

ResolutionPolicy.prototype.getScaleMode = function () {
    return this._contentStrategy.constructor.name;
};
ResolutionPolicy.prototype.setScaleMode = function (mode) {
    this._contentStrategy = ContentStrategy.get(mode);
    this._contentStrategy._apply(this.screen, this.screen._designWidth, this.screen._designHeight);
};

ResolutionPolicy.prototype.toJSON = function (json) {
    json || (json = {});
    if(this._containerStrategy) json.containerStrategy = this._containerStrategy.toJSON(json.containerStrategy);
    if(this._contentStrategy) json.contentStrategy = this._contentStrategy.toJSON(json.contentStrategy);
    return json;
};
ResolutionPolicy.prototype.fromJSON = function (json) {
    this._containerStrategy = json.containerStrategy ? ContainerStrategy.fromJSON(json.containerStrategy) : ContainerStrategy.default;
    this._contentStrategy = json.contentStrategy ? ContentStrategy.fromJSON(json.contentStrategy) : ContentStrategy.default;
    return this;
};

//ResolutionPolicy.default = new ResolutionPolicy();
module.exports = new ResolutionPolicy;
