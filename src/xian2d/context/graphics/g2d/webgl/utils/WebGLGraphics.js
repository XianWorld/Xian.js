
var Enums2D = require("../../../../../base/enums_2d");
var PolyK = require("./Polyk");
var Color = require("../../../../../../math/color");
var Mat3 = require("../../../../../../math/mat3");
var Vec2 = require("../../../../../../math/vec2");

WebGLGraphics = function()
{
};

var MAT3 = new Mat3();
WebGLGraphics.renderGraphics = function(renderer, graphics)//projection, offset)
{
    var gl = renderer.gl;
    var projection = renderer.projection,
        offset = renderer.offset,
        shader = renderer.shaderManager.primitiveShader,
        webGLData;

    if(graphics.dirty)
    {
        WebGLGraphics.updateGraphics(graphics, gl);
    }

    var webGL = graphics._webGL[gl.id];

    // This  could be speeded up for sure!

    for (var i = 0; i < webGL.data.length; i++)
    {
        if(webGL.data[i].mode === 1)
        {
            webGLData = webGL.data[i];

            renderer.stencilManager.pushStencil(graphics, webGLData, renderer);

            // render quad..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );

            renderer.stencilManager.popStencil(graphics, webGLData, renderer);
        }
        else
        {
            webGLData = webGL.data[i];


            renderer.shaderManager.setShader( shader );//activatePrimitiveShader();
            shader = renderer.shaderManager.primitiveShader;

            MAT3.fromMat32(graphics.worldMatrix);
            gl.uniformMatrix3fv(shader.translationMatrix, false, MAT3.elements);
            //gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

            gl.uniform3fv(shader.tintColor, Color.hex2rgb(graphics.tint));

            gl.uniform1f(shader.alpha, graphics.worldAlpha);
            

            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

            // set the index buffer!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );
        }
    }
};

WebGLGraphics.updateGraphics = function(graphics, gl)
{
    // get the contexts graphics object
    var webGL = graphics._webGL[gl.id];
    // if the graphics object does not exist in the webGL context time to create it!
    if(!webGL)webGL = graphics._webGL[gl.id] = {lastIndex:0, data:[], gl:gl};

    // flag the graphics as not dirty as we are about to update it...
    graphics.dirty = false;

    var i;

    // if the user cleared the graphics object we will need to clear every object
    if(graphics.clearDirty)
    {
        graphics.clearDirty = false;

        // lop through and return all the webGLDatas to the object pool so than can be reused later on
        for (i = 0; i < webGL.data.length; i++)
        {
            var graphicsData = webGL.data[i];
            graphicsData.reset();
            WebGLGraphics.graphicsDataPool.push( graphicsData );
        }

        // clear the array and reset the index.. 
        webGL.data = [];
        webGL.lastIndex = 0;
    }
    
    var webGLData;
    
    // loop through the graphics datas and construct each one..
    // if the object is a complex fill then the new stencil buffer technique will be used
    // other wise graphics objects will be pushed into a batch..
    for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
    {
        var data = graphics.graphicsData[i];

        if(data.type === Enums2D.ShapeTypes.POLY)
        {
            // need to add the points the the graphics object..
            data.points = data.shape.points.slice();
            if(data.shape.closed)
            {
                // close the poly if the valu is true!
                if(data.points[0] !== data.points[data.points.length-2] && data.points[1] !== data.points[data.points.length-1])
                {
                    data.points.push(data.points[0], data.points[1]);
                }
            }

            // MAKE SURE WE HAVE THE CORRECT TYPE..
            if(data.fill)
            {
                if(data.points.length >= 6)
                {
                    if(data.points.length < 6 * 2)
                    {
                        webGLData = WebGLGraphics.switchMode(webGL, 0);
                        
                        var canDrawUsingSimple = WebGLGraphics.buildPoly(data, webGLData);
                   //     console.log(canDrawUsingSimple);

                        if(!canDrawUsingSimple)
                        {
                        //    console.log("<>>>")
                            webGLData = WebGLGraphics.switchMode(webGL, 1);
                            WebGLGraphics.buildComplexPoly(data, webGLData);
                        }
                        
                    }
                    else
                    {
                        webGLData = WebGLGraphics.switchMode(webGL, 1);
                        WebGLGraphics.buildComplexPoly(data, webGLData);
                    }
                }
            }

            if(data.lineWidth > 0)
            {
                webGLData = WebGLGraphics.switchMode(webGL, 0);
                WebGLGraphics.buildLine(data, webGLData);

            }
        }
        else
        {
            webGLData = WebGLGraphics.switchMode(webGL, 0);
            
            if(data.type === Enums2D.ShapeTypes.RECT)
            {
                WebGLGraphics.buildRectangle(data, webGLData);
            }
            else if(data.type === Enums2D.ShapeTypes.CIRC || data.type === Enums2D.ShapeTypes.ELIP)
            {
                WebGLGraphics.buildCircle(data, webGLData);
            }
            else if(data.type === Enums2D.ShapeTypes.RREC)
            {
                WebGLGraphics.buildRoundedRectangle(data, webGLData);
            }
        }

        webGL.lastIndex++;
    }

    // upload all the dirty data...
    for (i = 0; i < webGL.data.length; i++)
    {
        webGLData = webGL.data[i];
        if(webGLData.dirty)webGLData.upload();
    }
};

