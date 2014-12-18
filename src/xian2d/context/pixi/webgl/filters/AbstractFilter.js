
AbstractFilter = function(fragmentSrc, uniforms)
{
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
    this.uniforms = uniforms || {};

    /**
    * @property fragmentSrc
    * @type Array
    * @private
    */
    this.fragmentSrc = fragmentSrc || [];
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
module.exports = AbstractFilter;