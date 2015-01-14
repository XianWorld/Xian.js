
AbstractFilter = function(opts)
{
    opts || (opts = {});
    /**
    * An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.
    * For example the blur filter has two passes blurX and blurY.
    * @property passes
    * @type Array an array of filter objects
    * @private
    */
    this.passes = [this];

    /**
    * @property shaders
    * @type Array an array of shaders
    * @private
    */
    this.shaders = [];
    
    /**
    * @property dirty
    * @type Boolean
    */
    this.dirty = true;

    /**
    * @property padding
    * @type Number
    */
    this.padding = 0;

    /**
    * @property uniforms
    * @type object
    * @private
    */
    this.uniforms = opts.uniforms || {};

    /**
    * @property fragmentSrc
    * @type Array
    * @private
    */
    this.fragmentSrc = opts.fragmentSrc || [];
};

AbstractFilter.prototype.constructor = AbstractFilter;

/**
 * Syncs the uniforms between the class object and the shaders.
 *
 * @method syncUniforms
 */
AbstractFilter.prototype.syncUniforms = function()
{
    for(var i=0,j=this.shaders.length; i<j; i++)
    {
        this.shaders[i].dirty = true;
    }
};

/*
AbstractFilter.prototype.apply = function(frameBuffer)
{
    // TODO :)
};
*/

AbstractFilter.prototype.destroy = function() {

};
AbstractFilter.prototype.fromJSON = function (json) {

    return this;
};

AbstractFilter.prototype.toJSON = function (json) {
    json || (json = {});

    return json;
};

//AbstractFilter.fromJSON = function (json) {
//
//    return new AbstractFilter._classes[json._className]().fromJSON(json);
//};
//
//AbstractFilter.create = function (type) {
//
//    return new AbstractFilter._classes[type];
//};
//
//
//AbstractFilter._classes = {};
//
module.exports = AbstractFilter;