WebGLGraphics.switchMode = function(webGL, type)
{
    var webGLData;

    if(!webGL.data.length)
    {
        webGLData = WebGLGraphics.graphicsDataPool.pop() || new WebGLGraphicsData(webGL.gl);
        webGLData.mode = type;
        webGL.data.push(webGLData);
    }
    else
    {
        webGLData = webGL.data[webGL.data.length-1];

        if(webGLData.mode !== type || type === 1)
        {
            webGLData = WebGLGraphics.graphicsDataPool.pop() || new WebGLGraphicsData(webGL.gl);
            webGLData.mode = type;
            webGL.data.push(webGLData);
        }
    }

    webGLData.dirty = true;

    return webGLData;
};

WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
{
    // --- //
    // need to convert points to a nice regular data
    //
    var rectData = graphicsData.shape;
    var x = rectData.x;
    var y = rectData.y;
    var width = rectData.width;
    var height = rectData.height;

    if(graphicsData.fill)
    {
        var color = Color.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vertPos = verts.length/6;

        // start
        verts.push(x, y);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y);
        verts.push(r, g, b, alpha);

        verts.push(x , y + height);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y + height);
        verts.push(r, g, b, alpha);

        // insert 2 dead triangles..
        indices.push(vertPos, vertPos, vertPos+1, vertPos+2, vertPos+3, vertPos+3);
    }

    if(graphicsData.lineWidth)
    {
        var tempPoints = graphicsData.points;

        graphicsData.points = [x, y,
                  x + width, y,
                  x + width, y + height,
                  x, y + height,
                  x, y];


        WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
};

WebGLGraphics.buildRoundedRectangle = function(graphicsData, webGLData)
{
    var rrectData = graphicsData.shape;
    var x = rrectData.x;
    var y = rrectData.y;
    var width = rrectData.width;
    var height = rrectData.height;

    var radius = rrectData.radius;

    var recPoints = [];
    recPoints.push(x, y + radius);
    recPoints = recPoints.concat(WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
    recPoints = recPoints.concat(WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
    recPoints = recPoints.concat(WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
    recPoints = recPoints.concat(WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));

    if (graphicsData.fill) {
        var color = Color.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length/6;

        var triangles = PolyK.Triangulate(recPoints);

        var i = 0;
        for (i = 0; i < triangles.length; i+=3)
        {
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i+1] + vecPos);
            indices.push(triangles[i+2] + vecPos);
            indices.push(triangles[i+2] + vecPos);
        }

        for (i = 0; i < recPoints.length; i++)
        {
            verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
        }
    }

    if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points;

        graphicsData.points = recPoints;

        WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
};

WebGLGraphics.quadraticBezierCurve = function(fromX, fromY, cpX, cpY, toX, toY) {

    var xa,
        ya,
        xb,
        yb,
        x,
        y,
        n = 20,
        points = [];

    function getPt(n1 , n2, perc) {
        var diff = n2 - n1;

        return n1 + ( diff * perc );
    }

    var j = 0;
    for (var i = 0; i <= n; i++ )
    {
        j = i / n;

        // The Green Line
        xa = getPt( fromX , cpX , j );
        ya = getPt( fromY , cpY , j );
        xb = getPt( cpX , toX , j );
        yb = getPt( cpY , toY , j );

        // The Black Dot
        x = getPt( xa , xb , j );
        y = getPt( ya , yb , j );

        points.push(x, y);
    }
    return points;
};

