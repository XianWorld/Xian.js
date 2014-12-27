/**
 * Created by Dianyan on 2014/12/26.
 */
//var Enums = require("../../core/enums");
var Enums2D = require("../common/enums_2d");
var Renderable2D = require("./renderable_2d");
var Assets = require("../../assets/assets");
var Color = require("../../math/color");
var Rect = require("../../math/rect");
var MainContext = require("../../context/main_context");
//var TextureClip = require("../assets/texture_clip");
"use strict";

var defineProperty = Object.defineProperty;
//var _RECT = new Rect;

function TextField(opts) {
    opts || (opts = {});

    Renderable2D.call(this, opts);

    //this._inputEnabled = false;
    this._type = "";
    this._inputUtils = undefined;

    this._text = "";
    this._displayAsPassword = false;

    this._fontFamily = TextField.default_fontFamily;

    this._size = 30;
    this._italic = false;
    this._bold = false;

    this._textColorString = "#FFFFFF";
    this._textColor = 0xFFFFFF;

    this._strokeColorString = "#000000";
    this._strokeColor = 0x000000;
    this._stroke = 0;

    this._textAlign = "left";
    this._verticalAlign = "top";

    this.maxWidth = 0;
    this._maxChars = 0;

    this._numLines = 0;
    this._lineSpacing = 0;
    this._numLines = 0;

    this._multiline = false;

    this._textArr = [];
    this._isArrayChanged = false;

    this.on("addToScene", this._onAddToScene);
    this.on("removeFromScene", this._onRemoveFromScene);
}

Renderable2D.extend(TextField);

TextField.default_fontFamily = "Arial";

TextField.prototype.isInput = function() {
    return this._type == Enums2D.TextFieldType.INPUT;
};

defineProperty(TextField.prototype, "type", {
    get: function () {
        return this._type;
    },
    set: function (value) {
        this._setType(value);
    }
});
TextField.prototype._setType = function (value) {
    if (this._type === value) return;

    this._type = value;
    if (this._type === Enums2D.TextFieldType.INPUT) {//input，如果没有设置过宽高，则设置默认值为100，30
        if (this._width === 0) {
            this.width = 100;
        }
        if (this._height === 0) {
            this.height = 30;
        }
        this._setDirty();

        //创建stageText
        //if (this._inputUtils == null) {
        //    this._inputUtils = new InputController();
        //}
        //this._inputUtils.init(this);
        //if (this._stage) {
        //    this._inputUtils._addStageText();
        //}
    }
    else {
        //if (this._inputUtils) {
        //    this._inputUtils._removeStageText();
        //    this._inputUtils = null;
        //}
    }
};

TextField.prototype._setTextDirty = function() {
    this._setSizeDirty();
};

defineProperty(TextField.prototype, "text", {
    get: function () {
        return this._getText();
    },
    set: function (value) {
        this._setText(value);
    }
});

TextField.prototype._getText = function () {
    //if (this._type == Enums2D.TextFieldType.INPUT) {
    //    return this._inputUtils._getText();
    //}
    return this._text;
};

TextField.prototype._setBaseText = function (value) {
    value = value || "";
    if (this._text != value || this._displayAsPassword) {
        this._setTextDirty();
        this._text = value;
        var text = "";
        if (this._displayAsPassword) {
            for (var i = 0, num = this._text.length; i < num; i++) {
                switch (this._text.charAt(i)) {
                    case '\n' :
                        text += "\n";
                        break;
                    case '\r' :
                        break;
                    default :
                        text += '*';
                }
            }
        }
        else {
            text = this._text;
        }

        this.setMiddleStyle([[text]]);
    }
};

TextField.prototype._setText = function (value) {
    value = value || "";
    this._setBaseText(value);
    //if (this._inputUtils) {
    //    this._inputUtils._setText(this._text);
    //}
};

