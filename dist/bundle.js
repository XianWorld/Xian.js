(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";


var Device = require("./base/device"),
    Time = require("./base/time"),
    now = Time.now,

    IS_SERVER = !(typeof(window) !== "undefined" && window.document),
    IS_CLIENT = !IS_SERVER,

    defineProperty = Object.defineProperty;


if (Device.mobile) {
    window.onerror = function (message, page, line) {
        alert("line: " + line + ", page: " + page + "\nmessage: " + message);
    };
}


/**
 * Holds all accessible Classes
 * @class Xian
 */
function Xian() {

    this.Phys2D = require("./phys2d/phys2d");

    this.AudioCtx = require("./base/audio_ctx");
    this.Class = require("./base/class");
    this.Device = require("./base/device");
    this.Dom = require("./base/dom");
    this.Enum = require("./base/enum");
    this.EventEmitter = require("./base/event_emitter");
    this.ObjectPool = require("./base/object_pool");
    this.requestAnimationFrame = require("./base/request_animation_frame");
    this.io = require("./base/socket.io");
    this.Time = require("./base/time");
    this.util = require("./base/util");
    //
    this.Shader = require("./core/assets/shaders/shader");
    this.ShaderLib = require("./core/assets/shaders/shader_lib");
    this.Asset = require("./core/assets/asset");
    this.AssetLoader = require("./core/assets/asset_loader");
    this.Assets = require("./core/assets/assets");
    this.AudioClip = require("./core/assets/audio_clip");
    this.Material = require("./core/assets/material");
    this.Mesh = require("./core/assets/mesh");
    this.SpriteSheet = require("./core/assets/sprite_sheet");
    this.Texture = require("./core/assets/texture");
    this.TextureCube = require("./core/assets/texture_cube");
    //
    this.BoneComponentManager = require("./core/component_managers/bone_component_manager");
    this.Camera2DComponentManager = require("./core/component_managers/camera_2d_component_manager");
    this.CameraComponentManager = require("./core/component_managers/camera_component_manager");
    this.ComponentManager = require("./core/component_managers/component_manager");
    this.LightComponentManager = require("./core/component_managers/light_component_manager");
    this.MeshAnimationComponentManager = require("./core/component_managers/mesh_animation_component_manager");
    this.MeshFilterComponentManager = require("./core/component_managers/mesh_filter_component_manager");
    this.SpriteComponentManager = require("./core/component_managers/sprite_component_manager");
    this.Transform2DComponentManager = require("./core/component_managers/transform_2d_component_manager");
    this.TransformComponentManager = require("./core/component_managers/transform_component_manager");

    this.ParticleSystem = require("./core/components/particle_system/particle_system");
    this.AudioSource = require("./core/components/audio_source");
    this.Camera = require("./core/components/camera");
    this.Camera2D = require("./core/components/camera_2d");
    this.Component = require("./core/components/component");
    this.GUIText = require("./core/components/gui_text");
    this.GUITexture = require("./core/components/gui_texture");
    this.Light = require("./core/components/light");
    this.MeshAnimation = require("./core/components/mesh_animation");
    this.MeshFilter = require("./core/components/mesh_filter");
    this.OrbitControl = require("./core/components/orbit_control");
    this.RigidBody2D = require("./core/components/rigid_body_2d");
    this.Sprite = require("./core/components/sprite");
    this.SpriteAnimation = require("./core/components/sprite_animation");
    this.Transform = require("./core/components/transform");
    this.Transform2D = require("./core/components/transform_2d");
    //
    this.BaseGame = require("./core/game/base_game");
    //this.ClientGame = require("./core/game/client_game");
    this.Game = require("./core/game/game");
    this.Config = require("./base/config");
    this.Log = require("./base/log");
    //
    this.GUIComponentManager = require("./core/gui/component_managers/gui_component_manager");

    this.GUIComponent = require("./core/gui/components/gui_component");
    //this.GUIContent = require("./core/gui/components/gui_content");
    this.GUITransform = require("./core/gui/components/gui_transform");
    //
    this.GUI = require("./core/gui/gui");
    this.GUIObject = require("./core/gui/gui_object");
    //this.GUIStyle = require("./core/gui/gui_style");
    //this.GUIStyleState = require("./core/gui/gui_style_state");
    //
    this.Handler = require("./core/input/handler");
    this.Input = require("./core/input/input");
    //
    this.Canvas = require("./core/renderer/canvas");
    this.RenderTarget = require("./core/renderer/render_target");
    this.Renderer = require("./core/renderer/renderer");
    this.ShaderChunks = require("./core/renderer/shader_chunks");

    this.World = require("./core/world/world");
    this.World2D = require("./core/world/world_2d");
    //
    this.Enums = require("./core/enums");
    this.GameObject = require("./core/game_object");
    this.Prefab = require("./core/prefab");
    this.Scene = require("./core/scene");
    //
    this.AABB2 = require("./math/aabb2");
    this.AABB3 = require("./math/aabb3");
    this.Color = require("./math/color");
    this.Mat2 = require("./math/mat2");
    this.Mat3 = require("./math/mat3");
    this.Mat32 = require("./math/mat32");
    this.Mat4 = require("./math/mat4");
    this.Mathf = require("./math/mathf");
    this.Quat = require("./math/quat");
    this.Rect = require("./math/rect");
    this.RectOffset = require("./math/rect_offset");
    this.Vec2 = require("./math/vec2");
    this.Vec3 = require("./math/vec3");
    this.Vec4 = require("./math/vec4");
}


defineProperty(Xian.prototype, "isServer", {
    get: function () {
        return IS_SERVER;
    }
});


defineProperty(Xian.prototype, "isClient", {
    get: function () {
        return IS_CLIENT;
    }
});


/**
 * attaches Xian to window/global and all subclasses
 */
Xian.prototype.globalize = function () {

    for (var key in this) window[key] = this[key];
    window.Xian = this;
};

/**
 * benchmarks function console.logs number of operations / second
 * @param String name
 * @param Function fn
 */
Xian.prototype.benchmark = function (name, fn, times) {
    times || (times = 1000);
    var start = 0.0,
        time = 0.0,
        i = times;

    while (i--) {
        start = now();
        fn();
        time += now() - start;
    }

    console.log(name + ":\n\t" + times / time + " (ops/sec)\n\t" + time / times + "(avg/call)");
};


module.exports = new Xian();

},{"./base/audio_ctx":7,"./base/class":8,"./base/config":9,"./base/device":10,"./base/dom":11,"./base/enum":12,"./base/event_emitter":13,"./base/log":14,"./base/object_pool":15,"./base/request_animation_frame":16,"./base/socket.io":17,"./base/time":18,"./base/util":19,"./core/assets/asset":20,"./core/assets/asset_loader":21,"./core/assets/assets":22,"./core/assets/audio_clip":23,"./core/assets/material":24,"./core/assets/mesh":25,"./core/assets/shaders/shader":35,"./core/assets/shaders/shader_lib":36,"./core/assets/sprite_sheet":37,"./core/assets/texture":38,"./core/assets/texture_cube":39,"./core/component_managers/bone_component_manager":40,"./core/component_managers/camera_2d_component_manager":41,"./core/component_managers/camera_component_manager":42,"./core/component_managers/component_manager":43,"./core/component_managers/light_component_manager":44,"./core/component_managers/mesh_animation_component_manager":45,"./core/component_managers/mesh_filter_component_manager":46,"./core/component_managers/sprite_component_manager":47,"./core/component_managers/transform_2d_component_manager":48,"./core/component_managers/transform_component_manager":49,"./core/components/audio_source":50,"./core/components/camera":52,"./core/components/camera_2d":53,"./core/components/component":54,"./core/components/gui_text":56,"./core/components/gui_texture":57,"./core/components/light":58,"./core/components/mesh_animation":59,"./core/components/mesh_filter":60,"./core/components/orbit_control":61,"./core/components/particle_system/particle_system":66,"./core/components/rigid_body_2d":68,"./core/components/sprite":69,"./core/components/sprite_animation":70,"./core/components/transform":71,"./core/components/transform_2d":72,"./core/enums":73,"./core/game/base_game":74,"./core/game/game":75,"./core/game_object":77,"./core/gui/component_managers/gui_component_manager":78,"./core/gui/components/gui_component":79,"./core/gui/components/gui_transform":80,"./core/gui/gui":81,"./core/gui/gui_object":82,"./core/input/handler":87,"./core/input/input":88,"./core/prefab":91,"./core/renderer/canvas":92,"./core/renderer/render_target":93,"./core/renderer/renderer":95,"./core/renderer/shader_chunks":96,"./core/scene":97,"./core/world/world":98,"./core/world/world_2d":99,"./math/aabb2":100,"./math/aabb3":101,"./math/color":102,"./math/mat2":103,"./math/mat3":104,"./math/mat32":105,"./math/mat4":106,"./math/mathf":107,"./math/quat":108,"./math/rect":109,"./math/rect_offset":110,"./math/vec2":111,"./math/vec3":112,"./math/vec4":113,"./phys2d/phys2d":131}],2:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":3,"ieee754":4,"is-array":5}],3:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],5:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],7:[function(require,module,exports){
(function (global){
var Dom = require('./dom');
var Device = require('./device');

'use strict';


var w = typeof(window) !== 'undefined' ? window : global,
    addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent,
    AudioContext = (
    w.AudioContext ||
    w.webkitAudioContext ||
    w.mozAudioContext ||
    w.oAudioContext ||
    w.msAudioContext
    ),
    audioContext = null;

if (typeof(AudioContext) !== 'undefined') {
    audioContext = new AudioContext();
    var AudioContextPrototype = AudioContext.prototype;

    AudioContextPrototype.UNLOCKED = !Device.mobile;
    AudioContextPrototype.createGain || (AudioContextPrototype.createGain = AudioContextPrototype.createGainNode);
    AudioContextPrototype.createPanner || (AudioContextPrototype.createPanner = AudioContextPrototype.createPannerNode);
    AudioContextPrototype.createDelay || (AudioContextPrototype.createDelay = AudioContextPrototype.createDelayNode);
    AudioContextPrototype.createScriptProcessor || (AudioContextPrototype.createScriptProcessor = AudioContextPrototype.createJavaScriptNode);

    var OscillatorPrototype = audioContext.createOscillator().constructor.prototype,
        BufferSourceNodePrototype = audioContext.createBufferSource().constructor.prototype,
        GainPrototype = audioContext.createGain().gain.constructor.prototype;

    OscillatorPrototype.start || (OscillatorPrototype.start = OscillatorPrototype.noteOn);
    OscillatorPrototype.stop || (OscillatorPrototype.stop = OscillatorPrototype.stop);
    OscillatorPrototype.setPeriodicWave || (OscillatorPrototype.setPeriodicWave = OscillatorPrototype.setWaveTable);

    BufferSourceNodePrototype.start || (BufferSourceNodePrototype.start = BufferSourceNodePrototype.noteOn);
    BufferSourceNodePrototype.stop || (BufferSourceNodePrototype.stop = BufferSourceNodePrototype.stop);

    GainPrototype.setTargetAtTime || (GainPrototype.setTargetAtTime = GainPrototype.setTargetValueAtTime);

    var onTouchStart = function (e) {
        window.removeEventListener('touchstart', onTouchStart, false);
        var buffer = audioContext.createBuffer(1, 1, 22050),
            source = audioContext.createBufferSource();

        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        audioContext.UNLOCKED = true;
        window.dispatchEvent(new Event('audiocontextunlock'));
    };
    window.addEventListener('touchstart', onTouchStart, false);
}

module.exports = audioContext != undefined ? audioContext : false;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./device":10,"./dom":11}],8:[function(require,module,exports){
var EventEmitter = require('./event_emitter');
'use strict';


var CLASS_ID = 0;

/**
 * @class Xian.Class
 * @extends Xian.EventEmitter
 */
function Class() {

    EventEmitter.call(this);

    this._id = ++CLASS_ID;
    this._jsonId = -1;
    this._name = '';
}

EventEmitter.extend(Class);


/**
 * returns new copy of this
 * @memberof Xian.Class
 * @return Class
 */
Class.prototype.clone = function () {

    return new this.constructor().copy(this);
};

/**
 * copies other of same class
 * @memberof Xian.Class
 * @param {Xian.Class} other
 * @return this
 */
Class.prototype.copy = function () {

    return this;
};

/**
 * clears data for GC
 * @memberof Xian.Class
 * @return this
 */
Class.prototype.clear = function () {

    return this;
};

/**
 * converts this to a JSON object
 * @memberof Xian.Class
 * @return json
 */
Class.prototype.toJSON = function (json) {
    json || (json = {});

    json._id = this._id;
    json._jsonId = this._id;
    json._className = this._className;

    return json;
};

/**
 * sets this from JSON object
 * @memberof Xian.Class
 * @return this
 */
Class.prototype.fromJSON = function (json) {

    this._jsonId = json._jsonId;

    return this;
};

/**
 * returns class name
 * @memberof Xian.Class
 * @return string
 */
Class.prototype.toString = function () {

    return this._name;
};

/**
 * @memberof Xian.Class
 * @param {constructor} child
 * @param {constructor} parent
 * @return child
 */
Class.extend = function (child, parent) {
    if (!parent) parent = this;

    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    child.extend = parent.extend;
    child.prototype._className = child._className = child.name;

    (this._children || (this._children = {}))[child.name] = child;
    child._parent = this;

    Class._classes[child.name] = child;

    if (parent.onExtend) {
        if (!child.onExtend) child.onExtend = parent.onExtend;
        parent.onExtend(child);
    }

    return child;
};

/**
 * creates new Xian.Class from json object
 * @memberof Xian.Class
 * @param {object} json
 * @return Xian.Class
 */
Class.fromJSON = function (json) {

    return new Class._classes[json._className]().fromJSON(json);
};

/**
 * creates new Xian.Class from string type
 * @memberof Xian.Class
 * @param {string} type
 * @return Xian.Class
 */
Class.create = function (type) {

    return new Class._classes[type];
};


Class._classes = {};


module.exports = Class;

},{"./event_emitter":13}],9:[function(require,module,exports){
'use strict';


var hasOwnProperty = Object.prototype.hasOwnProperty;


function Config() {

    this.debug = false;

    this.host = '127.0.0.1';
    this.port = 3000;

    this.FAKE_LAG = 0;
    this.SCENE_SYNC_RATE = 0.5;

    this.MAX_SCENE_STATES = 5;

    this.MIN_DELTA = 0.000001;
    this.MAX_DELTA = 0.25;
}


Config.prototype.fromJSON = function (json) {

    for (var key in json) {
        if (this[key] != undefined) this[key] = json[key];
    }

    return this;
};


Config.prototype.toJSON = function (json) {
    json || (json = {});

    for (var key in this) {
        if (this[key] != undefined && hasOwnProperty.call(this, key)) json[key] = this[key];
    }

    return json;
};


module.exports = new Config;

},{}],10:[function(require,module,exports){
"use strict";


function Device() {
    var userAgent = navigator.userAgent.toLowerCase(),
        audio = new Audio,
        video = document.createElement("video");

    this.userAgent = userAgent;

    this.pixelRatio = window.devicePixelRatio || 1;
    this.invPixelRatio = 1 / this.pixelRatio;

    this.browser = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i)[1];
    this.touch = "ontouchstart" in window;
    this.mobile = /android|webos|iphone|ipad|ipod|blackberry/i.test(userAgent);

    this.pointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
    this.fullScreen = "fullscreenElement" in document || "mozFullscreenElement" in document || "webkitFullscreenElement" in document;

    this.webgl = (function () {
        var canvas = document.createElement("canvas"),
            names = ["3d", "moz-webgl", "experimental-webgl", "webkit-3d", "webgl"],
            has, i = names.length;

        while (i--) {
            has = !!canvas.getContext(names[i]);
            if (has) break;
        }

        return has;
    }());

    this.canvas = (function () {
        var canvas = document.createElement("canvas"),
            has = !!canvas.getContext("2d");

        return has;
    }());

    this.gamepads = !!navigator.getGamepads || !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

    this.audioMpeg = !!audio.canPlayType("audio/mpeg");
    this.audioOgg = !!audio.canPlayType("audio/ogg");
    this.audioMp3 = !!audio.canPlayType("audio/mp3");
    this.audioMp4 = !!audio.canPlayType("audio/mp4");

    this.videoWebm = !!video.canPlayType("video/webm");
    this.videoOgg = !!video.canPlayType("video/ogg");
    this.videoMp4 = !!video.canPlayType("video/mp4");
}


module.exports = new Device;

},{}],11:[function(require,module,exports){
"use strict";


var SPLITER = /[ ,]+/,

    WEBGL_NAMES = ["webgl", "webkit-3d", "moz-webgl", "experimental-webgl", "3d"],
    WEBGL_ATTRIBUTES = {
        alpha: true,
        antialias: true,
        depth: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: true
    };


function Dom() {
}


var EVENT_CALLBACK_ID = 0,
    EVENT_CALLBACKS = {};
Dom.prototype.addEvent = function (obj, name, callback, ctx) {
    var names = name.split(SPLITER),
        i = names.length,
        scope = ctx || obj,
        afn = function (e) {
            callback.call(scope, e || window.event);
        };

    EVENT_CALLBACKS[(callback.__EVENT_CALLBACK_ID__ = EVENT_CALLBACK_ID++)] = afn;

    while (i--) {
        name = names[i];

        if (obj.attachEvent) {
            obj.attachEvent("on" + name, afn);
        } else {
            obj.addEventListener(name, afn, false);
        }
    }
};


Dom.prototype.removeEvent = function (obj, name, callback, ctx) {
    var names = name.split(SPLITER),
        i = names.length,
        scope = ctx || obj,
        id = callback.__EVENT_CALLBACK_ID__,
        afn = EVENT_CALLBACKS[id];

    EVENT_CALLBACKS[id] = null;

    while (i--) {
        name = names[i];

        if (obj.detachEvent) {
            obj.detachEvent("on" + name, afn);
        } else {
            obj.removeEventListener(name, afn, false);
        }
    }
};


Dom.prototype.addMeta = function (id, name, content) {
    var meta = document.createElement("meta"),
        head = document.head;

    if (id) meta.id = id;
    if (name) meta.name = name;
    if (content) meta.content = content;

    head.insertBefore(meta, head.firstChild);
};


Dom.prototype.getWebGLContext = function (canvas, attributes) {
    var key, gl, i = WEBGL_NAMES.length;

    attributes || (attributes = {});
    for (key in WEBGL_ATTRIBUTES) {
        if (attributes[key] == undefined) attributes[key] = WEBGL_ATTRIBUTES[key];
    }

    while (i--) {
        try {
            gl = canvas.getContext(WEBGL_NAMES[i], attributes);
        } catch (err) {
            console.error("Dom.getWebGLContext: could not get a WebGL Context " + (err.message || ""));
        }
        if (gl) break;
    }

    if (!gl) throw "Dom.getWebGLContext: could not get a WebGL Context";

    return gl;
};


var createShader = Dom.prototype.createShader = function (gl, source, type) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Dom.createShader: problem compiling shader " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return undefined;
    }

    return shader;
};


Dom.prototype.createProgram = function (gl, vertex, fragment) {
    var program = gl.createProgram(),
        shader;

    shader = createShader(gl, vertex, gl.VERTEX_SHADER);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);

    shader = createShader(gl, fragment, gl.FRAGMENT_SHADER);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);

    gl.linkProgram(program);
    gl.validateProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Dom.createProgram: problem compiling Program " + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return undefined;
    }

    return program;
};


module.exports = new Dom;

},{}],12:[function(require,module,exports){
var util = require("./util");
"use strict";


var isArray = util.isArray,
    SPLITER = /[ ,]+/,
    COUNTER = 0;


function Enum(enums) {
    enums = isArray(enums) ? enums : enums.split(SPLITER);
    var i = enums.length;

    while (i--) this[enums[i]] = ++COUNTER;
}


Enum.prototype.add = function (enums) {
    enums = isArray(enums) ? enums : enums.split(SPLITER);
    var i = enums.length;

    while (i--) this[enums[i]] = ++COUNTER;

    return this;
};


Enum.prototype.in = function (num) {
    var key;

    for (key in this) {
        if (this[key] == num) return true;
    }

    return false;
};


module.exports = Enum;

},{"./util":19}],13:[function(require,module,exports){
'use strict';


var shift = Array.prototype.shift;


/**
 * @class Xian.EventEmitter
 */
function EventEmitter() {

    this._events = {};
}

/**
 * attaches function to an event
 * @memberof Xian.EventEmitter
 * @param {string} type
 * @param {function} listener
 * @param {object} ctx
 * @return this
 */
EventEmitter.prototype.on = function (type, listener, ctx) {
    var events = this._events;

    (events[type] || (events[type] = [])).push({
        listener: listener,
        ctx: ctx || this
    });

    return this;
};

/**
 * attaches function to an event, on the first call its removed
 * @memberof Xian.EventEmitter
 * @param {string} type
 * @param {function} listener
 * @param {object} ctx
 * @return this
 */
EventEmitter.prototype.once = function (type, listener, ctx) {
    var _this = this;
    ctx = ctx || this;

    function once() {
        _this.off(type, once, ctx);
        listener.apply(ctx, arguments);
    }

    return this.on(type, once, ctx);
};

/**
 * attaches function to an event on another object
 * @memberof Xian.EventEmitter
 * @param {object} obj
 * @param {string} type
 * @param {function} listener
 * @param {object} ctx
 * @return this
 */
EventEmitter.prototype.listenTo = function (obj, type, listener, ctx) {
    if (!(obj instanceof EventEmitter)) throw "Can't listen to Object, it's not a instance of EventEmitter";

    obj.on(type, listener, ctx || this);

    return this;
};

/**
 * removes function from an event
 * @memberof Xian.EventEmitter
 * @param {string} type
 * @param {function} listener
 * @param {object} ctx
 * @return this
 */
EventEmitter.prototype.off = function (type, listener, ctx) {
    var thisEvents = this._events,
        events, event,
        i;

    if (!type) {
        for (i in thisEvents)
            if ((events = thisEvents[i])) events.length = 0;
        return this;
    }

    events = thisEvents[type];
    if (!events) return this;

    if (!listener) {
        events.length = 0;
    } else {
        ctx = ctx || this;
        i = events.length;

        while (i--) {
            event = events[i];

            if (event.listener === listener && event.ctx === ctx) {
                events.splice(i, 1);
                break;
            }
        }
    }

    return this;
};

/**
 * emits event type
 * @memberof Xian.EventEmitter
 * @param {string} type
 * @return this
 */
EventEmitter.prototype.emit = function (type) {
    var events = this._events[type],
        a1, a2, a3, a4,
        length, event,
        i;

    if (!events || !events.length) return this;
    length = arguments.length;

    if (length === 1) {
        i = events.length;
        while (i--) {
            (event = events[i]).listener.call(event.ctx);
        }
    } else if (length === 2) {
        a1 = arguments[1];
        i = events.length;
        while (i--) {
            (event = events[i]).listener.call(event.ctx, a1);
        }
    } else if (length === 3) {
        a1 = arguments[1];
        a2 = arguments[2];
        i = events.length;
        while (i--) {
            (event = events[i]).listener.call(event.ctx, a1, a2);
        }
    } else if (length === 4) {
        a1 = arguments[1];
        a2 = arguments[2];
        a3 = arguments[3];
        i = events.length;
        while (i--) {
            (event = events[i]).listener.call(event.ctx, a1, a2, a3);
        }
    } else if (length === 5) {
        a1 = arguments[1];
        a2 = arguments[2];
        a3 = arguments[3];
        a4 = arguments[4];
        i = events.length;
        while (i--) {
            (event = events[i]).listener.call(event.ctx, a1, a2, a3, a4);
        }
    } else {
        shift.apply(arguments);
        i = events.length;
        while (i--) {
            (event = events[i]).listener.apply(event.ctx, arguments);
        }
    }

    return this;
};

/**
 * @memberof Xian.EventEmitter
 * @param {constructor} child
 * @param {constructor} parent
 * @return child
 */
EventEmitter.extend = function (child, parent) {
    if (!parent) parent = this;

    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    (this._children || (this._children = {}))[child.name] = child;
    child._parent = this;

    child.extend = parent.extend || this.extend;

    if (parent.onExtend) {
        if (!child.onExtend) child.onExtend = parent.onExtend;
        parent.onExtend(child);
    }

    return child;
};


module.exports = EventEmitter;

},{}],14:[function(require,module,exports){
var Device = require("./device");
var util = require("./util");
var Config = require("./config");
"use strict";


var each = util.each;


function Log() {
}


if (Device.mobile) {
    var slice = Array.prototype.slice;

    Log.prototype.debug = Log.prototype.info = Log.prototype.log = function () {
        if (!Config.debug) return;
        alert(slice.call(arguments, 0));
    };

    Log.prototype.warn = function () {
        if (!(Config.debug || Config.warn)) return;
        alert(slice.call(arguments, 0));
    };

    Log.prototype.error = function () {
        if (!(Config.debug || Config.error)) return;
        alert(slice.call(arguments, 0));
    };
} else {
    Log.prototype.debug = Log.prototype.info = Log.prototype.log = function () {
        if (!Config.debug) return;
        console.log.apply(console, arguments);
    };

    Log.prototype.warn = function () {
        if (!(Config.debug || Config.warn)) return;
        console.warn.apply(console, arguments);
    };

    Log.prototype.error = function () {
        if (!(Config.debug || Config.error)) return;
        console.error.apply(console, arguments);
    };
}


var CACHE = {};
Log.prototype.once = function () {
    if (!(Config.debug || Config.error) || CACHE[cacheKey(arguments)]) return;

    CACHE[cacheKey(arguments)] = true;
    this.error.apply(this, arguments);
};


function cacheKey(args) {
    var key = "",
        i;

    for (i = args.length; i--;) key += args[i];

    return key;
};


Log.prototype.object = function (obj, values, tabs) {
    if (!Config.debug) return "";
    var str = "";

    tabs || (tabs = "");
    values || (values = []);

    each(obj, function (value, i) {
        if (~values.indexOf(value)) return;

        var type = typeof(value),
            tmp;

        if (type === "object") {
            tmp = tabs;
            values.push(value);
            tabs += "\t";
            str += tabs + i + " = " + this.object(value, values, tabs) + "\n";
            tabs = tmp;
        } else if (type !== "function") {
            str += tabs + i + " = " + value + "\n";
        } else {
            values.push(value);
            str += tabs + value + "\n";
        }
    }, this);

    return str;
};


module.exports = new Log;

},{"./config":9,"./device":10,"./util":19}],15:[function(require,module,exports){
"use strict";


function ObjectPool(constructor) {

    this.pooled = [];
    this.objects = [];
    this.object = constructor;
}


ObjectPool.prototype.create = function () {
    var pooled = this.pooled,
        object = pooled.length ? pooled.pop() : new this.object;

    this.objects.push(object);
    return object;
};


ObjectPool.prototype.removeObject = function (object) {
    var objects = this.objects,
        pooled = this.pooled,
        index = objects.indexOf(object);

    if (index > -1) {
        pooled.push(object);
        objects.splice(index, 1);
    }

    return this;
};


ObjectPool.prototype.remove = ObjectPool.prototype.removeObjects = function () {
    var i = arguments.length;

    while (i--) this.removeObject(arguments[i]);

    return this;
};


ObjectPool.prototype.clear = function () {
    var objects = this.objects,
        pooled = this.pooled,
        i = objects.length;

    while (i--) pooled.push(objects[i]);
    objects.length = 0;

    return this;
};


ObjectPool.prototype.clearForEach = function (fn) {
    var objects = this.objects,
        pooled = this.pooled,
        object,
        i = objects.length;

    while (i--) {
        object = objects[i];

        pooled.push(object);
        fn(object);
    }
    objects.length = 0;

    return this;
};


ObjectPool.prototype.empty = function () {

    this.pooled.length = this.objects.length = 0;

    return this;
};


module.exports = ObjectPool;

},{}],16:[function(require,module,exports){
(function (global){
"use strict";


var RATE = 1000 / 60,
    w = typeof(window) !== "undefined" ? window : global;

module.exports = (
w.requestAnimationFrame ||
w.webkitRequestAnimationFrame ||
w.mozRequestAnimationFrame ||
w.oRequestAnimationFrame ||
w.msRequestAnimationFrame ||
function (callback) {

    return w.setTimeout(callback, RATE);
}
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function() {
    var io = (function(exports, global) {
        var io = exports;
        io.version = "0.9.16";
        io.protocol = 1;
        io.transports = [];
        io.j = [];
        io.sockets = {};
        io.connect = function(host, details) {
            var uri = io.util.parseUri(host),
                uuri, socket;
            if (global && global.location) {
                uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
                uri.host = uri.host || (global.document ? global.document.domain : global.location.hostname);
                uri.port = uri.port || global.location.port
            }
            uuri = io.util.uniqueUri(uri);
            var options = {
                host: uri.host,
                secure: "https" == uri.protocol,
                port: uri.port || ("https" == uri.protocol ? 443 : 80),
                query: uri.query || ""
            };
            io.util.merge(options, details);
            if (options["force new connection"] || !io.sockets[uuri]) {
                socket = new io.Socket(options)
            }
            if (!options["force new connection"] && socket) {
                io.sockets[uuri] = socket
            }
            socket = socket || io.sockets[uuri];
            return socket.of(uri.path.length > 1 ? uri.path : "")
        };
        return io
    })({}, this);
    (function(exports, global) {
        var util = exports.util = {};
        var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        util.parseUri = function(str) {
            var m = re.exec(str || ""),
                uri = {}, i = 14;
            while (i--) {
                uri[parts[i]] = m[i] || ""
            }
            return uri
        };
        util.uniqueUri = function(uri) {
            var protocol = uri.protocol,
                host = uri.host,
                port = uri.port;
            if ("document" in global) {
                host = host || document.domain;
                port = port || (protocol == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)
            } else {
                host = host || "localhost";
                if (!port && protocol == "https") {
                    port = 443
                }
            }
            return (protocol || "http") + "://" + host + ":" + (port || 80)
        };
        util.query = function(base, addition) {
            var query = util.chunkQuery(base || ""),
                components = [];
            util.merge(query, util.chunkQuery(addition || ""));
            for (var part in query) {
                if (query.hasOwnProperty(part)) {
                    components.push(part + "=" + query[part])
                }
            }
            return components.length ? "?" + components.join("&") : ""
        };
        util.chunkQuery = function(qs) {
            var query = {}, params = qs.split("&"),
                i = 0,
                l = params.length,
                kv;
            for (; i < l; ++i) {
                kv = params[i].split("=");
                if (kv[0]) {
                    query[kv[0]] = kv[1]
                }
            }
            return query
        };
        var pageLoaded = false;
        util.load = function(fn) {
            if ("document" in global && document.readyState === "complete" || pageLoaded) {
                return fn()
            }
            util.on(global, "load", fn, false)
        };
        util.on = function(element, event, fn, capture) {
            if (element.attachEvent) {
                element.attachEvent("on" + event, fn)
            } else {
                if (element.addEventListener) {
                    element.addEventListener(event, fn, capture)
                }
            }
        };
        util.request = function(xdomain) {
            if (xdomain && "undefined" != typeof XDomainRequest && !util.ua.hasCORS) {
                return new XDomainRequest()
            }
            if ("undefined" != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
                return new XMLHttpRequest()
            }
            if (!xdomain) {
                try {
                    return new window[(["Active"].concat("Object").join("X"))]("Microsoft.XMLHTTP")
                } catch (e) {}
            }
            return null
        };
        if ("undefined" != typeof window) {
            util.load(function() {
                pageLoaded = true
            })
        }
        util.defer = function(fn) {
            if (!util.ua.webkit || "undefined" != typeof importScripts) {
                return fn()
            }
            util.load(function() {
                setTimeout(fn, 100)
            })
        };
        util.merge = function merge(target, additional, deep, lastseen) {
            var seen = lastseen || [],
                depth = typeof deep == "undefined" ? 2 : deep,
                prop;
            for (prop in additional) {
                if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
                    if (typeof target[prop] !== "object" || !depth) {
                        target[prop] = additional[prop];
                        seen.push(additional[prop])
                    } else {
                        util.merge(target[prop], additional[prop], depth - 1, seen)
                    }
                }
            }
            return target
        };
        util.mixin = function(ctor, ctor2) {
            util.merge(ctor.prototype, ctor2.prototype)
        };
        util.inherit = function(ctor, ctor2) {
            function f() {}
            f.prototype = ctor2.prototype;
            ctor.prototype = new f
        };
        util.isArray = Array.isArray || function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]"
        };
        util.intersect = function(arr, arr2) {
            var ret = [],
                longest = arr.length > arr2.length ? arr : arr2,
                shortest = arr.length > arr2.length ? arr2 : arr;
            for (var i = 0, l = shortest.length; i < l; i++) {
                if (~util.indexOf(longest, shortest[i])) {
                    ret.push(shortest[i])
                }
            }
            return ret
        };
        util.indexOf = function(arr, o, i) {
            for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; i < j && arr[i] !== o; i++) {}
            return j <= i ? -1 : i
        };
        util.toArray = function(enu) {
            var arr = [];
            for (var i = 0, l = enu.length; i < l; i++) {
                arr.push(enu[i])
            }
            return arr
        };
        util.ua = {};
        util.ua.hasCORS = "undefined" != typeof XMLHttpRequest && (function() {
            try {
                var a = new XMLHttpRequest()
            } catch (e) {
                return false
            }
            return a.withCredentials != undefined
        })();
        util.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent);
        util.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
    })("undefined" != typeof io ? io : module.exports, this);
    (function(exports, io) {
        exports.EventEmitter = EventEmitter;

        function EventEmitter() {}
        EventEmitter.prototype.on = function(name, fn) {
            if (!this.$events) {
                this.$events = {}
            }
            if (!this.$events[name]) {
                this.$events[name] = fn
            } else {
                if (io.util.isArray(this.$events[name])) {
                    this.$events[name].push(fn)
                } else {
                    this.$events[name] = [this.$events[name], fn]
                }
            }
            return this
        };
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;
        EventEmitter.prototype.once = function(name, fn) {
            var self = this;

            function on() {
                self.removeListener(name, on);
                fn.apply(this, arguments)
            }
            on.listener = fn;
            this.on(name, on);
            return this
        };
        EventEmitter.prototype.removeListener = function(name, fn) {
            if (this.$events && this.$events[name]) {
                var list = this.$events[name];
                if (io.util.isArray(list)) {
                    var pos = -1;
                    for (var i = 0, l = list.length; i < l; i++) {
                        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
                            pos = i;
                            break
                        }
                    }
                    if (pos < 0) {
                        return this
                    }
                    list.splice(pos, 1);
                    if (!list.length) {
                        delete this.$events[name]
                    }
                } else {
                    if (list === fn || (list.listener && list.listener === fn)) {
                        delete this.$events[name]
                    }
                }
            }
            return this
        };
        EventEmitter.prototype.removeAllListeners = function(name) {
            if (name === undefined) {
                this.$events = {};
                return this
            }
            if (this.$events && this.$events[name]) {
                this.$events[name] = null
            }
            return this
        };
        EventEmitter.prototype.listeners = function(name) {
            if (!this.$events) {
                this.$events = {}
            }
            if (!this.$events[name]) {
                this.$events[name] = []
            }
            if (!io.util.isArray(this.$events[name])) {
                this.$events[name] = [this.$events[name]]
            }
            return this.$events[name]
        };
        EventEmitter.prototype.emit = function(name) {
            if (!this.$events) {
                return false
            }
            var handler = this.$events[name];
            if (!handler) {
                return false
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if ("function" == typeof handler) {
                handler.apply(this, args)
            } else {
                if (io.util.isArray(handler)) {
                    var listeners = handler.slice();
                    for (var i = 0, l = listeners.length; i < l; i++) {
                        listeners[i].apply(this, args)
                    }
                } else {
                    return false
                }
            }
            return true
        }
    })("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
    (function(exports, nativeJSON) {
        if (nativeJSON && nativeJSON.parse) {
            return exports.JSON = {
                parse: nativeJSON.parse,
                stringify: nativeJSON.stringify
            }
        }
        var JSON = exports.JSON = {};

        function f(n) {
            return n < 10 ? "0" + n : n
        }

        function date(d) {
            return isFinite(d.valueOf()) ? d.getUTCFullYear() + "-" + f(d.getUTCMonth() + 1) + "-" + f(d.getUTCDate()) + "T" + f(d.getUTCHours()) + ":" + f(d.getUTCMinutes()) + ":" + f(d.getUTCSeconds()) + "Z" : null
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap,
                partial, value = holder[key];
            if (value instanceof Date) {
                value = date(key)
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value)
            }
            switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null"
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null"
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === "string") {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v
            }
        }
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        };
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    })("undefined" != typeof io ? io : module.exports, typeof JSON !== "undefined" ? JSON : undefined);
    (function(exports, io) {
        var parser = exports.parser = {};
        var packets = parser.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"];
        var reasons = parser.reasons = ["transport not supported", "client not handshaken", "unauthorized"];
        var advice = parser.advice = ["reconnect"];
        var JSON = io.JSON,
            indexOf = io.util.indexOf;
        parser.encodePacket = function(packet) {
            var type = indexOf(packets, packet.type),
                id = packet.id || "",
                endpoint = packet.endpoint || "",
                ack = packet.ack,
                data = null;
            switch (packet.type) {
                case "error":
                    var reason = packet.reason ? indexOf(reasons, packet.reason) : "",
                        adv = packet.advice ? indexOf(advice, packet.advice) : "";
                    if (reason !== "" || adv !== "") {
                        data = reason + (adv !== "" ? ("+" + adv) : "")
                    }
                    break;
                case "message":
                    if (packet.data !== "") {
                        data = packet.data
                    }
                    break;
                case "event":
                    var ev = {
                        name: packet.name
                    };
                    if (packet.args && packet.args.length) {
                        ev.args = packet.args
                    }
                    data = JSON.stringify(ev);
                    break;
                case "json":
                    data = JSON.stringify(packet.data);
                    break;
                case "connect":
                    if (packet.qs) {
                        data = packet.qs
                    }
                    break;
                case "ack":
                    data = packet.ackId + (packet.args && packet.args.length ? "+" + JSON.stringify(packet.args) : "");
                    break
            }
            var encoded = [type, id + (ack == "data" ? "+" : ""), endpoint];
            if (data !== null && data !== undefined) {
                encoded.push(data)
            }
            return encoded.join(":")
        };
        parser.encodePayload = function(packets) {
            var decoded = "";
            if (packets.length == 1) {
                return packets[0]
            }
            for (var i = 0, l = packets.length; i < l; i++) {
                var packet = packets[i];
                decoded += "\ufffd" + packet.length + "\ufffd" + packets[i]
            }
            return decoded
        };
        var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        parser.decodePacket = function(data) {
            var pieces = data.match(regexp);
            if (!pieces) {
                return {}
            }
            var id = pieces[2] || "",
                data = pieces[5] || "",
                packet = {
                    type: packets[pieces[1]],
                    endpoint: pieces[4] || ""
                };
            if (id) {
                packet.id = id;
                if (pieces[3]) {
                    packet.ack = "data"
                } else {
                    packet.ack = true
                }
            }
            switch (packet.type) {
                case "error":
                    var pieces = data.split("+");
                    packet.reason = reasons[pieces[0]] || "";
                    packet.advice = advice[pieces[1]] || "";
                    break;
                case "message":
                    packet.data = data || "";
                    break;
                case "event":
                    try {
                        var opts = JSON.parse(data);
                        packet.name = opts.name;
                        packet.args = opts.args
                    } catch (e) {}
                    packet.args = packet.args || [];
                    break;
                case "json":
                    try {
                        packet.data = JSON.parse(data)
                    } catch (e) {}
                    break;
                case "connect":
                    packet.qs = data || "";
                    break;
                case "ack":
                    var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
                    if (pieces) {
                        packet.ackId = pieces[1];
                        packet.args = [];
                        if (pieces[3]) {
                            try {
                                packet.args = pieces[3] ? JSON.parse(pieces[3]) : []
                            } catch (e) {}
                        }
                    }
                    break;
                case "disconnect":
                case "heartbeat":
                    break
            }
            return packet
        };
        parser.decodePayload = function(data) {
            if (data.charAt(0) == "\ufffd") {
                var ret = [];
                for (var i = 1, length = ""; i < data.length; i++) {
                    if (data.charAt(i) == "\ufffd") {
                        ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
                        i += Number(length) + 1;
                        length = ""
                    } else {
                        length += data.charAt(i)
                    }
                }
                return ret
            } else {
                return [parser.decodePacket(data)]
            }
        }
    })("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
    (function(exports, io) {
        exports.Transport = Transport;

        function Transport(socket, sessid) {
            this.socket = socket;
            this.sessid = sessid
        }
        io.util.mixin(Transport, io.EventEmitter);
        Transport.prototype.heartbeats = function() {
            return true
        };
        Transport.prototype.onData = function(data) {
            this.clearCloseTimeout();
            if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
                this.setCloseTimeout()
            }
            if (data !== "") {
                var msgs = io.parser.decodePayload(data);
                if (msgs && msgs.length) {
                    for (var i = 0, l = msgs.length; i < l; i++) {
                        this.onPacket(msgs[i])
                    }
                }
            }
            return this
        };
        Transport.prototype.onPacket = function(packet) {
            this.socket.setHeartbeatTimeout();
            if (packet.type == "heartbeat") {
                return this.onHeartbeat()
            }
            if (packet.type == "connect" && packet.endpoint == "") {
                this.onConnect()
            }
            if (packet.type == "error" && packet.advice == "reconnect") {
                this.isOpen = false
            }
            this.socket.onPacket(packet);
            return this
        };
        Transport.prototype.setCloseTimeout = function() {
            if (!this.closeTimeout) {
                var self = this;
                this.closeTimeout = setTimeout(function() {
                    self.onDisconnect()
                }, this.socket.closeTimeout)
            }
        };
        Transport.prototype.onDisconnect = function() {
            if (this.isOpen) {
                this.close()
            }
            this.clearTimeouts();
            this.socket.onDisconnect();
            return this
        };
        Transport.prototype.onConnect = function() {
            this.socket.onConnect();
            return this
        };
        Transport.prototype.clearCloseTimeout = function() {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null
            }
        };
        Transport.prototype.clearTimeouts = function() {
            this.clearCloseTimeout();
            if (this.reopenTimeout) {
                clearTimeout(this.reopenTimeout)
            }
        };
        Transport.prototype.packet = function(packet) {
            this.send(io.parser.encodePacket(packet))
        };
        Transport.prototype.onHeartbeat = function() {
            this.packet({
                type: "heartbeat"
            })
        };
        Transport.prototype.onOpen = function() {
            this.isOpen = true;
            this.clearCloseTimeout();
            this.socket.onOpen()
        };
        Transport.prototype.onClose = function() {
            this.isOpen = false;
            this.socket.onClose();
            this.onDisconnect()
        };
        Transport.prototype.prepareUrl = function() {
            var options = this.socket.options;
            return this.scheme() + "://" + options.host + ":" + options.port + "/" + options.resource + "/" + io.protocol + "/" + this.name + "/" + this.sessid
        };
        Transport.prototype.ready = function(socket, fn) {
            fn.call(this)
        }
    })("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
    (function(exports, io, global) {
        exports.Socket = Socket;

        function Socket(options) {
            this.options = {
                port: 80,
                secure: false,
                document: "document" in global ? document : false,
                resource: "socket.io",
                transports: io.transports,
                "connect timeout": 10000,
                "try multiple transports": true,
                "reconnect": true,
                "reconnection delay": 500,
                "reconnection limit": Infinity,
                "reopen delay": 3000,
                "max reconnection attempts": 10,
                "sync disconnect on unload": false,
                "auto connect": true,
                "flash policy port": 10843,
                "manualFlush": false
            };
            io.util.merge(this.options, options);
            this.connected = false;
            this.open = false;
            this.connecting = false;
            this.reconnecting = false;
            this.namespaces = {};
            this.buffer = [];
            this.doBuffer = false;
            if (this.options["sync disconnect on unload"] && (!this.isXDomain() || io.util.ua.hasCORS)) {
                var self = this;
                io.util.on(global, "beforeunload", function() {
                    self.disconnectSync()
                }, false)
            }
            if (this.options["auto connect"]) {
                this.connect()
            }
        }
        io.util.mixin(Socket, io.EventEmitter);
        Socket.prototype.of = function(name) {
            if (!this.namespaces[name]) {
                this.namespaces[name] = new io.SocketNamespace(this, name);
                if (name !== "") {
                    this.namespaces[name].packet({
                        type: "connect"
                    })
                }
            }
            return this.namespaces[name]
        };
        Socket.prototype.publish = function() {
            this.emit.apply(this, arguments);
            var nsp;
            for (var i in this.namespaces) {
                if (this.namespaces.hasOwnProperty(i)) {
                    nsp = this.of(i);
                    nsp.$emit.apply(nsp, arguments)
                }
            }
        };

        function empty() {}
        Socket.prototype.handshake = function(fn) {
            var self = this,
                options = this.options;

            function complete(data) {
                if (data instanceof Error) {
                    self.connecting = false;
                    self.onError(data.message)
                } else {
                    fn.apply(null, data.split(":"))
                }
            }
            var url = ["http" + (options.secure ? "s" : "") + ":/", options.host + ":" + options.port, options.resource, io.protocol, io.util.query(this.options.query, "t=" + +new Date)].join("/");
            if (this.isXDomain() && !io.util.ua.hasCORS) {
                var insertAt = document.getElementsByTagName("script")[0],
                    script = document.createElement("script");
                script.src = url + "&jsonp=" + io.j.length;
                insertAt.parentNode.insertBefore(script, insertAt);
                io.j.push(function(data) {
                    complete(data);
                    script.parentNode.removeChild(script)
                })
            } else {
                var xhr = io.util.request();
                xhr.open("GET", url, true);
                if (this.isXDomain()) {
                    xhr.withCredentials = true
                }
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = empty;
                        if (xhr.status == 200) {
                            complete(xhr.responseText)
                        } else {
                            if (xhr.status == 403) {
                                self.onError(xhr.responseText)
                            } else {
                                self.connecting = false;
                                !self.reconnecting && self.onError(xhr.responseText)
                            }
                        }
                    }
                };
                xhr.send(null)
            }
        };
        Socket.prototype.getTransport = function(override) {
            var transports = override || this.transports;
            for (var i = 0, transport; transport = transports[i]; i++) {
                if (io.Transport[transport] && io.Transport[transport].check(this) && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
                    return new io.Transport[transport](this, this.sessionid)
                }
            }
            return null
        };
        Socket.prototype.connect = function(fn) {
            if (this.connecting) {
                return this
            }
            var self = this;
            self.connecting = true;
            this.handshake(function(sid, heartbeat, close, transports) {
                self.sessionid = sid;
                self.closeTimeout = close * 1000;
                self.heartbeatTimeout = heartbeat * 1000;
                if (!self.transports) {
                    self.transports = self.origTransports = (transports ? io.util.intersect(transports.split(","), self.options.transports) : self.options.transports)
                }
                self.setHeartbeatTimeout();

                function connect(transports) {
                    if (self.transport) {
                        self.transport.clearTimeouts()
                    }
                    self.transport = self.getTransport(transports);
                    if (!self.transport) {
                        return self.publish("connect_failed")
                    }
                    self.transport.ready(self, function() {
                        self.connecting = true;
                        self.publish("connecting", self.transport.name);
                        self.transport.open();
                        if (self.options["connect timeout"]) {
                            self.connectTimeoutTimer = setTimeout(function() {
                                if (!self.connected) {
                                    self.connecting = false;
                                    if (self.options["try multiple transports"]) {
                                        var remaining = self.transports;
                                        while (remaining.length > 0 && remaining.splice(0, 1)[0] != self.transport.name) {}
                                        if (remaining.length) {
                                            connect(remaining)
                                        } else {
                                            self.publish("connect_failed")
                                        }
                                    }
                                }
                            }, self.options["connect timeout"])
                        }
                    })
                }
                connect(self.transports);
                self.once("connect", function() {
                    clearTimeout(self.connectTimeoutTimer);
                    fn && typeof fn == "function" && fn()
                })
            });
            return this
        };
        Socket.prototype.setHeartbeatTimeout = function() {
            clearTimeout(this.heartbeatTimeoutTimer);
            if (this.transport && !this.transport.heartbeats()) {
                return
            }
            var self = this;
            this.heartbeatTimeoutTimer = setTimeout(function() {
                self.transport.onClose()
            }, this.heartbeatTimeout)
        };
        Socket.prototype.packet = function(data) {
            if (this.connected && !this.doBuffer) {
                this.transport.packet(data)
            } else {
                this.buffer.push(data)
            }
            return this
        };
        Socket.prototype.setBuffer = function(v) {
            this.doBuffer = v;
            if (!v && this.connected && this.buffer.length) {
                if (!this.options["manualFlush"]) {
                    this.flushBuffer()
                }
            }
        };
        Socket.prototype.flushBuffer = function() {
            this.transport.payload(this.buffer);
            this.buffer = []
        };
        Socket.prototype.disconnect = function() {
            if (this.connected || this.connecting) {
                if (this.open) {
                    this.of("").packet({
                        type: "disconnect"
                    })
                }
                this.onDisconnect("booted")
            }
            return this
        };
        Socket.prototype.disconnectSync = function() {
            var xhr = io.util.request();
            var uri = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, io.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
            xhr.open("GET", uri, false);
            xhr.send(null);
            this.onDisconnect("booted")
        };
        Socket.prototype.isXDomain = function() {
            var port = global.location.port || ("https:" == global.location.protocol ? 443 : 80);
            return this.options.host !== global.location.hostname || this.options.port != port
        };
        Socket.prototype.onConnect = function() {
            if (!this.connected) {
                this.connected = true;
                this.connecting = false;
                if (!this.doBuffer) {
                    this.setBuffer(false)
                }
                this.emit("connect")
            }
        };
        Socket.prototype.onOpen = function() {
            this.open = true
        };
        Socket.prototype.onClose = function() {
            this.open = false;
            clearTimeout(this.heartbeatTimeoutTimer)
        };
        Socket.prototype.onPacket = function(packet) {
            this.of(packet.endpoint).onPacket(packet)
        };
        Socket.prototype.onError = function(err) {
            if (err && err.advice) {
                if (err.advice === "reconnect" && (this.connected || this.connecting)) {
                    this.disconnect();
                    if (this.options.reconnect) {
                        this.reconnect()
                    }
                }
            }
            this.publish("error", err && err.reason ? err.reason : err)
        };
        Socket.prototype.onDisconnect = function(reason) {
            var wasConnected = this.connected,
                wasConnecting = this.connecting;
            this.connected = false;
            this.connecting = false;
            this.open = false;
            if (wasConnected || wasConnecting) {
                this.transport.close();
                this.transport.clearTimeouts();
                if (wasConnected) {
                    this.publish("disconnect", reason);
                    if ("booted" != reason && this.options.reconnect && !this.reconnecting) {
                        this.reconnect()
                    }
                }
            }
        };
        Socket.prototype.reconnect = function() {
            this.reconnecting = true;
            this.reconnectionAttempts = 0;
            this.reconnectionDelay = this.options["reconnection delay"];
            var self = this,
                maxAttempts = this.options["max reconnection attempts"],
                tryMultiple = this.options["try multiple transports"],
                limit = this.options["reconnection limit"];

            function reset() {
                if (self.connected) {
                    for (var i in self.namespaces) {
                        if (self.namespaces.hasOwnProperty(i) && "" !== i) {
                            self.namespaces[i].packet({
                                type: "connect"
                            })
                        }
                    }
                    self.publish("reconnect", self.transport.name, self.reconnectionAttempts)
                }
                clearTimeout(self.reconnectionTimer);
                self.removeListener("connect_failed", maybeReconnect);
                self.removeListener("connect", maybeReconnect);
                self.reconnecting = false;
                delete self.reconnectionAttempts;
                delete self.reconnectionDelay;
                delete self.reconnectionTimer;
                delete self.redoTransports;
                self.options["try multiple transports"] = tryMultiple
            }

            function maybeReconnect() {
                if (!self.reconnecting) {
                    return
                }
                if (self.connected) {
                    return reset()
                }
                if (self.connecting && self.reconnecting) {
                    return self.reconnectionTimer = setTimeout(maybeReconnect, 1000)
                }
                if (self.reconnectionAttempts++ >= maxAttempts) {
                    if (!self.redoTransports) {
                        self.on("connect_failed", maybeReconnect);
                        self.options["try multiple transports"] = true;
                        self.transports = self.origTransports;
                        self.transport = self.getTransport();
                        self.redoTransports = true;
                        self.connect()
                    } else {
                        self.publish("reconnect_failed");
                        reset()
                    }
                } else {
                    if (self.reconnectionDelay < limit) {
                        self.reconnectionDelay *= 2
                    }
                    self.connect();
                    self.publish("reconnecting", self.reconnectionDelay, self.reconnectionAttempts);
                    self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay)
                }
            }
            this.options["try multiple transports"] = false;
            this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);
            this.on("connect", maybeReconnect)
        }
    })("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
    (function(exports, io) {
        exports.SocketNamespace = SocketNamespace;

        function SocketNamespace(socket, name) {
            this.socket = socket;
            this.name = name || "";
            this.flags = {};
            this.json = new Flag(this, "json");
            this.ackPackets = 0;
            this.acks = {}
        }
        io.util.mixin(SocketNamespace, io.EventEmitter);
        SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;
        SocketNamespace.prototype.of = function() {
            return this.socket.of.apply(this.socket, arguments)
        };
        SocketNamespace.prototype.packet = function(packet) {
            packet.endpoint = this.name;
            this.socket.packet(packet);
            this.flags = {};
            return this
        };
        SocketNamespace.prototype.send = function(data, fn) {
            var packet = {
                type: this.flags.json ? "json" : "message",
                data: data
            };
            if ("function" == typeof fn) {
                packet.id = ++this.ackPackets;
                packet.ack = true;
                this.acks[packet.id] = fn
            }
            return this.packet(packet)
        };
        SocketNamespace.prototype.emit = function(name) {
            var args = Array.prototype.slice.call(arguments, 1),
                lastArg = args[args.length - 1],
                packet = {
                    type: "event",
                    name: name
                };
            if ("function" == typeof lastArg) {
                packet.id = ++this.ackPackets;
                packet.ack = "data";
                this.acks[packet.id] = lastArg;
                args = args.slice(0, args.length - 1)
            }
            packet.args = args;
            return this.packet(packet)
        };
        SocketNamespace.prototype.disconnect = function() {
            if (this.name === "") {
                this.socket.disconnect()
            } else {
                this.packet({
                    type: "disconnect"
                });
                this.$emit("disconnect")
            }
            return this
        };
        SocketNamespace.prototype.onPacket = function(packet) {
            var self = this;

            function ack() {
                self.packet({
                    type: "ack",
                    args: io.util.toArray(arguments),
                    ackId: packet.id
                })
            }
            switch (packet.type) {
                case "connect":
                    this.$emit("connect");
                    break;
                case "disconnect":
                    if (this.name === "") {
                        this.socket.onDisconnect(packet.reason || "booted")
                    } else {
                        this.$emit("disconnect", packet.reason)
                    }
                    break;
                case "message":
                case "json":
                    var params = ["message", packet.data];
                    if (packet.ack == "data") {
                        params.push(ack)
                    } else {
                        if (packet.ack) {
                            this.packet({
                                type: "ack",
                                ackId: packet.id
                            })
                        }
                    }
                    this.$emit.apply(this, params);
                    break;
                case "event":
                    var params = [packet.name].concat(packet.args);
                    if (packet.ack == "data") {
                        params.push(ack)
                    }
                    this.$emit.apply(this, params);
                    break;
                case "ack":
                    if (this.acks[packet.ackId]) {
                        this.acks[packet.ackId].apply(this, packet.args);
                        delete this.acks[packet.ackId]
                    }
                    break;
                case "error":
                    if (packet.advice) {
                        this.socket.onError(packet)
                    } else {
                        if (packet.reason == "unauthorized") {
                            this.$emit("connect_failed", packet.reason)
                        } else {
                            this.$emit("error", packet.reason)
                        }
                    }
                    break
            }
        };

        function Flag(nsp, name) {
            this.namespace = nsp;
            this.name = name
        }
        Flag.prototype.send = function() {
            this.namespace.flags[this.name] = true;
            this.namespace.send.apply(this.namespace, arguments)
        };
        Flag.prototype.emit = function() {
            this.namespace.flags[this.name] = true;
            this.namespace.emit.apply(this.namespace, arguments)
        }
    })("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
    (function(exports, io, global) {
        exports.websocket = WS;

        function WS() {
            io.Transport.apply(this, arguments)
        }
        io.util.inherit(WS, io.Transport);
        WS.prototype.name = "websocket";
        WS.prototype.open = function() {
            var query = io.util.query(this.socket.options.query),
                self = this,
                Socket;
            if (!Socket) {
                Socket = global.MozWebSocket || global.WebSocket
            }
            this.websocket = new Socket(this.prepareUrl() + query);
            this.websocket.onopen = function() {
                self.onOpen();
                self.socket.setBuffer(false)
            };
            this.websocket.onmessage = function(ev) {
                self.onData(ev.data)
            };
            this.websocket.onclose = function() {
                self.onClose();
                self.socket.setBuffer(true)
            };
            this.websocket.onerror = function(e) {
                self.onError(e)
            };
            return this
        };
        if (io.util.ua.iDevice) {
            WS.prototype.send = function(data) {
                var self = this;
                setTimeout(function() {
                    self.websocket.send(data)
                }, 0);
                return this
            }
        } else {
            WS.prototype.send = function(data) {
                this.websocket.send(data);
                return this
            }
        }
        WS.prototype.payload = function(arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                this.packet(arr[i])
            }
            return this
        };
        WS.prototype.close = function() {
            this.websocket.close();
            return this
        };
        WS.prototype.onError = function(e) {
            this.socket.onError(e)
        };
        WS.prototype.scheme = function() {
            return this.socket.options.secure ? "wss" : "ws"
        };
        WS.check = function() {
            return ("WebSocket" in global && !("__addTask" in WebSocket)) || "MozWebSocket" in global
        };
        WS.xdomainCheck = function() {
            return true
        };
        io.transports.push("websocket")
    })("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
    (function(exports, io, global) {
        exports.XHR = XHR;

        function XHR(socket) {
            if (!socket) {
                return
            }
            io.Transport.apply(this, arguments);
            this.sendBuffer = []
        }
        io.util.inherit(XHR, io.Transport);
        XHR.prototype.open = function() {
            this.socket.setBuffer(false);
            this.onOpen();
            this.get();
            this.setCloseTimeout();
            return this
        };
        XHR.prototype.payload = function(payload) {
            var msgs = [];
            for (var i = 0, l = payload.length; i < l; i++) {
                msgs.push(io.parser.encodePacket(payload[i]))
            }
            this.send(io.parser.encodePayload(msgs))
        };
        XHR.prototype.send = function(data) {
            this.post(data);
            return this
        };

        function empty() {}
        XHR.prototype.post = function(data) {
            var self = this;
            this.socket.setBuffer(true);

            function stateChange() {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;
                    self.posting = false;
                    if (this.status == 200) {
                        self.socket.setBuffer(false)
                    } else {
                        self.onClose()
                    }
                }
            }

            function onload() {
                this.onload = empty;
                self.socket.setBuffer(false)
            }
            this.sendXHR = this.request("POST");
            if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
                this.sendXHR.onload = this.sendXHR.onerror = onload
            } else {
                this.sendXHR.onreadystatechange = stateChange
            }
            this.sendXHR.send(data)
        };
        XHR.prototype.close = function() {
            this.onClose();
            return this
        };
        XHR.prototype.request = function(method) {
            var req = io.util.request(this.socket.isXDomain()),
                query = io.util.query(this.socket.options.query, "t=" + +new Date);
            req.open(method || "GET", this.prepareUrl() + query, true);
            if (method == "POST") {
                try {
                    if (req.setRequestHeader) {
                        req.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                    } else {
                        req.contentType = "text/plain"
                    }
                } catch (e) {}
            }
            return req
        };
        XHR.prototype.scheme = function() {
            return this.socket.options.secure ? "https" : "http"
        };
        XHR.check = function(socket, xdomain) {
            try {
                var request = io.util.request(xdomain),
                    usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
                    socketProtocol = (socket && socket.options && socket.options.secure ? "https:" : "http:"),
                    isXProtocol = (global.location && socketProtocol != global.location.protocol);
                if (request && !(usesXDomReq && isXProtocol)) {
                    return true
                }
            } catch (e) {}
            return false
        };
        XHR.xdomainCheck = function(socket) {
            return XHR.check(socket, true)
        }
    })("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
    (function(exports, io) {
        exports.htmlfile = HTMLFile;

        function HTMLFile() {
            io.Transport.XHR.apply(this, arguments)
        }
        io.util.inherit(HTMLFile, io.Transport.XHR);
        HTMLFile.prototype.name = "htmlfile";
        HTMLFile.prototype.get = function() {
            this.doc = new window[(["Active"].concat("Object").join("X"))]("htmlfile");
            this.doc.open();
            this.doc.write("<html></html>");
            this.doc.close();
            this.doc.parentWindow.s = this;
            var iframeC = this.doc.createElement("div");
            iframeC.className = "socketio";
            this.doc.body.appendChild(iframeC);
            this.iframe = this.doc.createElement("iframe");
            iframeC.appendChild(this.iframe);
            var self = this,
                query = io.util.query(this.socket.options.query, "t=" + +new Date);
            this.iframe.src = this.prepareUrl() + query;
            io.util.on(window, "unload", function() {
                self.destroy()
            })
        };
        HTMLFile.prototype._ = function(data, doc) {
            data = data.replace(/\\\//g, "/");
            this.onData(data);
            try {
                var script = doc.getElementsByTagName("script")[0];
                script.parentNode.removeChild(script)
            } catch (e) {}
        };
        HTMLFile.prototype.destroy = function() {
            if (this.iframe) {
                try {
                    this.iframe.src = "about:blank"
                } catch (e) {}
                this.doc = null;
                this.iframe.parentNode.removeChild(this.iframe);
                this.iframe = null;
                CollectGarbage()
            }
        };
        HTMLFile.prototype.close = function() {
            this.destroy();
            return io.Transport.XHR.prototype.close.call(this)
        };
        HTMLFile.check = function(socket) {
            if (typeof window != "undefined" && (["Active"].concat("Object").join("X")) in window) {
                try {
                    var a = new window[(["Active"].concat("Object").join("X"))]("htmlfile");
                    return a && io.Transport.XHR.check(socket)
                } catch (e) {}
            }
            return false
        };
        HTMLFile.xdomainCheck = function() {
            return false
        };
        io.transports.push("htmlfile")
    })("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
    (function(exports, io, global) {
        exports["xhr-polling"] = XHRPolling;

        function XHRPolling() {
            io.Transport.XHR.apply(this, arguments)
        }
        io.util.inherit(XHRPolling, io.Transport.XHR);
        io.util.merge(XHRPolling, io.Transport.XHR);
        XHRPolling.prototype.name = "xhr-polling";
        XHRPolling.prototype.heartbeats = function() {
            return false
        };
        XHRPolling.prototype.open = function() {
            var self = this;
            io.Transport.XHR.prototype.open.call(self);
            return false
        };

        function empty() {}
        XHRPolling.prototype.get = function() {
            if (!this.isOpen) {
                return
            }
            var self = this;

            function stateChange() {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;
                    if (this.status == 200) {
                        self.onData(this.responseText);
                        self.get()
                    } else {
                        self.onClose()
                    }
                }
            }

            function onload() {
                this.onload = empty;
                this.onerror = empty;
                self.retryCounter = 1;
                self.onData(this.responseText);
                self.get()
            }

            function onerror() {
                self.retryCounter++;
                if (!self.retryCounter || self.retryCounter > 3) {
                    self.onClose()
                } else {
                    self.get()
                }
            }
            this.xhr = this.request();
            if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
                this.xhr.onload = onload;
                this.xhr.onerror = onerror
            } else {
                this.xhr.onreadystatechange = stateChange
            }
            this.xhr.send(null)
        };
        XHRPolling.prototype.onClose = function() {
            io.Transport.XHR.prototype.onClose.call(this);
            if (this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
                try {
                    this.xhr.abort()
                } catch (e) {}
                this.xhr = null
            }
        };
        XHRPolling.prototype.ready = function(socket, fn) {
            var self = this;
            io.util.defer(function() {
                fn.call(self, socket)
            })
        };
        io.transports.push("xhr-polling")
    })("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
    (function(exports, io, global) {
        var indicator = global.document && "MozAppearance" in global.document.documentElement.style;
        exports["jsonp-polling"] = JSONPPolling;

        function JSONPPolling() {
            io.Transport["xhr-polling"].apply(this, arguments);
            this.index = io.j.length;
            var self = this;
            io.j.push(function(msg) {
                self._(msg)
            })
        }
        io.util.inherit(JSONPPolling, io.Transport["xhr-polling"]);
        JSONPPolling.prototype.name = "jsonp-polling";
        JSONPPolling.prototype.post = function(data) {
            var self = this,
                query = io.util.query(this.socket.options.query, "t=" + (+new Date) + "&i=" + this.index);
            if (!this.form) {
                var form = document.createElement("form"),
                    area = document.createElement("textarea"),
                    id = this.iframeId = "socketio_iframe_" + this.index,
                    iframe;
                form.className = "socketio";
                form.style.position = "absolute";
                form.style.top = "0px";
                form.style.left = "0px";
                form.style.display = "none";
                form.target = id;
                form.method = "POST";
                form.setAttribute("accept-charset", "utf-8");
                area.name = "d";
                form.appendChild(area);
                document.body.appendChild(form);
                this.form = form;
                this.area = area
            }
            this.form.action = this.prepareUrl() + query;

            function complete() {
                initIframe();
                self.socket.setBuffer(false)
            }

            function initIframe() {
                if (self.iframe) {
                    self.form.removeChild(self.iframe)
                }
                try {
                    iframe = document.createElement('<iframe name="' + self.iframeId + '">')
                } catch (e) {
                    iframe = document.createElement("iframe");
                    iframe.name = self.iframeId
                }
                iframe.id = self.iframeId;
                self.form.appendChild(iframe);
                self.iframe = iframe
            }
            initIframe();
            this.area.value = io.JSON.stringify(data);
            try {
                this.form.submit()
            } catch (e) {}
            if (this.iframe.attachEvent) {
                iframe.onreadystatechange = function() {
                    if (self.iframe.readyState == "complete") {
                        complete()
                    }
                }
            } else {
                this.iframe.onload = complete
            }
            this.socket.setBuffer(true)
        };
        JSONPPolling.prototype.get = function() {
            var self = this,
                script = document.createElement("script"),
                query = io.util.query(this.socket.options.query, "t=" + (+new Date) + "&i=" + this.index);
            if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null
            }
            script.async = true;
            script.src = this.prepareUrl() + query;
            script.onerror = function() {
                self.onClose()
            };
            var insertAt = document.getElementsByTagName("script")[0];
            insertAt.parentNode.insertBefore(script, insertAt);
            this.script = script;
            if (indicator) {
                setTimeout(function() {
                    var iframe = document.createElement("iframe");
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe)
                }, 100)
            }
        };
        JSONPPolling.prototype._ = function(msg) {
            this.onData(msg);
            if (this.isOpen) {
                this.get()
            }
            return this
        };
        JSONPPolling.prototype.ready = function(socket, fn) {
            var self = this;
            if (!indicator) {
                return fn.call(this)
            }
            io.util.load(function() {
                fn.call(self)
            })
        };
        JSONPPolling.check = function() {
            return "document" in global
        };
        JSONPPolling.xdomainCheck = function() {
            return true
        };
        io.transports.push("jsonp-polling")
    })("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return io
        })
    }
}());

},{}],18:[function(require,module,exports){
(function (process){
var Config = require('./config');
'use strict';


var isServer = typeof(window) === 'undefined',
    w = isServer ? {} : window,
    performance = typeof(w.performance) !== 'undefined' ? w.performance : {},
    defineProperty = Object.defineProperty,
    START_MS = Date.now(),
    START = START_MS * 0.001,
    DELTA = 1 / 60,
    FIXED_DELTA = DELTA,
    GLOBAL_FIXED = DELTA,
    SCALE = 1,
    DateNow;


if (isServer) {
    var HR_TIME = process.hrtime();

    DateNow = function () {
        var hrtime = process.hrtime(HR_TIME),
            s = hrtime[0] * 1000,
            ns = hrtime[1] * 1e-6;

        return s + ns;
    }
} else {
    DateNow = function () {
        return Date.now() - START_MS;
    }
}


performance.now || (performance.now = (
performance.webkitNow ||
performance.mozNow ||
performance.msNow ||
performance.oNow ||
DateNow
));

function now() {

    return performance.now() * 0.001;
}


function Time() {

    this.start = START;
    this.sinceStart = 0;
    this.time = 0;
    this.fps = 60;
    this.delta = DELTA;
    this.frameCount = 0;

    defineProperty(this, 'scale', {
        get: function () {
            return SCALE;
        },
        set: function (value) {
            SCALE = value;
            FIXED_DELTA = GLOBAL_FIXED * value
        }
    });

    defineProperty(this, 'fixedDelta', {
        get: function () {
            return FIXED_DELTA;
        },
        set: function (value) {
            GLOBAL_FIXED = value;
            FIXED_DELTA = GLOBAL_FIXED * SCALE;
        }
    });
}


Time.prototype.now = now;


Time.prototype.stamp = function () {

    return Date.now() * 0.001;
};


Time.prototype.stampMS = function () {

    return Date.now();
};


var frameCount = 0,
    last = -1 / 60,
    time = 0,
    delta = 1 / 60,
    fpsFrame = 0,
    fpsLast = 0,
    fpsTime = 0;

Time.prototype.update = function () {
    var MIN_DELTA = Config.MIN_DELTA,
        MAX_DELTA = Config.MAX_DELTA;

    this.frameCount = frameCount++;

    last = time;
    time = now();
    this.sinceStart = time;

    fpsTime = time;
    fpsFrame++;

    if (fpsLast + 1 < fpsTime) {
        this.fps = fpsFrame / (fpsTime - fpsLast);

        fpsLast = fpsTime;
        fpsFrame = 0;
    }

    delta = (time - last) * SCALE;
    this.delta = delta < MIN_DELTA ? MIN_DELTA : delta > MAX_DELTA ? MAX_DELTA : delta;

    this.time = time * SCALE;
};


module.exports = new Time;

}).call(this,require('_process'))
},{"./config":9,"_process":6}],19:[function(require,module,exports){
(function (process,Buffer){
"use strict";


var util = {},
    random = Math.random,

    isServer = typeof(window) === "undefined",
    cwd = isServer ? process.cwd() : window.location.href.match(/.*\//)[0],

    ObjectProto = Object.prototype,
    toString = ObjectProto.toString,
    hasOwnProperty = ObjectProto.hasOwnProperty,

    ArrayProto = Array.prototype,
    ArrayForEach = ArrayProto.forEach,

    keys = Object.keys || (Object.keys = function (obj) {
            var out = [],
                key;

            for (key in obj) {
                if (hasOwnProperty.call(obj, key)) out.push(key);
            }
            return out;
        }),

    isArray = Array.isArray || (Array.isArray = function (obj) {
            return toString.call(obj) === "[object Array]";
        }),

    SPILTER = /[ \_\-\.]+|(?=[A-Z][^A-Z])/g,
    UNDERSCORE = /([a-z])([A-Z])/g,
    FORMAT_REGEX = /%[sdj%]/g;

function isObject(obj) {

    return obj === Object(obj);
}
util.isObject = isObject;


function isArrayLike(obj) {

    return typeof(obj) === "object" && typeof(obj.length) === "number";
}
util.isArrayLike = isArrayLike;
util.isArray = isArray;


function isArguments(obj) {

    return toString.call(obj) === "[object Arguments]";
}
util.isArguments = isArguments;


function isFunction(obj) {

    return typeof(obj) === "function"
}
util.isFunction = isFunction;


function isString(obj) {

    return toString.call(obj) === "[object String]";
}
util.isString = isString;


function isNumber(obj) {

    return toString.call(obj) === "[object Number]";
}
util.isNumber = isNumber;


function isDecimal(obj) {

    return isNumber(obj) && obj % 1 !== 0;
}
util.isDecimal = isDecimal;


function isInteger(obj) {

    return isNumber(obj) && obj % 1 === 0;
}
util.isInteger = isInteger;


function isDate(obj) {

    return toString.call(obj) === "[object Date]";
}
util.isDate = isDate;


function isRegExp(obj) {

    return toString.call(obj) === "[object RegExp]";
}
util.isRegExp = isRegExp;


util.isFinite = isFinite;


util.isNaN = isNaN;


function isBoolean(obj) {

    return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
}
util.isBoolean = isBoolean;


function isNull(obj) {

    return obj === null;
}
util.isNull = isNull;


function isUndefined(obj) {

    return obj === void 0;
}
util.isUndefined = isUndefined;


function has(obj, key) {

    return hasOwnProperty.call(obj, key);
}
util.has = has;


function format(fmt) {
    var i = 1,
        args = arguments,
        len = args.length;

    return String(fmt).replace(FORMAT_REGEX, function (x) {
        if (x === "%%") return "%";
        if (i >= len) return x;

        if (x === "%s") {
            return String(args[i++]);
        } else if (x === "%d") {
            return Number(args[i++]);
        } else if (x === "%j") {
            try {
                return JSON.stringify(args[i++]);
            } catch (e) {
                return "[Circular]";
            }
        } else {
            return x;
        }
    });
}
util.format = format;


function camelize(word, lowFirstLetter) {
    var parts = word.split(SPILTER),
        string = "",
        part, i, il;

    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        string += part[0].toUpperCase() + part.slice(1).toLowerCase();
    }

    return lowFirstLetter ? string[0].toLowerCase() + string.slice(1) : string;
};
util.camelize = camelize;


function underscore(word) {

    return word.replace(SPILTER, "").replace(UNDERSCORE, "$1_$2").toLowerCase();
};
util.underscore = underscore;


function merge(obj, add) {
    var key;

    for (key in add) {
        if (obj[key] == undefined) obj[key] = add[key];
    }

    return obj;
};
util.merge = merge;


function override(obj, add) {
    var key;

    for (key in add) {
        if (add[key] != undefined) obj[key] = add[key];
    }

    return obj;
};
util.override = override;


function copy(obj, out) {
    var type = typeof(obj),
        key, i, il;

    if (type !== "object") return obj;

    if (isArrayLike(obj)) {
        out = [];
        for (i = 0, il = obj.length; i < il; i++) out[i] = copy(obj[i]);
    } else if (isObject(obj)) {
        out = {};
        for (key in obj) out[key] = copy(obj[key]);
    }

    return out;
};
util.copy = copy;


function clear(obj) {
    var key;

    for (key in obj) delete obj[key];

    return obj;
};
util.clear = clear;


util.keys = keys;


function arrayBufferToBase64(buffer) {
    var binary = "",
        bytes = new Uint8Array(buffer),
        len = bytes.byteLength,
        i = 0;

    for (; i < len; i++) binary += String.fromCharCode(bytes[i]);

    return isServer ? new Buffer(binary.toString(), "binary").toString("base64") : window.btoa(binary);
}
util.arrayBufferToBase64 = arrayBufferToBase64;


function base64ToArrayBuffer(str) {
    var binary = isServer ? new Buffer(str, "base64").toString("binary") : window.atob(str),
        len = binary.length,
        bytes = new Uint8Array(len).
            i = 0;

    for (; i < len; i++) bytes[i] = str.charCodeAt(i);

    return bytes.buffer;
}
util.base64ToArrayBuffer = base64ToArrayBuffer;


function uid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(UID_REPLACER, function (c) {
        var a = 16 * random() | 0;
        return ("x" == c ? a : a & 3 | 8).toString(16);
    })
}
var UID_REPLACER = /[xy]/g;
util.uid = uid;


function each(obj, iterator, ctx) {
    if (obj == null) return;

    if (ArrayForEach && obj.forEach === ArrayForEach) {
        obj.forEach(iterator, ctx);
    } else if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(ctx, obj[i], i, obj) === false) return;
        }
    } else {
        var objKeys = keys(obj);

        for (var i = 0, length = objKeys.length; i < length; i++) {
            if (iterator.call(ctx, obj[objKeys[i]], objKeys[i], obj) === false) return;
        }
    }
}
util.each = each;


function normalizePath(path) {
    var parts = path.split("/"),
        directories = [],
        i = 0,
        il = parts.length,
        prev, directory;

    for (; i < il; i++) {
        directory = parts[i];

        if (directory === "" && i !== 0 && i !== il) continue;
        if (directory === "." && prev !== undefined) continue;
        if (directories.length === 1 && directories[0] === "" && (directory === "." || directory === "..")) continue;

        if (directory === ".." && directories.length && prev !== ".." && prev !== "." && prev !== undefined && (prev !== "")) {
            directories.pop();
            prev = directories[0];
        } else {
            if (prev === ".") directories.pop();
            directories.push(directory);
            prev = directory;
        }
    }
    if ((path = directories[0]) && path.indexOf(":") === path.length - 1) directories[0] += "/";

    return directories.join("/");
}
util.normalizePath = normalizePath;


function relativePath(path) {
    path || (path = "./");
    return normalizePath(require.toUrl(path));
}
util.relativePath = relativePath;


function absolutePath(path) {
    path || (path = "./");
    return normalizePath(cwd + require.toUrl(path));
}
util.absolutePath = absolutePath;


if (!isServer) {
    util.createWorker = function (fn) {
        var blobURL = URL.createObjectURL(
                new Blob([
                    "(function() {\n" +
                    "importScripts(\"" + absolutePath("odin/require.js") + "\");\n" +
                    "require.config({baseUrl: \"" + absolutePath("./") + "\"});\n" +
                    "(" + fn.toString() + ").call(this);\n" +
                    "}).call(this);"
                ], {
                    type: "application/javascript"
                })
            ),
            worker = new Worker(blobURL);

        URL.revokeObjectURL(blobURL);

        return worker;
    };

    util.ajax = function ajax(opts) {
        opts || (opts = {});
        var request = new XMLHttpRequest,
            src = opts.src,
            method = opts.method || (opts.method = "GET"),
            before = opts.before,
            success = opts.success,
            error = opts.error,
            async = opts.async != undefined ? !!opts.async : true;

        request.addEventListener("load", function () {
            var status = this.status;

            if ((status > 199 && status < 301) || status == 304) {
                if (typeof(success) === "function") success.call(this);
            } else {
                if (typeof(error) === "function") {
                    error.call(this, new Error(method + " " + src + " " + status));
                } else {
                    throw new Error(method + " " + src + " " + status);
                }
            }
        }, false);
        request.addEventListener("error", function () {
            if (typeof(error) === "function") {
                error(new Error(method + " " + src));
            } else {
                throw new Error(method + " " + src);
            }
        }, false);

        request.open(method, src, async);
        if (typeof(before) === "function") before.call(request);
        request.send();
    };
}


module.exports = util;

}).call(this,require('_process'),require("buffer").Buffer)
},{"_process":6,"buffer":2}],20:[function(require,module,exports){
var Log = require("../../base/log");
var Class = require("../../base/class");
"use strict";


var defineProperty = Object.defineProperty;


function Asset(opts) {
    opts || (opts = {});

    Class.call(this);

    this._name = opts.name != undefined ? opts.name : "Asset_" + this._id;
    this._loaded = false;

    this.json = opts.json != undefined ? !!opts.json : true;

    this.assets = undefined;
    this.load = opts.load != undefined ? !!opts.load : !!opts.src;
    this.src = opts.src;
    this.raw = opts.raw;
}

Class.extend(Asset);


defineProperty(Asset.prototype, "name", {
    get: function () {
        return this._name;
    },
    set: function (value) {
        var assets = this.assets,
            hash;

        if (assets) {
            hash = assets.hash;

            if (hash[value]) {
                Log.warn("Asset.set name: can't change name to " + value + " Assets already have an asset with same name");
                return;
            }

            delete hash[this.name];
            hash[value] = this;
        }

        this._name = value;
    }
});


Asset.prototype.copy = function (other) {

    this.sync = other.sync;
    this.json = other.json;

    this.name = other.name + "." + this._id;
    this.src = other.src;
    this.raw = other.raw;

    if (other.assets && this.assets !== other.assets) other.assets.addAsset(this);

    return this;
};


Asset.prototype.clear = function () {

    this.raw = null;
    return this;
};


Asset.prototype.destroy = function () {
    if (!this.assets) {
        Log.error("Asset.destroy: can't destroy Asset if it's not added to Assets");
        return this;
    }

    this.assets.removeAsset(this);
    this.clear();

    return this;
};


Asset.prototype.parse = function (raw) {

    this.raw = raw;
    return this;
};


Asset.prototype.toJSON = function (json, pack) {
    json = Class.prototype.toJSON.call(this, json);

    json.name = this.name;
    if (!pack) json.src = this.src;

    return json;
};


Asset.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.name = json.name;
    this.src = json.src;

    return this;
};


module.exports = Asset;

},{"../../base/class":8,"../../base/log":14}],21:[function(require,module,exports){
var Device = require("../../base/device");
var util = require("../../base/util");
var EventEmitter = require("../../base/event_emitter");
var AudioCtx = require("../../base/audio_ctx");
var Asset = require("./asset");
var Assets = require("./assets");
var Log = require("../../base/log");
"use strict";


var isArray = util.isArray,
    ajax = util.ajax,
    each = util.each;


function getExt(src) {

    return src ? (src.split(".").pop()).toLowerCase() : "none";
};


function AssetLoader() {

    EventEmitter.call(this);

    var supports = this.supports = ["json", "jpeg", "jpg", "png", "gif"];

    if (Device.audioMpeg) supports.push("mpeg");
    if (Device.audioOgg || Device.videoOgg) supports.push("ogg");
    if (Device.audioMp3) supports.push("mp3");
    if (Device.audioMp4 || Device.videoMp4) supports.push("mp4");
}

EventEmitter.extend(AssetLoader);


AssetLoader.prototype.load = function (reload) {
    var _this = this,
        count = Assets.length,
        i = count,
        fn = function (err) {
            if (err) Log.error(err);

            count--;
            if (count <= 0) _this.emit("load");
        };

    if (!count) this.emit("load");
    while (i--) this.loadAsset(Assets[i], fn, reload, true);
};


AssetLoader.prototype.loadAsset = function (asset, callback, reload, known) {
    var _this = this,
        supports = this.supports,
        src = asset.src;

    if (!known || Assets.indexOf(asset) === -1) Assets.addAsset(asset);

    if (!asset.load || !src || asset.raw && !reload) {
        asset._loaded = true;
        callback && callback()
        return;
    }
    ;

    if (isArray(src)) {
        var raw = [],
            exts = [],
            loaded = src.length,
            hasExt = false;

        each(src, function (s, i) {
            var ext = getExt(s);
            exts.push(ext);

            if (!this[ext]) {
                callback && callback(new Error("AssetLoader.load: has no loader for " + src + " of type " + ext));
                return false;
            }

            this[ext](s, function (err, data) {
                loaded--;
                raw[i] = data;

                if (err) Log.error(err);

                if (loaded <= 0) {
                    for (var j = exts.length; j--;) {
                        if (supports.indexOf(exts[i]) !== -1) {
                            hasExt = true;
                            break;
                        }
                    }

                    if (!hasExt) {
                        callback && callback(new Error("AssetLoader.load: device does not support any of the given file types " + exts));
                        return;
                    }

                    asset._loaded = true;
                    asset.parse(raw);
                    asset.emit("load", raw);
                    _this.emit("loadAsset", asset);
                    callback && callback();
                }
            });

            return true;
        }, this);
    } else {
        var ext = getExt(src);

        if (!this[ext]) {
            callback && callback(new Error("AssetLoader.load: has no loader file " + src + " of type " + ext));
            return;
        }
        if (supports.indexOf(ext) === -1) {
            callback && callback(new Error("AssetLoader.load: device does not support file " + src + " of type " + ext));
            return;
        }

        this[ext](src, function (err, raw) {
            if (err) {
                callback && callback(new Error("AssetLoader.load: " + err.message));
                return;
            }

            asset._loaded = true;
            asset.parse(raw);
            asset.emit("load", raw);
            _this.emit("loadAsset", asset);
            callback && callback();
        });
    }
};


AssetLoader.prototype.gif = AssetLoader.prototype.jpg = AssetLoader.prototype.jpeg = AssetLoader.prototype.png = function (src, callback) {
    var image = new Image;

    image.onload = function () {
        callback && callback(null, image);
    };
    image.onerror = function () {
        callback && callback(new Error("GET " + src + " 404 (Not Found)"));
    };

    image.src = src;
};


AssetLoader.prototype.json = function (src, callback) {

    ajax({
        src: src,
        before: function () {
            this.setRequestHeader("Content-Type", "application/json");
        },
        success: function () {
            var json = this.responseText;

            try {
                json = JSON.parse(this.responseText);
            } catch (err) {
                callback && callback(err);
                return;
            }

            callback && callback(null, json);
        },
        error: function (err) {
            callback && callback(err);
        }
    });
};


AssetLoader.prototype.ogg = AssetLoader.prototype.wav = AssetLoader.prototype.mp3 = AssetLoader.prototype.aac = function (src, callback) {

    ajax({
        src: src,
        before: function () {
            this.responseType = "arraybuffer";
        },
        success: function () {
            if (AudioCtx) {
                if (AudioCtx.decodeAudioData) {
                    AudioCtx.decodeAudioData(
                        this.response,
                        function success(buffer) {
                            callback && callback(null, buffer);
                        },
                        function failure() {
                            callback && callback(new Error("AudioContext Failed to parse Audio Clip"));
                        }
                    );
                } else {
                    var buffer = AudioCtx.createBuffer(this.response, false);

                    if (buffer) {
                        callback && callback(null, buffer);
                    } else {
                        callback && callback(new Error("AudioContext Failed to parse Audio Clip"));
                    }
                }
            } else {
                callback && callback(new Error("AudioContext (WebAudio API) is not supported by this browser"));
            }
        },
        error: function (err) {
            callback && callback(err);
        }
    });
};


module.exports = new AssetLoader;

},{"../../base/audio_ctx":7,"../../base/device":10,"../../base/event_emitter":13,"../../base/log":14,"../../base/util":19,"./asset":20,"./assets":22}],22:[function(require,module,exports){
var Class = require("../../base/class");
var Asset = require("./asset");
var Log = require("../../base/log");
"use strict";


function Assets() {

    Array.call(this);

    this.hash = {};
}

Assets.prototype = Object.create(Array.prototype);
Assets.prototype.constructor = Assets;


Assets.prototype.get = function (name) {
    var asset = this.hash[name];
    if (asset) return asset;

    Log.error("Assets.get: can't find asset with name " + name + ", it has not been added to Assets, use Assets.addAsset(asset)");
    return undefined;
};


Assets.prototype.addAsset = function (asset) {
    if (!(asset instanceof Asset)) {
        Log.error("Assets.addAsset: can't add passed argument, it is not an instance of Asset");
        return this;
    }
    var name = asset.name;

    if (this.hash[name]) {
        Log.error("Assets.addAsset: Assets already have Asset named " + asset.name);
        return undefined;
    }

    asset.assets = this;
    this.push(asset);
    this.hash[name] = asset;

    return asset;
};


Assets.prototype.addAssets = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.addAsset(arguments[i]);
};


Assets.prototype.removeAsset = function (asset) {
    var name = typeof(asset) === "string" ? asset : asset.name;
    asset = this.hash[name];

    if (!asset) {
        Log.error("Assets.removeAsset: Assets does not have an Asset named " + name);
        return undefined;
    }

    this.splice(this.indexOf(asset), 1);
    this.hash[name] = null;

    return asset;
};


Assets.prototype.removeAssets = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.removeAsset(arguments[i]);
};


Assets.prototype.toJSON = function (json, pack) {
    json || (json = {});
    var jsonAssets = json.assets || (json.assets = []),
        jsonAsset,
        i = this.length;

    while (i--) {
        if ((jsonAsset = this[i]).json) jsonAssets[i] = jsonAsset.toJSON(jsonAssets[i], pack);
    }

    return json;
};


Assets.prototype.fromJSON = function (json) {
    var assetsHash = this.hash,
        jsonAssets = json.assets || (json.assets = []),
        asset, jsonAsset,
        i = jsonAssets.length;

    while (i--) {
        if (!(jsonAsset = jsonAssets[i])) continue;

        if ((asset = assetsHash[jsonAsset.name])) {
            asset.fromJSON(jsonAsset);
        } else {
            this.add(Class.fromJSON(jsonAsset));
        }
    }

    return this;
};


module.exports = new Assets;

},{"../../base/class":8,"../../base/log":14,"./asset":20}],23:[function(require,module,exports){
var util = require("../../base/util");
var AudioCtx = require("../../base/audio_ctx");
var Asset = require("./asset");
"use strict";


var isArray = util.isArray,
    defineProperty = Object.defineProperty,
    arrayBufferToBase64 = util.arrayBufferToBase64,
    base64ToArrayBuffer = util.base64ToArrayBuffer;


function AudioClip(opts) {
    opts || (opts = {});

    Asset.call(this, opts);
}

Asset.extend(AudioClip);


defineProperty(AudioClip.prototype, "length", {
    get: function () {
        return this.raw ? this.raw.duration : 0;
    }
});


defineProperty(AudioClip.prototype, "samples", {
    get: function () {
        return this.raw ? this.raw.length : 0;
    }
});


defineProperty(AudioClip.prototype, "frequency", {
    get: function () {
        return this.raw ? this.raw.sampleRate : 44100;
    }
});


defineProperty(AudioClip.prototype, "channels", {
    get: function () {
        return this.raw ? this.raw.numberOfChannels : 0;
    }
});


AudioClip.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);
    var i;

    if (isArray(raw)) {
        i = raw.length;
        while (i--) {
            if (raw[i]) this.raw = raw[i];
        }
    }

    return this;
};


AudioClip.prototype.getData = function (array, offset) {
    array || (array = []);

    return this.raw ? this.raw.getChannelData(array, offset) : array;
};


AudioClip.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json, pack);

    if ((pack || !this.src) && this.raw) json.raw = arrayBufferToBase64(this.raw);

    return json;
};


AudioClip.prototype.fromJSON = function (json, pack) {
    Asset.prototype.fromJSON.call(this, json, pack);

    if ((pack || !this.src) && this.raw) this.raw = base64ToArrayBuffer(json.raw);

    return this;
};


module.exports = AudioClip;

},{"../../base/audio_ctx":7,"../../base/util":19,"./asset":20}],24:[function(require,module,exports){
var util = require("../../base/util");
var Rect = require("../../math/rect");
var Vec3 = require("../../math/vec3");
var Color = require("../../math/color");
var Asset = require("./asset");
var Assets = require("./assets");
var Enums = require("../enums");
"use strict";


var merge = util.merge;


function Material(opts) {
    opts || (opts = {});

    Asset.call(this, opts);

    this.blending = opts.blending != undefined ? opts.blending : Enums.Blending.Default;
    this.side = opts.side != undefined ? opts.side : Enums.Side.Front;

    this.wireframe = opts.wireframe != undefined ? opts.wireframe : false;
    this.wireframeLineWidth = opts.wireframeLineWidth != undefined ? opts.wireframeLineWidth : 1.0;

    this.shader = opts.shader != undefined ? opts.shader : undefined;

    this.uniforms = merge(opts.uniforms || {}, {
        diffuseColor: new Color(1.0, 1.0, 1.0),
        shininess: 8.0,
        normalScale: 1.0
    });

    this.receiveShadow = opts.receiveShadow != undefined ? !!opts.receiveShadow : true;
    this.castShadow = opts.castShadow != undefined ? !!opts.castShadow : true;

    this.needsUpdate = true;
}

Asset.extend(Material);


Material.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);

    this.blending = other.blending;
    this.side = other.side;

    this.wireframe = other.wireframe;
    this.wireframeLineWidth = other.wireframeLineWidth;

    this.shader = other.shader;

    this.uniforms = copy(other.uniforms);

    this.receiveShadow = other.receiveShadow;
    this.castShadow = other.castShadow;

    return this;
};


Material.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);

    this.fromJSON(raw);

    return this;
};


Material.prototype.clear = function () {
    Asset.prototype.clear.call(this);

    return this;
};


Material.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json, pack);

    json.blending = this.blending;
    json.side = this.side;

    json.wireframe = this.wireframe;
    json.wireframeLineWidth = this.wireframeLineWidth;

    json.shader = this.shader != undefined ? this.shader.name : undefined;

    toJSON(this.uniforms, json.uniforms || (json.uniforms = {}));

    json.receiveShadow = this.receiveShadow;
    json.castShadow = this.castShadow;

    return json;
};


Material.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    this.blending = json.blending;
    this.side = json.side;

    this.wireframe = json.wireframe;
    this.wireframeLineWidth = json.wireframeLineWidth;

    this.shader = json.shader != undefined ? Assets.get(json.shader) : undefined;

    fromJSON(this.uniforms, json.uniforms);

    this.receiveShadow = json.receiveShadow;
    this.castShadow = json.castShadow;

    return this;
};


function toJSON(obj, json) {
    var value, key;

    for (key in obj) {
        value = obj[key];

        if (typeof(value) !== "object") {
            json[key] = value;
        } else if (value.toJSON) {
            json[key] = value.toJSON(json[key]);
        } else {
            json[key] = value;
        }
    }

    return json;
}


function fromJSON(obj, json) {
    var classes = Class._classes,
        mathClasses = Mathf._classes,
        value, key;

    for (key in json) {
        value = json[key];

        if (typeof(value) !== "object") {
            obj[key] = value;
        } else if (mathClasses[value._className]) {
            obj[key] = Mathf.fromJSON(value);
        } else if (classes[value._className]) {
            obj[key] = Class.fromJSON(value);
        } else {
            obj[key] = value;
        }
    }
}


function copy(obj) {
    var out = {},
        classes = Class._classes,
        mathClasses = Mathf._classes,
        value, key;

    for (key in obj) {
        value = obj[key];

        if (typeof(value) !== "object") {
            out[key] = value;
        } else if (mathClasses[value._className]) {
            out[key] = new mathClasses[value._className]().copy(value);
        } else if (classes[value._className]) {
            out[key] = new classes[value._className]().copy(value);
        } else {
            out[key] = value;
        }
    }

    return out;
}


module.exports = Material;

},{"../../base/util":19,"../../math/color":102,"../../math/rect":109,"../../math/vec3":112,"../enums":73,"./asset":20,"./assets":22}],25:[function(require,module,exports){
var Asset = require("./asset");
var MeshBone = require("./mesh_bone");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Vec4 = require("../../math/vec4");
var Color = require("../../math/color");
"use strict";


function Mesh(opts) {
    opts || (opts = {});

    Asset.call(this, opts);

    this.vertices = opts.vertices != undefined ? opts.vertices : [];

    this.normals = opts.normals != undefined ? opts.normals : [];

    this.tangents = opts.tangents != undefined ? opts.tangents : [];

    this.indices = opts.indices != undefined ? opts.indices : [];

    this.colors = opts.colors != undefined ? opts.colors : [];

    this.uvs = opts.uvs != undefined ? opts.uvs : [];
    this.uvs2 = opts.uvs2 != undefined ? opts.uvs2 : [];

    this.bones = opts.bones != undefined ? opts.bones : [];
    this.boneIndices = opts.boneIndices != undefined ? opts.boneIndices : [];
    this.boneWeights = opts.boneWeights != undefined ? opts.boneWeights : [];

    this.dynamic = opts.dynamic != undefined ? !!opts.dynamic : false;
    this.useBones = opts.useBones != undefined ? !!opts.useBones : this.bones.length > 0 ? true : false;

    this.animations = {};

    this.aabb = new AABB3;
    if (opts.vertices) this.aabb.fromPoints(this.vertices);

    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    this.tangentsNeedUpdate = true;
    this.indicesNeedUpdate = true;
    this.colorsNeedUpdate = true;
    this.uvsNeedUpdate = true;
    this.uvs2NeedUpdate = true;

    this.boneIndicesNeedUpdate = true;
    this.boneWeightsNeedUpdate = true;

    this._webglBuffersInitted = undefined;
    this._webglUsed = 0;

    this._webglVertexBuffer = undefined;
    this._webglNormalBuffer = undefined;
    this._webglTangentBuffer = undefined;
    this._webglColorBuffer = undefined;
    this._webglUvBuffer = undefined;
    this._webglUv2Buffer = undefined;

    this._webglMeshBoneIndexBuffer = undefined;
    this._webglMeshBoneWeightBuffer = undefined;

    this._webglIndexBuffer = undefined;
    this._webglLineBuffer = undefined;

    this._webglVertexArray = undefined;
    this._webglNormalArray = undefined;
    this._webglTangentArray = undefined;
    this._webglColorArray = undefined;
    this._webglUvArray = undefined;
    this._webglUv2Array = undefined;

    this._webglMeshBoneIndexArray = undefined;
    this._webglMeshBoneWeightArray = undefined;

    this._webglIndexArray = undefined;
    this._webglLineArray = undefined;

    this._webglVertexCount = undefined;
    this._webglLineCount = undefined;

    if (opts.json) this.fromJSON(opts.json);
}

Asset.extend(Mesh);


Mesh.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    var vertices = this.vertices,
        otherVertices = other.vertices,
        normals = this.normals,
        otherNormals = other.normals,
        tangents = this.tangents,
        otherTangents = other.tangents,
        indices = this.indices,
        otherIndices = other.indices,
        colors = this.colors,
        otherColors = other.colors,
        uvs = this.uvs,
        otherUvs = other.uvs,
        uvs2 = this.uvs2,
        otherUv2s = other.uvs2,
        bones = this.bones,
        otherMeshBones = other.bones,
        boneIndices = this.boneIndices,
        otherMeshBoneIndices = other.boneIndices,
        boneWeights = this.boneWeights,
        otherMeshBoneWeights = other.boneWeights,
        i;

    vertices.length = otherVertices.length;
    normals.length = otherNormals.length;
    tangents.length = otherTangents.length;
    indices.length = otherIndices.length;
    colors.length = otherColors.length;
    uvs.length = otherUvs.length;
    uvs2.length = otherUv2s.length;

    bones.length = otherMeshBones.length;
    boneIndices.length = otherMeshBoneIndices.length;
    boneWeights.length = otherMeshBoneWeights.length;

    for (i = otherVertices.length; i--;) vertices[i] = (vertices[i] || new Vec3).copy(otherVertices[i]);
    for (i = otherNormals.length; i--;) normals[i] = (normals[i] || new Vec3).copy(otherNormals[i]);
    for (i = otherTangents.length; i--;) tangents[i] = (tangents[i] || new Vec4).copy(otherTangents[i]);
    for (i = otherIndices.length; i--;) indices[i] = otherIndices[i];
    for (i = otherColors.length; i--;) colors[i] = (colors[i] || new Color).copy(otherColors[i]);
    for (i = otherUvs.length; i--;) uvs[i] = (uvs[i] || new Vec2).copy(otherUvs[i]);
    for (i = otherUv2s.length; i--;) uvs2[i] = (uvs2[i] || new Vec2).copy(otherUv2s[i]);
    for (i = otherMeshBones.length; i--;) bones[i] = (bones[i] || new MeshBone).copy(otherMeshBones[i]);
    for (i = otherMeshBoneIndices.length; i--;) boneIndices[i] = otherMeshBoneIndices[i];
    for (i = otherMeshBoneWeights.length; i--;) boneWeights[i] = otherMeshBoneWeights[i];

    this.dynamic = other.dynamic;
    this.useBones = other.useBones;

    this.aabb.fromPoints(this.vertices);

    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    this.tangentsNeedUpdate = true;
    this.indicesNeedUpdate = true;
    this.colorsNeedUpdate = true;
    this.uvsNeedUpdate = true;
    this.uvs2NeedUpdate = true;
    this.boneIndicesNeedUpdate = true;
    this.boneWeightsNeedUpdate = true;

    return this;
};


Mesh.prototype.clear = function () {
    Asset.prototype.clear.call(this);

    this.vertices.length = 0;
    this.normals.length = 0;
    this.tangents.length = 0;
    this.indices.length = 0;
    this.colors.length = 0;
    this.uvs.length = 0;
    this.uvs2.length = 0;

    this.bones.length = 0;
    this.boneIndices.length = 0;
    this.boneWeights.length = 0;

    this.aabb.clear();

    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    this.tangentsNeedUpdate = true;
    this.indicesNeedUpdate = true;
    this.colorsNeedUpdate = true;
    this.uvsNeedUpdate = true;
    this.uvs2NeedUpdate = true;
    this.boneIndicesNeedUpdate = true;
    this.boneWeightsNeedUpdate = true;

    return this;
};


var EMPTY_ARRAY = [];

Mesh.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);
    var vertices = this.vertices,
        normals = this.normals,
        tangents = this.tangents,
        indices = this.indices,
        colors = this.colors,
        uvs = this.uvs,
        uvs2 = this.uvs2,
        bones = this.bones,
        boneWeights = this.boneWeights,
        boneIndices = this.boneIndices,
        bone, items, item,
        i, il;

    vertices.length = normals.length = tangents.length = indices.length = colors.length = uvs.length = uvs2.length = 0;
    bones.length = boneWeights.length = boneIndices.length = 0;

    items = raw.vertices || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 3) vertices.push(new Vec3(items[i], items[i + 1], items[i + 2]));

    items = raw.normals || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 3) normals.push(new Vec3(items[i], items[i + 1], items[i + 2]));

    items = raw.tangents || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 4) tangents.push(new Vec4(items[i], items[i + 1], items[i + 2], items[i + 3]));

    items = raw.indices || raw.faces || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 3) indices.push(items[i], items[i + 1], items[i + 2]);

    items = raw.colors || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 3) colors.push(new Color(items[i], items[i + 1], items[i + 2]));

    items = raw.uvs || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 2) uvs.push(new Vec2(items[i], items[i + 1]));

    items = raw.uvs2 || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i += 2) uvs2.push(new Vec2(items[i], items[i + 1]));

    items = raw.bones || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i++) {
        item = items[i];

        bone = new MeshBone(item.parent, item.name);

        bone.position.fromArray(item.position);
        bone.rotation.fromArray(item.rotation);
        bone.scale.fromArray(item.scale);
        bone.bindPose.fromArray(item.bindPose);
        bone.skinned = !!item.skinned;

        bones.push(bone);
    }
    if (items.length) this.useBones = true;

    items = raw.boneWeights || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i++) boneWeights.push(items[i]);

    items = raw.boneIndices || EMPTY_ARRAY;
    for (i = 0, il = items.length; i < il; i++) boneIndices.push(items[i]);

    this.animations = raw.animations;

    this.aabb.fromPoints(this.vertices);

    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    this.tangentsNeedUpdate = true;
    this.indicesNeedUpdate = true;
    this.colorsNeedUpdate = true;
    this.uvsNeedUpdate = true;
    this.uvs2NeedUpdate = true;
    this.boneIndicesNeedUpdate = true;
    this.boneWeightsNeedUpdate = true;

    return this;
};


Mesh.prototype.transformMat3 = function (m) {
    var vertices = this.vertices,
        normals = this.normals,
        i;

    if (vertices) {
        i = vertices.length;
        while (i--) vertices[i].transformMat3(m);
        this.verticesNeedUpdate = true;
    }
    if (normals) {
        i = normals.length;
        while (i--) normals[i].transformMat3(m);
        this.normalsNeedUpdate = true;
    }

    return this;
};


Mesh.prototype.transformMat4 = function (m) {
    var vertices = this.vertices,
        normals = this.normals,
        i;

    if (vertices) {
        i = vertices.length;
        while (i--) vertices[i].transformMat4(m);
        this.verticesNeedUpdate = true;
    }
    if (normals) {
        i = normals.length;
        while (i--) normals[i].transformMat4Rotation(m);
        this.normalsNeedUpdate = true;
    }

    return this;
};


Mesh.prototype.calculateAABB = function () {

    this.aabb.fromPoints(this.vertices);
    return this;
};


Mesh.prototype.calculateNormals = function () {
    var u = new Vec3,
        v = new Vec3,
        uv = new Vec3,
        faceNormal = new Vec3;

    return function () {
        var vertices = this.vertices,
            normals = this.normals,
            indices = this.indices,
            a, b, c, va, vb, vc, i;

        for (i = vertices.length; i--;)(normals[i] || (normals[i] = new Vec3)).set(0, 0, 0);

        for (i = indices.length; i -= 3;) {
            a = indices[i];
            b = indices[i + 1];
            c = indices[i + 2];

            va = vertices[a];
            vb = vertices[b];
            vc = vertices[c];

            u.vsub(vc, vb);
            v.vsub(va, vb);

            uv.vcross(u, v);

            faceNormal.copy(uv).normalize();

            normals[a].add(faceNormal);
            normals[b].add(faceNormal);
            normals[c].add(faceNormal);
        }

        for (i = indices.length; i -= 3;) {
            normals[indices[i]].normalize();
            normals[indices[i + 1]].normalize();
            normals[indices[i + 2]].normalize();
        }

        this.normalsNeedUpdate = true;

        return this;
    };
}();


Mesh.prototype.calculateTangents = function () {
    var tan1 = [],
        tan2 = [],
        sdir = new Vec3,
        tdir = new Vec3,
        n = new Vec3,
        t = new Vec3,
        tmp1 = new Vec3,
        tmp2 = new Vec3;

    return function () {
        var indices = this.indices,
            vertices = this.vertices,
            normals = this.normals,
            tangents = this.tangents,
            uvs = this.uvs,

            v1, v2, v3,
            w1, w2, w3,

            x1, x2, y1, y2, z1, z2,
            s1, s2, t1, t2,
            a, b, c,

            r, w, i;

        for (i = vertices.length; i--;) {
            (tan1[i] || (tan1[i] = new Vec3)).set(0, 0, 0);
            (tan2[i] || (tan2[i] = new Vec3)).set(0, 0, 0);
            (tangents[i] || (tangents[i] = new Vec4)).set(0, 0, 0, 1);
        }

        for (i = vertices.length; i--;) uvs[i] = uvs[i] || (uvs[i] = new Vec2);

        for (i = indices.length; i -= 3;) {
            a = indices[i];
            b = indices[i + 1];
            c = indices[i + 2];

            v1 = vertices[a];
            v2 = vertices[b];
            v3 = vertices[c];

            w1 = uvs[a];
            w2 = uvs[b];
            w3 = uvs[c];

            x1 = v2.x - v1.x;
            x2 = v3.x - v1.x;
            y1 = v2.y - v1.y;
            y2 = v3.y - v1.y;
            z1 = v2.z - v1.z;
            z2 = v3.z - v1.z;

            s1 = w2.x - w1.x;
            s2 = w3.x - w1.x;
            t1 = w2.y - w1.y;
            t2 = w3.y - w1.y;

            r = s1 * t2 - s2 * t1;
            r = r !== 0 ? 1 / r : 0;

            sdir.set(
                (t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r
            );

            tdir.set(
                (s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r
            );

            tan1[a].add(sdir);
            tan1[b].add(sdir);
            tan1[c].add(sdir);

            tan2[a].add(tdir);
            tan2[b].add(tdir);
            tan2[c].add(tdir);
        }

        for (i = vertices.length; i--;) {
            t.copy(tan1[i]);
            n.copy(normals[i]);

            tmp1.copy(t);
            tmp1.sub(n.smul(n.dot(t))).normalize();

            n.copy(normals[i]);
            tmp2.vcross(n, t);

            w = (tmp2.dot(tan2[i]) < 0) ? -1 : 1;

            tangents[i].set(tmp1.x, tmp1.y, tmp1.z, w);
        }

        this.tangentsNeedUpdate = true;

        return this;
    };
}();


Mesh.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json, pack);
    var vertices = this.vertices,
        jsonVertices = json.vertices || (json.vertices = []),
        normals = this.normals,
        jsonNormals = json.normals || (json.normals = []),
        tangents = this.tangents,
        jsonTangents = json.tangents || (json.tangents = []),
        indices = this.indices,
        jsonIndices = json.indices || (json.indices = []),
        colors = this.colors,
        jsonColors = json.colors || (json.colors = []),
        uvs = this.uvs,
        jsonUvs = json.uvs || (json.uvs = []),
        uvs2 = this.uvs2,
        jsonUv2s = json.uvs2 || (json.uvs2 = []),
        bones = this.bones,
        jsonMeshBones = json.bones || (json.bones = []),
        boneIndices = this.boneIndices,
        jsonMeshBoneIndices = json.boneIndices || (json.boneIndices = []),
        boneWeights = this.boneWeights,
        jsonMeshBoneWeights = json.boneWeights || (json.boneWeights = []),
        i;

    jsonVertices.length = vertices.length;
    jsonNormals.length = normals.length;
    jsonTangents.length = tangents.length;
    jsonIndices.length = indices.length;
    jsonColors.length = colors.length;
    jsonUvs.length = uvs.length;
    jsonUv2s.length = uvs2.length;

    jsonMeshBones.length = bones.length;
    jsonMeshBoneIndices.length = boneIndices.length;
    jsonMeshBoneWeights.length = boneWeights.length;

    for (i = vertices.length; i--;) jsonVertices[i] = vertices[i].toJSON(jsonVertices[i]);
    for (i = normals.length; i--;) jsonNormals[i] = normals[i].toJSON(jsonNormals[i]);
    for (i = tangents.length; i--;) jsonTangents[i] = tangents[i].toJSON(jsonTangents[i]);
    for (i = indices.length; i--;) indices[i] = jsonIndices[i];
    for (i = colors.length; i--;) jsonColors[i] = colors[i].toJSON(jsonColors[i]);
    for (i = uvs.length; i--;) jsonUvs[i] = uvs[i].toJSON(jsonUvs[i]);
    for (i = uvs2.length; i--;) jsonUv2s[i] = uvs2[i].toJSON(jsonUv2s[i]);
    for (i = bones.length; i--;) jsonMeshBones[i] = bones[i].toJSON(jsonMeshBones[i]);
    for (i = boneIndices.length; i--;) boneIndices[i] = jsonMeshBoneIndices[i];
    for (i = boneWeights.length; i--;) boneWeights[i] = jsonMeshBoneWeights[i];

    json.dynamic = this.dynamic;
    json.useBones = this.useBones;

    return json;
};


Mesh.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);
    var vertices = this.vertices,
        jsonVertices = json.vertices,
        normals = this.normals,
        jsonNormals = json.normals,
        tangents = this.tangents,
        jsonTangents = json.tangents,
        indices = this.indices,
        jsonIndices = json.indices,
        colors = this.colors,
        jsonColors = json.colors,
        uvs = this.uvs,
        jsonUvs = json.uvs,
        uvs2 = this.uvs2,
        jsonUv2s = json.uvs2,
        bones = this.bones,
        jsonMeshBones = json.bones,
        boneIndices = this.boneIndices,
        jsonMeshBoneIndices = json.boneIndices,
        boneWeights = this.boneWeights,
        jsonMeshBoneWeights = json.boneWeights,
        i;

    vertices.length = jsonVertices.length;
    normals.length = jsonNormals.length;
    tangents.length = jsonTangents.length;
    indices.length = jsonIndices.length;
    colors.length = jsonColors.length;
    uvs.length = jsonUvs.length;
    uvs2.length = jsonUv2s.length;

    bones.length = jsonMeshBones.length;
    boneIndices.length = jsonMeshBoneIndices.length;
    boneWeights.length = jsonMeshBoneWeights.length;

    for (i = jsonVertices.length; i--;) vertices[i] = (vertices[i] || new Vec3).copy(jsonVertices[i]);
    for (i = jsonNormals.length; i--;) normals[i] = (normals[i] || new Vec3).copy.fromJSON(jsonNormals[i]);
    for (i = jsonTangents.length; i--;) tangents[i] = (tangents[i] || new Vec4).fromJSON(jsonTangents[i]);
    for (i = jsonIndices.length; i--;) indices[i] = jsonIndices[i];
    for (i = jsonColors.length; i--;) colors[i] = (colors[i] || new Color).fromJSON(jsonColors[i]);
    for (i = jsonUvs.length; i--;) uvs[i] = (uvs[i] || new Vec2).fromJSON(jsonUvs[i]);
    for (i = jsonUv2s.length; i--;) uvs2[i] = (uvs2[i] || new Vec2).fromJSON(jsonUv2s[i]);
    for (i = jsonMeshBones.length; i--;) bones[i] = (bones[i] || new MeshBone).fromJSON(jsonMeshBones[i]);
    for (i = jsonMeshBoneIndices.length; i--;) boneIndices[i] = jsonMeshBoneIndices[i];
    for (i = jsonMeshBoneWeights.length; i--;) boneWeights[i] = jsonMeshBoneWeights[i];

    this.dynamic = json.dynamic;
    this.useBones = json.useBones;

    this.aabb.fromPoints(this.vertices);

    this.verticesNeedUpdate = true;
    this.normalsNeedUpdate = true;
    this.tangentsNeedUpdate = true;
    this.indicesNeedUpdate = true;
    this.colorsNeedUpdate = true;
    this.uvsNeedUpdate = true;
    this.uvs2NeedUpdate = true;
    this.boneIndicesNeedUpdate = true;
    this.boneWeightsNeedUpdate = true;

    return this;
};


var PI = Math.PI,
    HALF_PI = PI * 0.5,
    TWO_PI = PI * 2,
    sin = Math.sin,
    cos = Math.cos;
Mesh.Sphere = function (opts) {
    opts || (opts = {});
    var radius = opts.radius != undefined ? opts.radius : 0.5,
        segments = (opts.segments != undefined ? floor(max(opts.segments, 3)) : 16) + 1,
        rings = (opts.rings != undefined ? floor(max(opts.rings, 3)) : 8) + 2,

        R = 1 / (rings - 1),
        S = 1 / (segments - 1),
        r, s,
        x, y, z,
        a, b, c, d,

        mesh = new Mesh(opts),
        vertices = mesh.vertices,
        normals = mesh.normals,
        uvs = mesh.uvs,
        colors = mesh.colors,
        indices = mesh.indices;

    for (r = 0; r < rings; r++) {
        for (s = 0; s < segments; s++) {
            z = sin(-HALF_PI + PI * r * R);
            x = cos(TWO_PI * s * S) * sin(PI * r * R);
            y = sin(TWO_PI * s * S) * sin(PI * r * R);

            vertices.push(new Vec3(x, y, z).smul(radius));
            normals.push(new Vec3(x, y, z));
            uvs.push(new Vec2(s * S, r * R));
            colors.push(new Vec3(s * S, r * R, 0));
        }
    }

    for (r = 0; r < rings - 1; r++) {
        for (s = 0; s < segments - 1; s++) {
            a = r * segments + s;
            b = r * segments + (s + 1);
            c = (r + 1) * segments + (s + 1);
            d = (r + 1) * segments + s;

            indices.push(a, b, c);
            indices.push(a, c, d);
        }
    }

    mesh.calculateAABB();
    mesh.load = false;
    if (opts.tangents) mesh.calculateTangents();

    return mesh;
};


Mesh.Cube = function (opts) {
    opts || (opts = {});
    var w = opts.width || 1,
        h = opts.height || 1,
        d = opts.depth || 1,
        hw = w * 0.5,
        hh = h * 0.5,
        hd = d * 0.5,
        ws = (opts.widthSegments || 1),
        hs = (opts.heightSegments || 1),
        ds = (opts.depthSegments || 1),
        mesh = new Mesh(opts);

    buildPlane(mesh, "z", "y", -1, 1, d, ds, h, hs, hw, ws);
    buildPlane(mesh, "z", "y", 1, 1, d, ds, h, hs, -hw, ws);
    buildPlane(mesh, "x", "z", 1, -1, w, ws, d, ds, hh, hs);
    buildPlane(mesh, "x", "z", 1, 1, w, ws, d, ds, -hh, hs);
    buildPlane(mesh, "x", "y", 1, 1, w, ws, h, hs, hd, ds);
    buildPlane(mesh, "x", "y", -1, 1, w, ws, h, hs, -hd, ds);

    mesh.calculateAABB();
    mesh.load = false;
    if (opts.tangents) mesh.calculateTangents();

    return mesh;
};


Mesh.Plane = function (opts) {
    opts || (opts = {});
    var w = opts.width || 1,
        h = opts.height || 1,
        ws = (opts.widthSegments || 1),
        hs = (opts.heightSegments || 1),
        mesh = new Mesh(opts);

    buildPlane(mesh, "x", "y", 1, 1, w, ws, h, hs, 0, 0);

    mesh.calculateAABB();
    mesh.load = false;
    if (opts.tangents) mesh.calculateTangents();

    return mesh;
};


function buildPlane(mesh, u, v, udir, vdir, width, ws, height, hs, depth, ds) {
    var vertices = mesh.vertices,
        normals = mesh.normals,
        indices = mesh.indices,
        uvs = mesh.uvs,
        gridX = ws,
        gridY = hs,
        width_half = width / 2,
        height_half = height / 2,
        offset = vertices.length,
        w, ix, iy;

    if ((u === "x" && v === "z") || (u === "z" && v === "x")) {
        w = "y";
        gridY = ds;
    } else if ((u === "x" && v === "y") || (u === "y" && v === "x")) {
        w = "z";
    } else if ((u === "y" && v === "z") || (u === "z" && v === "y")) {
        w = "x";
        gridX = ds;
    }

    var gridX1 = gridX + 1,
        gridY1 = gridY + 1,
        segment_width = width / gridX,
        segment_height = height / gridY,
        normal = new Vec3(),
        vertexCount = offset;

    normal[w] = depth > 0 ? 1 : -1;

    function addVertex(x, y, z) {
        var vector = new Vec3();
        vector[u] = x;
        vector[v] = y;
        vector[w] = z;
        vertices.push(vector);
    }

    for (iy = 0; iy < gridY; iy++) {
        for (ix = 0; ix < gridX; ix++) {
            addVertex(
                ((ix + 1) * segment_width - width_half) * udir, ((iy + 1) * segment_height - height_half) * vdir,
                depth
            );
            uvs.push(new Vec2((ix + 1) / gridX, 1 - (iy + 1) / gridY));

            addVertex(
                (ix * segment_width - width_half) * udir, ((iy + 1) * segment_height - height_half) * vdir,
                depth
            );
            uvs.push(new Vec2(ix / gridX, 1 - (iy + 1) / gridY));

            addVertex(
                (ix * segment_width - width_half) * udir, (iy * segment_height - height_half) * vdir,
                depth
            );
            uvs.push(new Vec2(ix / gridX, 1 - iy / gridY));

            addVertex(
                ((ix + 1) * segment_width - width_half) * udir, (iy * segment_height - height_half) * vdir,
                depth
            );
            uvs.push(new Vec2((ix + 1) / gridX, 1 - iy / gridY));

            indices.push(
                vertexCount, vertexCount + 1, vertexCount + 2,
                vertexCount, vertexCount + 2, vertexCount + 3
            );
            normals.push(normal.clone(), normal.clone(), normal.clone(), normal.clone());
            vertexCount += 4;
        }
    }
}


Mesh.MeshBone = MeshBone;


module.exports = Mesh;

},{"../../math/color":102,"../../math/vec2":111,"../../math/vec3":112,"../../math/vec4":113,"./asset":20,"./mesh_bone":26}],26:[function(require,module,exports){
var Vec3 = require("../../math/vec3");
var Quat = require("../../math/quat");
var Mat4 = require("../../math/mat4");
"use strict";


var UNKNOWN = 0;


function MeshBone(parentIndex, name) {

    this.parentIndex = parentIndex != undefined ? parentIndex : -1;
    this.name = name != undefined ? name : "MeshBone_" + UNKNOWN++;

    this.skinned = false;
    this.position = new Vec3;
    this.rotation = new Quat;
    this.scale = new Vec3;
    this.bindPose = new Mat4;
}


MeshBone.prototype.clone = function () {

    return new MeshBone().copy(this);
};


MeshBone.prototype.copy = function (other) {

    this.name = other.name;
    this.parentIndex = other.parentIndex;

    this.skinned = other.skinned;
    this.position.copy(other.position);
    this.rotation.copy(other.rotation);
    this.scale.copy(other.scale);
    this.bindPose.copy(other.bindPose);

    return this;
};


MeshBone.prototype.toJSON = function (json) {
    json || (json = {});

    json.name = this.name;
    json.parentIndex = this.parentIndex;

    json.skinned = this.skinned;
    json.position = this.position.toJSON(json.position);
    json.rotation = this.rotation.toJSON(json.rotation);
    json.scale = this.scale.toJSON(json.scale);
    json.bindPose = this.bindPose.toJSON(json.bindPose);

    return json;
};


MeshBone.prototype.fromJSON = function (json) {

    this.name = json.name;
    this.parentIndex = json.parentIndex;

    this.skinned = json.skinned;
    this.position.fromJSON(json.position);
    this.rotation.fromJSON(json.rotation);
    this.scale.fromJSON(json.scale);
    this.bindPose.fromJSON(json.bindPose);

    return this;
};


module.exports = MeshBone;

},{"../../math/mat4":106,"../../math/quat":108,"../../math/vec3":112}],27:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function Diffuse() {

    Shader.call(this, {
        name: "shader_diffuse",
        load: false,

        lights: true,
        specular: false,

        vertex: [
            "varying vec2 vUv;",

            "void main() {",
            "	vUv = uv;",
            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "varying vec2 vUv;",

            "void main() {",
            "	vec3 diffuseLight = PixelLightNoSpec(normalize(vNormal));",

            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz, finalColor.w);",
            "}"
        ].join("\n")
    });
}

Shader.extend(Diffuse);


module.exports = Diffuse;

},{"../shader":35}],28:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function NormalDiffuse() {

    Shader.call(this, {
        name: "shader_normal_diffuse",
        load: false,

        lights: true,
        specular: false,
        OES_standard_derivatives: true,

        vertex: [
            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	#ifdef USE_SKINNING",
            "		vec4 boneTangent = boneMatrix * vec4( tangent.xyz, 0.0 );",
            "		vTangent = normalize( normalMatrix * boneTangent.xyz );",
            "	#else",
            "		vTangent = normalize( normalMatrix * tangent.xyz );",
            "	#endif",

            "	vUv = uv;",
            "	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );",

            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "uniform sampler2D normalMap;",
            "uniform float normalScale;",

            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	vec3 normalTex = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;",
            "	normalTex.xy *= normalScale;",

            "	mat3 tsb = mat3( vTangent, vBinormal, vNormal );",
            "	vec3 normal = normalize(tsb * normalTex);",

            "	vec3 diffuseLight = PixelLightNoSpec(normal);",

            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz, finalColor.w);",
            "}"
        ].join("\n")
    });
}

Shader.extend(NormalDiffuse);


module.exports = NormalDiffuse;

},{"../shader":35}],29:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function NormalSpecular() {

    Shader.call(this, {
        name: "shader_normal_specular",
        load: false,

        fallback: "specular",

        lights: true,
        OES_standard_derivatives: true,

        vertex: [
            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	#ifdef USE_SKINNING",
            "		vec4 boneTangent = boneMatrix * vec4( tangent.xyz, 0.0 );",
            "		vTangent = normalize( normalMatrix * boneTangent.xyz );",
            "	#else",
            "		vTangent = normalize( normalMatrix * tangent.xyz );",
            "	#endif",

            "	vUv = uv;",
            "	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );",

            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "uniform sampler2D normalMap;",
            "uniform float normalScale;",

            "uniform float shininess;",

            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	vec3 normalTex = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;",
            "	normalTex.xy *= normalScale;",

            "	mat3 tsb = mat3( vTangent, vBinormal, vNormal );",
            "	vec3 normal = normalize(tsb * normalTex);",

            "	vec3 diffuseLight, specularLight;",
            "	PixelLight(normal, vec3(finalColor.w), finalColor.w, shininess, diffuseLight, specularLight);",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz + specularLight * finalColor.xyz, 1.0);",
            "}"
        ].join("\n")
    });
}

Shader.extend(NormalSpecular);


module.exports = NormalSpecular;

},{"../shader":35}],30:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function ParallexDiffuse() {

    Shader.call(this, {
        name: "shader_parallex_diffuse",
        load: false,

        lights: true,
        specular: false,
        OES_standard_derivatives: true,

        vertex: [
            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	#ifdef USE_SKINNING",
            "		vec4 boneTangent = boneMatrix * vec4( tangent.xyz, 0.0 );",
            "		vTangent = normalize( normalMatrix * boneTangent.xyz );",
            "	#else",
            "		vTangent = normalize( normalMatrix * tangent.xyz );",
            "	#endif",

            "	vUv = uv;",
            "	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );",

            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "uniform sampler2D normalMap;",
            "uniform float normalScale;",

            "varying vec2 vUv;",
            "varying vec3 vTangent;",
            "varying vec3 vBinormal;",

            "void main() {",
            "	vec3 normalTex = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;",
            "	normalTex.xy *= normalScale;",

            "	mat3 tsb = mat3( vTangent, vBinormal, vNormal );",
            "	vec3 normal = normalize(tsb * normalTex);",

            "	vec3 diffuseLight = PixelLightNoSpec(normal);",

            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz, finalColor.w);",
            "}"
        ].join("\n")
    });
}

Shader.extend(ParallexDiffuse);


module.exports = ParallexDiffuse;

},{"../shader":35}],31:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function Specular() {

    Shader.call(this, {
        name: "shader_specular",
        load: false,

        lights: true,

        vertex: [
            "varying vec2 vUv;",

            "void main() {",
            "	vUv = uv;",
            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "uniform float shininess;",

            "varying vec2 vUv;",

            "void main() {",
            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	vec3 diffuseLight, specularLight;",
            "	PixelLight(normalize(vNormal), vec3(finalColor.w), finalColor.w, shininess, diffuseLight, specularLight);",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz + specularLight * finalColor.xyz, 1.0);",
            "}"
        ].join("\n")
    });
}

Shader.extend(Specular);


module.exports = Specular;

},{"../shader":35}],32:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function Unlit() {

    Shader.call(this, {
        name: "shader_unlit",
        load: false,

        vertex: [
            "varying vec2 vUv;",

            "void main() {",
            "	vUv = uv;",
            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "varying vec2 vUv;",

            "void main() {",
            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	gl_FragColor = finalColor;",
            "}"
        ].join("\n")
    });
}

Shader.extend(Unlit);


module.exports = Unlit;

},{"../shader":35}],33:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function ParticleUnlit() {

    Shader.call(this, {
        name: "shader_particle_unlit",

        vertex: [
            "void main() {",
            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform sampler2D diffuseMap;",

            "void main() {",
            "	float c = cos(vAngle);",
            "	float s = sin(vAngle);",

            "	vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,",
            "						  c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);",

            "	vec4 rotatedTexture = texture2D(diffuseMap, rotatedUV);",
            "	gl_FragColor = vec4(vParticleColor * rotatedTexture.xyz, vAlpha * rotatedTexture.w);",
            "}"
        ].join("\n")
    });
}

Shader.extend(ParticleUnlit);


module.exports = ParticleUnlit;

},{"../shader":35}],34:[function(require,module,exports){
var Shader = require("../shader");
"use strict";


function ReflectiveVertexLit() {

    Shader.call(this, {
        name: "shader_reflective_vertex_lit",
        load: false,

        lights: true,
        vertexLit: true,

        vertex: [
            "varying vec2 vUv;",
            "varying vec3 vReflect;",
            "varying vec3 vDiffuseLight;",

            "void main() {",
            "	vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * objectNormal);",
            "	vec3 cameraToVertex = normalize(worldPosition.xyz - cameraPosition);",

            "	vReflect = reflect(cameraToVertex, worldNormal);",
            "	vUv = uv;",
            "	VertexLight(transformedNormal, worldPosition.xyz, -mvPosition.xyz, vDiffuseLight);",

            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",
            "uniform samplerCube envMap;",

            "uniform float reflectivity;",
            "uniform int combine;",

            "varying vec2 vUv;",
            "varying vec3 vReflect;",
            "varying vec3 vDiffuseLight;",

            "void main() {",

            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	vec3 cubeColor = textureCube(envMap, vReflect).xyz;",

            "	if (combine == 1) {",
            "		finalColor.xyz = mix(finalColor.xyz, cubeColor, reflectivity);",
            "	} else if (combine == 2) {",
            "		finalColor.xyz += cubeColor * reflectivity;",
            "	} else {",
            "		finalColor.xyz = mix(finalColor.xyz, finalColor.xyz * cubeColor, reflectivity);",
            "	}",

            "	gl_FragColor = vec4(vDiffuseLight * finalColor.xyz, finalColor.w);",
            "}"
        ].join("\n")
    });
}

Shader.extend(ReflectiveVertexLit);


module.exports = ReflectiveVertexLit;

},{"../shader":35}],35:[function(require,module,exports){
var Asset = require("../asset");
"use strict";


function Shader(opts) {
    opts || (opts = {});

    Asset.call(this, opts);

    this.fallback = opts.fallback || "";

    this.vertex = opts.vertex || "void main(void) {}";
    this.fragment = opts.fragment || "void main(void) {}";

    this.lights = opts.lights != undefined ? opts.lights : false;
    this.specular = opts.specular != undefined ? opts.specular : true;
    this.vertexLit = opts.vertexLit != undefined ? opts.vertexLit : false;
    this.shadows = opts.shadows != undefined ? opts.shadows : false;
    this.fog = opts.fog != undefined ? opts.fog : false;

    this.OES_standard_derivatives = opts.OES_standard_derivatives != undefined ? opts.OES_standard_derivatives : false;
}

Asset.extend(Shader);


Shader.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);

    this.fallback = other.fallback;

    this.vertex = other.vertex;
    this.fragment = other.fragment;

    this.lights = other.lights;
    this.specular = other.specular;
    this.vertexLit = other.vertexLit;
    this.shadows = other.shadows;
    this.fog = other.fog;

    this.OES_standard_derivatives = other.OES_standard_derivatives;

    return this;
};


Shader.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);

    this.fromJSON(raw);

    return this;
};


Shader.prototype.clear = function () {
    Asset.prototype.clear.call(this);

    this.vertex = "";
    this.fragment = "";

    return this;
};


Shader.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json, pack);

    json.fallback = this.fallback;

    json.vertex = this.vertex;
    json.fragment = this.fragment;

    json.lights = this.lights;
    json.specular = this.specular;
    json.vertexLit = this.vertexLit;
    json.shadows = this.shadows;
    json.fog = this.fog;

    json.OES_standard_derivatives = this.OES_standard_derivatives;

    return json;
};


Shader.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    this.fallback = json.fallback;

    this.vertex = json.vertex;
    this.fragment = json.fragment;

    this.lights = json.lights;
    this.specular = json.specular;
    this.vertexLit = json.vertexLit;
    this.shadows = json.shadows;
    this.fog = json.fog;

    this.OES_standard_derivatives = json.OES_standard_derivatives;

    return this;
};


module.exports = Shader;

},{"../asset":20}],36:[function(require,module,exports){
var Unlit = require("./normal/unlit");
var VertexLit = require("./normal/specular");
var Diffuse = require("./normal/diffuse");
var Specular = require("./normal/specular");
var NormalDiffuse = require("./normal/normal_diffuse");
var NormalSpecular = require("./normal/normal_specular");
var ParallaxDiffuse = require("./normal/parallax_diffuse");
var ParticleUnlit = require("./particle/unlit");
var ReflectiveVertexLit = require("./reflective/reflective_vertex_lit");
"use strict";


module.exports = {
    Unlit: Unlit,
    VertexLit: VertexLit,
    Diffuse: Diffuse,
    Specular: Specular,
    NormalDiffuse: NormalDiffuse,
    NormalSpecular: NormalSpecular,
    ParallaxDiffuse: ParallaxDiffuse,

    ParticleUnlit: ParticleUnlit,

    ReflectiveVertexLit: ReflectiveVertexLit
};

},{"./normal/diffuse":27,"./normal/normal_diffuse":28,"./normal/normal_specular":29,"./normal/parallax_diffuse":30,"./normal/specular":31,"./normal/unlit":32,"./particle/unlit":33,"./reflective/reflective_vertex_lit":34}],37:[function(require,module,exports){
var Asset = require("./asset");
"use strict";


function SpriteSheet(opts) {
    opts || (opts = {});

    Asset.call(this, opts);
}

Asset.extend(SpriteSheet);


SpriteSheet.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    var raw = other.raw,
        key;

    for (key in raw) this[key] = raw[key];

    return this;
};


SpriteSheet.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);

    for (var key in raw) {
        if (!this[key]) {
            this[key] = raw[key];
        } else {
            Log.error("SpriteSheet.parse: invalid animation name " + key + " in file " + this.src);
        }
    }

    return this;
};


SpriteSheet.prototype.clear = function () {
    for (var key in this.raw) this[key] = null;
    Asset.prototype.clear.call(this);

    return this;
};


SpriteSheet.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);

    if ((pack || !this.src) && this.raw) json.raw = JSON.stringify(this.raw);

    return json;
};


SpriteSheet.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    if (!json.src && json.raw) this.raw = JSON.parse(json.raw);
    this.parse(this.raw);

    return this;
};


module.exports = SpriteSheet;

},{"./asset":20}],38:[function(require,module,exports){
var Enums = require("../enums");
var Asset = require("./asset");
"use strict";


function Texture(opts) {
    opts || (opts = {});

    Asset.call(this, opts);

    this.width = 0;
    this.height = 0;

    this.invWidth = 0;
    this.invHeight = 0;

    this.generateMipmap = opts.generateMipmap != undefined ? !!opts.generateMipmap : true;
    this.flipY = opts.flipY != undefined ? !!opts.flipY : true;
    this.premultiplyAlpha = opts.premultiplyAlpha != undefined ? !!opts.premultiplyAlpha : false;

    this.anisotropy = opts.anisotropy != undefined ? opts.anisotropy : 1;

    this.filter = opts.filter != undefined ? opts.filter : Enums.FilterMode.Linear;
    this.format = opts.format != undefined ? opts.format : Enums.TextureFormat.RGBA;
    this.wrap = opts.wrap != undefined ? opts.wrap : Enums.TextureWrap.Repeat;

    this._webgl = undefined;
    this._webglUsed = 0;

    this.needsUpdate = true;
}

Asset.extend(Texture);


Texture.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);

    this.width = other.width;
    this.height = other.height;

    this.invWidth = other.invWidth;
    this.invHeight = other.invHeight;

    this.generateMipmap = other.generateMipmap;
    this.flipY = other.flipY;
    this.premultiplyAlpha = other.premultiplyAlpha;

    this.anisotropy = other.anisotropy;

    this.filter = other.filter;
    this.format = other.format;
    this.wrap = other.wrap;

    return this;
};


Texture.prototype.parse = function (raw) {
    Asset.prototype.parse.call(this, raw);

    this.width = raw.width;
    this.height = raw.height;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    return this;
};


Texture.prototype.setMipmap = function (value) {

    this.generateMipmap = value != undefined ? !!value : !this.generateMipmap;
    this.needsUpdate = true;
};


Texture.prototype.setAnisotropy = function (value) {

    this.anisotropy = value;
    this.needsUpdate = true;
};


Texture.prototype.setFilter = function (value) {

    this.filter = value;
    this.needsUpdate = true;
};


Texture.prototype.setFormat = function (value) {

    this.format = value;
    this.needsUpdate = true;
};


Texture.prototype.setWrap = function (value) {

    this.wrap = value;
    this.needsUpdate = true;
};


Texture.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);

    if ((pack || !this.src) && this.raw) {
        if (typeof(window) === "undefined") {
            json.raw = this.raw;
        } else {
            var raw = this.raw,
                canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");

            canvas.width = raw.width;
            canvas.height = raw.height;
            ctx.drawImage(raw, 0, 0);

            json.raw = canvas.toDataURL();
        }
    }

    json.width = this.width;
    json.height = this.height;

    json.invWidth = this.invWidth;
    json.invHeight = this.invHeight;

    json.generateMipmap = this.generateMipmap;
    json.flipY = this.flipY;
    json.premultiplyAlpha = this.premultiplyAlpha;

    json.anisotropy = this.anisotropy;

    json.filter = this.filter;
    json.format = this.format;
    json.wrap = this.wrap;

    return json;
};


Texture.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    if (!json.src && json.raw) {
        if (typeof(window) === "undefined") {
            this.raw = json.raw;
        } else {
            var image = new Image;
            image.src = json.raw;
            this.raw = image;
        }
    }

    this.width = json.width;
    this.height = json.height;

    this.invWidth = json.invWidth;
    this.invHeight = json.invHeight;

    this.generateMipmap = json.generateMipmap;
    this.flipY = json.flipY;
    this.premultiplyAlpha = json.premultiplyAlpha;

    this.anisotropy = json.anisotropy;

    this.filter = json.filter;
    this.format = json.format;
    this.wrap = json.wrap;

    return this;
};


module.exports = Texture;

},{"../enums":73,"./asset":20}],39:[function(require,module,exports){
var Enums = require("../enums");
var Asset = require("./asset");
"use strict";


function TextureCube(opts) {
    opts || (opts = {});

    Asset.call(this, opts);

    this.mipmap = opts.mipmap != undefined ? !!opts.mipmap : true;
    this.flipY = opts.flipY != undefined ? !!opts.flipY : true;
    this.premultiplyAlpha = opts.premultiplyAlpha != undefined ? !!opts.premultiplyAlpha : false;

    this.anisotropy = opts.anisotropy != undefined ? opts.anisotropy : 1;

    this.filter = opts.filter != undefined ? opts.filter : Enums.FilterMode.Linear;
    this.format = opts.format != undefined ? opts.format : Enums.TextureFormat.RGBA;
    this.wrap = opts.wrap != undefined ? opts.wrap : Enums.TextureWrap.Repeat;

    this._webgl = undefined;
    this._webglUsed = 0;

    this.needsUpdate = true;
}

Asset.extend(TextureCube);


TextureCube.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);

    this.mipmap = other.mipmap;
    this.flipY = other.flipY;
    this.premultiplyAlpha = other.premultiplyAlpha;

    this.anisotropy = other.anisotropy;

    this.filter = other.filter;
    this.format = other.format;
    this.wrap = other.wrap;

    return this;
};


TextureCube.prototype.setMipmap = function (value) {

    this.mipmap = value != undefined ? !!value : !this.mipmap;
    this.needsUpdate = true;
};


TextureCube.prototype.setAnisotropy = function (value) {

    this.anisotropy = value;
    this.needsUpdate = true;
};


TextureCube.prototype.setFilter = function (value) {

    this.filter = value;
    this.needsUpdate = true;
};


TextureCube.prototype.setFormat = function (value) {

    this.format = value;
    this.needsUpdate = true;
};


TextureCube.prototype.setWrap = function (value) {

    this.wrap = value;
    this.needsUpdate = true;
};


TextureCube.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);

    if ((pack || !this.src) && this.raw) {
        if (typeof(window) === "undefined") {
            json.raw = this.raw;
        } else {
            var jsonRaw = json.raw || (json.raw = []),
                raw = this.raw,
                i = 0,
                il = raw.length;

            for (; i < il; i++) jsonRaw[i] = imageToDataUrl(raw[i]);
        }
    }

    json.width = this.width;
    json.height = this.height;

    json.invWidth = this.invWidth;
    json.invHeight = this.invHeight;

    json.mipmap = this.mipmap;
    json.flipY = this.flipY;
    json.premultiplyAlpha = this.premultiplyAlpha;

    json.anisotropy = this.anisotropy;

    json.filter = this.filter;
    json.format = this.format;
    json.wrap = this.wrap;

    return json;
};


TextureCube.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    if (!json.src && json.raw) {
        if (typeof(window) === "undefined") {
            this.raw = json.raw;
        } else {
            var jsonRaw = json.raw,
                raw = this.raw,
                i = 0,
                il = jsonRaw.length;

            for (; i < il; i++) {
                var image = new Image;
                image.src = sonRaw[i];
                raw[i] = image;
            }
        }
    }

    this.width = json.width;
    this.height = json.height;

    this.invWidth = json.invWidth;
    this.invHeight = json.invHeight;

    this.mipmap = json.mipmap;
    this.flipY = json.flipY;
    this.premultiplyAlpha = json.premultiplyAlpha;

    this.anisotropy = json.anisotropy;

    this.filter = json.filter;
    this.format = json.format;
    this.wrap = json.wrap;

    return this;
};


function imageToDataUrl(image) {
    if (typeof(window) === "undefined") return image;
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    return canvas.toDataURL();
};


module.exports = TextureCube;

},{"../enums":73,"./asset":20}],40:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function BoneComponentManager() {

    ComponentManager.call(this, 1000000);
}

ComponentManager.extend(BoneComponentManager);


BoneComponentManager.prototype.sortFunction = function (a, b) {

    return a.parentIndex - b.parentIndex;
};


module.exports = BoneComponentManager;

},{"./component_manager":43}],41:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function Camera2DComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(Camera2DComponentManager);


Camera2DComponentManager.prototype.sortFunction = function (a, b) {

    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = Camera2DComponentManager;

},{"./component_manager":43}],42:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function CameraComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(CameraComponentManager);


CameraComponentManager.prototype.sortFunction = function (a, b) {

    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = CameraComponentManager;

},{"./component_manager":43}],43:[function(require,module,exports){
var Class = require("../../base/class");
var Component = require("../components/component");
"use strict";


function ComponentManager(order) {

    Class.call(this);

    this.order = order || 0;

    this.scene = undefined;
    this.components = [];
}

Class.extend(ComponentManager);


ComponentManager.prototype.forEach = function (fn, ctx) {
    var components = this.components,
        i = 0,
        il = components.length;

    if (ctx) {
        for (; i < il; i++) fn.call(ctx, components[i], i, components);
    } else {
        for (; i < il; i++) fn(components[i], i, components);
    }
};


ComponentManager.prototype.start = function () {
    var components = this.components,
        i, il;

    for (i = 0, il = components.length; i < il; i++) components[i].start();
    for (i = 0, il = components.length; i < il; i++) components[i].emit("start");
};


ComponentManager.prototype.init = function () {
    var components = this.components,
        i, il;

    for (i = 0, il = components.length; i < il; i++) components[i].init();
    for (i = 0, il = components.length; i < il; i++) components[i].emit("init");
};


ComponentManager.prototype.update = function () {
    var components = this.components,
        i = 0,
        il = components.length,
        component;

    for (; i < il; i++)
        if ((component = components[i])) component.update();
};


ComponentManager.prototype.sort = function () {

    this.components.sort(this.sortFunction);
};


ComponentManager.prototype.sortFunction = function (a, b) {

    return a._id - b._id;
};


ComponentManager.prototype.empty = function () {

    return this.components.length === 0;
};


ComponentManager.prototype.add = function (component) {
    if (!(component instanceof Component)) {
        Log.error(this._className + ".add: can't add argument to " + this._className + ", it's not an instance of Component");
        return;
    }
    var components = this.components,
        index = components.indexOf(component);

    if (index === -1) {
        components.push(component);
    } else {
        Log.error(this._className + ".add: Component is already a member of " + this._className);
    }
};


ComponentManager.prototype.remove = function (component) {
    if (!(component instanceof Component)) {
        Log.error(this._className + ".remove: can't remove argument from " + this._className + ", it's not an instance of Component");
        return;
    }
    var components = this.components,
        index = components.indexOf(component);

    if (index !== -1) {
        components.splice(index, 1);
    } else {
        Log.error(this._className + ".remove: Component is not a member of " + this._className);
    }
};


module.exports = ComponentManager;

},{"../../base/class":8,"../components/component":54}],44:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function LightComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(LightComponentManager);


LightComponentManager.prototype.sortFunction = function (a, b) {

    return a.type - b.type;
};


LightComponentManager.prototype.update = function () {

};


module.exports = LightComponentManager;

},{"./component_manager":43}],45:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function MeshAnimationComponentManager() {

    ComponentManager.call(this, -999999);
}

ComponentManager.extend(MeshAnimationComponentManager);


module.exports = MeshAnimationComponentManager;

},{"./component_manager":43}],46:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function MeshFilterComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(MeshFilterComponentManager);


MeshFilterComponentManager.prototype.sortFunction = function (a, b) {

    return a.mesh === b.mesh ? 1 : -1;
};


MeshFilterComponentManager.prototype.update = function () {

};


module.exports = MeshFilterComponentManager;

},{"./component_manager":43}],47:[function(require,module,exports){
var Class = require("../../base/class");
var Mathf = require("../../math/mathf");
var ComponentManager = require("./component_manager");
var Sprite = require("../components/sprite");
"use strict";


var clamp = Mathf.clamp;


function SpriteComponentManager() {

    Class.call(this);

    this.order = 0;

    this.scene = undefined;
    this.layers = [];
}

ComponentManager.extend(SpriteComponentManager);


SpriteComponentManager.prototype.forEach = function (fn, ctx) {
    var layers = this.layers,
        components, i, il, j, jl;

    if (ctx) {
        for (i = 0, il = layers.length; i < il; i++) {
            components = layers[i];
            if (!components) continue;
            for (j = 0, jl = components.length; j < jl; j++) fn.call(ctx, components[j], j, components);
        }
    } else {
        for (i = 0, il = layers.length; i < il; i++) {
            components = layers[i];
            if (!components) continue;
            for (j = 0, jl = components.length; j < jl; j++) fn(components[j], j, components);
        }
    }
};


SpriteComponentManager.prototype.init = function () {
    var layers = this.layers,
        components, i, il, j, jl;

    for (i = 0, il = layers.length; i < il; i++) {
        components = layers[i];
        if (!components) continue;

        for (j = 0, jl = components.length; j < jl; j++) components[j].init();
        for (j = 0, jl = components.length; j < jl; j++) components[j].emit("init");
    }
};


SpriteComponentManager.prototype.start = function () {
    var layers = this.layers,
        components, i, il, j, jl;

    for (i = 0, il = layers.length; i < il; i++) {
        components = layers[i];
        if (!components) continue;

        for (j = 0, jl = components.length; j < jl; j++) components[j].start();
        for (j = 0, jl = components.length; j < jl; j++) components[j].emit("start");
    }
};


SpriteComponentManager.prototype.update = function () {

};


SpriteComponentManager.prototype.sort = function () {
    var layers = this.layers,
        components, i, il;

    for (i = 0, il = layers.length; i < il; i++) {
        components = layers[i];
        if (!components) continue;

        components.sort(this.sortFunction);
    }
};


SpriteComponentManager.prototype.sortFunction = function (a, b) {

    return a.z - b.z;
};


SpriteComponentManager.prototype.empty = function () {
    var layers = this.layers,
        components, i, il,
        empty = true;

    for (i = 0, il = layers.length; i < il; i++) {
        components = layers[i];
        if (!components) continue;

        if (components.length !== 0) empty = false
    }

    return empty;
};


SpriteComponentManager.prototype.add = function (component) {
    if (!(component instanceof Sprite)) {
        Log.error("SpriteComponentManager.add: can't add argument to SpriteComponentManager, it's not an instance of Sprite");
        return;
    }
    var layers = this.layers,
        componentLayer = (component.layer = clamp(component.layer || 0, 0, 20)),
        components = layers[componentLayer] || (layers[componentLayer] = []),
        index = components.indexOf(component);

    if (index === -1) {
        components.push(component);
    } else {
        Log.error(this._className + ".add: Sprite is already a member of SpriteComponentManager");
    }
};


SpriteComponentManager.prototype.remove = function (component) {
    if (!(component instanceof Sprite)) {
        Log.error("SpriteComponentManager.remove: can't remove argument from SpriteComponentManager, it's not an instance of Sprite");
        return;
    }
    var layers = this.layers,
        componentLayer = (component.layer = clamp(component.layer || 0, 0, 20)),
        components = layers[componentLayer] || (layers[componentLayer] = []),
        index = components.indexOf(component);

    if (index !== -1) {
        components.splice(index, 1);
    } else {
        Log.error("SpriteComponentManager.remove: Sprite is not a member of SpriteComponentManager");
    }
};


module.exports = SpriteComponentManager;

},{"../../base/class":8,"../../math/mathf":107,"../components/sprite":69,"./component_manager":43}],48:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function Transform2DComponentManager() {

    ComponentManager.call(this, 999999);
}

ComponentManager.extend(Transform2DComponentManager);


Transform2DComponentManager.prototype.sortFunction = function (a, b) {

    return a.depth - b.depth;
};


module.exports = Transform2DComponentManager;

},{"./component_manager":43}],49:[function(require,module,exports){
var ComponentManager = require("./component_manager");
"use strict";


function TransformComponentManager() {

    ComponentManager.call(this, 999999);
}

ComponentManager.extend(TransformComponentManager);


TransformComponentManager.prototype.sortFunction = function (a, b) {

    return a.depth - b.depth;
};


module.exports = TransformComponentManager;

},{"./component_manager":43}],50:[function(require,module,exports){
var AudioCtx = require("../../base/audio_ctx");
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Assets = require("../assets/assets");
var Component = require("./component");
"use strict";


var now = Time.now,
    clamp01 = Mathf.clamp01,
    defineProperty = Object.defineProperty;

function AudioSource(opts) {
    opts || (opts = {});

    Component.call(this, "AudioSource", opts);

    this.clip = opts.clip;

    this._source = undefined;
    this._gain = undefined;
    this._panner = undefined;

    this.dopplerLevel = opts.dopplerLevel != undefined ? opts.dopplerLevel : 1;
    this._loop = opts.loop != undefined ? !!opts.loop : false;

    this.maxDistance = opts.maxDistance != undefined ? opts.maxDistance : 15;
    this.minDistance = opts.minDistance != undefined ? opts.minDistance : 1;

    this.offset = opts.offset != undefined ? opts.offset : new Vec3;

    this.pitch = opts.pitch != undefined ? opts.pitch : 0;

    this.playOnStart = opts.playOnStart != undefined ? !!opts.playOnStart : false;

    this.spread = opts.spread != undefined ? opts.spread : 0;

    this.time = opts.time != undefined ? opts.time : 0;
    this._volume = opts.volume != undefined ? opts.volume : 1;

    this.playing = false;
    this.stopped = false;
    this.paused = false;

    this._startTime = 0;

    var _this = this;
    this._onended = function () {

        _this.playing = false;
        _this.time = 0;
        _this.emit("end");
    };
}

Component.extend(AudioSource);


defineProperty(AudioSource.prototype, "volume", {
    get: function () {
        return this._volume;
    },
    set: function (value) {
        this._volume = clamp01(value);
        if (this._gain) this._gain.gain.value = this._volume;
    }
});


defineProperty(AudioSource.prototype, "loop", {
    get: function () {
        return this._loop;
    },
    set: function (value) {
        this._loop = !!value;
        if (this._source) this._source.loop = this._loop;
    }
});


AudioSource.prototype.copy = function (other) {

    this.clip = other.clip;

    this.dopplerLevel = other.dopplerLevel;
    this.loop = other.loop;

    this.maxDistance = other.maxDistance;
    this.minDistance = other.minDistance;

    this.offset.copy(other.offset);
    this.panLevel = other.panLevel;

    this.pitch = other.pitch;

    this.playOnStart = other.playOnStart;

    this.spread = other.spread;

    this.time = other.time;
    this.volume = other.volume;

    this.playing = false;
    this.stopped = false;
    this.paused = false;

    return this;
};


AudioSource.prototype.clear = function () {
    Component.prototype.clear.call(this);
    if (this.playing) this.stop();

    this.clip = undefined;
    this._source = undefined;
    this._gain = undefined;
    this._panner = undefined;
};


AudioSource.prototype.start = function () {

    if (this.playOnStart) this.play();
};


var VEC2 = new Vec2,
    VEC3 = new Vec3;
AudioSource.prototype.update = function () {
    if (this.dopplerLevel === 0 || !this.playing) return;
    var transform2d, transform, camera, cameraTransform, panner;

    if (!(camera = this.gameObject.scene.game.camera)) return;
    if (!(panner = this._panner)) return;

    transform = this.transform;
    transform2d = this.transform2d;

    cameraTransform = camera.transform || camera.transform2d;

    if (transform2d) {
        VEC2.vadd(transform2d.position, this.offset);
        VEC2.sub(cameraTransform.position);
        VEC2.smul(this.dopplerLevel);

        panner.setPosition(VEC2.x, VEC2.y, camera.orthographicSize * 0.5);
    } else {
        VEC3.vadd(transform.position, this.offset);
        VEC3.sub(cameraTransform.position);
        VEC3.smul(this.dopplerLevel);

        panner.setPosition(VEC3.x, VEC3.y, VEC3.z || 0);
    }
};


AudioSource.prototype.play = function (delay, offset, duration) {
    if (!AudioCtx) return this;
    if (!AudioCtx.UNLOCKED && this._loop) {
        var _this = this,
            listener = function (e) {
                _this.play();
                window.removeEventListener("audiocontextunlock", listener, false);
            };

        window.addEventListener("audiocontextunlock", listener, false);
    }
    if (!this.clip || !this.clip.raw) return this;
    var time = this.time,
        clipLength = this.clip.length,
        maxLength = clipLength - time;

    delay || (delay = 0);
    offset || (offset = time);
    duration || (duration = clipLength);
    duration = duration > maxLength ? maxLength : duration;

    this._refresh();

    this.playing = true;
    this.stopped = false;
    this.paused = false;
    this._startTime = now();

    this.time = offset;
    this._source.start(delay, offset, duration);

    return this;
};


AudioSource.prototype.pause = function () {
    if (!AudioCtx || !this.clip || !this.clip.raw) return this;

    this.playing = false;
    this.stopped = false;
    this.paused = true;
    this.time = now() - this._startTime;

    this._source.stop(this.time);

    return this;
};


AudioSource.prototype.stop = function () {
    if (!AudioCtx || !this.clip || !this.clip.raw) return this;

    this.time = 0;
    this.playing = false;
    this.stopped = true;
    this.paused = false;

    this._source.stop(this.time);

    return this;
};


AudioSource.prototype._refresh = function () {
    var source = this._source = AudioCtx.createBufferSource(),
        gain = this._gain = AudioCtx.createGain(),
        panner;

    if (this.dopplerLevel === 0) {
        gain.connect(AudioCtx.destination);
        source.connect(gain);
    } else {
        panner = this._panner = AudioCtx.createPanner();

        gain.connect(AudioCtx.destination);
        panner.connect(gain);
        source.connect(panner);
    }

    source.buffer = this.clip.raw;
    source.onended = this._onended;

    gain.gain.value = this.volume;
    source.loop = this._loop;

    return this;
};


AudioSource.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.clip = this.clip ? this.clip.name : undefined;

    json.dopplerLevel = this.dopplerLevel;
    json.loop = this.loop;

    json.maxDistance = this.maxDistance;
    json.minDistance = this.minDistance;

    json.offset = this.offset.toJSON(json.offset);
    json.panLevel = this.panLevel;

    json.pitch = this.pitch;

    json.playOnStart = this.playOnStart;

    json.spread = this.spread;

    json.time = this.time;
    json.volume = this.volume;

    return json;
};


AudioSource.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.clip = json.clip ? Assets.get(json.clip) : undefined;

    this.dopplerLevel = json.dopplerLevel;
    this.loop = json.loop;

    this.maxDistance = json.maxDistance;
    this.minDistance = json.minDistance;

    this.offset.fromJSON(json.offset);
    this.panLevel = json.panLevel;

    this.pitch = json.pitch;

    this.playOnStart = json.playOnStart;

    this.spread = json.spread;

    this.time = json.time;
    this.volume = json.volume;

    return this;
};


module.exports = AudioSource;

},{"../../base/audio_ctx":7,"../../base/time":18,"../../math/mathf":107,"../../math/vec2":111,"../../math/vec3":112,"../assets/assets":22,"./component":54}],51:[function(require,module,exports){
var Vec3 = require("../../math/vec2");
var Quat = require("../../math/quat");
var Mat4 = require("../../math/mat4");
var Component = require("./component");
"use strict";


var UNKNOWN = 0;


function Bone(opts) {
    opts || (opts = {});

    Component.call(this, "Bone", opts);

    this.parentIndex = opts.parentIndex != undefined ? opts.parentIndex : -1;
    this.name = opts.name != undefined ? opts.name : "Bone_" + UNKNOWN++;

    this.skinned = opts.skinned != undefined ? opts.skinned : false;
    this.bindPose = opts.bindPose != undefined ? opts.bindPose : new Mat4;
    this.uniform = new Mat4;

    this.inheritPosition = opts.inheritPosition != undefined ? opts.inheritPosition : true;
    this.inheritRotation = opts.inheritRotation != undefined ? opts.inheritRotation : true;
    this.inheritScale = opts.inheritScale != undefined ? opts.inheritScale : true;
}

Component.extend(Bone);


Bone.prototype.copy = function (other) {

    this.name = other.name;
    this.parentIndex = other.parentIndex;

    this.skinned = other.skinned;
    this.bindPose.copy(other.bindPose);

    this.inheritPosition = other.inheritPosition;
    this.inheritRotation = other.inheritRotation;
    this.inheritScale = other.inheritScale;

    return this;
};


var MAT = new Mat4,
    POSITION = new Vec3,
    SCALE = new Vec3,
    ROTATION = new Quat;
Bone.prototype.update = function () {
    if (!this.skinned) return;
    var transform = this.transform,
        uniform = this.uniform,
        parent = transform.parent,
        inheritPosition = this.inheritPosition,
        inheritScale = this.inheritScale,
        inheritRotation = this.inheritRotation;

    uniform.copy(transform.matrix);

    if (parent && this.parentIndex !== -1) {
        MAT.copy(parent.bone.uniform);

        if (!inheritPosition || !inheritScale || !inheritRotation) {
            MAT.decompose(POSITION, SCALE, ROTATION);

            if (!inheritPosition) POSITION.set(0.0, 0.0, 0.0);
            if (!inheritScale) SCALE.set(1.0, 1.0, 1.0);
            if (!inheritRotation) ROTATION.set(0.0, 0.0, 0.0, 1.0);

            MAT.compose(POSITION, SCALE, ROTATION);
        }

        uniform.mmul(MAT, uniform);
    }
};


Bone.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.name = this.name;
    json.parentIndex = this.parentIndex;

    json.skinned = this.skinned;
    json.bindPose = this.bindPose.toJSON(json.bindPose);

    json.inheritPosition = this.inheritPosition;
    json.inheritRotation = this.inheritRotation;
    json.inheritScale = this.inheritScale;

    return json;
};


Bone.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.name = json.name;
    this.parentIndex = json.parentIndex;

    this.skinned = json.skinned;
    this.bindPose.fromJSON(json.bindPose);

    this.inheritPosition = json.inheritPosition;
    this.inheritRotation = json.inheritRotation;
    this.inheritScale = json.inheritScale;

    return this;
};


module.exports = Bone;

},{"../../math/mat4":106,"../../math/quat":108,"../../math/vec2":111,"./component":54}],52:[function(require,module,exports){
var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Vec3 = require("../../math/vec3");
var Mat4 = require("../../math/mat4");
var Component = require("./component");
"use strict";


var degsToRads = Mathf.degsToRads,
    clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera(opts) {
    opts || (opts = {});

    Component.call(this, "Camera", opts);

    this.width = 960;
    this.height = 640;
    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.autoResize = opts.autoResize != undefined ? !!opts.autoResize : true;
    this.background = opts.background != undefined ? opts.background : new Color(0.5, 0.5, 0.5);

    this.aspect = this.width / this.height;
    this.fov = opts.fov != undefined ? opts.fov : 35;

    this.near = opts.near != undefined ? opts.near : 0.0625;
    this.far = opts.far != undefined ? opts.far : 16384;

    this.orthographic = opts.orthographic != undefined ? !!opts.orthographic : false;
    this.orthographicSize = opts.orthographicSize != undefined ? opts.orthographicSize : 2;

    this.minOrthographicSize = opts.minOrthographicSize != undefined ? opts.minOrthographicSize : EPSILON;
    this.maxOrthographicSize = opts.maxOrthographicSize != undefined ? opts.maxOrthographicSize : 1024;

    this.projection = new Mat4;
    this.guiProjection = new Mat4;
    this.view = new Mat4;

    this.needsUpdate = true;
    this._active = false;
}

Component.extend(Camera);


Camera.prototype.copy = function (other) {

    this.width = other.width;
    this.height = other.height;
    this.aspect = other.aspect;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.autoResize = other.autoResize;
    this.background.copy(other.background);

    this.far = other.far;
    this.near = other.near;
    this.fov = other.fov;

    this.orthographic = other.orthographic;
    this.orthographicSize = other.orthographicSize;
    this.minOrthographicSize = other.minOrthographicSize;
    this.maxOrthographicSize = other.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
};


Camera.prototype.set = function (width, height) {

    this.width = width;
    this.height = height;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.aspect = width / height;
    this.needsUpdate = true;
};


Camera.prototype.setWidth = function (width) {

    this.width = width;
    this.aspect = width / this.height;

    this.invWidth = 1 / this.width;

    this.needsUpdate = true;
};


Camera.prototype.setHeight = function (height) {

    this.height = height;
    this.aspect = this.width / height;

    this.invHeight = 1 / this.height;

    this.needsUpdate = true;
};


Camera.prototype.setFov = function (value) {

    this.fov = value;
    this.needsUpdate = true;
};


Camera.prototype.setNear = function (value) {

    this.near = value;
    this.needsUpdate = true;
};


Camera.prototype.setFar = function (value) {

    this.far = value;
    this.needsUpdate = true;
};


Camera.prototype.setOrthographic = function (value) {

    this.orthographic = !!value;
    this.needsUpdate = true;
};


Camera.prototype.toggleOrthographic = function () {

    this.orthographic = !this.orthographic;
    this.needsUpdate = true;
};


Camera.prototype.setOrthographicSize = function (size) {

    this.orthographicSize = clamp(size, this.minOrthographicSize, this.maxOrthographicSize);
    this.needsUpdate = true;
};


var MAT4 = new Mat4,
    VEC3 = new Vec3;

Camera.prototype.toWorld = function (v, out) {
    out || (out = new Vec3);

    out.x = 2.0 * (v.x * this.invWidth) - 1.0;
    out.y = -2.0 * (v.y * this.invHeight) + 1.0;
    out.transformMat4(MAT4.mmul(this.projection, this.view).inverse());
    out.z = this.near;

    return out;
};


Camera.prototype.toScreen = function (v, out) {
    out || (out = new Vec2);

    VEC3.copy(v);
    VEC3.transformMat4(MAT4.mmul(this.projection, this.view));

    out.x = ((VEC3.x + 1.0) * 0.5) * this.width;
    out.y = ((1.0 - VEC3.y) * 0.5) * this.height;

    return v;
};


Camera.prototype.update = function (force) {
    if (!force && !this._active) return;

    if (this.needsUpdate) {

        if (!this.orthographic) {
            this.projection.perspective(degsToRads(this.fov), this.aspect, this.near, this.far);
        } else {
            this.orthographicSize = clamp(this.orthographicSize, this.minOrthographicSize, this.maxOrthographicSize);

            var orthographicSize = this.orthographicSize,
                right = orthographicSize * this.aspect,
                left = -right,
                top = orthographicSize,
                bottom = -top;

            this.projection.orthographic(left, right, top, bottom, this.near, this.far);
        }

        this.guiProjection.orthographic(0, this.width, 0, this.height, -1, 1);

        this.needsUpdate = false;
    }

    this.view.inverseMat((this.transform || this.transform2d).matrixWorld);
};


Camera.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.width = this.width;
    json.height = this.height;
    json.aspect = this.aspect;

    json.autoResize = this.autoResize;
    json.background = this.background.toJSON(json.background);

    json.far = this.far;
    json.near = this.near;
    json.fov = this.fov;

    json.orthographic = this.orthographic;
    json.orthographicSize = this.orthographicSize;
    json.minOrthographicSize = this.minOrthographicSize;
    json.maxOrthographicSize = this.maxOrthographicSize;

    return json;
};


Camera.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.width = json.width;
    this.height = json.height;
    this.aspect = json.aspect;

    this.autoResize = json.autoResize;
    this.background.fromJSON(json.background);

    this.far = json.far;
    this.near = json.near;
    this.fov = json.fov;

    this.orthographic = json.orthographic;
    this.orthographicSize = json.orthographicSize;
    this.minOrthographicSize = json.minOrthographicSize;
    this.maxOrthographicSize = json.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
};


module.exports = Camera;

},{"../../math/color":102,"../../math/mat4":106,"../../math/mathf":107,"../../math/vec3":112,"./component":54}],53:[function(require,module,exports){
var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat4 = require("../../math/mat4");
var Component = require("./component");
"use strict";


var clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera2D(opts) {
    opts || (opts = {});

    Component.call(this, "Camera2D", opts);

    this.width = 960;
    this.height = 640;
    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.autoResize = opts.autoResize != undefined ? !!opts.autoResize : true;
    this.background = opts.background != undefined ? opts.background : new Color(0.5, 0.5, 0.5);

    this.aspect = this.width / this.height;

    this.orthographicSize = opts.orthographicSize != undefined ? opts.orthographicSize : 2;

    this.minOrthographicSize = opts.minOrthographicSize != undefined ? opts.minOrthographicSize : EPSILON;
    this.maxOrthographicSize = opts.maxOrthographicSize != undefined ? opts.maxOrthographicSize : 1024;

    this.projection = new Mat4;
    this._projection = new Mat32;
    this.guiProjection = new Mat4;

    this.view = new Mat4;
    this._view = new Mat32;

    this.needsUpdate = true;
    this._active = false;
}

Component.extend(Camera2D);


Camera2D.prototype.copy = function (other) {

    this.width = other.width;
    this.height = other.height;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.autoResize = other.autoResize;
    this.background.copy(other.background);

    this.orthographicSize = other.orthographicSize;
    this.minOrthographicSize = other.minOrthographicSize;
    this.maxOrthographicSize = other.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
};


Camera2D.prototype.set = function (width, height) {

    this.width = width;
    this.height = height;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.aspect = width / height;
    this.needsUpdate = true;
};


Camera2D.prototype.setWidth = function (width) {

    this.width = width;
    this.aspect = width / this.height;

    this.invWidth = 1 / this.width;

    this.needsUpdate = true;
};


Camera2D.prototype.setHeight = function (height) {

    this.height = height;
    this.aspect = this.width / height;

    this.invHeight = 1 / this.height;

    this.needsUpdate = true;
};


Camera2D.prototype.setOrthographicSize = function (size) {

    this.orthographicSize = clamp(size, this.minOrthographicSize, this.maxOrthographicSize);
    this.needsUpdate = true;
};


var MAT32 = new Mat32,
    VEC2 = new Vec2;
Camera2D.prototype.toWorld = function (v, out) {
    out || (out = new Vec2);

    out.x = 2 * (v.x * this.invWidth) - 1;
    out.y = -2 * (v.y * this.invHeight) + 1;
    out.transformMat32(MAT32.mmul(this._projection, this._view).inverse());

    return out;
};


Camera2D.prototype.toScreen = function (v, out) {
    out || (out = new Vec2);

    VEC2.copy(v).transformMat32(MAT32.mmul(this._projection, this._view));

    out.x = ((VEC2.x + 1) * 0.5) * this.width;
    out.y = ((1 - VEC2.y) * 0.5) * this.height;

    return out;
};


Camera2D.prototype.update = function () {
    if (!this._active) return;

    if (this.needsUpdate) {
        var orthographicSize = this.orthographicSize,
            right = orthographicSize * this.aspect,
            left = -right,
            top = orthographicSize,
            bottom = -top;

        this.projection.orthographic(left, right, top, bottom, -1, 1);
        this._projection.fromMat4(this.projection);
        this.needsUpdate = false;

        this.guiProjection.orthographic(0, this.width, 0, this.height, -1, 1);
    }

    this.view.inverseMat((this.transform || this.transform2d).matrixWorld);
    this._view.fromMat4(this.view);
};


Camera2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.width = this.width;
    json.height = this.height;

    json.autoResize = this.autoResize;
    json.background = this.background.toJSON(json.background);

    json.orthographicSize = this.orthographicSize;
    json.minOrthographicSize = this.minOrthographicSize;
    json.maxOrthographicSize = this.maxOrthographicSize;

    return json;
};


Camera2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.width = json.width;
    this.height = json.height;

    this.autoResize = json.autoResize;
    this.background.fromJSON(json.background);

    this.orthographicSize = json.orthographicSize;
    this.minOrthographicSize = json.minOrthographicSize;
    this.maxOrthographicSize = json.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
};


module.exports = Camera2D;

},{"../../math/color":102,"../../math/mat32":105,"../../math/mat4":106,"../../math/mathf":107,"../../math/vec2":111,"./component":54}],54:[function(require,module,exports){
var Class = require("../../base/class");
var util = require("../../base/util");
var Log = require("../../base/log");
"use strict";


var camelize = util.camelize;


function Component(type, opts) {
    opts || (opts = {});
    if (!type) Log.error("Component defined without a type, use Component.call(this, \"ComponentName\", { sync: Boolean, json: Boolean })");

    Class.call(this);

    this._type = type || "UnknownComponent";
    this._name = camelize(this._type, true);

    this.sync = opts.sync != undefined ? !!opts.sync : false;
    this.json = opts.json != undefined ? !!opts.json : true;

    this.gameObject = undefined;
}

Class.extend(Component);


Component.prototype.copy = function (other) {

    this.sync = other.sync;
    this.json = other.json;

    return this;
};


Component.prototype.init = function () {

    return this;
};


Component.prototype.start = function () {

    return this;
};


Component.prototype.update = function () {

};


Component.prototype.clear = function () {

    this.off();

    return this;
};


Component.prototype.destroy = function () {
    if (!this.gameObject) {
        Log.error("Component.destroy: can't destroy Component if it's not added to a GameObject");
        return this;
    }

    this.gameObject.removeComponent(this);
    this.emit("destroy");

    this.clear();

    return this;
};


Component.prototype.remove = function () {
    if (!this.gameObject) {
        Log.error("Component.remove: can't remove Component if it's not added to a GameObject");
        return this;
    }

    this.gameObject.removeComponent(this, true);
    return this;
};


Component.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json._type = this._type;
    json.sync = this.sync;
    json.json = this.json;

    return json;
};


Component.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.sync = json.sync;
    this.json = json.json;

    return this;
};


module.exports = Component;

},{"../../base/class":8,"../../base/log":14,"../../base/util":19}],55:[function(require,module,exports){
var Component = require("./component");
"use strict";


function GUIElement(type, opts) {
    opts || (opts = {});

    Component.call(this, type || "GUIElement", opts);
}

Component.extend(GUIElement);


module.exports = GUIElement;

},{"./component":54}],56:[function(require,module,exports){
var Rect = require("../../math/rect");
var Color = require("../../math/color");
var Enums = require("../enums");
var Assets = require("../assets/assets");
var GUIElement = require("./gui_element");
"use strict";


var FontStyle = Enums.FontStyle,
    TextAnchor = Enums.TextAnchor;


function GUIText(opts) {
    opts || (opts = {});

    GUIElement.call(this, "GUIText", opts);

    this.text = opts.text != undefined ? opts.text : "";

    this.font = opts.font || "Arial";
    this.fontSize = opts.fontSize || 16;
    this.fontStyle = opts.fontStyle || FontStyle.Normal;
    this.lineHeight = opts.lineHeight || 24;
    this.lineSpacing = opts.lineSpacing || 0;

    this.color = opts.color != undefined ? opts.color : new Color(1, 1, 1);
    this.offset = opts.offset != undefined ? opts.offset : new Vec2;

    this.alignment = opts.alignment || TextAnchor.MiddleLeft;
}

GUIElement.extend(GUIText);


GUIText.prototype.copy = function (other) {

    this.text = other.text;

    this.font = other.font;
    this.fontSize = other.fontSize;
    this.fontStyle = other.fontStyle;
    this.lineHeight = other.lineHeight;
    this.lineSpacing = other.lineSpacing;

    this.color.copy(other.color);
    this.offset.copy(other.offset);

    this.alignment = other.alignment;

    return this;
};


GUIText.prototype.toJSON = function (json) {
    json = GUIElement.prototype.toJSON.call(this, json);

    json.text = this.text;

    json.font = this.font;
    json.fontSize = this.fontSize;
    json.fontStyle = this.fontStyle;
    json.lineHeight = this.lineHeight;
    json.lineSpacing = this.lineSpacing;

    json.color = this.color.toJSON(json.color);
    json.offset = this.offset.toJSON(json.offset);

    json.alignment = this.alignment;

    return json;
};


GUIText.prototype.fromJSON = function (json) {
    GUIElement.prototype.fromJSON.call(this, json);

    this.text = json.text;

    this.font = json.font;
    this.fontSize = json.fontSize;
    this.fontStyle = json.fontStyle;
    this.lineHeight = json.lineHeight;
    this.lineSpacing = json.lineSpacing;

    this.color.fromJSON(json.color);
    this.offset.fromJSON(json.offset);

    this.alignment = this.alignment;

    return this;
};


module.exports = GUIText;

},{"../../math/color":102,"../../math/rect":109,"../assets/assets":22,"../enums":73,"./gui_element":55}],57:[function(require,module,exports){
var Rect = require("../../math/rect");
var Color = require("../../math/color");
var Assets = require("../assets/assets");
var GUIElement = require("./gui_element");
"use strict";


function GUITexture(opts) {
    opts || (opts = {});

    GUIElement.call(this, "GUITexture", opts);

    this.texture = opts.texture;
    this.color = opts.color != undefined ? opts.color : new Color(1, 1, 1);
    this.position = opts.position != undefined ? opts.position : new Rect;

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.w = opts.w || 1;
    this.h = opts.h || 1;

    this.alpha = opts.alpha != undefined ? opts.alpha : 1;
}

GUIElement.extend(GUITexture);


GUITexture.prototype.copy = function (other) {

    this.texture = other.texture;
    this.color.copy(other.color);
    this.position.copy(other.position);

    this.x = other.x;
    this.y = other.y;
    this.w = other.w;
    this.h = other.h;

    this.alpha = other.alpha;

    return this;
};


GUITexture.prototype.clear = function () {
    GUIElement.prototype.clear.call(this);

    this.texture = undefined;

    return this;
};


GUITexture.prototype.toJSON = function (json) {
    json = GUIElement.prototype.toJSON.call(this, json);

    json.texture = this.texture ? this.texture.name : undefined;
    json.color = this.color.toJSON(json.color);
    json.position = this.position.toJSON(json.position);

    json.x = this.x;
    json.y = this.y;
    json.w = this.w;
    json.h = this.h;

    json.alpha = this.alpha;

    return json;
};


GUITexture.prototype.fromJSON = function (json) {
    GUIElement.prototype.fromJSON.call(this, json);

    this.texture = json.texture ? Assets.get(json.texture) : undefined;
    this.color.fromJSON(json.color);
    this.position.fromJSON(json.position);

    this.x = json.x;
    this.y = json.y;
    this.w = json.w;
    this.h = json.h;

    this.alpha = json.alpha;

    return this;
};


module.exports = GUITexture;

},{"../../math/color":102,"../../math/rect":109,"../assets/assets":22,"./gui_element":55}],58:[function(require,module,exports){
var Enums = require("../enums");
var Vec3 = require("../../math/vec3");
var Color = require("../../math/color");
var Component = require("./component");
"use strict";


var cos = Math.cos,
    defineProperty = Object.defineProperty;


function Light(opts) {
    opts || (opts = {});

    Component.call(this, "Light", opts);

    this.type = opts.type != undefined ? opts.type : Enums.LightType.Point;

    this.visible = opts.visible != undefined ? !!opts.visible : true;
    this.onlyShadow = opts.onlyShadow != undefined ? !!opts.onlyShadow : false;
    this.castShadow = opts.castShadow != undefined ? !!opts.castShadow : true;

    this.color = opts.color != undefined ? opts.color : new Color(1, 1, 1);
    this.energy = opts.energy != undefined ? opts.energy : 1;
    this.distance = opts.distance != undefined ? opts.distance : 0;

    this._angleCos = 0;
    this._angle = 0;
    this.angle = opts.angle != undefined ? opts.angle : Math.PI * 0.0625;
    this.exponent = opts.exponent != undefined ? opts.exponent : 10;

    this.target = opts.target != undefined ? opts.target : new Vec3;
}

Component.extend(Light);


defineProperty(Light.prototype, "angle", {
    get: function () {
        return this._angle;
    },
    set: function (value) {
        this._angle = value;
        this._angleCos = cos(value);
    }
});


Light.prototype.copy = function (other) {

    this.type = other.type;

    this.visible = other.visible;
    this.onlyShadow = other.onlyShadow;
    this.castShadow = other.castShadow;

    this.color.copy(other.color);
    this.energy = other.energy;
    this.distance = other.distance;
    this.angle = other.angle;

    return this;
};


Light.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.type = this.type;

    json.visible = this.visible;
    json.onlyShadow = this.onlyShadow;
    json.castShadow = this.castShadow;

    json.color = this.color.toJSON(json.color);
    json.energy = this.energy;
    json.distance = this.distance;
    json.angle = this.angle;

    return json;
};


Light.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.type = json.type;

    this.visible = json.visible;
    this.onlyShadow = json.onlyShadow;
    this.castShadow = json.castShadow;

    this.color.fromJSON(json.color);
    this.energy = json.energy;
    this.distance = json.distance;
    this.angle = json.angle;

    return this;
};


module.exports = Light;

},{"../../math/color":102,"../../math/vec3":112,"../enums":73,"./component":54}],59:[function(require,module,exports){
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Mat4 = require("../../math/mat4");
var Vec3 = require("../../math/vec3");
var Quat = require("../../math/quat");
var Assets = require("../assets/assets");
var Component = require("./component");
var Enums = require("../enums");
"use strict";


var clamp01 = Mathf.clamp01,
    abs = Math.abs,
    WrapMode = Enums.WrapMode;


function MeshAnimation(opts) {
    opts || (opts = {});

    Component.call(this, "MeshAnimation", opts);

    this.current = opts.current != undefined ? opts.current : "idle";
    this.mode = opts.mode != undefined ? opts.mode : WrapMode.Loop;

    this.rate = opts.rate != undefined ? opts.rate : 1 / 24;

    this._time = 0;
    this._frame = 0;
    this._lastFrame = 0;
    this._order = 1;

    this.playing = this.sheet ? true : false;
}

Component.extend(MeshAnimation);


MeshAnimation.prototype.copy = function (other) {

    this.current = other.current;
    this.mode = other.mode;

    this.rate = other.rate;

    this._time = other._time;
    this._frame = other._frame;
    this._lastFrame = other._lastFrame;
    this._order = other._order;

    this.playing = other.playing;

    return this;
};


MeshAnimation.prototype.play = function (name, mode, rate) {
    var meshFilter = this.meshFilter;
    if ((this.playing && this.current === name) || !meshFilter || !meshFilter.mesh.animations[name]) return this;

    this.current = name;
    this.rate = rate != undefined ? rate : (rate = this.rate);
    this.mode = mode || (mode = this.mode);
    this._frame = 0;
    this._lastFrame = 0;
    this._order = 1;
    this._time = 0;

    this.playing = true;
    this.emit("play", name, mode, rate);

    return this;
};


MeshAnimation.prototype.stop = function () {

    if (this.playing) this.emit("stop");
    this.playing = false;
    this._frame = 0;
    this._lastFrame = 0;
    this._order = 1;
    this._time = 0;

    return this;
};


var POSITION = new Vec3,
    LAST_POSITION = new Vec3,
    ROTATION = new Quat,
    LAST_ROTATION = new Quat,
    SCALE = new Vec3,
    LAST_SCALE = new Vec3,
    MAT4 = new Mat4;

MeshAnimation.prototype.update = function () {
    if (!this.playing) return;
    var meshFilter = this.meshFilter,
        meshBones, mesh, bonesLength, alpha = 0.0,
        boneCurrent, boneTransform, uniform, parentIndex, boneFrame, lastBoneFrame, pos, rot, scl,
        current, dt, count, length, order, frame, lastFrame, mode, frameState, lastFrameState, i;

    if (!meshFilter) return;
    meshBones = meshFilter._bones;

    mesh = meshFilter.mesh;
    if (!mesh) return;

    if (!(bonesLength = meshBones.length)) return;
    i = bonesLength;

    current = mesh.animations[this.current];
    if (!current) return;

    dt = Time.delta;
    order = this._order;
    frame = this._frame;
    lastFrame = this._lastFrame;
    mode = this.mode;

    if (!this.rate || this.rate === Infinity || this.rate < 0) {
        frame = abs(frame) % current.length;
    } else {
        this._time += dt;
        count = this._time / this.rate;
        alpha = count;

        if (count >= 1) {
            lastFrame = frame;
            alpha = 0.0;

            this._time = 0;
            length = current.length;
            frame += (order * (count | 0));

            if (mode === WrapMode.Loop) {
                frame = frame % length;
            } else if (mode === WrapMode.Once) {
                if (order > 0) {
                    if (frame >= length) {
                        frame = length - 1;
                        this.stop();
                    }
                } else {
                    if (frame < 0) {
                        frame = 0;
                        this.stop();
                    }
                }
            } else if (mode === WrapMode.PingPong) {
                if (order > 0) {
                    if (frame >= length) {
                        this._order = -1;
                        frame = length - 1;
                    }
                } else {
                    if (frame < 0) {
                        this._order = 1;
                        frame = 0;
                    }
                }
            } else if (mode === WrapMode.Clamp) {
                if (order > 0) {
                    if (frame >= length) frame = length - 1;
                } else {
                    if (frame < 0) frame = 0;
                }
            }
        }
    }

    alpha = clamp01(alpha);
    frameState = current[frame];
    lastFrameState = current[lastFrame] || frameState;

    while (i--) {
        boneCurrent = meshBones[i];

        boneTransform = boneCurrent.transform;
        uniform = boneCurrent.uniform;
        parentIndex = boneCurrent.parentIndex;
        pos = boneTransform.position;
        rot = boneTransform.rotation;
        scl = boneTransform.scale;

        boneFrame = frameState[i];
        lastBoneFrame = lastFrameState[i];

        LAST_POSITION.x = lastBoneFrame[0];
        LAST_POSITION.y = lastBoneFrame[1];
        LAST_POSITION.z = lastBoneFrame[2];

        LAST_ROTATION.x = lastBoneFrame[3];
        LAST_ROTATION.y = lastBoneFrame[4];
        LAST_ROTATION.z = lastBoneFrame[5];
        LAST_ROTATION.w = lastBoneFrame[6];

        LAST_SCALE.x = lastBoneFrame[7];
        LAST_SCALE.y = lastBoneFrame[8];
        LAST_SCALE.z = lastBoneFrame[9];

        POSITION.x = boneFrame[0];
        POSITION.y = boneFrame[1];
        POSITION.z = boneFrame[2];

        ROTATION.x = boneFrame[3];
        ROTATION.y = boneFrame[4];
        ROTATION.z = boneFrame[5];
        ROTATION.w = boneFrame[6];

        SCALE.x = boneFrame[7];
        SCALE.y = boneFrame[8];
        SCALE.z = boneFrame[9];

        pos.vlerp(LAST_POSITION, POSITION, alpha);
        rot.qlerp(LAST_ROTATION, ROTATION, alpha);
        scl.vlerp(LAST_SCALE, SCALE, alpha);
    }

    this._frame = frame;
    this._lastFrame = lastFrame;
};


MeshAnimation.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.current = this.current;
    json.mode = this.mode;

    json.rate = this.rate;

    json._time = this._time;
    json._frame = this._frame;
    json._order = this._order;

    json.playing = this.playing;

    return json;
};


MeshAnimation.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.current = json.current;
    this.mode = json.mode;

    this.rate = json.rate;

    this._time = json._time;
    this._frame = json._frame;
    this._order = json._order;

    this.playing = json.playing;

    return this;
};


module.exports = MeshAnimation;

},{"../../base/time":18,"../../math/mat4":106,"../../math/mathf":107,"../../math/quat":108,"../../math/vec3":112,"../assets/assets":22,"../enums":73,"./component":54}],60:[function(require,module,exports){
var Assets = require("../assets/assets");
var GameObject = require("../game_object");
var Component = require("./component");
var Bone = require("./bone");
"use strict";


/**
 * @class MeshFilter
 * @extends Component
 * @brief base class for handling meshes
 * @param Object options
 */
function MeshFilter(opts) {
    opts || (opts = {});

    Component.call(this, "MeshFilter", opts);

    /**
     * @property Mesh mesh
     * @memberof MeshFilter
     */
    this.mesh = opts.mesh != undefined ? opts.mesh : undefined;

    /**
     * @property Material material
     * @memberof MeshFilter
     */
    this.material = opts.material != undefined ? opts.material : undefined;


    this._bones = [];
    this._webglMeshInitted = false;
}

Component.extend(MeshFilter);


MeshFilter.prototype.copy = function (other) {

    this.mesh = other.mesh;
    this.material = other.material;

    this._bones.length = 0;
    this._webglMeshInitted = false;

    return this;
};


MeshFilter.prototype.init = function () {
    var transform = this.transform,
        bones = this._bones,
        meshBones = this.mesh.bones,
        subGameObject, meshBone, bone, parent,
        i = meshBones.length;

    if (!i) return;

    while (i--) {
        meshBone = meshBones[i];

        subGameObject = new GameObject().addComponents(
            new Bone({
                name: meshBone.name,
                parentIndex: meshBone.parentIndex,

                skinned: meshBone.skinned,
                bindPose: meshBone.bindPose
            }),
            new Transform({
                position: meshBone.position.clone(),
                rotation: meshBone.rotation.clone(),
                scale: meshBone.scale.clone()
            })
        );
        subGameObject.name = meshBone.name;
        bones[i] = subGameObject.bone;
    }

    transform.addChild(bones[0].transform);

    i = meshBones.length;
    while (i--) {
        bone = bones[i];
        parent = bones[bone.parentIndex];
        if (!parent) continue;

        parent.transform.addChild(bone.transform);
    }
};


MeshFilter.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.mesh = undefined;
    this.material = undefined;

    this._bones.length = 0;
    this._webglMeshInitted = false;

    return this;
};


MeshFilter.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.mesh = this.mesh ? this.mesh.name : undefined;
    json.material = this.material ? this.material.name : undefined;

    return json;
};


MeshFilter.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.mesh = json.mesh ? Assets.get(json.mesh) : undefined;
    this.material = json.material ? Assets.get(json.material) : undefined;

    this._bones.length = 0;
    this._webglMeshInitted = false;

    return this;
};


module.exports = MeshFilter;

},{"../assets/assets":22,"../game_object":77,"./bone":51,"./component":54}],61:[function(require,module,exports){
var Device = require("../../base/device");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Input = require("../input/input");
var Component = require("./component");
"use strict";


var pow = Math.pow,
    sqrt = Math.sqrt,
    sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    atan2 = Math.atan2,
    min = Math.min,
    max = Math.max,
    PI = Math.PI,
    MIN_POLOR = 0,
    MAX_POLOR = PI,

    degsToRads = Mathf.degsToRads,
    EPSILON = Mathf.EPSILON,

    NONE = 1,
    ROTATE = 2,
    PAN = 3;


function OrbitControl(opts) {
    opts || (opts = {});

    Component.call(this, "OrbitControl", opts);

    this.speed = opts.speed > EPSILON ? opts.speed : 1;
    this.zoomSpeed = opts.zoomSpeed > EPSILON ? opts.zoomSpeed : 2;

    this.allowZoom = opts.allowZoom != undefined ? !!opts.allowZoom : true;
    this.allowPan = opts.allowPan != undefined ? !!opts.allowPan : true;
    this.allowRotate = opts.allowRotate != undefined ? !!opts.allowRotate : true;

    this.target = opts.target || new Vec3;

    this._offset = new Vec3;
    this._pan = new Vec3;
    this._scale = 1;
    this._thetaDelta = 0;
    this._phiDelta = 0;
    this._state = NONE;
}

Component.extend(OrbitControl);


OrbitControl.prototype.copy = function () {

    return this;
};


OrbitControl.prototype.start = function () {

    if (Device.mobile) {
        Input.on("touchstart", this.onTouchStart, this);
        Input.on("touchend", this.onTouchEnd, this);
        Input.on("touchmove", this.onTouchMove, this);
    } else {
        Input.on("mouseup", this.onMouseUp, this);
        Input.on("mousedown", this.onMouseDown, this);
        Input.on("mousemove", this.onMouseMove, this);
        Input.on("mousewheel", this.onMouseWheel, this);
    }

    this.updateOrbit();

    return this;
};


OrbitControl.prototype.clear = function () {
    Component.prototype.clear.call(this);

    if (Device.mobile) {
        Input.on("touchstart", this.onTouchStart, this);
        Input.on("touchend", this.onTouchEnd, this);
        Input.on("touchmove", this.onTouchMove, this);
    } else {
        Input.off("mouseup", this.onMouseUp, this);
        Input.off("mousedown", this.onMouseDown, this);
        Input.off("mousemove", this.onMouseMove, this);
        Input.off("mousewheel", this.onMouseWheel, this);
    }

    return this;
};


OrbitControl.prototype.onTouchStart = function () {
    var length = Input.touches.length;

    if (length === 1) {
        this._state = ROTATE;
    } else if (length === 2 && this.allowPan) {
        this._state = PAN;
    } else {
        this._state = NONE;
    }
};


var LEFT_MOUSE = "mouse0",
    MIDDLE_MOUSE = "mouse1";
OrbitControl.prototype.onMouseDown = function (button) {

    if (button === LEFT_MOUSE && this.allowRotate) {
        this._state = ROTATE;
    } else if (button === MIDDLE_MOUSE && this.allowPan) {
        this._state = PAN;
    } else {
        this._state = NONE;
    }
};


OrbitControl.prototype.onTouchEnd = OrbitControl.prototype.onMouseUp = function () {

    this._state = NONE;
};


OrbitControl.prototype.onTouchMove = function () {
    var update = false,
        touch = Input.touches[0],
        delta = touch.delta,
        camera;

    if (this._state === ROTATE) {
        update = true;
        camera = this.camera;

        this._thetaDelta += 2 * PI * delta.x * camera.invWidth * this.speed;
        this._phiDelta -= 2 * PI * delta.y * camera.invHeight * this.speed;
    } else if (this._state === PAN) {
        update = true;

        this.pan(delta);
    }

    update && this.updateOrbit();
};


OrbitControl.prototype.onMouseMove = function () {
    var update = false,
        mouseDelta = Input.mouseDelta,
        camera;

    if (this._state === ROTATE) {
        update = true;
        camera = this.camera;

        this._thetaDelta += 2 * PI * mouseDelta.x * camera.invWidth * this.speed;
        this._phiDelta -= 2 * PI * mouseDelta.y * camera.invHeight * this.speed;
    } else if (this._state === PAN) {
        update = true;

        this.pan(mouseDelta);
    }

    update && this.updateOrbit();
};


OrbitControl.prototype.onMouseWheel = function (mouseWheel) {
    if (!this.allowZoom) return;
    var update = false;

    if (mouseWheel > 0) {
        update = true;
        this._scale *= pow(0.95, this.zoomSpeed);
    } else {
        update = true;
        this._scale /= pow(0.95, this.zoomSpeed);
    }

    update && this.updateOrbit();
};


OrbitControl.prototype.clear = function () {
    Component.prototype.clear.call(this);

    return this;
};


var panOffset = new Vec3;
OrbitControl.prototype.pan = function (delta) {
    var pan = this._pan,
        camera = this.camera,
        transform = this.transform,
        te = transform.matrixWorld.elements,
        position = transform.position,
        targetDistance;

    panOffset.vsub(position, this.target);
    targetDistance = panOffset.length();

    if (!camera.orthographic) {
        targetDistance *= tan(degsToRads(camera.fov * 0.5));

        panOffset.set(te[0], te[1], te[2]).smul(-2 * delta.x * targetDistance * camera.invWidth);
        pan.add(panOffset);

        panOffset.set(te[4], te[5], te[6]).smul(2 * delta.y * targetDistance * camera.invHeight);
        pan.add(panOffset);
    } else {
        targetDistance *= camera.orthographicSize * 0.5;

        panOffset.set(te[0], te[1], te[2]).smul(-2 * delta.x * targetDistance * camera.invWidth);
        pan.add(panOffset);

        panOffset.set(te[4], te[5], te[6]).smul(2 * delta.y * targetDistance * camera.invHeight);
        pan.add(panOffset);
    }
};


OrbitControl.prototype.updateOrbit = function () {
    var transform = this.transform,
        position = transform.position,
        target = this.target,
        offset = this._offset,
        pan = this._pan,
        theta, phi, radius;

    offset.vsub(position, target);
    theta = atan2(offset.x, offset.y);
    phi = atan2(sqrt(offset.x * offset.x + offset.y * offset.y), offset.z);

    theta += this._thetaDelta;
    phi += this._phiDelta;

    phi = max(MIN_POLOR, min(MAX_POLOR, phi));
    phi = max(EPSILON, min(PI - EPSILON, phi));

    radius = offset.length() * this._scale;

    target.add(pan);

    offset.x = radius * sin(phi) * sin(theta);
    offset.y = radius * sin(phi) * cos(theta);
    offset.z = radius * cos(phi);

    position.vadd(target, offset);
    transform.lookAt(target);

    this._scale = 1;
    this._thetaDelta = 0;
    this._phiDelta = 0;
    pan.set(0, 0, 0);
};


OrbitControl.prototype.setTarget = function (target) {

    this.target.copy(target);
    this.transform.lookAt(this.target);
};


module.exports = OrbitControl;

},{"../../base/device":10,"../../math/mathf":107,"../../math/vec2":111,"../../math/vec3":112,"../input/input":88,"./component":54}],62:[function(require,module,exports){
var ObjectPool = require("../../../base/object_pool");
var Class = require("../../../base/class");
var Mathf = require("../../../math/mathf");
var Vec3 = require("../../../math/vec3");
var Color = require("../../../math/color");
var Enums = require("../../enums");
var Assets = require("../../assets/assets");
var Tween = require("./tween");
var Particle = require("./particle");
"use strict";


var EmitterType = Enums.EmitterType,

    PI = Math.PI,
    TWO_PI = PI * 2,

    random = Math.random,
    randInt = Mathf.randInt,
    randFloat = Mathf.randFloat,
    clampTop = Mathf.clampTop,
    sqrt = Math.sqrt,

    PARTICLE_POOL = Emitter.PARTICLE_POOL = new ObjectPool(Particle);


function Emitter(opts) {
    opts || (opts = {});

    Class.call(this);

    this.sort = opts.sort != undefined ? opts.sort : true;

    this.positionType = opts.positionType != undefined ? opts.positionType : EmitterType.Box;
    this.velocityType = opts.velocityType != undefined ? opts.velocityType : EmitterType.Box;

    this.material = opts.material != undefined ? opts.material : undefined;

    this.positionSpread = opts.positionSpread != undefined ? opts.positionSpread : new Vec3(0.5, 0.5, 0.5);
    this.positionRadius = opts.positionRadius != undefined ? opts.positionRadius : 0.5;

    this.speed = opts.speed != undefined ? opts.speed : 0;
    this.speedSpread = opts.speedSpread != undefined ? opts.speedSpread : 0;

    this.particleSystem = undefined;

    this.worldSpace = opts.worldSpace != undefined ? opts.worldSpace : true;

    this.position = opts.position != undefined ? opts.position : new Vec3;

    this.minEmission = opts.minEmission != undefined ? opts.minEmission : 1;
    this.maxEmission = opts.maxEmission != undefined ? opts.maxEmission : 2;

    this.minLife = opts.minLife != undefined ? opts.minLife : 1;
    this.maxLife = opts.maxLife != undefined ? opts.maxLife : 2;

    this.minSize = opts.minSize != undefined ? opts.minSize : 0.1;
    this.maxSize = opts.maxSize != undefined ? opts.maxSize : 0.5;

    this.sizeTween = new Tween(opts.sizeTween);
    this.alphaTween = new Tween(opts.alphaTween);
    this.colorTween = new Tween(opts.colorTween);

    this.velocity = opts.velocity != undefined ? opts.velocity : new Vec3;
    this.velocitySpread = opts.velocitySpread != undefined ? opts.velocitySpread : new Vec3;

    this.acceleration = opts.acceleration != undefined ? opts.acceleration : new Vec3;
    this.accelerationSpread = opts.accelerationSpread != undefined ? opts.accelerationSpread : new Vec3;

    this.angularVelocity = opts.angularVelocity != undefined ? opts.angularVelocity : 0;
    this.angularVelocitySpread = opts.angularVelocitySpread != undefined ? opts.angularVelocitySpread : 0;

    this.angularAcceleration = opts.angularAcceleration != undefined ? opts.angularAcceleration : 0;
    this.angularAccelerationSpread = opts.angularAccelerationSpread != undefined ? opts.angularAccelerationSpread : 0;

    this.randomAngle = opts.randomAngle != undefined ? opts.randomAngle : true;

    this.emissionRate = opts.emissionRate != undefined ? opts.emissionRate : 1 / 60;

    this.color = opts.color != undefined ? opts.color : new Color;
    this.colorSpread = opts.colorSpread != undefined ? opts.colorSpread : new Color;

    this.time = opts.time != undefined ? opts.time : 0;
    this._time = 0;

    this.duration = opts.duration != undefined ? opts.duration : 0;

    this.loop = opts.loop != undefined ? opts.loop : true;

    this.playing = opts.playing != undefined ? opts.playing : true;
    this.emitting = opts.emitting != undefined ? opts.emitting : true;

    this.particles = [];

    this._webglInitted = undefined;

    this._webglVertexBuffer = undefined;
    this._webglParticleBuffer = undefined;
    this._webglParticleColorBuffer = undefined;

    this._webglVertexArray = undefined;
    this._webglParticleArray = undefined;
    this._webglParticleColorArray = undefined;
}

Class.extend(Emitter);


Emitter.prototype.copy = function (other) {

    this.sort = other.sort;

    this.positionType = other.positionType;
    this.velocityType = other.velocityType;

    this.material = other.material;

    this.position.copy(other.position);
    this.positionSpread.copy(other.positionSpread);
    this.positionRadius = other.positionRadius;

    this.speed = other.speed;
    this.speedSpread = other.speedSpread;

    this.worldSpace = other.worldSpace;

    this.minEmission = other.minEmission;
    this.maxEmission = other.maxEmission;

    this.minLife = other.minLife;
    this.maxLife = other.maxLife;

    this.minSize = other.minSize;
    this.maxSize = other.maxSize;

    this.sizeTween.copy(other.sizeTween);
    this.alphaTween.copy(other.alphaTween);
    this.colorTween.copy(other.colorTween);

    this.velocity.copy(other.velocity);
    this.velocitySpread.copy(other.velocitySpread);

    this.acceleration.copy(other.acceleration);
    this.accelerationSpread.copy(other.accelerationSpread);

    this.angularVelocity = other.angularVelocity;
    this.angularVelocitySpread = other.angularVelocitySpread;

    this.angularAcceleration = other.angularAcceleration;
    this.angularAccelerationSpread = other.angularAccelerationSpread;

    this.randomAngle = other.randomAngle;

    this.emissionRate = other.emissionRate;

    this.color.copy(other.color);
    this.colorSpread.copy(other.colorSpread);

    this.time = other.time;
    this._time = other._time;

    this.duration = other.duration;
    this.loop = other.loop;
    this.playing = other.playing;
    this.emitting = other.emitting;

    return this;
};


Emitter.prototype.play = function () {

    this.time = 0;
    this.playing = true;
    this.emitting = true;

    return this;
};


Emitter.prototype.clear = function () {
    var particles = this.particles,
        i = particles.length;

    this.time = 0;
    this._time = 0;
    this.playing = false;
    this.emitting = false;

    while (i--) PARTICLE_POOL.removeObject(particles[i]);
    particles.length = 0;

    return this;
};


var VEC = new Vec3;
Emitter.prototype.spawn = function (count) {
    var transform = this.particleSystem.transform || this.particleSystem.transform2d,
        transformPosition = transform.toWorld(VEC.set(0, 0, 0)),
        transformMatrix = transform.matrixWorld,

        position = this.position,
        positionSpread = this.positionSpread,
        positionRadius = this.positionRadius,

        speed = this.speed,
        speedSpread = this.speedSpread,

        particles = this.particles,
        numParticle2Ds = particles.length,

        worldSpace = this.worldSpace,
        randomAngle = this.randomAngle,

        color = this.color,
        colorSpread = this.colorSpread,
        useRandColor = colorSpread.lengthSq() > 0,

        velocity = this.velocity,
        velocitySpread = this.velocitySpread,

        acceleration = this.acceleration,
        accelerationSpread = this.accelerationSpread,

        angularVelocity = this.angularVelocity,
        angularVelocitySpread = this.angularVelocitySpread,

        angularAcceleration = this.angularAcceleration,
        angularAccelerationSpread = this.angularAccelerationSpread,

        minLife = this.minLife,
        maxLife = this.maxLife,

        minSize = this.minSize,
        maxSize = this.maxSize,

        positionType = this.positionType,
        velocityType = this.velocityType,

        limit = clampTop(numParticle2Ds + count, Emitter.MAX_PARTICLES) - numParticle2Ds,
        posx, posy, posz, vel, acc, pos, col, x, y, z, len, r, dx, dy, dz, spd, particle;

    if (positionType !== EmitterType.Box) {
        posx = randFloat(-positionSpread.x, positionSpread.x);
        posy = randFloat(-positionSpread.y, positionSpread.y);
        posz = randFloat(-positionSpread.z, positionSpread.z);
    }

    while (limit--) {
        particle = PARTICLE_POOL.create();
        pos = particle.position;
        vel = particle.velocity;
        acc = particle.acceleration;
        col = particle.color;

        col.r = color.r;
        col.g = color.g;
        col.b = color.b;

        if (useRandColor) {
            col.r += colorSpread.r * random();
            col.g += colorSpread.g * random();
            col.b += colorSpread.b * random();
            col.cnormalize();
        }

        if (worldSpace) {
            pos.x = position.x + transformPosition.x;
            pos.y = position.y + transformPosition.y;
            pos.z = position.z + transformPosition.z;
        } else {
            pos.x = position.x;
            pos.y = position.y;
            pos.z = position.z;
        }

        if (positionType === EmitterType.Box) {
            pos.x += randFloat(-positionSpread.x, positionSpread.x);
            pos.y += randFloat(-positionSpread.y, positionSpread.y);
            pos.z += randFloat(-positionSpread.z, positionSpread.z);
        } else { //EmitterType.Sphere
            x = randFloat(-1, 1);
            y = randFloat(-1, 1);
            z = randFloat(-1, 1);

            len = x * x + y * y + z * z;
            len = len !== 0 ? 1 / sqrt(len) : len;

            pos.x += posx + x * len * positionRadius;
            pos.y += posy + y * len * positionRadius;
            pos.z += posz + z * len * positionRadius;
        }

        if (velocityType === EmitterType.Box) {
            vel.x = velocity.x + randFloat(-velocitySpread.x, velocitySpread.x);
            vel.y = velocity.y + randFloat(-velocitySpread.y, velocitySpread.y);
            vel.z = velocity.z + randFloat(-velocitySpread.z, velocitySpread.z);
        } else { //EmitterType.Sphere
            if (worldSpace) {
                dx = pos.x - (position.x + transformPosition.x);
                dy = pos.y - (position.y + transformPosition.y);
                dz = pos.z - (position.z + transformPosition.z);
            } else {
                dx = pos.x - position.x;
                dy = pos.y - position.y;
                dz = pos.z - position.z;
            }
            spd = speed + randFloat(-speedSpread, speedSpread);

            r = dx * dx + dy * dy + dz * dz;
            r = r !== 0 ? 1 / sqrt(r) : r;

            vel.x = dx * r * spd;
            vel.y = dy * r * spd;
            vel.z = dz * r * spd;
        }
        vel.transformMat4Rotation(transformMatrix);

        acc.x = acceleration.x + randFloat(-accelerationSpread.x, accelerationSpread.x);
        acc.y = acceleration.y + randFloat(-accelerationSpread.y, accelerationSpread.y);
        acc.z = acceleration.z + randFloat(-accelerationSpread.z, accelerationSpread.z);

        particle.angularVelocity = angularVelocity + randFloat(-angularVelocitySpread, angularVelocitySpread);
        particle.angularAcceleration = angularAcceleration + randFloat(-angularAccelerationSpread, angularAccelerationSpread);

        particle.alpha = 1;
        particle.angle = randomAngle ? random() * TWO_PI : 0;
        particle.lifeTime = 0;
        particle.life = randFloat(minLife, maxLife);
        particle.size = randFloat(minSize, maxSize);

        particles.push(particle);
    }
};


Emitter.prototype.update = function (dt) {
    if (!this.playing) return;
    var particles = this.particles,
        sizeTween = this.sizeTween,
        alphaTween = this.alphaTween,
        colorTween = this.colorTween,
        sizeTweenUpdate = sizeTween.times.length > 0,
        alphaTweenUpdate = alphaTween.times.length > 0,
        colorTweenUpdate = colorTween.times.length > 0,
        particle, life, count,
        i;

    this.time += dt;
    this._time += dt;
    count = this._time / this.emissionRate;

    if (this.emitting && count >= 1) {
        this._time = 0;
        this.spawn(randInt(this.minEmission, this.maxEmission) * (count | 0));

        if (!this.loop && this.time > this.duration) this.emitting = false;
    }

    i = particles.length;
    while (i--) {
        particle = particles[i];
        particle.update(dt);
        life = particle.lifeTime / particle.life;

        if (sizeTweenUpdate) particle.size = sizeTween.update(life);
        if (alphaTweenUpdate) particle.alpha = alphaTween.update(life);
        if (colorTweenUpdate) colorTween.update(life, particle.color);

        if (life > 1) {
            PARTICLE_POOL.removeObject(particle);
            particles.splice(i, 1);
        }
    }

    if (!this.emitting && particles.length === 0) this.playing = false;
};


Emitter.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.type = 1;

    json.sort = this.sort;

    json.positionType = this.positionType;
    json.velocityType = this.velocityType;

    json.material = this.material ? this.material.name : undefined;

    json.position = this.position.toJSON(json.position);
    json.positionSpread = this.positionSpread.toJSON(json.positionSpread);
    json.positionRadius = this.positionRadius;

    json.speed = this.speed;
    json.speedSpread = this.speedSpread;

    json.worldSpace = this.worldSpace;

    json.minEmission = this.minEmission;
    json.maxEmission = this.maxEmission;

    json.minLife = this.minLife;
    json.maxLife = this.maxLife;

    json.minSize = this.minSize;
    json.maxSize = this.maxSize;

    json.sizeTween = this.sizeTween.toJSON(json.sizeTween);
    json.alphaTween = this.alphaTween.toJSON(json.alphaTween);
    json.colorTween = this.colorTween.toJSON(json.colorTween);

    json.velocity = this.velocity.toJSON(json.velocity);
    json.velocitySpread = this.velocitySpread.toJSON(json.velocitySpread);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.accelerationSpread = this.accelerationSpread.toJSON(json.accelerationSpread);

    json.angularVelocity = this.angularVelocity;
    json.angularAcceleration = this.angularAcceleration;

    json.angularVelocitySpread = this.angularVelocitySpread;
    json.randomAngle = this.randomAngle;

    json.emissionRate = this.emissionRate;

    json.color = this.color.toJSON(json.color);
    json.colorSpread = this.colorSpread.toJSON(json.colorSpread);

    json.time = this.time;
    json._time = this._time;

    json.duration = this.duration;
    json.loop = this.loop;
    json.playing = this.playing;
    json.emitting = this.emitting;

    return json;
};


Emitter.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.sort = json.sort;

    this.positionType = json.positionType;
    this.velocityType = json.velocityType;

    this.material = json.material ? Assets.hash[json.material] : undefined;

    this.position.fromJSON(json.position);
    this.positionSpread.fromJSON(json.positionSpread);
    this.positionRadius = json.positionRadius;

    this.speed = json.speed;
    this.speedSpread = json.speedSpread;

    this.worldSpace = json.worldSpace;

    this.minEmission = json.minEmission;
    this.maxEmission = json.maxEmission;

    this.minLife = json.minLife;
    this.maxLife = json.maxLife;

    this.minSize = json.minSize;
    this.maxSize = json.maxSize;

    this.sizeTween.fromJSON(json.sizeTween);
    this.alphaTween.fromJSON(json.alphaTween);
    this.colorTween.fromJSON(json.colorTween);

    this.velocity.fromJSON(json.velocity);
    this.velocitySpread.fromJSON(json.velocitySpread);

    this.acceleration.fromJSON(json.acceleration);
    this.accelerationSpread.fromJSON(json.accelerationSpread);

    this.angularVelocity = json.angularVelocity;
    this.angularAcceleration = json.angularAcceleration;

    this.angularVelocitySpread = json.angularVelocitySpread;
    this.randomAngle = json.randomAngle;

    this.emissionRate = json.emissionRate;

    this.color.fromJSON(json.color);
    this.colorSpread.fromJSON(json.colorSpread);

    this.time = json.time;
    this._time = json._time;

    this.duration = json.duration;
    this.loop = json.loop;
    this.playing = json.playing;
    this.emitting = json.emitting;

    return this;
};


Emitter.MAX_PARTICLES = 1024;


module.exports = Emitter;

},{"../../../base/class":8,"../../../base/object_pool":15,"../../../math/color":102,"../../../math/mathf":107,"../../../math/vec3":112,"../../assets/assets":22,"../../enums":73,"./particle":64,"./tween":67}],63:[function(require,module,exports){
var ObjectPool = require("../../../base/object_pool");
var Class = require("../../../base/class");
var Mathf = require("../../../math/mathf");
var Vec2 = require("../../../math/vec2");
var Color = require("../../../math/color");
var Enums = require("../../enums");
var Assets = require("../../assets/assets");
var Tween = require("./tween");
var Particle2D = require("./particle_2d");
"use strict";


var EmitterType = Enums.EmitterType,

    PI = Math.PI,
    TWO_PI = PI * 2,

    random = Math.random,
    randInt = Mathf.randInt,
    randFloat = Mathf.randFloat,
    clampTop = Mathf.clampTop,
    cos = Math.cos,
    sin = Math.sin,
    sqrt = Math.sqrt,

    PARTICLE_POOL = Emitter2D.PARTICLE_POOL = new ObjectPool(Particle2D);


function Emitter2D(opts) {
    opts || (opts = {});

    Class.call(this);

    this.positionType = opts.positionType != undefined ? opts.positionType : EmitterType.Box;
    this.velocityType = opts.velocityType != undefined ? opts.velocityType : EmitterType.Box;

    this.material = opts.material != undefined ? opts.material : undefined;

    this.positionSpread = opts.positionSpread != undefined ? opts.positionSpread : new Vec2(0.5, 0.5);
    this.positionRadius = opts.positionRadius != undefined ? opts.positionRadius : 0.5;

    this.speed = opts.speed != undefined ? opts.speed : 0;
    this.speedSpread = opts.speedSpread != undefined ? opts.speedSpread : 0;

    this.particleSystem = undefined;

    this.worldSpace = opts.worldSpace != undefined ? opts.worldSpace : true;

    this.position = opts.position != undefined ? opts.position : new Vec2;

    this.minEmission = opts.minEmission != undefined ? opts.minEmission : 1;
    this.maxEmission = opts.maxEmission != undefined ? opts.maxEmission : 2;

    this.minLife = opts.minLife != undefined ? opts.minLife : 1;
    this.maxLife = opts.maxLife != undefined ? opts.maxLife : 2;

    this.minSize = opts.minSize != undefined ? opts.minSize : 0.1;
    this.maxSize = opts.maxSize != undefined ? opts.maxSize : 0.5;

    this.sizeTween = new Tween(opts.sizeTween);
    this.alphaTween = new Tween(opts.alphaTween);
    this.colorTween = new Tween(opts.colorTween);

    this.velocity = opts.velocity != undefined ? opts.velocity : new Vec2;
    this.velocitySpread = opts.velocitySpread != undefined ? opts.velocitySpread : new Vec2;

    this.acceleration = opts.acceleration != undefined ? opts.acceleration : new Vec2;
    this.accelerationSpread = opts.accelerationSpread != undefined ? opts.accelerationSpread : new Vec2;

    this.angularVelocity = opts.angularVelocity != undefined ? opts.angularVelocity : 0;
    this.angularVelocitySpread = opts.angularVelocitySpread != undefined ? opts.angularVelocitySpread : 0;

    this.angularAcceleration = opts.angularAcceleration != undefined ? opts.angularAcceleration : 0;
    this.angularAccelerationSpread = opts.angularAccelerationSpread != undefined ? opts.angularAccelerationSpread : 0;

    this.randomAngle = opts.randomAngle != undefined ? opts.randomAngle : true;

    this.emissionRate = opts.emissionRate != undefined ? opts.emissionRate : 1 / 60;

    this.color = opts.color != undefined ? opts.color : new Color;
    this.colorSpread = opts.colorSpread != undefined ? opts.colorSpread : new Color;

    this.time = opts.time != undefined ? opts.time : 0;
    this._time = 0;

    this.duration = opts.duration != undefined ? opts.duration : 0;

    this.loop = opts.loop != undefined ? opts.loop : true;

    this.playing = opts.playing != undefined ? opts.playing : true;
    this.emitting = opts.emitting != undefined ? opts.emitting : true;

    this.particles = [];

    this._webglInitted = undefined;

    this._webglVertexBuffer = undefined;
    this._webglParticleBuffer = undefined;
    this._webglParticleColorBuffer = undefined;

    this._webglVertexArray = undefined;
    this._webglParticleArray = undefined;
    this._webglParticleColorArray = undefined;
}

Class.extend(Emitter2D);


Emitter2D.prototype.copy = function (other) {

    this.positionType = other.positionType;
    this.velocityType = other.velocityType;

    this.material = other.material;

    this.position.copy(other.position);
    this.positionSpread.copy(other.positionSpread);
    this.positionRadius = other.positionRadius;

    this.speed = other.speed;
    this.speedSpread = other.speedSpread;

    this.worldSpace = other.worldSpace;

    this.minEmission = other.minEmission;
    this.maxEmission = other.maxEmission;

    this.minLife = other.minLife;
    this.maxLife = other.maxLife;

    this.minSize = other.minSize;
    this.maxSize = other.maxSize;

    this.sizeTween.copy(other.sizeTween);
    this.alphaTween.copy(other.alphaTween);
    this.colorTween.copy(other.colorTween);

    this.velocity.copy(other.velocity);
    this.velocitySpread.copy(other.velocitySpread);

    this.acceleration.copy(other.acceleration);
    this.accelerationSpread.copy(other.accelerationSpread);

    this.angularVelocity = other.angularVelocity;
    this.angularVelocitySpread = other.angularVelocitySpread;

    this.angularAcceleration = other.angularAcceleration;
    this.angularAccelerationSpread = other.angularAccelerationSpread;

    this.randomAngle = other.randomAngle;

    this.emissionRate = other.emissionRate;

    this.color.copy(other.color);
    this.colorSpread.copy(other.colorSpread);

    this.time = other.time;
    this._time = other._time;

    this.duration = other.duration;
    this.loop = other.loop;
    this.playing = other.playing;
    this.emitting = other.emitting;

    return this;
};


Emitter2D.prototype.play = function () {

    this.time = 0;
    this.playing = true;
    this.emitting = true;

    return this;
};


Emitter2D.prototype.clear = function () {
    var particles = this.particles,
        i = particles.length;

    this.time = 0;
    this._time = 0;
    this.playing = false;
    this.emitting = false;

    while (i--) PARTICLE_POOL.removeObject(particles[i]);
    particles.length = 0;

    return this;
};


var VEC = new Vec2;
Emitter2D.prototype.spawn = function (count) {
    var transform = this.particleSystem.transform || this.particleSystem.transform2d,
        transformPosition = transform.toWorld(VEC.set(0, 0)),

        position = this.position,
        positionSpread = this.positionSpread,
        positionRadius = this.positionRadius,

        speed = this.speed,
        speedSpread = this.speedSpread,

        particles = this.particles,
        numParticle2Ds = particles.length,

        worldSpace = this.worldSpace,
        randomAngle = this.randomAngle,

        color = this.color,
        colorSpread = this.colorSpread,
        useRandColor = colorSpread.lengthSq() > 0,

        velocity = this.velocity,
        velocitySpread = this.velocitySpread,

        acceleration = this.acceleration,
        accelerationSpread = this.accelerationSpread,

        angularVelocity = this.angularVelocity,
        angularVelocitySpread = this.angularVelocitySpread,

        angularAcceleration = this.angularAcceleration,
        angularAccelerationSpread = this.angularAccelerationSpread,

        minLife = this.minLife,
        maxLife = this.maxLife,

        minSize = this.minSize,
        maxSize = this.maxSize,

        positionType = this.positionType,
        velocityType = this.velocityType,

        limit = clampTop(numParticle2Ds + count, Emitter2D.MAX_PARTICLES) - numParticle2Ds,
        posx, posy, vel, acc, pos, col, angle, u, r, dx, dy, spd, particle;

    if (positionType === EmitterType.Circle || positionType === EmitterType.CircleEdge) {
        posx = randFloat(-positionSpread.x, positionSpread.x);
        posy = randFloat(-positionSpread.y, positionSpread.y);
    }

    while (limit--) {
        particle = PARTICLE_POOL.create();
        pos = particle.position;
        vel = particle.velocity;
        acc = particle.acceleration;
        col = particle.color;

        col.r = color.r;
        col.g = color.g;
        col.b = color.b;

        if (useRandColor) {
            col.r += colorSpread.r * random();
            col.g += colorSpread.g * random();
            col.b += colorSpread.b * random();
            col.cnormalize();
        }

        if (worldSpace) {
            pos.x = position.x + transformPosition.x;
            pos.y = position.y + transformPosition.y;
        } else {
            pos.x = position.x;
            pos.y = position.y;
        }

        if (positionType === EmitterType.Box) {
            pos.x += randFloat(-positionSpread.x, positionSpread.x);
            pos.y += randFloat(-positionSpread.y, positionSpread.y);
        } else { //EmitterType.Circle
            angle = TWO_PI * random();
            u = random() + random();
            r = u > 1 ? 2 - u : u;

            pos.x += posx + r * cos(angle) * positionRadius;
            pos.y += posy + r * sin(angle) * positionRadius;
        }

        if (velocityType === EmitterType.Box) {
            vel.x = velocity.x + randFloat(-velocitySpread.x, velocitySpread.x);
            vel.y = velocity.y + randFloat(-velocitySpread.y, velocitySpread.y);
        } else { //EmitterType.Circle
            if (worldSpace) {
                dx = pos.x - (position.x + transformPosition.x);
                dy = pos.y - (position.y + transformPosition.y);
            } else {
                dx = pos.x - position.x;
                dy = pos.y - position.y;
            }
            spd = speed + randFloat(-speedSpread, speedSpread);

            r = dx * dx + dy * dy;
            r = r !== 0 ? 1 / sqrt(r) : r;

            vel.x = dx * r * spd;
            vel.y = dy * r * spd;
        }

        acc.x = acceleration.x + randFloat(-accelerationSpread.x, accelerationSpread.x);
        acc.y = acceleration.y + randFloat(-accelerationSpread.y, accelerationSpread.y);

        particle.angularVelocity = angularVelocity + randFloat(-angularVelocitySpread, angularVelocitySpread);
        particle.angularAcceleration = angularAcceleration + randFloat(-angularAccelerationSpread, angularAccelerationSpread);

        particle.alpha = 1;
        particle.angle = randomAngle ? random() * TWO_PI : 0;
        particle.lifeTime = 0;
        particle.life = randFloat(minLife, maxLife);
        particle.size = randFloat(minSize, maxSize);

        particles.push(particle);
    }
};


Emitter2D.prototype.update = function (dt) {
    if (!this.playing) return;
    var particles = this.particles,
        sizeTween = this.sizeTween,
        alphaTween = this.alphaTween,
        colorTween = this.colorTween,
        sizeTweenUpdate = sizeTween.times.length > 0,
        alphaTweenUpdate = alphaTween.times.length > 0,
        colorTweenUpdate = colorTween.times.length > 0,
        particle, life, count,
        i;

    this.time += dt;
    this._time += dt;
    count = this._time / this.emissionRate;

    if (this.emitting && count >= 1) {
        this._time = 0;
        this.spawn(randInt(this.minEmission, this.maxEmission) * (count | 0));

        if (!this.loop && this.time > this.duration) this.emitting = false;
    }

    i = particles.length;
    while (i--) {
        particle = particles[i];
        particle.update(dt);
        life = particle.lifeTime / particle.life;

        if (sizeTweenUpdate) particle.size = sizeTween.update(life);
        if (alphaTweenUpdate) particle.alpha = alphaTween.update(life);
        if (colorTweenUpdate) colorTween.update(life, particle.color);

        if (life > 1) {
            PARTICLE_POOL.removeObject(particle);
            particles.splice(i, 1);
            continue;
        }
    }

    if (!this.emitting && particles.length === 0) this.playing = false;
};


Emitter2D.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.type = 1;

    json.positionType = this.positionType;
    json.velocityType = this.velocityType;

    json.material = this.material ? this.material.name : undefined;

    json.position = this.position.toJSON(json.position);
    json.positionSpread = this.positionSpread.toJSON(json.positionSpread);
    json.positionRadius = this.positionRadius;

    json.speed = this.speed;
    json.speedSpread = this.speedSpread;

    json.worldSpace = this.worldSpace;

    json.minEmission = this.minEmission;
    json.maxEmission = this.maxEmission;

    json.minLife = this.minLife;
    json.maxLife = this.maxLife;

    json.minSize = this.minSize;
    json.maxSize = this.maxSize;

    json.sizeTween = this.sizeTween.toJSON(json.sizeTween);
    json.alphaTween = this.alphaTween.toJSON(json.alphaTween);
    json.colorTween = this.colorTween.toJSON(json.colorTween);

    json.velocity = this.velocity.toJSON(json.velocity);
    json.velocitySpread = this.velocitySpread.toJSON(json.velocitySpread);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.accelerationSpread = this.accelerationSpread.toJSON(json.accelerationSpread);

    json.angularVelocity = this.angularVelocity;
    json.angularAcceleration = this.angularAcceleration;

    json.angularVelocitySpread = this.angularVelocitySpread;
    json.randomAngle = this.randomAngle;

    json.emissionRate = this.emissionRate;

    json.color = this.color.toJSON(json.color);
    json.colorSpread = this.colorSpread.toJSON(json.colorSpread);

    json.time = this.time;
    json._time = this._time;

    json.duration = this.duration;
    json.loop = this.loop;
    json.playing = this.playing;
    json.emitting = this.emitting;

    return json;
};


Emitter2D.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.positionType = json.positionType;
    this.velocityType = json.velocityType;

    this.material = json.material ? Assets.get(json.material) : undefined;

    this.position.fromJSON(json.position);
    this.positionSpread.fromJSON(json.positionSpread);
    this.positionRadius = json.positionRadius;

    this.speed = json.speed;
    this.speedSpread = json.speedSpread;

    this.worldSpace = json.worldSpace;

    this.minEmission = json.minEmission;
    this.maxEmission = json.maxEmission;

    this.minLife = json.minLife;
    this.maxLife = json.maxLife;

    this.minSize = json.minSize;
    this.maxSize = json.maxSize;

    this.sizeTween.fromJSON(json.sizeTween);
    this.alphaTween.fromJSON(json.alphaTween);
    this.colorTween.fromJSON(json.colorTween);

    this.velocity.fromJSON(json.velocity);
    this.velocitySpread.fromJSON(json.velocitySpread);

    this.acceleration.fromJSON(json.acceleration);
    this.accelerationSpread.fromJSON(json.accelerationSpread);

    this.angularVelocity = json.angularVelocity;
    this.angularAcceleration = json.angularAcceleration;

    this.angularVelocitySpread = json.angularVelocitySpread;
    this.randomAngle = json.randomAngle;

    this.emissionRate = json.emissionRate;

    this.color.fromJSON(json.color);
    this.colorSpread.fromJSON(json.colorSpread);

    this.time = json.time;
    this._time = json._time;

    this.duration = json.duration;
    this.loop = json.loop;
    this.playing = json.playing;
    this.emitting = json.emitting;

    return this;
};


Emitter2D.MAX_PARTICLES = 1024;


module.exports = Emitter2D;

},{"../../../base/class":8,"../../../base/object_pool":15,"../../../math/color":102,"../../../math/mathf":107,"../../../math/vec2":111,"../../assets/assets":22,"../../enums":73,"./particle_2d":65,"./tween":67}],64:[function(require,module,exports){
var Vec3 = require("../../../math/vec3");
var Color = require("../../../math/color");
"use strict";


function Particle() {

    this.z = 1;
    this.alpha = 1;

    this.lifeTime = 0;
    this.life = 1;

    this.size = 1;

    this.color = new Color;

    this.position = new Vec3;
    this.velocity = new Vec3;
    this.acceleration = new Vec3;

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
}


Particle.prototype.update = function (dt) {
    var pos = this.position,
        vel = this.velocity,
        acc = this.acceleration;

    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.z += vel.z * dt;

    vel.x += acc.x * dt;
    vel.y += acc.y * dt;
    vel.z += acc.z * dt;

    this.angle += this.angularVelocity * dt;
    this.angularVelocity += this.angularAcceleration * dt;

    this.lifeTime += dt;
};


module.exports = Particle;

},{"../../../math/color":102,"../../../math/vec3":112}],65:[function(require,module,exports){
var Vec2 = require("../../../math/vec2");
var Color = require("../../../math/color");
"use strict";


function Particle2D() {

    this.alpha = 1;

    this.lifeTime = 0;
    this.life = 1;

    this.size = 1;

    this.color = new Color;

    this.position = new Vec2;
    this.velocity = new Vec2;
    this.acceleration = new Vec2;

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
}


Particle2D.prototype.update = function (dt) {
    var pos = this.position,
        vel = this.velocity,
        acc = this.acceleration;

    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    vel.x += acc.x * dt;
    vel.y += acc.y * dt;

    this.angle += this.angularVelocity * dt;
    this.angularVelocity += this.angularAcceleration * dt;

    this.lifeTime += dt;
};


module.exports = Particle2D;

},{"../../../math/color":102,"../../../math/vec2":111}],66:[function(require,module,exports){
var Class = require("../../../base/class");
var Time = require("../../../base/time");
var Log = require("../../../base/log");
var Component = require("../component");
var Emitter = require("./emitter");
var Emitter2D = require("./emitter_2d");
var Tween = require("./tween");
"use strict";


/**
 * @class ParticleSystem
 * @extends Component
 * @brief 2d particle emitter
 * @param Object options
 */
function ParticleSystem(opts) {
    opts || (opts = {});

    Component.call(this, "ParticleSystem", opts);

    /**
     * @property Boolean playing
     * @memberof ParticleSystem
     */
    this.playing = opts.playing != undefined ? opts.playing : true;

    /**
     * @property Array emitters
     * @memberof ParticleSystem
     */
    this.emitters = [];
    this._emitterHash = {};
    this._emitterJSONHash = {};

    if (opts.emitter) this.addEmitter(opts.emitter);
    if (opts.emitters) this.add.apply(this, opts.emitters);
}

ParticleSystem.type = "ParticleSystem";
Component.extend(ParticleSystem);


ParticleSystem.Emitter = Emitter;
ParticleSystem.Emitter2D = Emitter2D;
ParticleSystem.Tween = Tween;


ParticleSystem.prototype.copy = function (other) {
    var emitters = this.emitters,
        otherEmitters = other.emitters,
        i = otherEmitters.length,
        j = emitters.length,
        emitter, otherEmitter;

    while (i-- > j) this.removeEmitter(emitters[i]);

    i = otherEmitters.length;
    while (i--) {
        otherEmitter = otherEmitters[i];

        if ((emitter = emitters[i])) {
            if ((emitter._className === otherEmitter._className)) {
                otherEmitters[i].copy(other);
            } else {
                this.removeEmitter(emitter);
                this.addEmitter(otherEmitter.clone());
            }
        } else {
            this.addEmitter(otherEmitter.clone());
        }
    }
    this.playing = other.playing;

    return this;
};


ParticleSystem.prototype.clear = function () {
    Component.prototype.clear.call(this);
    var emitters = this.emitters,
        i = emitters.length;
    ;

    while (i--) emitters[i].clear();
    return this;
};


ParticleSystem.prototype.addEmitter = function (emitter) {
    var emitters = this.emitters,
        index = emitters.indexOf(emitter);

    if (index === -1) {
        if (emitter.particleSystem) emitter = emitter.clone();

        emitter.particleSystem = this;
        emitters.push(emitter);
        this._emitterHash[emitter._id] = emitter;
        if (emitter._jsonId !== -1) this._emitterHash[emitter._jsonId] = emitter;
    } else {
        Log.error("ParticleSystem.addEmitter: ParticleSystem already has passed Emitter");
    }

    return this;
};


ParticleSystem.prototype.add = function () {
    var i = arguments.length;

    while (i--) this.addEmitter(arguments[i]);
    return this;
};


ParticleSystem.prototype.removeEmitter = function (emitter) {
    var emitters = this.emitters,
        index = emitters.indexOf(emitter);

    if (index !== -1) {
        emitters.splice(index, 1);
        this._emitterHash[emitter._id] = undefined;
        if (emitter._jsonId !== -1) this._emitterHash[emitter._jsonId] = undefined;

        emitter.clear();
        emitter.particleSystem = undefined;
        emitter.transform = undefined;
    } else {
        Log.error("ParticleSystem.removeEmitter: ParticleSystem does not have passed Emitter");
    }

    return this;
};


ParticleSystem.prototype.remove = function () {
    var i = arguments.length;

    while (i--) this.removeEmitter(arguments[i]);
    return this;
};


ParticleSystem.prototype.findEmitterById = function (id) {

    return this._emitterHash[id];
};


ParticleSystem.prototype.findEmitterByJSONId = function (id) {

    return this._emitterJSONHash[id];
};


/**
 * @method play
 * @memberof ParticleSystem
 */
ParticleSystem.prototype.play = function () {
    var emitters = this.emitters,
        i = emitters.length;

    while (i--) emitters[i].play();
    this.playing = true;

    return this;
};


ParticleSystem.prototype.update = function () {
    if (!this.playing) return;

    var dt = Time.delta,
        emitters = this.emitters,
        emitter, playing = false,
        i = emitters.length;

    while (i--) {
        emitter = emitters[i];
        emitter.update(dt);
        if (emitter.playing) playing = true;
    }

    this.playing = playing;
};


ParticleSystem.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);
    var emitters = this.emitters,
        jsonEmitters = json.emitters || (json.emitters = []),
        i = emitters.length;

    while (i--) {
        jsonEmitters[i] = emitters[i].toJSON(jsonEmitters[i]);
    }
    json.playing = this.playing;

    return json;
};


ParticleSystem.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);
    var jsonEmitters = json.emitters,
        emitter, jsonEmitter,
        i = jsonEmitters.length;

    while (i--) {
        jsonEmitter = jsonEmitters[i];

        if ((emitter = this.findEmitterByJSONId(jsonEmitter._id))) {
            emitter.fromJSON(jsonEmitter);
        } else {
            this.addEmitter(Class.fromJSON(jsonEmitter));
        }
    }
    this.playing = json.playing;

    return this;
};


module.exports = ParticleSystem;

},{"../../../base/class":8,"../../../base/log":14,"../../../base/time":18,"../component":54,"./emitter":62,"./emitter_2d":63,"./tween":67}],67:[function(require,module,exports){
var Class = require("../../../base/class");
var Mathf = require("../../../math/mathf");
"use strict";


function Tween(opts) {
    opts || (opts = {});

    this.times = opts.times || [];
    this.values = opts.values || [];
}


Tween.prototype.copy = function (other) {

    this.times = other.times.slice();
    this.values = other.values.slice();

    return this;
};


Tween.prototype.clear = function () {

    this.times.length = 0;
    this.values.length = 0;

    return this;
};


Tween.prototype.update = function (time, out) {
    var times = this.times,
        values = this.values,
        n = times.length,
        i = 0,
        t;

    while (i < n && time > times[i]) i++;

    if (i === 0) return values[0];
    if (i === n) return values[n - 1];

    t = (time - times[i - 1]) / (times[i] - times[i - 1]);

    if (out) return out.copy(values[i - 1]).lerp(values[i], t);
    return values[i - 1] + t * (values[i] - values[i - 1]);
};


Tween.prototype.toJSON = function (json) {
    json || (json = {});
    var times = this.times,
        values = this.values,
        jsonTimes = json.times || (json.times = []),
        jsonValues = json.values || (json.values = []),
        i;

    i = times.length;
    while (i--) jsonTimes[i] = times[i];

    i = values.length;
    while (i--) jsonValues[i] = values[i].toJSON ? values[i].toJSON(jsonValues[i]) : values[i];

    return json;
};


Tween.prototype.fromJSON = function (json) {
    var times = this.times,
        values = this.values,
        jsonTimes = json.times,
        jsonValues = json.values,
        i;

    i = jsonTimes.length;
    while (i--) times[i] = fromJSON(jsonTimes[i]);

    i = jsonValues.length;
    while (i--) values[i] = fromJSON(jsonValues[i]);

    return this;
};


function fromJSON(json) {
    var classes = Class._classes,
        mathClasses = Mathf._classes;

    if (typeof(json) !== "object") {
        return json;
    } else if (mathClasses[json._className]) {
        return Mathf.fromJSON(json);
    } else if (classes[json._className]) {
        return Class.fromJSON(json);
    } else {
        return json;
    }

    return null;
}


module.exports = Tween;

},{"../../../base/class":8,"../../../math/mathf":107}],68:[function(require,module,exports){
var Class = require("../../base/class");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Component = require("./component");
var Phys2D = require("../../phys2d/phys2d");
"use strict";


function RigidBody2D(opts) {
    opts || (opts = {});

    Component.call(this, "RigidBody2D", opts);

    this.body = new Phys2D.P2Rigidbody(opts);
}

Class.extend(RigidBody2D, Component);


RigidBody2D.prototype.copy = function (other) {

    this.body.off("collide", onCollide, this);
    this.body.off("colliding", onColliding, this);
    this.body = other.body.clone();
    this.body.on("collide", onCollide, this);
    this.body.on("colliding", onColliding, this);

    return this;
};


RigidBody2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.body.off("collide", onCollide, this);
    this.body.off("colliding", onColliding, this);
    this.body.userData = undefined;
};


RigidBody2D.prototype.start = function () {
    var body = this.body,
        gameObject = this.gameObject,
        transform = gameObject.transform,
        transform2d = gameObject.transform2d;

    if (transform) {
        body.position.copy(transform.position);
        body.rotation = transform.rotation.rotationZ();
    } else {
        body.position.copy(transform2d.position);
        body.rotation = transform2d.rotation;
    }

    body.init();
    body.userData = this;
    body.on("collide", onCollide, this);
    body.on("colliding", onColliding, this);
};


var zAxis = new Vec3(0.0, 0.0, 1.0);
RigidBody2D.prototype.update = function () {
    var body = this.body,
        gameObject = this.gameObject,
        transform = gameObject.transform,
        transform2d = gameObject.transform2d;

    if (transform) {
        transform.position.copy(body.position);
        transform.rotation.fromAxisAngle(zAxis, body.rotation);
    } else {
        transform2d.position.copy(body.position);
        transform2d.rotation = body.rotation;
    }
};


RigidBody2D.prototype.applyForce = function (force, worldPoint) {

    this.body.applyForce(force, worldPoint);
};


RigidBody2D.prototype.applyTorque = function (torque) {

    this.body.applyTorque(torque);
};


RigidBody2D.prototype.applyImpulse = function (impulse, worldPoint) {

    this.body.applyImpulse(impulse, worldPoint);
};


RigidBody2D.prototype.applyVelocity = function (velocity) {

    this.body.applyVelocity(velocity);
};


RigidBody2D.prototype.applyAngularVelocity = function (angularVelocity) {

    this.body.applyAngularVelocity(angularVelocity);
};


RigidBody2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.body = this.body.toJSON(json.body);

    return json;
};


RigidBody2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.body.fromJSON(json.body);

    return this;
};


function onCollide(body, si, sj) {
    if (!body.userData) return;

    this.emit("collide", body.userData, body, si, sj);
};


function onColliding(body, si, sj) {
    if (!body.userData) return;

    this.emit("colliding", body.userData, body, si, sj);
};


module.exports = RigidBody2D;

},{"../../base/class":8,"../../math/vec2":111,"../../math/vec3":112,"../../phys2d/phys2d":131,"./component":54}],69:[function(require,module,exports){
var Enums = require("../enums");
var Component = require("./component");
var Assets = require("../assets/assets");
"use strict";


function Sprite(opts) {
    opts || (opts = {});

    Component.call(this, "Sprite", opts);

    this.visible = opts.visible != undefined ? !!opts.visible : true;
    this.blending = opts.blending != undefined ? opts.blending : Enums.Blending.Default;

    this.layer = opts.layer != undefined ? opts.layer : 0;
    this.z = opts.z != undefined ? opts.z : 0;

    this.alpha = opts.alpha != undefined ? opts.alpha : 1;

    this.material = opts.material != undefined ? opts.material : undefined;

    this.width = opts.width || 1;
    this.height = opts.height || 1;

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.w = opts.w || 1;
    this.h = opts.h || 1;

    this._webglInitted = false;
}

Component.extend(Sprite);


Sprite.prototype.copy = function (other) {

    this.visible = other.visible;
    this.blending = other.blending;

    this.layer = other.layer;
    this.z = other.z;

    this.alpha = other.alpha;

    this.material = other.material;

    this.width = other.width;
    this.height = other.height;

    this.x = other.x;
    this.y = other.y;
    this.w = other.w;
    this.h = other.h;

    this._webglInitted = false;

    return this;
};


Sprite.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.material = undefined;
    this._webglInitted = false;

    return this;
};


Sprite.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.visible = this.visible;
    json.blending = this.blending;

    json.layer = this.layer;
    json.z = this.z;

    json.alpha = this.alpha;

    json.material = this.material ? this.material.name : undefined;

    json.width = this.width;
    json.height = this.height;

    json.x = this.x;
    json.y = this.y;
    json.w = this.w;
    json.h = this.h;

    return json;
};


Sprite.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.visible = json.visible;
    this.blending = json.blending;

    this.layer = json.layer;
    this.z = json.z;

    this.alpha = json.alpha;

    this.material = json.material ? Assets.get(json.material) : undefined;

    this.width = json.width;
    this.height = json.height;

    this.x = json.x;
    this.y = json.y;
    this.w = json.w;
    this.h = json.h;

    this._webglInitted = false;

    return this;
};


module.exports = Sprite;

},{"../assets/assets":22,"../enums":73,"./component":54}],70:[function(require,module,exports){
var Time = require("../../base/time");
var Assets = require("../assets/assets");
var Component = require("./component");
var Enums = require("../enums");
"use strict";


var abs = Math.abs,
    WrapMode = Enums.WrapMode;


/**
 * @class SpriteAnimation
 * @extends Component
 * @brief base class for handling sprite animation sheets
 * @param Object options
 */
function SpriteAnimation(opts) {
    opts || (opts = {});

    Component.call(this, "SpriteAnimation", opts);

    this.sheet = opts.sheet != undefined ? opts.sheet : undefined;

    this.current = opts.current != undefined ? opts.current : "idle";
    this.mode = opts.mode != undefined ? opts.mode : WrapMode.Loop;

    this.rate = opts.rate != undefined ? opts.rate : 1 / 24;

    this._time = 0;
    this._frame = 0;
    this._order = 1;

    this.playing = this.sheet ? true : false;
}

Component.extend(SpriteAnimation);


SpriteAnimation.prototype.copy = function (other) {

    this.sheet = other.sheet;

    this.current = other.current;
    this.mode = other.mode;

    this.rate = other.rate;

    this._time = other._time;
    this._frame = other._frame;
    this._order = other._order;

    this.playing = other.playing;

    return this;
};


SpriteAnimation.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.sheet = undefined;

    return this;
};


SpriteAnimation.prototype.play = function (name, mode, rate) {
    if (!this.sheet) return this;
    if ((this.playing && this.current === name) || !this.sheet[name]) return this;

    this.current = name;
    this.rate = rate != undefined ? rate : (rate = this.rate);
    this.mode = mode || (mode = this.mode);
    this._frame = 0;
    this._order = 1;
    this._time = 0;

    this.playing = true;
    this.emit("play", name, mode, rate);

    return this;
};


SpriteAnimation.prototype.stop = function () {

    if (this.playing) this.emit("stop");
    this.playing = false;
    this._frame = 0;
    this._order = 1;
    this._time = 0;

    return this;
};


SpriteAnimation.prototype.update = function () {
    if (!this.playing) return;
    var sprite = this.sprite,
        sheet = this.sheet,
        current = sheet[this.current],
        rate, dt, count, length, order, frame, mode, animation;

    if (!sprite || !sheet || !current) return;

    rate = this.rate;
    dt = Time.delta;
    order = this._order;
    frame = this._frame;
    mode = this.mode;

    if (!rate || rate === Infinity || rate < 0) {
        frame = abs(frame) % current.length;
    } else {
        this._time += dt;
        count = this._time / rate;

        if (count >= 1) {
            this._time = 0;
            length = current.length;
            frame += (order * (count | 0));

            if (mode === WrapMode.Loop) {
                frame = frame % length;
            } else if (mode === WrapMode.Once) {
                if (order > 0) {
                    if (frame >= length) {
                        frame = length - 1;
                        this.stop();
                    }
                } else {
                    if (frame < 0) {
                        frame = 0;
                        this.stop();
                    }
                }
            } else if (mode === WrapMode.PingPong) {
                if (order > 0) {
                    if (frame >= length) {
                        this._order = -1;
                        frame = length - 1;
                    }
                } else {
                    if (frame < 0) {
                        this._order = 1;
                        frame = 0;
                    }
                }
            } else if (mode === WrapMode.Clamp) {
                if (order > 0) {
                    if (frame >= length) frame = length - 1;
                } else {
                    if (frame < 0) frame = 0;
                }
            }
        }
    }

    animation = current[frame];
    sprite.x = animation[0];
    sprite.y = animation[1];
    sprite.w = animation[2];
    sprite.h = animation[3];

    this._frame = frame;
};


SpriteAnimation.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.sheet = this.sheet ? this.sheet.name : undefined;

    json.current = this.current;
    json.mode = this.mode;

    json.rate = this.rate;

    json._time = this._time;
    json._frame = this._frame;
    json._order = this._order;

    json.playing = this.playing;

    return json;
};


SpriteAnimation.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.sheet = json.sheet ? Assets.get(json.sheet) : undefined;

    this.current = json.current;
    this.mode = json.mode;

    this.rate = json.rate;

    this._time = json._time;
    this._frame = json._frame;
    this._order = json._order;

    this.playing = json.playing;

    return this;
};


module.exports = SpriteAnimation;

},{"../../base/time":18,"../assets/assets":22,"../enums":73,"./component":54}],71:[function(require,module,exports){
var Mathf = require("../../math/mathf");
var Vec3 = require("../../math/vec3");
var Quat = require("../../math/quat");
var Mat3 = require("../../math/mat3");
var Mat4 = require("../../math/mat4");
var Component = require("./component");
var Log = require("../../base/log");
"use strict";


var EPSILON = Mathf.EPSILON;


function Transform(opts) {
    opts || (opts = {});
    opts.sync = opts.sync != undefined ? opts.sync : true;

    Component.call(this, "Transform", opts);

    this.root = this;
    this.depth = 0;

    this.parent = undefined;
    this.children = [];

    this.position = opts.position != undefined ? opts.position : new Vec3;
    this.rotation = opts.rotation != undefined ? opts.rotation : new Quat;
    this.scale = opts.scale != undefined ? opts.scale : new Vec3(1, 1, 1);

    this.matrix = new Mat4;
    this.matrixWorld = new Mat4;

    this.modelView = new Mat4;
    this.normalMatrix = new Mat3;
}

Component.extend(Transform);


Transform.prototype.copy = function (other) {
    var children = other.children,
        i = children.length;

    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this.rotation.copy(other.rotation);

    while (i--) this.addChild(children[i].gameObject.clone().transform);
    if (other.parent) other.parent.addChild(this);

    return this;
};

Transform.prototype.clear = function () {
    Component.prototype.clear.call(this);
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);

    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.rotation.set(0, 0, 0, 1);

    this.root = this;
    this.depth = 0;

    return this;
};


Transform.prototype.translate = function () {
    var vec = new Vec3;

    return function (translation, relativeTo) {
        vec.copy(translation);

        if (relativeTo instanceof Transform) {
            vec.transformQuat(relativeTo.rotation);
        } else if (relativeTo instanceof Quat) {
            vec.transformQuat(relativeTo);
        }

        this.position.add(vec);

        return this;
    };
}();


Transform.prototype.rotate = function () {
    var vec = new Vec3;

    return function (rotation, relativeTo) {
        vec.copy(rotation);

        if (relativeTo instanceof Transform) {
            vec.transformQuat(relativeTo.rotation);
        } else if (relativeTo instanceof Quat) {
            vec.transformQuat(relativeTo);
        }

        this.rotation.rotate(vec.x, vec.y, vec.z);

        return this;
    };
}();


Transform.prototype.lookAt = function () {
    var mat = new Mat4,
        vec = new Vec3,
        dup = new Vec3(0.0, 0.0, 1.0);

    return function (target, up) {
        up = up || dup;

        if (target instanceof Transform) {
            vec.set(0.0, 0.0, 0.0).transformMat4(target.matrixWorld);
        } else {
            vec.copy(target);
        }

        mat.lookAt(this.position, vec, up);
        this.rotation.fromMat4(mat);

        return this;
    };
}();


Transform.prototype.follow = function () {
    var target = new Vec3,
        position = new Vec3,
        delta = new Vec3;

    return function (transform, speed) {
        position.set(0.0, 0.0, 0.0).transformMat4(this.matrixWorld);
        target.set(0.0, 0.0, 0.0).transformMat4(transform.matrixWorld);

        delta.vsub(target, position);

        if (delta.lengthSq() > EPSILON) this.position.add(delta.smul(speed));

        return this;
    };
}();


Transform.prototype.addChild = function (child, others) {
    if (!(child instanceof Transform)) {
        Log.error("Transform.add: can\'t add passed argument, it is not an instance of Transform");
        return this;
    }
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene;

    if (index === -1) {
        if (child.parent) child.parent.removeChild(child);

        child.parent = this;
        children.push(child);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = root;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.gameObject && (scene = this.gameObject.scene)) {
                scene.componentManagers.Transform.sort();
            }
        }
    } else {
        Log.error("Transform.add: child is not a member of this Transform");
    }

    return this;
};


Transform.prototype.addChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i], true);
    if (this.gameObject && (scene = this.gameObject.scene)) {
        scene.componentManagers.Transform.sort();
    }
    return this;
};


Transform.prototype.removeChild = function (child, others) {
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene;

    if (index !== -1) {
        child.parent = undefined;
        children.splice(index, 1);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = child;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.gameObject && (scene = this.gameObject.scene)) {
                scene.componentManagers.Transform.sort();
            }
        }
    } else {
        Log.error("Transform.remove: child is not a member of this Transform");
    }

    return this;
};


Transform.prototype.removeChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i], true);
    if (this.gameObject && (scene = this.gameObject.scene)) {
        scene.componentManagers.Transform.sort();
    }
    return this;
};


Transform.prototype.detachChildren = function () {
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);
    return this;
};


Transform.prototype.hasChild = function (child) {

    return !!~this.children.indexOf(child);
};


Transform.prototype.find = function (name) {
    var children = this.children,
        child,
        i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child.gameObject;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


Transform.prototype.toWorld = function (v) {

    return v.transformMat4(this.matrixWorld);
};


Transform.prototype.toLocal = function () {
    var mat = new Mat4;

    return function (v) {

        return v.transformMat4(mat.inverseMat(this.matrixWorld));
    };
}();


Transform.prototype.update = function () {
    var matrix = this.matrix,
        parent = this.parent;

    matrix.compose(this.position, this.scale, this.rotation);

    if (parent) {
        this.matrixWorld.mmul(parent.matrixWorld, matrix);
    } else {
        this.matrixWorld.copy(matrix);
    }
};


Transform.prototype.updateMatrices = function (viewMatrix) {

    this.modelView.mmul(viewMatrix, this.matrixWorld);
    this.normalMatrix.inverseMat4(this.modelView).transpose();
};


Transform.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);
    var children = this.children,
        jsonChildren = json.children || (json.children = []),
        i = children.length;

    while (i--) jsonChildren[i] = children[i]._id;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);
    json.rotation = this.rotation.toJSON(json.rotation);

    return json;
};


Transform.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);
    var children = json.children,
        i = children.length,
        child, scene;

    if (this.gameObject && (scene = this.gameObject.scene)) {
        while (i--) {
            child = scene.findComponentByJSONId(children[i]);

            if (!this.hasChild(child)) {
                this.addChild(child);
            }
        }
    } else {
        this.once("start", function () {
            var scene = this.gameObject.scene;

            while (i--) {
                child = scene.findComponentByJSONId(children[i]);

                if (!this.hasChild(child)) {
                    this.addChild(child);
                }
            }
        });
    }

    this.position.fromJSON(json.position);
    this.scale.fromJSON(json.scale);
    this.rotation.fromJSON(json.rotation);

    return this;
};


function updateDepth(transform, depth) {
    var children = transform.children,
        i = children.length;

    transform.depth = depth;

    while (i--) updateDepth(children[i], depth + 1);
}


module.exports = Transform;

},{"../../base/log":14,"../../math/mat3":104,"../../math/mat4":106,"../../math/mathf":107,"../../math/quat":108,"../../math/vec3":112,"./component":54}],72:[function(require,module,exports){
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat3 = require("../../math/mat3");
var Mat4 = require("../../math/mat4");
var Component = require("./component");
var Config = require("../../base/config");
var Log = require("../../base/log");
"use strict";


var EPSILON = Mathf.EPSILON;


function Transform2D(opts) {
    opts || (opts = {});
    opts.sync = opts.sync != undefined ? opts.sync : true;

    Component.call(this, "Transform2D", opts);

    this.root = this;
    this.depth = 0;

    this.parent = undefined;
    this.children = [];

    this.position = opts.position != undefined ? opts.position : new Vec2;
    this.rotation = opts.rotation != undefined ? opts.rotation : 0;
    this.scale = opts.scale != undefined ? opts.scale : new Vec2(1, 1);

    this.matrix = new Mat4;
    this.matrixWorld = new Mat4;

    this.modelView = new Mat4;
    this.normalMatrix = new Mat3;
}

Component.extend(Transform2D);


Transform2D.prototype.copy = function (other) {
    var children = other.children,
        i = children.length;

    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this.rotation = other.rotation;

    while (i--) this.addChild(children[i].gameObject.clone().transform);
    if (other.parent) other.parent.addChild(this);

    return this;
};


Transform2D.prototype.clear = function () {
    Component.prototype.clear.call(this);
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);

    this.position.set(0, 0);
    this.scale.set(1, 1);
    this.rotation = 0;

    this.root = this;
    this.depth = 0;

    return this;
};


Transform2D.prototype.translate = function () {
    var vec = new Vec2;

    return function (translation, relativeTo) {
        vec.copy(translation);

        if (relativeTo instanceof Transform2D) {
            vec.transformAngle(relativeTo.rotation);
        } else if (relativeTo) {
            vec.transformAngle(relativeTo);
        }

        this.position.add(vec);

        return this;
    };
}();


Transform2D.prototype.rotate = function (rotation, relativeTo) {

    if (relativeTo instanceof Transform2D) {
        rotation += relativeTo.rotation;
    } else if (relativeTo) {
        rotation += relativeTo;
    }

    this.rotation += rotation;

    return this;
};


Transform2D.prototype.lookAt = function () {
    var mat = new Mat32,
        vec = new Vec2;

    return function (target) {

        if (target instanceof Transform2D) {
            vec.copy(target.position);
        } else {
            vec.copy(target);
        }

        mat.lookAt(this.position, vec);
        this.rotation = mat.getRotation();

        return this;
    };
}();


Transform2D.prototype.follow = function () {
    var target = new Vec2,
        position = new Vec2,
        delta = new Vec2;

    return function (transform, speed) {
        position.set(0, 0).transformMat4(this.matrixWorld);
        target.set(0, 0).transformMat4(transform.matrixWorld);

        delta.vsub(target, position);

        if (delta.lengthSq() > EPSILON) this.position.add(delta.smul(speed));

        return this;
    };
}();


Transform2D.prototype.addChild = function (child, others) {
    if (!(child instanceof Transform2D)) {
        Log.error("Transform2D.add: can\'t add passed argument, it is not an instance of Transform2D");
        return this;
    }
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene;

    if (index === -1) {
        if (child.parent) child.parent.remove(child);

        child.parent = this;
        children.push(child);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = root;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.gameObject && (scene = this.gameObject.scene)) {
                scene.componentManagers.Transform2D.sort();
            }
        }
    } else {
        Log.error("Transform2D.add: child is not a member of this Transform2D");
    }

    return this;
};


Transform2D.prototype.addChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i], true);
    if (this.gameObject && (scene = this.gameObject.scene)) {
        scene.componentManagers.Transform2D.sort();
    }
    return this;
};


Transform2D.prototype.removeChild = function (child, others) {
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene;

    if (index !== -1) {
        child.parent = undefined;
        children.splice(index, 1);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = child;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.gameObject && (scene = this.gameObject.scene)) {
                scene.componentManagers.Transform2D.sort();
            }
        }
    } else {
        Log.error("Transform2D.remove: child is not a member of this Transform2D");
    }

    return this;
};


Transform2D.prototype.removeChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i], true);
    if (this.gameObject && (scene = this.gameObject.scene)) {
        scene.componentManagers.Transform2D.sort();
    }
    return this;
};


Transform2D.prototype.detachChildren = function () {
    var i = arguments.length;

    while (i--) this.removeChild(children[i]);
    return this;
};


Transform2D.prototype.hasChild = function (child) {

    return !!~this.children.indexOf(child);
};


Transform2D.prototype.find = function (name) {
    var children = this.children,
        child,
        i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


Transform2D.prototype.toWorld = function (v) {

    return v.transformMat4(this.matrixWorld);
};


Transform2D.prototype.toLocal = function () {
    var mat = new Mat4;

    return function (v) {

        return v.transformMat4(mat.inverseMat(this.matrixWorld));
    };
}();


Transform2D.prototype.update = function () {
    var mat = new Mat32;

    return function () {
        var matrix = this.matrix,
            parent = this.parent;

        matrix.fromMat32(mat.compose(this.position, this.scale, this.rotation));

        if (parent) {
            this.matrixWorld.mmul(parent.matrixWorld, matrix);
        } else {
            this.matrixWorld.copy(matrix);
        }
    };
}();


Transform2D.prototype.updateMatrices = function (viewMatrix) {

    this.modelView.mmul(viewMatrix, this.matrixWorld);
    this.normalMatrix.inverseMat4(this.modelView).transpose();
};


Transform2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);
    var children = this.children,
        jsonChildren = json.children || (json.children = []),
        i = children.length;

    while (i--) jsonChildren[i] = children[i]._id;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);
    json.rotation = this.rotation

    return json;
};


Transform2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);
    var children = json.children,
        i = children.length,
        child, scene;

    if (this.gameObject && (scene = this.gameObject.scene)) {
        while (i--) {
            child = scene.findComponentByJSONId(children[i]);

            if (!this.hasChild(child)) {
                this.addChild(child);
            }
        }
    } else {
        this.once("start", function () {
            var scene = this.gameObject.scene;

            while (i--) {
                child = scene.findComponentByJSONId(children[i]);

                if (!this.hasChild(child)) {
                    this.addChild(child);
                }
            }
        });
    }

    this.position.fromJSON(json.position);
    this.scale.fromJSON(json.scale);
    this.rotation = json.rotation;

    return this;
};


function updateDepth(transform, depth) {
    var children = transform.children,
        i = children.length;

    transform.depth = depth;
    while (i--) updateDepth(children[i], depth + 1);
}


module.exports = Transform2D;

},{"../../base/config":9,"../../base/log":14,"../../math/mat3":104,"../../math/mat32":105,"../../math/mat4":106,"../../math/mathf":107,"../../math/vec2":111,"./component":54}],73:[function(require,module,exports){
var Enum = require("../base/enum");
"use strict";


module.exports = {
    AxisType: new Enum("Button Mouse MouseWheel Touch Joystick"),

    Blending: new Enum("Default None Additive Subtractive Muliply Custom"),
    Side: new Enum("Front Back Both"),

    CullFace: new Enum("None Back Front FrontBack"),

    EmitterType: new Enum("Circle Box Sphere"),

    LightType: new Enum("Point Directional Spot Hemi"),

    TextClipping: new Enum("Overflow Clip"),
    TextAnchor: new Enum("Left Center Right"),

    ShadowMapType: new Enum("BasicShadowMap PCFShadowMap PCFSoftShadowMap"),

    FilterMode: new Enum("None Linear"),
    TextureFormat: new Enum("RGB RGBA Luminance Alpha LuminanceAlpha"),
    TextureWrap: new Enum("Repeat Clamp MirrorRepeat"),

    WrapMode: new Enum("Once Loop PingPong Clamp")
};

},{"../base/enum":12}],74:[function(require,module,exports){
var Class = require("../../base/class");
var Loop = require("./loop");
var Scene = require("../scene");
var GUI = require("../gui/gui");
var Log = require("./../../base/log");
"use strict";


function BaseGame() {

    Class.call(this);

    this._loop = new Loop(this.loop, this);

    this.guis = [];
    this._guiHash = {};
    this._guiJSONHash = {};
    this._guiNameHash = {};

    this.scenes = [];
    this._sceneHash = {};
    this._sceneJSONHash = {};
    this._sceneNameHash = {};
}

Class.extend(BaseGame);


BaseGame.prototype.init = function () {

    this._loop.resume();
    this.emit("init");

    return this;
};


BaseGame.prototype.clear = function () {
    var scenes = this.scenes,
        i = scenes.length;

    while (i--) this.removeScene(scenes[i], true);
    return this;
};


BaseGame.prototype.destroy = function () {

    this.emit("destroy");
    this.clear();

    return this;
};


BaseGame.prototype.addScene = function (scene) {
    if (!(scene instanceof Scene)) {
        Log.error("BaseGame.addScene: can't add argument to BaseGame, it's not an instance of Scene");
        return this;
    }
    var sceneHash = this._sceneHash,
        sceneNameHash = this._sceneNameHash,
        name = scene.name,
        id = scene._id,
        json;

    if (!sceneNameHash[name] && !sceneHash[id]) {
        json = scene.toJSON();

        sceneNameHash[name] = json;
        sceneHash[id] = json;
        this.scenes.push(json);
        if (scene._jsonId !== -1) this._sceneJSONHash[scene._jsonId] = json;

        this.emit("addScene", name);
    } else {
        Log.error("BaseGame.addScene: Scene is already a member of BaseGame");
    }

    return this;
};


BaseGame.prototype.addScenes = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.addScene(arguments[i]);
    return this;
};


BaseGame.prototype.removeScene = function (scene) {
    if (typeof(scene) === "string") {
        scene = this._sceneNameHash[scene];
    } else if (typeof(scene) === "number") {
        scene = this._sceneHash[scene];
    }
    var scenes = this.scenes,
        sceneHash = this._sceneHash,
        sceneNameHash = this._sceneNameHash,
        name = scene.name,
        id = scene._id,
        json;

    if (sceneNameHash[name] && sceneHash[id]) {
        json = sceneNameHash[name];

        sceneNameHash[name] = undefined;
        sceneHash[id] = undefined;
        scenes.splice(scenes.indexOf(json), 1);
        if (json._jsonId !== -1) this._sceneJSONHash[json._jsonId] = undefined;

        this.emit("removeScene", name);
    } else {
        Log.error("BaseGame.removeScene: Scene not a member of BaseGame");
    }

    return this;
};


BaseGame.prototype.removeScenes = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.removeScene(arguments[i]);
    return this;
};


BaseGame.prototype.addGUI = function (gui) {
    if (!(gui instanceof GUI)) {
        Log.error("BaseGame.addGUI: can't add argument to BaseGame, it's not an instance of GUI");
        return this;
    }
    var guiHash = this._guiHash,
        guiNameHash = this._guiNameHash,
        name = gui.name,
        id = gui._id,
        json;

    if (!guiNameHash[name] && !guiHash[id]) {
        json = gui.toJSON();

        guiNameHash[name] = json;
        guiHash[id] = json;
        this.guis.push(json);
        if (gui._jsonId !== -1) this._guiJSONHash[gui._jsonId] = json;

        this.emit("addGUI", name);
    } else {
        Log.error("BaseGame.addGUI: GUI is already a member of BaseGame");
    }

    return this;
};


BaseGame.prototype.addGUIs = function () {
    var i = arguments.length;

    while (i--) this.addGUI(arguments[i]);
    return this;
};


BaseGame.prototype.removeGUI = function (gui) {
    if (typeof(gui) === "string") {
        gui = this._guiNameHash[gui];
    } else if (typeof(gui) === "number") {
        gui = this._guiHash[gui];
    }
    var guis = this.guis,
        guiHash = this._guiHash,
        guiNameHash = this._guiNameHash,
        name = gui.name,
        id = gui._id,
        json;

    if (guiNameHash[name] && guiHash[id]) {
        json = guiNameHash[name];

        guiNameHash[name] = undefined;
        guiHash[id] = undefined;
        guis.splice(guis.indexOf(json), 1);
        if (json._jsonId !== -1) this._guiJSONHash[json._jsonId] = undefined;

        this.emit("removeGUI", name);
    } else {
        Log.error("BaseGame.removeGUI: GUI not a member of BaseGame");
    }

    return this;
};


BaseGame.prototype.removeGUIs = function () {
    var i = arguments.length;

    while (i--) this.removeGUI(arguments[i]);
    return this;
};


BaseGame.prototype.findSceneByName = function (name) {

    return this._sceneNameHash[name];
};


BaseGame.prototype.findSceneById = function (id) {

    return this._sceneHash[id];
};


BaseGame.prototype.findSceneByJSONId = function (id) {

    return this._sceneJSONHash[id];
};


BaseGame.prototype.pause = function () {

    this._loop.pause();
    return this;
};


BaseGame.prototype.resume = function () {

    this._loop.resume();
    return this;
};


BaseGame.prototype.loop = function () {

    this.emit("update", Time.sinceStart);
};


BaseGame.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var scenes = this.scenes,
        jsonScenes = json.scenes || (json.scenes = []),
        i = scenes.length;

    while (i--) jsonScenes[i] = scenes[i];

    return json;
};


BaseGame.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var jsonScenes = json.scenes,
        scene, jsonScene,
        i = jsonScenes.length;

    while (i--) {
        jsonScene = jsonScenes[i];

        if ((scene = this.findSceneByJSONId(jsonScene._id))) {
            this.removeScene(scene).addScene(jsonScene);
        } else {
            this.addScene(jsonScene);
        }
    }

    return this;
};


module.exports = BaseGame;

},{"../../base/class":8,"../gui/gui":81,"../scene":97,"./../../base/log":14,"./loop":76}],75:[function(require,module,exports){
var Class = require("../../base/class");
var Device = require("../../base/device");
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Config = require("./../../base/config");
var BaseGame = require("./base_game");
var Canvas = require("../renderer/canvas");
var Renderer = require("../renderer/renderer");
var GameObject = require("../game_object");
var Component = require("../components/component");
var Scene = require("../scene");
var Input = require("../input/input");
var Handler = require("../input/handler");
var Log = require("./../../base/log");
"use strict";


function Game(opts) {
    opts || (opts = {});
    Config.fromJSON(opts);

    BaseGame.call(this);

    this._handler = Handler;
    this.input = Input;

    this.gui = undefined;

    this.scene = undefined;
    this.camera = undefined;

    this.canvas = new Canvas(opts.canvas);
    this.renderer = new Renderer(opts.renderer);
}

BaseGame.extend(Game);


Game.prototype.init = function () {
    var canvas = this.canvas;

    canvas.init();
    this.renderer.init(canvas);
    Handler.setElement(canvas.element);

    this._loop.resume();
    this.emit("init");

    return this;
};


Game.prototype.start = function () {

    this.init();
    this.emit("start");

    return this;
};


Game.prototype.setGUI = function (gui) {
    if (typeof(gui) === "string") {
        gui = this._guiNameHash[gui];
    } else if (typeof(gui) === "number") {
        gui = this.guis[gui];
    }

    if (this._guiNameHash[gui.name] && this._guiHash[gui._id]) {
        if (this.gui) this.gui.destroy();

        gui = Class.fromJSON(gui);
        this.gui = gui;

        gui.game = this;

        gui.init();
        gui.emit("init");

        gui.start();
        gui.emit("start");

        this.emit("setGUI", this.gui);
    } else {
        Log.error("Game.setGUI: GUI is not a member of Game");
    }

    return this;
};


Game.prototype.setScene = function (scene) {
    if (typeof(scene) === "string") {
        scene = this._sceneNameHash[scene];
    } else if (typeof(scene) === "number") {
        scene = this.scenes[scene];
    }

    if (this._sceneNameHash[scene.name] && this._sceneHash[scene._id]) {
        if (this.scene) this.scene.destroy();

        scene = Class.fromJSON(scene);
        this.scene = scene;

        scene.game = this;

        scene.init();
        scene.emit("init");

        scene.start();
        scene.emit("start");

        this.emit("setScene", this.scene);
    } else {
        Log.error("Game.setScene: Scene is not a member of Game");
    }

    return this;
};


Game.prototype.setCamera = function (gameObject) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Game.setCamera: can't set argument to Game's Active Camera, it's not an instance of GameObject");
        return this;
    }
    var scene = this.scene,
        lastCamera = this.camera,
        index;

    if (!scene) {
        Log.error("Game.setCamera: can't set camera without an active scene, use Game.setScene first");
        return this;
    }

    index = scene.gameObjects.indexOf(gameObject);
    if (index === -1) {
        Log.warn("Game.setCamera: GameObject is not a member of the active Scene, adding it...");
        scene.addGameObject(gameObject);
    }

    this.camera = gameObject.camera || gameObject.camera2d;

    if (this.camera) {
        this.camera._active = true;
        if (lastCamera) lastCamera._active = false;

        this.emit("setCamera", this.camera);
    } else {
        Log.error("Game.setCamera: GameObject does't have a Camera or a Camera2D Component");
    }

    return this;
};


Game.prototype.loop = function () {
    var camera = this.camera,
        scene = this.scene,
        gui = this.gui,
        renderer = this.renderer;

    Time.update();
    Input.update();

    this.emit("update", Time.sinceStart);
    if (renderer && camera) {

        if (scene) {
            scene.update();
            scene.emit("update");
        }
        if (gui) {
            gui.aspect = camera.aspect;
            gui.width = camera.width;
            gui.height = camera.height;
            gui.invWidth = camera.invWidth;
            gui.invHeight = camera.invHeight;

            gui.update();
            gui.emit("update");
        }

        renderer.render(camera, scene, gui);
    }
    this.emit("lateUpdate", Time.sinceStart);
}


module.exports = Game;

},{"../../base/class":8,"../../base/device":10,"../../base/time":18,"../../math/mathf":107,"../components/component":54,"../game_object":77,"../input/handler":87,"../input/input":88,"../renderer/canvas":92,"../renderer/renderer":95,"../scene":97,"./../../base/config":9,"./../../base/log":14,"./base_game":74}],76:[function(require,module,exports){
var requestAnimationFrame = require("../../base/request_animation_frame");
var Log = require("./../../base/log");
"use strict";


function Loop(callback, ctx) {
    ctx || (ctx = this);

    this.paused = true;

    this.callback = callback;
    this.ctx = ctx || this;

    var _this = this;
    this._run = function (ms) {

        if (_this.callback) {
            _this.callback.call(ctx, ms);

            if (!_this.paused) _this._pump();
        }
    }
}


Loop.prototype.resume = function () {
    if (!this.callback) {
        Log.warn("Loop.resume: can't run loop without callback");
        return;
    }

    this.paused = false;
    this._pump();
};


Loop.prototype.pause = function () {

    this.paused = true;
};


Loop.prototype.isRunning = function () {

    return !this.paused;
};


Loop.prototype.isPaused = function () {

    return this.paused;
};


Loop.prototype._pump = function () {

    requestAnimationFrame(this._run);
};


module.exports = Loop;

},{"../../base/request_animation_frame":16,"./../../base/log":14}],77:[function(require,module,exports){
var Class = require("../base/class");
var Component = require("./components/component");
var Log = require("./../base/log");
"use strict";

/**
 * @class GameObject
 * @extends Class
 * @memberof Odin
 * @brief Base class for entities in scenes
 * @param Object options
 */
function GameObject(opts) {
    opts || (opts = {});

    Class.call(this);

    this.name = opts.name != undefined ? opts.name : "GameObject_" + this._id;

    this.scene = undefined;

    this.tags = [];

    this.components = [];
    this._componentType = {};
    this._componentHash = {};
    this._componentJSONHash = {};

    if (opts.tag) this.addTag(opts.tag);
    if (opts.tags) this.addTags.apply(this, opts.tags);

    if (opts.components) this.addComponents.apply(this, opts.components);
}

Class.extend(GameObject);


GameObject.prototype.copy = function (other) {
    var components = this.components,
        otherComponents = other.components,
        tags = other.tags,
        otherComponent, component,
        i = components.length;

    while (i--) {
        component = components[i];
        if (!other.hasComponent(component._className)) this.removeComponent(component);
    }

    i = otherComponents.length;
    while (i--) {
        otherComponent = otherComponents[i];

        if ((component = this.getComponent(otherComponent._type))) {
            component.copy(otherComponent);
        } else {
            this.addComponent(otherComponent.clone());
        }
    }

    i = tags.length;
    while (i--) this.addTag(tags[i]);

    return this;
};


GameObject.prototype.clear = function () {
    var components = this.components,
        tags = this.tags,
        componentLength = components.length,
        i;

    i = componentLength;
    while (i--) components[i].clear();

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    i = componentLength;
    while (i--) this.removeComponent(components[i]);

    this.off();

    return this;
};


GameObject.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("GameObject.destroy: can't destroy GameObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGameObject(this);
    this.emit("destroy");

    this.clear();

    return this;
};


GameObject.prototype.remove = function () {
    if (!this.scene) {
        Log.error("GameObject.remove: can't remove GameObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGameObject(this);
    return this;
};


GameObject.prototype.addTag = function (tag) {
    var tags = this.tags;

    if (tags.indexOf(tag) === -1) tags.push(tag);

    return this;
};


GameObject.prototype.addTags = function () {
    var i = arguments.length;

    while (i--) this.addTag(arguments[i]);
    return this;
};


GameObject.prototype.removeTag = function (tag) {
    var tags = this.tags,
        index = tags.indexOf(tag);

    if (index !== -1) tags.splice(index, 1);

    return this;
};


GameObject.prototype.removeTags = function () {
    var i = arguments.length;

    while (i--) this.removeTag(arguments[i]);
    return this;
};


GameObject.prototype.hasTag = function (tag) {

    return this.tags.indexOf(tag) !== -1;
};


GameObject.prototype.addComponent = function (component, others) {
    if (typeof(component) === "string") component = new Class._classes[component];
    if (!(component instanceof Component)) {
        Log.error("GameObject.addComponent: can't add passed argument, it is not an instance of Component");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;


    if (!this[name]) {
        if (component.gameObject) component = component.clone();

        components.push(component);
        this._componentType[component._type] = component;
        this._componentHash[component._id] = component;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

        component.gameObject = this;
        this[name] = component;

        if (!others) {
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) comp[components[j]._name] = components[j];
            }

            component.init();
            component.emit("init");
        }

        this.emit("add" + component._type, component);
        this.emit("addComponent", component);
        component.emit("add", this);

        if (this.scene) this.scene._addComponent(component);
    } else {
        Log.error("GameObject.addComponent: GameObject already has a(n) " + component._type + " Component");
    }

    return this;
};


GameObject.prototype.addComponents = function () {
    var length = arguments.length,
        components = this.components,
        component, name,
        i, j;

    i = length;
    while (i--) this.addComponent(arguments[i], true);

    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        j = components.length;
        while (j--) {
            name = components[j]._name;
            component[name] = components[j];
        }
    }

    i = components.length;
    while (i--) {
        component = components[i];
        component.init();
        component.emit("init");
    }

    return this;
};


GameObject.prototype.removeComponent = function (component, clear, others) {
    if (typeof(component) === "string") component = this.getComponent(component);
    if (!(component instanceof Component)) {
        Log.error("GameObject.removeComponent: can't remove passed argument, it is not an instance of Component");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;

    if (this[name]) {
        component.emit("remove", this);
        this.emit("remove" + component._type, component);
        this.emit("removeComponent", component);

        if (!others) {
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) {
                    if (name === components[j]._name) comp[name] = undefined;
                }
            }
        }

        components.splice(components.indexOf(component), 1);
        this._componentType[component._type] = undefined;
        this._componentHash[component._id] = undefined;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

        component.gameObject = undefined;
        this[name] = undefined;

        if (this.scene) this.scene._removeComponent(component);
        if (clear) component.clear();
    } else {
        Log.error("GameObject.removeComponent: GameObject does not have a(n) " + type + " Component");
    }

    return this;
};


GameObject.prototype.removeComponents = function () {
    var length = arguments.length,
        components = this.components,
        toRemove = arguments,
        component, name,
        i, j;

    i = length;
    while (i--) this.removeComponent(arguments[i], null, true);

    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        name = component._name;
        j = toRemove.length;
        while (j--) {
            if (name === toRemove[i]._name) component[name] = undefined;
        }
    }

    return this;
};


GameObject.prototype.getComponent = function (type) {

    return this._componentType[type];
};


GameObject.prototype.hasComponent = function (type) {
    var components = this.components,
        i = components.length;
    ;

    while (i--) {
        if (components[i]._type === type) return true;
    }

    return false;
};


GameObject.prototype.find = function (name) {
    var transform = this.transform || this.transform2d,
        children, child, i;

    if (!transform) return undefined;

    children = transform.children;
    i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child.gameObject;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


GameObject.prototype.findComponentById = function (id) {

    return this._componentHash[id];
};


GameObject.prototype.findComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};


GameObject.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var components = this.components,
        jsonComponents = json.components || (json.components = []),
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        component,
        i = components.length;

    while (i--) {
        if ((component = components[i]).json) jsonComponents[i] = component.toJSON(jsonComponents[i]);
    }
    i = tags.length;
    while (i--) jsonTags[i] = tags[i];

    json.name = this.name;

    return json;
};


GameObject.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var components = this.components,
        jsonComponents = json.components || (json.components = []),
        component, jsonComponent, tag,
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        i = components.length,
        has, type, j;

    while (i--) {
        component = components[i];
        type = component._type;
        has = false;

        j = jsonComponents.length;
        while (j--) {
            jsonComponent = jsonComponents[i];
            if (type === jsonComponent._type) has = true;
        }

        if (!has) this.removeComponent(component);
    }

    i = jsonComponents.length;
    while (i--) {
        if (!(jsonComponent = jsonComponents[i])) continue;

        if ((component = this.findComponentByJSONId(jsonComponent._id)) || (component = this.getComponent(jsonComponent._type))) {
            component.fromJSON(jsonComponent);
        } else {
            this.addComponent(Class.fromJSON(jsonComponent));
        }
    }

    i = jsonTags.length;
    while (i--) {
        if (tags.indexOf((tag = jsonTags[i])) === -1) tags.push(tag);
    }

    this.name = json.name;

    return this;
};


module.exports = GameObject;

},{"../base/class":8,"./../base/log":14,"./components/component":54}],78:[function(require,module,exports){
var Class = require("../../../base/class");
var GUIComponent = require("../components/gui_component");
"use strict";


function GUIComponentManager(order) {

    Class.call(this);

    this.order = order || 0;

    this.gui = undefined;
    this.components = [];
}

Class.extend(GUIComponentManager);


GUIComponentManager.prototype.forEach = function (fn, ctx) {
    var components = this.components,
        i = 0,
        il = components.length;

    if (ctx) {
        for (; i < il; i++) fn.call(ctx, components[i], i, components);
    } else {
        for (; i < il; i++) fn(components[i], i, components);
    }
};


GUIComponentManager.prototype.start = function () {
    var components = this.components,
        i = 0,
        il = components.length;

    for (; i < il; i++) components[i].start();
};


GUIComponentManager.prototype.init = function () {
    var components = this.components,
        i = 0,
        il = components.length;

    for (; i < il; i++) components[i].init();
};


GUIComponentManager.prototype.update = function () {
    var components = this.components,
        i = 0,
        il = components.length;

    for (; i < il; i++) components[i].update();
};


GUIComponentManager.prototype.sort = function () {

    this.components.sort(this.sortFunction);
};


GUIComponentManager.prototype.sortFunction = function (a, b) {

    return a._id - b._id;
};


GUIComponentManager.prototype.empty = function () {

    return this.components.length === 0;
};


GUIComponentManager.prototype.add = function (component) {
    if (!(component instanceof GUIComponent)) {
        Log.error(this._className + ".add: can't add argument to " + this._className + ", it's not an instance of GUIComponent");
        return;
    }
    var components = this.components,
        index = components.indexOf(component);

    if (index === -1) {
        components.push(component);
    } else {
        Log.error(this._className + ".add: GUIComponent is already a member of " + this._className);
    }
};


GUIComponentManager.prototype.remove = function (component) {
    if (!(component instanceof GUIComponent)) {
        Log.error(this._className + ".remove: can't remove argument from " + this._className + ", it's not an instance of GUIComponent");
        return;
    }
    var components = this.components,
        index = components.indexOf(component);

    if (index !== -1) {
        components.splice(index, 1);
    } else {
        Log.error(this._className + ".remove: GUIComponent is not a member of " + this._className);
    }
};


module.exports = GUIComponentManager;

},{"../../../base/class":8,"../components/gui_component":79}],79:[function(require,module,exports){
var Class = require("../../../base/class");
var util = require("../../../base/util");
var Log = require("../../../base/log");
"use strict";


var camelize = util.camelize;


function GUIComponent(type, opts) {
    opts || (opts = {});
    if (!type) Log.error("GUIComponent defined without a type, use GUIComponent.call(this, \"GUIComponentName\", { sync: Boolean, json: Boolean })");


    Class.call(this);

    this._type = type || "UnknownGUIComponent";
    this._name = camelize(this._type, true);

    this.sync = opts.sync != undefined ? !!opts.sync : false;
    this.json = opts.json != undefined ? !!opts.json : true;

    this.guiObject = undefined;
}

Class.extend(GUIComponent);


GUIComponent.prototype.init = function () {

};


GUIComponent.prototype.start = function () {

};


GUIComponent.prototype.update = function () {

};


GUIComponent.prototype.clear = function () {

    this.off();
};


GUIComponent.prototype.destroy = function () {
    if (!this.guiObject) {
        Log.error("GUIComponent.destroy: can't destroy GUIComponent if it's not added to a GameObject");
        return this;
    }

    this.guiObject.removeGUIComponent(this, true);
    this.emit("destroy");

    this.clear();

    return this;
};


GUIComponent.prototype.remove = function () {
    if (!this.guiObject) {
        Log.error("GUIComponent.destroy: can't destroy GUIComponent if it's not added to a GameObject");
        return this;
    }

    this.guiObject.removeGUIComponent(this, true);
    return this;
};


GUIComponent.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json._type = this._type;
    json.sync = this.sync;
    json.json = this.json;

    return json;
};


GUIComponent.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.sync = json.sync;
    this.json = json.json;

    return this;
};


module.exports = GUIComponent;

},{"../../../base/class":8,"../../../base/log":14,"../../../base/util":19}],80:[function(require,module,exports){
var Mathf = require("../../../math/mathf");
var Rect = require("../../../math/rect");
var Vec2 = require("../../../math/vec2");
var Mat32 = require("../../../math/mat32");
var Mat3 = require("../../../math/mat3");
var Mat4 = require("../../../math/mat4");
var GUIComponent = require("./gui_component");
var Log = require("../../../base/log");
"use strict";


var EPSILON = Mathf.EPSILON;


function GUITransform(opts) {
    opts || (opts = {});
    opts.sync = opts.sync != undefined ? opts.sync : true;

    GUIComponent.call(this, "GUITransform", opts);

    this.root = this;
    this.depth = 0;

    this.parent = undefined;
    this.children = [];

    this.position = opts.position != undefined ? opts.position : new Rect;
    this.rotation = opts.rotation != undefined ? opts.rotation : 0;
    this.scale = opts.scale != undefined ? opts.scale : new Vec2(1, 1);

    this.matrix = new Mat32;
    this.matrixWorld = new Mat32;

    this.modelView = new Mat4;
    this._matricesNeedsUpdate = false;
}

GUIComponent.extend(GUITransform);


GUITransform.prototype.copy = function (other) {
    var children = other.children,
        i = children.length;

    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this.rotation = other.rotation;

    while (i--) this.addChild(children[i].guiObject.clone().guiTransform);
    if (other.parent) other.parent.addChild(this);

    this._matricesNeedsUpdate = true;

    return this;
};


GUITransform.prototype.clear = function () {
    GUIComponent.prototype.clear.call(this);
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);

    this.position.set(0, 0, 0, 0);
    this.scale.set(1, 1);
    this.rotation = 0;

    this.root = this;
    this.depth = 0;

    this._matricesNeedsUpdate = true;

    return this;
};


GUITransform.prototype.translate = function () {
    var vec = new Vec2;

    return function (translation, relativeTo) {
        var position = this.position;

        vec.copy(translation);

        if (relativeTo instanceof GUITransform) {
            vec.transformAngle(relativeTo.rotation);
        } else if (relativeTo) {
            vec.transformAngle(relativeTo);
        }

        position.x += vec.x;
        position.y += vec.y;

        return this;
    };
}();


GUITransform.prototype.rotate = function (rotation, relativeTo) {

    if (relativeTo instanceof GUITransform) {
        rotation += relativeTo.rotation;
    } else if (relativeTo) {
        rotation += relativeTo;
    }

    this.rotation += rotation;

    return this;
};


GUITransform.prototype.lookAt = function () {
    var mat = new Mat32,
        vec = new Vec2,
        vec_2 = new Vec2;

    return function (target) {

        if (target instanceof GUITransform) {
            vec.copy(target.position);
        } else {
            vec.copy(target);
        }

        mat.lookAt(this.position.center(vec_2), vec);
        this.rotation = mat.getRotation();

        return this;
    };
}();


GUITransform.prototype.follow = function () {
    var target = new Vec2,
        pos = new Vec2,
        delta = new Vec2;

    return function (transform, speed) {
        var position = this.position;

        pos.set(0, 0).transformMat32(this.matrixWorld);
        target.set(0, 0).transformMat32(transform.matrixWorld);

        delta.vsub(target, pos);

        if (delta.lengthSq() > EPSILON) {
            position.x += delta.x * speed;
            position.y += delta.y * speed;
        }

        return this;
    };
}();


GUITransform.prototype.addChild = function (child, others) {
    if (!(child instanceof GUITransform)) {
        Log.error("GUITransform.add: can\'t add passed argument, it is not an instance of GUITransform");
        return this;
    }
    var children = this.children,
        index = children.indexOf(child),
        root, depth, gui;

    if (index === -1) {
        if (child.parent) child.parent.remove(child);

        child.parent = this;
        children.push(child);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = root;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.guiObject && (gui = this.guiObject.gui)) {
                gui.componentManagers.GUITransform.sort(this.sort);
            }
        }
    } else {
        Log.error("GUITransform.add: child is not a member of this GUITransform");
    }

    return this;
};


GUITransform.prototype.addChildren = function () {
    var i, il, gui;

    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i], true);
    if (this.guiObject && (gui = this.guiObject.gui)) {
        gui.componentManagers.GUITransform.sort(this.sort);
    }
    return this;
};


GUITransform.prototype.removeChild = function (child, others) {
    var children = this.children,
        index = children.indexOf(child),
        root, depth, gui;

    if (index !== -1) {
        child.parent = undefined;
        children.splice(index, 1);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = child;
        this.root = root;

        updateDepth(this, depth);
        if (!others) {
            if (this.guiObject && (gui = this.guiObject.gui)) {
                gui.componentManagers.GUITransform.sort(this.sort);
            }
        }
    } else {
        Log.error("GUITransform.remove: child is not a member of this GUITransform");
    }

    return this;
};


GUITransform.prototype.removeChildren = function () {
    var i, il, gui;

    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i], true);
    if (this.guiObject && (gui = this.guiObject.gui)) {
        gui.componentManagers.GUITransform.sort(this.sort);
    }
    return this;
};


GUITransform.prototype.detachChildren = function () {
    var i = arguments.length;

    while (i--) this.removeChild(children[i]);
    return this;
};


GUITransform.prototype.hasChild = function (child) {

    return !!~this.children.indexOf(child);
};


GUITransform.prototype.find = function (name) {
    var children = this.children,
        child,
        i = children.length;

    while (i--) {
        child = children[i];

        if (child.guiObject.name === name) return child;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


GUITransform.prototype.toWorld = function (v) {

    return v.transformMat32(this.matrixWorld);
};


GUITransform.prototype.toLocal = function () {
    var mat = new Mat32;

    return function (v) {

        return v.transformMat32(mat.inverseMat(this.matrixWorld));
    };
}();


GUITransform.prototype.update = function () {
    var matrix = this.matrix,
        parent = this.parent;

    matrix.compose(this.position, this.scale, this.rotation);

    if (parent) {
        this.matrixWorld.mmul(parent.matrixWorld, matrix);
    } else {
        this.matrixWorld.copy(matrix);
    }

    this._matricesNeedsUpdate = true;
};


GUITransform.prototype.updateMatrices = function () {
    var mat = new Mat4;

    return function (viewMatrix) {
        if (!this._matricesNeedsUpdate) return;

        this.modelView.mmul(viewMatrix, mat.fromMat32(this.matrixWorld));
        this._matricesNeedsUpdate = false;
    };
}();


GUITransform.prototype.toJSON = function (json) {
    json = GUIComponent.prototype.toJSON.call(this, json);
    var children = this.children,
        jsonChildren = json.children || (json.children = []),
        i = children.length;

    while (i--) jsonChildren[i] = children[i]._id;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);
    json.rotation = this.rotation

    return json;
};


GUITransform.prototype.fromJSON = function (json) {
    GUIComponent.prototype.fromJSON.call(this, json);
    var children = json.children,
        i = children.length,
        child, gui;

    if (this.guiObject && (gui = this.guiObject.gui)) {
        while (i--) {
            child = gui.findGUIComponentByJSONId(children[i]);

            if (!this.hasChild(child)) {
                this.addChild(child);
            }
        }
    } else {
        this.once("start", function () {
            var gui = this.guiObject.gui;

            while (i--) {
                child = gui.findGUIComponentByJSONId(children[i]);

                if (!this.hasChild(child)) {
                    this.addChild(child);
                }
            }
        });
    }

    this.position.fromJSON(json.position);
    this.scale.fromJSON(json.scale);
    this.rotation = json.rotation;

    this._matricesNeedsUpdate = true;

    return this;
};


function updateDepth(transform, depth) {
    var children = transform.children,
        i = children.length;

    transform.depth = depth;
    while (i--) updateDepth(children[i], depth + 1);
}


module.exports = GUITransform;

},{"../../../base/log":14,"../../../math/mat3":104,"../../../math/mat32":105,"../../../math/mat4":106,"../../../math/mathf":107,"../../../math/rect":109,"../../../math/vec2":111,"./gui_component":79}],81:[function(require,module,exports){
var Class = require("../../base/class");
var GUIObject = require("./gui_object");
var GUIComponentManager = require("./component_managers/gui_component_manager");
var Log = require("../../base/log");
"use strict";


/**
 * GUIs manage GUIObjects and their GUIComponents
 * @class Odin.GUI
 * @extends Odin.Class
 * @param Object options
 */
function GUI(opts) {
    opts || (opts = {});

    Class.call(this);

    this.game = undefined;

    this.name = opts.name != undefined ? opts.name : "GUI_" + this._id;

    this.width = 960;
    this.height = 640;
    this.aspect = this.width / this.height;
    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.guiObjects = [];
    this._guiObjectHash = {};
    this._guiObjectJSONHash = {};

    this.componentManagers = {};
    this._componentManagerTypes = [];
    this._componentHash = {};
    this._componentJSONHash = {};

    if (opts.guiObjects) this.addGUIObjects.apply(this, opts.guiObjects);
}

Class.extend(GUI);


GUI.prototype.copy = function (other) {
    var otherGUIObjects = other.guiObjects,
        i = otherGUIObjects.length;

    this.clear();
    this.name = other.name + "." + this._id;

    while (i--) this.addGUIObject(otherGUIObjects[i].clone());

    return this;
};


GUI.prototype.init = function () {
    var guiObjects = this.guiObjects,
        i, il;

    for (i = 0, il = guiObjects.length; i < il; i++) guiObjects[i].emit("init");
};


GUI.prototype.start = function () {
    var componentManagerTypes = this._componentManagerTypes,
        guiObjects = this.guiObjects,
        i, il;

    for (i = 0, il = componentManagerTypes.length; i < il; i++) componentManagerTypes[i].start();
    for (i = 0, il = guiObjects.length; i < il; i++) guiObjects[i].emit("start");
};


GUI.prototype.update = function () {
    var componentManagerTypes = this._componentManagerTypes,
        i, il;

    for (i = 0, il = componentManagerTypes.length; i < il; i++) componentManagerTypes[i].update();
};


GUI.prototype.clear = function () {
    var guiObjects = this.guiObjects,
        i = guiObjects.length;

    while (i--) this.removeGUIObject(guiObjects[i], true);

    this.off();

    return this;
};


GUI.prototype.destroy = function () {

    this.emit("destroy");
    this.clear();

    return this;
};


GUI.prototype.addGUIObject = function (guiObject) {
    if (!(guiObject instanceof GUIObject)) {
        Log.error("GUI.addGUIObject: can't add argument to GUI, it's not an instance of GUIObject");
        return this;
    }
    var guiObjects = this.guiObjects,
        index = guiObjects.indexOf(guiObject),
        components, transform, children, child,
        i;

    if (index === -1) {
        if (guiObject.gui) guiObject.gui.removeGUIObject(guiObject);

        guiObjects.push(guiObject);
        this._guiObjectHash[guiObject._id] = guiObject;
        if (guiObject._jsonId !== -1) this._guiObjectJSONHash[guiObject._jsonId] = guiObject;

        guiObject.gui = this;

        components = guiObject.components;
        i = components.length;
        while (i--) this._addGUIComponent(components[i]);

        if ((transform = guiObject.guiTransform)) {
            i = (children = transform.children).length;

            while (i--) {
                if ((child = children[i].guiObject) && !this.hasGUIObject(child)) {
                    this.addGUIObject(child);
                }
            }
        }

        if (this.game) guiObject.emit("init");
        this.emit("addGUIObject", guiObject);
    } else {
        Log.error("GUI.addGUIObject: GUIObject is already a member of GUI");
    }

    return this;
};


GUI.prototype.addGUIObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.addGUIObject(arguments[i]);
    return this;
};


GUI.prototype._addGUIComponent = function (component) {
    if (!component) return;
    var type = component._type,
        componentManagers = this.componentManagers,
        componentManager = componentManagers[type],
        componentManagerTypes = this._componentManagerTypes,
        isNew = !componentManager;

    if (isNew) {
        componentManager = componentManagers[type] = new (Class._classes[type + "GUIComponentManager"] || GUIComponentManager);
        componentManagerTypes.push(componentManager);
        componentManagerTypes.sort(sortGUIComponentManagerTypes);
        componentManager.gui = this;
    }

    componentManager.add(component);
    componentManager.sort();

    this._componentHash[component._id] = component;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

    this.emit("add" + type, component);
    this.emit("addGUIComponent", component);

    if (this.game) {
        component.start();
        component.emit("start");
    }
};


function sortGUIComponentManagerTypes(a, b) {

    return a.order - b.order;
}


GUI.prototype.removeGUIObject = function (guiObject, clear) {
    if (!(guiObject instanceof GUIObject)) {
        Log.error("GUI.removeGUIObject: can't remove argument from GUI, it's not an instance of GUIObject");
        return this;
    }
    var guiObjects = this.guiObjects,
        index = guiObjects.indexOf(guiObject),
        components, transform, children, child,
        i;

    if (index !== -1) {

        guiObjects.splice(index, 1);
        this._guiObjectHash[guiObject._id] = undefined;
        if (guiObject._jsonId !== -1) this._guiObjectJSONHash[guiObject._jsonId] = undefined;

        guiObject.gui = undefined;

        components = guiObject.components;
        i = components.length;
        while (i--) this._removeGUIComponent(components[i], clear);

        if ((transform = guiObject.guiTransform)) {
            i = (children = transform.children).length;

            while (i--) {
                if ((child = children[i].guiObject) && this.hasGUIObject(child)) {
                    this.removeGUIObject(child);
                }
            }
        }

        this.emit("removeGUIObject", guiObject);
        guiObject.emit("remove", guiObject);
        if (clear) guiObject.clear();
    } else {
        Log.error("GUI.removeGUIObject: GUIObject is not a member of GUI");
    }

    return this;
};


GUI.prototype.removeGUIObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.removeGUIObject(arguments[i]);
    return this;
};


GUI.prototype._removeGUIComponent = function (component, clear) {
    if (!component) return;
    var type = component._type,
        componentManagers = this.componentManagers,
        componentManager = componentManagers[type],
        componentManagerTypes = this._componentManagerTypes;

    componentManager.remove(component);
    this._componentHash[component._id] = undefined;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

    if (componentManager.empty()) {
        componentManagers[type] = undefined;
        componentManagerTypes.splice(componentManagerTypes.indexOf(componentManager), 1);
        componentManager.gui = undefined;
    }

    this.emit("remove" + type, component);
    this.emit("removeGUIComponent", component);

    if (clear) component.clear();
};


GUI.prototype.hasGUIObject = function (guiObject) {

    return !!~this.guiObjects.indexOf(guiObject);
};


GUI.prototype.findByTag = function (tag, out) {
    out || (out = []);
    var guiObjects = this.guiObjects,
        guiObject, i = guiObjects.length;

    while (i--) {
        if ((guiObject = guiObjects[i]).hasTag(tag)) out.push(guiObject);
    }

    return out;
};


GUI.prototype.findByTagFirst = function (tag) {
    var guiObjects = this.guiObjects,
        guiObject, i = guiObjects.length;

    while (i--) {
        if ((guiObject = guiObjects[i]).hasTag(tag)) return guiObject;
    }

    return undefined;
};


GUI.prototype.findById = function (id) {

    return this._guiObjectHash[id];
};


GUI.prototype.findByJSONId = function (id) {

    return this._guiObjectJSONHash[id];
};


GUI.prototype.findGUIComponentById = function (id) {

    return this._componentHash[id];
};


GUI.prototype.findGUIComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};


GUI.prototype.find = function (name) {
    var guiObjects = this.guiObjects,
        child, i = guiObjects.length;

    while (i--) {
        child = guiObjects[i];

        if (child.name === name) return child;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


GUI.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var guiObjects = this.guiObjects,
        jsonGUIObjects = json.guiObjects || (json.guiObjects = []),
        guiObject,
        i = guiObjects.length;

    json.name = this.name;

    while (i--) {
        if ((guiObject = guiObjects[i])) jsonGUIObjects[i] = guiObject.toJSON(jsonGUIObjects[i]);
    }

    return json;
};


GUI.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var jsonGUIObjects = json.guiObjects,
        guiObject, jsonGUIObject,
        i = jsonGUIObjects.length;

    this.name = json.name;

    while (i--) {
        if (!(jsonGUIObject = jsonGUIObjects[i])) continue;

        if ((guiObject = this._guiObjectJSONHash[jsonGUIObject._id])) {
            guiObject.fromJSON(jsonGUIObject);
        } else {
            this.addGUIObject(Class.fromJSON(jsonGUIObject));
        }
    }

    return this;
};


module.exports = GUI;

},{"../../base/class":8,"../../base/log":14,"./component_managers/gui_component_manager":78,"./gui_object":82}],82:[function(require,module,exports){
var Class = require("../../base/class");
var GUIComponent = require("./components/gui_component");
var GUITransform = require("./components/gui_transform");
var Log = require("../../base/log");
"use strict";

/**
 * @class GUIObject
 * @extends Class
 * @memberof Odin
 * @brief Base class for entities in scenes
 * @param Object options
 */
function GUIObject(opts) {
    opts || (opts = {});

    Class.call(this);

    this.name = opts.name != undefined ? opts.name : "GUIObject_" + this._id;

    this.scene = undefined;

    this.tags = [];

    this.components = [];
    this._componentType = {};
    this._componentHash = {};
    this._componentJSONHash = {};

    if (opts.tag) this.addTag(opts.tag);
    if (opts.tags) this.addTags.apply(this, opts.tags);

    this.addGUIComponent(new GUITransform);
    if (opts.components) this.addGUIComponents.apply(this, opts.components);
}

Class.extend(GUIObject);


GUIObject.prototype.copy = function (other) {
    var components = this.components,
        otherGUIComponents = other.components,
        tags = other.tags,
        otherGUIComponent, component,
        i = components.length;

    while (i--) {
        component = components[i];
        if (!other.hasGUIComponent(component._className)) this.removeGUIComponent(component);
    }

    i = otherGUIComponents.length;
    while (i--) {
        otherGUIComponent = otherGUIComponents[i];

        if ((component = this.getGUIComponent(otherGUIComponent._type))) {
            component.copy(otherGUIComponent);
        } else {
            this.addGUIComponent(otherGUIComponent.clone());
        }
    }

    i = tags.length;
    while (i--) this.addTag(tags[i]);

    return this;
};


GUIObject.prototype.clear = function () {
    var components = this.components,
        tags = this.tags,
        componentLength = components.length,
        i;

    i = componentLength;
    while (i--) components[i].clear();

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    i = componentLength;
    while (i--) this.removeGUIComponent(components[i]);

    this.off();

    return this;
};


GUIObject.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("GUIObject.destroy: can't destroy GUIObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGUIObject(this);
    this.emit("destroy");

    this.clear();

    return this;
};


GUIObject.prototype.remove = function () {
    if (!this.scene) {
        Log.error("GUIObject.remove: can't remove GUIObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGUIObject(this);
    return this;
};


GUIObject.prototype.addTag = function (tag) {
    var tags = this.tags;

    if (tags.indexOf(tag) === -1) tags.push(tag);

    return this;
};


GUIObject.prototype.addTags = function () {
    var i = arguments.length;

    while (i--) this.addTag(arguments[i]);
    return this;
};


GUIObject.prototype.removeTag = function (tag) {
    var tags = this.tags,
        index = tags.indexOf(tag);

    if (index !== -1) tags.splice(index, 1);

    return this;
};


GUIObject.prototype.removeTags = function () {
    var i = arguments.length;

    while (i--) this.removeTag(arguments[i]);
    return this;
};


GUIObject.prototype.hasTag = function (tag) {

    return this.tags.indexOf(tag) !== -1;
};


GUIObject.prototype.addGUIComponent = function (component, others) {
    if (typeof(component) === "string") component = new Class._classes[component];
    if (!(component instanceof GUIComponent)) {
        Log.error("GUIObject.addGUIComponent: can't add passed argument, it is not an instance of GUIComponent");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;


    if (!this[name]) {
        if (component.gameObject) component = component.clone();

        components.push(component);
        this._componentType[component._type] = component;
        this._componentHash[component._id] = component;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

        component.gameObject = this;
        this[name] = component;

        if (!others) {
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) comp[components[j]._name] = components[j];
            }

            component.init();
            component.emit("init");
        }

        this.emit("add" + component._type, component);
        this.emit("addGUIComponent", component);
        component.emit("add", this);

        if (this.scene) this.scene._addGUIComponent(component);
    } else {
        Log.error("GUIObject.addGUIComponent: GUIObject already has a(n) " + component._type + " GUIComponent");
    }

    return this;
};


GUIObject.prototype.addGUIComponents = function () {
    var length = arguments.length,
        components = this.components,
        component, name,
        i, j;

    i = length;
    while (i--) this.addGUIComponent(arguments[i], true);

    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        j = components.length;
        while (j--) {
            name = components[j]._name;
            component[name] = components[j];
        }
    }

    i = components.length;
    while (i--) {
        component = components[i];
        component.init();
        component.emit("init");
    }

    return this;
};


GUIObject.prototype.removeGUIComponent = function (component, clear, others) {
    if (typeof(component) === "string") component = this.getGUIComponent(component);
    if (!(component instanceof GUIComponent)) {
        Log.error("GUIObject.removeGUIComponent: can't remove passed argument, it is not an instance of GUIComponent");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;

    if (this[name]) {
        component.emit("remove", this);
        this.emit("remove" + component._type, component);
        this.emit("removeGUIComponent", component);

        if (!others) {
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) {
                    if (name === components[j]._name) comp[name] = undefined;
                }
            }
        }

        components.splice(components.indexOf(component), 1);
        this._componentType[component._type] = undefined;
        this._componentHash[component._id] = undefined;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

        component.gameObject = undefined;
        this[name] = undefined;

        if (this.scene) this.scene._removeGUIComponent(component);
        if (clear) component.clear();
    } else {
        Log.error("GUIObject.removeGUIComponent: GUIObject does not have a(n) " + type + " GUIComponent");
    }

    return this;
};


GUIObject.prototype.removeGUIComponents = function () {
    var length = arguments.length,
        components = this.components,
        toRemove = arguments,
        component, name,
        i, j;

    i = length;
    while (i--) this.removeGUIComponent(arguments[i], null, true);

    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        name = component._name;
        j = toRemove.length;
        while (j--) {
            if (name === toRemove[i]._name) component[name] = undefined;
        }
    }

    return this;
};


GUIObject.prototype.getGUIComponent = function (type) {

    return this._componentType[type];
};


GUIObject.prototype.hasGUIComponent = function (type) {
    var components = this.components,
        i = components.length;
    ;

    while (i--) {
        if (components[i]._type === type) return true;
    }

    return false;
};


GUIObject.prototype.find = function (name) {
    var transform = this.guiTransform,
        children, child, i;

    if (!transform) return undefined;

    children = transform.children;
    i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child.gameObject;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


GUIObject.prototype.findGUIComponentById = function (id) {

    return this._componentHash[id];
};


GUIObject.prototype.findGUIComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};


GUIObject.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var components = this.components,
        jsonGUIComponents = json.components || (json.components = []),
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        component,
        i = components.length;

    while (i--) {
        if ((component = components[i]).json) jsonGUIComponents[i] = component.toJSON(jsonGUIComponents[i]);
    }
    i = tags.length;
    while (i--) jsonTags[i] = tags[i];

    json.name = this.name;

    return json;
};


GUIObject.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var components = this.components,
        jsonGUIComponents = json.components || (json.components = []),
        component, jsonGUIComponent, tag,
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        i = components.length,
        has, type, j;

    while (i--) {
        component = components[i];
        type = component._type;
        has = false;

        j = jsonGUIComponents.length;
        while (j--) {
            jsonGUIComponent = jsonGUIComponents[i];
            if (type === jsonGUIComponent._type) has = true;
        }

        if (!has) this.removeGUIComponent(component);
    }

    i = jsonGUIComponents.length;
    while (i--) {
        if (!(jsonGUIComponent = jsonGUIComponents[i])) continue;

        if ((component = this.findGUIComponentByJSONId(jsonGUIComponent._id)) || (component = this.getGUIComponent(jsonGUIComponent._type))) {
            component.fromJSON(jsonGUIComponent);
        } else {
            this.addGUIComponent(Class.fromJSON(jsonGUIComponent));
        }
    }

    i = jsonTags.length;
    while (i--) {
        if (tags.indexOf((tag = jsonTags[i])) === -1) tags.push(tag);
    }

    this.name = json.name;

    return this;
};


module.exports = GUIObject;

},{"../../base/class":8,"../../base/log":14,"./components/gui_component":79,"./components/gui_transform":80}],83:[function(require,module,exports){
var Enums = require("../enums");
var Axis = require("./axis");
var Log = require("../../base/log");
"use strict";


var AxisType = Enums.AxisType;


function Axes() {

    Array.call(this);

    this.hash = {};
    this._SYNC = {};

    this.add({
        name: "horizontal",
        posButton: "right",
        negButton: "left",
        altPosButton: "d",
        altNegButton: "a",
        type: AxisType.Button
    });

    this.add({
        name: "vertical",
        posButton: "up",
        negButton: "down",
        altPosButton: "w",
        altNegButton: "s",
        type: AxisType.Button
    });

    this.add({
        name: "fire",
        posButton: "ctrl",
        negButton: "",
        altPosButton: "mouse0",
        altNegButton: "",
        type: AxisType.Button
    });

    this.add({
        name: "jump",
        posButton: "space",
        negButton: "",
        altPosButton: "mouse2",
        altNegButton: "",
        type: AxisType.Button
    });

    this.add({
        name: "mouseX",
        type: AxisType.Mouse,
        axis: "x"
    });

    this.add({
        name: "mouseY",
        type: AxisType.Mouse,
        axis: "y"
    });

    this.add({
        name: "touchX",
        type: AxisType.Touch,
        axis: "x"
    });

    this.add({
        name: "touchY",
        type: AxisType.Touch,
        axis: "y"
    });

    this.add({
        name: "mouseWheel",
        type: AxisType.MouseWheel
    });
}

Axes.prototype = Object.create(Array.prototype);
Axes.prototype.constructor = Axes;


Axes.prototype.add = function (name, opts) {
    if (typeof(name) === "object") {
        opts = name;
        name = opts.name;
    }
    if (this.hash[name]) {
        Log.error("Axes.add: Axes already have Axis named " + name + " use Axes.get(\"" + name + "\") and edit it instead");
        return undefined;
    }
    opts || (opts = {});
    opts.name = name;
    var axis = new Axis(opts);

    this.push(axis);
    this.hash[name] = axis;

    return axis;
};


Axes.prototype.get = function (name) {

    return this.hash[name];
};


Axes.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);
    var jsonAxes = json.axes || (json.axes = []),
        i;

    for (i = this.length; i--;) jsonAxes[i] = this[i].toSYNC(jsonAxes[i]);
    return json;
};


Axes.prototype.fromSYNC = function (json) {
    var axisHash = this.hash,
        jsonAxes = json.axes || (json.axes = []),
        axis, jsonAxis,
        i;

    for (i = jsonAxes.length; i--;) {
        jsonAxis = jsonAxes[i];

        if ((axis = axisHash[jsonAxis.name])) {
            axis.fromSYNC(jsonAxis);
        } else {
            this.add(jsonAxis.name).fromJSON(jsonAxis);
        }
    }

    return this;
};


Axes.prototype.toJSON = function (json) {
    json || (json = {});
    var jsonAxes = json.axes || (json.axes = []),
        i;

    for (i = this.length; i--;) jsonAxes[i] = this[i].toJSON(jsonAxes[i]);
    return json;
};


Axes.prototype.fromJSON = function (json) {
    var axisHash = this.hash,
        jsonAxes = json.axes || (json.axes = []),
        axis, jsonAxis,
        i;

    for (i = jsonAxes.length; i--;) {
        jsonAxis = jsonAxes[i];

        if ((axis = axisHash[jsonAxis.name])) {
            axis.fromJSON(jsonAxis);
        } else {
            this.add(jsonAxis.name).fromJSON(jsonAxis);
        }
    }

    return this;
};


module.exports = Axes;

},{"../../base/log":14,"../enums":73,"./axis":84}],84:[function(require,module,exports){
var Enums = require("../enums");
"use strict";


var AxisType = Enums.AxisType;


function Axis(opts) {
    opts || (opts = {});

    this.name = opts.name != undefined ? opts.name : "unknown";

    this.negButton = opts.negButton != undefined ? opts.negButton : "";
    this.posButton = opts.posButton != undefined ? opts.posButton : "";

    this.altNegButton = opts.altNegButton != undefined ? opts.altNegButton : "";
    this.altPosButton = opts.altPosButton != undefined ? opts.altPosButton : "";

    this.gravity = opts.gravity != undefined ? opts.gravity : 3;
    this.sensitivity = opts.sensitivity != undefined ? opts.sensitivity : 3;

    this.dead = opts.dead != undefined ? opts.dead : 0.001;

    this.type = opts.type != undefined ? opts.type : AxisType.BUTTON;
    this.axis = opts.axis != undefined ? opts.axis : "x";
    this.index = opts.index != undefined ? opts.index : 0;

    this.joyNum = opts.joyNum != undefined ? opts.joyNum : 0;

    this.value = 0;

    this._SYNC = {};
};


Axis.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);

    json.name = this.name;
    json.value = this.value;

    return json;
};


Axis.prototype.fromSYNC = function (json) {

    this.name = json.name;
    this.value = json.value;

    return this;
};


Axis.prototype.toJSON = function (json) {
    json || (json = {});

    json.name = this.name;

    json.negButton = this.negButton;
    json.posButton = this.posButton;

    json.altNegButton = this.altNegButton;
    json.altPosButton = this.altPosButton;

    json.gravity = this.gravity;
    json.sensitivity = this.sensitivity;

    json.dead = this.dead;

    json.type = this.type;
    json.axis = this.axis;
    json.index = this.index;

    json.joyNum = this.joyNum;

    json.value = this.value;

    return json;
};


Axis.prototype.fromJSON = function (json) {

    this.name = json.name;

    this.negButton = json.negButton;
    this.posButton = json.posButton;

    this.altNegButton = json.altNegButton;
    this.altPosButton = json.altPosButton;

    this.gravity = json.gravity;
    this.sensitivity = json.sensitivity;

    this.dead = json.dead;

    this.type = json.type;
    this.axis = json.axis;
    this.index = json.index;

    this.joyNum = json.joyNum;

    this.value = json.value;

    return this;
};


module.exports = Axis;

},{"../enums":73}],85:[function(require,module,exports){
"use strict";


function Button(name) {
    this.name = name;

    this.timeDown = -1;
    this.timeUp = -1;

    this.frameDown = -1;
    this.frameUp = -1;

    this.value = false;
    this._first = true;

    this._SYNC = {};
};


Button.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);

    json.name = this.name;
    json.timeDown = this.timeDown;
    json.timeUp = this.timeUp;
    json.frameDown = this.frameDown;
    json.frameUp = this.frameUp;
    json.value = this.value;

    return json;
};


Button.prototype.fromSYNC = function (json) {

    this.name = json.name;
    this.timeDown = json.timeDown;
    this.timeUp = json.timeUp;
    this.frameDown = json.frameDown;
    this.frameUp = json.frameUp;
    this.value = json.value;

    return this;
};


Button.prototype.toJSON = function (json) {
    json || (json = {});

    json.name = this.name;
    json.timeDown = this.timeDown;
    json.timeUp = this.timeUp;
    json.frameDown = this.frameDown;
    json.frameUp = this.frameUp;
    json.value = this.value;

    return json;
};


Button.prototype.fromJSON = function (json) {

    this.name = json.name;
    this.timeDown = json.timeDown;
    this.timeUp = json.timeUp;
    this.frameDown = json.frameDown;
    this.frameUp = json.frameUp;
    this.value = json.value;

    return this;
};


module.exports = Button;

},{}],86:[function(require,module,exports){
var Time = require("../../base/time");
var Button = require("./button");
var Log = require("../../base/log");
"use strict";


function Buttons() {

    Array.call(this);

    this.hash = {};
    this._SYNC = {};

    this.add("mouse0");
    this.add("mouse1");
    this.add("mouse2");
}

Buttons.prototype = Object.create(Array.prototype);
Buttons.prototype.constructor = Buttons;


Buttons.prototype.add = function (name) {
    if (this.hash[name]) {
        Log.error("Buttons.add: Buttons already have Button name " + name);
        return undefined;
    }
    var button = new Button(name);

    this.push(button);
    this.hash[name] = button;

    return button;
};


Buttons.prototype.get = function (name) {

    return this.hash[name];
};


Buttons.prototype.on = function (name) {
    var button = this.hash[name] || this.add(name);

    if (button._first) {
        button.frameDown = Time.frameCount + 1;
        button.timeDown = Time.stamp();
        button._first = false;
    }
    button.value = true;

    return button;
};


Buttons.prototype.off = function (name) {
    var button = this.hash[name] || this.add(name);

    button.frameUp = Time.frameCount + 1;
    button.timeUp = Time.stamp();
    button.value = false;
    button._first = true;

    return button;
};


Buttons.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);
    var jsonButtons = json.buttons || (json.buttons = []),
        i;

    for (i = this.length; i--;) jsonButtons[i] = this[i].toSYNC(jsonButtons[i]);
    return json;
};


Buttons.prototype.fromSYNC = function (json) {
    var buttonHash = this.hash,
        jsonButtons = json.buttons || (json.buttons = []),
        button, jsonButton,
        i;

    for (i = jsonButtons.length; i--;) {
        jsonButton = jsonButtons[i];

        if ((button = buttonHash[jsonButton.name])) {
            button.fromSYNC(jsonButton);
        } else {
            this.add(jsonButton.name).fromJSON(jsonButton);
        }
    }

    return this;
};


Buttons.prototype.toJSON = function (json) {
    json || (json = {});
    var jsonButtons = json.buttons || (json.buttons = []),
        i;

    for (i = this.length; i--;) jsonButtons[i] = this[i].toJSON(jsonButtons[key]);
    return json;
};


Buttons.prototype.fromJSON = function (json) {
    var buttonHash = this.hash,
        jsonButtons = json.buttons || (json.buttons = []),
        button, jsonButton,
        i;

    for (i = jsonButtons.length; i--;) {
        jsonButton = jsonButtons[i];

        if ((button = buttonHash[jsonButton.name])) {
            button.fromJSON(jsonButton);
        } else {
            this.add(jsonButton.name).fromJSON(jsonButton);
        }
    }

    return this;
};


module.exports = Buttons;

},{"../../base/log":14,"../../base/time":18,"./button":85}],87:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
var Dom = require("../../base/dom");
var ObjectPool = require("../../base/object_pool");
var Vec2 = require("../../math/vec2");
var Input = require("./input");
"use strict";


var min = Math.min,
    max = Math.max,

    addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent;


function Handler() {

    EventEmitter.call(this);

    this.element = undefined;
}

EventEmitter.extend(Handler);


Handler.prototype.setElement = function (element) {
    if (this.element) this.removeElement();

    this.element = element;

    addEvent(element, "mousedown mouseup mousemove mouseout mousewheel DOMMouseScroll", handleMouse, Input);
    addEvent(top, "keydown keyup", handleKeys, Input);

    addEvent(element, "touchstart touchmove touchend touchcancel", handleTouches, Input);
    addEvent(window, "devicemotion", handleDevicemotion, Input);
};


Handler.prototype.removeElement = function () {
    if (!this.element) return;
    var element = this.element;

    removeEvent(element, "mousedown mouseup mousemove mouseout mousewheel DOMMouseScroll", handleMouse, Input);
    removeEvent(top, "keydown keyup", handleKeys, Input);

    removeEvent(element, "touchstart touchmove touchend touchcancel", handleTouches, Input);
    removeEvent(window, "devicemotion", handleDevicemotion, Input);

    this.element = undefined;
};


function handleDevicemotion(e) {
    var acc = e.accelerationIncludingGravity,
        acceleration;

    if (acc && (acc.x || acc.y || acc.z)) {
        acceleration = this.acceleration;

        acceleration.x = acc.x;
        acceleration.y = acc.y;
        acceleration.z = acc.z;

        this.emit("acceleration");
    }
}


function handleTouches(e) {
    e.preventDefault();
    var type = e.type,
        touches = this.touches,
        targetTouches = e.targetTouches,
        changedTouches = e.changedTouches,
        i, il;

    if (type === "touchstart") {

        for (i = 0, il = targetTouches.length; i < il; i++) this.emit("touchstart", touches.start(i, targetTouches[i]));

    } else if (type === "touchend") {

        for (i = 0, il = changedTouches.length; i < il; i++) this.emit("touchend", touches.end(i));

    } else if (type === "touchcancel") {

        touches.cancel();
        this.emit("touchcancel");

    } else if (type === "touchmove") {

        if (this.touchesMoveNeedsUpdate) {

            for (i = 0, il = changedTouches.length; i < il; i++) this.emit("touchmove", touches.move(i, changedTouches[i]));
            this.touchesMoveNeedsUpdate = false;
        }
    }
}


var mouseFirst = false,
    mouseLast = new Vec2,
    mouseWheel = 0;

function handleMouse(e) {
    e.preventDefault();
    var type = e.type,
        button;

    if (type === "mousedown") {
        button = MOUSE_BUTTONS[e.button];

        this.buttons.on(button);
        updateMousePosition(this, e);
        this.emit("mousedown", button);

    } else if (type === "mouseup") {
        button = MOUSE_BUTTONS[e.button];

        this.buttons.off(button);
        updateMousePosition(this, e);
        this.emit("mouseup", button);

    } else if (type === "mouseout") {
        button = MOUSE_BUTTONS[e.button];

        this.buttons.off(button);
        updateMousePosition(this, e);
        this.emit("mouseout", button);

    } else if (type === "mousewheel" || type === "DOMMouseScroll") {

        mouseWheel = max(-1, min(1, (e.wheelDelta || -e.detail)));
        this.mouseWheel = mouseWheel;
        this.emit("mousewheel", mouseWheel);

    } else if (type === "mousemove") {

        if (this.mouseMoveNeedsUpdate) {

            updateMousePosition(this, e);
            this.mouseMoveNeedsUpdate = false;
            this.emit("mousemove");
        }
    }
}


function updateMousePosition(input, e) {
    var position = input.mousePosition,
        delta = input.mouseDelta,
        element = e.target || e.srcElement,
        offsetX = element.offsetLeft || 0,
        offsetY = element.offsetTop || 0,
        x = (e.pageX || e.clientX) - offsetX,
        y = (e.pageY || e.clientY) - offsetY;

    mouseLast.x = mouseFirst ? position.x : x;
    mouseLast.y = mouseFirst ? position.y : y;

    position.x = x;
    position.y = y;

    delta.x = position.x - mouseLast.x;
    delta.y = position.y - mouseLast.y;

    mouseFirst = true;
}


function handleKeys(e) {
    e.preventDefault();
    var type = e.type,
        key = KEY_CODES[e.keyCode];

    if (type === "keydown") {
        this.buttons.on(key);
        this.emit("keydown", key);
    } else if (type === "keyup") {
        this.buttons.off(key);
        this.emit("keyup", key);
    }
}

var MOUSE_BUTTONS = {
    "0": "mouse0",
    "1": "mouse1",
    "2": "mouse2"
}

var KEY_CODES = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "slash",
    192: "graveaccent",
    219: "openbracket",
    220: "backslash",
    221: "closebraket",
    222: "singlequote"
};

for (var i = 48; i <= 90; i++) KEY_CODES[i] = String.fromCharCode(i).toLowerCase();


module.exports = new Handler;

},{"../../base/dom":11,"../../base/event_emitter":13,"../../base/object_pool":15,"../../math/vec2":111,"./input":88}],88:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
var ObjectPool = require("../../base/object_pool");
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Enums = require("../enums");
var Buttons = require("./buttons");
var Button = require("./button");
var Axes = require("./axes");
var Axis = require("./axis");
var Touches = require("./touches");
"use strict";


var abs = Math.abs,
    sign = Mathf.sign,
    clamp = Mathf.clamp,

    AxisType = Enums.AxisType,
    MOUSE_BUTTONS = {
        "0": "mouse0",
        "1": "mouse1",
        "2": "mouse2"
    };


function Input() {

    EventEmitter.call(this);

    this.axes = new Axes;
    this.buttons = new Buttons;

    this.mouseWheel = 0;
    this.mousePosition = new Vec2;
    this.mouseDelta = new Vec2;
    this.mouseMoveNeedsUpdate = false;

    this.touches = new Touches;
    this.touchesMoveNeedsUpdate = false;
    this.acceleration = new Vec3;

    this.frameCount = 0;
    this._frameCount = undefined;

    this.time = 0;
    this._time = undefined;

    this._SYNC = {};
}

EventEmitter.extend(Input);


Input.prototype.update = function () {
    var axes = this.axes,
        buttons = this.buttons.hash,
        button, altButton,
        axis, value, type, touch, sensitivity, pos, neg, tmp, dt = Time.delta,
        i;

    this.frameCount = this._frameCount ? this._frameCount : Time.frameCount;
    this.time = this._time ? this._time : Time.stamp();

    this.mouseMoveNeedsUpdate = true;
    this.touchesMoveNeedsUpdate = true;

    for (i = axes.length; i--;) {
        axis = axes[i];
        value = axis.value;
        type = axis.type;
        sensitivity = axis.sensitivity;

        if (type === AxisType.Button) {
            button = buttons[axis.negButton];
            altButton = buttons[axis.altNegButton];
            neg = button && button.value || altButton && altButton.value;

            button = buttons[axis.posButton];
            altButton = buttons[axis.altPosButton];
            pos = button && button.value || altButton && altButton.value;

        } else if (type === AxisType.Mouse) {
            axis.value = this.mouseDelta[axis.axis];
            continue;

        } else if (type === AxisType.Touch) {
            touch = this.touches[axis.index];

            if (touch) {
                axis.value = touch.delta[axis.axis];
            } else {
                continue;
            }
        } else if (type === AxisType.MouseWheel) {
            value += this.mouseWheel;

        } else if (type === AxisType.Joystick) {

        }

        if (neg) value -= sensitivity * dt;
        if (pos) value += sensitivity * dt;

        if (!pos && !neg && value !== 0) {
            tmp = abs(value);
            value -= clamp(sign(value) * axis.gravity * dt, -tmp, tmp);
        }

        value = clamp(value, -1, 1);
        if (abs(value) <= axis.dead) value = 0;

        axis.value = value;
    }

    this.mouseWheel = 0;
};


Input.prototype.axis = function (name) {
    var axis = this.axes.hash[name];
    return axis ? axis.value : 0;
};


Input.prototype.mouseButton = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && button.value;
};


Input.prototype.mouseButtonDown = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && button.value && (button.frameDown >= this.frameCount);
};


Input.prototype.mouseButtonUp = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && (button.frameUp >= this.frameCount)
};


Input.prototype.anyKey = function () {
    var buttons = this.buttons,
        i;

    for (i = buttons.length; i--;) {
        if (buttons[i].value) return true;
    }
    return false;
};


Input.prototype.anyKeyDown = function () {
    var buttons = this.buttons,
        button,
        i;

    for (i = buttons.length; i--;) {
        if ((button = buttons[i]).value && (button.frameDown >= this.frameCount)) return true;
    }
    return false;
};


Input.prototype.key = function (name) {
    var button = this.buttons.hash[name];

    return button && button.value;
};


Input.prototype.keyDown = function (name) {
    var button = this.buttons.hash[name];

    return button && button.value && (button.frameDown >= this.frameCount);
};


Input.prototype.keyUp = function (name) {
    var button = this.buttons.hash[name];

    return button && (button.frameUp >= this.frameCount);
};


Input.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);

    json._frameCount = Time.frameCount;
    json._time = Time.stamp();

    json.buttons = this.buttons.toSYNC(json.buttons);

    json.mousePosition = this.mousePosition.toJSON(json.mousePosition);
    json.mouseDelta = this.mouseDelta.toJSON(json.mouseDelta);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.touches = this.touches.toSYNC(json.touches);

    return json;
};


Input.prototype.fromSYNC = function (json) {

    this._frameCount = json._frameCount;
    this._time = json._time;

    this.buttons.fromSYNC(json.buttons);

    this.mousePosition.fromJSON(json.mousePosition);
    this.mouseDelta.fromJSON(json.mouseDelta);

    this.acceleration.fromJSON(json.acceleration);
    this.touches.fromSYNC(json.touches);

    return this;
};


Input.prototype.toJSON = function (json) {
    json || (json = {});

    json.buttons = this.buttons.toJSON(json.buttons);
    json.axes = this.axes.toJSON(json.axes);

    json.mousePosition = this.mousePosition.toJSON(json.mousePosition);
    json.mouseDelta = this.mouseDelta.toJSON(json.mouseDelta);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.touches = this.touches.toJSON(json.touches);

    return json;
};


Input.prototype.fromJSON = function (json) {

    this.buttons.fromJSON(json.buttons);
    this.axes.fromJSON(json.axes);

    this.mousePosition.fromJSON(json.mousePosition);
    this.mouseDelta.fromJSON(json.mouseDelta);

    this.acceleration.fromJSON(json.acceleration);
    this.touches.fromJSON(json.touches);

    return this;
};


module.exports = new Input;

},{"../../base/event_emitter":13,"../../base/object_pool":15,"../../base/time":18,"../../math/mathf":107,"../../math/vec2":111,"../../math/vec3":112,"../enums":73,"./axes":83,"./axis":84,"./button":85,"./buttons":86,"./touches":90}],89:[function(require,module,exports){
var Vec2 = require("../../math/vec2");
"use strict";


function Touch() {

    this.id = -1;

    this.radiusX = 0;
    this.radiusY = 0;
    this.rotationAngle = 0;
    this.force = 0;

    this.delta = new Vec2;
    this.position = new Vec2;

    this._last = new Vec2;
    this._first = false;

    this._SYNC = {};
};


Touch.prototype.clear = function () {

    this.id = -1;

    this.position.set(0, 0);
    this.delta.set(0, 0);
    this._last.set(0, 0);

    this.radiusX = 0;
    this.radiusY = 0;
    this.rotationAngle = 0;
    this.force = 0;

    this._first = false;

    return this;
};


Touch.prototype.fromEvent = function (e) {
    var position = this.position,
        delta = this.delta,
        last = this._last,
        first = this._first,
        element = e.target || e.srcElement,
        offsetX = element.offsetLeft,
        offsetY = element.offsetTop,
        x = (e.pageX || e.clientX) - offsetX,
        y = (e.pageY || e.clientY) - offsetY;

    last.x = first ? position.x : x;
    last.y = first ? position.y : y;

    position.x = x;
    position.y = y;

    delta.x = position.x - last.x;
    delta.y = position.y - last.y;

    this.radiusX = (e.radiusX || e.webkitRadiusX || e.mozRadiusX || e.oRadiusX || e.msRadiusX || 1);
    this.radiusY = (e.radiusY || e.webkitRadiusY || e.mozRadiusY || e.oRadiusY || e.msRadiusY || 1);
    this.rotationAngle = (e.rotationAngle || e.webkitRotationAngle || e.mozRotationAngle || e.oRotationAngle || e.msRotationAngle || 0);
    this.force = (e.force || e.webkitForce || e.mozForce || e.oForce || e.msForce || 1);

    this._first = true;

    return this;
};


Touch.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);

    json.id = this.id;

    json.delta = this.delta.toJSON(json.delta);
    json.position = this.position.toJSON(json.position);

    json._last = this._last.toJSON(json._last);
    json._first = this._first;

    return json;
};


Touch.prototype.fromSYNC = function (json) {

    this.id = json.id;

    this.delta.fromJSON(json.delta);
    this.position.fromJSON(json.position);

    this._last.fromJSON(json._last);
    this._first = json._first;

    return this;
};


Touch.prototype.toJSON = function (json) {
    json || (json = {});

    json.id = this.id;

    json.delta = this.delta.toJSON(json.delta);
    json.position = this.position.toJSON(json.position);

    json._last = this._last.toJSON(json._last);
    json._first = this._first;

    return json;
};


Touch.prototype.fromJSON = function (json) {
    this.id = json.id;

    this.delta.fromJSON(json.delta);
    this.position.fromJSON(json.position);

    this._last.fromJSON(json._last);
    this._first = json._first;

    return this;
};


module.exports = Touch;

},{"../../math/vec2":111}],90:[function(require,module,exports){
var ObjectPool = require("../../base/object_pool");
var Touch = require("./touch");
"use strict";


var TOUCH_POOL = new ObjectPool(Touch),
    OBJECT_POOL = new ObjectPool(Object);


function Touches() {

    Array.call(this);
    this._SYNC = {};
}

Touches.prototype = Object.create(Array.prototype);
Touches.prototype.constructor = Touches;
Touches.TOUCH_POOL = TOUCH_POOL;


Touches.prototype.start = function (index, targetTouch) {
    var touch = TOUCH_POOL.create();

    touch.clear();
    touch.id = targetTouch.identifier;
    touch.fromEvent(targetTouch);

    this.push(touch);

    return touch;
};


Touches.prototype.end = function (index) {
    var touch = this[index];

    TOUCH_POOL.removeObject(touch);
    this.splice(index, 1);

    return touch;
};


Touches.prototype.cancel = function () {

    TOUCH_POOL.clear();
    this.length = 0;

    return this;
};


Touches.prototype.move = function (index, targetTouch) {
    var touch = this[index];

    touch.fromEvent(targetTouch);

    return touch;
};


Touches.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);
    var jsonTouches = json.touches || (json.touches = []),
        i = this.length;

    jsonTouches.length = 0;
    OBJECT_POOL.clear();

    while (i--) jsonTouches[i] = this[i].toSYNC(OBJECT_POOL.create());

    return json;
};


Touches.prototype.fromSYNC = function (json) {
    var jsonTouches = json.touches,
        i = jsonTouches.length;

    this.length = 0;
    TOUCH_POOL.clear();

    while (i--) this[i] = TOUCH_POOL.create().fromSYNC(jsonTouches[i]);

    return this;
};


Touches.prototype.toJSON = function (json) {
    json || (json = {});
    var jsonTouches = json.touches || (json.touches = []),
        i;

    for (i = this.length; i--;) jsonTouches[i] = this[i].toJSON(jsonTouches[i]);
    return json;
};


Touches.prototype.fromJSON = function (json) {
    var jsonTouches = json.touches,
        touch, i, j, tl;

    for (i = jsonTouches.length, tl = this.length, j = tl; i--;) {
        if (i < tl) {
            this.splice(j--, 1);
            TOUCH_POOL.removeObject(this[j]);
        }

        if ((touch = this[i])) {
            touch.fromJSON(jsonTouches[i]);
        } else {
            this[i] = TOUCH_POOL.create().fromJSON(jsonTouches[i]);
        }
    }

    return this;
};


module.exports = Touches;

},{"../../base/object_pool":15,"./touch":89}],91:[function(require,module,exports){
var Class = require("../base/class");
var ObjectPool = require("../base/object_pool");
"use strict";


function Prefab(object) {

    Class.call(this);

    this.object = object.toJSON();
    this.objectPool = new ObjectPool(object.constructor);
}

Class.extend(Prefab);


Prefab.prototype.create = function () {
    var object = this.objectPool.create();

    object.fromJSON(this.object);
    object.on("remove", onRemove, this);

    return object;
};


Prefab.prototype.setObject = function (object) {

    this.object = object.toJSON();
    this.objectPool = new ObjectPool(object.constructor);

    return this;
};


Prefab.prototype.empty = function () {

    this.objectPool.empty();

    return this;
};


Prefab.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.object = this.object;

    return json;
};


Prefab.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.object = json.object;
    this.objectPool = new ObjectPool(Class._classes[json.object._className]);

    return this;
};


function onRemove(object) {

    this.objectPool.removeObject(object);
    object.off("remove", onRemove, this);
};


module.exports = Prefab;

},{"../base/class":8,"../base/object_pool":15}],92:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
var Device = require("../../base/device");
var Dom = require("../../base/dom");
var Config = require("../../base/config");
"use strict";

var addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent,
    addMeta = Dom.addMeta,
    floor = Math.floor,

    CANVAS_ID = 0,
    SCALE_REG = /-scale\s *=\s*[.0-9]+/g,
    CANVAS_STYLE = [
        "position: fixed;",
        "top: 50%;",
        "left: 50%;",
        "padding: 0px;",
        "margin: 0px;"
    ].join("\n"),
    VIEWPORT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, VIEWPORT_SCALE;

addMeta("viewport", "viewport", "initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no");
addMeta("viewport-width", "viewport", "width=device-width");
addMeta("viewport-height", "viewport", "height=device-height");

VIEWPORT = document.getElementById("viewport");
VIEWPORT_WIDTH = document.getElementById("viewport-width");
VIEWPORT_HEIGHT = document.getElementById("viewport-height");
VIEWPORT_SCALE = VIEWPORT.getAttribute("content");

function windowOnResize() {
    VIEWPORT.setAttribute("content", VIEWPORT_SCALE.replace(SCALE_REG, "-scale=" + Device.invPixelRatio));
    VIEWPORT_WIDTH.setAttribute("content", "width=" + window.innerWidth);
    VIEWPORT_HEIGHT.setAttribute("content", "height=" + window.innerHeight);
    window.scrollTo(0, 1);
}

addEvent(window, "resize orientationchange", windowOnResize);
windowOnResize();

/**
 * @class Canvas
 * @extends EventEmitter
 * @brief canvas helper
 * @param {Object} options
 */

function Canvas(opts) {
    opts || (opts = {});

    EventEmitter.call(this);

    /**
     * @property Number canvasId
     * @memberof Canvas
     */
    this.canvasId = ++CANVAS_ID;

    /**
     * @property Boolean fullScreen
     * @memberof Canvas
     */
    this.fullScreen = opts.fullScreen ? opts.fullScreen : (opts.width == undefined && opts.height == undefined) ? true : false;

    /**
     * @property String customCursor
     * @memberof Canvas
     */
    this.customCursor = opts.customCursor != undefined ? opts.customCursor : false;

    /**
     * @property Boolean hideMouse
     * @memberof Canvas
     */
    this.hideMouse = opts.hideMouse != undefined ? opts.hideMouse : false;

    /**
     * @property Number width
     * @memberof Canvas
     */
    this.width = opts.width != undefined ? opts.width : window.innerWidth;

    /**
     * @property Number height
     * @memberof Canvas
     */
    this.height = opts.height != undefined ? opts.height : window.innerHeight;

    /**
     * @property Number aspect
     * @memberof Canvas
     */
    this.aspect = this.width / this.height;

    /**
     * @property Number pixelWidth
     * @memberof Canvas
     */
    this.pixelWidth = this.width;

    /**
     * @property Number pixelHeight
     * @memberof Canvas
     */
    this.pixelHeight = this.height;

    /**
     * @property HTMLCanvasElement element
     * @memberof Canvas
     */
    this.element = undefined;
}

EventEmitter.extend(Canvas);


Canvas.prototype.init = function () {
    if (this.element) this.destroy();
    var element = document.createElement("canvas"),
        style = element.style;

    element.id = "canvas-" + this.canvasId;
    style.cssText = CANVAS_STYLE;
    style.cursor = this.customCursor ? "url(" + this.customCursor + ")" : this.hideMouse ? "none" : "default";
    document.body.appendChild(element);

    if (!Config.debug) {
        element.oncontextmenu = function () {
            return false;
        };
    }

    addEvent(window, "resize orientationchange", this.handleResize, this);

    element.requestPointerLock || (element.requestPointerLock = (
    element.webkitRequestPointerLock ||
    element.mozRequestPointerLock ||
    element.oRequestPointerLock ||
    element.msRequestPointerLock
    ));
    element.exitPointerLock || (element.exitPointerLock = (
    document.webkitExitPointerLock ||
    document.mozExitPointerLock ||
    document.oExitPointerLock ||
    document.msExitPointerLock
    ));
    element.requestFullscreen || (element.requestFullscreen = (
    element.webkitRequestFullscreen ||
    element.mozRequestFullscreen ||
    element.oRequestFullscreen ||
    element.msRequestFullscreen
    ));
    element.exitFullscreen || (element.exitFullscreen = (
    element.webkitExitFullscreen ||
    element.mozExitFullscreen ||
    element.oExitFullscreen ||
    element.msExitFullscreen
    ));

    this.element = element;
    this.handleResize();
};


Canvas.prototype.clear = function () {
    if (!this.element) return this;

    removeEvent(window, "resize orientationchange", this.handleResize, this);
    document.body.removeChild(this.element);
    this.element = undefined;

    return this;
};

/**
 * @method setFullscreen
 * @memberof Canvas
 * @brief sets fullScreen boolean
 * @param Number width
 */
Canvas.prototype.setFullscreen = function (value) {
    if (!this.element || this.fullScreen === value) return this;

    this.fullScreen = !!value;
    this.handleResize();

    return this;
};

/**
 * @method setWidth
 * @memberof Canvas
 * @brief sets width and updates aspect
 * @param Number width
 */
Canvas.prototype.setWidth = function (width) {
    if (!this.element || this.width === width) return this;

    this.width = width;
    this.fullScreen = false;
    this.aspect = this.width / this.height;

    this.handleResize();

    return this;
};

/**
 * @method setHeight
 * @memberof Canvas
 * @brief sets height and updates aspect
 * @param Number height
 */
Canvas.prototype.setHeight = function (height) {
    if (!this.element || this.height === height) return this;

    this.height = height;
    this.fullScreen = false;
    this.aspect = this.width / this.height;

    this.handleResize();

    return this;
};

/**
 * @method style
 * @memberof Canvas
 * @brief sets style of html element
 * @param String key
 * @param String value
 */
Canvas.prototype.style = function (key, value) {
    if (!this.element) return this;

    this.element.style[key] = value;
    return this;
};

/**
 * @method setBackgroundColor
 * @memberof Canvas
 * @brief sets html background color
 * @param String color
 */
Canvas.prototype.setBackgroundColor = function (color) {
    if (!this.element) return this;

    this.element.style.background = color;
    return this;
};


Canvas.prototype.handleResize = function () {
    var w = window.innerWidth,
        h = window.innerHeight,
        aspect = w / h,
        element = this.element,
        style = element.style,
        width, height;

    if (this.fullScreen) {
        width = w;
        height = h;
    } else {
        if (aspect > this.aspect) {
            width = h * this.aspect;
            height = h;
        } else {
            width = w;
            height = w / this.aspect;
        }
    }

    this.pixelWidth = floor(width);
    this.pixelHeight = floor(height);

    element.width = width;
    element.height = height;

    style.marginLeft = -floor((width + 1) * 0.5) + "px";
    style.marginTop = -floor((height + 1) * 0.5) + "px";

    style.width = floor(width) + "px";
    style.height = floor(height) + "px";

    this.emit("resize");
};


module.exports = Canvas;

},{"../../base/config":9,"../../base/device":10,"../../base/dom":11,"../../base/event_emitter":13}],93:[function(require,module,exports){
var Class = require("../../base/class");
var Enums = require("../enums");
"use strict";

/**
 * @class RenderTarget
 * @extends Class
 * @brief WebGL Render Target helper
 */

function RenderTarget(opts) {
    opts || (opts = {});

    Class.call(this);

    this.width = opts.width || 512;
    this.height = opts.height || 512;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.depthOnly = opts.depthOnly != undefined ? !!opts.depthOnly : false;
    this.depthBuffer = opts.depthBuffer != undefined ? !!opts.depthBuffer : true;
    this.stencilBuffer = opts.stencilBuffer != undefined ? !!opts.stencilBuffer : true;

    this.generateMipmap = opts.generateMipmap != undefined ? !!opts.generateMipmap : true;
    this.flipY = opts.flipY != undefined ? !!opts.flipY : true;
    this.premultiplyAlpha = opts.premultiplyAlpha != undefined ? !!opts.premultiplyAlpha : false;

    this.anisotropy = opts.anisotropy != undefined ? opts.anisotropy : 1;

    this.filter = opts.filter != undefined ? opts.filter : Enums.FilterMode.Linear;
    this.format = opts.format != undefined ? opts.format : Enums.TextureFormat.RGBA;
    this.wrap = opts.wrap != undefined ? opts.wrap : Enums.TextureWrap.Repeat;

    this._webglUsed = 0;
    this._webgl = undefined;
    this._webglFramebuffer = undefined;
    this._webglRenderbuffer = undefined;
}

Class.extend(RenderTarget);


RenderTarget.prototype.clone = function () {

    return new RenderTarget().copy(this);
};


RenderTarget.prototype.copy = function (other) {

    this.width = other.width;
    this.height = other.height;

    this.invWidth = other.invWidth;
    this.invHeight = other.invHeight;

    this.generateMipmap = other.generateMipmap;
    this.flipY = other.flipY;
    this.premultiplyAlpha = other.premultiplyAlpha;

    this.anisotropy = other.anisotropy;

    this.filter = other.filter;
    this.format = other.format;
    this.wrap = other.wrap;

    return this;
};


RenderTarget.prototype.setWidth = function (width) {

    this.width = width || this.width;
    this.needsUpdate = true;
};


RenderTarget.prototype.setHeight = function (height) {

    this.height = height || this.height;
    this.needsUpdate = true;
};


RenderTarget.prototype.setMipmap = function (value) {

    this.generateMipmap = value != undefined ? !!value : !this.generateMipmap;
    this.needsUpdate = true;
};


RenderTarget.prototype.setAnisotropy = function (value) {

    this.anisotropy = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setFilter = function (value) {

    this.filter = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setFormat = function (value) {

    this.format = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setWrap = function (value) {

    this.wrap = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.width = this.width;
    json.height = this.height;

    json.invWidth = this.invWidth;
    json.invHeight = this.invHeight;

    json.generateMipmap = this.generateMipmap;
    json.flipY = this.flipY;
    json.premultiplyAlpha = this.premultiplyAlpha;

    json.anisotropy = this.anisotropy;

    json.filter = this.filter;
    json.format = this.format;
    json.wrap = this.wrap;

    return json;
};


RenderTarget.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.width = json.width;
    this.height = json.height;

    this.invWidth = json.invWidth;
    this.invHeight = json.invHeight;

    this.generateMipmap = json.generateMipmap;
    this.flipY = json.flipY;
    this.premultiplyAlpha = json.premultiplyAlpha;

    this.anisotropy = json.anisotropy;

    this.filter = json.filter;
    this.format = json.format;
    this.wrap = json.wrap;

    return this;
};


module.exports = RenderTarget;

},{"../../base/class":8,"../enums":73}],94:[function(require,module,exports){
var RenderTarget = require("./render_target");
"use strict";

/**
 * @class RenderTargetCube
 * @extends RenderTarget
 * @brief WebGL Render Target helper
 */

function RenderTargetCube(opts) {
    opts || (opts = {});

    RenderTarget.call(this, opts);

    this.activeCubeFace = 0;
}

RenderTarget.extend(RenderTargetCube);


RenderTargetCube.prototype.clone = function () {

    return new RenderTargetCube().copy(this);
};


RenderTargetCube.prototype.copy = function (other) {
    RenderTarget.prototype.copy.call(this, other);

    return this;
};


RenderTargetCube.prototype.toJSON = function (json) {
    json = RenderTarget.prototype.toJSON.call(this, json);

    json.activeCubeFace = this.activeCubeFace;

    return json;
};


RenderTargetCube.prototype.fromJSON = function (json) {
    RenderTarget.prototype.fromJSON.call(this, json);

    this.activeCubeFace = json.activeCubeFace;

    return this;
};


module.exports = RenderTargetCube;

},{"./render_target":93}],95:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
var Device = require("../../base/device");
var Dom = require("../../base/dom");
var util = require("../../base/util");

var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Rect = require("../../math/rect");
var RectOffset = require("../../math/rect_offset");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Vec4 = require("../../math/vec4");
var Quat = require("../../math/quat");
var Mat2 = require("../../math/mat2");
var Mat3 = require("../../math/mat3");
var Mat4 = require("../../math/mat4");

var Enums = require("../enums");
var Log = require("../../base/log");
var Config = require("../../base/config");
var RenderTarget = require("./render_target");
var RenderTargetCube = require("./render_target_cube");
var ShaderChunks = require("./shader_chunks");

var Texture = require("../assets/texture");
var TextureCube = require("../assets/texture_cube");
var MeshFilter = require("../components/mesh_filter");
var Sprite = require("../components/sprite");
var Emitter = require("../components/particle_system/emitter");
var Emitter2D = require("../components/particle_system/emitter_2d");
"use strict";


var Blending = Enums.Blending,
    ShadowMapType = Enums.ShadowMapType,
    CullFace = Enums.CullFace,
    Side = Enums.Side,

    LightType = Enums.LightType,

    FilterMode = Enums.FilterMode,
    TextureFormat = Enums.TextureFormat,
    TextureWrap = Enums.TextureWrap,

    getWebGLContext = Dom.getWebGLContext,
    addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent,

    createProgram = Dom.createProgram,

    merge = util.merge,

    max = Math.max,
    floor = Math.floor,
    clamp = Mathf.clamp,
    isPowerOfTwo = Mathf.isPowerOfTwo,

    defineProperty = Object.defineProperty,
    EMPTY_ARRAY = [];

/**
 * @class Renderer
 * @extends EventEmitter
 * @param {object} options
 */

function Renderer(opts) {
    opts || (opts = {});

    EventEmitter.call(this);

    this.autoClear = opts.autoClear != undefined ? opts.autoClear : true;
    this.autoClearColor = opts.autoClearColor != undefined ? opts.autoClearColor : true;
    this.autoClearDepth = opts.autoClearDepth != undefined ? opts.autoClearDepth : true;
    this.autoClearStencil = opts.autoClearStencil != undefined ? opts.autoClearStencil : true;

    this.shadowMapEnabled = opts.shadowMapEnabled != undefined ? opts.shadowMapEnabled : true;
    this.shadowMapAutoUpdate = opts.shadowMapAutoUpdate != undefined ? opts.shadowMapAutoUpdate : true;
    this.shadowMapType = opts.shadowMapType != undefined ? opts.shadowMapType : ShadowMapType.PCFShadowMap;
    this.shadowMapCullFace = opts.shadowMapCullFace != undefined ? opts.shadowMapCullFace : CullFace.Front;
    this.shadowMapDebug = opts.shadowMapDebug != undefined ? opts.shadowMapDebug : false;
    this.shadowMapCascade = opts.shadowMapCascade != undefined ? opts.shadowMapCascade : false;

    var _lastCamera = undefined,
        _lastResizeFn = undefined,
        _lastScene = undefined,
        _lastGUI = undefined,

        _mat4 = new Mat4,
        _projScreenMatrix = new Mat4,
        _quat = new Quat,
        _vector2 = new Vec2,
        _vector3 = new Vec3,
        _vector3_2 = new Vec3,
        _vector4 = new Vec4,
        _rect = new Rect,
        _rect_2 = new Rect,
        _rectOffset = new RectOffset,
        _color = new Color,

        _shaders = {},
        _lastBuffers = undefined,
        _spriteBuffers = undefined,

        _textTextures = {},
        _canvas2d = undefined,
        _ctx = undefined;

    /**
     * @method render
     * @memberof Renderer
     * @brief renderers scene from camera's perspective
     * @param Camera camera
     * @param Scene scene
     * @param GUI gui
     * @param RenderTarget renderTarget
     */
    function render(camera, scene, gui, renderTarget) {
        if (!_context || !camera) return;
        var lineWidth, blending, cullFace,
            background = camera.background,
            i, il;

        setRenderTarget(renderTarget);

        if (_lastClearColor.r !== background.r || _lastClearColor.g !== background.g || _lastClearColor.b !== background.b) {
            _lastClearColor.copy(background);
            _gl.clearColor(background.r, background.g, background.b, 1);
            if (!this.autoClear) clearCanvas(true, this.autoClearDepth, this.autoClearStencil);
        }
        if (_lastCamera !== camera) {

            if (camera.autoResize) {
                var w = _canvas.pixelWidth,
                    h = _canvas.pixelHeight;

                camera.set(w, h);
                setViewport(0, 0, w, h);

                if (_lastResizeFn) _canvas.off("resize", _lastResizeFn);

                _lastResizeFn = function () {
                    var w = this.pixelWidth,
                        h = this.pixelHeight;

                    camera.set(w, h);
                    setViewport(0, 0, w, h);
                };

                _canvas.on("resize", _lastResizeFn);
            } else {
                setViewport(0, 0, camera.width, camera.height);
            }

            _lastCamera = camera;
        }
        if (scene && _lastScene !== scene) {
            if (_lastScene) removeSceneEvents(_lastScene);
            addSceneEvents(scene);

            _lastScene = scene;
        }
        if (gui && _lastGUI !== gui) {
            if (_lastGUI) removeGUIEvents(_lastGUI);
            addGUIEvents(gui);

            _lastScene = gui;
        }

        _projScreenMatrix.mmul(camera.projection, camera.view);
        if (this.autoClear) clearCanvas(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);

        lineWidth = _lastLineWidth;
        blending = _lastBlending;
        cullFace = _lastCullFace;

        if (scene) {
            var componentManagers = scene.componentManagers,
                ambient = scene.world.ambient,
                lights = componentManagers.Light,
                meshFilters = componentManagers.MeshFilter,
                sprites = componentManagers.Sprite,
                particleSystems = componentManagers.ParticleSystem;

            lights = lights ? lights.components : EMPTY_ARRAY;

            if (meshFilters) renderMeshFilters(camera, lights, ambient, meshFilters);
            if (sprites) renderSprites(camera, lights, ambient, sprites);
            if (particleSystems) renderParticleSystems(camera, lights, ambient, particleSystems);
        }
        if (gui) {
            var componentManagers = gui.componentManagers,
                guiContents = componentManagers.GUIContent,
                guiContent, transform;

            useDepth && setDepthTest(false);

            guiContents = guiContents ? guiContents.components : EMPTY_ARRAY;

            for (i = 0, il = guiContents.length; i < il; i++) {
                guiContent = guiContents[i];
                transform = guiContent.guiTransform;

                if (!transform) continue;

                transform.updateMatrices(camera.guiProjection);
                renderGUIContent(camera, transform, guiContent);
            }

            useDepth && setDepthTest(true);
        }

        setCullFace(cullFace);
        setBlending(blending);
        setLineWidth(lineWidth);
    };
    this.render = render;


    var _guiBuffers = undefined,
        _guiContentShader = undefined;

    function renderGUIContent(camera, transform, guiContent) {
        if (!_guiBuffers) createGUIBuffers();
        if (!_guiContentShader) createGUIContentShader();

        var force = setProgram(_guiContentShader.program),
            uniforms = _guiContentShader.uniforms,
            attributes = _guiContentShader.attributes,

            texture = guiContent.texture,
            text = guiContent.text,

            style = guiContent.style,
            styleState = style._state,
            state = style[styleState],

            innerRect = _rect.copy(transform.position),
            outerRect = _rect_2;

        if (texture) {

        } else if (text) {
            texture = createTextTexture(guiContent, innerRect, text, style, state);
            outerRect.copy(innerRect);
        } else {
            return;
        }

        if (_lastBuffers !== _guiBuffers) {
            disableAttributes();

            attributes.position.set(_guiBuffers._webglVertexBuffer);
            attributes.uv.set(_guiBuffers._webglUvBuffer);

            _lastBuffers = _guiBuffers;
        }

        style.padding.add(outerRect);
        style.margin.add(outerRect);

        uniforms.mvpMatrix.set(transform.modelView, force);
        uniforms.size.set(_vector2.set(outerRect.width, outerRect.height), force);
        uniforms.crop.set(_vector4.set(0, 0, 1, 1), force);
        uniforms.alpha.set(style.alpha, force);

        _gl.activeTexture(_gl.TEXTURE0);
        _gl.bindTexture(_gl.TEXTURE_2D, texture._webgl);
        _gl.uniform1i(uniforms.texture.location, 0);

        _gl.drawArrays(_gl.TRIANGLE_STRIP, 0, _guiBuffers._webglVertexCount);
    }


    function createTextTexture(guiContent, innerRect, text, style, state) {
        var texture = _textTextures[guiContent._id];
        if (!guiContent._needsUpdate) {
            innerRect.width = texture.width;
            innerRect.height = texture.height;
            return texture;
        }

        var canvas = _canvas2d,
            TEXTURE_2D = _gl.TEXTURE_2D,

            lineHeight = style.lineHeight,
            lineSpacing = style.lineSpacing,
            halfLineSpacing = lineSpacing * 0.5,
            fontHeight = determineFontHeight(style.font),
            ctxStyle = style.fontStyle + " " + style.fontSize + "pt " + style.font,

            maxWidth = innerRect.width,
            maxHeight = innerRect.height,
            width, height,

            lines = wwLastLines,
            line, x = 0,
            y = 0,
            i, il;

        texture = texture || (_textTextures[guiContent._id] = {});

        _ctx.font = ctxStyle;
        lineHeight = lineHeight > fontHeight ? lineHeight : fontHeight;

        if (style.wordWrap && !style.stretchWidth) {
            wordWrap(text, maxWidth, lineHeight, lineSpacing);
            width = wwLastX;
            height = wwLastY;
        } else {
            lines.length = 0;
            lines.push(text);
            width = _ctx.measureText(text).width;
            height = lineHeight + lineSpacing;
        }

        canvas.width = style.fixedWidth || width;
        canvas.height = style.fixedHeight || height;

        _ctx.font = ctxStyle;
        _ctx.fillStyle = state.text.toRGB();
        _ctx.textAlign = "left";
        _ctx.textBaseline = "top";

        for (i = 0, il = lines.length; i < il; i++) {
            line = lines[i];
            y += halfLineSpacing;
            _ctx.fillText(line, x, y);
            y += lineHeight + halfLineSpacing;
        }


        texture.width = innerRect.width = width;
        texture.height = innerRect.height = height;

        texture._webgl = texture._webgl || (texture._webgl = _gl.createTexture());

        _gl.bindTexture(TEXTURE_2D, texture._webgl);

        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, 0);

        _gl.texImage2D(TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, canvas);

        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);

        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

        _gl.bindTexture(TEXTURE_2D, null);

        guiContent._needsUpdate = false;

        return texture;
    }


    var wwLastLines = [],
        wwLastX = 0,
        wwLastY = 0;

    function wordWrap(text, maxWidth, lineHeight, lineSpacing) {
        wwLastLines.length = 0;
        wwLastX = 0;
        wwLastY = lineHeight + lineSpacing;

        var words = text.split(" "),
            line = "",
            word, testLine, testWidth,
            i = 0,
            il = words.length;

        for (; i < il; i++) {
            word = words[i];
            testLine = line + word + " ";
            testWidth = _ctx.measureText(testLine).width;

            if (testWidth > maxWidth && i > 0) {
                wwLastLines.push(line);
                line = word + " ";
                wwLastY += lineHeight + lineSpacing;

                testWidth = _ctx.measureText(line).width;
                wwLastX = testWidth > wwLastX ? testWidth : wwLastX;
            } else {
                line = testLine;
            }
        }
        wwLastLines.push(line);
    }


    var heightCache = {};

    function determineFontHeight(fontStyle) {
        var result = heightCache[fontStyle];

        if (!result) {
            var body = document.body || document.getElementsByTagName("body")[0],
                dummy = document.createElement("div"),
                dummyText = document.createTextNode("M");

            dummy.appendChild(dummyText);
            dummy.setAttribute("style", "font: " + fontStyle + ";font-size:1em;line-height:1;position:absolute;top:0;left:0;padding:0;margin:0;");
            body.appendChild(dummy);

            result = dummy.offsetHeight;
            heightCache[fontStyle] = result;

            body.removeChild(dummy);
        }

        return result;
    }


    function renderMeshFilters(camera, lights, ambient, meshFilters) {
        var components = meshFilters.components,
            meshFilter, transform, i, il;

        for (i = 0, il = components.length; i < il; i++) {
            meshFilter = components[i];
            transform = meshFilter.transform || meshFilter.transform2d;

            if (!transform) continue;

            transform.updateMatrices(camera.view);
            renderMeshFilter(camera, lights, ambient, transform, meshFilter);
        }
    }

    function renderMeshFilter(camera, lights, ambient, transform, meshFilter) {
        var mesh = meshFilter.mesh,
            material = meshFilter.material,
            side, shader;

        if (!mesh || !material) return;

        setBlending(material.blending);

        side = material.side;
        if (side === Side.Front) {
            setCullFace(CullFace.Back);
        } else if (side === Side.Back) {
            setCullFace(CullFace.Front);
        } else if (side === Side.Both) {
            setCullFace();
        }

        createMeshBuffers(mesh);
        shader = createShader(mesh, material, lights);
        shader.bindMaterial(meshFilter, mesh, material, transform, camera, lights, ambient);

        if (!meshFilter._webglMeshInitted) {
            mesh._webglUsed += 1;
            shader.markAsUsed(material);
            meshFilter._webglMeshInitted = true;
        }

        if (material.wireframe) {
            setLineWidth(material.wireframeLineWidth);
            _gl.drawElements(_gl.LINES, mesh._webglLineCount, _gl.UNSIGNED_SHORT, 0);
        } else {
            _gl.drawElements(_gl.TRIANGLES, mesh._webglIndexCount, _gl.UNSIGNED_SHORT, 0);
        }
    }


    function renderSprites(camera, lights, ambient, sprites) {
        var layers = sprites.layers,
            sprite, transform, components, i, il, j, jl;

        for (i = 0, il = layers.length; i < il; i++) {
            components = layers[i];
            if (!components) continue;

            for (j = 0, jl = components.length; j < jl; j++) {
                sprite = components[j];
                transform = sprite.transform || sprite.transform2d;

                if (!transform) continue;

                transform.updateMatrices(camera.view);
                renderSprite(camera, lights, ambient, transform, sprite);
            }
        }
    }

    function renderSprite(camera, lights, ambient, transform, sprite) {
        var material = sprite.material,
            side, shader;

        if (!material) return;
        if (!_spriteBuffers) createSprite();

        setBlending(material.blending);

        side = material.side;
        if (side === Side.Front) {
            setCullFace(CullFace.Back);
        } else if (side === Side.Back) {
            setCullFace(CullFace.Front);
        } else if (side === Side.Both) {
            setCullFace();
        }

        shader = createShader(sprite, material, lights);

        if (!sprite._webglInitted) {
            shader.markAsUsed(material);
            sprite._webglInitted = true;
        }

        shader.bindMaterial(sprite, sprite, material, transform, camera, lights, ambient);

        if (material.wireframe) {
            setLineWidth(material.wireframeLineWidth);
            _gl.drawArrays(_gl.LINE_STRIP, 0, _spriteBuffers._webglVertexCount);
        } else {
            _gl.drawArrays(_gl.TRIANGLE_STRIP, 0, _spriteBuffers._webglVertexCount);
        }
    }


    function renderParticleSystems(camera, lights, ambient, particleSystems) {
        var components = particleSystems.components,
            particleSystem, transform, i, il;

        for (i = 0, il = components.length; i < il; i++) {
            particleSystem = components[i];
            transform = particleSystem.transform || particleSystem.transform2d;

            if (!transform) continue;

            transform.updateMatrices(camera.view);
            renderParticleSystem(camera, lights, ambient, transform, particleSystem);
        }
    }

    function renderParticleSystem(camera, lights, ambient, transform, particleSystem) {
        var emitters = particleSystem.emitters,
            material = particleSystem.material,
            shader, emitter,
            i = emitters.length;

        setCullFace(CullFace.Back);

        while (i--) {
            emitter = emitters[i];

            if (emitter instanceof Emitter) {
                material = emitter.material;
                if (!material) return;

                setBlending(material.blending);
                setCullFace(CullFace.Back);

                createEmitterBuffers(emitter, transform);
                shader = createShader(emitter, material, lights);
                shader.bindMaterial(particleSystem, emitter, material, transform, camera, lights, ambient);

                if (!emitter._webglInitted) {
                    shader.markAsUsed(material);
                    emitter._webglInitted = true;
                }

                _gl.drawArrays(_gl.POINTS, 0, emitter._webglParticleCount);
            } else if (emitter instanceof Emitter2D) {
                material = emitter.material;
                if (!material) return;

                setBlending(material.blending);
                setCullFace(CullFace.Back);

                createEmitter2DBuffers(emitter, transform);
                shader = createShader(emitter, material, lights);
                shader.bindMaterial(particleSystem, emitter, material, transform, camera, lights, ambient);

                if (!emitter._webglInitted) {
                    shader.markAsUsed(material);
                    emitter._webglInitted = true;
                }

                _gl.drawArrays(_gl.POINTS, 0, emitter._webglParticleCount);
            }
        }
    }

    function addSceneEvents(scene) {
        var componentManagers = scene.componentManagers,
            meshFilters = componentManagers.MeshFilter || EMPTY_ARRAY,
            sprites = componentManagers.Sprite || EMPTY_ARRAY,
            particleSystems = componentManagers.ParticleSystem || EMPTY_ARRAY,
            i;

        meshFilters.forEach(onMeshFilterAdd);
        sprites.forEach(onSpriteAdd);
        particleSystems.forEach(onParticleSystemAdd);

        scene.on("addMeshFilter", onMeshFilterAdd);
        scene.on("addSprite", onSpriteAdd);
        scene.on("addParticleSystem", onParticleSystemAdd);
    }

    function removeSceneEvents(scene) {

        scene.off("addMeshFilter", onMeshFilterAdd);
        scene.off("addSprite", onSpriteAdd);
        scene.off("addParticleSystem", onMeshFilterAdd);
    }

    function onMeshFilterAdd(meshFilter) {

        meshFilter.on("remove", onMeshFilterRemove);
    }

    function onSpriteAdd(sprite) {

        sprite.on("remove", onSpriteRemove);
    }

    function onParticleSystemAdd(particleSystem) {

        particleSystem.on("remove", onParticleSystemRemove);
    }

    function onMeshFilterRemove() {
        var mesh = this.mesh;

        deleteMeshBuffers(mesh);
        deleteShader(mesh);

        this.off("remove", onMeshFilterRemove);
    }

    function onSpriteRemove() {

        deleteShader(this);

        this.off("remove", onSpriteRemove);
    }

    function onParticleSystemRemove() {
        var emitters = this.emitters,
            emitter, i = emitters.length;

        while (i--) {
            emitter = emitters[i];

            deleteEmitterBuffers(emitter);
            deleteShader(emitter);
        }

        this.off("remove", onParticleSystemRemove);
    }

    function deleteMeshBuffers(mesh) {
        if (mesh._webglUsed > 1) {
            mesh._webglUsed -= 1;
            return;
        }

        if (mesh._webglVertexBuffer != undefined) _gl.deleteBuffer(mesh._webglVertexBuffer);
        if (mesh._webglNormalBuffer != undefined) _gl.deleteBuffer(mesh._webglNormalBuffer);
        if (mesh._webglTangentBuffer != undefined) _gl.deleteBuffer(mesh._webglTangentBuffer);
        if (mesh._webglColorBuffer != undefined) _gl.deleteBuffer(mesh._webglColorBuffer);
        if (mesh._webglUvBuffer != undefined) _gl.deleteBuffer(mesh._webglUvBuffer);
        if (mesh._webglUv2Buffer != undefined) _gl.deleteBuffer(mesh._webglUv2Buffer);

        if (mesh._webglBoneIndexBuffer != undefined) _gl.deleteBuffer(mesh._webglBoneIndexBuffer);
        if (mesh._webglBoneWeightBuffer != undefined) _gl.deleteBuffer(mesh._webglBoneWeightBuffer);

        if (mesh._webglIndexBuffer != undefined) _gl.deleteBuffer(mesh._webglIndexBuffer);
        if (mesh._webglLineBuffer != undefined) _gl.deleteBuffer(mesh._webglLineBuffer);

        mesh._webglVertexArray = mesh._webglVertexArray = undefined;
        mesh._webglNormalBuffer = mesh._webglNormalArray = undefined;
        mesh._webglTangentBuffer = mesh._webglTangentArray = undefined;
        mesh._webglColorBuffer = mesh._webglColorArray = undefined;
        mesh._webglUvBuffer = mesh._webglUvArray = undefined;
        mesh._webglUv2Buffer = mesh._webglUv2Array = undefined;

        mesh._webglBoneIndexBuffer = mesh._webglBoneIndexArray = undefined;
        mesh._webglBoneWeightBuffer = mesh._webglBoneWeightArray = undefined;

        mesh._webglIndexBuffer = mesh._webglIndexArray = undefined;
        mesh._webglLineBuffer = mesh._webglLineArray = undefined;

        mesh._webglUsed = 0;
    }

    function deleteEmitterBuffers(emitter) {

        if (emitter._webglVertexBuffer != undefined) _gl.deleteBuffer(emitter._webglVertexBuffer);
        if (emitter._webglParticleBuffer != undefined) _gl.deleteBuffer(emitter._webglParticleBuffer);
        if (emitter._webglParticleColorBuffer != undefined) _gl.deleteBuffer(emitter._webglParticleColorBuffer);

        emitter._webglVertexBuffer = emitter._webglVertexArray = undefined;
        emitter._webglParticleBuffer = emitter._webglParticleArray = undefined;
        emitter._webglParticleColorBuffer = emitter._webglParticleColorArray = undefined;
    }

    function addGUIEvents(gui) {
        var componentManagers = gui.componentManagers,
            guiContents = componentManagers.GUIContent;

        if (guiContents) guiContents.forEach(onGUIContentAdd);
        gui.on("addGUIContent", onGUIContentAdd);
    }

    function removeGUIEvents(gui) {

        gui.off("addGUIContent", onGUIContentAdd);
    }

    function onGUIContentAdd(guiContent) {

        guiContent.on("remove", onGUIContentRemove);
    }

    function onGUIContentRemove() {

        deleteShader(this);

        this.off("remove", onGUIContentRemove);
    }

    function deleteShader(obj) {
        var shader = _shaders[obj._id];
        if (!shader) return;
        var material = obj.material || obj.materials,
            i;

        if (material) {
            i = material.length;

            if (i) {
                while (i--) deleteMaterial(material[i]);
            } else {
                deleteMaterial(material);
            }
        }

        if (shader.used > 1) {
            shader.used--;
            return;
        }

        _shaders[obj._id] = undefined;
        if (shader.program) _gl.deleteProgram(shader.program);
    }

    function deleteMaterial(material) {
        var materialUniforms = material.uniforms,
            key;

        for (key in materialUniforms) deleteTexture(materialUniforms[key]);
    }

    function deleteTexture(obj) {
        if (obj instanceof Texture) {
            if (obj._webglUsed > 1) {
                obj._webglUsed -= 1;
                return;
            }

            _gl.deleteTexture(obj._webgl);
            obj._webgl = undefined;
            obj._webglUsed = 0;
        } else if (obj instanceof TextureCube) {
            if (obj._webglUsed > 1) {
                obj._webglUsed -= 1;
                return;
            }

            var j = obj._webgl.length;
            while (j--) {
                _gl.deleteTexture(obj._webgl[j]);
                obj._webgl[j] = undefined;
                obj._webglUsed = 0;
            }
        }
    }

    function createMeshBuffers(mesh) {
        if (!mesh.dynamic && mesh._webglBuffersInitted) return;
        var DRAW = mesh.dynamic ? _gl.DYNAMIC_DRAW : _gl.STATIC_DRAW,
            ARRAY_BUFFER = _gl.ARRAY_BUFFER,
            ELEMENT_ARRAY_BUFFER = _gl.ELEMENT_ARRAY_BUFFER,
            bufferArray, items, item, i, len, offset, vertexIndex;

        items = mesh.vertices || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.verticesNeedUpdate) {
            bufferArray = mesh._webglVertexArray;
            if (!bufferArray || bufferArray.length !== len * 3) {
                bufferArray = mesh._webglVertexArray = new Float32Array(len * 3);
                mesh._webglVertexCount = len;
            }

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 3;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
                bufferArray[offset + 2] = item.z;
            }

            mesh._webglVertexBuffer = mesh._webglVertexBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglVertexBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.verticesNeedUpdate = false;
        }

        items = mesh.normals || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.normalsNeedUpdate) {
            bufferArray = mesh._webglNormalArray;
            if (!bufferArray || bufferArray.length !== len * 3) bufferArray = mesh._webglNormalArray = new Float32Array(len * 3);

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 3;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
                bufferArray[offset + 2] = item.z;
            }

            mesh._webglNormalBuffer = mesh._webglNormalBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglNormalBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.normalsNeedUpdate = false;
        }

        items = mesh.tangents || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.tangentsNeedUpdate) {
            bufferArray = mesh._webglTangentArray;
            if (!bufferArray || bufferArray.length !== len * 4) bufferArray = mesh._webglTangentArray = new Float32Array(len * 4);

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 4;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
                bufferArray[offset + 2] = item.z;
                bufferArray[offset + 3] = item.w;
            }

            mesh._webglTangentBuffer = mesh._webglTangentBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglTangentBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.tangentsNeedUpdate = false;
        }

        items = mesh.indices || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.indicesNeedUpdate) {
            bufferArray = mesh._webglIndexArray;
            if (!bufferArray || bufferArray.length !== len) {
                bufferArray = mesh._webglIndexArray = new Uint16Array(len);
                mesh._webglIndexCount = len;
            }

            i = len;
            while (i--) bufferArray[i] = items[i];

            mesh._webglIndexBuffer = mesh._webglIndexBuffer || _gl.createBuffer();
            _gl.bindBuffer(ELEMENT_ARRAY_BUFFER, mesh._webglIndexBuffer);
            _gl.bufferData(ELEMENT_ARRAY_BUFFER, bufferArray, DRAW);

            bufferArray = mesh._webglLineArray;
            if (!bufferArray || bufferArray.length !== len * 3) {
                bufferArray = mesh._webglLineArray = new Uint16Array(len * 3);
                mesh._webglLineCount = len * 3;
            }

            i = len;
            vertexIndex = offset = 0;
            while (i--) {

                bufferArray[offset] = items[vertexIndex];
                bufferArray[offset + 1] = items[vertexIndex + 1];

                bufferArray[offset + 2] = items[vertexIndex];
                bufferArray[offset + 3] = items[vertexIndex + 2];

                bufferArray[offset + 4] = items[vertexIndex + 1];
                bufferArray[offset + 5] = items[vertexIndex + 2];

                offset += 6;
                vertexIndex += 3;
            }

            mesh._webglLineBuffer = mesh._webglLineBuffer || _gl.createBuffer();
            _gl.bindBuffer(ELEMENT_ARRAY_BUFFER, mesh._webglLineBuffer);
            _gl.bufferData(ELEMENT_ARRAY_BUFFER, bufferArray, DRAW);

            mesh.indicesNeedUpdate = false;
        }

        items = mesh.colors || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.colorsNeedUpdate) {
            bufferArray = mesh._webglColorArray;
            if (!bufferArray || bufferArray.length !== len * 3) bufferArray = mesh._webglColorArray = new Float32Array(len * 3);

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 3;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
                bufferArray[offset + 2] = item.z;
            }

            mesh._webglColorBuffer = mesh._webglColorBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglColorBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.colorsNeedUpdate = false;
        }

        items = mesh.uvs || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.uvsNeedUpdate) {
            bufferArray = mesh._webglUvArray;
            if (!bufferArray || bufferArray.length !== len * 2) bufferArray = mesh._webglUvArray = new Float32Array(len * 2);

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 2;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
            }

            mesh._webglUvBuffer = mesh._webglUvBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglUvBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.uvsNeedUpdate = false;
        }

        items = mesh.uv2s || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.uv2sNeedUpdate) {
            bufferArray = mesh._webglUv2Array;
            if (!bufferArray || bufferArray.length !== len * 2) bufferArray = mesh._webglUv2Array = new Float32Array(len * 2);

            i = len;
            while (i--) {
                item = items[i];
                offset = i * 2;

                bufferArray[offset] = item.x;
                bufferArray[offset + 1] = item.y;
            }

            mesh._webglUv2Buffer = mesh._webglUv2Buffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglUv2Buffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.uvsNeedUpdate = false;
        }

        items = mesh.boneIndices || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.boneIndicesNeedUpdate) {
            bufferArray = mesh._webglBoneIndexArray;
            if (!bufferArray || bufferArray.length !== len) bufferArray = mesh._webglBoneIndexArray = new Float32Array(len);

            i = len;
            while (i--) bufferArray[i] = items[i];

            mesh._webglBoneIndexBuffer = mesh._webglBoneIndexBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglBoneIndexBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.boneIndicesNeedUpdate = false;
        }

        items = mesh.boneWeights || EMPTY_ARRAY;
        len = items.length;
        if (len && mesh.boneWeightsNeedUpdate) {
            bufferArray = mesh._webglBoneWeightArray;
            if (!bufferArray || bufferArray.length !== len) bufferArray = mesh._webglBoneWeightArray = new Float32Array(len);

            i = len;
            while (i--) bufferArray[i] = items[i];

            mesh._webglBoneWeightBuffer = mesh._webglBoneWeightBuffer || _gl.createBuffer();
            _gl.bindBuffer(ARRAY_BUFFER, mesh._webglBoneWeightBuffer);
            _gl.bufferData(ARRAY_BUFFER, bufferArray, DRAW);

            mesh.boneWeightsNeedUpdate = false;
        }

        mesh._webglBuffersInitted = true;
    }


    function createEmitterBuffers(emitter, transform) {
        var MAX = Emitter.MAX_PARTICLES,

            DRAW = _gl.DYNAMIC_DRAW,
            ARRAY_BUFFER = _gl.ARRAY_BUFFER,

            positionArray, dataArray, colorArray,
            positionBuffer, dataBuffer, colorBuffer,

            particles = emitter.particles,
            particle,
            i = 0,
            len = particles.length,
            offset, position, color,
            me, x, y, z,
            m13, m23, m33, m43,
            m14, m24, m34, m44

        if (len) {
            if (emitter.sort) {
                emitter.worldSpace ? _mat4.copy(_projScreenMatrix) : _mat4.mmul(_projScreenMatrix, transform.matrixWorld);
                me = _mat4.elements;
                m13 = me[2];
                m23 = me[6];
                m33 = me[10];
                m43 = me[14];
                m14 = me[3];
                m24 = me[7];
                m34 = me[11];
                m44 = me[15];

                i = len;
                while (i--) {
                    particle = particles[i];
                    position = particle.position;
                    x = position.x;
                    y = position.y;
                    z = position.z;

                    particle.z = (m13 * x + m23 * y + m33 * z + m43) / (m14 * x + m24 * y + m34 * z + m44);
                }

                particles.sort(zSort);
            }

            positionArray = emitter._webglVertexArray || (emitter._webglVertexArray = new Float32Array(MAX * 3));
            dataArray = emitter._webglParticleArray || (emitter._webglParticleArray = new Float32Array(MAX * 3));
            colorArray = emitter._webglParticleColorArray || (emitter._webglParticleColorArray = new Float32Array(MAX * 3));

            i = len;
            while (i--) {
                particle = particles[i];
                position = particle.position;
                color = particle.color;
                offset = i * 3;

                positionArray[offset] = position.x;
                positionArray[offset + 1] = position.y;
                positionArray[offset + 2] = position.z;

                dataArray[offset] = particle.angle;
                dataArray[offset + 1] = particle.size;
                dataArray[offset + 2] = particle.alpha;

                colorArray[offset] = color.r;
                colorArray[offset + 1] = color.g;
                colorArray[offset + 2] = color.b;
            }

            positionBuffer = emitter._webglVertexBuffer || (emitter._webglVertexBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, positionBuffer);
            _gl.bufferData(ARRAY_BUFFER, positionArray, DRAW);

            dataBuffer = emitter._webglParticleBuffer || (emitter._webglParticleBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, dataBuffer);
            _gl.bufferData(ARRAY_BUFFER, dataArray, DRAW);

            colorBuffer = emitter._webglParticleColorBuffer || (emitter._webglParticleColorBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, colorBuffer);
            _gl.bufferData(ARRAY_BUFFER, colorArray, DRAW);
        }

        emitter._webglParticleCount = len;
    }


    function createEmitter2DBuffers(emitter) {
        var MAX = Emitter2D.MAX_PARTICLES,

            DRAW = _gl.DYNAMIC_DRAW,
            ARRAY_BUFFER = _gl.ARRAY_BUFFER,

            positionArray, dataArray, colorArray,
            positionBuffer, dataBuffer, colorBuffer,

            particles = emitter.particles,
            particle,
            i = 0,
            len = particles.length,
            offset, position, color;

        if (len) {
            positionArray = emitter._webglVertexArray || (emitter._webglVertexArray = new Float32Array(MAX * 3));
            dataArray = emitter._webglParticleArray || (emitter._webglParticleArray = new Float32Array(MAX * 3));
            colorArray = emitter._webglParticleColorArray || (emitter._webglParticleColorArray = new Float32Array(MAX * 3));

            i = len;
            while (i--) {
                particle = particles[i];
                position = particle.position;
                color = particle.color;
                offset = i * 3;

                positionArray[offset] = position.x;
                positionArray[offset + 1] = position.y;
                positionArray[offset + 2] = 0.0;

                dataArray[offset] = particle.angle;
                dataArray[offset + 1] = particle.size;
                dataArray[offset + 2] = particle.alpha;

                colorArray[offset] = color.r;
                colorArray[offset + 1] = color.g;
                colorArray[offset + 2] = color.b;
            }

            positionBuffer = emitter._webglVertexBuffer || (emitter._webglVertexBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, positionBuffer);
            _gl.bufferData(ARRAY_BUFFER, positionArray, DRAW);

            dataBuffer = emitter._webglParticleBuffer || (emitter._webglParticleBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, dataBuffer);
            _gl.bufferData(ARRAY_BUFFER, dataArray, DRAW);

            colorBuffer = emitter._webglParticleColorBuffer || (emitter._webglParticleColorBuffer = _gl.createBuffer());
            _gl.bindBuffer(ARRAY_BUFFER, colorBuffer);
            _gl.bufferData(ARRAY_BUFFER, colorArray, DRAW);
        }

        emitter._webglParticleCount = len;
    }


    function zSort(a, b) {

        return b.z - a.z;
    }


    function createShader(obj, material, lights) {
        if (!material.needsUpdate && (_shaders[obj._id])) return _shaders[obj._id];

        var shader = material.shader,
            uniforms = material.uniforms,
            OES_standard_derivatives = !!_extensions.OES_standard_derivatives,
            parameters = {};

        parameters.mobile = Device.mobile;

        if (obj instanceof MeshFilter) {
            parameters.mesh = true;
        } else if (obj instanceof Sprite) {
            parameters.sprite = true;
        } else if (obj instanceof Emitter) {
            parameters.emitter = true;
            parameters.worldSpace = obj.worldSpace;
        } else if (obj instanceof Emitter2D) {
            parameters.emitter = true;
            parameters.emitter2d = true;
            parameters.worldSpace = obj.worldSpace;
        }

        parameters.useLights = shader.lights;
        parameters.useShadows = shader.shadows;
        parameters.useFog = shader.fog;
        parameters.useBones = obj.useBones && obj.bones.length > 0;
        parameters.useVertexLit = shader.vertexLit;
        parameters.useSpecular = shader.specular;

        parameters.useNormal = !!uniforms.normalMap;
        parameters.useBump = !!uniforms.bumpMap;

        parameters.positions = true;
        parameters.normals = parameters.useNormal || (obj.normals && obj.normals.length > 0);
        parameters.tangents = parameters.useNormal || (obj.tangents && obj.tangents.length > 0);
        parameters.uvs = parameters.sprite || (obj.uvs && obj.uvs.length > 0);
        parameters.colors = parameters.sprite || (obj.colors && obj.colors.length > 0);

        parameters.OES_standard_derivatives = OES_standard_derivatives && shader.OES_standard_derivatives;

        if (parameters.useBones) parameters.bones = obj.bones.length;
        allocateLights(lights, parameters);
        allocateShadows(lights, parameters);

        parameters.shadowMapEnabled = _this.shadowMapEnabled && material.receiveShadow && parameters.maxShadows > 0;
        parameters.shadowMapType = _this.shadowMapType;
        parameters.shadowMapDebug = _this.shadowMapDebug;
        parameters.shadowMapCascade = _this.shadowMapCascade;

        material.needsUpdate = false;
        return (_shaders[obj._id] = createShaderProgram(shader.vertex, shader.fragment, parameters));
    }


    function allocateLights(lights, parameters) {
        var maxPointLights = 0,
            maxDirectionalLights = 0,
            maxSpotLights = 0,
            maxHemiLights = 0,
            light, type,
            i = lights.length;

        while (i--) {
            light = lights[i];
            if (!light.visible || light.onlyShadow) continue;
            type = light.type;

            if (type === LightType.Point) {
                maxPointLights++;
            } else if (type === LightType.Directional) {
                maxDirectionalLights++;
            } else if (type === LightType.Spot) {
                maxSpotLights++;
            } else if (type === LightType.Hemi) {
                maxHemiLights++;
            }
        }

        parameters.maxPointLights = maxPointLights;
        parameters.maxDirectionalLights = maxDirectionalLights;
        parameters.maxSpotLights = maxSpotLights;
        parameters.maxHemiLights = maxHemiLights;
    }


    function allocateShadows(lights, parameters) {
        var maxShadows = 0,
            light, type,
            i = lights.length;

        while (i--) {
            light = lights[i];
            if (!light.visible || !light.castShadow) continue;
            type = light.type;

            if (type === LightType.Directional) {
                maxShadows++;
            } else if (type === LightType.Spot) {
                maxShadows++;
            }
        }

        parameters.maxShadows = maxShadows;
    }

    function createShaderProgram(vertexShader, fragmentShader, parameters) {
        var chunks = [],
            key, program, code, key;

        chunks.push(vertexShader, fragmentShader);
        for (key in parameters) chunks.push(key, parameters[key]);

        code = chunks.join();

        for (key in _shaders) {
            program = _shaders[key];

            if (program.code === code) {
                program.used++;
                return program;
            }
        }

        program = new Shader(vertexShader, fragmentShader, parameters, code).buildShader();
        return program;
    }


    var HEADER = /([\s\S]*)?(void[\s]+main)/,
        MAIN_FUNCTION = /void[\s]+main([\s]+)?(\((void)?\))([\s]+)?{([^}]*)}/,
        MAIN_SPLITER = /void[\s]+main([\s]+)?(\((void)?\))([\s]+)?{/;

    function Shader(vertex, fragment, parameters, code) {

        this.vertex = vertex;
        this.fragment = fragment;
        this.parameters = parameters;
        this.code = code;
        this.used = 0;

        this.program = undefined;
        this.attributes = undefined;
        this.uniforms = undefined;
        this._customAttributes = undefined;
        this._customUniforms = undefined;
    }

    Shader.prototype.markAsUsed = function (material) {
        this.used += 1;

        if (material) {
            var uniforms = material.uniforms,
                uniform, key;

            for (key in uniforms) {
                uniform = uniforms[key];

                if (uniform instanceof Texture) {
                    uniform._webglUsed += 1;
                } else if (uniform instanceof TextureCube) {
                    uniform._webglUsed += 1;
                }
            }
        }
    }

    Shader.prototype.bindMaterial = function (component, obj, material, transform, camera, lights, ambient) {
        var program = this.program,
            parameters = this.parameters,
            uniforms = this.uniforms,
            attributes = this.attributes,
            force = setProgram(program),
            sprite = parameters.sprite,
            texture, w, h, i, length, particleSizeRatio, bone, boneTransform, bones, uBonesPos, uBonesScl, uBonesRot;

        if (sprite) {
            if (_lastBuffers !== _spriteBuffers) {
                disableAttributes();

                attributes.position.set(_spriteBuffers._webglVertexBuffer);
                attributes.uv.set(_spriteBuffers._webglUvBuffer);

                if (attributes.normal) attributes.normal.set(_spriteBuffers._webglNormalBuffer);
                if (attributes.tangent) attributes.tangent.set(_spriteBuffers._webglTangentBuffer);

                _lastBuffers = _spriteBuffers;
            }
        } else {
            if (_lastBuffers !== obj) {
                disableAttributes();

                if (obj._webglVertexBuffer && attributes.position) attributes.position.set(obj._webglVertexBuffer);
                if (obj._webglNormalBuffer && attributes.normal) attributes.normal.set(obj._webglNormalBuffer);
                if (obj._webglTangentBuffer && attributes.tangent) attributes.tangent.set(obj._webglTangentBuffer);
                if (obj._webglColorBuffer && attributes.color) attributes.color.set(obj._webglColorBuffer);

                if (obj._webglUvBuffer && attributes.uv) attributes.uv.set(obj._webglUvBuffer);
                if (obj._webglUv2Buffer && attributes.uv2) attributes.uv2.set(obj._webglUv2Buffer);

                if (obj._webglBoneIndexBuffer && attributes.boneIndex) attributes.boneIndex.set(obj._webglBoneIndexBuffer);
                if (obj._webglBoneWeightBuffer && attributes.boneWeight) attributes.boneWeight.set(obj._webglBoneWeightBuffer);

                if (obj._webglParticleBuffer && attributes.data) attributes.data.set(obj._webglParticleBuffer);
                if (obj._webglParticleColorBuffer && attributes.particleColor) attributes.particleColor.set(obj._webglParticleColorBuffer);

                if (material.wireframe) {
                    if (obj._webglLineBuffer) _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, obj._webglLineBuffer);
                } else {
                    if (obj._webglIndexBuffer) _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, obj._webglIndexBuffer);
                }

                _lastBuffers = obj;
            }
        }

        if (sprite) {
            texture = material.uniforms.diffuseMap;
            if (!texture) throw "Shader.bind: Sprite material and shader requires diffuseMap";

            w = texture.invWidth;
            h = texture.invHeight;

            uniforms.size.set(_vector2.set(obj.width, obj.height), force);
            uniforms.crop.set(_vector4.set(obj.x * w, obj.y * h, obj.w * w, obj.h * h), force);
        }

        if (parameters.emitter && parameters.worldSpace) {
            if (uniforms.modelMatrix) uniforms.modelMatrix.set(_mat4.identity(), force);
            if (uniforms.modelViewMatrix) uniforms.modelViewMatrix.set(camera.view, force);
        } else {
            if (uniforms.modelMatrix) uniforms.modelMatrix.set(transform.matrixWorld, force);
            if (uniforms.modelViewMatrix) uniforms.modelViewMatrix.set(transform.modelView, force);
        }
        if (uniforms.particleSizeRatio) {
            particleSizeRatio = (_currentWidth < _currentHeight ? _currentWidth : _currentHeight);

            if (parameters.emitter2d || camera.camera2d || camera.orthographic) {
                particleSizeRatio *= 1.0 / (camera.orthographicSize * 2.0);
            } else {
                particleSizeRatio *= 2.0;
            }

            uniforms.particleSizeRatio.set(particleSizeRatio);
        }

        if (uniforms.projectionMatrix) uniforms.projectionMatrix.set(camera.projection, force);
        if (uniforms.viewMatrix) uniforms.viewMatrix.set(camera.view, force);
        if (uniforms.normalMatrix) uniforms.normalMatrix.set(transform.normalMatrix, force);
        if (uniforms.cameraPosition) uniforms.cameraPosition.set(_vector3.positionFromMat4((camera.transform || camera.transform2d).matrixWorld), force);
        if (uniforms.ambient) uniforms.ambient.set(ambient, force);

        if (parameters.useBones) {
            uBonesPos = uniforms.bonesPos;
            uBonesScl = uniforms.bonesScl;
            uBonesRot = uniforms.bonesRot;
            bones = component._bones;
            i = bones.length;
            while (i--) {
                bone = bones[i];
                boneTransform = bone.transform;
                _mat4.mmul(bone.uniform, bone.bindPose).decompose(_vector3, _vector3_2, _quat);

                uBonesPos[i].set(_vector3);
                uBonesScl[i].set(_vector3_2);
                uBonesRot[i].set(_quat);
            }
        }

        if (force && parameters.useLights && (length = lights.length)) {
            var maxPointLights = parameters.maxPointLights,
                maxDirectionalLights = parameters.maxDirectionalLights,
                maxSpotLights = parameters.maxSpotLights,
                maxHemiLights = parameters.maxHemiLights,

                pointLights = 0,
                pointLightColor = uniforms.pointLightColor,
                pointLightPosition = uniforms.pointLightPosition,
                pointLightDistance = uniforms.pointLightDistance,

                directionalLights = 0,
                directionalLightColor = uniforms.directionalLightColor,
                directionalLightDirection = uniforms.directionalLightDirection,

                spotLights = 0,
                spotLightColor = uniforms.spotLightColor,
                spotLightPosition = uniforms.spotLightPosition,
                spotLightDirection = uniforms.spotLightDirection,
                spotLightDistance = uniforms.spotLightDistance,
                spotLightAngleCos = uniforms.spotLightAngleCos,
                spotLightExponent = uniforms.spotLightExponent,

                hemiLights = 0,
                hemiLightColor = uniforms.hemiLightColor,
                hemiLightDirection = uniforms.hemiLightDirection,

                light, type;

            for (i = 0; i < length; i++) {
                light = lights[i];
                if (!light.visible) continue;

                type = light.type;
                _color.copy(light.color).smul(light.energy);

                if (pointLightColor.length && type === LightType.Point) {
                    if (pointLights >= maxPointLights) continue;

                    _vector3.positionFromMat4((light.transform || light.transform2d).matrixWorld);

                    pointLightColor[pointLights].set(_color, force);
                    pointLightPosition[pointLights].set(_vector3, force);
                    pointLightDistance[pointLights].set(light.distance, force);
                    pointLights++;
                } else if (directionalLightColor.length && type === LightType.Directional) {
                    if (directionalLights >= maxDirectionalLights) continue;

                    _vector3.positionFromMat4((light.transform || light.transform2d).matrixWorld).sub(light.target).normalize();
                    if (_vector3.lengthSq() === 0) continue;

                    directionalLightColor[directionalLights].set(_color, force);
                    directionalLightDirection[directionalLights].set(_vector3, force);
                    directionalLights++;

                } else if (spotLightColor.length && type === LightType.Spot) {
                    if (spotLights >= maxSpotLights) continue;

                    _vector3.positionFromMat4((light.transform || light.transform2d).matrixWorld);
                    if (_vector3.lengthSq() === 0) continue;

                    _vector3_2.copy(_vector3).sub(light.target).normalize();
                    if (_vector3_2.lengthSq() === 0) continue;

                    spotLightColor[spotLights].set(_color, force);
                    spotLightPosition[spotLights].set(_vector3, force);
                    spotLightDirection[spotLights].set(_vector3_2, force);
                    spotLightDistance[spotLights].set(light.distance, force);
                    spotLightAngleCos[spotLights].set(light._angleCos, force);
                    spotLightExponent[spotLights].set(light.exponent, force);
                    spotLights++;

                } else if (hemiLightColor.length && type === LightType.Hemi) {
                    if (hemiLights >= maxHemiLights) continue;

                    _vector3.positionFromMat4((light.transform || light.transform2d).matrixWorld).sub(light.target).normalize();
                    if (_vector3.lengthSq() === 0) continue;

                    hemiLightColor[hemiLights].set(_color, force);
                    hemiLightDirection[hemiLights].set(_vector3, force);
                    hemiLights++;
                }
            }
        }

        bindCustomUniforms(this._customUniforms, uniforms, material.name, material.uniforms, force);
        _textureIndex = 0;
    };

    function bindCustomUniforms(customUniforms, uniforms, materialName, materialUniforms, force) {
        var i = customUniforms.length,
            customUniform, uniformValue, length, name, value, j;

        while (i--) {
            customUniform = customUniforms[i];
            name = customUniform;

            uniformValue = uniforms[name];
            value = materialUniforms[name];

            if (!uniformValue) continue;
            if (!value) throw "WebGLRenderer bindShader: material " + materialName + " was not given a uniform named " + name;

            if ((length = uniformValue.length)) {
                j = length;
                while (j--) uniformValue.set(value[j], force);
            } else {
                uniformValue.set(value, force);
            }
        }
    }

    Shader.prototype.buildShader = function () {
        var parameters = this.parameters,
            vertexShader = this.vertex,
            fragmentShader = this.fragment,
            sprite = parameters.sprite,
            emitter = parameters.emitter,
            useLights = parameters.useLights,
            useShadows = parameters.useShadows,
            useFog = parameters.useFog,
            useBones = parameters.useBones,
            useVertexLit = parameters.useVertexLit,
            useSpecular = parameters.useSpecular,
            OES_standard_derivatives = parameters.OES_standard_derivatives,

            definesPrefix = [
                "precision " + _precision + " float;",
                "precision " + _precision + " int;",

                useFog ? "#define USE_FOG" : "",
                useLights ? "#define USE_LIGHTS" : "",
                useShadows ? "#define USE_SHADOWS" : "",
                useBones ? "#define USE_SKINNING" : "",
                sprite ? "#define IS_SPRITE" : "",

                useLights ? "#define MAX_DIR_LIGHTS " + parameters.maxDirectionalLights : "",
                useLights ? "#define MAX_POINT_LIGHTS " + parameters.maxPointLights : "",
                useLights ? "#define MAX_SPOT_LIGHTS " + parameters.maxSpotLights : "",
                useLights ? "#define MAX_HEMI_LIGHTS " + parameters.maxHemiLights : "",

                useShadows ? "#define MAX_SHADOWS " + parameters.maxShadows : "",
                ""
            ].join("\n"),

            vertexPrefix = [
                definesPrefix,

                "uniform mat4 modelMatrix;",
                "uniform mat4 modelViewMatrix;",
                "uniform mat4 projectionMatrix;",
                "uniform mat4 viewMatrix;",
                "uniform mat3 normalMatrix;",
                "uniform vec3 cameraPosition;",

                parameters.positions ? "attribute vec3 position;" : "",
                parameters.normals ? "attribute vec3 normal;" : "",
                parameters.tangents ? "attribute vec4 tangent;" : "",
                parameters.uvs ? "attribute vec2 uv;" : "",
                parameters.colors ? "attribute vec3 color;" : "",
                emitter ? "attribute vec3 data;" : "",

                useBones ? "attribute vec3 boneIndex;" : "",
                useBones ? "attribute vec3 boneWeight;" : "",
                useBones ? "uniform vec4 bonesRot[" + parameters.bones + "];" : "",
                useBones ? "uniform vec3 bonesScl[" + parameters.bones + "];" : "",
                useBones ? "uniform vec3 bonesPos[" + parameters.bones + "];" : ""
            ].join("\n"),

            fragmentPrefix = [
                OES_standard_derivatives ? "#extension GL_OES_standard_derivatives : enable" : "",
                definesPrefix,

                "uniform mat4 viewMatrix;",
                "uniform vec3 cameraPosition;"
            ].join("\n"),

            glVertexShader = vertexPrefix + "\n" + vertexShader,
            glFragmentShader = fragmentPrefix + "\n" + fragmentShader,

            main = "void main(void) {\n",
            footer = "\n}",

            vertexHeader = glVertexShader.match(HEADER)[1],
            vertexMain = glVertexShader.match(MAIN_FUNCTION)[5],
            fragmentHeader = glFragmentShader.match(HEADER)[1],
            fragmentMain = glFragmentShader.match(MAIN_FUNCTION)[5];

        if (sprite) {
            vertexHeader += ShaderChunks.sprite_header;
            vertexMain += ShaderChunks.sprite_vertex_after;
        }

        if (emitter) {
            vertexHeader += ShaderChunks.particle_header_vertex + ShaderChunks.particle_header;
            fragmentHeader += ShaderChunks.particle_header;
            if (parameters.emitter2d) {
                vertexMain = ShaderChunks.particle_vertex_size_2d + vertexMain;
            } else {
                vertexMain = ShaderChunks.particle_vertex_size + vertexMain;
            }
            vertexMain = ShaderChunks.particle_vertex + vertexMain;
        }

        if (OES_standard_derivatives) {
            if (parameters.useNormal) fragmentHeader += ShaderChunks.perturbNormal2Arb;
            if (parameters.useBump) fragmentHeader += ShaderChunks.dHdxy_fwd + ShaderChunks.perturbNormalArb;
        }

        if (useLights) {
            if (useVertexLit) {
                vertexHeader += ShaderChunks.lights + ShaderChunks.VertexLight;
            } else {
                vertexHeader += ShaderChunks.perPixelVaryingHeader;
                vertexMain = ShaderChunks.perPixelVaryingMain + vertexMain;

                fragmentHeader += ShaderChunks.lights + ShaderChunks.perPixelVaryingHeader;
                if (useSpecular) {
                    fragmentHeader += ShaderChunks.PixelLight;
                } else {
                    fragmentHeader += ShaderChunks.PixelLightNoSpec;
                }
            }

            if (emitter) {
                vertexMain = ShaderChunks.mvPosition_emitter + vertexMain;
                vertexMain = ShaderChunks.worldPosition_emitter + vertexMain;
            } else {
                vertexMain = (sprite ? ShaderChunks.mvPosition_sprite : ShaderChunks.mvPosition) + vertexMain;
                vertexMain = (sprite ? ShaderChunks.worldPosition_sprite : ShaderChunks.worldPosition) + vertexMain;
            }
            if (parameters.normals) vertexMain = ShaderChunks.transformedNormal + vertexMain;
        } else {
            if (emitter) {
                vertexMain = ShaderChunks.mvPosition_emitter + vertexMain;
            } else {
                vertexMain = (sprite ? ShaderChunks.mvPosition_sprite : ShaderChunks.mvPosition) + vertexMain;
            }
        }

        if (useBones) {
            vertexHeader += ShaderChunks.composeMat4;
            vertexHeader += ShaderChunks.getBoneMatrix;
            if (parameters.normals) vertexMain = ShaderChunks.boneNormal + vertexMain;
            vertexMain = ShaderChunks.bone + vertexMain;
        }

        glVertexShader = vertexHeader + main + vertexMain + footer;
        glFragmentShader = fragmentHeader + main + fragmentMain + footer;

        this.program = createProgram(_gl, glVertexShader, glFragmentShader);

        parseUniformsAttributesArrays(vertexShader, fragmentShader, (this._customAttributes = []), (this._customUniforms = []));
        parseUniformsAttributes(this.program, glVertexShader, glFragmentShader, (this.attributes = {}), (this.uniforms = {}));

        return this;
    };


    var useDepth = !opts.disableDepth,

        _this = this,

        _gl = undefined,
        _canvas = undefined,
        _element = undefined,
        _context = false,

        _extensions = undefined,

        _precision = "highp",
        _maxAnisotropy = 0,
        _maxTextures = 0,
        _maxVertexTextures = 0,
        _maxTextureSize = 0,
        _maxCubeTextureSize = 0,
        _maxRenderBufferSize = 0,

        _maxUniforms = 0,
        _maxVaryings = 0,
        _maxAttributes = 0,

        _viewportX = 0,
        _viewportY = 0,
        _viewportWidth = 1,
        _viewportHeight = 1,

        _currentWidth = 1,
        _currentHeight = 1,

        _textureIndex = 0,

        _lastClearColor = new Color,
        _lastClearAlpha = 1,
        _lastBlending = -1,
        _lastCullFace = -1,
        _cullFaceDisabled = true,
        _lastDepthTest = -1,
        _lastDepthWrite = -1,
        _lastLineWidth = -1,

        _currentFramebuffer = null,

        _enabledAttributes = undefined,
        _lastProgram = undefined,

        _attributes = merge(opts.attributes || {}, {
            alpha: true,
            antialias: true,
            depth: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            stencil: true
        });

    this.init = function (canvas) {
        if (_canvas) this.clear();

        _canvas = canvas;
        _element = canvas.element;

        _canvas2d = document.createElement("canvas");
        _ctx = _canvas2d.getContext("2d");

        initGL();
        _context = true;
        setDefaultGLState();

        addEvent(_element, "webglcontextlost", handleWebGLContextLost, this);
        addEvent(_element, "webglcontextrestored", handleWebGLContextRestored, this);

        return this;
    };


    this.clear = function () {
        if (!_canvas) return this;

        this.off();

        removeEvent(element, "webglcontextlost", handleWebGLContextLost, this);
        removeEvent(element, "webglcontextrestored", handleWebGLContextRestored, this);

        _gl = undefined
        _canvas = undefined;
        _element = undefined;
        _context = false;

        _extensions = undefined;

        _precision = "highp";
        _maxAnisotropy = 0;
        _maxTextures = 0;
        _maxVertexTextures = 0;
        _maxTextureSize = 0;
        _maxCubeTextureSize = 0;
        _maxRenderBufferSize = 0;

        _maxUniforms = 0;
        _maxVaryings = 0;
        _maxAttributes = 0;

        _viewportX = 0;
        _viewportY = 0;
        _viewportWidth = 1;
        _viewportHeight = 1;

        _textureIndex = 0;

        _lastClearColor.set(0, 0, 0);
        _lastClearAlpha = 1;
        _lastBlending = -1;
        _lastCullFace = -1;
        _cullFaceDisabled = true;
        _lastDepthTest = -1;
        _lastDepthWrite = -1;
        _lastLineWidth = -1;

        _currentFramebuffer = null;

        _enabledAttributes = undefined;
        _lastProgram = undefined;

        _shaders = {};
        _spriteBuffers = undefined;
        _lastBuffers = undefined;
        _lastCamera = undefined;
        _lastResizeFn = undefined;
        _lastScene = undefined;
        _lastGUI = undefined;

        _textTextures = {};
        _canvas2d = undefined;
        _ctx = undefined;

        _guiContentShader = undefined;
        _guiBuffers = undefined;

        return this;
    };

    defineProperty(this, "gl", {
        get: function () {
            return _gl;
        }
    });
    defineProperty(this, "canvas", {
        get: function () {
            return _canvas;
        }
    });
    defineProperty(this, "element", {
        get: function () {
            return _element;
        }
    });
    defineProperty(this, "precision", {
        get: function () {
            return _precision;
        }
    });
    defineProperty(this, "maxAnisotropy", {
        get: function () {
            return _maxAnisotropy;
        }
    });
    defineProperty(this, "maxTextures", {
        get: function () {
            return _maxTextures;
        }
    });
    defineProperty(this, "maxVertexTextures", {
        get: function () {
            return _maxVertexTextures;
        }
    });
    defineProperty(this, "maxTextureSize", {
        get: function () {
            return _maxTextureSize;
        }
    });
    defineProperty(this, "maxCubeTextureSize", {
        get: function () {
            return _maxCubeTextureSize;
        }
    });
    defineProperty(this, "maxRenderBufferSize", {
        get: function () {
            return _maxRenderBufferSize;
        }
    });
    defineProperty(this, "maxUniforms", {
        get: function () {
            return _maxUniforms;
        }
    });
    defineProperty(this, "maxVaryings", {
        get: function () {
            return _maxVaryings;
        }
    });
    defineProperty(this, "maxAttributes", {
        get: function () {
            return _maxAttributes;
        }
    });

    function createBuffer(obj, name, array) {

        obj[name] = obj[name] || _gl.createBuffer();
        _gl.bindBuffer(_gl.ARRAY_BUFFER, obj[name]);
        _gl.bufferData(_gl.ARRAY_BUFFER, array, _gl.STATIC_DRAW);
    }

    function createSprite() {
        _spriteBuffers = {};

        createBuffer(_spriteBuffers, "_webglVertexBuffer", new Float32Array([-0.5, 0.5, 0.0, -0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
            0.5, -0.5, 0.0
        ]));
        createBuffer(_spriteBuffers, "_webglUvBuffer", new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ]));
        createBuffer(_spriteBuffers, "_webglNormalBuffer", new Float32Array([
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        ]));
        createBuffer(_spriteBuffers, "_webglTangentBuffer", new Float32Array([
            0.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
        ]));
        _spriteBuffers._webglVertexCount = 4;
    }

    function createGUIBuffers() {
        _guiBuffers = {};

        createBuffer(_guiBuffers, "_webglVertexBuffer", new Float32Array([
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0
        ]));
        createBuffer(_guiBuffers, "_webglUvBuffer", new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ]));

        _guiBuffers._webglVertexCount = 4;
    }

    function createGUIContentShader() {
        var shader = _guiContentShader = new Shader,
            header = [
                "precision " + _precision + " float;",
                "precision " + _precision + " int;",
                ""
            ].join("\n"),
            vertexShader = header + guiContent_vertex,
            fragmentShader = header + guiContent_fragment;

        shader.program = createProgram(_gl, vertexShader, fragmentShader);
        parseUniformsAttributes(shader.program, vertexShader, fragmentShader, (shader.attributes = {}), (shader.uniforms = {}));
    }

    function setViewport(x, y, width, height) {
        x || (x = 0);
        y || (y = 0);
        width || (width = _canvas.pixelWidth);
        height || (height = _canvas.pixelHeight);

        if (_viewportX !== x || _viewportY !== y || _viewportWidth !== width || _viewportHeight !== height) {
            _viewportX = x;
            _viewportY = y;
            _viewportWidth = width;
            _viewportHeight = height;

            _gl.viewport(x, y, width, height);
        }
    }

    this.setViewport = setViewport;


    function setDepthTest(depthTest) {

        if (_lastDepthTest !== depthTest) {

            if (depthTest) {
                _gl.enable(_gl.DEPTH_TEST);
            } else {
                _gl.disable(_gl.DEPTH_TEST);
            }

            _lastDepthTest = depthTest;
        }
    }

    this.setDepthTest = setDepthTest;


    function setDepthWrite(depthWrite) {

        if (_lastDepthWrite !== depthWrite) {

            _gl.depthMask(depthWrite);
            _lastDepthWrite = depthWrite;
        }
    }

    this.setDepthWrite = setDepthWrite;


    function setLineWidth(width) {

        if (_lastLineWidth !== width) {

            _gl.lineWidth(width);
            _lastLineWidth = width;
        }
    }

    this.setLineWidth = setLineWidth;


    function setCullFace(cullFace) {

        if (_lastCullFace !== cullFace) {
            if (!_lastCullFace || _lastCullFace === CullFace.None) _cullFaceDisabled = true;

            if (cullFace === CullFace.Front) {
                if (_cullFaceDisabled) _gl.enable(_gl.CULL_FACE);
                _gl.cullFace(_gl.FRONT);
            } else if (cullFace === CullFace.Back) {
                if (_cullFaceDisabled) _gl.enable(_gl.CULL_FACE);
                _gl.cullFace(_gl.BACK);
            } else if (cullFace === CullFace.FrontBack) {
                if (_cullFaceDisabled) _gl.enable(_gl.CULL_FACE);
                _gl.cullFace(_gl.FRONT_AND_BACK);
            } else {
                _gl.disable(_gl.CULL_FACE);
                _lastCullFace = CullFace.None;
                return;
            }

            _lastCullFace = cullFace;
        }
    }

    this.setCullFace = setCullFace;


    function setBlending(blending) {

        if (blending !== _lastBlending) {

            if (blending === Blending.None) {
                _gl.disable(_gl.BLEND);
            } else if (blending === Blending.Additive) {
                _gl.enable(_gl.BLEND);
                _gl.blendEquation(_gl.FUNC_ADD);
                _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
            } else if (blending === Blending.Subtractive) {
                _gl.enable(_gl.BLEND);
                _gl.blendEquation(_gl.FUNC_ADD);
                _gl.blendFunc(_gl.ZERO, _gl.ONE_MINUS_SRC_COLOR);
            } else if (blending === Blending.Muliply) {
                _gl.enable(_gl.BLEND);
                _gl.blendEquation(_gl.FUNC_ADD);
                _gl.blendFunc(_gl.ZERO, _gl.SRC_COLOR);
            } else if (blending === Blending.Default) {
                _gl.enable(_gl.BLEND);
                _gl.blendEquationSeparate(_gl.FUNC_ADD, _gl.FUNC_ADD);
                _gl.blendFuncSeparate(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA);
                _lastBlending = Blending.Default;
                return;
            }

            _lastBlending = blending;
        }
    }

    this.setBlending = setBlending;


    function setScissor(x, y, width, height) {

        _gl.scissor(x, y, width, height);
    };
    this.setScissor = setScissor;


    function setClearColor(color, alpha) {
        alpha || (alpha = 1);

        if (!_lastClearColor.equals(color) || alpha !== _lastClearAlpha) {

            _lastClearColor.copy(color);
            _lastClearAlpha = alpha;

            this.context.clearColor(_lastClearColor.r, _lastClearColor.g, _lastClearColor.b, _lastClearAlpha);
        }
    }

    this.setClearColor = setClearColor;


    function clearCanvas(color, depth, stencil) {
        var bits = 0;

        if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

        _gl.clear(bits);
    }

    this.clearCanvas = clearCanvas;


    function clearColor() {

        _gl.clear(_gl.COLOR_BUFFER_BIT);
    }

    this.clearColor = clearColor;


    function clearDepth() {

        _gl.clear(_gl.DEPTH_BUFFER_BIT);
    }

    this.clearDepth = clearDepth;


    function clearStencil() {

        _gl.clear(_gl.STENCIL_BUFFER_BIT);
    }

    this.clearStencil = clearStencil;


    function setProgram(program) {

        if (_lastProgram !== program) {
            _gl.useProgram(program);
            _lastProgram = program;
            return true;
        }
        return false;
    };
    this.setProgram = setProgram;


    function enableAttribute(attribute) {

        if (_enabledAttributes[attribute] === 0) {
            _gl.enableVertexAttribArray(attribute);
            _enabledAttributes[attribute] = 1;
        }
    };
    this.enableAttribute = enableAttribute;


    function disableAttributes() {
        var i = _maxAttributes;

        while (i--) {

            if (_enabledAttributes[i] === 1) {
                _gl.disableVertexAttribArray(i);
                _enabledAttributes[i] = 0;
            }
        }
    };
    this.disableAttributes = disableAttributes;


    function setTexture(location, texture) {
        if (!texture) return;
        var index, glTexture;

        if (_textureIndex >= _maxTextures) {
            Log.warn("Renderer setTexure: using " + _textureIndex + " texture units, GPU only supports " + _maxTextures);
        }

        if ((!texture.needsUpdate || texture instanceof RenderTarget) && (glTexture = texture._webgl)) {
            index = _textureIndex++;

            _gl.activeTexture(_gl.TEXTURE0 + index);
            _gl.bindTexture(_gl.TEXTURE_2D, glTexture);
            _gl.uniform1i(location, index);

            return;
        }

        if (!texture.raw) return;

        glTexture = texture._webgl || (texture._webgl = _gl.createTexture());
        index = _textureIndex++;

        var raw = texture.raw,
            TFA = _extensions.EXT_texture_filter_anisotropic,

            isPOT = isPowerOfTwo(raw.width) && isPowerOfTwo(raw.height),
            anisotropy = clamp(texture.anisotropy || 1, 1, _maxAnisotropy),

            TEXTURE_2D = _gl.TEXTURE_2D,
            generateMipmap = texture.generateMipmap,
            filter = texture.filter,
            format = texture.format,
            wrap = texture.wrap,
            WRAP, MAG_FILTER, MIN_FILTER, FORMAT;

        if (filter === FilterMode.None) {
            MAG_FILTER = _gl.NEAREST;
            if (generateMipmap && isPOT) {
                MIN_FILTER = _gl.LINEAR_MIPMAP_NEAREST;
            } else {
                MIN_FILTER = _gl.NEAREST;
            }
        } else { //FilterMode.Linear
            MAG_FILTER = _gl.LINEAR;
            if (generateMipmap && isPOT) {
                MIN_FILTER = _gl.LINEAR_MIPMAP_LINEAR;
            } else {
                MIN_FILTER = _gl.LINEAR;
            }
        }

        if (format === TextureFormat.RGB) {
            FORMAT = _gl.RGB;
        } else if (format === TextureFormat.RGBA) {
            FORMAT = _gl.RGBA;
        } else if (format === TextureFormat.LuminanceAlpha) {
            FORMAT = _gl.LUMINANCE_ALPHA;
        } else if (format === TextureFormat.Luminance) {
            FORMAT = _gl.LUMINANCE;
        } else if (format === TextureFormat.Alpha) {
            FORMAT = _gl.ALPHA;
        }

        if (wrap === TextureWrap.Clamp) {
            WRAP = _gl.CLAMP_TO_EDGE;
        } else if (wrap === TextureWrap.MirrorRepeat) {
            WRAP = isPOT ? _gl.MIRRORED_REPEAT : _gl.CLAMP_TO_EDGE;
        } else { //TextureWrap.Repeat
            WRAP = isPOT ? _gl.REPEAT : _gl.CLAMP_TO_EDGE;
        }

        _gl.activeTexture(_gl.TEXTURE0 + index);
        _gl.bindTexture(TEXTURE_2D, glTexture);
        _gl.uniform1i(location, index);

        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY ? 1 : 0);
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha ? 1 : 0);

        _gl.texImage2D(TEXTURE_2D, 0, FORMAT, FORMAT, _gl.UNSIGNED_BYTE, clampToMaxSize(raw, _maxTextureSize));

        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, MAG_FILTER);
        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, MIN_FILTER);

        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_WRAP_S, WRAP);
        _gl.texParameteri(TEXTURE_2D, _gl.TEXTURE_WRAP_T, WRAP);

        if (TFA) _gl.texParameterf(TEXTURE_2D, TFA.TEXTURE_MAX_ANISOTROPY_EXT, anisotropy);
        if (generateMipmap && isPOT) _gl.generateMipmap(TEXTURE_2D);

        texture.needsUpdate = false;
    }

    function setTextureCube(location, cubeTexture) {
        if (!cubeTexture || !cubeTexture.raw) return;
        var glTexture = cubeTexture._webgl,
            index;

        if (_textureIndex >= _maxTextures) {
            Log.warn("Renderer setTextureCube: using " + _textureIndex + " texture units, GPU only supports " + _maxTextures);
            return;
        }

        if (!cubeTexture.needsUpdate && glTexture) {
            index = _textureIndex++;

            _gl.activeTexture(_gl.TEXTURE0 + index);
            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, glTexture);
            _gl.uniform1i(location, index);

            return;
        }

        glTexture = cubeTexture._webgl || (cubeTexture._webgl = _gl.createTexture());
        index = _textureIndex++;

        var raw = cubeTexture.raw,
            TFA = _extensions.EXT_texture_filter_anisotropic,

            first = raw[0],
            isPOT = isPowerOfTwo(first.width) && isPowerOfTwo(first.height),
            anisotropy = clamp(cubeTexture.anisotropy || 1, 1, _maxAnisotropy),

            TEXTURE_CUBE_MAP = _gl.TEXTURE_CUBE_MAP,
            TEXTURE_CUBE_MAP_POSITIVE_X = _gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            UNSIGNED_BYTE = _gl.UNSIGNED_BYTE,

            generateMipmap = cubeTexture.generateMipmap,
            filter = cubeTexture.filter,
            format = cubeTexture.format,
            wrap = cubeTexture.wrap,
            WRAP, MAG_FILTER, MIN_FILTER, FORMAT;

        if (filter === FilterMode.None) {
            MAG_FILTER = _gl.NEAREST;
            if (generateMipmap && isPOT) {
                MIN_FILTER = _gl.LINEAR_MIPMAP_NEAREST;
            } else {
                MIN_FILTER = _gl.NEAREST;
            }
        } else { //FilterMode.Linear
            MAG_FILTER = _gl.LINEAR;
            if (generateMipmap && isPOT) {
                MIN_FILTER = _gl.LINEAR_MIPMAP_LINEAR;
            } else {
                MIN_FILTER = _gl.LINEAR;
            }
        }

        if (format === TextureFormat.RGB) {
            FORMAT = _gl.RGB;
        } else if (format === TextureFormat.RGBA) {
            FORMAT = _gl.RGBA;
        } else if (format === TextureFormat.LuminanceAlpha) {
            FORMAT = _gl.LUMINANCE_ALPHA;
        } else if (format === TextureFormat.Luminance) {
            FORMAT = _gl.LUMINANCE;
        } else if (format === TextureFormat.Alpha) {
            FORMAT = _gl.ALPHA;
        }

        if (wrap === TextureWrap.Clamp) {
            WRAP = _gl.CLAMP_TO_EDGE;
        } else { //TextureWrap.Repeat
            WRAP = isPOT ? _gl.REPEAT : _gl.CLAMP_TO_EDGE;
        }

        _gl.activeTexture(_gl.TEXTURE0 + index);
        _gl.bindTexture(TEXTURE_CUBE_MAP, glTexture);
        _gl.uniform1i(location, index);

        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, cubeTexture.flipY ? 1 : 0);
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, cubeTexture.premultiplyAlpha ? 1 : 0);

        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[0], _maxCubeTextureSize));
        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[1], _maxCubeTextureSize));
        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[2], _maxCubeTextureSize));
        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[3], _maxCubeTextureSize));
        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[4], _maxCubeTextureSize));
        _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, FORMAT, FORMAT, UNSIGNED_BYTE, clampToMaxSize(raw[5], _maxCubeTextureSize));

        _gl.texParameteri(TEXTURE_CUBE_MAP, _gl.TEXTURE_MAG_FILTER, MAG_FILTER);
        _gl.texParameteri(TEXTURE_CUBE_MAP, _gl.TEXTURE_MIN_FILTER, MIN_FILTER);

        _gl.texParameteri(TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_S, WRAP);
        _gl.texParameteri(TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_T, WRAP);

        if (TFA) _gl.texParameterf(TEXTURE_CUBE_MAP, TFA.TEXTURE_MAX_ANISOTROPY_EXT, anisotropy);
        if (generateMipmap && isPOT) _gl.generateMipmap(TEXTURE_CUBE_MAP);

        cubeTexture.needsUpdate = false;
    }


    function clampToMaxSize(image, maxSize) {
        if (image.height <= maxSize && image.width <= maxSize) return image;
        var maxDim = 1 / max(image.width, image.height),
            newWidth = floor(image.width * maxSize * maxDim),
            newHeight = floor(image.height * maxSize * maxDim),
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight);

        Log.once("Renderer clampToMaxSize: image height larger than machines max size (max = " + maxSize + ")");

        return canvas;
    }


    function setRenderTarget(renderTarget) {
        var isRenderTarget = !!renderTarget,
            isCube = renderTarget instanceof RenderTargetCube,
            framebuffer = null,
            width, height, vx, vy;

        if (isRenderTarget && !renderTarget._webglFramebuffer) {
            width = renderTarget.width;
            height = renderTarget.height;
            renderTarget._webgl = _gl.createTexture();

            var TFA = _extensions.EXT_texture_filter_anisotropic,
                isPOT = isPowerOfTwo(width) && isPowerOfTwo(height),
                anisotropy = clamp(renderTarget.anisotropy || 1, 1, _maxAnisotropy),

                GL_TEXTURE_TYPE = isCube ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D,
                UNSIGNED_BYTE = _gl.UNSIGNED_BYTE,
                UNSIGNED_SHORT = _gl.UNSIGNED_SHORT,
                DEPTH_COMPONENT = _gl.DEPTH_COMPONENT,

                generateMipmap = renderTarget.generateMipmap,
                filter = renderTarget.filter,
                format = renderTarget.format,
                wrap = renderTarget.wrap,
                WRAP, MAG_FILTER, MIN_FILTER, FORMAT,
                webglFramebuffer, webglRenderbuffer, depthOnly = renderTarget.depthOnly,
                i;

            if (filter === FilterMode.None) {
                MAG_FILTER = _gl.NEAREST;
                if (generateMipmap && isPOT) {
                    MIN_FILTER = _gl.LINEAR_MIPMAP_NEAREST;
                } else {
                    MIN_FILTER = _gl.NEAREST;
                }
            } else { //FilterMode.Linear
                MAG_FILTER = _gl.LINEAR;
                if (generateMipmap && isPOT) {
                    MIN_FILTER = _gl.LINEAR_MIPMAP_LINEAR;
                } else {
                    MIN_FILTER = _gl.LINEAR;
                }
            }

            if (format === TextureFormat.RGB) {
                FORMAT = _gl.RGB;
            } else if (format === TextureFormat.RGBA) {
                FORMAT = _gl.RGBA;
            } else if (format === TextureFormat.LuminanceAlpha) {
                FORMAT = _gl.LUMINANCE_ALPHA;
            } else if (format === TextureFormat.Luminance) {
                FORMAT = _gl.LUMINANCE;
            } else if (format === TextureFormat.Alpha) {
                FORMAT = _gl.ALPHA;
            }

            if (wrap === TextureWrap.Clamp) {
                WRAP = _gl.CLAMP_TO_EDGE;
            } else if (wrap === TextureWrap.MirrorRepeat) {
                WRAP = isPOT ? _gl.MIRRORED_REPEAT : _gl.CLAMP_TO_EDGE;
            } else { //TextureWrap.Repeat
                WRAP = isPOT ? _gl.REPEAT : _gl.CLAMP_TO_EDGE;
            }

            _gl.bindTexture(GL_TEXTURE_TYPE, renderTarget._webgl);

            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, renderTarget.flipY ? 1 : 0);
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, renderTarget.premultiplyAlpha ? 1 : 0);

            if (isCube) {
                webglFramebuffer = renderTarget._webglFramebuffer = [];
                webglRenderbuffer = renderTarget._webglRenderbuffer = [];

                if (renderTarget.depthOnly) {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_BYTE, null);
                } else {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                }

                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_MAG_FILTER, MAG_FILTER);
                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_MIN_FILTER, MIN_FILTER);

                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_WRAP_S, WRAP);
                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_WRAP_T, WRAP);

                i = 6;
                while (i--) {
                    webglFramebuffer[i] = _gl.createFramebuffer();
                    webglRenderbuffer[i] = _gl.createRenderbuffer();

                    setupFrameBuffer(webglFramebuffer[i], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i);
                    setupRenderBuffer(webglRenderbuffer[i], renderTarget);
                }
            } else {
                renderTarget._webglFramebuffer = _gl.createFramebuffer();
                renderTarget._webglRenderbuffer = _gl.createRenderbuffer();

                if (renderTarget.depthOnly) {
                    _gl.texImage2D(GL_TEXTURE_TYPE, 0, DEPTH_COMPONENT, width, height, 0, DEPTH_COMPONENT, UNSIGNED_SHORT, null);
                } else {
                    _gl.texImage2D(GL_TEXTURE_TYPE, 0, FORMAT, width, height, 0, FORMAT, UNSIGNED_BYTE, null);
                }

                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_MAG_FILTER, MAG_FILTER);
                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_MIN_FILTER, MIN_FILTER);

                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_WRAP_S, WRAP);
                _gl.texParameteri(GL_TEXTURE_TYPE, _gl.TEXTURE_WRAP_T, WRAP);

                setupFrameBuffer(renderTarget._webglFramebuffer, renderTarget, GL_TEXTURE_TYPE);
                setupRenderBuffer(renderTarget._webglRenderbuffer, renderTarget);
            }

            if (TFA) _gl.texParameterf(GL_TEXTURE_TYPE, TFA.TEXTURE_MAX_ANISOTROPY_EXT, anisotropy);
            if (generateMipmap && isPOT) _gl.generateMipmap(GL_TEXTURE_TYPE);

            _gl.bindTexture(GL_TEXTURE_TYPE, null);

            _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
        }

        if (isRenderTarget) {
            if (isCube) {
                framebuffer = renderTarget._webglFramebuffer[renderTarget.activeCubeFace];
            } else {
                framebuffer = renderTarget._webglFramebuffer;
            }

            vx = 0;
            vy = 0;
            width = renderTarget.width;
            height = renderTarget.height;
        } else {
            vx = _viewportX;
            vy = _viewportY;
            width = _viewportWidth;
            height = _viewportHeight;
        }

        if (framebuffer !== _currentFramebuffer) {
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
            setViewport(vx, vy, width, height);

            _currentFramebuffer = framebuffer;
        }

        _currentWidth = width;
        _currentHeight = height;
    }

    this.setRenderTarget = setRenderTarget;


    function setupFrameBuffer(framebuffer, renderTarget, textureTarget) {
        _gl.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
        _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureTarget, renderTarget._webgl, 0);
    }


    function setupRenderBuffer(renderbuffer, renderTarget) {

        _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);

        if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {

            _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
        } else if (!renderTarget.depthBuffer && renderTarget.stencilBuffer) {

            _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
        } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {

            _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
        } else {
            _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height);
        }
    };


    function handleWebGLContextLost(e) {
        e.preventDefault();
        Log.warn("Renderer: webgl context was lost");

        _context = false;
        this.emit("webglcontextlost", e);
    }


    function handleWebGLContextRestored(e) {
        Log.log("Renderer: webgl context was restored");

        initGL();
        setDefaultGLState();

        _context = true;
        this.emit("webglcontextrestored", e);
    }

    function getGPUInfo() {
        var VERTEX_SHADER = _gl.VERTEX_SHADER,
            FRAGMENT_SHADER = _gl.FRAGMENT_SHADER,
            HIGH_FLOAT = _gl.HIGH_FLOAT,
            MEDIUM_FLOAT = _gl.MEDIUM_FLOAT,

            EXT_texture_filter_anisotropic = _extensions.EXT_texture_filter_anisotropic,

            vsHighpFloat = _gl.getShaderPrecisionFormat(VERTEX_SHADER, HIGH_FLOAT),
            vsMediumpFloat = _gl.getShaderPrecisionFormat(VERTEX_SHADER, MEDIUM_FLOAT),

            fsHighpFloat = _gl.getShaderPrecisionFormat(FRAGMENT_SHADER, HIGH_FLOAT),
            fsMediumpFloat = _gl.getShaderPrecisionFormat(FRAGMENT_SHADER, MEDIUM_FLOAT),

            highpAvailable = vsHighpFloat.precision > 0 && fsHighpFloat.precision > 0,
            mediumpAvailable = vsMediumpFloat.precision > 0 && fsMediumpFloat.precision > 0,

            precision = "highp";

        if (!highpAvailable || Device.mobile) {
            if (mediumpAvailable) {
                precision = "mediump";
            } else {
                precision = "lowp";
            }
        }

        _precision = precision;
        _maxAnisotropy = EXT_texture_filter_anisotropic ? _gl.getParameter(EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;
        _maxTextures = _gl.getParameter(_gl.MAX_TEXTURE_IMAGE_UNITS);
        _maxVertexTextures = _gl.getParameter(_gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        _maxTextureSize = _gl.getParameter(_gl.MAX_TEXTURE_SIZE);
        _maxCubeTextureSize = _gl.getParameter(_gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        _maxRenderBufferSize = _gl.getParameter(_gl.MAX_RENDERBUFFER_SIZE);

        _maxUniforms = max(_gl.getParameter(_gl.MAX_FRAGMENT_UNIFORM_VECTORS), _gl.getParameter(_gl.MAX_VERTEX_UNIFORM_VECTORS)) * 4;
        _maxVaryings = _gl.getParameter(_gl.MAX_VARYING_VECTORS) * 4;
        _maxAttributes = _gl.getParameter(_gl.MAX_VERTEX_ATTRIBS);
    }


    function getExtensions() {
        _extensions = {};

        getExtension("EXT_texture_filter_anisotropic");

        getExtension("WEBGL_compressed_texture_s3tc");
        _extensions.WEBGL_compressed_texture_s3tc_formats = _extensions.WEBGL_compressed_texture_s3tc ? _gl.getParameter(_gl.COMPRESSED_TEXTURE_FORMATS) : null;

        getExtension("OES_standard_derivatives");
    }


    var getExtension_prefixes = ["WEBKIT", "MOZ", "O", "MS", "webkit", "moz", "o", "ms"],
        getExtension_length = getExtension_prefixes.length;

    function getExtension(name) {
        var extension = _extensions[name] || (_extensions[name] = _gl.getExtension(name));

        if (extension == undefined) {
            var i = getExtension_length;

            while (i--) {
                if ((extension = _gl.getExtension(getExtension_prefixes[i] + "_" + name))) return (_extensions[name] = extension);
            }
        }

        return extension;
    }

    this.getExtension = getExtension;


    function initGL() {
        _gl = getWebGLContext(_element, _attributes);

        _gl.getShaderPrecisionFormat || (_gl.getShaderPrecisionFormat = function () {
            return {
                rangeMin: 1,
                rangeMax: 1,
                precision: 1
            };
        });

        getExtensions();
        getGPUInfo();

        _enabledAttributes = new Uint8Array(_maxAttributes);
    }


    function setDefaultGLState() {

        _gl.clearColor(0, 0, 0, 1);
        useDepth && _gl.clearDepth(1);
        _gl.clearStencil(0);

        useDepth && setDepthTest(true);
        useDepth && _gl.depthFunc(_gl.LEQUAL);

        _gl.frontFace(_gl.CCW);

        setCullFace(CullFace.Back);
        setBlending(Blending.Default);
        setLineWidth(1);

        setViewport();
    }


    var SHADER_SPLITER = /[\n;]+/,
        ATTRIBURE = /attribute\s+([a-z]+\s+)?([A-Za-z0-9]+)\s+([a-zA-Z_0-9]+)\s*(\[\s*(.+)\s*\])?/,
        UNIFORM = /uniform\s+([a-z]+\s+)?([A-Za-z0-9]+)\s+([a-zA-Z_0-9]+)\s*(\[\s*(.+)\s*\])?/,
        DEFINE = /#define\s+([a-zA-Z_0-9]+)?\s+([0-9]+)?/;

    function parseUniformsAttributesArrays(vertexShader, fragmentShader, attributes, uniforms) {
        var src = vertexShader + fragmentShader,
            lines = src.split(SHADER_SPLITER),
            matchAttributes, matchUniforms,
            i = lines.length,
            line;

        while (i--) {
            line = lines[i];
            matchAttributes = line.match(ATTRIBURE);
            matchUniforms = line.match(UNIFORM);

            if (matchAttributes) {
                attributes.push(matchAttributes[3]);
            } else if (matchUniforms) {
                uniforms.push(matchUniforms[3]);
            }
        }
    }

    this.parseUniformsAttributesArrays = parseUniformsAttributesArrays;

    function parseUniformsAttributes(program, vertexShader, fragmentShader, attributes, uniforms) {
        var src = vertexShader + fragmentShader,
            lines = src.split(SHADER_SPLITER),
            defines = {}, matchAttributes, matchUniforms, matchDefines,
            uniformArray, name, type, location, length, line,
            i, j;

        i = lines.length;
        while (i--) {
            matchDefines = lines[i].match(DEFINE);
            if (matchDefines) defines[matchDefines[1]] = Number(matchDefines[2]);
        }

        i = lines.length;
        while (i--) {
            line = lines[i];
            matchAttributes = line.match(ATTRIBURE);
            matchUniforms = line.match(UNIFORM);

            if (matchAttributes) {
                name = matchAttributes[3];
                attributes[name] = createAttribute(matchAttributes[2], _gl.getAttribLocation(program, name));
            } else if (matchUniforms) {
                type = matchUniforms[2];
                name = matchUniforms[3];
                length = matchUniforms[5];

                if (length) {
                    length = defines[length.trim()] || length;
                    uniformArray = uniforms[name] = [];

                    j = length;
                    while (j--) uniformArray[j] = createUniform(type, _gl.getUniformLocation(program, name + "[" + j + "]"));
                } else {
                    location = _gl.getUniformLocation(program, name);
                    if (location) uniforms[name] = createUniform(type, location);
                }
            }
        }
    }

    this.parseUniformsAttributes = parseUniformsAttributes;


    function createAttribute(type, location) {
        if (location < 0) return null;

        if (type === "int") {
            return new Attribute1i(location);
        } else if (type === "float") {
            return new Attribute1f(location);
        } else if (type === "vec2") {
            return new Attribute2f(location);
        } else if (type === "vec3") {
            return new Attribute3f(location);
        } else if (type === "vec4") {
            return new Attribute4f(location);
        }

        return null;
    };


    function Attribute1i(location) {
        this.location = location;
    }

    Attribute1i.prototype.set = function (value) {
        var location = this.location;

        if (location > -1) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, value);
            enableAttribute(location);
            _gl.vertexAttribPointer(location, 1, _gl.FLOAT, false, 0, 0);
        }
    };

    function Attribute1f(location) {
        this.location = location;
    }

    Attribute1f.prototype.set = function (value) {
        var location = this.location;

        if (location > -1) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, value);
            enableAttribute(location);
            _gl.vertexAttribPointer(location, 1, _gl.FLOAT, false, 0, 0);
        }
    };

    function Attribute2f(location) {
        this.location = location;
    }

    Attribute2f.prototype.set = function (value) {
        var location = this.location;

        if (location > -1) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, value);
            enableAttribute(location);
            _gl.vertexAttribPointer(location, 2, _gl.FLOAT, false, 0, 0);
        }
    };

    function Attribute3f(location) {
        this.location = location;
    }

    Attribute3f.prototype.set = function (value) {
        var location = this.location;

        if (location > -1) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, value);
            enableAttribute(location);
            _gl.vertexAttribPointer(location, 3, _gl.FLOAT, false, 0, 0);
        }
    };

    function Attribute4f(location) {
        this.location = location;
    }

    Attribute4f.prototype.set = function (value) {
        var location = this.location;

        if (location > -1) {
            _gl.bindBuffer(_gl.ARRAY_BUFFER, value);
            enableAttribute(location);
            _gl.vertexAttribPointer(location, 4, _gl.FLOAT, false, 0, 0);
        }
    };


    function createUniform(type, location) {
        if (!location) return null;

        if (type === "int") {
            return new Uniform1i(location);
        } else if (type === "float") {
            return new Uniform1f(location);
        } else if (type === "vec2") {
            return new Uniform2f(location);
        } else if (type === "vec3") {
            return new Uniform3f(location);
        } else if (type === "vec4") {
            return new Uniform4f(location);
        } else if (type === "mat2") {
            return new UniformMatrix2fv(location);
        } else if (type === "mat3") {
            return new UniformMatrix3fv(location);
        } else if (type === "mat4") {
            return new UniformMatrix4fv(location);
        } else if (type === "sampler2D") {
            return new UniformTexture(location);
        } else if (type === "samplerCube") {
            return new UniformTextureCube(location);
        }

        return null;
    }

    function Uniform1f(location) {
        this.location = location;
        this.value = undefined;
    }

    Uniform1f.prototype.set = function (value, force) {
        if (force || this.value !== value) {
            _gl.uniform1f(this.location, value);
            this.value = value;
        }
    };

    function Uniform1i(location) {
        this.location = location;
        this.value = undefined;
    }

    Uniform1i.prototype.set = function (value, force) {
        if (force || this.value !== value) {
            _gl.uniform1i(this.location, value);
            this.value = value;
        }
    };

    function Uniform2f(location) {
        this.location = location;
        this.value = new Vec2(NaN, NaN);
    }

    Uniform2f.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniform2f(this.location, value.x, value.y);
            this.value.copy(value);
        }
    };

    function Uniform3f(location) {
        this.location = location;
        this.value = new Vec3(NaN, NaN, NaN);
    }

    Uniform3f.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniform3f(this.location, value.x, value.y, value.z);
            this.value.copy(value);
        }
    };

    function Uniform4f(location) {
        this.location = location;
        this.value = new Vec4(NaN, NaN, NaN, NaN);
    }

    Uniform4f.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniform4f(this.location, value.x, value.y, value.z, value.w);
            this.value.copy(value);
        }
    };

    function UniformMatrix2fv(location) {
        this.location = location;
        this.value = new Mat2(
            NaN, NaN,
            NaN, NaN
        );
    }

    UniformMatrix2fv.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniformMatrix2fv(this.location, false, value.elements);
            this.value.copy(value);
        }
    };

    function UniformMatrix3fv(location) {
        this.location = location;
        this.value = new Mat3(
            NaN, NaN, NaN,
            NaN, NaN, NaN,
            NaN, NaN, NaN
        );
    }

    UniformMatrix3fv.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniformMatrix3fv(this.location, false, value.elements);
            this.value.copy(value);
        }
    };

    function UniformMatrix4fv(location) {
        this.location = location;
        this.value = new Mat4(
            NaN, NaN, NaN, NaN,
            NaN, NaN, NaN, NaN,
            NaN, NaN, NaN, NaN,
            NaN, NaN, NaN, NaN
        );
    }

    UniformMatrix4fv.prototype.set = function (value, force) {
        if (force || this.value.notEquals(value)) {
            _gl.uniformMatrix4fv(this.location, false, value.elements);
            this.value.copy(value);
        }
    };

    function UniformTexture(location) {
        this.location = location;
    }

    UniformTexture.prototype.set = function (value) {
        setTexture(this.location, value);
    };

    function UniformTextureCube(location) {
        this.location = location;
    }

    UniformTextureCube.prototype.set = function (value) {
        setTextureCube(this.location, value);
    };
}

EventEmitter.extend(Renderer);


var guiContent_vertex = [
    "attribute vec3 position;",
    "attribute vec2 uv;",

    "uniform mat4 mvpMatrix;",
    "uniform vec2 size;",
    "uniform vec4 crop;",

    "varying vec2 vUv;",

    "void main() {",
    "	vUv.x = uv.x * crop.z + crop.x;",
    "	vUv.y = uv.y * crop.w + crop.y;",
    "	gl_Position = mvpMatrix * vec4(position.xy * size, position.z, 1.0);",
    "}"
].join("\n");

var guiContent_fragment = [
    "uniform sampler2D texture;",
    "uniform float alpha;",

    "varying vec2 vUv;",

    "void main() {",
    "	vec4 finalColor = texture2D(texture, vUv);",
    "	gl_FragColor = vec4(finalColor.xyz, finalColor.w * alpha);",
    "}"
].join("\n");


module.exports = Renderer;

},{"../../base/config":9,"../../base/device":10,"../../base/dom":11,"../../base/event_emitter":13,"../../base/log":14,"../../base/util":19,"../../math/color":102,"../../math/mat2":103,"../../math/mat3":104,"../../math/mat4":106,"../../math/mathf":107,"../../math/quat":108,"../../math/rect":109,"../../math/rect_offset":110,"../../math/vec2":111,"../../math/vec3":112,"../../math/vec4":113,"../assets/texture":38,"../assets/texture_cube":39,"../components/mesh_filter":60,"../components/particle_system/emitter":62,"../components/particle_system/emitter_2d":63,"../components/sprite":69,"../enums":73,"./render_target":93,"./render_target_cube":94,"./shader_chunks":96}],96:[function(require,module,exports){
"use strict";


var ShaderChunks = {
    dHdxy_fwd: [
        "vec2 dHdxy_fwd(sampler2D map, vec2 uv, float scale) {",

        "	vec2 dSTdx = dFdx(uv);",
        "	vec2 dSTdy = dFdy(uv);",

        "	float Hll = scale * texture2D(map, uv).x;",
        "	float dBx = scale * texture2D(map, uv + dSTdx).x - Hll;",
        "	float dBy = scale * texture2D(map, uv + dSTdy).x - Hll;",

        "	return vec2(dBx, dBy);",
        "}",
        ""
    ].join("\n"),

    perturbNormalArb: [
        "vec3 perturbNormalArb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy) {",

        "	vec3 vSigmaX = dFdx(surf_pos);",
        "	vec3 vSigmaY = dFdy(surf_pos);",
        "	vec3 vN = surf_norm;",

        "	vec3 R1 = cross(vSigmaY, vN);",
        "	vec3 R2 = cross(vN, vSigmaX);",

        "	float fDet = dot(vSigmaX, R1);",
        "	vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);",

        "	return normalize(abs(fDet) * surf_norm - vGrad);",
        "}",
        ""
    ].join("\n"),

    perturbNormal2Arb: [
        "vec3 perturbNormal2Arb(sampler2D map, vec2 uv, vec3 eye_pos, vec3 surf_norm, float scale) {",

        "	vec3 q0 = dFdx(eye_pos.xyz);",
        "	vec3 q1 = dFdy(eye_pos.xyz);",
        "	vec2 st0 = dFdx(uv.st);",
        "	vec2 st1 = dFdy(uv.st);",

        "	vec3 S = normalize(q0 * st1.t - q1 * st0.t);",
        "	vec3 T = normalize(-q0 * st1.s + q1 * st0.s);",
        "	vec3 N = normalize(surf_norm);",

        "	vec3 mapN = texture2D(map, uv).xyz * 2.0 - 1.0;",
        "	mapN.xy = scale * mapN.xy;",
        "	mat3 tsn = mat3(S, T, N);",

        "	return normalize(tsn * mapN);",
        "}",
        ""
    ].join("\n"),

    composeMat4: [
        "mat4 composeMat4(vec3 position, vec3 scale, vec4 rotation) {",
        "	mat4 mat;",
        "	float x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w,",

        "		x2 = x + x, y2 = y + y, z2 = z + z,",
        "		xx = x * x2, xy = x * y2, xz = x * z2,",
        "		yy = y * y2, yz = y * z2, zz = z * z2,",
        "		wx = w * x2, wy = w * y2, wz = w * z2,",

        "		sx = scale.x, sy = scale.y, sz = scale.z;",

        "	mat[0][0] = (1.0 - (yy + zz)) * sx;",
        "	mat[1][0] = (xy - wz) * sy;",
        "	mat[2][0] = (xz + wy) * sz;",

        "	mat[0][1] = (xy + wz) * sx;",
        "	mat[1][1] = (1.0 - (xx + zz)) * sy;",
        "	mat[2][1] = (yz - wx) * sz;",

        "	mat[0][2] = (xz - wy) * sx;",
        "	mat[1][2] = (yz + wx) * sy;",
        "	mat[2][2] = (1.0 - (xx + yy)) * sz;",

        "	mat[0][3] = 0.0;",
        "	mat[1][3] = 0.0;",
        "	mat[2][3] = 0.0;",

        "	mat[3][0] = position.x;",
        "	mat[3][1] = position.y;",
        "	mat[3][2] = position.z;",
        "	mat[3][3] = 1.0;",

        "	return mat;",
        "}",
        ""
    ].join("\n"),

    getBoneMatrix: [
        "#ifdef USE_SKINNING",
        "mat4 getBoneMatrix() {",
        "	mat4 result = boneWeight.x * composeMat4(bonesPos[int(boneIndex.x)], bonesScl[int(boneIndex.x)], bonesRot[int(boneIndex.x)]);",
        "	result = result + boneWeight.y * composeMat4(bonesPos[int(boneIndex.y)], bonesScl[int(boneIndex.y)], bonesRot[int(boneIndex.y)]);",
        "	result = result + boneWeight.z * composeMat4(bonesPos[int(boneIndex.z)], bonesScl[int(boneIndex.z)], bonesRot[int(boneIndex.z)]);",
        "	return result;",
        "}",
        "#endif",
        ""
    ].join("\n"),

    bone: [
        "	#ifdef USE_SKINNING",
        "		mat4 boneMatrix = getBoneMatrix();",

        "		#ifdef USE_MORPHTARGETS",
        "			vec4 boneVertex = vec4( morphed, 1.0 );",
        "		#else",
        "			vec4 boneVertex = vec4( position, 1.0 );",
        "		#endif",

        "		vec4 bone = boneMatrix * boneVertex;",
        "	#endif",
        ""
    ].join("\n"),

    boneNormal: [
        "	#ifdef USE_SKINNING",
        "		#ifdef USE_MORPHNORMALS",
        "			vec4 boneNormal = boneMatrix * vec4( morphedNormal, 0.0 );",
        "		#else",
        "			vec4 boneNormal = boneMatrix * vec4( normal, 0.0 );",
        "		#endif",
        "	#endif",
        ""
    ].join("\n"),

    transformedNormal: [
        "	#ifdef USE_SKINNING",
        "	vec3 objectNormal = boneNormal.xyz;",
        "	#endif",

        "	#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )",
        "	vec3 objectNormal = morphedNormal;",
        "	#endif",

        "	#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )",
        "	vec3 objectNormal = normal;",
        "	#endif",

        "	vec3 transformedNormal = normalMatrix * objectNormal;",
        ""
    ].join("\n"),

    worldPosition: [
        "	#ifdef USE_SKINNING",
        "	vec4 worldPosition = modelMatrix * bone;",
        "	#endif",

        "	#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )",
        "	vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );",
        "	#endif",

        "	#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )",
        "	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
        "	#endif",
        ""
    ].join("\n"),

    worldPosition_sprite: [
        "	vec4 worldPosition = modelMatrix * vec4( position.xy * size, position.z, 1.0 );",
        ""
    ].join("\n"),

    worldPosition_emitter: [
        "	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
        ""
    ].join("\n"),

    mvPosition: [
        "	#ifdef USE_SKINNING",
        "	vec4 mvPosition = modelViewMatrix * bone;",
        "	#endif",

        "	#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )",
        "	vec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );",
        "	#endif",

        "	#if !defined( USE_SKINNING ) && !defined( USE_MORPHTARGETS )",
        "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        "	#endif",
        ""
    ].join("\n"),

    mvPosition_sprite: [
        "	vec4 mvPosition = modelViewMatrix * vec4( position.xy * size, position.z, 1.0 );",
        ""
    ].join("\n"),

    mvPosition_emitter: [
        "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        ""
    ].join("\n"),

    particle_header_vertex: [
        "attribute vec3 particleColor;",
        "uniform float particleSizeRatio;",
        ""
    ].join("\n"),

    particle_header: [
        "varying float vAngle;",
        "varying float vAlpha;",
        "varying float vSize;",
        "varying vec3 vParticleColor;",
        ""
    ].join("\n"),

    particle_vertex: [
        "	vAngle = data.x;",
        "	vAlpha = data.z;",
        "	vSize = data.y;",
        "	vParticleColor = particleColor;",
        ""
    ].join("\n"),

    particle_vertex_size: [
        "	gl_PointSize = vSize * (particleSizeRatio / length(mvPosition.xyz));\n",
        ""
    ].join("\n"),

    particle_vertex_size_2d: [
        "	gl_PointSize = vSize * particleSizeRatio;\n",
        ""
    ].join("\n"),

    sprite_header: [
        "uniform vec2 size;",
        "uniform vec4 crop;",
        ""
    ].join("\n"),

    sprite_vertex_after: [
        "	vUv.x = vUv.x * crop.z + crop.x;",
        "	vUv.y = vUv.y * crop.w + crop.y;",
        ""
    ].join("\n"),

    lights: [
        "uniform vec3 ambient;",

        "#if MAX_DIR_LIGHTS > 0",

        "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
        "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

        "#endif",

        "#if MAX_HEMI_LIGHTS > 0",

        "uniform vec3 hemiLightColor[ MAX_HEMI_LIGHTS ];",
        "uniform vec3 hemiLightDirection[ MAX_HEMI_LIGHTS ];",

        "#endif",

        "#if MAX_POINT_LIGHTS > 0",

        "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
        "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
        "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

        "#endif",

        "#if MAX_SPOT_LIGHTS > 0",

        "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
        "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
        "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
        "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",
        "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];",
        "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",

        "#endif",
        ""
    ].join("\n"),

    VertexLight: [
        "void VertexLight(vec3 normal, vec3 worldPosition, vec3 viewPosition, inout vec3 diffuseLight) {",

        "	#if MAX_DIR_LIGHTS > 0",
        "		for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
        "			vec3 dirVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, dirVector );",
        "			vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += directionalLightColor[ i ] * directionalLightWeighting;",
        "		}",
        "	#endif",

        "	#if MAX_POINT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + viewPosition;",

        "			float lDistance = 1.0;",
        "			if ( pointLightDistance[ i ] > 0.0 ) {",
        "				lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",
        "			}",

        "			lVector = normalize( lVector );",
        "			float dotProduct = dot( normal, lVector );",

        "			vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += pointLightColor[ i ] * pointLightWeighting * lDistance;",
        "		}",
        "	#endif",

        "	#if MAX_SPOT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + viewPosition;",

        "			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition ) );",

        "			if ( spotEffect > spotLightAngleCos[ i ] ) {",

        "				spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

        "				float lDistance = 1.0;",
        "				if ( spotLightDistance[ i ] > 0.0 ) {",
        "					lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",
        "				}",

        "				lVector = normalize( lVector );",

        "				float dotProduct = dot( normal, lVector );",
        "				vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "				diffuseLight += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;",
        "			}",

        "		}",
        "	#endif",

        "	#if MAX_HEMI_LIGHTS > 0",
        "		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( hemiLightDirection[ i ], 0.0 );",
        "			vec3 lVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, lVector );",
        "			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",

        "			diffuseLight += hemiLightColor[ i ] * hemiDiffuseWeight;",
        "		}",
        "	#endif",

        "	diffuseLight += ambient;",
        "}",
        ""
    ].join("\n"),

    perPixelVaryingHeader: [
        "varying vec3 vWorldPosition;",
        "varying vec3 vViewPosition;",
        "varying vec3 vNormal;",
        ""
    ].join("\n"),

    perPixelVaryingMain: [
        "	vWorldPosition = worldPosition.xyz;",
        "	vViewPosition = -mvPosition.xyz;",
        "	vNormal = transformedNormal;",
    ].join("\n"),

    PixelLight: [
        "void PixelLight(vec3 normal, vec3 specularColor, float specularStrength, float shininess, inout vec3 diffuseLight, inout vec3 specularLight) {",
        "	#if MAX_DIR_LIGHTS > 0",
        "		for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
        "			vec3 dirVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, dirVector );",
        "			vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += directionalLightColor[ i ] * directionalLightWeighting;",

        "			vec3 dirHalfVector = normalize( dirVector + vViewPosition );",
        "			float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
        "			float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );",
        "			float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

        "			vec3 schlick = specularColor + vec3( 1.0 - specularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
        "			specularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * directionalLightWeighting * specularNormalization;",
        "		}",
        "	#endif",

        "	#if MAX_POINT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + vViewPosition;",

        "			float lDistance = 1.0;",
        "			if ( pointLightDistance[ i ] > 0.0 ) {",
        "				lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",
        "			}",

        "			lVector = normalize( lVector );",
        "			float dotProduct = dot( normal, lVector );",

        "			vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += pointLightColor[ i ] * pointLightWeighting * lDistance;",

        "			vec3 pointHalfVector = normalize( lVector + vViewPosition );",
        "			float pointDiffuseWeight = max( dotProduct, 0.0 );",
        "			float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
        "			float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );",

        "			float specularNormalization = ( shininess + 2.0001 ) / 8.0;",
        "			vec3 schlick = specularColor + vec3( 1.0 - specularColor ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );",
        "			specularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;",
        "		}",
        "	#endif",

        "	#if MAX_SPOT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + vViewPosition;",

        "			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

        "			if ( spotEffect > spotLightAngleCos[ i ] ) {",

        "				spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

        "				float lDistance = 1.0;",
        "				if ( spotLightDistance[ i ] > 0.0 ) {",
        "					lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",
        "				}",

        "				lVector = normalize( lVector );",

        "				float dotProduct = dot( normal, lVector );",
        "				vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "				diffuseLight += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;",

        "				vec3 spotHalfVector = normalize( lVector + vViewPosition );",
        "				float spotDiffuseWeight = max( dotProduct, 0.0 );",
        "				float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );",
        "				float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );",

        "				float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

        "				vec3 schlick = specularColor + vec3( 1.0 - specularColor ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );",
        "				specularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;",
        "			}",

        "		}",
        "	#endif",

        "	#if MAX_HEMI_LIGHTS > 0",
        "		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( hemiLightDirection[ i ], 0.0 );",
        "			vec3 lVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, lVector );",

        "			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",
        "			float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;",

        "			diffuseLight += hemiLightColor[ i ] * hemiDiffuseWeight;",

        "			vec3 hemiHalfVector = normalize( lVector + vViewPosition );",
        "			float hemiDotNormalHalf = max( dot( normal, hemiHalfVector ), 0.0 );",
        "			float hemiSpecularWeight = specularStrength * max( pow( hemiDotNormalHalf, shininess ), 0.0 );",

        "			float specularNormalization = ( shininess + 2.0001 ) / 8.0;",
        "			vec3 schlick = specularColor + vec3( 1.0 - specularColor ) * pow( 1.0 - dot( lVector, hemiHalfVector ), 5.0 );",
        "			specularLight += schlick * hemiLightColor[ i ] * hemiSpecularWeight * hemiDiffuseWeight * specularNormalization;",
        "		}",
        "	#endif",

        "	diffuseLight += ambient;",
        "}",
        ""
    ].join("\n"),

    PixelLightNoSpec: [
        "vec3 PixelLightNoSpec(vec3 normal) {",
        "	vec3 diffuseLight;",

        "	#if MAX_DIR_LIGHTS > 0",
        "		for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
        "			vec3 dirVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, dirVector );",
        "			vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += directionalLightColor[ i ] * directionalLightWeighting;",
        "		}",
        "	#endif",

        "	#if MAX_POINT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + vViewPosition;",

        "			float lDistance = 1.0;",
        "			if ( pointLightDistance[ i ] > 0.0 ) {",
        "				lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",
        "			}",

        "			lVector = normalize( lVector );",
        "			float dotProduct = dot( normal, lVector );",

        "			vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "			diffuseLight += pointLightColor[ i ] * pointLightWeighting * lDistance;",
        "		}",
        "	#endif",

        "	#if MAX_SPOT_LIGHTS > 0",
        "		for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
        "			vec3 lVector = lPosition.xyz + vViewPosition;",

        "			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

        "			if ( spotEffect > spotLightAngleCos[ i ] ) {",

        "				spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

        "				float lDistance = 1.0;",
        "				if ( spotLightDistance[ i ] > 0.0 ) {",
        "					lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",
        "				}",

        "				lVector = normalize( lVector );",

        "				float dotProduct = dot( normal, lVector );",
        "				vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "				diffuseLight += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;",
        "			}",

        "		}",
        "	#endif",

        "	#if MAX_HEMI_LIGHTS > 0",
        "		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

        "			vec4 lDirection = viewMatrix * vec4( hemiLightDirection[ i ], 0.0 );",
        "			vec3 lVector = normalize( lDirection.xyz );",

        "			float dotProduct = dot( normal, lVector );",

        "			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",
        "			float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;",

        "			diffuseLight += hemiLightColor[ i ] * hemiDiffuseWeight;",
        "		}",
        "	#endif",

        "	diffuseLight += ambient;",

        "	return diffuseLight;",
        "}",
        ""
    ].join("\n")
};


module.exports = ShaderChunks;

},{}],97:[function(require,module,exports){
var Class = require("../base/class");
var GameObject = require("./game_object");
var ComponentManager = require("./component_managers/component_manager");
var World = require("./world/world");
var Log = require("./../base/log");
"use strict";


/**
 * Scenes manage GameObjects and their Components
 * @class Odin.Scene
 * @extends Odin.Class
 * @param Object options
 */
function Scene(opts) {
    opts || (opts = {});

    Class.call(this);

    this.game = undefined;

    this.name = opts.name != undefined ? opts.name : "Scene_" + this._id;

    this.world = undefined;

    this.gameObjects = [];
    this._gameObjectHash = {};
    this._gameObjectJSONHash = {};

    this.componentManagers = {};
    this._componentManagerTypes = [];
    this._componentHash = {};
    this._componentJSONHash = {};

    this.setWorld(opts.world instanceof World ? opts.world : new World(opts.world));
    if (opts.gameObjects) this.addGameObjects.apply(this, opts.gameObjects);
}

Class.extend(Scene);


Scene.prototype.copy = function (other) {
    var otherGameObjects = other.gameObjects,
        i = otherGameObjects.length;

    this.clear();
    this.name = other.name + "." + this._id;

    while (i--) this.addGameObject(otherGameObjects[i].clone());

    return this;
};


Scene.prototype.init = function () {
    var gameObjects = this.gameObjects,
        i, il;

    this.world && this.world.init();

    for (i = 0, il = gameObjects.length; i < il; i++) gameObjects[i].emit("init");
};


Scene.prototype.start = function () {
    var componentManagerTypes = this._componentManagerTypes,
        gameObjects = this.gameObjects,
        i, il;

    this.world && this.world.start();

    for (i = 0, il = componentManagerTypes.length; i < il; i++) componentManagerTypes[i].start();
    for (i = 0, il = gameObjects.length; i < il; i++) gameObjects[i].emit("start");
};


Scene.prototype.update = function () {
    var componentManagerTypes = this._componentManagerTypes,
        componentManagerType, i, il;

    this.world && this.world.update();

    for (i = 0, il = componentManagerTypes.length; i < il; i++) {
        if ((componentManagerType = componentManagerTypes[i])) componentManagerType.update();
    }
};


Scene.prototype.clear = function () {
    var gameObjects = this.gameObjects,
        i = gameObjects.length;

    this.removeWorld();
    while (i--) this.removeGameObject(gameObjects[i], true);

    this.off();

    return this;
};


Scene.prototype.destroy = function () {

    this.emit("destroy");
    this.clear();

    return this;
};


Scene.prototype.setWorld = function (world) {
    if (this.world) this.removeWorld();

    world.scene = this;
    this.world = world;

    if (this.game) world.init();

    return this;
};


Scene.prototype.removeWorld = function () {
    if (!this.world) return this;
    var world = this.world;

    world.scene = undefined;
    this.world = undefined;

    return this;
};


Scene.prototype.addGameObject = function (gameObject) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Scene.addGameObject: can't add argument to Scene, it's not an instance of GameObject");
        return this;
    }
    var gameObjects = this.gameObjects,
        index = gameObjects.indexOf(gameObject),
        components, transform, children, child,
        i;

    if (index === -1) {
        if (gameObject.scene) gameObject.scene.removeGameObject(gameObject);

        gameObjects.push(gameObject);
        this._gameObjectHash[gameObject._id] = gameObject;
        if (gameObject._jsonId !== -1) this._gameObjectJSONHash[gameObject._jsonId] = gameObject;

        gameObject.scene = this;

        components = gameObject.components;
        i = components.length;
        while (i--) this._addComponent(components[i]);

        if ((transform = gameObject.transform || gameObject.transform2d)) {
            i = (children = transform.children).length;

            while (i--) {
                if ((child = children[i].gameObject) && !this.hasGameObject(child)) {
                    this.addGameObject(child);
                }
            }
        }

        if (this.game) gameObject.emit("init");
        this.emit("addGameObject", gameObject);
    } else {
        Log.error("Scene.addGameObject: GameObject is already a member of Scene");
    }

    return this;
};


Scene.prototype.addGameObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.addGameObject(arguments[i]);
    return this;
};


Scene.prototype._addComponent = function (component) {
    if (!component) return;
    var type = component._type,
        componentManagers = this.componentManagers,
        componentManager = componentManagers[type],
        componentManagerTypes = this._componentManagerTypes,
        isNew = !componentManager;

    if (isNew) {
        componentManager = componentManagers[type] = new (Class._classes[type + "ComponentManager"] || ComponentManager);
        componentManagerTypes.push(componentManager);
        componentManagerTypes.sort(sortComponentManagerTypes);
        componentManager.scene = this;
    }

    componentManager.add(component);
    componentManager.sort();

    this._componentHash[component._id] = component;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

    this.emit("add" + type, component);
    this.emit("addComponent", component);

    if (this.game) {
        component.start();
        component.emit("start");
    }
};


function sortComponentManagerTypes(a, b) {

    return a.order - b.order;
}


Scene.prototype.removeGameObject = function (gameObject, clear) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Scene.removeGameObject: can't remove argument from Scene, it's not an instance of GameObject");
        return this;
    }
    var gameObjects = this.gameObjects,
        index = gameObjects.indexOf(gameObject),
        components, transform, children, child,
        i;

    if (index !== -1) {

        gameObjects.splice(index, 1);
        this._gameObjectHash[gameObject._id] = undefined;
        if (gameObject._jsonId !== -1) this._gameObjectJSONHash[gameObject._jsonId] = undefined;

        gameObject.scene = undefined;

        components = gameObject.components;
        i = components.length;
        while (i--) this._removeComponent(components[i], clear);

        if ((transform = gameObject.transform || gameObject.transform2d)) {
            i = (children = transform.children).length;

            while (i--) {
                if ((child = children[i].gameObject) && this.hasGameObject(child)) {
                    this.removeGameObject(child);
                }
            }
        }

        this.emit("removeGameObject", gameObject);
        gameObject.emit("remove", gameObject);
        if (clear) gameObject.clear();
    } else {
        Log.error("Scene.removeGameObject: GameObject is not a member of Scene");
    }

    return this;
};


Scene.prototype.removeGameObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.removeGameObject(arguments[i]);
    return this;
};


Scene.prototype._removeComponent = function (component, clear) {
    if (!component) return;
    var type = component._type,
        componentManagers = this.componentManagers,
        componentManager = componentManagers[type],
        componentManagerTypes = this._componentManagerTypes;

    componentManager.remove(component);
    this._componentHash[component._id] = undefined;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

    if (componentManager.empty()) {
        componentManagers[type] = undefined;
        componentManagerTypes.splice(componentManagerTypes.indexOf(componentManager), 1);
        componentManager.scene = undefined;
    }

    this.emit("remove" + type, component);
    this.emit("removeComponent", component);

    if (clear) component.clear();
};


Scene.prototype.hasGameObject = function (gameObject) {

    return !!~this.gameObjects.indexOf(gameObject);
};


Scene.prototype.findByTag = function (tag, out) {
    out || (out = []);
    var gameObjects = this.gameObjects,
        gameObject, i = gameObjects.length;

    while (i--) {
        if ((gameObject = gameObjects[i]).hasTag(tag)) out.push(gameObject);
    }

    return out;
};


Scene.prototype.findByTagFirst = function (tag) {
    var gameObjects = this.gameObjects,
        gameObject, i = gameObjects.length;

    while (i--) {
        if ((gameObject = gameObjects[i]).hasTag(tag)) return gameObject;
    }

    return undefined;
};


Scene.prototype.findById = function (id) {

    return this._gameObjectHash[id];
};


Scene.prototype.findByJSONId = function (id) {

    return this._gameObjectJSONHash[id];
};


Scene.prototype.findComponentById = function (id) {

    return this._componentHash[id];
};


Scene.prototype.findComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};


Scene.prototype.find = function (name) {
    var gameObjects = this.gameObjects,
        child, i = gameObjects.length;

    while (i--) {
        child = gameObjects[i];

        if (child.name === name) return child;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


Scene.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var gameObjects = this.gameObjects,
        jsonGameObjects = json.gameObjects || (json.gameObjects = []),
        gameObject,
        i = gameObjects.length;

    json.name = this.name;
    json.world = this.world.toJSON(json.world);

    while (i--) {
        if ((gameObject = gameObjects[i])) jsonGameObjects[i] = gameObject.toJSON(jsonGameObjects[i]);
    }

    return json;
};


Scene.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var jsonGameObjects = json.gameObjects,
        gameObject, jsonGameObject,
        i = jsonGameObjects.length;

    this.name = json.name;

    if (this.world._className === json.world._className) {
        this.world.fromJSON(json.world);
    } else {
        this.setWorld(Class.fromJSON(json.world));
    }

    while (i--) {
        if (!(jsonGameObject = jsonGameObjects[i])) continue;

        if ((gameObject = this._gameObjectJSONHash[jsonGameObject._id])) {
            gameObject.fromJSON(jsonGameObject);
        } else {
            this.addGameObject(Class.fromJSON(jsonGameObject));
        }
    }

    return this;
};


module.exports = Scene;

},{"../base/class":8,"./../base/log":14,"./component_managers/component_manager":43,"./game_object":77,"./world/world":98}],98:[function(require,module,exports){
var Class = require("../../base/class");
var Color = require("../../math/color");
"use strict";


function World(opts) {
    opts || (opts = {});

    Class.call(this);

    this.scene = undefined;

    this.ambient = opts.ambient != undefined ? opts.ambient : new Color;
}

Class.extend(World);


World.prototype.init = function () {

};


World.prototype.start = function () {

};


World.prototype.update = function () {

};


World.prototype.clear = function () {

    return this;
};


World.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("World.destroy: can't destroy World if it's not set to a Scene");
        return this;
    }

    this.scene.removeWorld();
    this.emit("destroy");

    this.clear();

    return this;
};


World.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.ambient = this.ambient.toJSON(json.ambient);

    return json;
};


World.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.ambient.fromJSON(json.ambient);

    return this;
};


module.exports = World;

},{"../../base/class":8,"../../math/color":102}],99:[function(require,module,exports){
var util = require("../../base/util");
var Time = require("../../base/time");
var Color = require("../../math/color");
var World = require("./world");
var Phys2D = require("../../phys2d/phys2d");
"use strict";


function World2D(opts) {
    opts || (opts = {});

    World.call(this, opts);

    this.space = new Phys2D.P2Space(opts.space);
}

World.extend(World2D);


World2D.prototype.init = function () {
    var space = this.space,
        scene = this.scene,
        RigidBodies = scene.componentManagers.RigidBody2D;

    function addBody(component) {

        space.addBody(component.body);
    }

    if (RigidBodies) RigidBodies.forEach(addBody);
    scene.on("addRigidBody2D", addBody);

    scene.on("removeRigidBody2D", function (component) {
        space.removeBody(component.body);
    });
};


World2D.prototype.update = function () {

    this.space.step(Time.delta);
};


World2D.prototype.clear = function () {
    World.prototype.clear.call(this);

    return this;
};


World2D.prototype.toSYNC = function (json) {
    json = World.prototype.toSYNC.call(this, json);

    return json;
};


World2D.prototype.fromSYNC = function (json) {
    World.prototype.fromSYNC.call(this, json);

    return this;
};


World2D.prototype.toJSON = function (json) {
    json = World.prototype.toJSON.call(this, json);

    json.space = this.space.toJSON(json.space);

    return json;
};


World2D.prototype.fromJSON = function (json) {
    World.prototype.fromJSON.call(this, json);

    this.space.fromJSON(json.space);

    return this;
};


module.exports = World2D;

},{"../../base/time":18,"../../base/util":19,"../../math/color":102,"../../phys2d/phys2d":131,"./world":98}],100:[function(require,module,exports){
var Mathf = require("./mathf");
var Vec2 = require("./vec2");
"use strict";


/**
 * @class AABB2
 * 2d axis aligned bounding box
 * @param Vec2 min
 * @param Vec2 max
 */
function AABB2(min, max) {

    /**
     * @property Vec2 min
     * @memberof Odin.AABB2
     */
    this.min = min || new Vec2(Infinity, Infinity);

    /**
     * @property Vec2 max
     * @memberof Odin.AABB2
     */
    this.max = max || new Vec2(-Infinity, -Infinity);
}

/**
 * @method clone
 * @memberof Odin.AABB2
 * returns new copy of this
 * @return AABB2
 */
AABB2.prototype.clone = function () {

    return new AABB2(this.min.clone(), this.max.clone());
};

/**
 * @method copy
 * @memberof Odin.AABB2
 * copies other AABB
 * @param AABB2 other
 * @return this
 */
AABB2.prototype.copy = function (other) {

    this.min.copy(other.min);
    this.max.copy(other.max);

    return this;
};

/**
 * @method set
 * @memberof Odin.AABB2
 * set min and max vectors
 * @param Vec2 min
 * @param Vec2 max
 * @return this
 */
AABB2.prototype.set = function (min, max) {

    this.min.copy(min);
    this.max.copy(max);

    return this;
};

/**
 * @method expandPoint
 * @memberof Odin.AABB2
 * @param Vec2 v
 * @return this
 */
AABB2.prototype.expandPoint = function (v) {

    this.min.min(v);
    this.max.max(v);

    return this;
};

/**
 * @method expandVec
 * @memberof Odin.AABB2
 * @param Vec2 v
 * @return this
 */
AABB2.prototype.expandVec = function (v) {

    this.min.sub(v);
    this.max.add(v);

    return this;
};

/**
 * @method expandScalar
 * @memberof Odin.AABB2
 * @param Number s
 * @return this
 */
AABB2.prototype.expandScalar = function (s) {

    this.min.ssub(s);
    this.max.sadd(s);

    return this;
};

/**
 * @method union
 * @memberof Odin.AABB2
 * joins this and another aabb
 * @param AABB2 aabb
 * @return this
 */
AABB2.prototype.union = function (other) {

    this.min.min(other.min);
    this.max.max(other.max);

    return this;
};

/**
 * @method clear
 * @memberof Odin.AABB2
 * clears aabb
 * @return this
 */
AABB2.prototype.clear = function () {

    this.min.set(Infinity, Infinity);
    this.max.set(-Infinity, -Infinity);

    return this;
};

/**
 * @method contains
 * @memberof Odin.AABB2
 * checks if AABB contains point
 * @param Vec2 point
 * @return Boolean
 */
AABB2.prototype.contains = function (point) {
    var min = this.min,
        max = this.max,
        px = point.x,
        py = point.y;

    return !(
    px < min.x || px > max.x ||
    py < min.y || py > max.y
    );
};

/**
 * @method intersects
 * @memberof Odin.AABB2
 * checks if AABB intersects AABB
 * @param AABB2 other
 * @return Boolean
 */
AABB2.prototype.intersects = function (other) {
    var aMin = this.min,
        aMax = this.max,
        bMin = other.min,
        bMax = other.max;

    return !(
    bMax.x < aMin.x || bMin.x > aMax.x ||
    bMax.y < aMin.y || bMin.y > aMax.y
    );
};

/**
 * @method fromPoints
 * @memberof Odin.AABB2
 * set min and max from array of vectors
 * @param Array points
 * @return this
 */
AABB2.prototype.fromPoints = function (points) {
    var v, i = points.length,
        minx = Infinity,
        miny = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        min = this.min,
        max = this.max,
        x, y;

    while (i--) {
        v = points[i];
        x = v.x;
        y = v.y;

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
    }

    min.x = minx;
    min.y = miny;
    max.x = maxx;
    max.y = maxy;

    return this;
};

/**
 * @method fromCenterSize
 * @memberof Odin.AABB2
 * sets this from a center point and a size vector
 * @param Vec2 center
 * @param Vec2 size
 * @return this
 */
AABB2.prototype.fromCenterSize = function (center, size) {
    var min = this.min,
        max = this.max,
        x = center.x,
        y = center.y,
        hx = size.x * 0.5,
        hy = size.y * 0.5;

    min.x = x - hx;
    min.y = y - hy;

    max.x = x + hx;
    max.y = y + hy;

    return this;
};

/**
 * @memberof Odin.AABB2
 * @param Odin.AABB2 other
 * @return this
 */
AABB2.prototype.equals = function (other) {

    return !(!this.min.equals(other.min) || !this.max.equals(other.max));
};

/**
 * @memberof Odin.AABB2
 * @param Odin.AABB2 other
 * @return this
 */
AABB2.prototype.equals = function (other) {

    return (this.min.notEquals(other.min) || this.max.notEquals(other.max));
};

/**
 * @method fromJSON
 * @memberof Odin.AABB2
 * sets values from json object
 * @param Object json
 * @return this
 */
AABB2.prototype.fromJSON = function (json) {

    this.min.fromJSON(json.min);
    this.max.fromJSON(json.max);

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.AABB2
 * returns json object
 * @return Object
 */
AABB2.prototype.toJSON = function (json) {
    json || (json = {});

    json.min = this.min.toJSON(json.min);
    json.max = this.max.toJSON(json.max);

    return json;
};

/**
 * @method toString
 * @memberof Odin.AABB2
 * converts AABB to string "AABB2( min: Vec2( -1, -1 ), max: Vec2( 1, 1 ) )"
 * @return String
 */
AABB2.prototype.toString = function () {
    var min = this.min,
        max = this.max;

    return "AABB2( min: " + min + ", max: " + max + " )";
};


module.exports = AABB2;

},{"./mathf":107,"./vec2":111}],101:[function(require,module,exports){
var Mathf = require("./mathf");
var Vec3 = require("./vec3");
"use strict";


/**
 * @class AABB3
 * 2d axis aligned bounding box
 * @param Vec3 min
 * @param Vec3 max
 */
function AABB3(min, max) {

    /**
     * @property Vec3 min
     * @memberof Odin.AABB3
     */
    this.min = min || new Vec3(Infinity, Infinity, Infinity);

    /**
     * @property Vec3 max
     * @memberof Odin.AABB3
     */
    this.max = max || new Vec3(-Infinity, -Infinity, -Infinity);
}

/**
 * @method clone
 * @memberof Odin.AABB3
 * returns new copy of this
 * @return AABB3
 */
AABB3.prototype.clone = function () {

    return new AABB3(this.min.clone(), this.max.clone());
};

/**
 * @method copy
 * @memberof Odin.AABB3
 * copies other AABB
 * @param AABB3 other
 * @return this
 */
AABB3.prototype.copy = function (other) {

    this.min.copy(other.min);
    this.max.copy(other.max);

    return this;
};

/**
 * @method set
 * @memberof Odin.AABB3
 * set min and max vectors
 * @param Vec3 min
 * @param Vec3 max
 * @return this
 */
AABB3.prototype.set = function (min, max) {

    this.min.copy(min);
    this.max.copy(max);

    return this;
};

/**
 * @method expandPoint
 * @memberof Odin.AABB3
 * @param Vec3 v
 * @return this
 */
AABB3.prototype.expandPoint = function (v) {

    this.min.min(v);
    this.max.max(v);

    return this;
};

/**
 * @method expandVec
 * @memberof Odin.AABB3
 * @param Vec3 v
 * @return this
 */
AABB3.prototype.expandVec = function (v) {

    this.min.sub(v);
    this.max.add(v);

    return this;
};

/**
 * @method expandScalar
 * @memberof Odin.AABB3
 * @param Number s
 * @return this
 */
AABB3.prototype.expandScalar = function (s) {

    this.min.ssub(s);
    this.max.sadd(s);

    return this;
};

/**
 * @method union
 * @memberof Odin.AABB3
 * joins this and another aabb
 * @param AABB3 aabb
 * @return this
 */
AABB3.prototype.union = function (other) {

    this.min.min(other.min);
    this.max.max(other.max);

    return this;
};

/**
 * @method clear
 * @memberof Odin.AABB3
 * clears aabb
 * @return this
 */
AABB3.prototype.clear = function () {

    this.min.set(Infinity, Infinity, Infinity);
    this.max.set(-Infinity, -Infinity, -Infinity);

    return this;
};

/**
 * @method contains
 * @memberof Odin.AABB3
 * checks if AABB contains point
 * @param Vec3 point
 * @return Boolean
 */
AABB3.prototype.contains = function (point) {
    var min = this.min,
        max = this.max,
        px = point.x,
        py = point.y,
        pz = point.z;

    return !(
    px < min.x || px > max.x ||
    py < min.y || py > max.y ||
    pz < min.z || pz > max.z
    );
};

/**
 * @method intersects
 * @memberof Odin.AABB3
 * checks if AABB intersects AABB
 * @param AABB3 other
 * @return Boolean
 */
AABB3.prototype.intersects = function (other) {
    var aMin = this.min,
        aMax = this.max,
        bMin = other.min,
        bMax = other.max;

    return !(
    bMax.x < aMin.x || bMin.x > aMax.x ||
    bMax.y < aMin.y || bMin.y > aMax.y ||
    bMax.z < aMin.z || bMin.z > aMax.z
    );
};

/**
 * @method fromPoints
 * @memberof Odin.AABB3
 * set min and max from array of vectors
 * @param Array points
 * @return this
 */
AABB3.prototype.fromPoints = function (points) {
    var v, i = points.length,
        minx = Infinity,
        miny = Infinity,
        minz = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        maxz = -Infinity,
        min = this.min,
        max = this.max,
        x, y, z;

    while (i--) {
        v = points[i];
        x = v.x;
        y = v.y;
        z = v.z;

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;
        minz = minz > z ? z : minz;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
        maxz = maxz < z ? z : maxz;
    }

    min.x = minx;
    min.y = miny;
    min.z = minz;
    max.x = maxx;
    max.y = maxy;
    max.z = maxz;

    return this;
};

/**
 * @method fromCenterSize
 * @memberof Odin.AABB3
 * sets this from a center point and a size vector
 * @param Vec3 center
 * @param Vec3 size
 * @return this
 */
AABB3.prototype.fromCenterSize = function (center, size) {
    var min = this.min,
        max = this.max,
        x = center.x,
        y = center.y,
        z = center.z,
        hx = size.x * 0.5,
        hy = size.y * 0.5,
        hz = size.z * 0.5;

    min.x = x - hx;
    min.y = y - hy;
    min.z = z - hz;

    max.x = x + hx;
    max.y = y + hy;
    max.z = z + hz;

    return this;
};

/**
 * @memberof Odin.AABB3
 * @param Odin.AABB3 other
 * @return this
 */
AABB3.prototype.equals = function (other) {

    return !(!this.min.equals(other.min) || !this.max.equals(other.max));
};

/**
 * @memberof Odin.AABB3
 * @param Odin.AABB3 other
 * @return this
 */
AABB3.prototype.notEquals = function (other) {

    return (this.min.notEquals(other.min) || this.max.notEquals(other.max));
};

/**
 * @method fromJSON
 * @memberof Odin.AABB3
 * sets values from json object
 * @param Object json
 * @return this
 */
AABB3.prototype.fromJSON = function (json) {

    this.min.fromJSON(json.min);
    this.max.fromJSON(json.max);

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.AABB3
 * returns json object
 * @return Object
 */
AABB3.prototype.toJSON = function (json) {
    json || (json = {});

    json.min = this.min.toJSON(json.min);
    json.max = this.max.toJSON(json.max);

    return json;
};

/**
 * @method toString
 * @memberof Odin.AABB3
 * converts AABB to string "AABB3( min: Vec3( -1, -1 ), max: Vec3( 1, 1 ) )"
 * @return String
 */
AABB3.prototype.toString = function () {
    var min = this.min,
        max = this.max;

    return "AABB3( min: " + min + ", max: " + max + " )";
};


module.exports = AABB3;

},{"./mathf":107,"./vec3":112}],102:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt,
    floor = Math.floor,
    clamp01 = Mathf.clamp01,
    defineProperty = Object.defineProperty;

/**
 * @class Color
 * rgb color, values 0.0 - 1
 * @param Number r
 * @param Number g
 * @param Number b
 */
function Color(r, g, b) {

    /**
     * @property Number r
     * @memberof Odin.Color
     */
    this.r = 0.0;

    /**
     * @property Number g
     * @memberof Odin.Color
     */
    this.g = 0.0;

    /**
     * @property Number b
     * @memberof Odin.Color
     */
    this.b = 0.0;

    this._r = 0.0;
    this._g = 0.0;
    this._b = 0.0;
    this._hex = "#000000";
    this._rgb = "rgb(0,0,0)";

    this.set(r, g, b);
}

Mathf._classes["Color"] = Color;

defineProperty(Color.prototype, "x", {
    get: function () {
        return this.r;
    },
    set: function (value) {
        this.r = value;
    }
});
defineProperty(Color.prototype, "y", {
    get: function () {
        return this.g;
    },
    set: function (value) {
        this.g = value;
    }
});
defineProperty(Color.prototype, "z", {
    get: function () {
        return this.b;
    },
    set: function (value) {
        this.b = value;
    }
});

/**
 * @method clone
 * @memberof Odin.Color
 * returns new instance of this
 * @return Color
 */
Color.prototype.clone = function () {

    return new Color(this.r, this.g, this.b);
};

/**
 * @method copy
 * @memberof Odin.Color
 * copies other
 * @param Color other
 * @return this
 */
Color.prototype.copy = function (other) {

    this.r = other.r;
    this.g = other.g;
    this.b = other.b;

    return this;
};

/**
 * @method set
 * @memberof Odin.Color
 * sets values of this
 * @param Number r
 * @param Number g
 * @param Number b
 * @return this
 */
Color.prototype.set = function (r, g, b) {
    var type = typeof(r);

    if (type === "number") {
        this.r = r;
        this.g = g;
        this.b = b;
    } else if (type === "string") {
        this.setStyle(r);
    } else if (r instanceof Color) {
        this.r = r.r;
        this.g = r.g;
        this.b = r.b;
    }

    return this;
};

/**
 * @method setRGB
 * @memberof Odin.Color
 * sets rgb values of this
 * @param Number r
 * @param Number g
 * @param Number b
 * @return this
 */
Color.prototype.setRGB = function (r, g, b) {

    this.r = r;
    this.g = g;
    this.b = b;

    return this;
};

/**
 * @method setStyle
 * @memberof Odin.Color
 * sets values of this from string
 * @param String style
 * @return this
 */
Color.prototype.setStyle = function () {
    var rgb255 = /^rgb\((\d+),(\d+),(\d+)\)$/i,
        rgb100 = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i,
        hex6 = /^\#([0.0-9a-f]{6})$/i,
        hex3 = /^\#([0.0-9a-f])([0.0-9a-f])([0.0-9a-f])$/i,
        hex3to6 = /#(.)(.)(.)/,
        hex3to6String = "#$1$1$2$2$3$3",
        colorName = /^(\w+)$/i,
        inv255 = 1.0 / 255.0,
        inv100 = 1.0 / 100.0;

    return function (style) {

        if (rgb255.test(style)) {
            var color = rgb255.exec(style);

            this.r = min(255, Number(color[1])) * inv255;
            this.g = min(255, Number(color[2])) * inv255;
            this.b = min(255, Number(color[3])) * inv255;

            return this;
        }

        if (rgb100.test(style)) {
            var color = rgb100.exec(style);

            this.r = min(100, Number(color[1])) * inv100;
            this.g = min(100, Number(color[2])) * inv100;
            this.b = min(100, Number(color[3])) * inv100;

            return this;
        }

        if (hex6.test(style)) {

            this.r = parseInt(style.substr(1, 2), 16) * inv255;
            this.g = parseInt(style.substr(3, 2), 16) * inv255;
            this.b = parseInt(style.substr(5, 2), 16) * inv255;

            return this;
        }

        if (hex3.test(style)) {
            style = style.replace(hex3to6, hex3to6String);

            this.r = parseInt(style.substr(1, 2), 16) * inv255;
            this.g = parseInt(style.substr(3, 2), 16) * inv255;
            this.b = parseInt(style.substr(5, 2), 16) * inv255;

            return this;
        }

        if (colorName.test(style)) {
            style = colorNames[style];

            this.r = parseInt(style.substr(1, 2), 16) * inv255;
            this.g = parseInt(style.substr(3, 2), 16) * inv255;
            this.b = parseInt(style.substr(5, 2), 16) * inv255;

            return this;
        }

        return this;
    };
}();

/**
 * @method toHEX
 * @memberof Odin.Color
 * returns this color in HEX format
 * @return Color
 */
Color.prototype.toHEX = function () {

    if (this.r !== this._r || this.g !== this._g || this.b !== this._b) {
        var hexR = singleToHEX(this.r),
            hexG = singleToHEX(this.g),
            hexB = singleToHEX(this.b);

        this._r = this.r;
        this._g = this.g;
        this._b = this.b;
        this._hex = "#" + hexR + hexG + hexB;
        this._rgb = "rgb(" + floor(clamp01(this.r) * 256) + "," + floor(clamp01(this.g) * 256) + "," + floor(clamp01(this.b) * 256) + ")";
    }

    return this._hex;
};

/**
 * @method toRGB
 * @memberof Odin.Color
 * returns this color in RGB format
 * @return Color
 */
Color.prototype.toRGB = function () {

    if (this.r !== this._r || this.g !== this._g || this.b !== this._b) {
        var r = floor(clamp01(this.r) * 256),
            g = floor(clamp01(this.g) * 256),
            b = floor(clamp01(this.b) * 256);

        this._r = this.r;
        this._g = this.g;
        this._b = this.b;
        this._rgb = "rgb(" + r + "," + g + "," + b + ")";
        this._hex = "#" + singleToHEX(this.r) + singleToHEX(this.g) + singleToHEX(this.b);
    }

    return this._rgb;
};

/**
 * @method add
 * @memberof Odin.Color
 * adds other's values to this
 * @param Color other
 * @return this
 */
Color.prototype.add = function (other) {

    this.r += other.r;
    this.g += other.g;
    this.b += other.b;

    return this;
};

/**
 * @method cadd
 * @memberof Odin.Color
 * adds a and b together saves it in this
 * @param Color a
 * @param Color b
 * @return this
 */
Color.prototype.cadd = function (a, b) {

    this.r = a.r + b.r;
    this.g = a.g + b.g;
    this.b = a.b + b.b;

    return this;
};

/**
 * @method sadd
 * @memberof Odin.Color
 * adds scalar value to this
 * @param Number s
 * @return this
 */
Color.prototype.sadd = function (s) {

    this.r += s;
    this.g += s;
    this.b += s;

    return this;
};

/**
 * @method sub
 * @memberof Odin.Color
 * subtracts other's values from this
 * @param Color other
 * @return this
 */
Color.prototype.sub = function (other) {

    this.r -= other.r;
    this.g -= other.g;
    this.b -= other.b;

    return this;
};

/**
 * @method csub
 * @memberof Odin.Color
 * subtracts b from a saves it in this
 * @param Color a
 * @param Color b
 * @return this
 */
Color.prototype.csub = function (a, b) {

    this.r = a.r - b.r;
    this.g = a.g - b.g;
    this.b = a.b - b.b;

    return this;
};

/**
 * @method ssub
 * @memberof Odin.Color
 * subtracts this by a scalar value
 * @param Number s
 * @return this
 */
Color.prototype.ssub = function (s) {

    this.r -= s;
    this.g -= s;
    this.b -= s;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Color
 * muliples this's values by other's
 * @param Color other
 * @return this
 */
Color.prototype.mul = function (other) {

    this.r *= other.r;
    this.g *= other.g;
    this.b *= other.b;

    return this;
};

/**
 * @method cmul
 * @memberof Odin.Color
 * muliples a and b saves it in this
 * @param Color a
 * @param Color b
 * @return this
 */
Color.prototype.cmul = function (a, b) {

    this.r = a.r * b.r;
    this.g = a.g * b.g;
    this.b = a.b * b.b;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Color
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Color.prototype.smul = function (s) {

    this.r *= s;
    this.g *= s;
    this.b *= s;

    return this;
};

/**
 * @method div
 * @memberof Odin.Color
 * divides this's values by other's
 * @param Color other
 * @return this
 */
Color.prototype.div = function (other) {
    var x = other.r,
        y = other.g,
        z = other.b;

    this.r *= x !== 0.0 ? 1.0 / x : 0.0;
    this.g *= y !== 0.0 ? 1.0 / y : 0.0;
    this.b *= z !== 0.0 ? 1.0 / z : 0.0;

    return this;
};

/**
 * @method cdiv
 * @memberof Odin.Color
 * divides b from a saves it in this
 * @param Color a
 * @param Color b
 * @return this
 */
Color.prototype.cdiv = function (a, b) {
    var x = b.r,
        y = b.g,
        z = b.b;

    this.r = x !== 0.0 ? a.r / x : 0.0;
    this.g = y !== 0.0 ? a.g / y : 0.0;
    this.b = z !== 0.0 ? a.b / z : 0.0;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Color
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Color.prototype.sdiv = function (s) {
    s = s === 0.0 ? 0.0 : 1.0 / s;

    this.r *= s;
    this.g *= s;
    this.b *= s;

    return this;
};

/**
 * @method length
 * @memberof Odin.Color
 * returns length of this
 * @return this
 */
Color.prototype.length = function () {
    var r = this.r,
        g = this.g,
        b = this.b,
        l = r * r + g * g + b * b;

    return l > 0.0 ? 1.0 / sqrt(l) : 0.0;
};

/**
 * @method lengthSq
 * @memberof Odin.Color
 * returns length squared of this
 * @return this
 */
Color.prototype.lengthSq = function () {
    var r = this.r,
        g = this.g,
        b = this.b;

    return r * r + g * g + b * b;
};

/**
 * @method normalize
 * @memberof Odin.Color
 * returns this with a length of 1
 * @return this
 */
Color.prototype.normalize = function () {
    var r = this.r,
        g = this.g,
        b = this.b,
        l = r * r + g * g + b * b;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.r *= l;
    this.g *= l;
    this.b *= l;

    return this;
};

/**
 * @method cnormalize
 * @memberof Odin.Color
 * ensures that each value is no larger than 1
 * @return this
 */
Color.prototype.cnormalize = function () {
    var r = this.r,
        g = this.g,
        b = this.b;

    this.r = r > 1.0 ? 1.0 : r;
    this.g = g > 1.0 ? 1.0 : g;
    this.b = b > 1.0 ? 1.0 : b;

    return this;
};

/**
 * @method lerp
 * @memberof Odin.Color
 * linear interpolation between this and other by x
 * @param Color other
 * @param Number x
 * @return Color
 */
Color.prototype.lerp = function (other, x) {

    this.r += (other.r - this.r) * x;
    this.g += (other.g - this.g) * x;
    this.b += (other.b - this.b) * x;

    return this;
};

/**
 * @method clerp
 * @memberof Odin.Color
 * linear interpolation between a and b by x
 * @param Color a
 * @param Color b
 * @param Number x
 * @return Color
 */
Color.prototype.clerp = function (a, b, x) {
    var ax = a.r,
        ay = a.g,
        az = a.b;

    this.r = ax + (b.r - ax) * x;
    this.g = ay + (b.g - ay) * x;
    this.b = az + (b.b - az) * x;

    return this;
};

/**
 * @method min
 * @memberof Odin.Color
 * returns min values from this and other vector
 * @param Color other
 * @return Color
 */
Color.prototype.min = function (other) {
    var ar = this.r,
        ag = this.g,
        ab = this.b,
        br = other.r,
        bg = other.g,
        bb = other.b;

    this.r = br < ar ? br : ar;
    this.g = bg < ag ? bg : ag;
    this.b = bb < ab ? bb : ab;

    return this;
};

/**
 * @method max
 * @memberof Odin.Color
 * returns max values from this and other vector
 * @param Color other
 * @return Color
 */
Color.prototype.max = function (other) {
    var ar = this.r,
        ag = this.g,
        ab = this.b,
        br = other.r,
        bg = other.g,
        bb = other.b;

    this.r = br > ar ? br : ar;
    this.g = bg > ag ? bg : ag;
    this.b = bb > ab ? bb : ab;

    return this;
};

/**
 * @method fromVec2
 * @memberof Odin.Color
 * sets values from Vec2
 * @param Vec2 v
 * @return this
 */
Color.prototype.fromVec2 = function (v) {

    this.r = v.x;
    this.g = v.y;
    this.b = 0.0;

    return this;
};

/**
 * @method fromVec3
 * @memberof Odin.Color
 * sets values from Vec3
 * @param Vec3 v
 * @return this
 */
Color.prototype.fromVec3 = function (v) {

    this.r = v.x;
    this.g = v.y;
    this.b = v.z;

    return this;
};

/**
 * @method fromVec4
 * @memberof Odin.Color
 * sets values from Vec4
 * @param Vec4 v
 * @return this
 */
Color.prototype.fromVec4 = Color.prototype.fromVec3;

/**
 * @memberof Odin.Color
 * @param Odin.Color other
 * @return this
 */
Color.prototype.equals = function (other) {

    return !(
    this.r !== other.r ||
    this.g !== other.g ||
    this.b !== other.b
    );
};

/**
 * @memberof Odin.Color
 * @param Odin.Color other
 * @return this
 */
Color.prototype.notEquals = function (other) {

    return (
    this.r !== other.r ||
    this.g !== other.g ||
    this.b !== other.b
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Color
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Color.prototype.fromJSON = function (json) {

    this.r = json.r;
    this.g = json.g;
    this.b = json.b;

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Color
 * returns json object of this
 * @return Object
 */
Color.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Color";
    json.r = this.r;
    json.g = this.g;
    json.b = this.b;

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Color
 * sets values from Array object
 * @param Array array
 * @return this
 */
Color.prototype.fromArray = function (array) {

    this.r = array[0];
    this.g = array[1];
    this.b = array[2];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Color
 * returns array object of this
 * @return Array
 */
Color.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this.r;
    array[1] = this.g;
    array[2] = this.b;

    return array;
};

/**
 * @method toString
 * @memberof Odin.Color
 * returns string of this
 * @return String
 */
Color.prototype.toString = function () {

    return "Color( " + this.r + ", " + this.g + ", " + this.b + " )";
};


function singleToHEX(value) {
    var str = (~~(clamp01(value) * 255)).toString(16);
    return str.length === 1 ? "0" + str : str;
}


var colorNames = Color.colorNames = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};


module.exports = Color;

},{"./mathf":107}],103:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2;

/**
 * @class Mat2
 * 2x2 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m21
 * @param Number m22
 */
function Mat2(m11, m12, m21, m22) {
    var te = new Float32Array(4);

    /**
     * @property Float32Array elements
     * @memberof Odin.Mat2
     */
    this.elements = te;

    te[0] = m11 != undefined ? m11 : 1.0;
    te[2] = m12 || 0.0;
    te[1] = m21 || 0.0;
    te[3] = m22 != undefined ? m22 : 1.0;
}

Mathf._classes["Mat2"] = Mat2;

/**
 * @method clone
 * @memberof Odin.Mat2
 * returns new instance of this
 * @return Mat2
 */
Mat2.prototype.clone = function () {
    var te = this.elements;

    return new Mat2(
        te[0], te[1],
        te[2], te[3]
    );
};

/**
 * @method copy
 * @memberof Odin.Mat2
 * copies other
 * @param Mat2 other
 * @return this
 */
Mat2.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];

    return this;
};

/**
 * @method set
 * @memberof Odin.Mat2
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m21
 * @param Number m22
 * @return this
 */
Mat2.prototype.set = function (m11, m12, m21, m22) {
    var te = this.elements;

    te[0] = m11;
    te[2] = m12;
    te[1] = m21;
    te[3] = m22;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Mat2
 * muliples this's values by other's
 * @param Mat2 other
 * @return this
 */
Mat2.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[2],
        a21 = ae[1],
        a22 = ae[3],

        b11 = be[0],
        b12 = be[2],
        b21 = be[1],
        b22 = be[3];

    ae[0] = a11 * b11 + a21 * b12;
    ae[1] = a12 * b11 + a22 * b12;

    ae[2] = a11 * b21 + a21 * b22;
    ae[3] = a12 * b21 + a22 * b22;

    return this;
};

/**
 * @method mmul
 * @memberof Odin.Mat2
 * muliples a and b saves it in this
 * @param Mat2 a
 * @param Mat2 b
 * @return this
 */
Mat2.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[2],
        a21 = ae[1],
        a22 = ae[3],

        b11 = be[0],
        b12 = be[2],
        b21 = be[1],
        b22 = be[3];

    te[0] = a11 * b11 + a21 * b12;
    te[1] = a12 * b11 + a22 * b12;

    te[2] = a11 * b21 + a21 * b22;
    te[3] = a12 * b21 + a22 * b22;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Mat2
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat2.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Mat2
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat2.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s !== 0.0 ? 1.0 / s : 1.0;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Odin.Mat2
 * identity matrix
 * @return this
 */
Mat2.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 1;

    return this;
};

/**
 * @method zero
 * @memberof Odin.Mat2
 * zero matrix
 * @return this
 */
Mat2.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Odin.Mat2
 * returns the determinant of this
 * @return this
 */
Mat2.prototype.determinant = function () {
    var te = this.elements;

    return te[0] * te[3] - te[2] * te[1];
};

/**
 * @method inverse
 * @memberof Odin.Mat2
 * returns the inverse of this
 * @return this
 */
Mat2.prototype.inverse = function () {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m21 = te[1],
        m22 = te[3],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Odin.Mat2
 * returns the inverse of other
 * @param Mat2 other
 * @return this
 */
Mat2.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[2],
        m21 = me[1],
        m22 = me[3],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    return this;
};

/**
 * @method transpose
 * @memberof Odin.Mat2
 * transposes this matrix
 * @return this
 */
Mat2.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[2];
    te[2] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Odin.Mat2
 * sets the diagonal of matrix
 * @param Number x
 * @param Number y
 * @return this
 */
Mat2.prototype.setTrace = function (x, y) {
    var te = this.elements;

    te[0] = x;
    te[3] = y;

    return this;
};

/**
 * @method setRotation
 * @memberof Odin.Mat2
 * sets the rotation in radians this
 * @param Number angle
 * @return this
 */
Mat2.prototype.setRotation = function (angle) {
    var te = this.elements,
        c = cos(angle),
        s = sin(angle);

    te[0] = c;
    te[1] = s;
    te[2] = -s;
    te[3] = c;

    return this;
};

/**
 * @method getRotation
 * @memberof Odin.Mat2
 * returns the rotation in radians of this
 * @return Number
 */
Mat2.prototype.getRotation = function () {
    var te = this.elements;

    return atan2(te[1], te[0]);
};

/**
 * @method rotate
 * @memberof Odin.Mat2
 * rotates this by angle in radians
 * @param Number angle
 * @return this
 */
Mat2.prototype.rotate = function (angle) {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m21 = te[1],
        m22 = te[3],

        s = sin(angle),
        c = sin(angle);

    te[0] = m11 * c + m12 * s;
    te[1] = m11 * -s + m12 * c;
    te[2] = m21 * c + m22 * s;
    te[3] = m21 * -s + m22 * c;

    return this;
};

/**
 * @method fromMat3
 * @memberof Odin.Mat2
 * sets this from Mat3
 * @param Mat3 m
 * @return this
 */
Mat2.prototype.fromMat3 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[3];
    te[3] = me[4];

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Mat2
 * sets this from Mat4
 * @param Mat4 m
 * @return this
 */
Mat2.prototype.fromMat4 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[4];
    te[3] = me[5];

    return this;
};

/**
 * @memberof Odin.Mat2
 * @param Odin.Mat2 other
 * @return this
 */
Mat2.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3]
    );
};

/**
 * @memberof Odin.Mat2
 * @param Odin.Mat2 other
 * @return this
 */
Mat2.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3]
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Mat2
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat2.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Mat2
 * returns json object of this
 * @return Object
 */
Mat2.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat2";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Mat2
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat2.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Mat2
 * returns array object of this
 * @return Object
 */
Mat2.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];

    return array;
};

/**
 * @method toString
 * @memberof Odin.Mat2
 * returns string of this
 * @return String
 */
Mat2.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat2[ " + te[0] + ", " + te[2] + "]\n" +
    "     [ " + te[1] + ", " + te[3] + "]"
    );
};


module.exports = Mat2;

},{"./mathf":107}],104:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var cos = Math.cos,
    sin = Math.sin;

/**
 * @class Mat3
 * 3x3 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m31
 * @param Number m32
 * @param Number m33
 */
function Mat3(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    var te = new Float32Array(9);

    /**
     * @property Float32Array elements
     * @memberof Odin.Mat3
     */
    this.elements = te;

    te[0] = m11 != undefined ? m11 : 1.0;
    te[3] = m12 || 0.0;
    te[6] = m13 || 0.0;
    te[1] = m21 || 0.0;
    te[4] = m22 != undefined ? m22 : 1.0;
    te[7] = m23 || 0.0;
    te[2] = m31 || 0.0;
    te[5] = m32 || 0.0;
    te[8] = m33 != undefined ? m33 : 1.0;
}

Mathf._classes["Mat3"] = Mat3;

/**
 * @method clone
 * @memberof Odin.Mat3
 * returns new instance of this
 * @return Mat3
 */
Mat3.prototype.clone = function () {
    var te = this.elements;

    return new Mat3(
        te[0], te[3], te[6],
        te[1], te[4], te[7],
        te[2], te[5], te[8]
    );
};

/**
 * @method copy
 * @memberof Odin.Mat3
 * copies other
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];

    return this;
};

/**
 * @method set
 * @memberof Odin.Mat3
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m31
 * @param Number m32
 * @param Number m33
 * @return this
 */
Mat3.prototype.set = function (m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    var te = this.elements;

    te[0] = m11;
    te[3] = m12;
    te[6] = m13;
    te[1] = m21;
    te[4] = m22;
    te[7] = m23;
    te[2] = m31;
    te[5] = m32;
    te[8] = m33;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Mat3
 * muliples this's values by other's
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[3],
        a13 = ae[6],
        a21 = ae[1],
        a22 = ae[4],
        a23 = ae[7],
        a31 = ae[2],
        a32 = ae[5],
        a33 = ae[8],

        b11 = be[0],
        b12 = be[3],
        b13 = be[6],
        b21 = be[1],
        b22 = be[4],
        b23 = be[7],
        b31 = be[2],
        b32 = be[5],
        b33 = be[8];

    ae[0] = a11 * b11 + a21 * b12 + a31 * b13;
    ae[3] = a12 * b11 + a22 * b12 + a32 * b13;
    ae[6] = a13 * b11 + a23 * b12 + a33 * b13;

    ae[1] = a11 * b21 + a21 * b22 + a31 * b23;
    ae[4] = a12 * b21 + a22 * b22 + a32 * b23;
    ae[7] = a13 * b21 + a23 * b22 + a33 * b23;

    ae[2] = a11 * b31 + a21 * b32 + a31 * b33;
    ae[5] = a12 * b31 + a22 * b32 + a32 * b33;
    ae[8] = a13 * b31 + a23 * b32 + a33 * b33;

    return this;
};

/**
 * @method mmul
 * @memberof Odin.Mat3
 * muliples a and b saves it in this
 * @param Mat3 a
 * @param Mat3 b
 * @return this
 */
Mat3.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[3],
        a13 = ae[6],
        a21 = ae[1],
        a22 = ae[4],
        a23 = ae[7],
        a31 = ae[2],
        a32 = ae[5],
        a33 = ae[8],

        b11 = be[0],
        b12 = be[3],
        b13 = be[6],
        b21 = be[1],
        b22 = be[4],
        b23 = be[7],
        b31 = be[2],
        b32 = be[5],
        b33 = be[8];

    te[0] = a11 * b11 + a21 * b12 + a31 * b13;
    te[3] = a12 * b11 + a22 * b12 + a32 * b13;
    te[6] = a13 * b11 + a23 * b12 + a33 * b13;

    te[1] = a11 * b21 + a21 * b22 + a31 * b23;
    te[4] = a12 * b21 + a22 * b22 + a32 * b23;
    te[7] = a13 * b21 + a23 * b22 + a33 * b23;

    te[2] = a11 * b31 + a21 * b32 + a31 * b33;
    te[5] = a12 * b31 + a22 * b32 + a32 * b33;
    te[8] = a13 * b31 + a23 * b32 + a33 * b33;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Mat3
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat3.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Mat3
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat3.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s === 0.0 ? 0.0 : 1.0 / s;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Odin.Mat3
 * identity matrix
 * @return this
 */
Mat3.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 1;
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 1;

    return this;
};

/**
 * @method zero
 * @memberof Odin.Mat3
 * zero matrix
 * @return this
 */
Mat3.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Odin.Mat3
 * returns the determinant of this
 * @return this
 */
Mat3.prototype.determinant = function () {
    var te = this.elements,

        a = te[0],
        b = te[1],
        c = te[2],
        d = te[3],
        e = te[4],
        f = te[5],
        g = te[6],
        h = te[7],
        i = te[8];

    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
};

/**
 * @method inverse
 * @memberof Odin.Mat3
 * returns the inverse of this
 * @return this
 */
Mat3.prototype.inverse = function () {
    var te = this.elements,
        m11 = te[0],
        m12 = te[3],
        m13 = te[6],
        m21 = te[1],
        m22 = te[4],
        m23 = te[7],
        m31 = te[2],
        m32 = te[5],
        m33 = te[8],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Odin.Mat3
 * returns the inverse of other
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,
        m11 = me[0],
        m12 = me[3],
        m13 = me[6],
        m21 = me[1],
        m22 = me[4],
        m23 = me[7],
        m31 = me[2],
        m32 = me[5],
        m33 = me[8],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method inverseMat4
 * @memberof Odin.Mat3
 * returns the inverse of a Mat4
 * @param Mat4 other
 * @return this
 */
Mat3.prototype.inverseMat4 = function (other) {
    var te = this.elements,
        me = other.elements,
        m11 = me[0],
        m12 = me[4],
        m13 = me[8],
        m21 = me[1],
        m22 = me[5],
        m23 = me[9],
        m31 = me[2],
        m32 = me[6],
        m33 = me[10],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method transpose
 * @memberof Odin.Mat3
 * transposes this matrix
 * @return this
 */
Mat3.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[3];
    te[3] = tmp;
    tmp = te[2];
    te[2] = te[6];
    te[6] = tmp;
    tmp = te[5];
    te[5] = te[7];
    te[7] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Odin.Mat3
 * sets the diagonal of matrix
 * @param Vec3 v
 * @return this
 */
Mat3.prototype.setTrace = function (v) {
    var te = this.elements;

    te[0] = v.x;
    te[4] = v.y;
    te[8] = v.z;

    return this;
};

/**
 * @method scale
 * @memberof Odin.Mat3
 * scales this by vector
 * @param Vec3 v
 * @return this
 */
Mat3.prototype.scale = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y,
        z = v.z;

    te[0] *= x;
    te[3] *= y;
    te[6] *= z;
    te[1] *= x;
    te[4] *= y;
    te[7] *= z;
    te[2] *= x;
    te[5] *= y;
    te[8] *= z;

    return this;
};

/**
 * @method makeScale
 * @memberof Odin.Mat3
 * makes this a scale matrix
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Mat3.prototype.makeScale = function (x, y, z) {

    return this.set(
        x, 0.0, 0.0,
        0.0, y, 0.0,
        0.0, 0.0, z
    );
};

/**
 * @method makeRotationX
 * @memberof Odin.Mat3
 * makes this a rotation matrix along x axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationX = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        1, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
    );
};

/**
 * @method makeRotationY
 * @memberof Odin.Mat3
 * makes this a rotation matrix along y axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationY = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, 0.0, s,
        0.0, 1, 0.0, -s, 0.0, c
    );
};

/**
 * @method makeRotationZ
 * @memberof Odin.Mat3
 * makes this a rotation matrix along z axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationZ = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1
    );
};

/**
 * @method fromMat2
 * @memberof Odin.Mat3
 * sets this from Mat2
 * @param Mat2 m
 * @return this
 */
Mat3.prototype.fromMat2 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = 0.0;
    te[3] = me[2];
    te[4] = me[3];
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 1;

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Mat3
 * sets this from Mat4
 * @param Mat2 m
 * @return this
 */
Mat3.prototype.fromMat4 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[4];
    te[4] = me[5];
    te[5] = me[6];
    te[6] = me[8];
    te[7] = me[9];
    te[8] = me[10];

    return this;
};

/**
 * @method fromQuat
 * @memberof Odin.Mat3
 * sets rotation of this from quaterian
 * @param Quat q
 * @return this
 */
Mat3.prototype.fromQuat = function (q) {
    var te = this.elements,
        x = q.x,
        y = q.y,
        z = q.z,
        w = q.w,
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    te[0] = 1 - (yy + zz);
    te[1] = xy + wz;
    te[2] = xz - wy;

    te[3] = xy - wz;
    te[4] = 1 - (xx + zz);
    te[5] = yz + wx;

    te[6] = xz + wy;
    te[7] = yz - wx;
    te[8] = 1 - (xx + yy);

    return this;
};

/**
 * @memberof Odin.Mat3
 * @param Odin.Mat3 other
 * @return this
 */
Mat3.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8]
    );
};

/**
 * @memberof Odin.Mat3
 * @param Odin.Mat3 other
 * @return this
 */
Mat3.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8]
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Mat3
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat3.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Mat3
 * returns json object of this
 * @param Array array
 * @return Object
 */
Mat3.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat3";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];
    je[4] = te[4];
    je[5] = te[5];
    je[6] = te[6];
    je[7] = te[7];
    je[8] = te[8];

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Mat3
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat3.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];
    te[4] = array[4];
    te[5] = array[5];
    te[6] = array[6];
    te[7] = array[7];
    te[8] = array[8];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Mat3
 * returns array object of this
 * @return Object
 */
Mat3.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];
    array[6] = te[6];
    array[7] = te[7];
    array[8] = te[8];

    return array;
};

/**
 * @method toString
 * @memberof Odin.Mat3
 * returns string of this
 * @return String
 */
Mat3.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat3[" + te[0] + ", " + te[3] + ", " + te[6] + "]\n" +
    "     [" + te[1] + ", " + te[4] + ", " + te[7] + "]\n" +
    "     [" + te[2] + ", " + te[5] + ", " + te[8] + "]"
    );
};


module.exports = Mat3;

},{"./mathf":107}],105:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt,
    cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2;

/**
 * @class Mat32
 * 3x2 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 */
function Mat32(m11, m12, m13, m21, m22, m23) {
    var te = new Float32Array(6);

    /**
     * @property Float32Array elements
     * @memberof Odin.Mat32
     */
    this.elements = te;

    te[0] = m11 != undefined ? m11 : 1.0;
    te[2] = m12 || 0.0;
    te[4] = m13 || 0.0;
    te[1] = m21 || 0.0;
    te[3] = m22 != undefined ? m22 : 1.0;
    te[5] = m23 || 0.0;
}

Mathf._classes["Mat32"] = Mat32;

/**
 * @method clone
 * @memberof Odin.Mat32
 * returns new instance of this
 * @return Mat32
 */
Mat32.prototype.clone = function () {
    var te = this.elements;

    return new Mat32(
        te[0], te[1], te[2],
        te[3], te[4], te[5]
    );
};

/**
 * @method copy
 * @memberof Odin.Mat32
 * copies other
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method set
 * @memberof Odin.Mat32
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @return this
 */
Mat32.prototype.set = function (m11, m12, m13, m21, m22, m23) {
    var te = this.elements;

    te[0] = m11;
    te[2] = m12;
    te[4] = m13;
    te[1] = m21;
    te[3] = m22;
    te[5] = m23;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Mat32
 * muliples this's values by other's
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[2],
        a13 = ae[4],
        a21 = ae[1],
        a22 = ae[3],
        a23 = ae[5],

        b11 = be[0],
        b12 = be[2],
        b13 = be[4],
        b21 = be[1],
        b22 = be[3],
        b23 = be[5];

    ae[0] = a11 * b11 + a21 * b12;
    ae[2] = a12 * b11 + a22 * b12;

    ae[1] = a11 * b21 + a21 * b22;
    ae[3] = a12 * b21 + a22 * b22;

    ae[4] = a11 * b13 + a12 * b23 + a13;
    ae[5] = a21 * b13 + a22 * b23 + a23;

    return this;
};

/**
 * @method mmul
 * @memberof Odin.Mat32
 * muliples a and b saves it in this
 * @param Mat32 a
 * @param Mat32 b
 * @return this
 */
Mat32.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[2],
        a13 = ae[4],
        a21 = ae[1],
        a22 = ae[3],
        a23 = ae[5],

        b11 = be[0],
        b12 = be[2],
        b13 = be[4],
        b21 = be[1],
        b22 = be[3],
        b23 = be[5];

    te[0] = a11 * b11 + a21 * b12;
    te[2] = a12 * b11 + a22 * b12;

    te[1] = a11 * b21 + a21 * b22;
    te[3] = a12 * b21 + a22 * b22;

    te[4] = a11 * b13 + a12 * b23 + a13;
    te[5] = a21 * b13 + a22 * b23 + a23;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Mat32
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat32.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Mat32
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat32.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s !== 0.0 ? 1.0 / s : 1.0;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Odin.Mat32
 * identity matrix
 * @return this
 */
Mat32.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 1;
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method zero
 * @memberof Odin.Mat32
 * zero matrix
 * @return this
 */
Mat32.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Odin.Mat32
 * returns the determinant of this
 * @return this
 */
Mat32.prototype.determinant = function () {
    var te = this.elements;

    return te[0] * te[3] - te[2] * te[1];
};

/**
 * @method inverse
 * @memberof Odin.Mat32
 * returns the inverse of this
 * @return this
 */
Mat32.prototype.inverse = function () {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m13 = te[4],
        m21 = te[1],
        m22 = te[3],
        m23 = te[5],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    te[4] = (m21 * m23 - m22 * m13) * det;
    te[5] = -(m11 * m23 - m12 * m13) * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Odin.Mat32
 * returns the inverse of other
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[2],
        m13 = me[4],
        m21 = me[1],
        m22 = me[3],
        m23 = me[5],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    te[4] = (m21 * m23 - m22 * m13) * det;
    te[5] = -(m11 * m23 - m12 * m13) * det;

    return this;
};

/**
 * @method transpose
 * @memberof Odin.Mat32
 * transposes this matrix
 * @return this
 */
Mat32.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[2];
    te[2] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Odin.Mat32
 * sets the diagonal of matrix
 * @param Number x
 * @param Number y
 * @return this
 */
Mat32.prototype.setTrace = function (x, y) {
    var te = this.elements;

    te[0] = x;
    te[3] = y;

    return this;
};

/**
 * @method lookAt
 * @memberof Odin.Mat32
 * makes matrix look from eye to target
 * @param Vec2 eye
 * @param Vec2 target
 * @return this
 */
Mat32.prototype.lookAt = function (eye, target) {
    var te = this.elements,
        x = target.x - eye.x,
        y = target.y - eye.y,
        a = atan2(y, x) - HALF_PI,
        c = cos(a),
        s = sin(a);

    te[0] = c;
    te[1] = s;
    te[2] = -s;
    te[3] = c;

    return this;
};

/**
 * @method compose
 * @memberof Odin.Mat32
 * sets matrix from position, scale, and an angle in radians
 * @param Vec2 position
 * @param Vec2 scale
 * @param Number angle
 * @return this
 */
Mat32.prototype.compose = function (position, scale, angle) {
    var te = this.elements,
        sx = scale.x,
        sy = scale.y,
        c = cos(angle),
        s = sin(angle);

    te[0] = c * sx;
    te[1] = s * sx;
    te[2] = -s * sy;
    te[3] = c * sy;

    te[4] = position.x;
    te[5] = position.y;

    return this;
};

/**
 * @method decompose
 * @memberof Odin.Mat32
 * gets matrix position, scale, and returns its angle in radians
 * @param Vec2 position
 * @param Vec2 scale
 * @return Number
 */
Mat32.prototype.decompose = function (position, scale) {
    var te = this.elements,
        m11 = te[0],
        m12 = te[1],
        sx = scale.set(m11, m12).length(),
        sy = scale.set(te[2], te[3]).length();

    position.x = te[4];
    position.y = te[5];

    scale.x = sx;
    scale.y = sy;

    return atan2(m12, m11);
};

/**
 * @method setRotation
 * @memberof Odin.Mat32
 * sets the rotation in radians this
 * @param Number angle
 * @return this
 */
Mat32.prototype.setRotation = function (angle) {
    var te = this.elements,
        c = cos(angle),
        s = sin(angle);

    te[0] = c;
    te[1] = s;
    te[2] = -s;
    te[3] = c;

    return this;
};

/**
 * @method getRotation
 * @memberof Odin.Mat32
 * returns the rotation in radians of this
 * @return Number
 */
Mat32.prototype.getRotation = function () {
    var te = this.elements;

    return atan2(te[1], te[0]);
};

/**
 * @method setPosition
 * @memberof Odin.Mat32
 * sets the position of this
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.setPosition = function (v) {
    var te = this.elements;

    te[4] = v.x;
    te[5] = v.y;

    return this;
};

/**
 * @method getPosition
 * @memberof Odin.Mat32
 * gets the position of this
 * @param Vec2 v
 * @return Vec2
 */
Mat32.prototype.getPosition = function (v) {
    var te = this.elements;

    v.x = te[4];
    v.y = te[5];

    return v;
};

/**
 * @method extractPosition
 * @memberof Odin.Mat32
 * gets position from other saves it in this
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.extractPosition = function (other) {
    var te = this.elements,
        me = other.elements;

    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method extractRotation
 * @memberof Odin.Mat32
 * gets rotation from other saves it in this
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.extractRotation = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[2],
        m21 = me[1],
        m22 = me[3],

        x = m11 * m11 + m21 * m21,
        y = m12 * m12 + m22 * m22,

        sx = x > 0.0 ? 1.0 / sqrt(x) : 0.0,
        sy = y > 0.0 ? 1.0 / sqrt(y) : 0.0;

    te[0] = m11 * sx;
    te[1] = m21 * sx;

    te[2] = m12 * sy;
    te[3] = m22 * sy;

    return this;
};

/**
 * @method translate
 * @memberof Odin.Mat32
 * translates matrix by vector
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.translate = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y;

    te[4] = te[0] * x + te[2] * y + te[4];
    te[5] = te[1] * x + te[3] * y + te[5];

    return this;
};

/**
 * @method rotate
 * @memberof Odin.Mat32
 * rotates this by angle in radians
 * @param Number angle
 * @return this
 */
Mat32.prototype.rotate = function (angle) {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m21 = te[1],
        m22 = te[3],

        s = sin(angle),
        c = sin(angle);

    te[0] = m11 * c + m12 * s;
    te[1] = m11 * -s + m12 * c;
    te[2] = m21 * c + m22 * s;
    te[3] = m21 * -s + m22 * c;

    return this;
};

/**
 * @method scale
 * @memberof Odin.Mat32
 * scales matrix by vector
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.scale = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y;

    te[0] *= x;
    te[1] *= x;
    te[4] *= x;

    te[2] *= y;
    te[3] *= y;
    te[5] *= y;

    return this;
};

/**
 * @method orthographic
 * @memberof Odin.Mat32
 * makes orthographic matrix
 * @param Number left
 * @param Number right
 * @param Number bottom
 * @param Number top
 * @return Mat32
 */
Mat32.prototype.orthographic = function (left, right, top, bottom) {
    var te = this.elements,
        w = right - left,
        h = top - bottom,

        x = (right + left) / w,
        y = (top + bottom) / h;

    te[0] = 2 / w;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 2 / h;
    te[4] = -x;
    te[5] = -y;

    return this;
};

/**
 * @method fromMat3
 * @memberof Odin.Mat32
 * sets this from Mat3
 * @param Mat3 m
 * @return this
 */
Mat32.prototype.fromMat3 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[3];
    te[3] = me[4];
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Mat32
 * sets this from Mat4
 * @param Mat4 m
 * @return this
 */
Mat32.prototype.fromMat4 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[4];
    te[3] = me[5];
    te[4] = me[12];
    te[5] = me[13];

    return this;
};

/**
 * @memberof Odin.Mat32
 * @param Odin.Mat32 other
 * @return this
 */
Mat32.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5]
    );
};

/**
 * @memberof Odin.Mat32
 * @param Odin.Mat32 other
 * @return this
 */
Mat32.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5]
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Mat32
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat32.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Mat32
 * returns json object of this
 * @return Object
 */
Mat32.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat32";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];
    je[4] = te[4];
    je[5] = te[5];

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Mat32
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat32.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];
    te[4] = array[4];
    te[5] = array[5];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Mat32
 * returns array object of this
 * @return Object
 */
Mat32.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];

    return array;
};

/**
 * @method toString
 * @memberof Odin.Mat32
 * returns string of this
 * @return String
 */
Mat32.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat32[ " + te[0] + ", " + te[2] + ", " + te[4] + "]\n" +
    "     [ " + te[1] + ", " + te[3] + ", " + te[5] + "]"
    );
};


module.exports = Mat32;

},{"./mathf":107}],106:[function(require,module,exports){
var Mathf = require("./mathf");
var Vec3 = require("./vec3");
"use strict";


var sqrt = Math.sqrt,
    cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan;

/**
 * @class Mat4
 * 4x4 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m14
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m24
 * @param Number m31
 * @param Number m32
 * @param Number m33
 * @param Number m34
 * @param Number m41
 * @param Number m42
 * @param Number m43
 * @param Number m44
 */
function Mat4(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    var te = new Float32Array(16);

    /**
     * @property Float32Array elements
     * @memberof Xian.Mat4
     */
    this.elements = te;

    te[0] = m11 != undefined ? m11 : 1.0;
    te[4] = m12 || 0.0;
    te[8] = m13 || 0.0;
    te[12] = m14 || 0.0;
    te[1] = m21 || 0.0;
    te[5] = m22 != undefined ? m22 : 1.0;
    te[9] = m23 || 0.0;
    te[13] = m24 || 0.0;
    te[2] = m31 || 0.0;
    te[6] = m32 || 0.0;
    te[10] = m33 != undefined ? m33 : 1.0;
    te[14] = m34 || 0.0;
    te[3] = m41 || 0.0;
    te[7] = m42 || 0.0;
    te[11] = m43 || 0.0;
    te[15] = m44 != undefined ? m44 : 1.0;
}

Mathf._classes["Mat4"] = Mat4;

/**
 * @method clone
 * @memberof Xian.Mat4
 * returns new instance of this
 * @return Mat4
 */
Mat4.prototype.clone = function () {
    var te = this.elements;

    return new Mat4(
        te[0], te[4], te[8], te[12],
        te[1], te[5], te[9], te[13],
        te[2], te[6], te[10], te[14],
        te[3], te[7], te[11], te[15]
    );
};

/**
 * @method copy
 * @memberof Xian.Mat4
 * copies other
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];

    return this;
};

/**
 * @method set
 * @memberof Xian.Mat4
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m14
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m24
 * @param Number m31
 * @param Number m32
 * @param Number m33
 * @param Number m34
 * @param Number m41
 * @param Number m42
 * @param Number m43
 * @param Number m44
 * @return this
 */
Mat4.prototype.set = function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    var te = this.elements;

    te[0] = m11;
    te[4] = m12;
    te[8] = m13;
    te[12] = m14;
    te[1] = m21;
    te[5] = m22;
    te[9] = m23;
    te[13] = m24;
    te[2] = m31;
    te[6] = m32;
    te[10] = m33;
    te[14] = m34;
    te[3] = m41;
    te[7] = m42;
    te[11] = m43;
    te[15] = m44;

    return this;
};

/**
 * @method mul
 * @memberof Xian.Mat4
 * muliples this's values by other's
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12],
        a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13],
        a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14],
        a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15],

        b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12],
        b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13],
        b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14],
        b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];

    ae[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    ae[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    ae[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    ae[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    ae[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    ae[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    ae[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    ae[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    ae[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    ae[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    ae[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    ae[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    ae[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    ae[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    ae[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    ae[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;
};

/**
 * @method mmul
 * @memberof Xian.Mat4
 * muliples a and b saves it in this
 * @param Mat4 a
 * @param Mat4 b
 * @return this
 */
Mat4.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12],
        a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13],
        a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14],
        a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15],

        b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12],
        b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13],
        b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14],
        b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;
};

/**
 * @method smul
 * @memberof Xian.Mat4
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat4.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;
    te[9] *= s;
    te[10] *= s;
    te[11] *= s;
    te[12] *= s;
    te[13] *= s;
    te[14] *= s;
    te[15] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Xian.Mat4
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat4.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s !== 0.0 ? 1.0 / s : 1.0;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;
    te[9] *= s;
    te[10] *= s;
    te[11] *= s;
    te[12] *= s;
    te[13] *= s;
    te[14] *= s;
    te[15] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Xian.Mat4
 * identity matrix
 * @return this
 */
Mat4.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 1;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;
    te[9] = 0.0;
    te[10] = 1;
    te[11] = 0.0;
    te[12] = 0.0;
    te[13] = 0.0;
    te[14] = 0.0;
    te[15] = 1;

    return this;
};

/**
 * @method zero
 * @memberof Xian.Mat4
 * zero matrix
 * @return this
 */
Mat4.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;
    te[9] = 0.0;
    te[10] = 0.0;
    te[11] = 0.0;
    te[12] = 0.0;
    te[13] = 0.0;
    te[14] = 0.0;
    te[15] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Xian.Mat4
 * returns the determinant of this
 * @return this
 */
Mat4.prototype.determinant = function () {
    var m11 = ae[0],
        m12 = ae[4],
        m13 = ae[8],
        m14 = ae[12],
        m21 = ae[1],
        m22 = ae[5],
        m23 = ae[9],
        m24 = ae[13],
        m31 = ae[2],
        m32 = ae[6],
        m33 = ae[10],
        m34 = ae[14],
        m41 = ae[3],
        m42 = ae[7],
        m43 = ae[11],
        m44 = ae[15];

    return (
    m41 * (m14 * m23 * m32 - m13 * m24 * m32 - m14 * m22 * m33 + m12 * m24 * m33 + m13 * m22 * m34 - m12 * m23 * m34) +
    m42 * (m11 * m23 * m34 - m11 * m24 * m33 + m14 * m21 * m33 - m13 * m21 * m34 + m13 * m24 * m31 - m14 * m23 * m31) +
    m43 * (m11 * m24 * m32 - m11 * m22 * m34 - m14 * m21 * m32 + m12 * m21 * m34 + m14 * m22 * m31 - m12 * m24 * m31) +
    m44 * (-m13 * m22 * m31 - m11 * m23 * m32 + m11 * m22 * m33 + m13 * m21 * m32 - m12 * m21 * m33 + m12 * m23 * m31)
    );
};

/**
 * @method inverse
 * @memberof Xian.Mat4
 * returns the inverse of this
 * @return this
 */
Mat4.prototype.inverse = function () {
    var te = this.elements,

        m11 = te[0],
        m12 = te[4],
        m13 = te[8],
        m14 = te[12],
        m21 = te[1],
        m22 = te[5],
        m23 = te[9],
        m24 = te[13],
        m31 = te[2],
        m32 = te[6],
        m33 = te[10],
        m34 = te[14],
        m41 = te[3],
        m42 = te[7],
        m43 = te[11],
        m44 = te[15],

        me0 = m23 * m34 * m42 - m24 * m33 * m42 + m24 * m32 * m43 - m22 * m34 * m43 - m23 * m32 * m44 + m22 * m33 * m44,
        me4 = m14 * m33 * m42 - m13 * m34 * m42 - m14 * m32 * m43 + m12 * m34 * m43 + m13 * m32 * m44 - m12 * m33 * m44,
        me8 = m13 * m24 * m42 - m14 * m23 * m42 + m14 * m22 * m43 - m12 * m24 * m43 - m13 * m22 * m44 + m12 * m23 * m44,
        me12 = m14 * m23 * m32 - m13 * m24 * m32 - m14 * m22 * m33 + m12 * m24 * m33 + m13 * m22 * m34 - m12 * m23 * m34,

        det = m11 * me0 + m21 * me4 + m31 * me8 + m41 * me12;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = me0 * det;
    te[4] = me4 * det;
    te[8] = me8 * det;
    te[12] = me12 * det;
    te[1] = (m24 * m33 * m41 - m23 * m34 * m41 - m24 * m31 * m43 + m21 * m34 * m43 + m23 * m31 * m44 - m21 * m33 * m44) * det;
    te[5] = (m13 * m34 * m41 - m14 * m33 * m41 + m14 * m31 * m43 - m11 * m34 * m43 - m13 * m31 * m44 + m11 * m33 * m44) * det;
    te[9] = (m14 * m23 * m41 - m13 * m24 * m41 - m14 * m21 * m43 + m11 * m24 * m43 + m13 * m21 * m44 - m11 * m23 * m44) * det;
    te[13] = (m13 * m24 * m31 - m14 * m23 * m31 + m14 * m21 * m33 - m11 * m24 * m33 - m13 * m21 * m34 + m11 * m23 * m34) * det;
    te[2] = (m22 * m34 * m41 - m24 * m32 * m41 + m24 * m31 * m42 - m21 * m34 * m42 - m22 * m31 * m44 + m21 * m32 * m44) * det;
    te[6] = (m14 * m32 * m41 - m12 * m34 * m41 - m14 * m31 * m42 + m11 * m34 * m42 + m12 * m31 * m44 - m11 * m32 * m44) * det;
    te[10] = (m12 * m24 * m41 - m14 * m22 * m41 + m14 * m21 * m42 - m11 * m24 * m42 - m12 * m21 * m44 + m11 * m22 * m44) * det;
    te[14] = (m14 * m22 * m31 - m12 * m24 * m31 - m14 * m21 * m32 + m11 * m24 * m32 + m12 * m21 * m34 - m11 * m22 * m34) * det;
    te[3] = (m23 * m32 * m41 - m22 * m33 * m41 - m23 * m31 * m42 + m21 * m33 * m42 + m22 * m31 * m43 - m21 * m32 * m43) * det;
    te[7] = (m12 * m33 * m41 - m13 * m32 * m41 + m13 * m31 * m42 - m11 * m33 * m42 - m12 * m31 * m43 + m11 * m32 * m43) * det;
    te[11] = (m13 * m22 * m41 - m12 * m23 * m41 - m13 * m21 * m42 + m11 * m23 * m42 + m12 * m21 * m43 - m11 * m22 * m43) * det;
    te[15] = (m12 * m23 * m31 - m13 * m22 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 + m11 * m22 * m33) * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Xian.Mat4
 * returns the inverse of other
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[4],
        m13 = me[8],
        m14 = me[12],
        m21 = me[1],
        m22 = me[5],
        m23 = me[9],
        m24 = me[13],
        m31 = me[2],
        m32 = me[6],
        m33 = me[10],
        m34 = me[14],
        m41 = me[3],
        m42 = me[7],
        m43 = me[11],
        m44 = me[15],

        me0 = m23 * m34 * m42 - m24 * m33 * m42 + m24 * m32 * m43 - m22 * m34 * m43 - m23 * m32 * m44 + m22 * m33 * m44,
        me4 = m14 * m33 * m42 - m13 * m34 * m42 - m14 * m32 * m43 + m12 * m34 * m43 + m13 * m32 * m44 - m12 * m33 * m44,
        me8 = m13 * m24 * m42 - m14 * m23 * m42 + m14 * m22 * m43 - m12 * m24 * m43 - m13 * m22 * m44 + m12 * m23 * m44,
        me12 = m14 * m23 * m32 - m13 * m24 * m32 - m14 * m22 * m33 + m12 * m24 * m33 + m13 * m22 * m34 - m12 * m23 * m34,

        det = m11 * me0 + m21 * me4 + m31 * me8 + m41 * me12;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = me0 * det;
    te[4] = me4 * det;
    te[8] = me8 * det;
    te[12] = me12 * det;
    te[1] = (m24 * m33 * m41 - m23 * m34 * m41 - m24 * m31 * m43 + m21 * m34 * m43 + m23 * m31 * m44 - m21 * m33 * m44) * det;
    te[5] = (m13 * m34 * m41 - m14 * m33 * m41 + m14 * m31 * m43 - m11 * m34 * m43 - m13 * m31 * m44 + m11 * m33 * m44) * det;
    te[9] = (m14 * m23 * m41 - m13 * m24 * m41 - m14 * m21 * m43 + m11 * m24 * m43 + m13 * m21 * m44 - m11 * m23 * m44) * det;
    te[13] = (m13 * m24 * m31 - m14 * m23 * m31 + m14 * m21 * m33 - m11 * m24 * m33 - m13 * m21 * m34 + m11 * m23 * m34) * det;
    te[2] = (m22 * m34 * m41 - m24 * m32 * m41 + m24 * m31 * m42 - m21 * m34 * m42 - m22 * m31 * m44 + m21 * m32 * m44) * det;
    te[6] = (m14 * m32 * m41 - m12 * m34 * m41 - m14 * m31 * m42 + m11 * m34 * m42 + m12 * m31 * m44 - m11 * m32 * m44) * det;
    te[10] = (m12 * m24 * m41 - m14 * m22 * m41 + m14 * m21 * m42 - m11 * m24 * m42 - m12 * m21 * m44 + m11 * m22 * m44) * det;
    te[14] = (m14 * m22 * m31 - m12 * m24 * m31 - m14 * m21 * m32 + m11 * m24 * m32 + m12 * m21 * m34 - m11 * m22 * m34) * det;
    te[3] = (m23 * m32 * m41 - m22 * m33 * m41 - m23 * m31 * m42 + m21 * m33 * m42 + m22 * m31 * m43 - m21 * m32 * m43) * det;
    te[7] = (m12 * m33 * m41 - m13 * m32 * m41 + m13 * m31 * m42 - m11 * m33 * m42 - m12 * m31 * m43 + m11 * m32 * m43) * det;
    te[11] = (m13 * m22 * m41 - m12 * m23 * m41 - m13 * m21 * m42 + m11 * m23 * m42 + m12 * m21 * m43 - m11 * m22 * m43) * det;
    te[15] = (m12 * m23 * m31 - m13 * m22 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 + m11 * m22 * m33) * det;

    return this;
};

/**
 * @method transpose
 * @memberof Xian.Mat4
 * transposes this matrix
 * @return this
 */
Mat4.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;

    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Xian.Mat4
 * sets the diagonal of matrix
 * @param Vec4 v
 * @return this
 */
Mat4.prototype.setTrace = function (v) {
    var te = this.elements,
        w = v.w;

    te[0] = v.x;
    te[5] = v.y;
    te[10] = v.z;
    te[15] = w != undefined ? w : 1.0;

    return this;
};

/**
 * @method lookAt
 * @memberof Xian.Mat4
 * makes matrix look from eye at target along up vector
 * @param Vec3 eye
 * @param Vec3 target
 * @param Vec3 up
 * @return this
 */
Mat4.prototype.lookAt = function () {
    var dup = new Vec3(0.0, 0.0, 1.0),
        x = new Vec3,
        y = new Vec3,
        z = new Vec3;

    return function (eye, target, up) {
        up || (up = dup);
        var te = this.elements;

        z.vsub(eye, target).normalize();
        if (z.length() === 0.0) z.z = 1.0;

        x.vcross(up, z).normalize();

        if (x.length() === 0.0) {
            z.x += 0.000001;
            x.vcross(up, z).normalize();
        }

        y.vcross(z, x);


        te[0] = x.x;
        te[4] = y.x;
        te[8] = z.x;
        te[1] = x.y;
        te[5] = y.y;
        te[9] = z.y;
        te[2] = x.z;
        te[6] = y.z;
        te[10] = z.z;

        return this;
    };
}();

/**
 * @method compose
 * @memberof Xian.Mat4
 * sets matrix from position, scale, and quaternion
 * @param Vec3 position
 * @param Vec3 scale
 * @param Quat rotation
 * @return this
 */
Mat4.prototype.compose = function (position, scale, rotation) {
    var te = this.elements,
        x = rotation.x,
        y = rotation.y,
        z = rotation.z,
        w = rotation.w,
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,

        sx = scale.x,
        sy = scale.y,
        sz = scale.z;

    te[0] = (1.0 - (yy + zz)) * sx;
    te[4] = (xy - wz) * sy;
    te[8] = (xz + wy) * sz;

    te[1] = (xy + wz) * sx;
    te[5] = (1.0 - (xx + zz)) * sy;
    te[9] = (yz - wx) * sz;

    te[2] = (xz - wy) * sx;
    te[6] = (yz + wx) * sy;
    te[10] = (1.0 - (xx + yy)) * sz;

    te[3] = 0.0;
    te[7] = 0.0;
    te[11] = 0.0;

    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1.0;

    return this;
};

/**
 * @method decompose
 * @memberof Xian.Mat4
 * gets matrix position, scale, quaternion
 * @param Vec3 position
 * @param Vec3 scale
 * @param Quat quaternion
 * @return this
 */
Mat4.prototype.decompose = function (position, scale, quaternion) {
    var te = this.elements,

        m11 = te[0],
        m12 = te[4],
        m13 = te[8],
        m21 = te[1],
        m22 = te[5],
        m23 = te[9],
        m31 = te[2],
        m32 = te[6],
        m33 = te[10],
        trace, x = 0.0,
        y = 0.0,
        z = 0.0,
        w = 1,
        s,

        sx = scale.set(m11, m21, m31).length(),
        sy = scale.set(m12, m22, m32).length(),
        sz = scale.set(m13, m23, m33).length(),

        invSx = 1 / sx,
        invSy = 1 / sy,
        invSz = 1 / sz;

    scale.x = sx;
    scale.y = sy;
    scale.z = sz;

    position.x = te[12];
    position.y = te[13];
    position.z = te[14];

    m11 *= invSx;
    m12 *= invSy;
    m13 *= invSz;
    m21 *= invSx;
    m22 *= invSy;
    m23 *= invSz;
    m31 *= invSx;
    m32 *= invSy;
    m33 *= invSz;

    trace = m11 + m22 + m33;

    if (trace > 0.0) {
        s = 0.5 / sqrt(trace + 1.0);

        w = 0.25 / s;
        x = (m32 - m23) * s;
        y = (m13 - m31) * s;
        z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
        s = 2.0 * sqrt(1.0 + m11 - m22 - m33);

        w = (m32 - m23) / s;
        x = 0.25 * s;
        y = (m12 + m21) / s;
        z = (m13 + m31) / s;
    } else if (m22 > m33) {
        s = 2.0 * sqrt(1.0 + m22 - m11 - m33);

        w = (m13 - m31) / s;
        x = (m12 + m21) / s;
        y = 0.25 * s;
        z = (m23 + m32) / s;
    } else {
        s = 2.0 * sqrt(1.0 + m33 - m11 - m22);

        w = (m21 - m12) / s;
        x = (m13 + m31) / s;
        y = (m23 + m32) / s;
        z = 0.25 * s;
    }

    quaternion.x = x;
    quaternion.y = y;
    quaternion.w = w;
    quaternion.z = z;

    return this;
};

/**
 * @method setPosition
 * @memberof Xian.Mat4
 * sets position of matrix
 * @param Vec3 v
 * @return this
 */
Mat4.prototype.setPosition = function (v) {
    var te = this.elements,
        z = v.z;

    te[12] = v.x;
    te[13] = v.y;
    te[14] = z != undefined ? z : 0.0;

    return this;
};

/**
 * @method extractPosition
 * @memberof Xian.Mat4
 * gets position from other saves it in this
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.extractPosition = function (other) {
    var te = this.elements,
        me = other.elements;

    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];

    return this;
};

/**
 * @method extractRotation
 * @memberof Xian.Mat4
 * gets rotation from other saves it in this
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.extractRotation = function () {
    var vec = new Vec3();

    return function (other) {
        var te = this.elements,
            me = other.elements,

            lx = vec.set(me[0], me[1], me[2]).lengthSq(),
            ly = vec.set(me[4], me[5], me[6]).lengthSq(),
            lz = vec.set(me[8], me[9], me[10]).lengthSq(),

            scaleX = lx > 0.0 ? 1.0 / sqrt(lx) : 0.0,
            scaleY = ly > 0.0 ? 1.0 / sqrt(ly) : 0.0,
            scaleZ = lz > 0.0 ? 1.0 / sqrt(lz) : 0.0;

        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;

        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;

        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;

        return this;
    };
}();

/**
 * @method extractRotationScale
 * @memberof Xian.Mat4
 * gets rotation with scale from other saves it in this
 * @param Mat4 other
 * @return this
 */
Mat4.prototype.extractRotationScale = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];

    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];

    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];

    return this;
};

/**
 * @method translate
 * @memberof Xian.Mat4
 * translates matrix by vector
 * @param Vec3 v
 * @return this
 */
Mat4.prototype.translate = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y,
        z = v.z || 0.0;

    te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
    te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
    te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
    te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];

    return this;
};

/**
 * @method scale
 * @memberof Xian.Mat4
 * scales matrix by vector
 * @param Vec3 v
 * @return this
 */
Mat4.prototype.scale = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y,
        z = v.z;

    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;

    return this;
};

/**
 * @method rotateX
 * @memberof Xian.Mat4
 * rotates matrix along x axis by angle
 * @param Number angle
 * @return this
 */
Mat4.prototype.rotateX = function (angle) {
    var te = this.elements,
        m12 = te[4],
        m22 = te[5],
        m32 = te[6],
        m42 = te[7],
        m13 = te[8],
        m23 = te[9],
        m33 = te[10],
        m43 = te[11],
        c = cos(angle),
        s = sin(angle);

    te[4] = c * m12 + s * m13;
    te[5] = c * m22 + s * m23;
    te[6] = c * m32 + s * m33;
    te[7] = c * m42 + s * m43;

    te[8] = c * m13 - s * m12;
    te[9] = c * m23 - s * m22;
    te[10] = c * m33 - s * m32;
    te[11] = c * m43 - s * m42;

    return this;
};

/**
 * @method rotateY
 * @memberof Xian.Mat4
 * rotates matrix along y axis by angle
 * @param Number angle
 * @return this
 */
Mat4.prototype.rotateY = function (angle) {
    var te = this.elements,
        m11 = te[0],
        m21 = te[1],
        m31 = te[2],
        m41 = te[3],
        m13 = te[8],
        m23 = te[9],
        m33 = te[10],
        m43 = te[11],
        c = cos(angle),
        s = sin(angle);

    te[0] = c * m11 - s * m13;
    te[1] = c * m21 - s * m23;
    te[2] = c * m31 - s * m33;
    te[3] = c * m41 - s * m43;

    te[8] = c * m13 + s * m11;
    te[9] = c * m23 + s * m21;
    te[10] = c * m33 + s * m31;
    te[11] = c * m43 + s * m41;

    return this;
};

/**
 * @method rotateZ
 * @memberof Xian.Mat4
 * rotates matrix along z axis by angle
 * @param Number angle
 * @return this
 */
Mat4.prototype.rotateZ = function (angle) {
    var te = this.elements,
        m11 = te[0],
        m21 = te[1],
        m31 = te[2],
        m41 = te[3],
        m12 = te[4],
        m22 = te[5],
        m32 = te[6],
        m42 = te[7],
        c = cos(angle),
        s = sin(angle);

    te[0] = c * m11 + s * m12;
    te[1] = c * m21 + s * m22;
    te[2] = c * m31 + s * m32;
    te[3] = c * m41 + s * m42;

    te[4] = c * m12 - s * m11;
    te[5] = c * m22 - s * m21;
    te[6] = c * m32 - s * m31;
    te[7] = c * m42 - s * m41;

    return this;
};

/**
 * @method makeTranslation
 * @memberof Xian.Mat4
 * makes this a translation matrix
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Mat4.prototype.makeTranslation = function (x, y, z) {

    return this.set(
        1, 0.0, 0.0, x,
        0.0, 1, 0.0, y,
        0.0, 0.0, 1, z,
        0.0, 0.0, 0.0, 1
    );
};

/**
 * @method makeScale
 * @memberof Xian.Mat4
 * makes this a scale matrix
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Mat4.prototype.makeScale = function (x, y, z) {

    return this.set(
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1
    );
};

/**
 * @method makeRotationX
 * @memberof Xian.Mat4
 * makes this a rotation matrix along x axis
 * @param Number angle
 * @return this
 */
Mat4.prototype.makeRotationX = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        1, 0.0, 0.0, 0.0,
        0.0, c, -s, 0.0,
        0.0, s, c, 0.0,
        0.0, 0.0, 0.0, 1
    );
};

/**
 * @method makeRotationY
 * @memberof Xian.Mat4
 * makes this a rotation matrix along y axis
 * @param Number angle
 * @return this
 */
Mat4.prototype.makeRotationY = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, 0.0, s, 0.0,
        0.0, 1, 0.0, 0.0, -s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1
    );
};

/**
 * @method makeRotationZ
 * @memberof Xian.Mat4
 * makes this a rotation matrix along z axis
 * @param Number angle
 * @return this
 */
Mat4.prototype.makeRotationZ = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, -s, 0.0, 0.0,
        s, c, 0.0, 0.0,
        0.0, 0.0, 1, 0.0,
        0.0, 0.0, 0.0, 1
    );
};

/**
 * @method frustum
 * @memberof Xian.Mat4
 * makes frustum matrix
 * @param Number left
 * @param Number right
 * @param Number bottom
 * @param Number top
 * @param Number near
 * @param Number far
 * @return this
 */
Mat4.prototype.frustum = function (left, right, top, bottom, near, far) {
    var te = this.elements,
        x = 2 * near / (right - left),
        y = 2 * near / (top - bottom),

        a = (right + left) / (right - left),
        b = (top + bottom) / (top - bottom),
        c = -(far + near) / (far - near),
        d = -2 * far * near / (far - near);

    te[0] = x;
    te[4] = 0.0;
    te[8] = a;
    te[12] = 0.0;
    te[1] = 0.0;
    te[5] = y;
    te[9] = b;
    te[13] = 0.0;
    te[2] = 0.0;
    te[6] = 0.0;
    te[10] = c;
    te[14] = d;
    te[3] = 0.0;
    te[7] = 0.0;
    te[11] = -1;
    te[15] = 0.0;

    return this;
};

/**
 * @method perspective
 * @memberof Xian.Mat4
 * makes perspective matrix
 * @param Number fov
 * @param Number aspect
 * @param Number near
 * @param Number far
 * @return this
 */
Mat4.prototype.perspective = function (fov, aspect, near, far) {
    var ymax = near * tan(fov * 0.5),
        ymin = -ymax,
        xmin = ymin * aspect,
        xmax = ymax * aspect;

    return this.frustum(xmin, xmax, ymax, ymin, near, far);
};

/**
 * @method orthographic
 * @memberof Xian.Mat4
 * makes orthographic matrix
 * @param Number left
 * @param Number right
 * @param Number bottom
 * @param Number top
 * @param Number near
 * @param Number far
 * @return this
 */
Mat4.prototype.orthographic = function (left, right, top, bottom, near, far) {
    var te = this.elements,
        w = right - left,
        h = top - bottom,
        p = far - near,

        x = (right + left) / w,
        y = (top + bottom) / h,
        z = (far + near) / p;

    te[0] = 2 / w;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 2 / h;
    te[6] = 0.0;
    te[7] = 0.0
    te[8] = 0.0;
    te[9] = 0.0;
    te[10] = -2 / p;
    te[11] = 0.0;
    te[12] = -x;
    te[13] = -y;
    te[14] = -z;
    te[15] = 1;

    return this;
};

/**
 * @method fromMat2
 * @memberof Xian.Mat4
 * sets this from Mat2
 * @param Mat2 m
 * @return this
 */
Mat4.prototype.fromMat2 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = me[2];
    te[5] = me[3];
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;
    te[9] = 0.0;
    te[10] = 1;
    te[11] = 0.0;
    te[12] = 0.0;
    te[13] = 0.0;
    te[14] = 0.0;
    te[15] = 1;

    return this;
};

/**
 * @method fromMat32
 * @memberof Xian.Mat4
 * sets this from Mat32
 * @param Mat32 m
 * @return this
 */
Mat4.prototype.fromMat32 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = me[2];
    te[5] = me[3];
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;
    te[9] = 0.0;
    te[10] = 1;
    te[11] = 0.0;
    te[12] = me[4];
    te[13] = me[5];
    te[14] = 0.0;
    te[15] = 1;

    return this;
};

/**
 * @method fromMat3
 * @memberof Xian.Mat4
 * sets this from Mat3
 * @param Mat3 m
 * @return this
 */
Mat4.prototype.fromMat3 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = 0.0;
    te[4] = me[3];
    te[5] = me[4];
    te[6] = me[5];
    te[7] = 0.0;
    te[8] = me[6];
    te[9] = me[7];
    te[10] = me[8];
    te[11] = 0.0;
    te[12] = 0.0;
    te[13] = 0.0;
    te[14] = 0.0;
    te[15] = 1;

    return this;
};

/**
 * @method fromQuat
 * @memberof Xian.Mat4
 * sets rotation of this from quaterian
 * @param Quat q
 * @return this
 */
Mat4.prototype.fromQuat = function (q) {
    var te = this.elements,
        x = q.x,
        y = q.y,
        z = q.z,
        w = q.w,
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    te[0] = 1 - (yy + zz);
    te[4] = xy - wz;
    te[8] = xz + wy;

    te[1] = xy + wz;
    te[5] = 1 - (xx + zz);
    te[9] = yz - wx;

    te[2] = xz - wy;
    te[6] = yz + wx;
    te[10] = 1 - (xx + yy);

    te[3] = 0.0;
    te[7] = 0.0;
    te[11] = 0.0;

    te[12] = 0.0;
    te[13] = 0.0;
    te[14] = 0.0;
    te[15] = 1;

    return this;
};

/**
 * @memberof Xian.Mat4
 * @param Xian.Mat4 other
 * @return this
 */
Mat4.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8] ||
    ae[9] !== be[9] ||
    ae[10] !== be[10] ||
    ae[11] !== be[11] ||
    ae[12] !== be[12] ||
    ae[13] !== be[13] ||
    ae[14] !== be[14] ||
    ae[15] !== be[15]
    );
};

/**
 * @memberof Xian.Mat4
 * @param Xian.Mat4 other
 * @return this
 */
Mat4.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8] ||
    ae[9] !== be[9] ||
    ae[10] !== be[10] ||
    ae[11] !== be[11] ||
    ae[12] !== be[12] ||
    ae[13] !== be[13] ||
    ae[14] !== be[14] ||
    ae[15] !== be[15]
    );
};

/**
 * @method fromJSON
 * @memberof Xian.Mat4
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat4.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];

    return this;
};

/**
 * @method toJSON
 * @memberof Xian.Mat4
 * returns json object of this
 * @return Object
 */
Mat4.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat4";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];
    je[4] = te[4];
    je[5] = te[5];
    je[6] = te[6];
    je[7] = te[7];
    je[8] = te[8];
    je[9] = te[9];
    je[10] = te[10];
    je[11] = te[11];
    je[12] = te[12];
    je[13] = te[13];
    je[14] = te[14];
    je[15] = te[15];

    return json;
};

/**
 * @method fromArray
 * @memberof Xian.Mat4
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat4.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];
    te[4] = array[4];
    te[5] = array[5];
    te[6] = array[6];
    te[7] = array[7];
    te[8] = array[8];
    te[9] = array[9];
    te[10] = array[10];
    te[11] = array[11];
    te[12] = array[12];
    te[13] = array[13];
    te[14] = array[14];
    te[15] = array[15];

    return this;
};

/**
 * @method toArray
 * @memberof Xian.Mat4
 * returns array object of this
 * @return Object
 */
Mat4.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];
    array[6] = te[6];
    array[7] = te[7];
    array[8] = te[8];
    array[9] = te[9];
    array[10] = te[10];
    array[11] = te[11];
    array[12] = te[12];
    array[13] = te[13];
    array[14] = te[14];
    array[15] = te[15];

    return array;
};

/**
 * @method toString
 * @memberof Xian.Mat4
 * returns string of this
 * @return String
 */
Mat4.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat4[" + te[0] + ", " + te[4] + ", " + te[8] + ", " + te[12] + "]\n" +
    "     [" + te[1] + ", " + te[5] + ", " + te[9] + ", " + te[13] + "]\n" +
    "     [" + te[2] + ", " + te[6] + ", " + te[10] + ", " + te[14] + "]\n" +
    "     [" + te[3] + ", " + te[7] + ", " + te[11] + ", " + te[15] + "]"
    );
};


module.exports = Mat4;

},{"./mathf":107,"./vec3":112}],107:[function(require,module,exports){
"use strict";


var random = Math.random,
    abs = Math.abs,
    cos = Math.cos,
    pow = Math.pow,
    floor = Math.floor,
    ceil = Math.ceil,
    atan2 = Math.atan2,
    EPSILON = 0.000001,
    PI = 3.1415926535897932384626433832795028841968,
    TWO_PI = PI * 2,
    HALF_PI = PI * 0.5,
    TO_RADS = PI / 180.0,
    TO_DEGS = 180.0 / PI,
    keys = Object.keys,
    modulo, clamp01, standardRadian, standardAngle, radsToDegs;


/**
 * @class Mathf
 * collection of common math functions
 */
function Mathf() {

    /**
     * @property Number PI
     * The infamous 3.14159265358979323846264338327950.028841968
     * @memberof Odin.Mathf
     */
    this.PI = PI;

    /**
     * @property Number TWO_PI
     * 2 * PI
     * @memberof Odin.Mathf
     */
    this.TWO_PI = TWO_PI;

    /**
     * @property Number HALF_PI
     * PI / 2
     * @memberof Odin.Mathf
     */
    this.HALF_PI = HALF_PI;

    /**
     * @property Number EPSILON
     * A small number value
     * @memberof Odin.Mathf
     */
    this.EPSILON = EPSILON;

    /**
     * @property Number TO_RADS
     * Degrees to radians conversion constant
     * @memberof Odin.Mathf
     */
    this.TO_RADS = TO_RADS;

    /**
     * @property Number TO_DEGS
     * Radians to degrees conversion constant
     * @memberof Odin.Mathf
     */
    this.TO_DEGS = TO_DEGS;
}

Mathf.prototype._classes = {};

Mathf.prototype.acos = Math.acos;
Mathf.prototype.asin = Math.asin;
Mathf.prototype.atan = Math.atan;
Mathf.prototype.atan2 = Math.atan2;

Mathf.prototype.cos = Math.cos;
Mathf.prototype.sin = Math.sin;
Mathf.prototype.tan = Math.tan;

Mathf.prototype.abs = Math.abs;
Mathf.prototype.ceil = Math.ceil;
Mathf.prototype.exp = Math.exp;
Mathf.prototype.floor = Math.floor;
Mathf.prototype.log = Math.log;
Mathf.prototype.max = Math.max;
Mathf.prototype.min = Math.min;
Mathf.prototype.pow = Math.pow;
Mathf.prototype.random = Math.random;
Mathf.prototype.round = Math.round;
Mathf.prototype.sqrt = Math.sqrt;

/**
 * @method equals
 * @memberof Odin.Mathf
 * returns if a = b within some value, defaults to Mathf.EPSILON
 * @param Number a
 * @param Number b
 * @param Number e
 * @return Boolean
 */
Mathf.prototype.equals = function (a, b, e) {

    return abs(a - b) < (e || EPSILON);
};

/**
 * @method modulo
 * @memberof Odin.Mathf
 * returns remainder of a / b
 * @param Number a
 * @param Number b
 * @return Number
 */
Mathf.prototype.modulo = modulo = function (a, b) {
    var r = a % b;

    return (r * b < 0.0) ? r + b : r;
};

/**
 * @method standardRadian
 * @memberof Odin.Mathf
 * convertes x to radian where 0.0 <= x < 2PI
 * @param Number x
 * @return Number
 */
Mathf.prototype.standardRadian = standardRadian = function (x) {

    return modulo(x, TWO_PI);
};

/**
 * @method standardAngle
 * @memberof Odin.Mathf
 * convertes x to angle where 0.0 <= x < 360.0
 * @param Number x
 * @return Number
 */
Mathf.prototype.standardAngle = standardAngle = function (x) {

    return modulo(x, 360.0);
};

/**
 * @method sign
 * @memberof Odin.Mathf
 * gets sign of x
 * @param Number x
 * @return Number
 */
Mathf.prototype.sign = function (x) {

    return x < 0 ? -1 : 1;
};

/**
 * @method clamp
 * @memberof Odin.Mathf
 * clamp x between min and max
 * @param Number x
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.clamp = function (x, min, max) {

    return x < min ? min : x > max ? max : x;
};

/**
 * @method clampBottom
 * @memberof Odin.Mathf
 * clamp x between min and Infinity
 * @param Number x
 * @param Number min
 * @return Number
 */
Mathf.prototype.clampBottom = function (x, min) {

    return x < min ? min : x;
};

/**
 * @method clampTop
 * @memberof Odin.Mathf
 * clamp x between -Infinity and max
 * @param Number x
 * @param Number max
 * @return Number
 */
Mathf.prototype.clampTop = function (x, max) {

    return x > max ? max : x;
};

/**
 * @method clamp01
 * @memberof Odin.Mathf
 * clamp x between 0.0 and 1
 * @param Number x
 * @return Number
 */
Mathf.prototype.clamp01 = clamp01 = function (x) {

    return x < 0.0 ? 0.0 : x > 1 ? 1 : x;
};

/**
 * @method truncate
 * @memberof Odin.Mathf
 * truncate x to have n number of decial places
 * @param Number x
 * @param Number n
 * @return Number
 */
Mathf.prototype.truncate = function (x, n) {
    var p = pow(10.0, n),
        num = x * p;

    return (num < 0.0 ? ceil(num) : floor(num)) / p;
};

/**
 * @method lerp
 * @memberof Odin.Mathf
 * linear interpolation between a and b by x
 * @param Number a
 * @param Number b
 * @param Number x
 * @return Number
 */
Mathf.prototype.lerp = function (a, b, x) {

    return a + (b - a) * x;
};

/**
 * @method lerpAngle
 * @memberof Odin.Mathf
 * linear interpolation between a and b by x insures 0.0 <= x < 2PI
 * @param Number a
 * @param Number b
 * @param Number x
 * @return Number
 */
Mathf.prototype.lerpAngle = function (a, b, x) {

    return standardRadian(a + (b - a) * x);
};

/**
 * @method cosLerp
 * @memberof Odin.Mathf
 * cosine interpolation between a and b by x
 * @param Number a
 * @param Number b
 * @param Number x
 * @return Number
 */
Mathf.prototype.lerpCos = function (a, b, x) {
    var ft = x * PI,
        f = (1.0 - cos(ft)) * 0.5;

    return a * (1.0 - f) + b * f;
};

/**
 * @method lerpCubic
 * @memberof Odin.Mathf
 * cubic interpolation between v1 and v2 by x
 * @param Number v0
 * @param Number v1
 * @param Number v2
 * @param Number v3
 * @param Number x
 * @return Number
 */
Mathf.prototype.lerpCubic = function (v0, v1, v2, v3, x) {
    v0 || (v0 = v1);
    v3 || (v3 = v2);
    var P = (v3 - v2) - (v0 - v1),
        Q = (v0 - v1) - P,
        R = v2 - v0,
        S = v1,

        Px = P * x,
        Qx = Q * x,
        Rx = R * x;

    return (Px * Px * Px) + (Qx * Qx) + Rx + S;
};

/**
 * smooth step, if input is between min and max this returns a value proportionately between 0.0 and 1
 * @method smoothStep
 * @memberof Odin.Mathf
 * @param Number x
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.smoothStep = function (x, min, max) {
    if (x <= min) return 0.0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * (3 - 2 * x);
};

/**
 * @method smootherStep
 * @memberof Odin.Mathf
 * smoother step, if input is between min and max this returns a value proportionately between 0.0 and 1
 * @param Number x
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.smootherStep = function (x, min, max) {
    if (x <= min) return 0.0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * x * (x * (x * 6 - 15) + 10.0);
};

/**
 * @method pingPong
 * @memberof Odin.Mathf
 * PingPongs the value x, so that it is never larger than length and never smaller than 0.0.
 * @param Number x
 * @param Number length
 * @return Number
 */
Mathf.prototype.pingPong = function (x, length) {
    length || (length = 1);

    return length - abs(x % (2 * length) - length);
};

/**
 * @method degsToRads
 * @memberof Odin.Mathf
 * convertes degrees to radians
 * @param Number x
 * @return Number
 */
Mathf.prototype.degsToRads = function (x) {

    return standardRadian(x * TO_RADS);
};

/**
 * @method radsToDegs
 * @memberof Odin.Mathf
 * convertes radians to degrees
 * @param Number x
 * @return Number
 */
Mathf.prototype.radsToDegs = radsToDegs = function (x) {

    return standardAngle(x * TO_DEGS);
};

/**
 * @method randInt
 * @memberof Odin.Mathf
 * returns random number between min and max
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.randInt = function (min, max) {

    return floor(min + (random() * (max + 1 - min)));
};

/**
 * @method randFloat
 * @memberof Odin.Mathf
 * returns random number between min and max
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.randFloat = function (min, max) {

    return min + (random() * (max - min));
};

/**
 * @method randSign
 * @memberof Odin.Mathf
 * returns either -1 or 1
 * @param Number min
 * @param Number max
 * @return Number
 */
Mathf.prototype.randSign = function () {

    return random() < 0.5 ? 1 : -1;
};

/**
 * @method randChoice
 * @memberof Odin.Mathf
 * returns random item from array
 * @param Array array
 * @return Number
 */
Mathf.prototype.randChoice = function (array) {

    return array[(random() * array.length) | 0.0];
};

/**
 * @method shuffle
 * @memberof Odin.Mathf
 * shuffles array
 * @param Array array
 * @return Array
 */
Mathf.prototype.shuffle = function (array) {

    for (var j, x, i = array.length; i; j = (random() * i) | 0.0, x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

/**
 * @method randArg
 * @memberof Odin.Mathf
 * returns random argument from arguments
 * @return Number
 */
Mathf.prototype.randArg = function () {

    return arguments[(random() * arguments.length) | 0.0];
};

/**
 * @method randChoiceObject
 * @memberof Odin.Mathf
 * returns random key from object
 * @param Object obj
 * @return Number
 */
Mathf.prototype.randChoiceObject = function (obj) {
    var array = keys(obj);

    return array[(random() * array.length) | 0.0];
};

/**
 * @method isPowerOfTwo
 * @memberof Odin.Mathf
 * checks if x is a power of 2
 * @param Number x
 * @return Number
 */
Mathf.prototype.isPowerOfTwo = function (x) {

    return (x & -x) === x;
};

/**
 * @method floorPowerOfTwo
 * @memberof Odin.Mathf
 * returns number's floor power of 2
 * @param Number x
 * @return Number
 */
Mathf.prototype.floorPowerOfTwo = function (x) {
    var i = 2,
        prev;

    while (i < x) {
        prev = i;
        i *= 2;
    }

    return prev;
};

/**
 * @method ceilPowerOfTwo
 * @memberof Odin.Mathf
 * returns number's ceil power of 2
 * @param Number x
 * @return Number
 */
Mathf.prototype.ceilPowerOfTwo = function (x) {
    var i = 2;

    while (i < x) {
        i *= 2;
    }

    return i;
};

/**
 * @method fromJSON
 * @memberof Odin.Mathf
 * returns Math class based on json _className
 * @param Object json
 * @return MATH_CLASS
 */
Mathf.prototype.fromJSON = function (json) {

    return new this._classes[json._className]().fromJSON(json);
};


/**
 * @method directionAngle
 * @memberof Odin.Mathf
 * returns direction string of an angle in radians
 * @param Number x
 * @param Number y
 * @return String
 */

var n225 = 0.39269908169872414,
    n675 = 1.1780972450961724,
    n1125 = 1.9634954084936207,
    n1575 = 2.748893571891069,
    n2025 = 3.5342917352885173,
    n2475 = 4.319689898685966,
    n2925 = 5.105088062083414,
    n3375 = 5.8904862254808625,

    RIGHT = "right",
    UP_RIGHT = "up_right",
    UP = "up",
    UP_LEFT = "up_left",
    LEFT = "left",
    DOWN_LEFT = "down_left",
    DOWN = "down",
    DOWN_RIGHT = "down_right";

Mathf.prototype.directionAngle = function (a) {
    a = standardRadian(a);

    if (a >= n3375 && a < n225) return RIGHT;
    if (a >= n225 && a < n675) return UP_RIGHT;
    if (a >= n675 && a < n1125) return UP;
    if (a >= n1125 && a < n1575) return UP_LEFT;
    if (a >= n1575 && a < n2025) return LEFT;
    if (a >= n2025 && a < n2475) return DOWN_LEFT;
    if (a >= n2475 && a < n2925) return DOWN;
    if (a >= n2925 && a < n3375) return DOWN_RIGHT;

    return RIGHT;
};

/**
 * @method direction
 * @memberof Odin.Mathf
 * returns direction string from an x and a y coordinate
 * @param Number x
 * @param Number y
 * @return String
 */
Mathf.prototype.direction = function (x, y) {
    var a = standardRadian(atan2(y, x));

    if (a >= n3375 && a < n225) return RIGHT;
    if (a >= n225 && a < n675) return UP_RIGHT;
    if (a >= n675 && a < n1125) return UP;
    if (a >= n1125 && a < n1575) return UP_LEFT;
    if (a >= n1575 && a < n2025) return LEFT;
    if (a >= n2025 && a < n2475) return DOWN_LEFT;
    if (a >= n2475 && a < n2925) return DOWN;
    if (a >= n2925 && a < n3375) return DOWN_RIGHT;

    return RIGHT;
};


module.exports = new Mathf;

},{}],108:[function(require,module,exports){
var Mathf = require("./mathf");
var Vec3 = require("./vec3");
"use strict";


var abs = Math.abs,
    sqrt = Math.sqrt,
    acos = Math.acos,
    sin = Math.sin,
    cos = Math.cos,
    EPSILON = Mathf.EPSILON;

/**
 * @class Quat
 * quaternion
 * @param Number x
 * @param Number y
 * @param Number z
 * @param Number w
 */
function Quat(x, y, z, w) {

    /**
     * @property Number x
     * @memberof Odin.Quat
     */
    this.x = x || 0.0;

    /**
     * @property Number y
     * @memberof Odin.Quat
     */
    this.y = y || 0.0;

    /**
     * @property Number z
     * @memberof Odin.Quat
     */
    this.z = z || 0.0;

    /**
     * @property Number w
     * @memberof Odin.Quat
     */
    this.w = w != undefined ? w : 1.0;
}

Mathf._classes["Quat"] = Quat;

/**
 * @method clone
 * @memberof Odin.Quat
 * returns new instance of this
 * @return Quat
 */
Quat.prototype.clone = function () {

    return new Quat(this.x, this.y, this.z, this.w);
};

/**
 * @method copy
 * @memberof Odin.Quat
 * copies other
 * @param Quat other
 * @return this
 */
Quat.prototype.copy = function (other) {

    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.w = other.w;

    return this;
};

/**
 * @method set
 * @memberof Odin.Quat
 * sets values of this
 * @param Number x
 * @param Number y
 * @param Number z
 * @param Number w
 * @return this
 */
Quat.prototype.set = function (x, y, z, w) {

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Quat
 * muliples this's values by other's
 * @param Quat other
 * @return this
 */
Quat.prototype.mul = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        aw = this.w,
        bx = other.x,
        by = other.y,
        bz = other.z,
        bw = other.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
};

/**
 * @method qmul
 * @memberof Odin.Quat
 * muliples a and b saves it in this
 * @param Quat a
 * @param Quat b
 * @return this
 */
Quat.prototype.qmul = function (a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w,
        bx = b.x,
        by = b.y,
        bz = b.z,
        bw = b.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
};

/**
 * @method div
 * @memberof Odin.Quat
 * divides this's values by other's
 * @param Quat other
 * @return this
 */
Quat.prototype.div = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        aw = this.w,
        bx = -other.x,
        by = -other.y,
        bz = -other.z,
        bw = other.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
};

/**
 * @method qdiv
 * @memberof Odin.Quat
 * divides b from a saves it in this
 * @param Quat a
 * @param Quat b
 * @return this
 */
Quat.prototype.qdiv = function (a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w,
        bx = -b.x,
        by = -b.y,
        bz = -b.z,
        bw = b.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
};

/**
 * @method length
 * @memberof Odin.Quat
 * returns the length of this
 * @return Number
 */
Quat.prototype.length = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        lsq = x * x + y * y + z * z + w * w;

    return lsq > 0.0 ? sqrt(lsq) : 0.0;
};

/**
 * @method lengthSq
 * @memberof Odin.Quat
 * returns the squared length of this
 * @return Number
 */
Quat.prototype.lengthSq = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;

    return x * x + y * y + z * z + w * w;
};

/**
 * @method normalize
 * @memberof Odin.Quat
 * returns this with a length of 1
 * @return this
 */
Quat.prototype.normalize = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        l = x * x + y * y + z * z + w * w;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l;
    this.y *= l;
    this.z *= l;
    this.w *= l;

    return this;
};

/**
 * @method inverse
 * @memberof Odin.Quat
 * returns the inverse of this
 * @return this
 */
Quat.prototype.inverse = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        d = x * x + y * y + z * z + w * w,
        invD = d > 0.0 ? 1.0 / d : 0.0;

    this.x *= -invD;
    this.y *= -invD;
    this.z *= -invD;
    this.w *= invD;

    return this;
};

/**
 * @method inverseQuat
 * @memberof Odin.Quat
 * returns the inverse of other
 * @param Quat other
 * @return this
 */
Quat.prototype.inverseQuat = function (other) {
    var x = other.x,
        y = other.y,
        z = other.z,
        w = other.w,
        d = x * x + y * y + z * z + w * w,
        invD = d > 0.0 ? 1.0 / d : 0.0;

    this.x = -x * invD;
    this.y = -y * invD;
    this.z = -z * invD;
    this.w = w * invD;

    return this;
};

/**
 * @method conjugate
 * @memberof Odin.Quat
 * this faster than inverse, if quat is normalized and produces the same result
 * @return this
 */
Quat.prototype.conjugate = function () {

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
};

/**
 * @method calculateW
 * @memberof Odin.Quat
 * calculates w component of quat
 * @return this
 */
Quat.prototype.calculateW = function () {
    var x = this.x,
        y = this.y,
        z = this.z;

    this.w = -sqrt(abs(1 - x * x - y * y - z * z));

    return this;
};

/**
 * @method lerp
 * @memberof Odin.Quat
 * linear interpolation between this and other by x
 * @param Quat other
 * @param Number x
 * @return this
 */
Quat.prototype.lerp = function (other, x) {

    this.x += (other.x - this.x) * x;
    this.y += (other.y - this.y) * x;
    this.z += (other.z - this.z) * x;
    this.w += (other.w - this.w) * x;

    return this;
};

/**
 * @method qlerp
 * @memberof Odin.Quat
 * linear interpolation between a and b by x
 * @param Quat a
 * @param Quat b
 * @param Number x
 * @return this
 */
Quat.prototype.qlerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w;

    this.x = ax + (b.x - ax) * x;
    this.y = ay + (b.y - ay) * x;
    this.z = az + (b.z - az) * x;
    this.w = aw + (b.w - aw) * x;

    return this;
};

/**
 * @method nlerp
 * @memberof Odin.Quat
 * faster but less accurate than slerp
 * @param Quat other
 * @param Number x
 * @return this
 */
Quat.prototype.nlerp = function (other, x) {

    this.x += (other.x - this.x) * x;
    this.y += (other.y - this.y) * x;
    this.z += (other.z - this.z) * x;
    this.w += (other.w - this.w) * x;

    return this.normalize();
};

/**
 * @method qnlerp
 * @memberof Odin.Quat
 * faster but less accurate than qslerp
 * @param Quat a
 * @param Quat b
 * @param Number x
 * @return this
 */
Quat.prototype.qnlerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w;

    this.x = ax + (b.x - ax) * x;
    this.y = ay + (b.y - ay) * x;
    this.z = az + (b.z - az) * x;
    this.w = aw + (b.w - aw) * x;

    return this.normalize();
};

/**
 * @method slerp
 * @memberof Odin.Quat
 * spherical linear Interpolation of this and other by x
 * @param Quat other
 * @param Number x
 * @return this
 */
Quat.prototype.slerp = function (other, x) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        aw = this.w,
        bx = other.x,
        by = other.y,
        bz = other.z,
        bw = other.w,

        omega, sinom, scale0, scale1,
        cosom = ax * bx + ay * by + az * bz + aw * bw;

    if (cosom < 0.0) {
        cosom *= -1;
        bx *= -1;
        by *= -1;
        bz *= -1;
        bw *= -1;
    }

    if (1 - cosom > EPSILON) {
        omega = acos(cosom);
        sinom = 1 / sin(omega);
        scale0 = sin((1 - x) * omega) * sinom;
        scale1 = sin(x * omega) * sinom;
    } else {
        scale0 = 1 - x;
        scale1 = x;
    }

    this.x = scale0 * ax + scale1 * bx;
    this.y = scale0 * ay + scale1 * by;
    this.z = scale0 * az + scale1 * bz;
    this.w = scale0 * aw + scale1 * bw;

    return this;
};

/**
 * @method qslerp
 * @memberof Odin.Quat
 * spherical linear Interpolation between a and b by x
 * @param Quat a
 * @param Quat b
 * @param Number x
 * @return this
 */
Quat.prototype.qslerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w,
        bx = b.x,
        by = b.y,
        bz = b.z,
        bw = b.w,

        omega, sinom, scale0, scale1,
        cosom = ax * bx + ay * by + az * bz + aw * bw;

    if (cosom < 0.0) {
        cosom *= -1;
        bx *= -1;
        by *= -1;
        bz *= -1;
        bw *= -1;
    }

    if (1 - cosom > EPSILON) {
        omega = acos(cosom);
        sinom = 1 / sin(omega);
        scale0 = sin((1 - x) * omega) * sinom;
        scale1 = sin(x * omega) * sinom;
    } else {
        scale0 = 1 - x;
        scale1 = x;
    }

    this.x = scale0 * ax + scale1 * bx;
    this.y = scale0 * ay + scale1 * by;
    this.z = scale0 * az + scale1 * bz;
    this.w = scale0 * aw + scale1 * bw;

    return this;
};

/**
 * @method qdot
 * @memberof Odin.Quat
 * dot product of two quats, can be called as a static function Quat.qdot( a, b )
 * @param Quat a
 * @param Quat b
 * @return Number
 */
Quat.qdot = Quat.prototype.qdot = function (a, b) {

    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
};

/**
 * @method dot
 * @memberof Odin.Quat
 * dot product of this and other
 * @param Quat other
 * @return Number
 */
Quat.prototype.dot = function (other) {

    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
};

/**
 * @method rotationX
 * @memberof Odin.Quat
 * gets quat's x rotation as an eular angle
 * @param Number angle
 * @return this
 */
Quat.prototype.rotationX = function () {
    var w = this.w;

    return this.x / sqrt(1 - (w * w));
};

/**
 * @method rotationY
 * @memberof Odin.Quat
 * gets quat's y rotation as an eular angle
 * @param Number angle
 * @return this
 */
Quat.prototype.rotationY = function () {
    var w = this.w;

    return this.y / sqrt(1 - (w * w));
};

/**
 * @method rotationZ
 * @memberof Odin.Quat
 * gets quat's z rotation as an eular angle
 * @param Number angle
 * @return this
 */
Quat.prototype.rotationZ = function () {
    var w = this.w;

    return this.z / sqrt(1 - (w * w));
};

/**
 * @method rotateX
 * @memberof Odin.Quat
 * sets quat's x rotation
 * @param Number angle
 * @return this
 */
Quat.prototype.rotateX = function (angle) {
    var halfAngle = angle * 0.5,
        x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        s = sin(halfAngle),
        c = cos(halfAngle);

    this.x = x * c + w * s;
    this.y = y * c + z * s;
    this.z = z * c - y * s;
    this.w = w * c - x * s;

    return this;
};

/**
 * @method rotateY
 * @memberof Odin.Quat
 * sets quat's y rotation
 * @param Number angle
 * @return this
 */
Quat.prototype.rotateY = function (angle) {
    var halfAngle = angle * 0.5,
        x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        s = sin(halfAngle),
        c = cos(halfAngle);

    this.x = x * c - z * s;
    this.y = y * c + w * s;
    this.z = z * c + x * s;
    this.w = w * c - y * s;

    return this;
};

/**
 * @method rotateZ
 * @memberof Odin.Quat
 * sets quat's z rotation
 * @param Number angle
 * @return this
 */
Quat.prototype.rotateZ = function (angle) {
    var halfAngle = angle * 0.5,
        x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        s = sin(halfAngle),
        c = cos(halfAngle);

    this.x = x * c + y * s;
    this.y = y * c - x * s;
    this.z = z * c + w * s;
    this.w = w * c - z * s;

    return this;
};

/**
 * @method rotate
 * @memberof Odin.Quat
 * rotates quat by z then x then y in that order
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Quat.prototype.rotate = function (x, y, z) {

    this.rotateZ(z);
    this.rotateX(x);
    this.rotateY(y);

    return this;
};

/**
 * @method lookRotation
 * @memberof Odin.Quat
 * creates a rotation with the specified forward and upwards directions
 * @param Vec3 forward
 * @param Vec3 up
 * @return this
 */
Quat.prototype.lookRotation = function (forward, up) {
    var fx = forward.x,
        fy = forward.y,
        fz = forward.z,
        ux = up.x,
        uy = up.y,
        uz = up.z,

        ax = uy * fz - uz * fy,
        ay = uz * fx - ux * fz,
        az = ux * fy - uy * fx,

        d = (1.0 + ux * fx + uy * fy + uz * fz) * 2.0,
        dsq = d * d,
        s = 1.0 / dsq;

    this.x = ax * s;
    this.y = ay * s;
    this.z = az * s;
    this.w = dsq * 0.5;

    return this;
};

/**
 * @method fromAxisAngle
 * @memberof Odin.Quat
 * sets quat from axis and angle
 * @param Vec3 axis
 * @param Number angle
 * @return this
 */
Quat.prototype.fromAxisAngle = function (axis, angle) {
    var halfAngle = angle * 0.5,
        s = sin(halfAngle);

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = cos(halfAngle);

    return this;
};

/**
 * @method fromVec3s
 * @memberof Odin.Quat
 * sets quat from two vectors
 * @param Vec3 u
 * @param Vec3 v
 * @return this
 */
Quat.prototype.fromVec3s = function () {
    var a = new Vec3;

    return function (u, v) {
        a.vcross(u, v);

        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = sqrt(u.lengthSq() * v.lengthSq()) + u.dot(v);

        return this.normalize();
    };
}();

/**
 * @method fromMat3
 * @memberof Odin.Quat
 * sets values from Mat3
 * @param Mat3 m
 * @return this
 */
Quat.prototype.fromMat3 = function (m) {
    var te = m.elements,
        m11 = te[0],
        m12 = te[3],
        m13 = te[6],
        m21 = te[1],
        m22 = te[4],
        m23 = te[7],
        m31 = te[2],
        m32 = te[5],
        m33 = te[8],
        trace = m11 + m22 + m33,
        s, invS;

    if (trace > 0.0) {
        s = 0.5 / sqrt(trace + 1.0);

        this.w = 0.25 / s;
        this.x = (m32 - m23) * s;
        this.y = (m13 - m31) * s;
        this.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
        s = 2.0 * sqrt(1.0 + m11 - m22 - m33);
        invS = 1.0 / s;

        this.w = (m32 - m23) * invS;
        this.x = 0.25 * s;
        this.y = (m12 + m21) * invS;
        this.z = (m13 + m31) * invS;
    } else if (m22 > m33) {
        s = 2.0 * sqrt(1.0 + m22 - m11 - m33);
        invS = 1.0 / s;

        this.w = (m13 - m31) * invS;
        this.x = (m12 + m21) * invS;
        this.y = 0.25 * s;
        this.z = (m23 + m32) * invS;
    } else {
        s = 2.0 * sqrt(1.0 + m33 - m11 - m22);
        invS = 1.0 / s;

        this.w = (m21 - m12) * invS;
        this.x = (m13 + m31) * invS;
        this.y = (m23 + m32) * invS;
        this.z = 0.25 * s;
    }

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Quat
 * sets values from Mat4
 * @param Mat4 m
 * @return this
 */
Quat.prototype.fromMat4 = function (m) {
    var te = m.elements,
        m11 = te[0],
        m12 = te[4],
        m13 = te[8],
        m21 = te[1],
        m22 = te[5],
        m23 = te[9],
        m31 = te[2],
        m32 = te[6],
        m33 = te[10],
        trace = m11 + m22 + m33,
        s, invS;

    if (trace > 0.0) {
        s = 0.5 / sqrt(trace + 1);

        this.w = 0.25 / s;
        this.x = (m32 - m23) * s;
        this.y = (m13 - m31) * s;
        this.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
        s = 2.0 * sqrt(1.0 + m11 - m22 - m33);
        invS = 1.0 / s;

        this.w = (m32 - m23) * invS;
        this.x = 0.25 * s;
        this.y = (m12 + m21) * invS;
        this.z = (m13 + m31) * invS;
    } else if (m22 > m33) {
        s = 2.0 * sqrt(1.0 + m22 - m11 - m33);
        invS = 1.0 / s;

        this.w = (m13 - m31) * invS;
        this.x = (m12 + m21) * invS;
        this.y = 0.25 * s;
        this.z = (m23 + m32) * invS;
    } else {
        s = 2.0 * sqrt(1.0 + m33 - m11 - m22);
        invS = 1.0 / s;

        this.w = (m21 - m12) * invS;
        this.x = (m13 + m31) * invS;
        this.y = (m23 + m32) * invS;
        this.z = 0.25 * s;
    }

    return this;
};

/**
 * @method fromArray
 * @memberof Odin.Quat
 * sets values from array
 * @param Array array
 * @return this
 */
Quat.prototype.fromArray = function (array) {

    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
    this.w = array[3];

    return this;
};

/**
 * @memberof Odin.Quat
 * @param Odin.Quat other
 * @return this
 */
Quat.prototype.equals = function (other) {

    return !(
    this.x !== other.x ||
    this.y !== other.y ||
    this.z !== other.z ||
    this.w !== other.w
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Quat
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Quat.prototype.fromJSON = function (json) {

    this.x = json.x;
    this.y = json.y;
    this.z = json.z;
    this.w = json.w;

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Quat
 * returns array of this
 * @return Object
 */
Quat.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this.x;
    array[1] = this.y;
    array[2] = this.z;
    array[3] = this.w;

    return array;
};

/**
 * @method toJSON
 * @memberof Odin.Quat
 * returns json object of this
 * @return Object
 */
Quat.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Quat";
    json.x = this.x;
    json.y = this.y;
    json.z = this.z;
    json.w = this.w;

    return json;
};

/**
 * @method toString
 * @memberof Odin.Quat
 * returns string of this
 * @return String
 */
Quat.prototype.toString = function () {

    return "Quat( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )";
};


module.exports = Quat;

},{"./mathf":107,"./vec3":112}],109:[function(require,module,exports){
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


module.exports = Rect;

},{}],110:[function(require,module,exports){
"use strict";


var defineProperty = Object.defineProperty;


function RectOffset(left, right, top, bottom) {

    this.left = left || 0.0;
    this.right = right || 0.0;
    this.top = top || 0.0;
    this.bottom = bottom || 0.0;
}


defineProperty(RectOffset.prototype, "horizontal", {
    get: function () {

        return this.left + this.right;
    }
});


defineProperty(RectOffset.prototype, "vertical", {
    get: function () {

        return this.top + this.bottom;
    }
});


RectOffset.prototype.clone = function () {

    return new RectOffset(this.left, this.right, this.top, this.bottom);
};


RectOffset.prototype.copy = function (other) {

    this.left = other.left;
    this.right = other.right;
    this.top = other.top;
    this.bottom = other.bottom;

    return this;
};


RectOffset.prototype.set = function (left, right, top, bottom) {

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;

    return this;
};


RectOffset.prototype.add = function (rect) {

    rect.xMin -= this.left;
    rect.xMax += this.right;
    rect.yMin -= this.top;
    rect.yMax += this.bottom;

    return rect;
};


RectOffset.prototype.sub = function (rect) {

    rect.xMin += this.left;
    rect.xMax -= this.right;
    rect.yMin += this.top;
    rect.yMax -= this.bottom;

    return rect;
};


RectOffset.prototype.toJSON = function (json) {
    json || (json = {});

    json.left = this.left;
    json.right = this.right;
    json.top = this.top;
    json.bottom = this.bottom;

    return json;
};


RectOffset.prototype.fromJSON = function (json) {

    this.left = json.left;
    this.right = json.right;
    this.top = json.top;
    this.bottom = json.bottom;

    return this;
};


RectOffset.prototype.toString = function () {

    return "RectOffset( " + this.left + ", " + this.right + ", " + this.top + ", " + this.bottom + " )";
};


module.exports = RectOffset;

},{}],111:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt;

/**
 * @class Vec2
 * 2d vector
 * @param Number x
 * @param Number y
 */
function Vec2(x, y) {

    /**
     * @property Number x
     * @memberof Xian.Vec2
     */
    this.x = x || 0.0;

    /**
     * @property Number y
     * @memberof Xian.Vec2
     */
    this.y = y || 0.0;
}

Mathf._classes["Vec2"] = Vec2;

/**
 * @method clone
 * @memberof Xian.Vec2
 * returns new instance of this
 * @return Vec2
 */
Vec2.prototype.clone = function () {

    return new Vec2(this.x, this.y);
};

/**
 * @method copy
 * @memberof Xian.Vec2
 * copies other
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.copy = function (other) {

    this.x = other.x;
    this.y = other.y;

    return this;
};

/**
 * @method set
 * @memberof Xian.Vec2
 * sets values of this
 * @param Number x
 * @param Number y
 * @return this
 */
Vec2.prototype.set = function (x, y) {

    this.x = x;
    this.y = y;

    return this;
};

/**
 * @method add
 * @memberof Xian.Vec2
 * adds other's values to this
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.add = function (other) {

    this.x += other.x;
    this.y += other.y;

    return this;
};

/**
 * @method vadd
 * @memberof Xian.Vec2
 * adds a and b together saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vadd = function (a, b) {

    this.x = a.x + b.x;
    this.y = a.y + b.y;

    return this;
};

/**
 * @method sadd
 * @memberof Xian.Vec2
 * adds scalar value to this
 * @param Number s
 * @return this
 */
Vec2.prototype.sadd = function (s) {

    this.x += s;
    this.y += s;

    return this;
};

/**
 * @method sub
 * @memberof Xian.Vec2
 * subtracts other's values from this
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.sub = function (other) {

    this.x -= other.x;
    this.y -= other.y;

    return this;
};

/**
 * @method vsub
 * @memberof Xian.Vec2
 * subtracts b from a saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vsub = function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
};

/**
 * @method ssub
 * @memberof Xian.Vec2
 * subtracts this by a scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.ssub = function (s) {

    this.x -= s;
    this.y -= s;

    return this;
};

/**
 * @method mul
 * @memberof Xian.Vec2
 * muliples this's values by other's
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.mul = function (other) {

    this.x *= other.x;
    this.y *= other.y;

    return this;
};

/**
 * @method vmul
 * @memberof Xian.Vec2
 * muliples a and b saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vmul = function (a, b) {

    this.x = a.x * b.x;
    this.y = a.y * b.y;

    return this;
};

/**
 * @method smul
 * @memberof Xian.Vec2
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.smul = function (s) {

    this.x *= s;
    this.y *= s;

    return this;
};

/**
 * @method div
 * @memberof Xian.Vec2
 * divides this's values by other's
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.div = function (other) {
    var x = other.x,
        y = other.y;

    this.x *= x !== 0.0 ? 1.0 / x : 0.0;
    this.y *= y !== 0.0 ? 1.0 / y : 0.0;

    return this;
};

/**
 * @method vdiv
 * @memberof Xian.Vec2
 * divides b from a saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vdiv = function (a, b) {
    var x = b.x,
        y = b.y;

    this.x = x !== 0.0 ? a.x / x : 0.0;
    this.y = y !== 0.0 ? a.y / y : 0.0;

    return this;
};

/**
 * @method sdiv
 * @memberof Xian.Vec2
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.sdiv = function (s) {
    s = s === 0.0 ? 0.0 : 1.0 / s;

    this.x *= s;
    this.y *= s;

    return this;
};

/**
 * @method length
 * @memberof Xian.Vec2
 * returns the length of this
 * @return Number
 */
Vec2.prototype.length = function () {
    var x = this.x,
        y = this.y,
        lsq = x * x + y * y;

    if (lsq === 1) return 1;

    return lsq > 0.0 ? sqrt(lsq) : 0.0;
};

/**
 * @method lengthSq
 * @memberof Xian.Vec2
 * returns the squared length of this
 * @return Number
 */
Vec2.prototype.lengthSq = function () {
    var x = this.x,
        y = this.y;

    return x * x + y * y;
};

/**
 * @method setLength
 * @memberof Xian.Vec2
 * sets this so its magnitude is equal to length
 * @param Number length
 * @return Vec2
 */
Vec2.prototype.setLength = function (length) {
    var x = this.x,
        y = this.y,
        l = x * x + y * y;

    if (l === 1) {
        this.x *= length;
        this.y *= length;

        return this;
    }

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l * length;
    this.y *= l * length;

    return this;
};

/**
 * @method normalize
 * @memberof Xian.Vec2
 * returns this with a length of 1
 * @return this
 */
Vec2.prototype.normalize = function () {
    var x = this.x,
        y = this.y,
        l = x * x + y * y;

    if (l === 1) return this;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l;
    this.y *= l;

    return this;
};

/**
 * @method orthoNormalize
 * @memberof Xian.Vec2
 * returns makes vectors normalized and orthogonal to each other
 * @param Vec2 a
 * @param Vec2 b
 * @param Vec2 c
 * @return this
 */
Vec2.prototype.orthoNormalize = function (a, b, c) {
    if (a.lengthSq() !== 1.0) a.normalize();
    c.vcross(a, b);
    if (a.lengthSq() === 0.0) return;
    c.normalize();
    b.vcross(c, a);
};

/**
 * @method inverse
 * @memberof Xian.Vec2
 * returns the inverse of this
 * @return this
 */
Vec2.prototype.inverse = function () {

    this.x *= -1;
    this.y *= -1;

    return this;
};

/**
 * @method inverseVec
 * @memberof Xian.Vec2
 * returns the inverse of other
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.inverseVec = function (other) {

    this.x = -other.x;
    this.y = -other.y;

    return this;
};

/**
 * @method lerp
 * @memberof Xian.Vec2
 * linear interpolation between this and other by x
 * @param Vec2 other
 * @param Number x
 * @return Vec2
 */
Vec2.prototype.lerp = function (other, x) {

    this.x += (other.x - this.x) * x;
    this.y += (other.y - this.y) * x;

    return this;
};

/**
 * @method vlerp
 * @memberof Xian.Vec2
 * linear interpolation between a and b by x
 * @param Vec2 a
 * @param Vec2 b
 * @param Number x
 * @return Vec2
 */
Vec2.prototype.vlerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y;

    this.x = ax + (b.x - ax) * x;
    this.y = ay + (b.y - ay) * x;

    return this;
};

/**
 * @method vdot
 * @memberof Xian.Vec2
 * dot product of two vectors, can be called as a static function Vec2.vdot( a, b )
 * @param Vec2 a
 * @param Vec2 b
 * @return Number
 */
Vec2.vdot = Vec2.prototype.vdot = function (a, b) {

    return a.x * b.x + a.y * b.y;
};

/**
 * @method dot
 * @memberof Xian.Vec2
 * dot product of this and other vector
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.dot = function (other) {

    return this.x * other.x + this.y * other.y;
};

/**
 * @method vcross
 * @memberof Xian.Vec2
 * cross product between a vector and b vector, can be called as a static function Vec2.vcross( a, b )
 * @param Vec2 a
 * @param Vec2 b
 * @return Number
 */
Vec2.vcross = Vec2.prototype.vcross = function (a, b) {

    return a.x * b.y - a.y * b.x;
};

/**
 * @method cross
 * @memberof Xian.Vec2
 * cross product between this vector and other
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.cross = function (other) {

    return this.x * other.y - this.y * other.x;
};

/**
 * @method perp
 * @memberof Xian.Vec2
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.perp = function () {
    var x = this.x,
        y = this.y;

    this.x = -y;
    this.y = x;

    return this;
};

/**
 * @method min
 * @memberof Xian.Vec2
 * returns min values from this and other vector
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.min = function (other) {
    var ax = this.x,
        ay = this.y,
        bx = other.x,
        by = other.y;

    this.x = bx < ax ? bx : ax;
    this.y = by < ay ? by : ay;

    return this;
};

/**
 * @method max
 * @memberof Xian.Vec2
 * returns max values from this and other vector
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.max = function (other) {
    var ax = this.x,
        ay = this.y,
        bx = other.x,
        by = other.y;

    this.x = bx > ax ? bx : ax;
    this.y = by > ay ? by : ay;

    return this;
};

/**
 * @method clamp
 * @memberof Xian.Vec2
 * clamp values between min and max's values
 * @param Vec2 min
 * @param Vec2 max
 * @return this
 */
Vec2.prototype.clamp = function (min, max) {
    var x = this.x,
        y = this.y,
        minx = min.x,
        miny = min.y,
        maxx = max.x,
        maxy = max.y;

    this.x = x < minx ? minx : x > maxx ? maxx : x;
    this.y = y < miny ? miny : y > maxy ? maxy : y;

    return this;
};

/**
 * @method transformAngle
 * @memberof Xian.Vec2
 * transforms this with angle
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.transformAngle = function (a) {
    var x = this.x,
        y = this.y,
        c = cos(a),
        s = sin(a);

    this.x = x * c - y * s;
    this.y = x * s + y * c;

    return this;
};

/**
 * @method transformMat2
 * @memberof Xian.Vec2
 * transforms this with Mat2
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.transformMat2 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y;

    this.x = x * me[0] + y * me[2];
    this.y = x * me[1] + y * me[3];

    return this;
};

/**
 * @method untransformMat2
 * @memberof Xian.Vec2
 * untransforms this with Mat2
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.untransformMat2 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y;

    this.x = x * me[0] + y * me[1];
    this.y = x * me[2] + y * me[3];

    return this;
};

/**
 * @method transformMat32
 * @memberof Xian.Vec2
 * transforms this with Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.transformMat32 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y;

    this.x = x * me[0] + y * me[2] + me[4];
    this.y = x * me[1] + y * me[3] + me[5];

    return this;
};

/**
 * @method untransformMat32
 * @memberof Xian.Vec2
 * untransforms this with Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.untransformMat32 = function (m) {
    var me = m.elements,
        x = this.x - me[4],
        y = this.y - me[5];

    this.x = x * me[0] + y * me[1];
    this.y = x * me[2] + y * me[3];

    return this;
};

/**
 * @method transformMat3
 * @memberof Xian.Vec2
 * transforms this with Mat3
 * @param Mat3 m
 * @return this
 */
Vec2.prototype.transformMat3 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y;

    this.x = x * me[0] + y * me[3] + me[6];
    this.y = x * me[1] + y * me[4] + me[7];

    return this;
};

/**
 * @method transformMat4
 * @memberof Xian.Vec2
 * transforms this with Mat4
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.transformMat4 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y;

    this.x = x * me[0] + y * me[4] + me[12];
    this.y = x * me[1] + y * me[5] + me[13];

    return this;
};

/**
 * @method transformProjection
 * @memberof Xian.Vec3
 * transforms this with Mat4 projection matrix
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.transformProjection = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        d = 1 / (me[3] * x + me[7] * y + me[11] * z + me[15]);

    this.x = (me[0] * x + me[4] * y + me[12]) * d;
    this.y = (me[1] * x + me[5] * y + me[13]) * d;

    return this;
};

/**
 * @method fromVec3
 * @memberof Xian.Vec2
 * sets values from Vec3
 * @param Vec3 v
 * @return this
 */
Vec2.prototype.fromVec3 = function (v) {

    this.x = v.x;
    this.y = v.y;

    return this;
};

/**
 * @method fromVec4
 * @memberof Xian.Vec2
 * sets values from Vec4
 * @param Vec4 v
 * @return this
 */
Vec2.prototype.fromVec4 = function (v) {

    this.x = v.x;
    this.y = v.y;

    return this;
};

/**
 * @method positionFromMat32
 * @memberof Xian.Vec2
 * sets position from Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.positionFromMat32 = function (m) {
    var me = m.elements;

    this.x = me[4];
    this.y = me[5];

    return this;
};

/**
 * @method positionFromMat4
 * @memberof Xian.Vec2
 * sets position from Mat4
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.positionFromMat4 = function (m) {
    var me = m.elements;

    this.x = me[12];
    this.y = me[13];

    return this;
};

/**
 * @method scaleFromMat2
 * @memberof Xian.Vec2
 * sets this from Mat2 scale
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.scaleFromMat2 = function (m) {
    var me = m.elements,
        x = this.set(me[0], m[2]).length(),
        y = this.set(me[1], m[3]).length();

    this.x = x;
    this.y = y;

    return this;
};

/**
 * @method scaleFromMat32
 * @memberof Xian.Vec2
 * sets this from Mat32 scale
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.scaleFromMat32 = Vec2.prototype.scaleFromMat2;

/**
 * @memberof Xian.Vec2
 * @param Xian.Vec2 other
 * @return this
 */
Vec2.prototype.equals = function (other) {

    return !(
    this.x !== other.x ||
    this.y !== other.y
    );
};

/**
 * @memberof Xian.Vec2
 * @param Xian.Vec2 other
 * @return this
 */
Vec2.prototype.notEquals = function (other) {

    return (
    this.x !== other.x ||
    this.y !== other.y
    );
};

/**
 * @method fromJSON
 * @memberof Xian.Vec2
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Vec2.prototype.fromJSON = function (json) {

    this.x = json.x;
    this.y = json.y;

    return this;
};

/**
 * @method toJSON
 * @memberof Xian.Vec2
 * returns json object of this
 * @return Object
 */
Vec2.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Vec2";
    json.x = this.x;
    json.y = this.y;

    return json;
};

/**
 * @method fromArray
 * @memberof Xian.Vec2
 * sets values from Array object
 * @param Array array
 * @return this
 */
Vec2.prototype.fromArray = function (array) {

    this.x = array[0];
    this.y = array[1];

    return this;
};

/**
 * @method toArray
 * @memberof Xian.Vec2
 * returns array object of this
 * @return Array
 */
Vec2.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this.x;
    array[1] = this.y;

    return array;
};

/**
 * @method toString
 * @memberof Xian.Vec2
 * returns string of this
 * @return String
 */
Vec2.prototype.toString = function () {

    return "Vec2( " + this.x + ", " + this.y + " )";
};


module.exports = Vec2;

},{"./mathf":107}],112:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt;

/**
 * @class Vec3
 * 3d vector
 * @param Number x
 * @param Number y
 * @param Number z
 */
function Vec3(x, y, z) {

    /**
     * @property Number x
     * @memberof Odin.Vec3
     */
    this.x = x || 0.0;

    /**
     * @property Number y
     * @memberof Odin.Vec3
     */
    this.y = y || 0.0;

    /**
     * @property Number z
     * @memberof Odin.Vec3
     */
    this.z = z || 0.0;
}

Mathf._classes["Vec3"] = Vec3;

/**
 * @method clone
 * @memberof Odin.Vec3
 * returns new instance of this
 * @return Vec3
 */
Vec3.prototype.clone = function () {

    return new Vec3(this.x, this.y, this.z);
};

/**
 * @method copy
 * @memberof Odin.Vec3
 * copies other
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.copy = function (other) {

    this.x = other.x;
    this.y = other.y;
    this.z = other.z;

    return this;
};

/**
 * @method set
 * @memberof Odin.Vec3
 * sets values of this
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Vec3.prototype.set = function (x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
};

/**
 * @method add
 * @memberof Odin.Vec3
 * adds other's values to this
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.add = function (other) {

    this.x += other.x;
    this.y += other.y;
    this.z += other.z;

    return this;
};

/**
 * @method vadd
 * @memberof Odin.Vec3
 * adds a and b together saves it in this
 * @param Vec3 a
 * @param Vec3 b
 * @return this
 */
Vec3.prototype.vadd = function (a, b) {

    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;

    return this;
};

/**
 * @method sadd
 * @memberof Odin.Vec3
 * adds scalar value to this
 * @param Number s
 * @return this
 */
Vec3.prototype.sadd = function (s) {

    this.x += s;
    this.y += s;
    this.z += s;

    return this;
};

/**
 * @method sub
 * @memberof Odin.Vec3
 * subtracts other's values from this
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.sub = function (other) {

    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;

    return this;
};

/**
 * @method vsub
 * @memberof Odin.Vec3
 * subtracts b from a saves it in this
 * @param Vec3 a
 * @param Vec3 b
 * @return this
 */
Vec3.prototype.vsub = function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;
};

/**
 * @method ssub
 * @memberof Odin.Vec3
 * subtracts this by a scalar value
 * @param Number s
 * @return this
 */
Vec3.prototype.ssub = function (s) {

    this.x -= s;
    this.y -= s;
    this.z -= s;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Vec3
 * muliples this's values by other's
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.mul = function (other) {

    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;

    return this;
};

/**
 * @method vmul
 * @memberof Odin.Vec3
 * muliples a and b saves it in this
 * @param Vec3 a
 * @param Vec3 b
 * @return this
 */
Vec3.prototype.vmul = function (a, b) {

    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Vec3
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Vec3.prototype.smul = function (s) {

    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
};

/**
 * @method div
 * @memberof Odin.Vec3
 * divides this's values by other's
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.div = function (other) {
    var x = other.x,
        y = other.y,
        z = other.z;

    this.x *= x !== 0.0 ? 1.0 / x : 0.0;
    this.y *= y !== 0.0 ? 1.0 / y : 0.0;
    this.z *= z !== 0.0 ? 1.0 / z : 0.0;

    return this;
};

/**
 * @method vdiv
 * @memberof Odin.Vec3
 * divides b from a saves it in this
 * @param Vec3 a
 * @param Vec3 b
 * @return this
 */
Vec3.prototype.vdiv = function (a, b) {
    var x = b.x,
        y = b.y,
        z = b.z;

    this.x = x !== 0.0 ? a.x / x : 0.0;
    this.y = y !== 0.0 ? a.y / y : 0.0;
    this.z = z !== 0.0 ? a.z / z : 0.0;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Vec3
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Vec3.prototype.sdiv = function (s) {
    s = s === 0.0 ? 0.0 : 1.0 / s;

    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
};

/**
 * @method length
 * @memberof Odin.Vec3
 * returns the length of this
 * @return Number
 */
Vec3.prototype.length = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        lsq = x * x + y * y + z * z;

    if (lsq === 1) return 1;

    return lsq === 0.0 ? 0.0 : sqrt(lsq);
};

/**
 * @method lengthSq
 * @memberof Odin.Vec3
 * returns the squared length of this
 * @return Number
 */
Vec3.prototype.lengthSq = function () {
    var x = this.x,
        y = this.y,
        z = this.z;

    return x * x + y * y + z * z;
};

/**
 * @method setLength
 * @memberof Odin.Vec3
 * sets this so its magnitude is equal to length
 * @param Number length
 * @return Vec3
 */
Vec3.prototype.setLength = function (length) {
    var x = this.x,
        y = this.y,
        z = this.z,
        l = x * x + y * y + z * z;

    if (l === 1) {
        this.x *= length;
        this.y *= length;
        this.z *= length;

        return this;
    }

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l * length;
    this.y *= l * length;
    this.z *= l * length;

    return this;
};

/**
 * @method normalize
 * @memberof Odin.Vec3
 * returns this with a length of 1
 * @return this
 */
Vec3.prototype.normalize = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        l = x * x + y * y + z * z;

    if (l === 1) return this;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l;
    this.y *= l;
    this.z *= l;

    return this;
};

/**
 * @method orthoNormalize
 * @memberof Odin.Vec3
 * returns makes vectors normalized and orthogonal to each other
 * @param Vec3 a
 * @param Vec3 b
 * @param Vec3 c
 * @return this
 */
Vec3.prototype.orthoNormalize = function (a, b, c) {
    if (a.lengthSq() !== 1.0) a.normalize();
    c.vcross(a, b);
    if (a.lengthSq() === 0.0) return;
    c.normalize();
    b.vcross(c, a);
};

/**
 * @method inverse
 * @memberof Odin.Vec3
 * returns the inverse of this
 * @return this
 */
Vec3.prototype.inverse = function () {

    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

    return this;
};

/**
 * @method inverseVec
 * @memberof Odin.Vec3
 * returns the inverse of other
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.inverseVec = function (other) {

    this.x = -other.x;
    this.y = -other.y;
    this.z = -(other.z || 0);

    return this;
};

/**
 * @method lerp
 * @memberof Odin.Vec3
 * linear interpolation between this and other by x
 * @param Vec3 other
 * @param Number x
 * @return Vec3
 */
Vec3.prototype.lerp = function (other, x) {

    this.x += (other.x - this.x) * x;
    this.y += (other.y - this.y) * x;
    this.z += (other.z - this.z) * x;

    return this;
};

/**
 * @method vlerp
 * @memberof Odin.Vec3
 * linear interpolation between a and b by x
 * @param Vec3 a
 * @param Vec3 b
 * @param Number x
 * @return Vec3
 */
Vec3.prototype.vlerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y,
        az = a.z;

    this.x = ax + (b.x - ax) * x;
    this.y = ay + (b.y - ay) * x;
    this.z = az + (b.z - az) * x;

    return this;
};

/**
 * @method vdot
 * @memberof Odin.Vec3
 * dot product of two vectors, can be called as a static function Vec3.vdot( a, b )
 * @param Vec3 a
 * @param Vec3 b
 * @return Number
 */
Vec3.vdot = Vec3.prototype.vdot = function (a, b) {

    return a.x * b.x + a.y * b.y + a.z * b.z;
};

/**
 * @method dot
 * @memberof Odin.Vec3
 * dot product of this and other vector
 * @param Vec3 other
 * @return Number
 */
Vec3.prototype.dot = function (other) {

    return this.x * other.x + this.y * other.y + this.z * other.z;
};

/**
 * @method vcross
 * @memberof Odin.Vec3
 * cross product between a vector and b vector, can be called as a static function Vec3.vcross( a, b )
 * @param Vec3 a
 * @param Vec3 b
 * @return Number
 */
Vec3.vcross = Vec3.prototype.vcross = function (a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        bx = b.x,
        by = b.y,
        bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
};

/**
 * @method cross
 * @memberof Odin.Vec3
 * cross product between this vector and other
 * @param Vec3 other
 * @return Number
 */
Vec3.prototype.cross = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        bx = other.x,
        by = other.y,
        bz = other.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
};

/**
 * @method min
 * @memberof Odin.Vec3
 * returns min values from this and other vector
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.min = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        bx = other.x,
        by = other.y,
        bz = other.z;

    this.x = bx < ax ? bx : ax;
    this.y = by < ay ? by : ay;
    this.z = bz < az ? bz : az;

    return this;
};

/**
 * @method max
 * @memberof Odin.Vec3
 * returns max values from this and other vector
 * @param Vec3 other
 * @return this
 */
Vec3.prototype.max = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        bx = other.x,
        by = other.y,
        bz = other.z;

    this.x = bx > ax ? bx : ax;
    this.y = by > ay ? by : ay;
    this.z = bz > az ? bz : az;

    return this;
};

/**
 * @method clamp
 * @memberof Odin.Vec3
 * clamp values between min and max's values
 * @param Vec3 min
 * @param Vec3 max
 * @return this
 */
Vec3.prototype.clamp = function (min, max) {
    var x = this.x,
        y = this.y,
        z = this.z,
        minx = min.x,
        miny = min.y,
        minz = min.z,
        maxx = max.x,
        maxy = max.y,
        maxz = max.z;

    this.x = x < minx ? minx : x > maxx ? maxx : x;
    this.y = y < miny ? miny : y > maxy ? maxy : y;
    this.z = z < minz ? minz : z > maxz ? maxz : z;

    return this;
};

/**
 * @method transformMat3
 * @memberof Odin.Vec3
 * transforms this with Mat3
 * @param Mat3 m
 * @return this
 */
Vec3.prototype.transformMat3 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z;

    this.x = x * me[0] + y * me[3] + z * me[6];
    this.y = x * me[1] + y * me[4] + z * me[7];
    this.z = x * me[2] + y * me[5] + z * me[8];

    return this;
};

/**
 * @method transformMat4
 * @memberof Odin.Vec3
 * transforms this with Mat4
 * @param Mat4 m
 * @return this
 */
Vec3.prototype.transformMat4 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z;

    this.x = x * me[0] + y * me[4] + z * me[8] + me[12];
    this.y = x * me[1] + y * me[5] + z * me[9] + me[13];
    this.z = x * me[2] + y * me[6] + z * me[10] + me[14];

    return this;
};

/**
 * @method transformMat4
 * @memberof Odin.Vec3
 * transforms this with Mat4
 * @param Mat4 m
 * @return this
 */
Vec3.prototype.transformMat4Rotation = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z;

    this.x = x * me[0] + y * me[4] + z * me[8];
    this.y = x * me[1] + y * me[5] + z * me[9];
    this.z = x * me[2] + y * me[6] + z * me[10];

    return this;
};

/**
 * @method transformProjection
 * @memberof Odin.Vec3
 * transforms this with Mat4 projection matrix
 * @param Mat4 m
 * @return this
 */
Vec3.prototype.transformProjection = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z,
        d = 1 / (me[3] * x + me[7] * y + me[11] * z + me[15]);

    this.x = (me[0] * x + me[4] * y + me[8] * z + me[12]) * d;
    this.y = (me[1] * x + me[5] * y + me[9] * z + me[13]) * d;
    this.z = (me[2] * x + me[6] * y + me[10] * z + me[14]) * d;

    return this;
};

/**
 * @method transformQuat
 * @memberof Odin.Vec3
 * transforms this with Quat
 * @param Quat q
 * @return this
 */
Vec3.prototype.transformQuat = function (q) {
    var x = this.x,
        y = this.y,
        z = this.z,
        qx = q.x,
        qy = q.y,
        qz = q.z,
        qw = q.w,

        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return this;
};

/**
 * @method fromVec2
 * @memberof Odin.Vec3
 * sets values from Vec2
 * @param Vec2 v
 * @return this
 */
Vec3.prototype.fromVec2 = function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = 0.0;

    return this;
};

/**
 * @method fromVec4
 * @memberof Odin.Vec3
 * sets position from Vec4
 * @param Vec4 v
 * @return this
 */
Vec3.prototype.fromVec4 = function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
};

/**
 * @method positionFromMat4
 * @memberof Odin.Vec3
 * sets position from Mat4
 * @param Mat4 m
 * @return this
 */
Vec3.prototype.positionFromMat4 = function (m) {
    var me = m.elements;

    this.x = me[12];
    this.y = me[13];
    this.z = me[14];

    return this;
};

/**
 * @method scaleFromMat3
 * @memberof Odin.Vec3
 * sets this from Mat3 scale
 * @param Mat3 m
 * @return this
 */
Vec3.prototype.scaleFromMat3 = function (m) {
    var me = m.elements,
        x = this.set(me[0], me[3], me[6]).length(),
        y = this.set(me[1], me[4], me[7]).length(),
        z = this.set(me[2], me[5], me[8]).length();

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
};

/**
 * @method scaleFromMat4
 * @memberof Odin.Vec3
 * sets this from Mat4 scale
 * @param Mat4 m
 * @return this
 */
Vec3.prototype.scaleFromMat4 = function (m) {
    var me = m.elements,
        x = this.set(me[0], me[4], me[8]).length(),
        y = this.set(me[1], me[5], me[9]).length(),
        z = this.set(me[2], me[6], me[10]).length();

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
};

/**
 * @memberof Odin.Vec3
 * @param Odin.Vec3 other
 * @return this
 */
Vec3.prototype.equals = function (other) {

    return !(
    this.x !== other.x ||
    this.y !== other.y ||
    this.z !== other.z
    );
};

/**
 * @memberof Odin.Vec3
 * @param Odin.Vec3 other
 * @return this
 */
Vec3.prototype.notEquals = function (other) {

    return (
    this.x !== other.x ||
    this.y !== other.y ||
    this.z !== other.z
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Vec3
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Vec3.prototype.fromJSON = function (json) {

    this.x = json.x;
    this.y = json.y;
    this.z = json.z;

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Vec3
 * returns json object of this
 * @return Object
 */
Vec3.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Vec3";
    json.x = this.x;
    json.y = this.y;
    json.z = this.z;

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Vec3
 * sets values from Array object
 * @param Array array
 * @return this
 */
Vec3.prototype.fromArray = function (array) {

    this.x = array[0];
    this.y = array[1];
    this.z = array[2];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Vec3
 * returns array object of this
 * @return Array
 */
Vec3.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this.x;
    array[1] = this.y;
    array[2] = this.z;

    return array;
};

/**
 * @method toString
 * @memberof Odin.Vec3
 * returns string of this
 * @return String
 */
Vec3.prototype.toString = function () {

    return "Vec3( " + this.x + ", " + this.y + ", " + this.z + " )";
};


module.exports = Vec3;

},{"./mathf":107}],113:[function(require,module,exports){
var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt;

/**
 * @class Vec4
 * 3d vector
 * @param Number x
 * @param Number y
 * @param Number z
 * @param Number w
 */
function Vec4(x, y, z, w) {

    /**
     * @property Number x
     * @memberof Odin.Vec4
     */
    this.x = x || 0.0;

    /**
     * @property Number y
     * @memberof Odin.Vec4
     */
    this.y = y || 0.0;

    /**
     * @property Number z
     * @memberof Odin.Vec4
     */
    this.z = z || 0.0;

    /**
     * @property Number w
     * @memberof Odin.Vec4
     */
    this.w = w != undefined ? w : 1.0;
}

Mathf._classes["Vec4"] = Vec4;

/**
 * @method clone
 * @memberof Odin.Vec4
 * returns new instance of this
 * @return Vec4
 */
Vec4.prototype.clone = function () {

    return new Vec4(this.x, this.y, this.z, this.w);
};

/**
 * @method copy
 * @memberof Odin.Vec4
 * copies other
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.copy = function (other) {

    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.w = other.w;

    return this;
};

/**
 * @method set
 * @memberof Odin.Vec4
 * sets values of this
 * @param Number x
 * @param Number y
 * @param Number z
 * @param Number w
 * @return this
 */
Vec4.prototype.set = function (x, y, z, w) {

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
};

/**
 * @method add
 * @memberof Odin.Vec4
 * adds other's values to this
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.add = function (other) {

    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.w += other.w;

    return this;
};

/**
 * @method vadd
 * @memberof Odin.Vec4
 * adds a and b together saves it in this
 * @param Vec4 a
 * @param Vec4 b
 * @return this
 */
Vec4.prototype.vadd = function (a, b) {

    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;

    return this;
};

/**
 * @method sadd
 * @memberof Odin.Vec4
 * adds scalar value to this
 * @param Number s
 * @return this
 */
Vec4.prototype.sadd = function (s) {

    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;

    return this;
};

/**
 * @method sub
 * @memberof Odin.Vec4
 * subtracts other's values from this
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.sub = function (other) {

    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.w -= other.w;

    return this;
};

/**
 * @method vsub
 * @memberof Odin.Vec4
 * subtracts b from a saves it in this
 * @param Vec4 a
 * @param Vec4 b
 * @return this
 */
Vec4.prototype.vsub = function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;

    return this;
};

/**
 * @method ssub
 * @memberof Odin.Vec4
 * subtracts this by a scalar value
 * @param Number s
 * @return this
 */
Vec4.prototype.ssub = function (s) {

    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Vec4
 * muliples this's values by other's
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.mul = function (other) {

    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    this.w *= other.w;

    return this;
};

/**
 * @method vmul
 * @memberof Odin.Vec4
 * muliples a and b saves it in this
 * @param Vec4 a
 * @param Vec4 b
 * @return this
 */
Vec4.prototype.vmul = function (a, b) {

    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    this.w = a.w * b.w;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Vec4
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Vec4.prototype.smul = function (s) {

    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;

    return this;
};

/**
 * @method div
 * @memberof Odin.Vec4
 * divides this's values by other's
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.div = function (other) {
    var x = other.x,
        y = other.y,
        z = other.z,
        w = other.w;

    this.x *= x !== 0.0 ? 1.0 / x : 0.0;
    this.y *= y !== 0.0 ? 1.0 / y : 0.0;
    this.z *= z !== 0.0 ? 1.0 / z : 0.0;
    this.w *= w !== 0.0 ? 1.0 / w : 0.0;

    return this;
};

/**
 * @method vdiv
 * @memberof Odin.Vec4
 * divides b from a saves it in this
 * @param Vec4 a
 * @param Vec4 b
 * @return this
 */
Vec4.prototype.vdiv = function (a, b) {
    var x = b.x,
        y = b.y,
        z = b.z,
        w = b.w;

    this.x = x !== 0.0 ? a.x / x : 0.0;
    this.y = y !== 0.0 ? a.y / y : 0.0;
    this.z = z !== 0.0 ? a.z / z : 0.0;
    this.w = w !== 0.0 ? a.w / w : 0.0;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Vec4
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Vec4.prototype.sdiv = function (s) {
    s = s === 0.0 ? 0.0 : 1.0 / s;

    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;

    return this;
};

/**
 * @method length
 * @memberof Odin.Vec4
 * returns the length of this
 * @return Number
 */
Vec4.prototype.length = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        lsq = x * x + y * y + z * z + w * w;

    if (lsq === 1) return 1;

    return lsq > 0.0 ? sqrt(lsq) : 0.0;
};

/**
 * @method lengthSq
 * @memberof Odin.Vec4
 * returns the squared length of this
 * @return Number
 */
Vec4.prototype.lengthSq = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;

    return x * x + y * y + z * z + w * w;
};

/**
 * @method setLength
 * @memberof Odin.Vec4
 * sets this so its magnitude is equal to length
 * @param Number length
 * @return Vec4
 */
Vec4.prototype.setLength = function (length) {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        l = x * x + y * y + z * z + w * w;

    if (l === 1) {
        this.x *= length;
        this.y *= length;
        this.z *= length;
        this.w *= length;

        return this;
    }

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l * length;
    this.y *= l * length;
    this.z *= l * length;
    this.w *= l * length;

    return this;
};

/**
 * @method normalize
 * @memberof Odin.Vec4
 * returns this with a length of 1
 * @return this
 */
Vec4.prototype.normalize = function () {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        l = x * x + y * y + z * z + w * w;

    if (l === 1) return this;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l;
    this.y *= l;
    this.z *= l;
    this.w *= l;

    return this;
};

/**
 * @method orthoNormalize
 * @memberof Odin.Vec4
 * returns makes vectors normalized and orthogonal to each other
 * @param Vec4 a
 * @param Vec4 b
 * @param Vec4 c
 * @return this
 */
Vec4.prototype.orthoNormalize = function (a, b, c) {
    if (a.lengthSq() !== 1.0) a.normalize();
    c.vcross(a, b);
    if (a.lengthSq() === 0.0) return;
    c.normalize();
    b.vcross(c, a);
};

/**
 * @method inverse
 * @memberof Odin.Vec4
 * returns the inverse of this
 * @return this
 */
Vec4.prototype.inverse = function () {

    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    this.w *= -1;

    return this;
};

/**
 * @method inverseVec
 * @memberof Odin.Vec4
 * returns the inverse of other
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.inverseVec = function (other) {

    this.x = -other.x;
    this.y = -other.y;
    this.z = -(other.z || 0);
    this.w = -(other.w || 0);

    return this;
};

/**
 * @method lerp
 * @memberof Odin.Vec4
 * linear interpolation between this and other by x
 * @param Vec4 other
 * @param Number x
 * @return Vec4
 */
Vec4.prototype.lerp = function (other, x) {

    this.x += (other.x - this.x) * x;
    this.y += (other.y - this.y) * x;
    this.z += (other.z - this.z) * x;
    this.w += (other.w - this.w) * x;

    return this;
};

/**
 * @method vlerp
 * @memberof Odin.Vec4
 * linear interpolation between a and b by x
 * @param Vec4 a
 * @param Vec4 b
 * @param Number x
 * @return Vec4
 */
Vec4.prototype.vlerp = function (a, b, x) {
    var ax = a.x,
        ay = a.y,
        az = a.z,
        aw = a.w;

    this.x = ax + (b.x - ax) * x;
    this.y = ay + (b.y - ay) * x;
    this.z = az + (b.z - az) * x;
    this.w = aw + (b.w - aw) * x;

    return this;
};

/**
 * @method vdot
 * @memberof Odin.Vec4
 * dot product of two vectors, can be called as a static function Vec4.vdot( a, b )
 * @param Vec4 a
 * @param Vec4 b
 * @return Number
 */
Vec4.vdot = Vec4.prototype.vdot = function (a, b) {

    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
};

/**
 * @method dot
 * @memberof Odin.Vec4
 * dot product of this and other vector
 * @param Vec4 other
 * @return Number
 */
Vec4.prototype.dot = function (other) {

    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
};

/**
 * @method min
 * @memberof Odin.Vec4
 * returns min values from this and other vector
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.min = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        aw = this.w,
        bx = other.x,
        by = other.y,
        bz = other.z,
        bw = this.w;

    this.x = bx < ax ? bx : ax;
    this.y = by < ay ? by : ay;
    this.z = bz < az ? bz : az;
    this.w = bw < aw ? bw : aw;

    return this;
};

/**
 * @method max
 * @memberof Odin.Vec4
 * returns max values from this and other vector
 * @param Vec4 other
 * @return this
 */
Vec4.prototype.max = function (other) {
    var ax = this.x,
        ay = this.y,
        az = this.z,
        aw = this.w,
        bx = other.x,
        by = other.y,
        bz = other.z,
        bw = this.w;

    this.x = bx > ax ? bx : ax;
    this.y = by > ay ? by : ay;
    this.z = bz > az ? bz : az;
    this.w = bw > aw ? bw : aw;

    return this;
};

/**
 * @method clamp
 * @memberof Odin.Vec4
 * clamp values between min and max's values
 * @param Vec4 min
 * @param Vec4 max
 * @return this
 */
Vec4.prototype.clamp = function (min, max) {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        minx = min.x,
        miny = min.y,
        minz = min.z,
        minw = min.w,
        maxx = max.x,
        maxy = max.y,
        maxz = max.z,
        maxw = maxw;

    this.x = x < minx ? minx : x > maxx ? maxx : x;
    this.y = y < miny ? miny : y > maxy ? maxy : y;
    this.z = z < minz ? minz : z > maxz ? maxz : z;
    this.w = w < minw ? minw : w > maxw ? maxw : w;

    return this;
};

/**
 * @method transformMat4
 * @memberof Odin.Vec4
 * transforms this with Mat4
 * @param Mat4 m
 * @return this
 */
Vec4.prototype.transformMat4 = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;

    this.x = x * me[0] + y * me[4] + z * me[8] + w * me[12];
    this.y = x * me[1] + y * me[5] + z * me[9] + w * me[13];
    this.z = x * me[2] + y * me[6] + z * me[10] + w * me[14];
    this.w = x * me[3] + y * me[7] + z * me[11] + w * me[15];

    return this;
};

/**
 * @method transformProjection
 * @memberof Odin.Vec3
 * transforms this with Mat4 projection matrix
 * @param Mat4 m
 * @return this
 */
Vec4.prototype.transformProjection = function (m) {
    var me = m.elements,
        x = this.x,
        y = this.y,
        z = this.z,
        w = this.w,
        d = 1 / (me[3] * x + me[7] * y + me[11] * z + me[15]);

    this.x = (me[0] * x + me[4] * y + me[8] * z + me[12] * w) * d;
    this.y = (me[1] * x + me[5] * y + me[9] * z + me[13] * w) * d;
    this.z = (me[2] * x + me[6] * y + me[10] * z + me[14] * w) * d;
    this.w = (me[3] * x + me[7] * y + me[11] * z + me[15] * w) * d;

    return this;
};

/**
 * @method fromVec2
 * @memberof Odin.Vec4
 * sets values from Vec2
 * @param Vec2 v
 * @return this
 */
Vec4.prototype.fromVec2 = function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = 0.0;
    this.w = 1;

    return this;
};

/**
 * @method fromVec3
 * @memberof Odin.Vec4
 * sets values from Vec3
 * @param Vec3 v
 * @return this
 */
Vec4.prototype.fromVec3 = function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = 1;

    return this;
};

/**
 * @method fromRect
 * @memberof Odin.Vec4
 * sets values from Rect
 * @param Vec3 v
 * @return this
 */
Vec4.prototype.fromRect = function (rect) {

    this.x = rect.x;
    this.y = rect.y;
    this.z = rect.width;
    this.w = rect.height;

    return this;
};

/**
 * @method positionFromMat4
 * @memberof Odin.Vec4
 * sets position from Mat4
 * @param Mat4 m
 * @return this
 */
Vec4.prototype.positionFromMat4 = function (m) {
    var me = m.elements;

    this.x = me[12];
    this.y = me[13];
    this.z = me[14];
    this.w = me[15];

    return this;
};

/**
 * @memberof Odin.Vec4
 * @param Odin.Vec4 other
 * @return this
 */
Vec4.prototype.equals = function (other) {

    return !(
    this.x !== other.x ||
    this.y !== other.y ||
    this.z !== other.z ||
    this.w !== other.w
    );
};

/**
 * @memberof Odin.Vec4
 * @param Odin.Vec4 other
 * @return this
 */
Vec4.prototype.notEquals = function (other) {

    return (
    this.x !== other.x ||
    this.y !== other.y ||
    this.z !== other.z ||
    this.w !== other.w
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Vec4
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Vec4.prototype.fromJSON = function (json) {

    this.x = json.x;
    this.y = json.y;
    this.z = json.z;
    this.w = json.w;

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Vec4
 * returns json object of this
 * @return Object
 */
Vec4.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Vec4";
    json.x = this.x;
    json.y = this.y;
    json.z = this.z;
    json.w = this.w;

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Vec4
 * sets values from Array object
 * @param Array array
 * @return this
 */
Vec4.prototype.fromArray = function (array) {

    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
    this.w = array[3];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Vec4
 * returns array object of this
 * @return Array
 */
Vec4.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this.x;
    array[1] = this.y;
    array[2] = this.z;
    array[3] = this.w;

    return array;
};

/**
 * @method toString
 * @memberof Odin.Vec4
 * returns string of this
 * @return String
 */
Vec4.prototype.toString = function () {

    return "Vec4( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )";
};


module.exports = Vec4;

},{"./mathf":107}],114:[function(require,module,exports){
var P2Enums = require("../p2enums");
"use strict";


var MotionState = P2Enums.MotionState,
    SleepState = P2Enums.SleepState;


function P2Broadphase() {
}


P2Broadphase.prototype.collisions = function (bodies, pairsi, pairsj) {
    var length = bodies.length,
        bi, bj, shapesi, shapesj, length, si, sj,
        i = length,
        j, k, l;

    pairsi.length = pairsj.length = 0;

    while (i--) {
        j = 0;
        while (j !== i) {
            bi = bodies[i];
            bj = bodies[j];
            j++;

            if ((bi.motionState !== MotionState.Dynamic && bj.motionState !== MotionState.Dynamic) || (bi.sleepState === SleepState.Sleeping && bj.sleepState === SleepState.Sleeping)) {
                continue;
            }

            shapesi = bi.shapes;
            shapesj = bj.shapes;

            if (!bi.aabb.intersects(bj.aabb)) continue;

            k = shapesi.length;
            length = shapesj.length;
            while (k--) {
                l = length;
                while (l--) {
                    si = shapesi[k];
                    sj = shapesj[l];
                    if ((si.filterGroup & sj.filterMask) === 0 || (sj.filterGroup & si.filterMask) === 0) continue;

                    if (si.aabb.intersects(sj.aabb)) {
                        pairsi.push(si);
                        pairsj.push(sj);
                    }
                }
            }
        }
    }
};


P2Broadphase.prototype.toJSON = function (json) {
    json || (json = {});

    return json;
};


P2Broadphase.prototype.fromJSON = function () {

    return this;
};


module.exports = P2Broadphase;

},{"../p2enums":128}],115:[function(require,module,exports){
var P2Enums = require("../p2enums");
"use strict";


var floor = Math.floor,
    defineProperty = Object.defineProperty,
    MotionState = P2Enums.MotionState,
    SleepState = P2Enums.SleepState;


function Cell(counter) {
    Array.call(this);
    this._counter = counter;
}

Cell.prototype = Object.create(Array.prototype);
Cell.prototype.constructor = Cell;


function P2BroadphaseSpatialHash(opts) {
    opts || (opts = {});

    this._cellSize = 0;
    this._inverseCellSize = 0;

    this.cells = {};
    this.cellDeathFrameCount = opts.cellDeathFrameCount != undefined ? opts.cellDeathFrameCount : 300;
    this.cellSize = opts.cellSize != undefined ? opts.cellSize : 1;
}


defineProperty(P2BroadphaseSpatialHash.prototype, "cellSize", {
    get: function () {
        return this._cellSize;
    },
    set: function (value) {
        value = value >= 1 ? value : 1;

        this._cellSize = floor(value);
        this._inverseCellSize = 1 / this._cellSize;
    }
});


P2BroadphaseSpatialHash.prototype.collisions = function (bodies, pairsi, pairsj) {
    var cells = this.cells,
        cellSize = this._cellSize,
        cellDeathFrameCount = this.cellDeathFrameCount,
        inverseCellSize = this._inverseCellSize,
        aabb, min, max, minx, miny, body, position, shapes, shape, x, y,
        cell, key, si, sj, bi, bj, i, j, k, l;

    for (key in cells) {
        cell = cells[key];
        if (cell.length === 0) {
            if (cell._counter-- <= 0) delete cells[key];
        } else {
            cell._counter = cellDeathFrameCount;
        }
        cell.length = 0;
    }
    pairsi.length = pairsj.length = 0;

    i = bodies.length;
    while (i--) {
        body = bodies[i];
        shapes = body.shapes;
        j = shapes.length;
        while (j--) {
            shape = shapes[j];
            aabb = shape.aabb;
            min = aabb.min;
            max = aabb.max;
            minx = (min.x * inverseCellSize | 0) * cellSize;
            miny = (min.y * inverseCellSize | 0) * cellSize;

            x = minx + ((max.x - min.x) * inverseCellSize | 0) * cellSize;
            y = miny + ((max.y - min.y) * inverseCellSize | 0) * cellSize;

            for (k = minx; k <= x; k += cellSize) {
                for (l = miny; l <= y; l += cellSize) {
                    key = k + ":" + l;
                    (cells[key] || (cells[key] = new Cell(cellDeathFrameCount))).push(shape);
                }
            }
        }
    }

    for (key in cells) {
        cell = cells[key];
        i = cell.length;

        while (i--) {
            j = 0;
            while (j !== i) {
                si = cell[i];
                sj = cell[j];
                j++;

                bi = si.body;
                bj = sj.body;

                if (bi && bj) {
                    if (!bi.aabb.intersects(bj.aabb)) continue;

                    if ((bi.motionState !== MotionState.Dynamic && bj.motionState !== MotionState.Dynamic) || (bi.sleepState === SleepState.Sleeping && bj.sleepState === SleepState.Sleeping)) {
                        continue;
                    }
                    if ((si.filterGroup & sj.filterMask) === 0 || (sj.filterGroup & si.filterMask) === 0) continue;
                }

                pairsi.push(si);
                pairsj.push(sj);
            }
        }
    }
};


P2BroadphaseSpatialHash.prototype.toJSON = function (json) {
    json || (json = {});

    json.cellSize = this.cellSize;
    json.cellDeathFrameCount = this.cellDeathFrameCount;

    return json;
};


P2BroadphaseSpatialHash.prototype.fromJSON = function (json) {

    this.cellSize = json.cellSize;
    this.cellDeathFrameCount = json.cellDeathFrameCount;

    return this;
};


module.exports = P2BroadphaseSpatialHash;

},{"../p2enums":128}],116:[function(require,module,exports){
var ObjectPool = require("../../base/object_pool");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var P2Enums = require("../p2enums");
var P2Contact = require("../constraints/p2contact");
"use strict";


var min = Math.min,
    abs = Math.abs,
    sqrt = Math.sqrt,

    EPSILON = Mathf.EPSILON,

    BodyType = P2Enums.BodyType,
    ShapeType = P2Enums.ShapeType,

    CONTACT_POOL = new ObjectPool(P2Contact);


function clearContact(contact) {

    contact.bi = contact.bj = undefined;
}

function createContact(bi, bj, e, u, nx, ny, px, py, s, contacts) {
    var c = CONTACT_POOL.create(),
        n = c.n,
        p = c.p;

    c.bi = bi;
    c.bj = bj;

    c.e = e;
    c.u = u;

    n.x = nx;
    n.y = ny;

    p.x = px;
    p.y = py;

    c.s = s;

    contacts.push(c);
}

function circle2Circle(si, sj, xix, xiy, ri, xjx, xjy, rj, contacts) {
    var dx = xjx - xix,
        dy = xjy - xiy,
        dist = dx * dx + dy * dy,
        invDist, separation = 0.0,
        r = ri + rj,
        nx, ny;

    if (dist > r * r) return;
    if (!collide(si, sj)) return;

    if (dist < EPSILON) {
        nx = 0.0;
        ny = 1.0;
        invDist = 0.0;
        separation = -r;
    } else {
        dist = sqrt(dist);
        invDist = 1.0 / dist;

        nx = dx * invDist;
        ny = dy * invDist;

        separation = dist - r;
    }

    createContact(
        si.body,
        sj.body,
        1.0 + min(si.elasticity, sj.elasticity),
        min(si.friction, sj.friction),
        nx,
        ny,
        xjx - rj * nx,
        xjy - rj * ny,
        separation,
        contacts
    );
}

function P2Nearphase() {
}

P2Nearphase.CONTACT_POOL = CONTACT_POOL;


P2Nearphase.prototype.collisions = function (pairsi, pairsj, contacts) {
    var si, sj,
        i = pairsi.length;

    contacts.length = 0;
    CONTACT_POOL.clearForEach(clearContact);

    while (i--) {
        si = pairsi[i];
        sj = pairsj[i];

        collisionType(si, sj, contacts);
    }
};


function collide(si, sj) {
    var bi = si.body,
        bj = sj.body,
        i = bi._index,
        j = bj._index,
        space = bi.space || bj.space;

    if (!space) return false;
    space.collisionMatrixSet(i, j, 1, true);

    if (space.collisionMatrixGet(i, j, true) !== space.collisionMatrixGet(i, j, false)) {
        bi.wake();
        bj.wake();

        bi.emit("collide", bj, si, sj);
        bj.emit("collide", bi, sj, si);
    } else {
        bi.wake();
        bj.wake();

        bi.emit("colliding", bj, si, sj);
        bj.emit("colliding", bi, sj, si);
    }

    if (si.isTrigger || sj.isTrigger) return false;

    return true;
}


function circleCircle(si, sj, contacts) {
    var xi = si.position,
        xj = sj.position;

    circle2Circle(
        si,
        sj,
        xi.x, xi.y, si.radius,
        xj.x, xj.y, sj.radius,
        contacts
    );
}


function segmentCircle(si, sj, contacts) {
    var ri = si.radius,
        a = si._a,
        b = si._b,
        n = si._normal,
        ax = a.x,
        ay = a.y,
        bx = b.x,
        by = b.y,
        nx = n.x,
        ny = n.y,

        xj = sj.position,
        xjx = xj.x,
        xjy = xj.y,
        rj = sj.radius,
        r = ri + rj,

        dn = (nx * xjx + ny * xjy) - (ax * nx + ay * ny),
        dist = abs(dn),
        dt, dta, dtb, dx, dy, invDist;

    if (dist > r) return;

    dt = xjx * ny - xjy * nx;
    dta = ax * ny - ay * nx;
    dtb = bx * ny - by * nx;

    if (dt <= dta) {
        if (dt < dta - r) return;

        dx = xjx - ax;
        dy = xjy - ay;

        dist = dx * dx + dy * dy;
        if (dist > r * r) return;

        dist = dist === 0.0 ? 0.0 : sqrt(dist);
        invDist = dist === 0.0 ? 0.0 : 1.0 / dist;

        nx = dx * invDist;
        ny = dy * invDist;
    } else if (dt > dtb) {
        if (dt > dtb + r) return;

        dx = xjx - bx;
        dy = xjy - by;

        dist = dx * dx + dy * dy;
        if (dist > r * r) return;

        dist = dist === 0.0 ? 0.0 : sqrt(dist);
        invDist = dist === 0.0 ? 0.0 : 1.0 / dist;

        nx = dx * invDist;
        ny = dy * invDist;
    } else {
        if (dn < 0.0) {
            nx = -nx;
            ny = -ny;
        }
    }
    if (!collide(si, sj)) return;

    createContact(
        si.body,
        sj.body,
        1.0 + min(si.elasticity, sj.elasticity),
        min(si.friction, sj.friction),
        nx,
        ny,
        xjx - r * nx,
        xjy - r * ny,
        dist - r,
        contacts
    );
}


function segmentSegment(si, sj, contacts) {
    var ai = si._a,
        aix = ai.x,
        aiy = ai.y,
        bi = si._b,
        bix = bi.x,
        biy = bi.y,
        ri = si.radius,

        aj = sj._a,
        ajx = aj.x,
        ajy = aj.y,
        bj = sj._b,
        bjx = bj.x,
        bjy = bj.y,
        rj = sj.radius,
        d0, d1, d2, d3, mi, mj, m, s, t, ux, uy, vx, vy, amx, amy, bmx, bmy;

    segmentSegmentArray[0] = d0 = segmentPointDistanceSq(aix, aiy, bix, biy, ajx, ajy);
    segmentSegmentArray[1] = d1 = segmentPointDistanceSq(aix, aiy, bix, biy, bjx, bjy);
    segmentSegmentArray[2] = d2 = segmentPointDistanceSq(ajx, ajy, bjx, bjy, aix, aiy);
    segmentSegmentArray[3] = d3 = segmentPointDistanceSq(ajx, ajy, bjx, bjy, bix, biy);

    mi = d0 < d1 ? 0 : 1;
    mj = d2 < d3 ? 2 : 3;
    m = segmentSegmentArray[mi] < segmentSegmentArray[mj] ? mi : mj;

    ux = bix - aix;
    uy = biy - aiy;
    vx = bjx - ajx;
    vy = bjy - ajy;

    if (m === 0) {
        s = ((ajx - aix) * ux + (ajy - aiy) * uy) / (ux * ux + uy * uy);
        s = s < 0 ? 0 : (s > 1 ? 1 : s);
        t = 0;
    } else if (m === 1) {
        s = ((bjx - aix) * ux + (bjy - aiy) * uy) / (ux * ux + uy * uy);
        s = s < 0 ? 0 : (s > 1 ? 1 : s);
        t = 1;
    } else if (m === 2) {
        s = 0;
        t = ((aix - ajx) * vx + (aiy - ajy) * vy) / (vx * vx + vy * vy);
        t = t < 0 ? 0 : (t > 1 ? 1 : t);
    } else if (m === 3) {
        s = 1;
        t = ((bix - ajx) * vx + (biy - ajy) * vy) / (vx * vx + vy * vy);
        t = t < 0 ? 0 : (t > 1 ? 1 : t);
    }

    amx = aix + (ux * s);
    amy = aiy + (uy * s);
    bmx = ajx + (vx * t);
    bmy = ajy + (vy * t);

    circle2Circle(
        si,
        sj,
        amx, amy, ri,
        bmx, bmy, rj,
        contacts
    );
}


function convexSegment(si, sj, contacts) {
    var vertices = si._vertices,
        normals = si._normals,

        a = sj._a,
        ax = a.x,
        ay = a.y,
        b = sj._b,
        bx = b.x,
        by = b.y,
        nj = sj._normal,
        radius = sj.radius,
        njx = nj.x,
        njy = nj.y,

        segD = njx * ax + njy * ay,
        minNorm = valueOnAxis(vertices, njx, njy, segD) - radius,
        minNeg = valueOnAxis(vertices, -njx, -njy, -segD) - radius,
        index = -1,
        polyMin = -Infinity,
        v, n, dist, i, vax, vay, vbx, vby, u, e, nx, ny, count = 0;

    if (minNeg > 0 || minNorm > 0) return;

    i = vertices.length;
    while (i--) {
        v = vertices[i];
        n = normals[i];
        nx = n.x;
        ny = n.y;
        dist = segmentValueOnAxis(ax, ay, bx, by, radius, nx, ny, (nx * v.x + ny * v.y));

        if (dist > 0.0) {
            return;
        } else if (dist > polyMin) {
            polyMin = dist;
            index = i;
        }
    }

    if (index === -1) return;
    if (!collide(si, sj)) return;

    e = 1.0 + min(si.elasticity, sj.elasticity);
    u = min(si.friction, sj.friction);

    n = normals[index];
    nx = n.x;
    ny = n.y;

    vax = ax + (-nx * radius);
    vay = ay + (-ny * radius);

    vbx = bx + (-nx * radius);
    vby = by + (-ny * radius);

    if (contains(vertices, normals, vax, vay)) {
        createContact(
            si.body,
            sj.body,
            e,
            u,
            nx,
            ny,
            vax,
            vay,
            polyMin,
            contacts
        );
        count++;
    }
    if (contains(vertices, normals, vbx, vby)) {
        createContact(
            si.body,
            sj.body,
            e,
            u,
            nx,
            ny,
            vbx,
            vby,
            polyMin,
            contacts
        );
        count++;
    }

    if (minNorm >= polyMin || minNeg >= polyMin) {
        if (minNorm > minNeg) {
            count += pointsBehindSegment(si, sj, e, u, ax, ay, bx, by, radius, nx, ny, minNorm, 1, contacts);
        } else {
            count += pointsBehindSegment(si, sj, e, u, ax, ay, bx, by, radius, nx, ny, minNeg, -1, contacts);
        }
    }
}

var segmentSegmentArray = [0.0, 0.0, 0.0, 0.0];

function pointsBehindSegment(si, sj, e, u, ax, ay, bx, by, radius, nx, ny, dist, coef, contacts) {
    var dta = nx * ay - ny * ax,
        dtb = nx * by - ny * bx,
        vertices = si._vertices,
        i = vertices.length,
        v, vx, vy, dt,
        count = 0;

    nx *= coef;
    ny *= coef;

    while (i--) {
        v = vertices[i]
        vx = v.x;
        vy = v.y;

        if ((vx * nx + vy * ny) < (nx * ax + ny * ay) * coef + radius) {
            dt = nx * vy - ny * vx;
            if (dta >= dt && dt >= dtb) {
                createContact(
                    si.body,
                    sj.body,
                    e,
                    u,
                    nx,
                    ny,
                    vx,
                    vy,
                    dist,
                    contacts
                );
                count++;
            }
        }
    }

    return count;
}

function segmentPointDistanceSq(ax, ay, bx, by, px, py) {
    var wx = px - ax,
        wy = py - ay,
        dx = bx - ax,
        dy = by - ay,

        proj = wx * dx + wy * dy,
        vsq;

    if (proj <= 0.0) return wx * wx + wy * wy;

    vsq = dx * dx + dy * dy;
    if (proj >= vsq) return (wx * wx + wy * wy) - 2 * proj + vsq;


    return (wx * wx + wy * wy) - proj * proj / vsq;
}

function segmentValueOnAxis(ax, ay, bx, by, r, nx, ny, d) {
    var a = (nx * ax + ny * ay) - r,
        b = (nx * bx + ny * by) - r;

    return min(a, b) - d;
}


function convexCircle(si, sj, contacts) {
    var vertices = si._vertices,
        normals = si._normals,
        xj = sj.position,
        xjx = xj.x,
        xjy = xj.y,
        radius = sj.radius,

        vertex, normal, s, separation = -Infinity,
        index = -1,
        v1, v2, v1x, v1y, v2x, v2y, ex, ey, dx, dy, u, dist, invDist,

        nx, ny,
        i = vertices.length;

    while (i--) {
        vertex = vertices[i];
        normal = normals[i];
        s = normal.x * (xjx - vertex.x) + normal.y * (xjy - vertex.y);

        if (s > radius) return;

        if (s > separation) {
            separation = s;
            index = i;
        }
    }

    if (index === -1) return;

    normal = normals[index];
    nx = normal.x;
    ny = normal.y;

    v1 = vertices[index];
    v1x = v1.x;
    v1y = v1.y;
    v2 = vertices[index + 1] || vertices[0];
    v2x = v2.x;
    v2y = v2.y;

    ex = v2x - v1x;
    ey = v2y - v1y;

    dx = xjx - v1x;
    dy = xjy - v1y;

    u = (ex * dx + ey * dy) / (ex * ex + ey * ey);

    if (u < 0.0) {
        dx = xjx - v1x;
        dy = xjy - v1y;

        dist = dx * dx + dy * dy;
        if (dist > radius * radius) return;

        dist = sqrt(dist);
        invDist = dist > 0.0 ? 1.0 / dist : 0.0;

        nx = dx * invDist;
        ny = dy * invDist;
    } else if (u > 1.0) {
        dx = xjx - v2x;
        dy = xjy - v2y;

        dist = dx * dx + dy * dy;
        if (dist > radius * radius) return;

        dist = sqrt(dist);
        invDist = dist > 0.0 ? 1.0 / dist : 0.0;

        nx = dx * invDist;
        ny = dy * invDist;
    } else {
        normal = normals[index];
        nx = normal.x;
        ny = normal.y;

        dist = separation;
    }
    if (!collide(si, sj)) return;

    createContact(
        si.body,
        sj.body,
        1.0 + min(si.elasticity, sj.elasticity),
        min(si.friction, sj.friction),
        nx,
        ny,
        xjx - radius * nx,
        xjy - radius * ny,
        dist - radius,
        contacts
    );
}


function contains(vertices, normals, px, py) {
    var n, nx, ny, v, vx, vy,
        i = vertices.length;

    while (i--) {
        n = normals[i];
        nx = n.x;
        ny = n.y;
        v = vertices[i];
        vx = v.x;
        vy = v.y;

        if ((nx * px + ny * py) - (nx * vx + ny * vy) > 0) return false;
    }

    return true;
}


function findContacts(si, sj, normal, dist, contacts) {
    if (!collide(si, sj)) return;
    var verticesi = si._vertices,
        normalsi = si._normals,
        verticesj = sj._vertices,
        normalsj = sj._normals,
        v, vx, vy,
        nx = normal.x,
        ny = normal.y,

        e = 1.0 + min(si.elasticity, sj.elasticity),
        u = min(si.friction, sj.friction),

        i;

    i = verticesi.length;
    while (i--) {
        v = verticesi[i];
        vx = v.x;
        vy = v.y;

        if (contains(verticesj, normalsj, vx, vy)) {
            createContact(
                si.body,
                sj.body,
                e,
                u,
                nx,
                ny,
                vx,
                vy,
                dist,
                contacts
            );
        }
    }

    i = verticesj.length;
    while (i--) {
        v = verticesj[i];
        vx = v.x;
        vy = v.y;

        if (contains(verticesi, normalsi, vx, vy)) {
            createContact(
                si.body,
                sj.body,
                e,
                u,
                nx,
                ny,
                vx,
                vy,
                dist,
                contacts
            );
        }
    }
}


function valueOnAxis(vertices, nx, ny, d) {
    var v, m = Infinity,
        i = vertices.length;

    while (i--) {
        v = vertices[i];
        m = min(m, nx * v.x + ny * v.y);
    }

    return m - d;
}


var lastMinMSA = 0.0;

function findMSA(si, sj) {
    var verticesi = si._vertices,
        normalsi = si._normals,
        counti = normalsi.length,
        verticesj = sj._vertices,

        n, v, dist, min = -Infinity,
        index = -1,
        i = counti;

    while (i--) {
        n = normalsi[i];
        v = verticesi[i];

        dist = valueOnAxis(verticesj, n.x, n.y, (n.x * v.x + n.y * v.y));

        if (dist > 0.0) return -1;

        if (dist > min) {
            min = dist;
            index = i;
        }
    }

    lastMinMSA = min;
    return index;
}


function convexConvex(si, sj, contacts) {
    var indexi, mini, indexj, minj;

    indexi = findMSA(si, sj);
    if (indexi < 0) return;
    mini = lastMinMSA;

    indexj = findMSA(sj, si);
    if (indexj < 0) return;
    minj = lastMinMSA;

    if (mini > minj) {
        findContacts(si, sj, si._normals[indexi], mini, contacts);
    } else {
        findContacts(sj, si, sj._normals[indexj], minj, contacts);
    }
}


function collisionType(si, sj, contacts) {
    var siType = si.type,
        sjType = sj.type;

    if (siType === ShapeType.Circle) {

        if (sjType === ShapeType.Circle) {
            circleCircle(si, sj, contacts);
        } else if (sjType === ShapeType.Segment) {
            segmentCircle(sj, si, contacts);
        } else if (sjType === ShapeType.Convex) {
            convexCircle(sj, si, contacts);
        }
    } else if (siType === ShapeType.Convex) {

        if (sjType === ShapeType.Circle) {
            convexCircle(si, sj, contacts);
        } else if (sjType === ShapeType.Segment) {
            convexSegment(si, sj, contacts);
        } else if (sjType === ShapeType.Convex) {
            convexConvex(si, sj, contacts);
        }
    } else if (siType === ShapeType.Segment) {

        if (sjType === ShapeType.Circle) {
            segmentCircle(si, sj, contacts);
        } else if (sjType === ShapeType.Segment) {
            segmentSegment(si, sj, contacts);
        } else if (sjType === ShapeType.Convex) {
            convexSegment(sj, si, contacts);
        }
    }
}


module.exports = P2Nearphase;

},{"../../base/object_pool":15,"../../math/mathf":107,"../../math/vec2":111,"../constraints/p2contact":118,"../p2enums":128}],117:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
"use strict";

/**
 * @class P2Constraint
 * @extends Class
 * @brief 2d contact equation
 */
function P2Constraint(bi, bj) {

    EventEmitter.call(this);

    /**
     * @property P2Body bj
     * @memberof P2Constraint
     */
    this.bi = bi;

    /**
     * @property P2Body bj
     * @memberof P2Constraint
     */
    this.bj = bj;

    /**
     * @property Array equations
     * @memberof P2Constraint
     */
    this.equations = [];
}

EventEmitter.extend(P2Constraint);


P2Constraint.prototype.update = function () {

};


module.exports = P2Constraint;

},{"../../base/event_emitter":13}],118:[function(require,module,exports){
var Class = require("../../base/class");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var P2Equation = require("../constraints/p2equation");
"use strict";


/**
 * @class P2Contact
 * @extends P2Equation
 * @brief 2d contact equation
 */
function P2Contact() {

    P2Equation.call(this);

    this.minForce = 0.0;

    /**
     * @property Vec2 p
     * @memberof P2Contact
     */
    this.p = new Vec2;

    /**
     * @property Vec2 n
     * @memberof P2Contact
     */
    this.n = new Vec2;

    /**
     * @property Number s
     * @memberof P2Contact
     */
    this.s = 0.0;

    /**
     * @property Number e
     * @memberof P2Contact
     */
    this.e = 1.0;

    /**
     * @property Number u
     * @memberof P2Contact
     */
    this.u = 1.0;

    this.ri = new Vec2;
    this.rj = new Vec2;

    this.rixn = 0;
    this.rjxn = 0;
}

P2Equation.extend(P2Contact);


P2Contact.prototype.init = function (h) {
    var bi = this.bi,
        bj = this.bj,

        p = this.p,
        px = p.x,
        py = p.y,
        n = this.n,
        nx = n.x,
        ny = n.y,

        xi = bi.position,
        xj = bj.position,

        ri = this.ri,
        rix = px - xi.x,
        riy = py - xi.y,

        rj = this.rj,
        rjx = px - xj.x,
        rjy = py - xj.y,

        rixn = rix * ny - riy * nx,
        rjxn = rjx * ny - rjy * nx;

    ri.x = rix;
    ri.y = riy;

    rj.x = rjx;
    rj.y = rjy;

    this.rixn = rixn;
    this.rjxn = rjxn;

    this.lambda = 0;
    this.calculateB(h);
    this.calculateC();
};


P2Contact.prototype.calculateB = function (h) {
    var bi = this.bi,
        bj = this.bj,

        n = this.n,
        nx = n.x,
        ny = n.y,

        vi = bi.velocity,
        wi = bi.angularVelocity,
        fi = bi.force,
        ti = bi.torque,
        invMi = bi.invMass,
        invIi = bi.invInertia,

        vj = bj.velocity,
        wj = bj.angularVelocity,
        fj = bj.force,
        tj = bj.torque,
        invMj = bj.invMass,
        invIj = bj.invInertia,

        ri = this.ri,
        rix = ri.x,
        riy = ri.y,
        rj = this.rj,
        rjx = rj.x,
        rjy = rj.y,

        e = this.e,

        Gq = this.s,

        GWx = vj.x + (-wj * rjy) - vi.x - (-wi * riy),
        GWy = vj.y + (wj * rjx) - vi.y - (wi * rix),
        GW = e * GWx * nx + e * GWy * ny,

        GiMfx = fj.x * invMj + (-tj * invIj * rjy) - fi.x * invMi - (-ti * invIi * riy),
        GiMfy = fj.y * invMj + (tj * invIj * rjx) - fi.y * invMi - (ti * invIi * rix),
        GiMf = GiMfx * nx + GiMfy * ny;

    this.B = -this.a * Gq - this.b * GW - h * GiMf;
};


P2Contact.prototype.calculateC = function () {
    var bi = this.bi,
        bj = this.bj,

        rixn = this.rixn,
        rjxn = this.rjxn,

        invIi = bi.invInertia,
        invIj = bj.invInertia,

        C = bi.invMass + bj.invMass + this.epsilon + invIi * rixn * rixn + invIj * rjxn * rjxn;

    this.invC = C === 0 ? 0 : 1 / C;
};


P2Contact.prototype.calculateGWlambda = function () {
    var bi = this.bi,
        bj = this.bj,

        n = this.n,

        vlambdai = bi.vlambda,
        wlambdai = bi.wlambda,
        vlambdaj = bj.vlambda,
        wlambdaj = bj.wlambda,

        ulambdax = vlambdaj.x - vlambdai.x,
        ulambday = vlambdaj.y - vlambdai.y,

        GWlambda = ulambdax * n.x + ulambday * n.y;

    if (wlambdai != undefined) GWlambda -= wlambdai * this.rixn;
    if (wlambdaj != undefined) GWlambda += wlambdaj * this.rjxn;

    return GWlambda;
};


P2Contact.prototype.addToLambda = function (deltaLambda) {
    var bi = this.bi,
        bj = this.bj,

        n = this.n,
        nx = n.x,
        ny = n.y,

        invMi = bi.invMass,
        vlambdai = bi.vlambda,
        invMj = bj.invMass,
        vlambdaj = bj.vlambda;

    vlambdai.x -= deltaLambda * invMi * nx;
    vlambdai.y -= deltaLambda * invMi * ny;

    vlambdaj.x += deltaLambda * invMj * nx;
    vlambdaj.y += deltaLambda * invMj * ny;

    if (bi.wlambda != undefined) bi.wlambda -= deltaLambda * bi.invInertia * this.rixn;
    if (bj.wlambda != undefined) bj.wlambda += deltaLambda * bj.invInertia * this.rjxn;
};


module.exports = P2Contact;

},{"../../base/class":8,"../../math/mathf":107,"../../math/vec2":111,"../constraints/p2equation":120}],119:[function(require,module,exports){
var P2Constraint = require("./p2constraint");
var P2Contact = require("./p2contact");
"use strict";


var sqrt = Math.sqrt;


/**
 * @class P2DistanceConstraint
 * @extends P2Constraint
 * @brief 2d contact equation
 */
function P2DistanceConstraint(bi, bj, distance, maxForce) {

    P2Constraint.call(this, bi, bj);

    this.distance = distance || (distance = 1);
    maxForce || (maxForce = 1e6);

    var distanceEquation = this._distanceEquation = new P2Contact();
    distanceEquation.bi = bi;
    distanceEquation.bj = bj;
    distanceEquation.minForce = -maxForce;
    distanceEquation.maxForce = maxForce;
    console.log(distanceEquation);

    this.equations.push(distanceEquation);
}

P2Constraint.extend(P2DistanceConstraint);


P2DistanceConstraint.prototype.update = function () {
    var distanceEquation = this._distanceEquation,
        distance = this.distance,
        bi = this.bi,
        bj = this.bj,
        n = distanceEquation.n,
        ri = distanceEquation.ri,
        rj = distanceEquation.rj,
        xi = bi.position,
        xj = bj.position,
        nx = xj.x - xi.x,
        ny = xj.y - xi.y,
        len = nx * nx + ny * ny,
        invLen = len === 0 ? 0 : 1 / (len = sqrt(len))

    nx *= invLen;
    ny *= invLen;
    n.x = nx;
    n.y = ny;

    ri.x = nx * distance * 0.5;
    ri.y = ny * distance * 0.5;

    rj.x = nx * distance * -0.5;
    rj.y = ny * distance * -0.5;
};


module.exports = P2DistanceConstraint;

},{"./p2constraint":117,"./p2contact":118}],120:[function(require,module,exports){
var EventEmitter = require("../../base/event_emitter");
"use strict";

/**
 * @class P2Equation
 * @extends Class
 * @brief 2d contact equation
 */
function P2Equation() {

    EventEmitter.call(this);

    /**
     * @property P2Body bj
     * @memberof P2Equation
     */
    this.bi = undefined;

    /**
     * @property P2Body bj
     * @memberof P2Equation
     */
    this.bj = undefined;

    /**
     * @property Number minForce
     * @memberof P2Equation
     */
    this.minForce = -Number.MAX_VALUE;

    /**
     * @property Number maxForce
     * @memberof P2Equation
     */
    this.maxForce = Number.MAX_VALUE;

    /**
     * @property Number relaxation
     * @brief number of timesteps it takesto stabilize the constraint
     * @memberof P2Equation
     */
    this.relaxation = 4;

    /**
     * @property Number stiffness
     * @brief spring constant
     * @memberof P2Equation
     */
    this.stiffness = 1e6;

    this.a = 0;
    this.b = 0;
    this.epsilon = 0;

    this.lambda = 0;
    this.B = 0;
    this.invC = 0;
}

EventEmitter.extend(P2Equation);


P2Equation.prototype.updateConstants = function (h) {
    var k = this.stiffness,
        d = this.relaxation;

    this.a = 4.0 / (h * (1.0 + 4.0 * d));
    this.b = (4.0 * d) / (1.0 + 4.0 * d);
    this.epsilon = 4.0 / (h * h * k * (1.0 + 4.0 * d));
};


module.exports = P2Equation;

},{"../../base/event_emitter":13}],121:[function(require,module,exports){
var Class = require("../../base/class");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var P2Equation = require("./p2equation");
"use strict";


/**
 * @class P2Friction
 * @extends P2Equation
 * @brief 2d contact equation
 */
function P2Friction() {

    P2Equation.call(this);

    /**
     * @property Vec2 p
     * @memberof P2Friction
     */
    this.p = new Vec2;

    /**
     * @property Vec2 t
     * @memberof P2Friction
     */
    this.t = new Vec2;

    this.ri = new Vec2;
    this.rj = new Vec2;

    this.rixt = 0;
    this.rjxt = 0;
}

P2Equation.extend(P2Friction);


P2Friction.prototype.init = function (h) {
    var bi = this.bi,
        bj = this.bj,

        p = this.p,
        px = p.x,
        py = p.y,
        t = this.t,
        tx = t.x,
        ty = t.y,

        xi = bi.position,
        xj = bj.position,

        ri = this.ri,
        rix = px - xi.x,
        riy = py - xi.y,

        rj = this.rj,
        rjx = px - xj.x,
        rjy = py - xj.y,

        rixt = rix * ty - riy * tx,
        rjxt = rjx * ty - rjy * tx;

    ri.x = rix;
    ri.y = riy;

    rj.x = rjx;
    rj.y = rjy;

    this.rixt = rixt;
    this.rjxt = rjxt;

    this.lambda = 0;
    this.calculateB(h);
    this.calculateC();
};


P2Friction.prototype.calculateB = function (h) {
    var bi = this.bi,
        bj = this.bj,

        t = this.t,
        tx = t.x,
        ty = t.y,

        vi = bi.velocity,
        wi = bi.angularVelocity,
        fi = bi.force,
        ti = bi.torque,
        invMi = bi.invMass,
        invIi = bi.invInertia,

        vj = bj.velocity,
        wj = bj.angularVelocity,
        fj = bj.force,
        tj = bj.torque,
        invMj = bj.invMass,
        invIj = bj.invInertia,

        ri = this.ri,
        rix = ri.x,
        riy = ri.y,
        rj = this.rj,
        rjx = rj.x,
        rjy = rj.y,

        Gq = 0,

        GWx = vj.x + (-wj * rjy) - vi.x - (-wi * riy),
        GWy = vj.y + (wj * rjx) - vi.y - (wi * rix),
        GW = GWx * tx + GWy * ty,

        GiMfx = fj.x * invMj + (-tj * invIj * rjy) - fi.x * invMi - (-ti * invIi * riy),
        GiMfy = fj.y * invMj + (tj * invIj * rjx) - fi.y * invMi - (ti * invIi * rix),
        GiMf = GiMfx * tx + GiMfy * ty;

    this.B = -this.a * Gq - this.b * GW - h * GiMf;
};


P2Friction.prototype.calculateC = function () {
    var bi = this.bi,
        bj = this.bj,

        rixt = this.rixt,
        rjxt = this.rjxt,

        invIi = bi.invInertia,
        invIj = bj.invInertia,

        C = bi.invMass + bj.invMass + this.epsilon + invIi * rixt * rixt + invIj * rjxt * rjxt;

    this.invC = C === 0 ? 0 : 1 / C;
};


P2Friction.prototype.calculateGWlambda = function () {
    var bi = this.bi,
        bj = this.bj,

        t = this.t,

        vlambdai = bi.vlambda,
        wlambdai = bi.wlambda,
        vlambdaj = bj.vlambda,
        wlambdaj = bj.wlambda,

        ulambdax = vlambdaj.x - vlambdai.x,
        ulambday = vlambdaj.y - vlambdai.y,

        GWlambda = ulambdax * t.x + ulambday * t.y;

    if (wlambdai != undefined) GWlambda -= wlambdai * this.rixt;
    if (wlambdaj != undefined) GWlambda += wlambdaj * this.rjxt;

    return GWlambda;
};


P2Friction.prototype.addToLambda = function (deltaLambda) {
    var bi = this.bi,
        bj = this.bj,

        t = this.t,
        tx = t.x,
        ty = t.y,

        invMi = bi.invMass,
        vlambdai = bi.vlambda,
        invMj = bj.invMass,
        vlambdaj = bj.vlambda;

    vlambdai.x -= deltaLambda * invMi * tx;
    vlambdai.y -= deltaLambda * invMi * ty;

    vlambdaj.x += deltaLambda * invMj * tx;
    vlambdaj.y += deltaLambda * invMj * ty;

    if (bi.wlambda != undefined) bi.wlambda -= deltaLambda * bi.invInertia * this.rixt;
    if (bj.wlambda != undefined) bj.wlambda += deltaLambda * bj.invInertia * this.rjxt;
};


module.exports = P2Friction;

},{"../../base/class":8,"../../math/mathf":107,"../../math/vec2":111,"./p2equation":120}],122:[function(require,module,exports){
var Class = require("../../base/class");
var P2Enums = require("../p2enums");
var P2Shape = require("./p2shape");
"use strict";


var ShapeType = P2Enums.ShapeType,

    abs = Math.abs,
    PI = Math.PI;


function P2Circle(opts) {
    opts || (opts = {});

    P2Shape.call(this, opts);

    this.type = ShapeType.Circle;
    this.radius = opts.radius != undefined ? abs(opts.radius) : 0.5;
}

P2Shape.extend(P2Circle);


P2Circle.prototype.copy = function (other) {
    P2Shape.prototype.copy.call(this, other);

    this.radius = other.radius;

    return this;
};


P2Circle.prototype.pointQuery = function (p) {
    var x = this.position,
        dx = x.x - p.x,
        dy = x.y - p.y,
        r = this.radius;

    return (dx * dx + dy * dy) < r * r;
};


P2Circle.prototype.centroid = function (v) {
    var localPosition = this.localPosition;

    v.x = localPosition.x;
    v.y = localPosition.y;

    return v;
};


P2Circle.prototype.area = function () {
    var r = this.radius;

    return PI * (r * r);
};


P2Circle.prototype.inertia = function (mass) {
    var r = this.radius,
        localPosition = this.localPosition,
        lx = localPosition.x,
        ly = localPosition.y;

    return mass * ((r * r * 0.5) + (lx * lx + ly * ly));
};


P2Circle.prototype.update = function (matrix) {
    var localMatrix = this.matrix,
        matrixWorld = this.matrixWorld,
        localPosition = this.localPosition,
        pos = this.position,
        r = this.radius,
        aabb = this.aabb,
        min = aabb.min,
        max = aabb.max,
        x, y;

    localMatrix.setRotation(this.localRotation);
    localMatrix.setPosition(localPosition);
    matrixWorld.mmul(matrix, localMatrix);

    pos.x = localPosition.x;
    pos.y = localPosition.y;
    pos.transformMat32(matrix);
    x = pos.x;
    y = pos.y;

    min.x = x - r;
    min.y = y - r;
    max.x = x + r;
    max.y = y + r;
};


P2Circle.prototype.toJSON = function (json) {
    json = P2Shape.prototype.toJSON.call(this, json);

    json.radius = this.radius;

    return json;
};


P2Circle.prototype.fromJSON = function (json) {
    P2Shape.prototype.fromJSON.call(this, json);

    this.radius = json.radius;

    return this;
};


module.exports = P2Circle;

},{"../../base/class":8,"../p2enums":128,"./p2shape":127}],123:[function(require,module,exports){
var Vec2 = require("../../math/vec2");
var Log = require("../../base/log");
var P2Enums = require("../p2enums");
var P2Shape = require("./p2shape");
"use strict";


var ShapeType = P2Enums.ShapeType;


function P2Convex(opts) {
    opts || (opts = {});

    P2Shape.call(this, opts);

    this.type = ShapeType.Convex;

    this.vertices = opts.vertices != undefined ? opts.vertices : [
        new Vec2(0.5, 0.5),
        new Vec2(-0.5, 0.5),
        new Vec2(-0.5, -0.5),
        new Vec2(0.5, -0.5)
    ];

    if (!P2Convex.validateVertices(this.vertices)) {
        log.warn("P2Convex.constructor: passed vertices are invalid, creating convex hull from vertices with gift wrapping algorithm");
        this.vertices = P2Convex.createConvexHull(this.vertices);
    }

    this.normals = [];

    this._vertices = [];
    this._normals = [];

    var vertices = this.vertices,
        wverts = this._vertices,
        normals = this.normals,
        wnorms = this._normals,
        v1, v2,
        i;

    i = vertices.length;
    while (i--) {
        v1 = vertices[i];
        v2 = vertices[i + 1] || vertices[0];

        normals[i] = new Vec2(v2.y - v1.y, -(v2.x - v1.x)).normalize();

        wverts[i] = new Vec2(v1);
        wnorms[i] = new Vec2(normals[i]);
    }
}

P2Shape.extend(P2Convex);


P2Convex.prototype.copy = function (other) {
    P2Shape.prototype.copy.call(this, other);
    var vertices = other.vertices,
        normals = other.normals,
        i;

    this.vertices.length = this.normals.length = this._vertices.length = this._normals.length = 0;

    i = vertices.length;
    while (i--) this.vertices[i] = vertices[i].clone();

    i = normals.length;
    while (i--) this.normals[i] = normals[i].clone();

    return this;
};


P2Convex.prototype.pointQuery = function (p) {
    if (!this.aabb.contains(p)) return false;
    var vertices = this._vertices,
        normals = this._normals,
        px = p.x,
        py = p.y,
        n, nx, ny, v, vx, vy,
        i = vertices.length;
    ;

    while (i--) {
        n = normals[i];
        nx = n.x;
        ny = n.y;
        v = vertices[i];
        vx = v.x;
        vy = v.y;

        if ((nx * px + ny * py) - (nx * vx + ny * vy) > 0) return false;
    }

    return true;
}


P2Convex.prototype.centroid = function () {
    var v1 = new Vec2,
        v2 = new Vec2,
        vsum = new Vec2;

    return function (v) {
        var localPosition = this.localPosition,
            vertices = this.vertices,
            len = vertices.length,
            v1x, v1y, v2x, v2y, area = 0,
            cross,
            i = len;

        vsum.x = vsum.y = 0;

        while (i--) {
            v1.vadd(localPosition, vertices[i]);
            v2.vadd(localPosition, vertices[(i + 1) % len]);

            v1x = v1.x;
            v1y = v1.y;
            v2x = v2.x;
            v2y = v2.y;

            cross = v1x * v2y - v1y * v2x;
            area += cross;

            vsum.x += (v1x + v2x) * cross;
            vsum.y += (v1y + v2y) * cross;
        }

        return v.copy(vsum).smul(1 / (3 * area));
    };
}();


P2Convex.prototype.area = function () {
    var vertices = this.vertices,
        len = vertices.length,
        v1, v2, area = 0,
        i = len;

    while (i--) {
        v1 = vertices[i];
        v2 = vertices[(i + 1) % len];

        area += v1.x * v2.y - v1.y * v2.x;
    }

    return area * 0.5;
};


P2Convex.prototype.inertia = function () {
    var v1 = new Vec2,
        v2 = new Vec2;

    return function (mass) {
        var localPosition = this.localPosition,
            vertices = this.vertices,
            len = vertices.length,
            v1x, v1y, v2x, v2y, a = 0,
            b = 0,
            sum1 = 0,
            sum2 = 0,
            i = len;

        while (i--) {
            v1.vadd(localPosition, vertices[i]);
            v2.vadd(localPosition, vertices[(i + 1) % len]);

            v1x = v1.x;
            v1y = v1.y;
            v2x = v2.x;
            v2y = v2.y;

            a = v2x * v1y - v2y * v1x;
            b = (v1x * v1x + v1y * v1y) + (v1x * v2x + v1y * v2y) + (v2x * v2x + v2y * v2y);

            sum1 += a * b;
            sum2 += a;
        }

        return (mass * sum1) / (6 * sum2);
    };
}();


P2Convex.prototype.update = function (matrix) {
    var localMatrix = this.matrix,
        matrixWorld = this.matrixWorld,
        localPos = this.localPosition,

        vertices = this.vertices,
        normals = this.normals,
        pos = this.position,

        aabb = this.aabb,
        min = aabb.min,
        max = aabb.max,
        minx = Infinity,
        miny = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,

        wnorms = this._normals,
        wnorm, wverts = this._vertices,
        wvert, x, y,
        i = vertices.length;

    localMatrix.setRotation(this.localRotation);
    localMatrix.setPosition(localPos);
    matrixWorld.mmul(matrix, localMatrix);

    pos.x = localPos.x;
    pos.y = localPos.y;
    pos.transformMat32(matrix);

    while (i--) {
        wvert = wverts[i] || (wverts[i] = new Vec2);
        wnorm = wnorms[i] || (wnorms[i] = new Vec2);

        wnorm.copy(normals[i]).transformMat2(matrixWorld);
        wvert.copy(vertices[i]).transformMat32(matrixWorld);
        x = wvert.x;
        y = wvert.y;

        minx = x < minx ? x : minx;
        miny = y < miny ? y : miny;

        maxx = x > maxx ? x : maxx;
        maxy = y > maxy ? y : maxy;
    }

    min.x = minx;
    min.y = miny;
    max.x = maxx;
    max.y = maxy;
};


P2Convex.prototype.toJSON = function (json) {
    json = P2Shape.prototype.toJSON.call(this, json);
    var vertices = this.vertices,
        normals = this.normals,
        jsonVertices = json.vertices || (json.vertices = []),
        jsonNormals = json.normals || (json.normals = []),
        i;

    i = vertices.length;
    while (i--) jsonVertices[i] = vertices[i].toJSON(jsonVertices[i]);

    i = normals.length;
    while (i--) jsonNormals[i] = normals[i].toJSON(jsonNormals[i]);

    return json;
};


P2Convex.prototype.fromJSON = function (json) {
    P2Shape.prototype.fromJSON.call(this, json);
    var vertices = this.vertices,
        normals = this.normals,
        jsonVertices = json.vertices,
        jsonNormals = json.normals,
        verticesLength = jsonVertices.length,
        normalsLength = jsonNormals.length,
        i;

    vertices.length = this._vertices.length = verticesLength;
    normals.length = this._normals.length = normalsLength;

    i = verticesLength;
    while (i--) vertices[i] = (vertices[i] || new Vec2()).fromJSON(jsonVertices[i]);

    i = normalsLength;
    while (i--) normals[i] = (normals[i] || new Vec2()).fromJSON(jsonNormals[i]);

    return this;
};


P2Convex.validateVertices = P2Convex.prototype.validateVertices = function (vertices) {
    var len = vertices.length,
        a, b, bx, by, c, abx, aby, bcx, bcy,
        i;

    for (i = 0; i < len; i++) {
        a = vertices[i];
        b = vertices[(i + 1) % len];
        bx = b.x;
        by = b.y;
        c = vertices[(i + 2) % len];

        abx = bx - a.x;
        aby = by - a.y;
        bcx = c.x - bx;
        bcy = c.y - by;

        if ((bcx * aby - bcy * abx) > 0) return false;
    }

    return true;
};


P2Convex.createConvexHull = P2Convex.prototype.createConvexHull = function () {
    var hull = [],
        r = new Vec2;

    return function (points) {
        var rmi = 0,
            rmx = -Infinity,
            n = points.length,
            v, vx, vy,
            ih, ie, m = 0,
            c, newPoints = [],
            failed = false,
            i;

        for (i = n; i--;) {
            v = points[i];
            vx = v.x;
            vy = v.y;

            if (vx > rmx || (vx == rmx && vy < points[rmi].y)) {
                rmi = i;
                rmx = vx;
            }
        }

        hull.length = 0;
        ih = rmi;

        while (true) {
            hull[m] = ih;

            ie = 0;
            for (i = 1; i < n; i++) {
                if (ie === ih) {
                    ie = i;
                    continue;
                }

                r.vsub(points[ie], points[hull[m]]);
                v.vsub(points[i], points[hull[m]]);
                c = v.cross(r);

                if (c < 0) ie = i;

                if (c === 0 && v.lenSq() > r.lenSq()) {
                    ie = i;
                }
            }

            m++;
            ih = ie;

            if (m > n) {
                failed = true;
                break;
            }
            if (ie === rmi) break;
        }

        if (failed) {
            Log.warn("P2Convex.constructor: gift wrapping algorithm failed");
            return [
                new Vec2(0.5, 0.5),
                new Vec2(-0.5, 0.5),
                new Vec2(-0.5, -0.5),
                new Vec2(0.5, -0.5)
            ];
        }

        for (i = m; i--;) {
            newPoints.push(points[hull[i]]);
        }

        if (!P2Convex.validateVertices(newPoints)) {
            Log.warn("P2Convex.constructor: gift wrapping algorithm failed");
            return [
                new Vec2(0.5, 0.5),
                new Vec2(-0.5, 0.5),
                new Vec2(-0.5, -0.5),
                new Vec2(0.5, -0.5)
            ];
        }

        return newPoints;
    };
}();


module.exports = P2Convex;

},{"../../base/log":14,"../../math/vec2":111,"../p2enums":128,"./p2shape":127}],124:[function(require,module,exports){
var Vec2 = require("../../math/vec2");
var P2Convex = require("./p2convex");
"use strict";


function P2Rect(opts) {
    opts || (opts = {});

    var extents = opts.extents || new Vec2(0.5, 0.5),
        x = extents.x,
        y = extents.y;

    opts.vertices = [
        new Vec2(x, y),
        new Vec2(-x, y),
        new Vec2(-x, -y),
        new Vec2(x, -y)
    ];

    P2Convex.call(this, opts);

    this.extents = extents;
}

P2Convex.extend(P2Rect);


P2Rect.prototype.toJSON = function (json) {
    json = P2Convex.prototype.toJSON.call(this, json);

    json.extents = this.extents.toJSON(json.extents);

    return json;
};


P2Rect.prototype.fromJSON = function (json) {
    P2Convex.prototype.fromJSON.call(this, json);

    this.extents.fromJSON(json.extents);

    return this;
};


module.exports = P2Rect;

},{"../../math/vec2":111,"./p2convex":123}],125:[function(require,module,exports){
var Class = require("../../base/class");
var AABB2 = require("../../math/aabb2");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Log = require("../../base/log");
var P2Enums = require("../p2enums");
"use strict";


var TWO_PI = Math.PI * 2,
    pow = Math.pow,

    BodyType = P2Enums.BodyType,
    MotionState = P2Enums.MotionState,
    SleepState = P2Enums.SleepState;


function P2Rigidbody(opts) {
    opts || (opts = {});

    Class.call(this, opts);

    this.type = BodyType.RigidBody;
    this._index = -1;

    this.space = undefined;

    this.position = opts.position != undefined ? opts.position : new Vec2;
    this.velocity = opts.velocity != undefined ? opts.velocity : new Vec2;
    this.force = new Vec2;

    this.rotation = opts.rotation != undefined ? opts.rotation : 0;
    this.angularVelocity = opts.angularVelocity != undefined ? opts.angularVelocity : 0;
    this.torque = 0;

    this.linearDamping = opts.linearDamping != undefined ? opts.linearDamping : 0.01;
    this.angularDamping = opts.angularDamping != undefined ? opts.angularDamping : TWO_PI * 0.01;

    this.matrix = new Mat32();
    this.aabb = new AABB2;

    this.mass = opts.mass != undefined ? opts.mass : 0.0;
    this.invMass = this.mass > 0.0 ? 1.0 / this.mass : 0.0;

    this.inertia = 0;
    this.invInertia = 0;

    this.shapes = [];

    this.motionState = opts.motionState != undefined ? opts.motionState : MotionState.Static;

    this.allowSleep = opts.allowSleep != undefined ? !!opts.allowSleep : true;
    this.sleepState = SleepState.Awake;

    this.sleepVelocityLimit = opts.sleepVelocityLimit != undefined ? !!opts.sleepVelocityLimit : 0.01;
    this.sleepTimeLimit = opts.sleepTimeLimit != undefined ? !!opts.sleepTimeLimit : 1.0;
    this.sleepAngularVelocityLimit = opts.sleepAngularVelocityLimit != undefined ? !!opts.sleepAngularVelocityLimit : TWO_PI * 0.01;

    this.userData = undefined;

    this._sleepTime = 0.0;
    this._lastSleepyTime = 0.0;

    this.vlambda = new Vec2;
    this.wlambda = 0;

    if (opts.shape) this.addShape(opts.shape);
    if (opts.shapes) this.addShapes.apply(this, opts.shapes);
}

Class.extend(P2Rigidbody);


P2Rigidbody.prototype.copy = function (other) {
    var shapes = other.shapes,
        i = shapes.length;

    this.clear();

    this.motionState = other.motionState;

    this.position.copy(other.position);
    this.velocity.copy(other.velocity);
    this.force.copy(other.force);

    this.linearDamping = other.linearDamping;

    this.mass = other.mass;
    this.invMass = other.invMass;

    this.allowSleep = other.allowSleep;
    this.sleepState = other.sleepState;

    this.rotation = other.rotation;
    this.angularVelocity = other.angularVelocity;
    this.torque = other.torque;

    this.angularDamping = other.angularDamping;

    while (i--) this.addShape(shapes[i].clone());

    return this;
};


var VEC2_SCALE = new Vec2(1.0, 1.0);
P2Rigidbody.prototype.init = function () {
    var shapes = this.shapes,
        matrix = this.matrix,
        aabb = this.aabb,
        shape,
        i = shapes.length;

    matrix.compose(this.position, VEC2_SCALE, this.rotation);
    aabb.clear();

    while (i--) {
        shape = shapes[i];
        shape.update(matrix);
        aabb.union(shape.aabb);
    }

    this.resetMassData();
};


P2Rigidbody.prototype.update = function (dt) {
    if (this.motionState === MotionState.Static) return;
    var shapes = this.shapes,
        force = this.force,
        invMass = this.invMass,
        pos = this.position,
        vel = this.velocity,
        linearDamping = pow(1 - this.linearDamping, dt),
        matrix = this.matrix,
        aabb = this.aabb,
        shape,
        i;

    vel.x += force.x * invMass * dt;
    vel.y += force.y * invMass * dt;
    this.angularVelocity += this.torque * this.invInertia * dt;

    force.x = force.y = this.torque = 0;

    vel.x *= linearDamping;
    vel.y *= linearDamping;

    this.angularVelocity *= pow(1 - this.angularDamping, dt);

    if (this.sleepState !== SleepState.Sleeping) {

        pos.x += vel.x * dt;
        pos.y += vel.y * dt;

        this.rotation += this.angularVelocity * dt;

        matrix.compose(pos, VEC2_SCALE, this.rotation);
        aabb.clear();

        i = shapes.length;
        while (i--) {
            shape = shapes[i];
            shape.update(matrix);
            aabb.union(shape.aabb);
        }
    }
};


P2Rigidbody.prototype.clear = function () {
    var shapes = this.shapes,
        i = shapes.length;

    while (i--) this.removeShape(shapes[i]);

    return this;
};


P2Rigidbody.prototype.applyForce = function (force, worldPoint) {
    if (this.motionState === MotionState.Static) return;
    if (this.sleepState === SleepState.Sleeping) this.wake();
    var pos = this.position,
        f = this.force,
        fx = force.x,
        fy = force.y,
        px, py;

    worldPoint = worldPoint || pos;

    px = worldPoint.x - pos.x;
    py = worldPoint.y - pos.y;

    f.x += fx;
    f.y += fy;

    this.torque += px * fy - py * fx;
};


P2Rigidbody.prototype.applyTorque = function (torque) {
    if (this.motionState === MotionState.Static) return;
    if (this.sleepState === SleepState.Sleeping) this.wake();

    this.torque += torque;
};


P2Rigidbody.prototype.applyImpulse = function (impulse, worldPoint) {
    if (this.motionState === MotionState.Static) return;
    if (this.sleepState === SleepState.Sleeping) this.wake();
    var pos = this.position,
        invMass = this.invMass,
        velocity = this.velocity,
        ix = impulse.x,
        iy = impulse.y,
        px, py;

    worldPoint = worldPoint || pos;

    px = worldPoint.x - pos.x;
    py = worldPoint.y - pos.y;

    velocity.x += ix * invMass;
    velocity.y += iy * invMass;

    this.angularVelocity += (px * iy - py * ix) * this.invInertia;
};


P2Rigidbody.prototype.applyVelocity = function (velocity) {
    if (this.motionState === MotionState.Static) return;
    if (this.sleepState === SleepState.Sleeping) this.wake();
    var vel = this.velocity;

    vel.x += velocity.x;
    vel.y += velocity.y;
};


P2Rigidbody.prototype.applyAngularVelocity = function (angularVelocity) {
    if (this.motionState === MotionState.Static) return;
    if (this.sleepState === SleepState.Sleeping) this.wake();

    this.angularVelocity += angularVelocity;
};


var totalCentroid = new Vec2,
    centroid = new Vec2;
P2Rigidbody.prototype.resetMassData = function () {
    if (this.motionState !== MotionState.Dynamic) return;
    var shapes = this.shapes,
        shape,
        totalMass = 0,
        totalInertia = 0,
        mass, inertia,
        i;

    totalCentroid.x = totalCentroid.y = 0;

    i = shapes.length;
    while (i--) {
        shape = shapes[i];

        shape.centroid(centroid);
        mass = shape.area() * shape.density;
        inertia = shape.inertia(mass);

        totalCentroid.add(centroid.smul(mass));
        totalMass += mass;
        totalInertia += inertia;
    }

    centroid.copy(totalCentroid.sdiv(totalMass));

    this.setMass(totalMass);
    this.setInertia(totalInertia - totalMass * centroid.lengthSq());
};


P2Rigidbody.prototype.setMotionState = function (motionState) {
    if (this.motionState === motionState) return;

    this.motionState = motionState;

    this.velocity.set(0, 0);
    this.force.set(0, 0);
    this.angularVelocity = this.torque = 0;

    this.wake();
};


P2Rigidbody.prototype.setInertia = function (inertia) {

    this.inertia = inertia;
    this.invInertia = inertia > 0.0 ? 1.0 / inertia : 0.0;
};


P2Rigidbody.prototype.setMass = function (mass) {

    this.mass = mass;
    this.invMass = mass > 0.0 ? 1.0 / mass : 0.0;
};


P2Rigidbody.prototype.isAwake = function () {

    return this.sleepState === SleepState.Awake;
};


P2Rigidbody.prototype.isSleepy = function () {

    return this.sleepState === SleepState.Sleepy;
};


P2Rigidbody.prototype.isSleeping = function () {

    return this.sleepState === SleepState.Sleeping;
};


P2Rigidbody.prototype.isStatic = function () {

    return this.motionState === MotionState.Static;
};


P2Rigidbody.prototype.isDynamic = function () {

    return this.motionState === MotionState.Dynamic;
};


P2Rigidbody.prototype.isKinematic = function () {

    return this.motionState === MotionState.Kinematic;
};


P2Rigidbody.prototype.wake = function () {

    if (this.sleepState === SleepState.Sleeping) this.emit("wake");
    this.sleepState = SleepState.Awake;
};


P2Rigidbody.prototype.sleep = function () {

    if (this.sleepState !== SleepState.Sleeping) this.emit("sleep");
    this.sleepState = SleepState.Sleeping;
};


P2Rigidbody.prototype.addShape = function (shape) {
    var shapes = this.shapes,
        index = shapes.indexOf(shape);

    if (index === -1) {
        shape.body = this;

        shapes.push(shape);

        if (this.space) {
            shape.update(this.matrix);
            this.resetMassData();
        }
    } else {
        Log.error("P2Rigidbody.addShape: Shape already attached to Body");
    }

    return this;
};


P2Rigidbody.prototype.addShapes = function () {

    for (var i = arguments.length; i--;) this.addShape(arguments[i]);
    return this;
};


P2Rigidbody.prototype.removeShape = function (shape) {
    var shapes = this.shapes,
        index = shapes.indexOf(shape);

    if (index !== -1) {
        shape.body = undefined;

        shapes.splice(index, 1);

        if (this.space) this.resetMassData();
    } else {
        Log.error("P2Rigidbody.removeShape: Shape not attached to Body");
    }

    return this;
};


P2Rigidbody.prototype.removeShapes = function () {

    for (var i = arguments.length; i--;) this.removeShape(arguments[i]);
    return this;
};


P2Rigidbody.prototype.forEachShape = function (fn, ctx) {
    var shapes = this.shapes,
        i = shapes.length;

    if (ctx) {
        while (i--) {
            if (fn.call(ctx, shapes[i], i, shapes) === false) break;
        }
    } else {
        while (i--) {
            if (fn(shapes[i], i, shapes) === false) break;
        }
    }

    return this;
};


P2Rigidbody.prototype.sleepTick = function (time) {

    if (this.allowSleep) {
        var sleepState = this.sleepState,
            velSq = this.velocity.lengthSq(),
            sleepVelocityLimit = this.sleepVelocityLimit * this.sleepVelocityLimit,
            aVel = this.angularVelocity,
            sleepAngularVelocityLimit = this.sleepAngularVelocityLimit;

        if (sleepState === SleepState.Awake && (velSq < sleepVelocityLimit && aVel < sleepAngularVelocityLimit)) {
            this.sleepState = SleepState.Sleepy;
            this._sleepTime = time;
        } else if (sleepState === SleepState.Sleepy && (velSq > sleepVelocityLimit || aVel > sleepAngularVelocityLimit)) {
            this.wake();
        } else if (sleepState === SleepState.Sleepy && (time - this._lastSleepyTime) > this.sleepTimeLimit) {
            this.sleep();
        }
    }
};


P2Rigidbody.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var shapes = this.shapes,
        jsonShapes = json.shapes || (json.shapes = []),
        i = shapes.length;

    json.position = this.position.toJSON(json.position);
    json.velocity = this.velocity.toJSON(json.velocity);
    json.force = this.force.toJSON(json.force);

    json.rotation = this.rotation;
    json.angularVelocity = this.angularVelocity;
    json.torque = this.torque;

    json.motionState = this.motionState;

    json.linearDamping = this.linearDamping;

    json.mass = this.mass;
    json.invMass = this.invMass;

    json.allowSleep = this.allowSleep;
    json.sleepState = this.sleepState;

    json.angularDamping = this.angularDamping;

    while (i--) jsonShapes[i] = shapes[i].toJSON(jsonShapes[i]);

    return json;
};


P2Rigidbody.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var jsonShapes = json.shapes || (json.shapes = []),
        i = jsonShapes.length;

    this.position.fromJSON(json.position);
    this.velocity.fromJSON(json.velocity);
    this.force.fromJSON(json.force);

    this.rotation = json.rotation;
    this.angularVelocity = json.angularVelocity;
    this.torque = json.torque;

    this.motionState = json.motionState;

    this.linearDamping = json.linearDamping;

    this.mass = json.mass;
    this.invMass = json.invMass;

    this.allowSleep = json.allowSleep;
    this.sleepState = json.sleepState;

    this.angularDamping = json.angularDamping;

    while (i--) this.addShape(Class.fromJSON(jsonShapes[i]));

    return this;
};


module.exports = P2Rigidbody;

},{"../../base/class":8,"../../base/log":14,"../../math/aabb2":100,"../../math/mat32":105,"../../math/vec2":111,"../p2enums":128}],126:[function(require,module,exports){
var Class = require("../../base/class");
var Vec2 = require("../../math/vec2");
var P2Enums = require("../p2enums");
var P2Shape = require("./p2shape");
"use strict";


var ShapeType = P2Enums.ShapeType,

    abs = Math.abs,
    sqrt = Math.sqrt,
    PI = Math.PI;


function P2Segment(opts) {
    opts || (opts = {});

    P2Shape.call(this, opts);

    this.type = ShapeType.Segment;

    this.a = opts.a != undefined ? opts.a : new Vec2(-0.5, 0.0);
    this.b = opts.b != undefined ? opts.b : new Vec2(0.5, 0.0);

    this._a = this.a.clone();
    this._b = this.b.clone();
    this._normal = new Vec2().vsub(this._b, this._a).perp().normalize();

    this.radius = opts.radius != undefined ? abs(opts.radius) : 0.5;
}

P2Shape.extend(P2Segment);


P2Segment.prototype.copy = function (other) {
    P2Shape.prototype.copy.call(this, other);

    this.a.copy(other.a);
    this.b.copy(other.b);

    this.radius = other.radius;

    return this;
};


P2Segment.prototype.pointQuery = function (p) {
    if (!this.aabb.contains(p)) return false;
    var r = this.radius,
        a = this._a,
        b = this._b,
        n = this._normal,
        ax = a.x,
        ay = a.y,
        bx = b.x,
        by = b.y,
        nx = n.x,
        ny = n.y,
        px = p.x,
        py = p.y,

        dn = (nx * px + ny * py) - (ax * nx + ay * ny),
        dist = abs(dn),
        dt, dta, dtb, dx, dy;

    if (dist > r) return false;

    dt = px * ny - py * nx;
    dta = ax * ny - ay * nx;
    dtb = bx * ny - by * nx;

    if (dt <= dta) {
        if (dt < dta - r) return false;

        dx = px - ax;
        dy = py - ay;

        return (dx * dx + dy * dy) < (r * r);
    } else if (dt > dtb) {
        if (dt > dtb + r) return false;

        dx = px - bx;
        dy = py - by;

        return (dx * dx + dy * dy) < (r * r);
    }

    return true;
};


P2Segment.prototype.centroid = function (v) {
    var localPosition = this.localPosition,
        a = this.a,
        b = this.b;

    v.x = localPosition.x + (a.x + b.x) * 0.5;
    v.y = localPosition.y + (a.y + b.y) * 0.5;

    return v;
};


P2Segment.prototype.area = function () {
    var a = this.a,
        b = this.b,
        r = this.radius,
        abx = b.x - a.x,
        aby = b.y - a.y,
        l = abx * abx + aby * aby;

    l = l === 0.0 ? 0.0 : sqrt(l);

    return r * (PI * r + 2 * l);
};


var inv12 = 1.0 / 12.0;
P2Segment.prototype.inertia = function (mass) {
    var localPosition = this.localPosition,
        lx = localPosition.x,
        ly = localPosition.y,
        a = this.a,
        b = this.b,
        ax = lx + a.x,
        ay = ly + a.y,
        bx = lx + b.x,
        by = ly + b.y,
        abx = bx - ax,
        aby = by - ay,
        lsq = abx * abx + aby * aby,
        x = (ax + bx) * 0.5,
        y = (ay + by) * 0.5;

    return mass * (lsq * inv12 + (x * x + y * y));
};


var VEC2_SCALE = new Vec2(1.0, 1.0);
P2Segment.prototype.update = function (matrix) {
    var localMatrix = this.matrix,
        matrixWorld = this.matrixWorld,
        localPos = this.localPosition,
        pos = this.position,
        _a = this._a,
        _b = this._b,
        _normal = this._normal,
        a = this.a,
        b = this.b,
        radius = this.radius,
        aabb = this.aabb,
        min = aabb.min,
        max = aabb.max,
        l, r, b, t;

    localMatrix.compose(localPos, VEC2_SCALE, this.localRotation);
    matrixWorld.mmul(matrix, localMatrix);

    pos.x = localPos.x;
    pos.y = localPos.y;
    pos.transformMat32(matrix);

    _a.x = a.x;
    _a.y = a.y;
    _a.transformMat32(matrix);

    _b.x = b.x;
    _b.y = b.y;
    _b.transformMat32(matrix);

    _normal.x = -(_b.y - _a.y);
    _normal.y = _b.x - _a.x;
    _normal.normalize();

    if (_a.x < _b.x) {
        l = _a.x;
        r = _b.x;
    } else {
        l = _b.x;
        r = _a.x;
    }

    if (_a.y < _b.y) {
        b = _a.y;
        t = _b.y;
    } else {
        b = _b.y;
        t = _a.y;
    }

    min.x = l - radius;
    min.y = b - radius;
    max.x = r + radius;
    max.y = t + radius;
};


P2Segment.prototype.toJSON = function (json) {
    json = P2Shape.prototype.toJSON.call(this, json);

    json.a = this.a.toJSON(json.a);
    json.b = this.b.toJSON(json.b);

    json.radius = this.radius;

    return json;
};


P2Segment.prototype.fromJSON = function (json) {
    P2Shape.prototype.fromJSON.call(this, json);

    this.a.fromJSON(json.a);
    this.b.fromJSON(json.b);

    this.radius = json.radius;

    return this;
};


module.exports = P2Segment;

},{"../../base/class":8,"../../math/vec2":111,"../p2enums":128,"./p2shape":127}],127:[function(require,module,exports){
var Class = require("../../base/class");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var AABB2 = require("../../math/aabb2");
"use strict";


function P2Shape(opts) {
    opts || (opts = {});

    Class.call(this);

    this.type = -1;

    this.body = undefined;

    this.density = opts.density != undefined ? opts.density : 1;

    this.localPosition = opts.position != undefined ? opts.position : new Vec2;
    this.localRotation = opts.rotation != undefined ? opts.rotation : 0;

    this.position = new Vec2;
    this.rotation = 0;

    this.matrix = new Mat32;
    this.matrixWorld = new Mat32;

    this.friction = opts.friction != undefined ? opts.friction : 0.5;
    this.elasticity = opts.elasticity != undefined ? opts.elasticity : 0.25;

    this.isTrigger = opts.isTrigger != undefined ? !!opts.isTrigger : false;

    this.filterMask = opts.filterMask != undefined ? opts.filterMask : 1;
    this.filterGroup = opts.filterGroup != undefined ? opts.filterGroup : 1;

    this.aabb = new AABB2;
}

Class.extend(P2Shape);


P2Shape.prototype.copy = function (other) {

    this.density = other.density;

    this.localPosition.copy(other.localPosition);
    this.localRotation = other.localRotation;

    this.friction = other.friction;
    this.elasticity = other.elasticity;

    this.isTrigger = other.isTrigger;

    this.filterMask = other.filterMask;
    this.filterGroup = other.filterGroup;

    return this;
};


P2Shape.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.density = this.density;

    json.localPosition = this.localPosition.toJSON(json.localPosition);
    json.localRotation = this.localRotation;

    json.friction = this.friction;
    json.elasticity = this.elasticity;

    json.isTrigger = this.isTrigger;

    json.filterMask = this.filterMask;
    json.filterGroup = this.filterGroup;

    return json;
};


P2Shape.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.density = json.density;

    this.localPosition.fromJSON(json.localPosition);
    this.localRotation = json.localRotation;

    this.friction = json.friction;
    this.elasticity = json.elasticity;

    this.isTrigger = json.isTrigger;

    this.filterMask = json.filterMask;
    this.filterGroup = json.filterGroup;

    return this;
};


module.exports = P2Shape;

},{"../../base/class":8,"../../math/aabb2":100,"../../math/mat32":105,"../../math/vec2":111}],128:[function(require,module,exports){
var Enum = require("../base/enum");
"use strict";


module.exports = {
    BodyType: new Enum("Particle RigidBody"),
    ShapeType: new Enum("Convex Circle Segment"),
    MotionState: new Enum("Dynamic Static Kinematic"),
    SleepState: new Enum("Awake Sleepy Sleeping")
};

},{"../base/enum":12}],129:[function(require,module,exports){
var Mathf = require("../math/mathf");
"use strict";


var clamp = Mathf.clamp;

/**
 * @class P2Solver
 * @brief World Solver
 * @param Object opts sets Class properties from passed Object
 */
function P2Solver(opts) {
    opts || (opts = {});

    /**
     * @property Number iterations
     * @brief max number of iterations
     * @memberof P2Solver
     */
    this.iterations = opts.iterations != undefined ? opts.iterations : 10;

    /**
     * @property Number tolerance
     * @memberof P2Solver
     */
    this.tolerance = opts.tolerance != undefined ? opts.tolerance : 1e-6;
}

/**
 * @method solve
 * @memberof P2Solver
 * @brief solves all equations
 * @param Number h
 * @param Array equations
 */
P2Solver.prototype.solve = function (h, equations) {
    var num = equations.length,
        eq, bi, bj,
        vlambdai, vlambdaj, vi, vj,
        iterations = this.iterations,
        iter = 0,
        toleranceSq = this.tolerance * this.tolerance,
        GWlambda, lambda, deltaLambda, deltaLambdaTotal,
        i, j;

    if (num > -1) {

        i = num;
        while (i--) {
            eq = equations[i];

            eq.updateConstants(h);
            eq.init(h);
        }

        i = iterations;
        while (i--) {

            iter++;
            deltaLambdaTotal = 0;

            j = num;
            while (j--) {
                eq = equations[j];

                GWlambda = eq.calculateGWlambda();
                lambda = eq.lambda;
                deltaLambda = eq.invC * (eq.B - GWlambda - eq.epsilon * lambda);

                eq.lambda = clamp(lambda + deltaLambda, eq.minForce, eq.maxForce);
                deltaLambda = eq.lambda - lambda;

                eq.addToLambda(deltaLambda);
                deltaLambdaTotal += deltaLambda;
            }

            if (deltaLambdaTotal * deltaLambdaTotal < toleranceSq) break;
        }

        i = num;
        while (i--) {
            eq = equations[i];

            bi = eq.bi;
            vi = bi.velocity;
            vlambdai = bi.vlambda;
            bj = eq.bj;
            vj = bj.velocity;
            vlambdaj = bj.vlambda;

            vi.x += vlambdai.x;
            vi.y += vlambdai.y;

            vj.x += vlambdaj.x;
            vj.y += vlambdaj.y;

            vlambdai.x = vlambdai.y = vlambdaj.x = vlambdaj.y = 0;

            if (bi.wlambda != undefined) {
                bi.angularVelocity += bi.wlambda;
                bi.wlambda = 0;
            }
            if (bj.wlambda != undefined) {
                bj.angularVelocity += bj.wlambda;
                bj.wlambda = 0;
            }
        }
    }

    return iter;
};


module.exports = P2Solver;
},{"../math/mathf":107}],130:[function(require,module,exports){
var Class = require("../base/class");
var Time = require("../base/time");
var ObjectPool = require("../base/object_pool");
var Vec2 = require("../math/vec2");
var P2Enums = require("./p2enums");
var P2Solver = require("./p2solver");
var P2Broadphase = require("./collision/p2broadphase");
var P2Nearphase = require("./collision/p2nearphase");
var P2Friction = require("./constraints/p2friction");
var Log = require("../base/log");
"use strict";


var now = Time.now,
    MotionState = P2Enums.MotionState,

    FRICTION_POOL = new ObjectPool(P2Friction);


function P2Space(opts) {
    opts || (opts = {});

    Class.call(this, opts);

    this.useGravity = opts.useGravity != undefined ? !!opts.useGravity : true;
    this.gravity = opts.gravity != undefined ? opts.gravity : new Vec2(0.0, -9.801);

    this.time = 0.0;

    this.broadphase = new P2Space.DefaultBroadPhase(opts.broadphase);
    this.nearphase = new P2Space.DefaultNearPhase(opts.nearphase);

    this.solver = new P2Space.DefaultSolver(opts.solver);

    this.bodies = [];
    this._bodyHash = {};

    this._pairsi = [];
    this._pairsj = [];

    this.contacts = [];
    this.frictions = [];
    this.constraints = [];

    this._collisionMatrix = [];
    this._collisionMatrixPrevious = [];

    this.stats = {
        step: 0.0,
        solve: 0.0,
        integrate: 0.0,
        nearphase: 0.0,
        broadphase: 0.0
    };
}

Class.extend(P2Space);


P2Space.DefaultBroadPhase = P2Broadphase;
P2Space.DefaultNearPhase = P2Nearphase;
P2Space.DefaultSolver = P2Solver;
P2Space.FRICTION_POOL = FRICTION_POOL;


P2Space.prototype.collisionMatrixGet = function (i, j, current) {
    var tmp = j;

    if (j > i) {
        j = i;
        i = tmp;
    }
    i = (i * (i + 1) >> 1) + j - 1;

    return (current === undefined || current) ? this._collisionMatrix[i] : this._collisionMatrixPrevious[i];
};


P2Space.prototype.collisionMatrixSet = function (i, j, value, current) {
    var tmp = j;

    if (j > i) {
        j = i;
        i = tmp;
    }

    i = (i * (i + 1) >> 1) + j - 1;

    if (current == undefined || current) {
        this._collisionMatrix[i] = value;
    } else {
        this._collisionMatrixPrevious[i] = value;
    }
};


P2Space.prototype.collisionMatrixTick = function () {
    var collisionMatrix = this._collisionMatrixPrevious,
        i;

    this._collisionMatrixPrevious = this._collisionMatrix;
    this._collisionMatrix = collisionMatrix;

    i = collisionMatrix.length;
    while (i--) collisionMatrix[i] = 0;
};


P2Space.prototype.clear = function () {
    var bodies = this.bodies,
        i = bodies.length;

    while (i--) this.removeBody(bodies[i]);

    return this;
};


P2Space.prototype.addBody = function (body) {
    var bodies = this.bodies,
        index = bodies.indexOf(body);

    if (index === -1) {
        bodies.push(body);
        this._bodyHash[body._id] = body;

        body.space = this;
        body._index = bodies.length - 1;

        body.init();
    } else {
        Log.error("P2Space.addBody: Body already member of P2Space");
    }

    return this;
};


P2Space.prototype.addBodies = function () {
    var i = arguments.length;

    while (i--) this.addBody(arguments[i]);
    return this;
};


P2Space.prototype.removeBody = function (body) {
    var bodies = this.bodies,
        index = bodies.indexOf(body);

    if (index !== -1) {
        body.space = undefined;
        body._index = -1;

        bodies.splice(index, 1);
        this._bodyHash[body._id] = undefined;
    } else {
        Log.error("P2Space.addBody: Body not member of P2Space");
    }

    return this;
};


P2Space.prototype.removeBodies = function () {
    var i = arguments.length;

    while (i--) this.removeBody(arguments[i]);
    return this;
};


P2Space.prototype.addConstraint = function (constraint) {
    var constraints = this.constraints,
        index = constraints.indexOf(constraint);

    if (index === -1) {
        constraints.push(constraint);
    } else {
        Log.error("P2Space.addConstraint: Constraint already member of P2Space");
    }

    return this;
};


P2Space.prototype.removeConstraint = function (constraint) {
    var constraints = this.constraints,
        index = constraints.indexOf(constraint);

    if (index !== -1) {
        constraints.splice(index, 1);
    } else {
        Log.error("P2Space.removeConstraint: Constraint not a member of P2Space");
    }

    return this;
};


P2Space.prototype.findBodyByPoint = function (p) {
    var bodies = this.bodies,
        body, shapes, shape,
        i = bodies.length,
        j;

    while (i--) {
        body = bodies[i];
        if (!body) continue;

        shapes = body.shapes;
        j = shapes.length;
        while (j--) {
            shape = shapes[j];
            if (!shape) continue;

            if (shape.pointQuery(p)) return body;
        }
    }

    return undefined;
};


P2Space.prototype.findBodyById = function (id) {

    return this._bodyHash[id];
};


P2Space.prototype.step = function (dt) {
    var stepStart = now(),
        stats = this.stats,
        g = this.gravity,
        gx = g.x,
        gy = g.y,
        bodies = this.bodies,
        numBodies = bodies.length,
        solver = this.solver,
        constraints = this.constraints,
        pairsi = this._pairsi,
        pairsj = this._pairsj,
        contacts = this.contacts,
        frictions = this.frictions,
        constraint, time, start, body, force, mass,
        bi, bj, c, cp, cn, u, slipForce, fc, fcp, fct,
        i;

    time = this.time += dt;

    if (this.useGravity) {
        i = numBodies;
        while (i--) {
            body = bodies[i];

            if (body.motionState === MotionState.Dynamic) {
                force = body.force;
                mass = body.mass;

                force.x += gx * mass;
                force.y += gy * mass;
            }
        }
    }

    this.collisionMatrixTick();

    start = now();
    this.broadphase.collisions(bodies, pairsi, pairsj);
    stats.broadphase = now() - start;

    start = now();
    this.nearphase.collisions(pairsi, pairsj, contacts);
    stats.nearphase = now() - start;

    start = now();
    solver.solve(dt, contacts);

    FRICTION_POOL.clear();
    frictions.length = 0;

    i = contacts.length;
    while (i--) {
        c = contacts[i];

        if (c.u > 0.0) {
            bi = c.bi;
            bj = c.bj;
            fc = FRICTION_POOL.create();
            u = c.u;

            slipForce = u * c.lambda;
            fc.minForce = -slipForce;
            fc.maxForce = slipForce;

            fc.bi = bi;
            fc.bj = bj;

            cp = c.p;
            fcp = fc.p;

            fcp.x = cp.x;
            fcp.y = cp.y;

            cn = c.n;
            fct = fc.t;

            fct.x = -cn.y;
            fct.y = cn.x;

            frictions.push(fc);
        }
    }

    solver.solve(dt, frictions);

    i = constraints.length;
    while (i--) {
        constraint = constraints[i];
        constraint.update();
        solver.solve(dt, constraint.equations);
    }
    stats.solve = now() - start;

    start = now();
    i = numBodies;
    while (i--) {
        body = bodies[i];
        if (!body) continue;

        body.update(dt);
        body.sleepTick(time);
    }
    stats.integrate = now() - start;

    stats.step = now() - stepStart;
};


P2Space.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.useGravity = this.useGravity;
    json.gravity = this.gravity.toJSON(json.gravity);
    json.broadphase = this.broadphase.toJSON(json.broadphase);

    return json;
};


P2Space.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.useGravity = json.useGravity;
    this.gravity.fromJSON(json.gravity);
    this.broadphase.fromJSON(json.broadphase);

    return this;
};


module.exports = P2Space;

},{"../base/class":8,"../base/log":14,"../base/object_pool":15,"../base/time":18,"../math/vec2":111,"./collision/p2broadphase":114,"./collision/p2nearphase":116,"./constraints/p2friction":121,"./p2enums":128,"./p2solver":129}],131:[function(require,module,exports){
"use strict";


function Phys2D() {

    this.P2Broadphase = require("./collision/p2broadphase");
    this.P2BroadphaseSpatialHash = require("./collision/p2broadphase_spatialhash");
    this.P2Nearphase = require("./collision/p2nearphase");

    this.P2Circle = require("./objects/p2circle");
    this.P2Convex = require("./objects/p2convex");
    this.P2Rect = require("./objects/p2rect");
    this.P2Rigidbody = require("./objects/p2rigidbody");
    this.P2Segment = require("./objects/p2segment");
    this.P2Shape = require("./objects/p2shape");

    this.P2Constraint = require("./constraints/p2constraint");
    this.P2DistanceConstraint = require("./constraints/p2distance_constraint");

    this.P2Enums = require("./p2enums");
    this.P2Space = require("./p2space");
}


module.exports = new Phys2D;

},{"./collision/p2broadphase":114,"./collision/p2broadphase_spatialhash":115,"./collision/p2nearphase":116,"./constraints/p2constraint":117,"./constraints/p2distance_constraint":119,"./objects/p2circle":122,"./objects/p2convex":123,"./objects/p2rect":124,"./objects/p2rigidbody":125,"./objects/p2segment":126,"./objects/p2shape":127,"./p2enums":128,"./p2space":130}]},{},[1]);