WebGLGraphics.buildCircle = function(graphicsData, webGLData)
{
    // need to convert points to a nice regular data
    var circleData = graphicsData.shape;
    var x = circleData.x;
    var y = circleData.y;
    var width;
    var height;
    
    // TODO - bit hacky??
    if(graphicsData.type === Enums2D.ShapeTypes.CIRC)
    {
        width = circleData.radius;
        height = circleData.radius;
    }
    else
    {
        width = circleData.width;
        height = circleData.height;
    }

    var totalSegs = 40;
    var seg = (Math.PI * 2) / totalSegs ;

    var i = 0;

    if(graphicsData.fill)
    {
        var color = Color.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length/6;

        indices.push(vecPos);

        for (i = 0; i < totalSegs + 1 ; i++)
        {
            verts.push(x,y, r, g, b, alpha);

            verts.push(x + Math.sin(seg * i) * width,
                       y + Math.cos(seg * i) * height,
                       r, g, b, alpha);

            indices.push(vecPos++, vecPos++);
        }

        indices.push(vecPos-1);
    }

    if(graphicsData.lineWidth)
    {
        var tempPoints = graphicsData.points;

        graphicsData.points = [];

        for (i = 0; i < totalSegs + 1; i++)
        {
            graphicsData.points.push(x + Math.sin(seg * i) * width,
                                     y + Math.cos(seg * i) * height);
        }

        WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
};

WebGLGraphics.buildLine = function(graphicsData, webGLData)
{
    // TODO OPTIMISE!
    var i = 0;
    var points = graphicsData.points;
    if(points.length === 0)return;

    // if the line width is an odd number add 0.5 to align to a whole pixel
    if(graphicsData.lineWidth%2)
    {
        for (i = 0; i < points.length; i++) {
            points[i] += 0.5;
        }
    }

    // get first and last point.. figure out the middle!
    var firstPoint = new Vec2( points[0], points[1] );
    var lastPoint = new Vec2( points[points.length - 2], points[points.length - 1] );

    // if the first point is the last point - gonna have issues :)
    if(firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y)
    {
        // need to clone as we are going to slightly modify the shape..
        points = points.slice();

        points.pop();
        points.pop();

        lastPoint = new Vec2( points[points.length - 2], points[points.length - 1] );

        var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
        var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;

        points.unshift(midPointX, midPointY);
        points.push(midPointX, midPointY);
    }

    var verts = webGLData.points;
    var indices = webGLData.indices;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length/6;

    // DRAW the Line
    var width = graphicsData.lineWidth / 2;

    // sort color
    var color = Color.hex2rgb(graphicsData.lineColor);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
    var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
    var a1, b1, c1, a2, b2, c2;
    var denom, pdist, dist;

    p1x = points[0];
    p1y = points[1];

    p2x = points[2];
    p2y = points[3];

    perpx = -(p1y - p2y);
    perpy =  p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);

    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    // start
    verts.push(p1x - perpx , p1y - perpy,
                r, g, b, alpha);

    verts.push(p1x + perpx , p1y + perpy,
                r, g, b, alpha);

    for (i = 1; i < length-1; i++)
    {
        p1x = points[(i-1)*2];
        p1y = points[(i-1)*2 + 1];

        p2x = points[(i)*2];
        p2y = points[(i)*2 + 1];

        p3x = points[(i+1)*2];
        p3y = points[(i+1)*2 + 1];

        perpx = -(p1y - p2y);
        perpy = p1x - p2x;

        dist = Math.sqrt(perpx*perpx + perpy*perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        perp2x = -(p2y - p3y);
        perp2y = p2x - p3x;

        dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
        perp2x /= dist;
        perp2y /= dist;
        perp2x *= width;
        perp2y *= width;

        a1 = (-perpy + p1y) - (-perpy + p2y);
        b1 = (-perpx + p2x) - (-perpx + p1x);
        c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
        a2 = (-perp2y + p3y) - (-perp2y + p2y);
        b2 = (-perp2x + p2x) - (-perp2x + p3x);
        c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);

        denom = a1*b2 - a2*b1;

        if(Math.abs(denom) < 0.1 )
        {

            denom+=10.1;
            verts.push(p2x - perpx , p2y - perpy,
                r, g, b, alpha);

            verts.push(p2x + perpx , p2y + perpy,
                r, g, b, alpha);

            continue;
        }

        px = (b1*c2 - b2*c1)/denom;
        py = (a2*c1 - a1*c2)/denom;


        pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);


        if(pdist > 140 * 140)
        {
            perp3x = perpx - perp2x;
            perp3y = perpy - perp2y;

            dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
            perp3x /= dist;
            perp3y /= dist;
            perp3x *= width;
            perp3y *= width;

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x + perp3x, p2y +perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            indexCount++;
        }
        else
        {

            verts.push(px , py);
            verts.push(r, g, b, alpha);

            verts.push(p2x - (px-p2x), p2y - (py - p2y));
            verts.push(r, g, b, alpha);
        }
    }

    p1x = points[(length-2)*2];
    p1y = points[(length-2)*2 + 1];

    p2x = points[(length-1)*2];
    p2y = points[(length-1)*2 + 1];

    perpx = -(p1y - p2y);
    perpy = p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    verts.push(p2x - perpx , p2y - perpy);
    verts.push(r, g, b, alpha);

    verts.push(p2x + perpx , p2y + perpy);
    verts.push(r, g, b, alpha);

    indices.push(indexStart);

    for (i = 0; i < indexCount; i++)
    {
        indices.push(indexStart++);
    }

    indices.push(indexStart-1);
};

