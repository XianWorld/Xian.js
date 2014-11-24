var Component = require("./component");
"use strict";


function GUIElement(type, opts) {
    opts || (opts = {});

    Component.call(this, type || "GUIElement", opts);
}

Component.extend(GUIElement);


module.exports = GUIElement;