defineProperty(TextField.prototype, "displayAsPassword", {
    get: function () {
        return this._displayAsPassword;
    },
    set: function (value) {
        this._setDisplayAsPassword(value);
    }
});
TextField.prototype._setDisplayAsPassword = function (value) {
    if (this._displayAsPassword != value) {
        this._displayAsPassword = value;
        this._setText(this._text);
    }
};

defineProperty(TextField.prototype, "fontFamily", {
    get: function () {
        return this._fontFamily;
    },
    set: function (value) {
        this._setFontFamily(value);
    }
});
TextField.prototype._setFontFamily = function (value) {
    if (this._fontFamily != value) {
        this._setTextDirty();
        this._fontFamily = value;
    }
};

defineProperty(TextField.prototype, "size", {
    get: function () {
        return this._size;
    },
    set: function (value) {
        this._setSize(value);
    }
});
TextField.prototype._setSize = function (value) {
    if (this._size != value) {
        this._setTextDirty();
        this._size = value;
    }
};

defineProperty(TextField.prototype, "italic", {
    get: function () {
        return this._italic;
    },
    set: function (value) {
        this._setItalic(value);
    }
});
TextField.prototype._setItalic = function (value) {
    if (this._italic != value) {
        this._setTextDirty();
        this._italic = value;
    }
};

defineProperty(TextField.prototype, "bold", {
    get: function () {
        return this._bold;
    },
    set: function (value) {
        this._setBold(value);
    }
});
TextField.prototype._setBold = function (value) {
    if (this._bold != value) {
        this._setTextDirty();
        this._bold = value;
    }
};


defineProperty(TextField.prototype, "textColor", {
    get: function () {
        return this._textColor;
    },
    set: function (value) {
        this._setTextColor(value);
    }
});
TextField.prototype._setTextColor = function (value) {
    if (this._textColor != value) {
        this._setTextDirty();
        this._textColor = value;
        this._textColorString = Color.hexString(value);
    }
};

defineProperty(TextField.prototype, "strokeColor", {
    get: function () {
        return this._strokeColor;
    },
    set: function (value) {
        this._setStrokeColor(value);
    }
});
TextField.prototype._setStrokeColor = function (value) {
    if (this._strokeColor != value) {
        this._setTextDirty();
        this._strokeColor = value;
        this._strokeColorString = Color.hexString(value);
    }
};

defineProperty(TextField.prototype, "stroke", {
    get: function () {
        return this._stroke;
    },
    set: function (value) {
        this._setStroke(value);
    }
});
TextField.prototype._setStroke = function (value) {
    if (this._stroke != value) {
        this._setTextDirty();
        this._stroke = value;
    }
};

defineProperty(TextField.prototype, "textAlign", {
    get: function () {
        return this._textAlign;
    },
    set: function (value) {
        this._setTextAlign(value);
    }
});
TextField.prototype._setTextAlign = function (value) {
    if (this._textAlign != value) {
        this._setTextDirty();
        this._textAlign = value;
    }
};

defineProperty(TextField.prototype, "verticalAlign", {
    get: function () {
        return this._verticalAlign;
    },
    set: function (value) {
        this._setVerticalAlign(value);
    }
});
TextField.prototype._setVerticalAlign = function (value) {
    if (this._verticalAlign != value) {
        this._setTextDirty();
        this._verticalAlign = value;
    }
};

defineProperty(TextField.prototype, "maxChars", {
    get: function () {
        return this._maxChars;
    },
    set: function (value) {
        this._setMaxChars(value);
    }
});
TextField.prototype._setMaxChars = function (value) {
    if (this._maxChars != value) {
        this._maxChars = value;
    }
};

defineProperty(TextField.prototype, "maxScrollV", {
    get: function () {
        return this._numLines;
    }
});
defineProperty(TextField.prototype, "selectionBeginIndex", {
    get: function () {
        return 0;
    }
});
defineProperty(TextField.prototype, "selectionEndIndex", {
    get: function () {
        return 0;
    }
});
defineProperty(TextField.prototype, "caretIndex", {
    get: function () {
        return 0;
    }
});
TextField.prototype._setSelection = function (beginIndex, endIndex) {
};