WebGLGraphics.buildComplexPoly = function(graphicsData, webGLData)
{
    //TODO - no need to copy this as it gets turned into a FLoat32Array anyways..
    var points = graphicsData.points.slice();
    if(points.length < 6)return;

    // get first and last point.. figure out the middle!
    var indices = webGLData.indices;
    webGLData.points = points;
    webGLData.alpha = graphicsData.fillAlpha;
    webGLData.color = Color.hex2rgb(graphicsData.fillColor);

    /*
        calclate the bounds..
    */
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    var x,y;

    // get size..
    for (var i = 0; i < points.length; i+=2)
    {
        x = points[i];
        y = points[i+1];

        minX = x < minX ? x : minX;
        maxX = x > maxX ? x : maxX;

        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
    }

    // add a quad to the end cos there is no point making another buffer!
    points.push(minX, minY,
                maxX, minY,
                maxX, maxY,
                minX, maxY);

    // push a quad onto the end.. 
    
    //TODO - this aint needed!
    var length = points.length / 2;
    for (i = 0; i < length; i++)
    {
        indices.push( i );
    }

};

WebGLGraphics.buildPoly = function(graphicsData, webGLData)
{
    var points = graphicsData.points;

    if(points.length < 6)return;
    // get first and last point.. figure out the middle!
    var verts = webGLData.points;
    var indices = webGLData.indices;

    var length = points.length / 2;

    // sort color
    var color = Color.hex2rgb(graphicsData.fillColor);
    var alpha = graphicsData.fillAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var triangles = PolyK.Triangulate(points);

    if(!triangles)return false;

    var vertPos = verts.length / 6;

    var i = 0;

    for (i = 0; i < triangles.length; i+=3)
    {
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i+1] + vertPos);
        indices.push(triangles[i+2] +vertPos);
        indices.push(triangles[i+2] + vertPos);
    }

    for (i = 0; i < length; i++)
    {
        verts.push(points[i * 2], points[i * 2 + 1],
                   r, g, b, alpha);
    }

    return true;
};

WebGLGraphics.graphicsDataPool = [];

WebGLGraphicsData = function(gl)
{
    this.gl = gl;

    //TODO does this need to be split before uploding??
    this.color = [0,0,0]; // color split!
    this.points = [];
    this.indices = [];
    this.lastIndex = 0;
    this.buffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.mode = 1;
    this.alpha = 1;
    this.dirty = true;
};

WebGLGraphicsData.prototype.reset = function()
{
    this.points = [];
    this.indices = [];
    this.lastIndex = 0;
};

WebGLGraphicsData.prototype.upload = function()
{
    var gl = this.gl;

//    this.lastIndex = graphics.graphicsData.length;
    this.glPoints = new Float32Array(this.points);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);

    this.glIndicies = new Uint16Array(this.indices);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);

    this.dirty = false;
};

module.exports = WebGLGraphics;