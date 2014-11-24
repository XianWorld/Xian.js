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