defineProperty(TextField.prototype, "lineSpacing", {
    get: function () {
        return this._lineSpacing;
    },
    set: function (value) {
        this._setLineSpacing(value);
    }
});
TextField.prototype._setLineSpacing = function (value) {
    if (this._lineSpacing != value) {
        this._setTextDirty();
        this._lineSpacing = value;
    }
};

TextField.prototype._getLineHeight = function () {
    return this._lineSpacing + this._size;
};

defineProperty(TextField.prototype, "numLines", {
    get: function () {
        return this._numLines;
    }
});
defineProperty(TextField.prototype, "multiline", {
    get: function () {
        return this._multiline;
    },
    set: function (value) {
        this._setMultiline(value);
    }
});
TextField.prototype._setMultiline = function (value) {
    this._multiline = value;
    this._setDirty();
};

TextField.prototype.setFocus = function () {
};

TextField.prototype._onRemoveFromScene = function () {
    //if (this._type === Enums2D.TextFieldType.INPUT) {
    //    this._inputUtils._removeStageText();
    //}
};
TextField.prototype._onAddToScene = function () {
    //if (this._type == TextFieldType.INPUT) {
    //    this._inputUtils._addStageText();
    //}
};

TextField.prototype.update = function () {
    Renderable2D.prototype.update.call(this);

    //if (this._type == TextFieldType.INPUT) {
    //    if (this._normalDirty) {//本身有变化
    //        this._clearDirty();
    //        this._inputUtils._updateProperties();
    //    }
    //    else {//兼容可能父层有变化
    //        this._inputUtils._updateTransform();
    //    }
    //}
};

TextField.prototype._render = function (renderer) {
    this.drawText(renderer, false);
    this._clearDirty();
};

TextField.prototype._setTextArray = function (textArr) {
    var text = "";
    for (var i = 0; i < textArr.length; i++) {
        text += textArr[i][0];
        textArr[i][0] = this.changeToPassText(textArr[i][0]);
    }
    this._text = text;
    this.setMiddleStyle(textArr);
};

TextField.prototype.changeToPassText = function (text) {
    if (this._displayAsPassword) {
        var passText = "";
        for (var i = 0, num = text.length; i < num; i++) {
            switch (text.charAt(i)) {
                case '\n' :
                    passText += "\n";
                    break;
                case '\r' :
                    break;
                default :
                    passText += '*';
            }
        }
        return passText;
    }
    return text;
};

TextField.prototype.setMiddleStyle = function (textArr) {
    this._isArrayChanged = true;
    this._textArr = textArr;
};

