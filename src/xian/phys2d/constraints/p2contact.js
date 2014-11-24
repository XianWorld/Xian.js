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
