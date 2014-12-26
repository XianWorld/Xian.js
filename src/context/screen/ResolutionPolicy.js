/**
 * Created by Dianyan on 2014/12/25.
 */
var ContentStrategy = require("./ContentStrategy");
var ContainerStrategy = require("./ContainerStrategy");

function ResolutionPolicy(opts) {
    opts || (opts = {});
    this._containerStrategy = opts.containerStrategy || ContainerStrategy.default;
    this._contentStrategy = opts.contentStrategy || ContentStrategy.default;

    this.screen = undefined;
}
ResolutionPolicy.prototype.init = function (view) {
    this.screen = view;
    this._containerStrategy.init(view);
    this._contentStrategy.init(view);
};
ResolutionPolicy.prototype._apply = function (view, designedResolutionWidth, designedResolutionHeight) {
    this._containerStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
    this._contentStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
};
ResolutionPolicy.prototype.clear = function () {
    this.screen = undefined;
    this._containerStrategy.clear();
    this._contentStrategy.clear();
};
ResolutionPolicy.prototype.toJSON = function (json) {
    json || (json = {});
    json.containerStrategy = this._containerStrategy.toJSON(json.containerStrategy);
    json.contentStrategy = this._contentStrategy.toJSON(json.contentStrategy);
    return json;
};
ResolutionPolicy.prototype.fromJSON = function (json) {
    this._containerStrategy = json.containerStrategy ? ContainerStrategy.fromJSON(json.containerStrategy) : ContainerStrategy.default;
    this._contentStrategy = json.contentStrategy ? ContentStrategy.fromJSON(json.contentStrategy) : ContentStrategy.default;
    return this;
};

ResolutionPolicy.default = new ResolutionPolicy();
module.exports = ResolutionPolicy;