this._linesArr = [];
TextField.prototype._getLinesArr = function () {
    if (!this._isArrayChanged) {
        return this._linesArr;
    }
    this._isArrayChanged = false;
    var text2Arr = this._textArr;
    var renderContext = MainContext.RendererContext;

    this._linesArr = [];
    var linesArr = this._linesArr;
    var lineW = 0;
    var lineH = 0;
    var lineCount = 0;
    for (var i = 0; i < text2Arr.length; i++) {
        var textInfo = text2Arr[i];
        textInfo[1] = textInfo[1] || {};
        lineH = Math.max(lineH, textInfo[1]["size"] || this._size);
        var text = textInfo[0].toString();
        var textArr = text.split(/(?:\r\n|\r|\n)/);

        for (var j = 0; j < textArr.length; j++) {
            if (linesArr[lineCount] == null) {
                linesArr[lineCount] = [];
                lineW = 0;
            }

            renderContext.setupFont(this);
            var w = renderContext.measureText(textArr[j]);
            if (this._width === 0) {//没有设置过宽
                lineW = w;

                linesArr[lineCount].push([textArr[j], textInfo[1], w]);
            }
            else {
                if (lineW + w < this._width) {//在设置范围内
                    linesArr[lineCount].push([textArr[j], textInfo[1], w]);
                    lineW += w;
                }
                else {
                    var k = 0;
                    var ww = 0;
                    var word = textArr[j];
                    for (; k < word.length; k++) {
                        w = renderContext.measureText(word.charAt(k));
                        if (lineW + w > this._width) {
                            break;
                        }
                        ww += w;
                        lineW += w;
                    }
                    if (k > 0) {
                        linesArr[lineCount].push([word.substring(0, k), textInfo[1], ww]);
                        textArr[j] = word.substring(k);
                    }

                    j--;
                }
            }
            if (j < textArr.length - 1) {//非最后一个
                linesArr[lineCount].push([lineW, lineH]);
                if (this._type == Enums2D.TextFieldType.INPUT && !this._multiline) {
                    return linesArr;
                }
                lineCount++;
            }
        }
        if (i == text2Arr.length - 1) {
            linesArr[lineCount].push([lineW, lineH]);
        }
    }
    return linesArr;
};

TextField.prototype.drawText = function (renderer, forMeasure) {

    var lines = this._getLinesArr();
    if (!lines) {
        //return Rect.Empty;
        this._localBounds.set(0, 0, 0, 0);
        return;
    }

    renderer.setupFont(this);
    var length = lines.length;
    var drawY = this._size * 0.5;

    var textHeight = 0;
    var maxWidth = 0;
    for (var i = 0; i < lines.length; i++) {
        var lineArr = lines[i];
        textHeight += lineArr[lineArr.length - 1][1];
        maxWidth = Math.max(lineArr[lineArr.length - 1][0], maxWidth);
    }
    textHeight += (length - 1) * this._lineSpacing;

    if (this._width > 0) {
        maxWidth = this._width;
    }

    var explicitHeight = this._height > 0 ? this._height : Number.POSITIVE_INFINITY;
    if (this._height > 0 && textHeight < explicitHeight) {
        var valign = 0;
        if (this._verticalAlign == Enums2D.VerticalAlign.MIDDLE)
            valign = 0.5;
        else if (this._verticalAlign == Enums2D.VerticalAlign.BOTTOM)
            valign = 1;
        drawY += valign * (explicitHeight - textHeight);
    }
    drawY = Math.round(drawY);
    var halign = 0;
    if (this._textAlign == Enums2D.HorizontalAlign.CENTER) {
        halign = 0.5;
    }
    else if (this._textAlign == Enums2D.HorizontalAlign.RIGHT) {
        halign = 1;
    }

    var drawX = 0;
    for (var i = 0; i < length; i++) {
        var lineArr = lines[i];

        drawX = Math.round((maxWidth - lineArr[lineArr.length - 1][0]) * halign);

        for (var j = 0; j < lineArr.length - 1; j++) {
            if (!forMeasure) {
                if (this._type == Enums2D.TextFieldType.INPUT) {
                    renderer.drawText(this, lineArr[j][0], drawX, drawY, lineArr[j][2], {});
                }
                else {
                    renderer.drawText(this, lineArr[j][0], drawX, drawY, lineArr[j][2], lineArr[j][1]);
                }
            }
            drawX += lineArr[j][2];
        }
        drawY += lineArr[lineArr.length - 1][1] + this._lineSpacing;

        if (this._height>0 && drawY - this._size * 0.5 > this._height) {
            break;
        }
    }

    this._localBounds.set(0, 0, maxWidth, textHeight);
};

TextField.prototype.getLocalBounds = function () {
    if(!this._dirtySize) return;

    var renderer = MainContext.RendererContext.renderer;
    this.drawText(renderer, true);

    this._dirtySize = false;
    return this._localBounds;
};

module.exports = TextField;