// SVGPathSeg API polyfill
// https://github.com/progers/pathseg
//
// This is a drop-in replacement for the SVGPathSeg and SVGPathSegList APIs that were removed from
// SVG2 (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html), including the latest spec
// changes which were implemented in Firefox 43 and Chrome 46.

(function () {
    "use strict";
    if (!("SVGPathSeg" in window)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
        window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
            this.pathSegType = type;
            this.pathSegTypeAsLetter = typeAsLetter;
            this._owningPathSegList = owningPathSegList;
        }

        window.SVGPathSeg.prototype.classname = "SVGPathSeg";

        window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
        window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
        window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
        window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
        window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
        window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
        window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
        window.SVGPathSeg.PATHSEG_ARC_REL = 11;
        window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
        window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
        window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
        window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;

        // Notify owning PathSegList on any changes so they can be synchronized back to the path element.
        window.SVGPathSeg.prototype._segmentChanged = function () {
            if (this._owningPathSegList)
                this._owningPathSegList.segmentChanged(this);
        }

        window.SVGPathSegClosePath = function (owningPathSegList) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
        }
        window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegClosePath.prototype.toString = function () { return "[object SVGPathSegClosePath]"; }
        window.SVGPathSegClosePath.prototype._asPathString = function () { return this.pathSegTypeAsLetter; }
        window.SVGPathSegClosePath.prototype.clone = function () { return new window.SVGPathSegClosePath(undefined); }

        window.SVGPathSegMovetoAbs = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegMovetoAbs.prototype.toString = function () { return "[object SVGPathSegMovetoAbs]"; }
        window.SVGPathSegMovetoAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegMovetoAbs.prototype.clone = function () { return new window.SVGPathSegMovetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegMovetoRel = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegMovetoRel.prototype.toString = function () { return "[object SVGPathSegMovetoRel]"; }
        window.SVGPathSegMovetoRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegMovetoRel.prototype.clone = function () { return new window.SVGPathSegMovetoRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoAbs = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoAbs.prototype.toString = function () { return "[object SVGPathSegLinetoAbs]"; }
        window.SVGPathSegLinetoAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegLinetoAbs.prototype.clone = function () { return new window.SVGPathSegLinetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoRel = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoRel.prototype.toString = function () { return "[object SVGPathSegLinetoRel]"; }
        window.SVGPathSegLinetoRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegLinetoRel.prototype.clone = function () { return new window.SVGPathSegLinetoRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicAbs = function (owningPathSegList, x, y, x1, y1, x2, y2) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicAbs]"; }
        window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicAbs.prototype.clone = function () { return new window.SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicRel = function (owningPathSegList, x, y, x1, y1, x2, y2) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicRel.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicRel]"; }
        window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicRel.prototype.clone = function () { return new window.SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticAbs = function (owningPathSegList, x, y, x1, y1) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
        }
        window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticAbs]"; }
        window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () { return new window.SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticRel = function (owningPathSegList, x, y, x1, y1) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
        }
        window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticRel]"; }
        window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function () { return new window.SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcAbs = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
            this._x = x;
            this._y = y;
            this._r1 = r1;
            this._r2 = r2;
            this._angle = angle;
            this._largeArcFlag = largeArcFlag;
            this._sweepFlag = sweepFlag;
        }
        window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegArcAbs.prototype.toString = function () { return "[object SVGPathSegArcAbs]"; }
        window.SVGPathSegArcAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        window.SVGPathSegArcAbs.prototype.clone = function () { return new window.SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", { get: function () { return this._r1; }, set: function (r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", { get: function () { return this._r2; }, set: function (r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", { get: function () { return this._angle; }, set: function (angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", { get: function () { return this._largeArcFlag; }, set: function (largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", { get: function () { return this._sweepFlag; }, set: function (sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcRel = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
            this._x = x;
            this._y = y;
            this._r1 = r1;
            this._r2 = r2;
            this._angle = angle;
            this._largeArcFlag = largeArcFlag;
            this._sweepFlag = sweepFlag;
        }
        window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegArcRel.prototype.toString = function () { return "[object SVGPathSegArcRel]"; }
        window.SVGPathSegArcRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        window.SVGPathSegArcRel.prototype.clone = function () { return new window.SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", { get: function () { return this._r1; }, set: function (r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", { get: function () { return this._r2; }, set: function (r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", { get: function () { return this._angle; }, set: function (angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", { get: function () { return this._largeArcFlag; }, set: function (largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", { get: function () { return this._sweepFlag; }, set: function (sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalAbs = function (owningPathSegList, x) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
            this._x = x;
        }
        window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function () { return "[object SVGPathSegLinetoHorizontalAbs]"; }
        window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x; }
        window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function () { return new window.SVGPathSegLinetoHorizontalAbs(undefined, this._x); }
        Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalRel = function (owningPathSegList, x) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
            this._x = x;
        }
        window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoHorizontalRel.prototype.toString = function () { return "[object SVGPathSegLinetoHorizontalRel]"; }
        window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x; }
        window.SVGPathSegLinetoHorizontalRel.prototype.clone = function () { return new window.SVGPathSegLinetoHorizontalRel(undefined, this._x); }
        Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalAbs = function (owningPathSegList, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
            this._y = y;
        }
        window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoVerticalAbs.prototype.toString = function () { return "[object SVGPathSegLinetoVerticalAbs]"; }
        window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._y; }
        window.SVGPathSegLinetoVerticalAbs.prototype.clone = function () { return new window.SVGPathSegLinetoVerticalAbs(undefined, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalRel = function (owningPathSegList, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
            this._y = y;
        }
        window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoVerticalRel.prototype.toString = function () { return "[object SVGPathSegLinetoVerticalRel]"; }
        window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._y; }
        window.SVGPathSegLinetoVerticalRel.prototype.clone = function () { return new window.SVGPathSegLinetoVerticalRel(undefined, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothAbs = function (owningPathSegList, x, y, x2, y2) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x2 = x2;
            this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicSmoothAbs]"; }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () { return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothRel = function (owningPathSegList, x, y, x2, y2) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x2 = x2;
            this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicSmoothRel]"; }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () { return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothAbs = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"; }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () { return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothRel = function (owningPathSegList, x, y) {
            window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticSmoothRel]"; }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () { return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        // Add createSVGPathSeg* functions to window.SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-Interfacewindow.SVGPathElement.
        window.SVGPathElement.prototype.createSVGPathSegClosePath = function () { return new window.SVGPathSegClosePath(undefined); }
        window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (x, y) { return new window.SVGPathSegMovetoAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function (x, y) { return new window.SVGPathSegMovetoRel(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (x, y) { return new window.SVGPathSegLinetoAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function (x, y) { return new window.SVGPathSegLinetoRel(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (x, y, x1, y1, x2, y2) { return new window.SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (x, y, x1, y1, x2, y2) { return new window.SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (x, y, x1, y1) { return new window.SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (x, y, x1, y1) { return new window.SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1); }
        window.SVGPathElement.prototype.createSVGPathSegArcAbs = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new window.SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        window.SVGPathElement.prototype.createSVGPathSegArcRel = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new window.SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (x) { return new window.SVGPathSegLinetoHorizontalAbs(undefined, x); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (x) { return new window.SVGPathSegLinetoHorizontalRel(undefined, x); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (y) { return new window.SVGPathSegLinetoVerticalAbs(undefined, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (y) { return new window.SVGPathSegLinetoVerticalRel(undefined, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (x, y, x2, y2) { return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (x, y, x2, y2) { return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (x, y) { return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (x, y) { return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y); }

        if (!("getPathSegAtLength" in window.SVGPathElement.prototype)) {
            // Add getPathSegAtLength to SVGPathElement.
            // Spec: https://www.w3.org/TR/SVG11/single-page.html#paths-__svg__SVGPathElement__getPathSegAtLength
            // This polyfill requires SVGPathElement.getTotalLength to implement the distance-along-a-path algorithm.
            window.SVGPathElement.prototype.getPathSegAtLength = function (distance) {
                if (distance === undefined || !isFinite(distance))
                    throw "Invalid arguments.";

                var measurementElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                measurementElement.setAttribute("d", this.getAttribute("d"));
                var lastPathSegment = measurementElement.pathSegList.numberOfItems - 1;

                // If the path is empty, return 0.
                if (lastPathSegment <= 0)
                    return 0;

                do {
                    measurementElement.pathSegList.removeItem(lastPathSegment);
                    if (distance > measurementElement.getTotalLength())
                        break;
                    lastPathSegment--;
                } while (lastPathSegment > 0);
                return lastPathSegment;
            }
        }
    }

    // Checking for SVGPathSegList in window checks for the case of an implementation without the
    // SVGPathSegList API.
    // The second check for appendItem is specific to Firefox 59+ which removed only parts of the
    // SVGPathSegList API (e.g., appendItem). In this case we need to re-implement the entire API
    // so the polyfill data (i.e., _list) is used throughout.
    if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
        window.SVGPathSegList = function (pathElement) {
            this._pathElement = pathElement;
            this._list = this._parsePath(this._pathElement.getAttribute("d"));

            // Use a MutationObserver to catch changes to the path's "d" attribute.
            this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
            this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
            this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        window.SVGPathSegList.prototype.classname = "SVGPathSegList";

        Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
            get: function () {
                this._checkPathSynchronizedToList();
                return this._list.length;
            },
            enumerable: true
        });

        // Add the pathSegList accessors to window.SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
        Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
            get: function () {
                if (!this._pathSegList)
                    this._pathSegList = new window.SVGPathSegList(this);
                return this._pathSegList;
            },
            enumerable: true
        });
        // FIXME: The following are not implemented and simply return window.SVGPathElement.pathSegList.
        Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });

        // Process any pending mutations to the path element and update the list as needed.
        // This should be the first call of all public functions and is needed because
        // MutationObservers are not synchronous so we can have pending asynchronous mutations.
        window.SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
            this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
        }

        window.SVGPathSegList.prototype._updateListFromPathMutations = function (mutationRecords) {
            if (!this._pathElement)
                return;
            var hasPathMutations = false;
            mutationRecords.forEach(function (record) {
                if (record.attributeName == "d")
                    hasPathMutations = true;
            });
            if (hasPathMutations)
                this._list = this._parsePath(this._pathElement.getAttribute("d"));
        }

        // Serialize the list and update the path's 'd' attribute.
        window.SVGPathSegList.prototype._writeListToPath = function () {
            this._pathElementMutationObserver.disconnect();
            this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
            this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        // When a path segment changes the list needs to be synchronized back to the path element.
        window.SVGPathSegList.prototype.segmentChanged = function (pathSeg) {
            this._writeListToPath();
        }

        window.SVGPathSegList.prototype.clear = function () {
            this._checkPathSynchronizedToList();

            this._list.forEach(function (pathSeg) {
                pathSeg._owningPathSegList = null;
            });
            this._list = [];
            this._writeListToPath();
        }

        window.SVGPathSegList.prototype.initialize = function (newItem) {
            this._checkPathSynchronizedToList();

            this._list = [newItem];
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        window.SVGPathSegList.prototype._checkValidIndex = function (index) {
            if (isNaN(index) || index < 0 || index >= this.numberOfItems)
                throw "INDEX_SIZE_ERR";
        }

        window.SVGPathSegList.prototype.getItem = function (index) {
            this._checkPathSynchronizedToList();

            this._checkValidIndex(index);
            return this._list[index];
        }

        window.SVGPathSegList.prototype.insertItemBefore = function (newItem, index) {
            this._checkPathSynchronizedToList();

            // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
            if (index > this.numberOfItems)
                index = this.numberOfItems;
            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._list.splice(index, 0, newItem);
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        window.SVGPathSegList.prototype.replaceItem = function (newItem, index) {
            this._checkPathSynchronizedToList();

            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._checkValidIndex(index);
            this._list[index] = newItem;
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        window.SVGPathSegList.prototype.removeItem = function (index) {
            this._checkPathSynchronizedToList();

            this._checkValidIndex(index);
            var item = this._list[index];
            this._list.splice(index, 1);
            this._writeListToPath();
            return item;
        }

        window.SVGPathSegList.prototype.appendItem = function (newItem) {
            this._checkPathSynchronizedToList();

            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._list.push(newItem);
            newItem._owningPathSegList = this;
            // TODO: Optimize this to just append to the existing attribute.
            this._writeListToPath();
            return newItem;
        }

        window.SVGPathSegList._pathSegArrayAsString = function (pathSegArray) {
            var string = "";
            var first = true;
            pathSegArray.forEach(function (pathSeg) {
                if (first) {
                    first = false;
                    string += pathSeg._asPathString();
                } else {
                    string += " " + pathSeg._asPathString();
                }
            });
            return string;
        }

        // This closely follows SVGPathParser::parsePath from Source/core/svg/SVGPathParser.cpp.
        window.SVGPathSegList.prototype._parsePath = function (string) {
            if (!string || string.length == 0)
                return [];

            var owningPathSegList = this;

            var Builder = function () {
                this.pathSegList = [];
            }

            Builder.prototype.appendSegment = function (pathSeg) {
                this.pathSegList.push(pathSeg);
            }

            var Source = function (string) {
                this._string = string;
                this._currentIndex = 0;
                this._endIndex = this._string.length;
                this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;

                this._skipOptionalSpaces();
            }

            Source.prototype._isCurrentSpace = function () {
                var character = this._string[this._currentIndex];
                return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
            }

            Source.prototype._skipOptionalSpaces = function () {
                while (this._currentIndex < this._endIndex && this._isCurrentSpace())
                    this._currentIndex++;
                return this._currentIndex < this._endIndex;
            }

            Source.prototype._skipOptionalSpacesOrDelimiter = function () {
                if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
                    return false;
                if (this._skipOptionalSpaces()) {
                    if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                        this._currentIndex++;
                        this._skipOptionalSpaces();
                    }
                }
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.hasMoreData = function () {
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.peekSegmentType = function () {
                var lookahead = this._string[this._currentIndex];
                return this._pathSegTypeFromChar(lookahead);
            }

            Source.prototype._pathSegTypeFromChar = function (lookahead) {
                switch (lookahead) {
                    case "Z":
                    case "z":
                        return window.SVGPathSeg.PATHSEG_CLOSEPATH;
                    case "M":
                        return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
                    case "m":
                        return window.SVGPathSeg.PATHSEG_MOVETO_REL;
                    case "L":
                        return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                    case "l":
                        return window.SVGPathSeg.PATHSEG_LINETO_REL;
                    case "C":
                        return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                    case "c":
                        return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                    case "Q":
                        return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                    case "q":
                        return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                    case "A":
                        return window.SVGPathSeg.PATHSEG_ARC_ABS;
                    case "a":
                        return window.SVGPathSeg.PATHSEG_ARC_REL;
                    case "H":
                        return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                    case "h":
                        return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                    case "V":
                        return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                    case "v":
                        return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                    case "S":
                        return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                    case "s":
                        return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                    case "T":
                        return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                    case "t":
                        return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                    default:
                        return window.SVGPathSeg.PATHSEG_UNKNOWN;
                }
            }

            Source.prototype._nextCommandHelper = function (lookahead, previousCommand) {
                // Check for remaining coordinates in the current command.
                if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) && previousCommand != window.SVGPathSeg.PATHSEG_CLOSEPATH) {
                    if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_ABS)
                        return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                    if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_REL)
                        return window.SVGPathSeg.PATHSEG_LINETO_REL;
                    return previousCommand;
                }
                return window.SVGPathSeg.PATHSEG_UNKNOWN;
            }

            Source.prototype.initialCommandIsMoveTo = function () {
                // If the path is empty it is still valid, so return true.
                if (!this.hasMoreData())
                    return true;
                var command = this.peekSegmentType();
                // Path must start with moveTo.
                return command == window.SVGPathSeg.PATHSEG_MOVETO_ABS || command == window.SVGPathSeg.PATHSEG_MOVETO_REL;
            }

            // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from Source/core/svg/SVGParserUtilities.cpp.
            // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
            Source.prototype._parseNumber = function () {
                var exponent = 0;
                var integer = 0;
                var frac = 1;
                var decimal = 0;
                var sign = 1;
                var expsign = 1;

                var startIndex = this._currentIndex;

                this._skipOptionalSpaces();

                // Read the sign.
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
                    this._currentIndex++;
                else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                    this._currentIndex++;
                    sign = -1;
                }

                if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != "."))
                    // The first character of a number must be one of [0-9+-.].
                    return undefined;

                // Read the integer part, build right-to-left.
                var startIntPartIndex = this._currentIndex;
                while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                    this._currentIndex++; // Advance to first non-digit.

                if (this._currentIndex != startIntPartIndex) {
                    var scanIntPartIndex = this._currentIndex - 1;
                    var multiplier = 1;
                    while (scanIntPartIndex >= startIntPartIndex) {
                        integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                        multiplier *= 10;
                    }
                }

                // Read the decimals.
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                    this._currentIndex++;

                    // There must be a least one digit following the .
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;
                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                        frac *= 10;
                        decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
                        this._currentIndex += 1;
                    }
                }

                // Read the exponent part.
                if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
                    this._currentIndex++;

                    // Read the sign of the exponent.
                    if (this._string.charAt(this._currentIndex) == "+") {
                        this._currentIndex++;
                    } else if (this._string.charAt(this._currentIndex) == "-") {
                        this._currentIndex++;
                        expsign = -1;
                    }

                    // There must be an exponent.
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;

                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                        exponent *= 10;
                        exponent += (this._string.charAt(this._currentIndex) - "0");
                        this._currentIndex++;
                    }
                }

                var number = integer + decimal;
                number *= sign;

                if (exponent)
                    number *= Math.pow(10, expsign * exponent);

                if (startIndex == this._currentIndex)
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();

                return number;
            }

            Source.prototype._parseArcFlag = function () {
                if (this._currentIndex >= this._endIndex)
                    return undefined;
                var flag = false;
                var flagChar = this._string.charAt(this._currentIndex++);
                if (flagChar == "0")
                    flag = false;
                else if (flagChar == "1")
                    flag = true;
                else
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();
                return flag;
            }

            Source.prototype.parseSegment = function () {
                var lookahead = this._string[this._currentIndex];
                var command = this._pathSegTypeFromChar(lookahead);
                if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) {
                    // Possibly an implicit command. Not allowed if this is the first command.
                    if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
                        return null;
                    command = this._nextCommandHelper(lookahead, this._previousCommand);
                    if (command == window.SVGPathSeg.PATHSEG_UNKNOWN)
                        return null;
                } else {
                    this._currentIndex++;
                }

                this._previousCommand = command;

                switch (command) {
                    case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                        return new window.SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                        return new window.SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_REL:
                        return new window.SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                        return new window.SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                        return new window.SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                        return new window.SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                        return new window.SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                        return new window.SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                        this._skipOptionalSpaces();
                        return new window.SVGPathSegClosePath(owningPathSegList);
                    case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                    case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                    case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                        var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
                    case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                        var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
                    case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
                    case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
                    case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                        return new window.SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case window.SVGPathSeg.PATHSEG_ARC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                    case window.SVGPathSeg.PATHSEG_ARC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                        return new window.SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                    default:
                        throw "Unknown path seg type."
                }
            }

            var builder = new Builder();
            var source = new Source(string);

            if (!source.initialCommandIsMoveTo())
                return [];
            while (source.hasMoreData()) {
                var pathSeg = source.parseSegment();
                if (!pathSeg)
                    return [];
                builder.appendSegment(pathSeg);
            }

            return builder.pathSegList;
        }
    }
}());

! function (e) {


    /*! tsParticles v1.16.0-beta.4 by Matteo Bruni */ ! function (t, i) {
        for (var e in i) t[e] = i[e]
    }(window, function (t) {
        var i = {};

        function e(s) {
            if (i[s]) return i[s].exports;
            var o = i[s] = {
                i: s,
                l: !1,
                exports: {}
            };
            return t[s].call(o.exports, o, o.exports, e), o.l = !0, o.exports
        }
        return e.m = t, e.c = i, e.d = function (t, i, s) {
            e.o(t, i) || Object.defineProperty(t, i, {
                enumerable: !0,
                get: s
            })
        }, e.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, e.t = function (t, i) {
            if (1 & i && (t = e(t)), 8 & i) return t;
            if (4 & i && "object" == typeof t && t && t.__esModule) return t;
            var s = Object.create(null);
            if (e.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & i && "string" != typeof t)
                for (var o in t) e.d(s, o, function (i) {
                    return t[i]
                }.bind(null, o));
            return s
        }, e.n = function (t) {
            var i = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(i, "a", i), i
        }, e.o = function (t, i) {
            return Object.prototype.hasOwnProperty.call(t, i)
        }, e.p = "", e(e.s = 4)
    }({
        4: function (t, i, e) {
            "use strict";
            e.r(i), e.d(i, "MoveDirection", (function () {
                return o
            })), e.d(i, "RotateDirection", (function () {
                return h
            })), e.d(i, "ClickMode", (function () {
                return m
            })), e.d(i, "DivMode", (function () {
                return p
            })), e.d(i, "HoverMode", (function () {
                return a
            })), e.d(i, "CollisionMode", (function () {
                return v
            })), e.d(i, "OutMode", (function () {
                return d
            })), e.d(i, "SizeMode", (function () {
                return vi
            })), e.d(i, "SizeAnimationStatus", (function () {
                return l
            })), e.d(i, "OpacityAnimationStatus", (function () {
                return r
            })), e.d(i, "DestroyType", (function () {
                return c
            })), e.d(i, "ProcessBubbleType", (function () {
                return f
            })), e.d(i, "ShapeType", (function () {
                return n
            })), e.d(i, "StartValueType", (function () {
                return u
            })), e.d(i, "DivType", (function () {
                return y
            })), e.d(i, "InteractivityDetect", (function () {
                return g
            })), e.d(i, "particlesJS", (function () {
                return Di
            })), e.d(i, "pJSDom", (function () {
                return Li
            })), e.d(i, "tsParticles", (function () {
                return Ii
            }));

            function s(t, i, e, s) {
                return new (e || (e = Promise))((function (o, n) {
                    function a(t) {
                        try {
                            l(s.next(t))
                        } catch (t) {
                            n(t)
                        }
                    }

                    function r(t) {
                        try {
                            l(s.throw(t))
                        } catch (t) {
                            n(t)
                        }
                    }

                    function l(t) {
                        var i;
                        t.done ? o(t.value) : (i = t.value, i instanceof e ? i : new e((function (t) {
                            t(i)
                        }))).then(a, r)
                    }
                    l((s = s.apply(t, i || [])).next())
                }))
            }
            Object.create;
            var o, n, a, r, l, c, h, d, u, v, p, m, y, f, g;
            Object.create;
            class b {
                draw(t, i, e) {
                    t.rect(-e, -e, 2 * e, 2 * e)
                }
            } ! function (t) {
                t.bottom = "bottom", t.bottomLeft = "bottom-left", t.bottomRight = "bottom-right", t.left = "left", t.none = "none", t.right = "right", t.top = "top", t.topLeft = "top-left", t.topRight = "top-right"
            }(o || (o = {}));
            class w { }
            w.canvasClass = "tsparticles-canvas-el", w.randomColorValue = "random", w.midColorValue = "mid", w.touchEndEvent = "touchend", w.mouseUpEvent = "mouseup", w.mouseMoveEvent = "mousemove", w.touchStartEvent = "touchstart", w.touchMoveEvent = "touchmove", w.mouseLeaveEvent = "mouseleave", w.touchCancelEvent = "touchcancel", w.resizeEvent = "resize", w.visibilityChangeEvent = "visibilitychange", w.noPolygonDataLoaded = "No polygon data loaded.", w.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
            class x {
                static colorToRgb(t) {
                    var i, e;
                    if (void 0 === t) return;
                    const s = "string" == typeof t ? {
                        value: t
                    } : t;
                    let o;
                    if ("string" == typeof s.value) o = s.value === w.randomColorValue ? this.getRandomRgbColor() : x.stringToRgb(s.value);
                    else if (s.value instanceof Array) {
                        const t = z.itemFromArray(s.value);
                        o = x.colorToRgb({
                            value: t
                        })
                    } else {
                        const t = s.value,
                            n = null !== (i = t.rgb) && void 0 !== i ? i : s.value;
                        if (void 0 !== n.r) o = n;
                        else {
                            const i = null !== (e = t.hsl) && void 0 !== e ? e : s.value;
                            void 0 !== i.h && (o = x.hslToRgb(i))
                        }
                    }
                    return o
                }
                static colorToHsl(t) {
                    const i = this.colorToRgb(t);
                    return void 0 !== i ? this.rgbToHsl(i) : i
                }
                static rgbToHsl(t) {
                    const i = t.r / 255,
                        e = t.g / 255,
                        s = t.b / 255,
                        o = Math.max(i, e, s),
                        n = Math.min(i, e, s),
                        a = {
                            h: 0,
                            l: (o + n) / 2,
                            s: 0
                        };
                    return o != n && (a.s = a.l < .5 ? (o - n) / (o + n) : (o - n) / (2 - o - n), a.h = i === o ? (e - s) / (o - n) : a.h = e === o ? 2 + (s - i) / (o - n) : 4 + (i - e) / (o - n)), a.l *= 100, a.s *= 100, a.h *= 60, a.h < 0 && (a.h += 360), a
                }
                static stringToAlpha(t) {
                    var i;
                    return null === (i = x.stringToRgba(t)) || void 0 === i ? void 0 : i.a
                }
                static stringToRgb(t) {
                    return x.stringToRgba(t)
                }
                static hslToRgb(t) {
                    const i = {
                        b: 0,
                        g: 0,
                        r: 0
                    },
                        e = {
                            h: t.h / 360,
                            l: t.l / 100,
                            s: t.s / 100
                        };
                    if (0 === e.s) i.b = e.l, i.g = e.l, i.r = e.l;
                    else {
                        const t = e.l < .5 ? e.l * (1 + e.s) : e.l + e.s - e.l * e.s,
                            s = 2 * e.l - t;
                        i.r = x.hue2rgb(s, t, e.h + 1 / 3), i.g = x.hue2rgb(s, t, e.h), i.b = x.hue2rgb(s, t, e.h - 1 / 3)
                    }
                    return i.r = Math.floor(255 * i.r), i.g = Math.floor(255 * i.g), i.b = Math.floor(255 * i.b), i
                }
                static hslaToRgba(t) {
                    const i = x.hslToRgb(t);
                    return {
                        a: t.a,
                        b: i.b,
                        g: i.g,
                        r: i.r
                    }
                }
                static getRandomRgbColor(t) {
                    var i;
                    const e = t || 0,
                        s = e + e * Math.pow(16, 2) + e * Math.pow(16, 4),
                        o = 16777215 ^ s,
                        n = Math.floor(Math.random() * o | s).toString(16);
                    return null !== (i = this.stringToRgb("#" + n)) && void 0 !== i ? i : {
                        b: 0,
                        g: 0,
                        r: 0
                    }
                }
                static getStyleFromRgb(t, i) {
                    return `rgba(${t.r}, ${t.g}, ${t.b}, ${null != i ? i : 1})`
                }
                static getStyleFromHsl(t, i) {
                    return `hsla(${t.h}, ${t.s}%, ${t.l}%, ${null != i ? i : 1})`
                }
                static mix(t, i, e, s) {
                    let o = t,
                        n = i;
                    return void 0 === o.r && (o = this.hslToRgb(t)), void 0 === n.r && (n = this.hslToRgb(i)), {
                        b: z.mix(o.b, n.b, e, s),
                        g: z.mix(o.g, n.g, e, s),
                        r: z.mix(o.r, n.r, e, s)
                    }
                }
                static hue2rgb(t, i, e) {
                    let s = e;
                    return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + 6 * (i - t) * s : s < .5 ? i : s < 2 / 3 ? t + (i - t) * (2 / 3 - s) * 6 : t
                }
                static stringToRgba(t) {
                    if (t.startsWith("rgb")) {
                        const i = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i.exec(t);
                        return i ? {
                            a: i.length > 4 ? parseFloat(i[5]) : 1,
                            b: parseInt(i[3], 10),
                            g: parseInt(i[2], 10),
                            r: parseInt(i[1], 10)
                        } : void 0
                    }
                    if (t.startsWith("hsl")) {
                        const i = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i.exec(t);
                        return i ? x.hslaToRgba({
                            a: i.length > 4 ? parseFloat(i[5]) : 1,
                            h: parseInt(i[1], 10),
                            l: parseInt(i[3], 10),
                            s: parseInt(i[2], 10)
                        }) : void 0
                    } {
                        const i = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
                            e = t.replace(i, (t, i, e, s, o) => i + i + e + e + s + s + (void 0 !== o ? o + o : "")),
                            s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(e);
                        return s ? {
                            a: void 0 !== s[4] ? parseInt(s[4], 16) / 255 : 1,
                            b: parseInt(s[3], 16),
                            g: parseInt(s[2], 16),
                            r: parseInt(s[1], 16)
                        } : void 0
                    }
                }
            }
            class z {
                static isSsr() {
                    return "undefined" == typeof window || !window
                }
                static get animate() {
                    return this.isSsr() ? t => setTimeout(t) : t => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(t)
                }
                static get cancelAnimation() {
                    return this.isSsr() ? t => clearTimeout(t) : t => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(t)
                }
                static replaceColorSvg(t, i, e) {
                    if (!t.svgData) return "";
                    return t.svgData.replace(/#([0-9A-F]{3,6})/gi, () => x.getStyleFromHsl(i, e))
                }
                static clamp(t, i, e) {
                    return Math.min(Math.max(t, i), e)
                }
                static isInArray(t, i) {
                    return t === i || i instanceof Array && i.indexOf(t) > -1
                }
                static mix(t, i, e, s) {
                    return Math.floor((t * e + i * s) / (e + s))
                }
                static getParticleBaseVelocity(t) {
                    let i;
                    switch (t.direction) {
                        case o.top:
                            i = {
                                x: 0,
                                y: -1
                            };
                            break;
                        case o.topRight:
                            i = {
                                x: .5,
                                y: -.5
                            };
                            break;
                        case o.right:
                            i = {
                                x: 1,
                                y: -0
                            };
                            break;
                        case o.bottomRight:
                            i = {
                                x: .5,
                                y: .5
                            };
                            break;
                        case o.bottom:
                            i = {
                                x: 0,
                                y: 1
                            };
                            break;
                        case o.bottomLeft:
                            i = {
                                x: -.5,
                                y: 1
                            };
                            break;
                        case o.left:
                            i = {
                                x: -1,
                                y: 0
                            };
                            break;
                        case o.topLeft:
                            i = {
                                x: -.5,
                                y: -.5
                            };
                            break;
                        default:
                            i = {
                                x: 0,
                                y: 0
                            }
                    }
                    return i
                }
                static getDistances(t, i) {
                    const e = t.x - i.x,
                        s = t.y - i.y;
                    return {
                        dx: e,
                        dy: s,
                        distance: Math.sqrt(e * e + s * s)
                    }
                }
                static getDistance(t, i) {
                    return this.getDistances(t, i).distance
                }
                static loadFont(t) {
                    return s(this, void 0, void 0, (function* () {
                        try {
                            yield document.fonts.load(`${t.weight} 36px '${t.font}'`)
                        } catch (t) { }
                    }))
                }
                static arrayRandomIndex(t) {
                    return Math.floor(Math.random() * t.length)
                }
                static itemFromArray(t, i) {
                    return t[void 0 !== i ? i : this.arrayRandomIndex(t)]
                }
                static randomInRange(t, i) {
                    const e = Math.max(t, i),
                        s = Math.min(t, i);
                    return Math.random() * (e - s) + s
                }
                static isPointInside(t, i, e) {
                    return this.areBoundsInside(this.calculateBounds(t, null != e ? e : 0), i)
                }
                static areBoundsInside(t, i) {
                    return t.left < i.width && t.right > 0 && t.top < i.height && t.bottom > 0
                }
                static calculateBounds(t, i) {
                    return {
                        bottom: t.y + i,
                        left: t.x - i,
                        right: t.x + i,
                        top: t.y - i
                    }
                }
                static loadImage(t) {
                    return new Promise((i, e) => {
                        const s = {
                            source: t,
                            type: t.substr(t.length - 3)
                        };
                        if (t) {
                            const o = new Image;
                            o.addEventListener("load", () => {
                                s.element = o, i(s)
                            }), o.addEventListener("error", () => {
                                e("Error tsParticles - loading image: " + t)
                            }), o.src = t
                        } else e("Error tsParticles - No image.src")
                    })
                }
                static downloadSvgImage(t) {
                    return s(this, void 0, void 0, (function* () {
                        if (t) {
                            const i = {
                                source: t,
                                type: t.substr(t.length - 3)
                            };
                            if ("svg" !== i.type) return this.loadImage(t);
                            const e = yield fetch(i.source);
                            if (e.ok) return i.svgData = yield e.text(), i;
                            throw new Error("Error tsParticles - Image not found")
                        }
                        throw new Error("Error tsParticles - No image.src")
                    }))
                }
                static deepExtend(t, ...i) {
                    for (const e of i) {
                        if (null == e) continue;
                        if ("object" != typeof e) {
                            t = e;
                            continue
                        }
                        const i = Array.isArray(e);
                        !i || "object" == typeof t && t && Array.isArray(t) ? i || "object" == typeof t && t && !Array.isArray(t) || (t = {}) : t = [];
                        for (const i in e) {
                            if ("__proto__" === i) continue;
                            const s = e[i],
                                o = "object" == typeof s;
                            t[i] = o && Array.isArray(s) ? s.map(e => this.deepExtend(t[i], e)) : this.deepExtend(t[i], s)
                        }
                    }
                    return t
                }
                static isDivModeEnabled(t, i) {
                    return i instanceof Array ? i.filter(i => i.enable && z.isInArray(t, i.mode)).length > 0 : z.isInArray(t, i.mode)
                }
                static divModeExecute(t, i, e) {
                    if (i instanceof Array)
                        for (const s of i) {
                            const i = s.mode;
                            s.enable && z.isInArray(t, i) && this.singleDivModeExecute(s, e)
                        } else {
                        const s = i.mode;
                        i.enable && z.isInArray(t, s) && this.singleDivModeExecute(i, e)
                    }
                }
                static singleDivModeExecute(t, i) {
                    const e = t.ids;
                    if (e instanceof Array)
                        for (const s of e) i(s, t);
                    else i(e, t)
                }
                static divMode(t, i) {
                    if (i && t) return t instanceof Array ? t.find(t => z.isInArray(i, t.ids)) : z.isInArray(i, t.ids) ? t : void 0
                }
            } ! function (t) {
                t.char = "char", t.character = "character", t.circle = "circle", t.edge = "edge", t.image = "image", t.images = "images", t.line = "line", t.polygon = "polygon", t.square = "square", t.star = "star", t.triangle = "triangle"
            }(n || (n = {}));
            class k {
                init(t) {
                    var i;
                    return s(this, void 0, void 0, (function* () {
                        const e = t.options;
                        if (z.isInArray(n.char, e.particles.shape.type) || z.isInArray(n.character, e.particles.shape.type)) {
                            const t = null !== (i = e.particles.shape.options[n.character]) && void 0 !== i ? i : e.particles.shape.options[n.char];
                            if (t instanceof Array)
                                for (const i of t) yield z.loadFont(i);
                            else void 0 !== t && (yield z.loadFont(t))
                        }
                    }))
                }
                draw(t, i, e) {
                    const s = i.shapeData;
                    if (void 0 === s) return;
                    const o = s.value;
                    if (void 0 === o) return;
                    const n = i;
                    void 0 === n.text && (n.text = o instanceof Array ? z.itemFromArray(o, i.randomIndexData) : o);
                    const a = n.text,
                        r = s.style,
                        l = s.weight,
                        c = 2 * Math.round(e),
                        h = s.font,
                        d = i.fill;
                    t.font = `${r} ${l} ${c}px "${h}"`;
                    const u = {
                        x: -e / 2,
                        y: e / 2
                    };
                    d ? t.fillText(a, u.x, u.y) : t.strokeText(a, u.x, u.y)
                }
            }
            class P {
                constructor() {
                    this.images = []
                }
                getImages(t) {
                    const i = this.images.filter(i => i.id === t.id);
                    return i.length ? i[0] : (this.images.push({
                        id: t.id,
                        images: []
                    }), this.getImages(t))
                }
                addImage(t, i) {
                    const e = this.getImages(t);
                    null == e || e.images.push(i)
                }
                init(t) {
                    var i;
                    return s(this, void 0, void 0, (function* () {
                        const e = t.options.particles.shape;
                        if (!z.isInArray(n.image, e.type) && !z.isInArray(n.images, e.type)) return;
                        const s = null !== (i = e.options[n.images]) && void 0 !== i ? i : e.options[n.image];
                        if (s instanceof Array)
                            for (const i of s) yield this.loadImageShape(t, i);
                        else yield this.loadImageShape(t, s)
                    }))
                }
                destroy() {
                    this.images = []
                }
                loadImageShape(t, i) {
                    return s(this, void 0, void 0, (function* () {
                        try {
                            const e = i.replaceColor ? yield z.downloadSvgImage(i.src) : yield z.loadImage(i.src);
                            this.addImage(t, e)
                        } catch (t) {
                            console.log(`tsParticles error - ${i.src} not found`)
                        }
                    }))
                }
                draw(t, i, e, s) {
                    var o, n;
                    if (!t) return;
                    const a = i.image,
                        r = null === (o = null == a ? void 0 : a.data) || void 0 === o ? void 0 : o.element;
                    if (!r) return;
                    const l = null !== (n = null == a ? void 0 : a.ratio) && void 0 !== n ? n : 1,
                        c = {
                            x: -e,
                            y: -e
                        };
                    (null == a ? void 0 : a.data.svgData) && (null == a ? void 0 : a.replaceColor) || (t.globalAlpha = s), t.drawImage(r, c.x, c.y, 2 * e, 2 * e / l), (null == a ? void 0 : a.data.svgData) && (null == a ? void 0 : a.replaceColor) || (t.globalAlpha = 1)
                }
            }
            class M {
                static getPlugin(t) {
                    return this.plugins.filter(i => i.id === t)[0]
                }
                static addPlugin(t) {
                    this.getPlugin(t.id) || this.plugins.push(t)
                }
                static getAvailablePlugins(t) {
                    const i = new Map,
                        e = this.plugins.filter(i => i.needsPlugin(t.options));
                    for (const s of e) i.set(s.id, s.getPlugin(t));
                    return i
                }
                static loadOptions(t, i) {
                    for (const e of this.plugins) e.loadOptions(t, i)
                }
                static getPreset(t) {
                    return this.presets.get(t)
                }
                static addPreset(t, i) {
                    this.getPreset(t) || this.presets.set(t, i)
                }
                static addShapeDrawer(t, i) {
                    this.getShapeDrawer(t) || this.drawers.set(t, i)
                }
                static getShapeDrawer(t) {
                    return this.drawers.get(t)
                }
                static getSupportedShapes() {
                    return this.drawers.keys()
                }
            }
            M.plugins = [], M.presets = new Map, M.drawers = new Map;
            class S {
                draw(t, i, e) {
                    t.moveTo(0, -e / 2), t.lineTo(0, e / 2)
                }
            }
            class A {
                draw(t, i, e) {
                    t.arc(0, 0, e, 0, 2 * Math.PI, !1)
                }
            }
            class C {
                draw(t, i, e) {
                    const s = this.getCenter(i, e),
                        o = this.getSidesData(i, e),
                        n = o.count.numerator * o.count.denominator,
                        a = o.count.numerator / o.count.denominator,
                        r = 180 * (a - 2) / a,
                        l = Math.PI - Math.PI * r / 180;
                    if (t) {
                        t.beginPath(), t.translate(s.x, s.y), t.moveTo(0, 0);
                        for (let i = 0; i < n; i++) t.lineTo(o.length, 0), t.translate(o.length, 0), t.rotate(l)
                    }
                }
            }
            class O extends C {
                getSidesData(t, i) {
                    return {
                        count: {
                            denominator: 2,
                            numerator: 3
                        },
                        length: 2 * i
                    }
                }
                getCenter(t, i) {
                    return {
                        x: -i,
                        y: i / 1.66
                    }
                }
            }
            class T {
                draw(t, i, e) {
                    var s, o, n;
                    const a = i.shapeData,
                        r = null !== (o = null !== (s = null == a ? void 0 : a.sides) && void 0 !== s ? s : null == a ? void 0 : a.nb_sides) && void 0 !== o ? o : 5,
                        l = null !== (n = null == a ? void 0 : a.inset) && void 0 !== n ? n : 2;
                    t.moveTo(0, 0 - e);
                    for (let i = 0; i < r; i++) t.rotate(Math.PI / r), t.lineTo(0, 0 - e * l), t.rotate(Math.PI / r), t.lineTo(0, 0 - e)
                }
            }
            class R extends C {
                getSidesData(t, i) {
                    var e, s;
                    const o = t.shapeData,
                        n = null !== (s = null !== (e = null == o ? void 0 : o.sides) && void 0 !== e ? e : null == o ? void 0 : o.nb_sides) && void 0 !== s ? s : 5;
                    return {
                        count: {
                            denominator: 1,
                            numerator: n
                        },
                        length: 2.66 * i / (n / 3)
                    }
                }
                getCenter(t, i) {
                    var e, s;
                    const o = t.shapeData;
                    return {
                        x: -i / ((null !== (s = null !== (e = null == o ? void 0 : o.sides) && void 0 !== e ? e : null == o ? void 0 : o.nb_sides) && void 0 !== s ? s : 5) / 3.5),
                        y: -i / .76
                    }
                }
            }
            class E {
                static paintBase(t, i, e) {
                    t.save(), t.fillStyle = null != e ? e : "rgba(0,0,0,0)", t.fillRect(0, 0, i.width, i.height), t.restore()
                }
                static clear(t, i) {
                    t.clearRect(0, 0, i.width, i.height)
                }
                static drawLinkLine(t, i, e, s, o, n, a, r, l, c, h) {
                    let d = !1;
                    if (z.getDistance(e, s) <= o) this.drawLine(t, e, s), d = !0;
                    else if (a) {
                        let i, a;
                        const r = {
                            x: s.x - n.width,
                            y: s.y
                        },
                            {
                                dx: l,
                                dy: c,
                                distance: h
                            } = z.getDistances(e, r);
                        if (h <= o) {
                            const t = e.y - c / l * e.x;
                            i = {
                                x: 0,
                                y: t
                            }, a = {
                                x: n.width,
                                y: t
                            }
                        } else {
                            const t = {
                                x: s.x,
                                y: s.y - n.height
                            },
                                {
                                    dx: r,
                                    dy: l,
                                    distance: c
                                } = z.getDistances(e, t);
                            if (c <= o) {
                                const t = -(e.y - l / r * e.x) / (l / r);
                                i = {
                                    x: t,
                                    y: 0
                                }, a = {
                                    x: t,
                                    y: n.height
                                }
                            } else {
                                const t = {
                                    x: s.x - n.width,
                                    y: s.y - n.height
                                },
                                    {
                                        dx: r,
                                        dy: l,
                                        distance: c
                                    } = z.getDistances(e, t);
                                if (c <= o) {
                                    const t = e.y - l / r * e.x;
                                    i = {
                                        x: -t / (l / r),
                                        y: t
                                    }, a = {
                                        x: i.x + n.width,
                                        y: i.y + n.height
                                    }
                                }
                            }
                        }
                        i && a && (this.drawLine(t, e, i), this.drawLine(t, s, a), d = !0)
                    }
                    if (d) {
                        if (t.lineWidth = i, r && (t.globalCompositeOperation = "destination-out"), t.strokeStyle = x.getStyleFromRgb(l, c), h.enable) {
                            const i = x.colorToRgb(h.color);
                            i && (t.shadowBlur = h.blur, t.shadowColor = x.getStyleFromRgb(i))
                        }
                        t.stroke()
                    }
                }
                static drawLinkTriangle(t, i, e, s, o, n, a, r) {
                    this.drawTriangle(t, e, s, o), t.lineWidth = i, n && (t.globalCompositeOperation = "destination-out"), t.fillStyle = x.getStyleFromRgb(a, r), t.fill()
                }
                static drawConnectLine(t, i, e, s, o) {
                    t.save(), this.drawLine(t, s, o), t.lineWidth = i, t.strokeStyle = e, t.stroke(), t.restore()
                }
                static gradient(t, i, e, s) {
                    const o = Math.floor(e.size.value / i.size.value),
                        n = i.getColor(),
                        a = e.getColor();
                    if (!n || !a) return;
                    const r = i.getPosition(),
                        l = e.getPosition(),
                        c = x.mix(n, a, i.size.value, e.size.value),
                        h = t.createLinearGradient(r.x, r.y, l.x, l.y);
                    return h.addColorStop(0, x.getStyleFromHsl(n, s)), h.addColorStop(o > 1 ? 1 : o, x.getStyleFromRgb(c, s)), h.addColorStop(1, x.getStyleFromHsl(a, s)), h
                }
                static drawGrabLine(t, i, e, s, o, n) {
                    t.save(), this.drawLine(t, e, s), t.strokeStyle = x.getStyleFromRgb(o, n), t.lineWidth = i, t.stroke(), t.restore()
                }
                static drawParticle(t, i, e, s, o, n, a, r, l) {
                    const c = e.getPosition();
                    i.save(), i.translate(c.x, c.y), i.beginPath(), 0 !== e.angle && i.rotate(e.angle * Math.PI / 180), n && (i.globalCompositeOperation = "destination-out");
                    const h = e.shadowColor;
                    l.enable && h && (i.shadowBlur = l.blur, i.shadowColor = x.getStyleFromRgb(h), i.shadowOffsetX = l.offset.x, i.shadowOffsetY = l.offset.y), i.fillStyle = o;
                    const d = e.stroke;
                    i.lineWidth = d.width, e.strokeColor && (i.strokeStyle = x.getStyleFromRgb(e.strokeColor, e.stroke.opacity)), e.close && i.closePath(), this.drawShape(t, i, e, a, r, s), d.width > 0 && e.strokeColor && i.stroke(), e.fill && i.fill(), i.restore(), i.save(), i.translate(c.x, c.y), 0 !== e.angle && i.rotate(e.angle * Math.PI / 180), n && (i.globalCompositeOperation = "destination-out"), this.drawShapeAfterEffect(t, i, e, a, r, s), i.restore()
                }
                static drawShape(t, i, e, s, o, n) {
                    if (!e.shape) return;
                    const a = t.drawers.get(e.shape);
                    a && a.draw(i, e, s, o, n)
                }
                static drawShapeAfterEffect(t, i, e, s, o, n) {
                    if (!e.shape) return;
                    const a = t.drawers.get(e.shape);
                    (null == a ? void 0 : a.afterEffect) && a.afterEffect(i, e, s, o, n)
                }
                static drawPlugin(t, i, e) {
                    void 0 !== i.draw && (t.save(), i.draw(t, e), t.restore())
                }
                static drawLine(t, i, e) {
                    t.beginPath(), t.moveTo(i.x, i.y), t.lineTo(e.x, e.y), t.closePath()
                }
                static drawTriangle(t, i, e, s) {
                    t.beginPath(), t.moveTo(i.x, i.y), t.lineTo(e.x, e.y), t.lineTo(s.x, s.y), t.closePath()
                }
            }
            class I {
                constructor(t) {
                    this.container = t, this.size = {
                        height: 0,
                        width: 0
                    }, this.context = null, this.generatedCanvas = !1
                }
                init() {
                    this.resize();
                    const t = this.container.options,
                        i = t.backgroundMask.cover.color,
                        e = t.particles.move.trail;
                    this.coverColor = x.colorToRgb(i), this.trailFillColor = x.colorToRgb(e.fillColor), this.paint()
                }
                loadCanvas(t, i) {
                    var e;
                    t.className || (t.className = w.canvasClass), this.generatedCanvas && (null === (e = this.element) || void 0 === e || e.remove()), this.generatedCanvas = null != i && i, this.element = t, this.size.height = t.offsetHeight, this.size.width = t.offsetWidth, this.context = this.element.getContext("2d"), this.container.retina.init(), this.initBackground()
                }
                destroy() {
                    var t;
                    this.generatedCanvas && (null === (t = this.element) || void 0 === t || t.remove()), this.context && E.clear(this.context, this.size)
                }
                resize() {
                    this.element && (this.element.width = this.size.width, this.element.height = this.size.height)
                }
                paint() {
                    const t = this.container.options;
                    this.context && (t.backgroundMask.enable && t.backgroundMask.cover && this.coverColor ? this.paintBase(x.getStyleFromRgb(this.coverColor)) : this.paintBase())
                }
                clear() {
                    const t = this.container.options,
                        i = t.particles.move.trail;
                    t.backgroundMask.enable ? this.paint() : i.enable && i.length > 0 && this.trailFillColor ? this.paintBase(x.getStyleFromRgb(this.trailFillColor, 1 / i.length)) : this.context && E.clear(this.context, this.size)
                }
                drawLinkTriangle(t, i, e) {
                    var s, o;
                    const n = this.container,
                        a = n.options,
                        r = i.destination,
                        l = e.destination,
                        c = t.particlesOptions.links.triangles,
                        h = null !== (s = c.opacity) && void 0 !== s ? s : (i.opacity + e.opacity) / 2,
                        d = t.getPosition(),
                        u = r.getPosition(),
                        v = l.getPosition(),
                        p = this.context;
                    if (!p) return;
                    let m = x.colorToRgb(c.color);
                    if (!m) {
                        const i = t.particlesOptions.links,
                            e = void 0 !== i.id ? n.particles.linksColors[i.id] : n.particles.linksColor;
                        if (e === w.randomColorValue) m = x.getRandomRgbColor();
                        else if ("mid" === e) {
                            const i = t.getColor(),
                                e = r.getColor();
                            if (i && e) m = x.mix(i, e, t.size.value, r.size.value);
                            else {
                                const t = null != i ? i : e;
                                if (!t) return;
                                m = x.hslToRgb(t)
                            }
                        } else m = e
                    }
                    const y = null !== (o = t.linksWidth) && void 0 !== o ? o : n.retina.linksWidth;
                    E.drawLinkTriangle(p, y, d, u, v, a.backgroundMask.enable, m, h)
                }
                drawLinkLine(t, i) {
                    var e;
                    const s = this.container,
                        o = s.options,
                        n = i.destination;
                    let a = i.opacity;
                    const r = t.getPosition(),
                        l = n.getPosition(),
                        c = this.context;
                    if (!c) return;
                    let h;
                    const d = t.particlesOptions.twinkle.lines;
                    if (d.enable) {
                        const t = d.frequency,
                            i = x.colorToRgb(d.color);
                        Math.random() < t && void 0 !== i && (h = i, a = d.opacity)
                    }
                    if (!h) {
                        const i = t.particlesOptions.links,
                            e = void 0 !== i.id ? s.particles.linksColors[i.id] : s.particles.linksColor;
                        if (e === w.randomColorValue) h = x.getRandomRgbColor();
                        else if ("mid" === e) {
                            const i = t.getColor(),
                                e = n.getColor();
                            if (i && e) h = x.mix(i, e, t.size.value, n.size.value);
                            else {
                                const t = null != i ? i : e;
                                if (!t) return;
                                h = x.hslToRgb(t)
                            }
                        } else h = e
                    }
                    const u = null !== (e = t.linksWidth) && void 0 !== e ? e : s.retina.linksWidth;
                    E.drawLinkLine(c, u, r, l, t.particlesOptions.links.distance, s.canvas.size, t.particlesOptions.links.warp, o.backgroundMask.enable, h, a, t.particlesOptions.links.shadow)
                }
                drawConnectLine(t, i) {
                    var e;
                    const s = this.lineStyle(t, i);
                    if (!s) return;
                    const o = this.context;
                    if (!o) return;
                    const n = t.getPosition(),
                        a = i.getPosition();
                    E.drawConnectLine(o, null !== (e = t.linksWidth) && void 0 !== e ? e : this.container.retina.linksWidth, s, n, a)
                }
                drawGrabLine(t, i, e, s) {
                    var o;
                    const n = this.container,
                        a = n.canvas.context;
                    if (!a) return;
                    const r = t.getPosition();
                    E.drawGrabLine(a, null !== (o = t.linksWidth) && void 0 !== o ? o : n.retina.linksWidth, r, s, i, e)
                }
                drawParticle(t, i) {
                    var e, s;
                    const o = t.getColor();
                    if (void 0 === o) return;
                    const n = this.container.options,
                        a = t.particlesOptions.twinkle.particles,
                        r = a.frequency,
                        l = x.colorToRgb(a.color),
                        c = a.enable && Math.random() < r,
                        h = null !== (e = t.bubble.radius) && void 0 !== e ? e : t.size.value,
                        d = c ? a.opacity : null !== (s = t.bubble.opacity) && void 0 !== s ? s : t.opacity.value,
                        u = t.infectionStage,
                        v = n.infection.stages,
                        p = void 0 !== u ? v[u].color : void 0,
                        m = x.colorToRgb(p),
                        y = c && void 0 !== l ? l : null != m ? m : x.hslToRgb(o),
                        f = void 0 !== y ? x.getStyleFromRgb(y, d) : void 0;
                    if (this.context && f) {
                        if (t.links.length > 0) {
                            this.context.save();
                            for (const i of t.links) {
                                if (t.particlesOptions.links.triangles.enable) {
                                    const e = t.links.map(t => t.destination),
                                        s = i.destination.links.filter(t => e.indexOf(t.destination) >= 0);
                                    if (s.length)
                                        for (const e of s) this.drawLinkTriangle(t, i, e)
                                }
                                this.drawLinkLine(t, i)
                            }
                            this.context.restore()
                        }
                        E.drawParticle(this.container, this.context, t, i, f, n.backgroundMask.enable, h, d, t.particlesOptions.shadow)
                    }
                }
                drawPlugin(t, i) {
                    this.context && E.drawPlugin(this.context, t, i)
                }
                paintBase(t) {
                    this.context && E.paintBase(this.context, this.size, t)
                }
                lineStyle(t, i) {
                    const e = this.container.options.interactivity.modes.connect;
                    if (this.context) return E.gradient(this.context, t, i, e.links.opacity)
                }
                initBackground() {
                    const t = this.container.options.background,
                        i = this.element;
                    if (!i) return;
                    const e = i.style;
                    if (t.color) {
                        const i = x.colorToRgb(t.color);
                        i && (e.backgroundColor = x.getStyleFromRgb(i, t.opacity))
                    }
                    t.image && (e.backgroundImage = t.image), t.position && (e.backgroundPosition = t.position), t.repeat && (e.backgroundRepeat = t.repeat), t.size && (e.backgroundSize = t.size)
                }
            } ! function (t) {
                t.bubble = "bubble", t.connect = "connect", t.grab = "grab", t.repulse = "repulse", t.slow = "slow"
            }(a || (a = {}));
            class D {
                constructor(t, i) {
                    this.container = t, this.particle = i
                }
                move(t) {
                    this.moveParticle(t), this.moveParallax()
                }
                moveParticle(t) {
                    var i;
                    const e = this.particle,
                        s = e.particlesOptions;
                    if (!s.move.enable) return;
                    const o = this.container,
                        n = o.options,
                        a = this.getProximitySpeedFactor(),
                        r = n.fpsLimit > 0 ? 60 * t / 1e3 : 3.6,
                        l = (null !== (i = e.moveSpeed) && void 0 !== i ? i : o.retina.moveSpeed) / 2 * a * r;
                    this.applyNoise(t), e.position.x += e.velocity.horizontal * l, e.position.y += e.velocity.vertical * l, s.move.vibrate && (e.position.x += Math.sin(e.position.x * Math.cos(e.position.y)), e.position.y += Math.cos(e.position.y * Math.sin(e.position.x)))
                }
                applyNoise(t) {
                    const i = this.particle;
                    if (!i.particlesOptions.move.noise.enable) return;
                    const e = this.container;
                    if (i.lastNoiseTime <= i.noiseDelay) return void (i.lastNoiseTime += t);
                    const s = e.noise.generate(i);
                    i.velocity.horizontal += Math.cos(s.angle) * s.length, i.velocity.horizontal = z.clamp(i.velocity.horizontal, -1, 1), i.velocity.vertical += Math.sin(s.angle) * s.length, i.velocity.vertical = z.clamp(i.velocity.vertical, -1, 1), i.lastNoiseTime -= i.noiseDelay
                }
                moveParallax() {
                    const t = this.container,
                        i = t.options;
                    if (!i.interactivity.events.onHover.parallax.enable) return;
                    const e = this.particle,
                        s = i.interactivity.events.onHover.parallax.force,
                        o = t.interactivity.mouse.position;
                    if (!o) return;
                    const n = window.innerHeight / 2,
                        a = window.innerWidth / 2,
                        r = i.interactivity.events.onHover.parallax.smooth,
                        l = (o.x - a) * (e.size.value / s),
                        c = (o.y - n) * (e.size.value / s);
                    e.offset.x += (l - e.offset.x) / r, e.offset.y += (c - e.offset.y) / r
                }
                getProximitySpeedFactor() {
                    const t = this.container,
                        i = t.options;
                    if (!z.isInArray(a.slow, i.interactivity.events.onHover.mode)) return 1;
                    const e = this.container.interactivity.mouse.position;
                    if (!e) return 1;
                    const s = this.particle.getPosition(),
                        o = z.getDistance(e, s),
                        n = t.retina.slowModeRadius;
                    if (o > n) return 1;
                    return (o / n || 0) / i.interactivity.modes.slow.factor
                }
            } ! function (t) {
                t[t.increasing = 0] = "increasing", t[t.decreasing = 1] = "decreasing"
            }(r || (r = {})),
                function (t) {
                    t[t.increasing = 0] = "increasing", t[t.decreasing = 1] = "decreasing"
                }(l || (l = {})),
                function (t) {
                    t.none = "none", t.max = "max", t.min = "min"
                }(c || (c = {})),
                function (t) {
                    t.clockwise = "clockwise", t.counterClockwise = "counter-clockwise", t.random = "random"
                }(h || (h = {})),
                function (t) {
                    t.bounce = "bounce", t.bounceHorizontal = "bounce-horizontal", t.bounceVertical = "bounce-vertical", t.out = "out", t.destroy = "destroy"
                }(d || (d = {}));
            class L {
                constructor(t, i) {
                    this.container = t, this.particle = i, this.mover = new D(t, i)
                }
                static checkBounds(t, i, e, s, o) {
                    (t + i > e && s > 0 || t - i < 0 && s < 0) && o()
                }
                update(t) {
                    this.mover.move(t), this.updateOpacity(t), this.updateSize(t), this.updateAngle(t), this.updateColor(t), this.fixOutOfCanvasPosition(), this.updateOutMode(t)
                }
                updateOpacity(t) {
                    const i = this.container.options,
                        e = this.particle,
                        s = i.fpsLimit > 0 ? 60 * t / 1e3 : 3.6;
                    if (e.particlesOptions.opacity.animation.enable) {
                        switch (e.opacity.status) {
                            case r.increasing:
                                e.opacity.value >= e.particlesOptions.opacity.value ? e.opacity.status = r.decreasing : e.opacity.value += (e.opacity.velocity || 0) * s;
                                break;
                            case r.decreasing:
                                e.opacity.value <= e.particlesOptions.opacity.animation.minimumValue ? e.opacity.status = r.increasing : e.opacity.value -= (e.opacity.velocity || 0) * s
                        }
                        e.opacity.value < 0 && (e.opacity.value = 0)
                    }
                }
                updateSize(t) {
                    var i;
                    const e = this.container,
                        s = e.options,
                        o = this.particle,
                        n = s.fpsLimit > 0 ? 60 * t / 1e3 : 3.6,
                        a = o.particlesOptions.size,
                        r = a.animation;
                    if (r.enable) {
                        switch (o.size.status) {
                            case l.increasing:
                                o.size.value >= (null !== (i = o.sizeValue) && void 0 !== i ? i : e.retina.sizeValue) ? o.size.status = l.decreasing : o.size.value += (o.size.velocity || 0) * n;
                                break;
                            case l.decreasing:
                                o.size.value <= r.minimumValue ? o.size.status = l.increasing : o.size.value -= (o.size.velocity || 0) * n
                        }
                        switch (r.destroy) {
                            case c.max:
                                o.size.value >= a.value * e.retina.pixelRatio && o.destroy();
                                break;
                            case c.min:
                                o.size.value <= r.minimumValue * e.retina.pixelRatio && o.destroy()
                        }
                        o.size.value < 0 && !o.destroyed && (o.size.value = 0)
                    }
                }
                updateAngle(t) {
                    const i = this.container.options,
                        e = this.particle,
                        s = i.fpsLimit > 0 ? 60 * t / 1e3 : 3.6;
                    if (e.particlesOptions.rotate.animation.enable) switch (e.rotateDirection) {
                        case h.clockwise:
                            e.angle += e.particlesOptions.rotate.animation.speed * Math.PI / 18 * s, e.angle > 360 && (e.angle -= 360);
                            break;
                        case h.counterClockwise:
                        default:
                            e.angle -= e.particlesOptions.rotate.animation.speed * Math.PI / 18 * s, e.angle < 0 && (e.angle += 360)
                    }
                }
                updateColor(t) {
                    const i = this.container.options,
                        e = this.particle;
                    if (void 0 === e.color) return;
                    const s = i.fpsLimit > 0 ? 60 * t / 1e3 : 3.6;
                    e.particlesOptions.color.animation.enable && (e.color.h += (e.colorVelocity || 0) * s, e.color.h > 360 && (e.color.h -= 360))
                }
                fixOutOfCanvasPosition() {
                    const t = this.container,
                        i = this.particle,
                        e = i.particlesOptions.move.outMode,
                        s = i.particlesOptions.move.warp,
                        o = t.canvas.size;
                    let n;
                    if (n = e === d.bounce ? {
                        bottom: o.height,
                        left: i.size.value,
                        right: o.width,
                        top: i.size.value
                    } : e === d.bounceHorizontal ? {
                        bottom: o.height + i.size.value - i.offset.y,
                        left: i.size.value,
                        right: o.width,
                        top: -i.size.value - i.offset.y
                    } : e === d.bounceVertical ? {
                        bottom: o.height,
                        left: -i.size.value - i.offset.x,
                        right: o.width + i.size.value + i.offset.x,
                        top: i.size.value
                    } : {
                                    bottom: o.height + i.size.value - i.offset.y,
                                    left: -i.size.value - i.offset.x,
                                    right: o.width + i.size.value + i.offset.x,
                                    top: -i.size.value - i.offset.y
                                }, e === d.destroy) {
                        const e = i.size.value;
                        z.isPointInside(i.position, t.canvas.size, e) || t.particles.remove(i)
                    } else {
                        const t = i.size.value,
                            e = z.calculateBounds(i.position, t);
                        e.left > o.width - i.offset.x ? (i.position.x = n.left, s || (i.position.y = Math.random() * o.height)) : e.right < -i.offset.x && (i.position.x = n.right, s || (i.position.y = Math.random() * o.height)), e.top > o.height - i.offset.y ? (s || (i.position.x = Math.random() * o.width), i.position.y = n.top) : e.bottom < -i.offset.y && (s || (i.position.x = Math.random() * o.width), i.position.y = n.bottom)
                    }
                }
                updateOutMode(t) {
                    switch (this.particle.particlesOptions.move.outMode) {
                        case d.bounce:
                        case d.bounceVertical:
                        case d.bounceHorizontal:
                            this.updateBounce(t)
                    }
                }
                updateBounce(t) {
                    const i = this.container,
                        e = this.particle;
                    let s = !1;
                    for (const [, o] of i.plugins)
                        if (void 0 !== o.particleBounce && (s = o.particleBounce(e, t)), s) break;
                    if (!s) {
                        const t = e.particlesOptions.move.outMode,
                            s = e.getPosition();
                        if (t === d.bounce || t === d.bounceHorizontal) {
                            const t = e.size.value,
                                o = e.velocity.horizontal;
                            L.checkBounds(s.x, t, i.canvas.size.width, o, () => {
                                e.velocity.horizontal *= -1
                            })
                        }
                        if (t === d.bounce || t === d.bounceVertical) {
                            const t = e.size.value,
                                o = e.velocity.vertical;
                            L.checkBounds(s.y, t, i.canvas.size.height, o, () => {
                                e.velocity.vertical *= -1
                            })
                        }
                    }
                }
            }
            class V {
                constructor() {
                    this.value = "#fff"
                }
                static create(t, i) {
                    const e = null != t ? t : new V;
                    return void 0 !== i && e.load("string" == typeof i ? {
                        value: i
                    } : i), e
                }
                load(t) {
                    void 0 !== (null == t ? void 0 : t.value) && (this.value = t.value)
                }
            }
            class H {
                constructor() {
                    this.blur = 5, this.color = new V, this.enable = !1, this.color.value = "lime"
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.blur && (this.blur = t.blur), this.color = V.create(this.color, t.color), void 0 !== t.enable && (this.enable = t.enable))
                }
            }
            class _ {
                constructor() {
                    this.enable = !1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.opacity && (this.opacity = t.opacity))
                }
            }
            class F {
                constructor() {
                    this.blink = !1, this.color = new V, this.consent = !1, this.distance = 100, this.enable = !1, this.opacity = 1, this.shadow = new H, this.triangles = new _, this.width = 1, this.warp = !1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.id && (this.id = t.id), void 0 !== t.blink && (this.blink = t.blink), this.color = V.create(this.color, t.color), void 0 !== t.consent && (this.consent = t.consent), void 0 !== t.distance && (this.distance = t.distance), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.opacity && (this.opacity = t.opacity), this.shadow.load(t.shadow), this.triangles.load(t.triangles), void 0 !== t.width && (this.width = t.width), void 0 !== t.warp && (this.warp = t.warp))
                }
            }
            class B {
                constructor() {
                    this.enable = !1, this.rotate = {
                        x: 3e3,
                        y: 3e3
                    }
                }
                get rotateX() {
                    return this.rotate.x
                }
                set rotateX(t) {
                    this.rotate.x = t
                }
                get rotateY() {
                    return this.rotate.y
                }
                set rotateY(t) {
                    this.rotate.y = t
                }
                load(t) {
                    var i, e, s, o;
                    if (void 0 === t) return;
                    void 0 !== t.enable && (this.enable = t.enable);
                    const n = null !== (e = null === (i = t.rotate) || void 0 === i ? void 0 : i.x) && void 0 !== e ? e : t.rotateX;
                    void 0 !== n && (this.rotate.x = n);
                    const a = null !== (o = null === (s = t.rotate) || void 0 === s ? void 0 : s.y) && void 0 !== o ? o : t.rotateY;
                    void 0 !== a && (this.rotate.y = a)
                }
            }
            class q {
                constructor() {
                    this.enable = !1, this.length = 10, this.fillColor = new V, this.fillColor.value = "#000000"
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), this.fillColor = V.create(this.fillColor, t.fillColor), void 0 !== t.length && (this.length = t.length))
                }
            }
            class W {
                constructor() {
                    this.enable = !1, this.minimumValue = 0
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.minimumValue && (this.minimumValue = t.minimumValue))
                }
            }
            class N {
                constructor() {
                    this.random = new W, this.value = 0
                }
                load(t) {
                    var i;
                    void 0 !== t && (null === (i = this.random) || void 0 === i || i.load(t.random), void 0 !== t.value && (this.value = t.value))
                }
            }
            class U {
                constructor() {
                    this.delay = new N, this.enable = !1
                }
                load(t) {
                    void 0 !== t && (this.delay.load(t.delay), void 0 !== t.enable && (this.enable = t.enable))
                }
            }
            class G {
                constructor() {
                    this.angle = 90, this.attract = new B, this.direction = o.none, this.enable = !1, this.noise = new U, this.outMode = d.out, this.random = !1, this.speed = 2, this.straight = !1, this.trail = new q, this.vibrate = !1, this.warp = !1
                }
                get collisions() {
                    return !1
                }
                set collisions(t) { }
                get bounce() {
                    return this.collisions
                }
                set bounce(t) {
                    this.collisions = t
                }
                get out_mode() {
                    return this.outMode
                }
                set out_mode(t) {
                    this.outMode = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    void 0 !== t.angle && (this.angle = t.angle), this.attract.load(t.attract), void 0 !== t.direction && (this.direction = t.direction), void 0 !== t.enable && (this.enable = t.enable), this.noise.load(t.noise);
                    const e = null !== (i = t.outMode) && void 0 !== i ? i : t.out_mode;
                    void 0 !== e && (this.outMode = e), void 0 !== t.random && (this.random = t.random), void 0 !== t.speed && (this.speed = t.speed), void 0 !== t.straight && (this.straight = t.straight), this.trail.load(t.trail), void 0 !== t.vibrate && (this.vibrate = t.vibrate), void 0 !== t.warp && (this.warp = t.warp)
                }
            }
            class j {
                constructor() {
                    this.enable = !1, this.area = 800, this.factor = 1e3
                }
                get value_area() {
                    return this.area
                }
                set value_area(t) {
                    this.area = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    void 0 !== t.enable && (this.enable = t.enable);
                    const e = null !== (i = t.area) && void 0 !== i ? i : t.value_area;
                    void 0 !== e && (this.area = e), void 0 !== t.factor && (this.factor = t.factor)
                }
            }
            class $ {
                constructor() {
                    this.density = new j, this.limit = 0, this.value = 100
                }
                get max() {
                    return this.limit
                }
                set max(t) {
                    this.limit = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    this.density.load(t.density);
                    const e = null !== (i = t.limit) && void 0 !== i ? i : t.max;
                    void 0 !== e && (this.limit = e), void 0 !== t.value && (this.value = t.value)
                }
            }
            class J {
                constructor() {
                    this.enable = !1, this.minimumValue = 0, this.speed = 2, this.sync = !1
                }
                get opacity_min() {
                    return this.minimumValue
                }
                set opacity_min(t) {
                    this.minimumValue = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    void 0 !== t.enable && (this.enable = t.enable);
                    const e = null !== (i = t.minimumValue) && void 0 !== i ? i : t.opacity_min;
                    void 0 !== e && (this.minimumValue = e), void 0 !== t.speed && (this.speed = t.speed), void 0 !== t.sync && (this.sync = t.sync)
                }
            }
            class X {
                constructor() {
                    this.enable = !1, this.minimumValue = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.minimumValue && (this.minimumValue = t.minimumValue))
                }
            }
            class Y {
                constructor() {
                    this.animation = new J, this.random = new X, this.value = 1
                }
                get anim() {
                    return this.animation
                }
                set anim(t) {
                    this.animation = t
                }
                load(t) {
                    var i;
                    void 0 !== t && (this.animation.load(null !== (i = t.animation) && void 0 !== i ? i : t.anim), void 0 !== t.random && ("boolean" == typeof t.random ? this.random.enable = t.random : this.random.load(t.random)), void 0 !== t.value && (this.value = t.value))
                }
            }
            class Q {
                constructor() {
                    this.options = {}, this.type = n.circle
                }
                get image() {
                    var t;
                    return null !== (t = this.options[n.image]) && void 0 !== t ? t : this.options[n.images]
                }
                set image(t) {
                    this.options[n.image] = t, this.options[n.images] = t
                }
                get custom() {
                    return this.options
                }
                set custom(t) {
                    this.options = t
                }
                get images() {
                    return this.image instanceof Array ? this.image : [this.image]
                }
                set images(t) {
                    this.image = t
                }
                get stroke() {
                    return []
                }
                set stroke(t) { }
                get character() {
                    var t;
                    return null !== (t = this.options[n.character]) && void 0 !== t ? t : this.options[n.char]
                }
                set character(t) {
                    this.options[n.character] = t, this.options[n.char] = t
                }
                get polygon() {
                    var t;
                    return null !== (t = this.options[n.polygon]) && void 0 !== t ? t : this.options[n.star]
                }
                set polygon(t) {
                    this.options[n.polygon] = t, this.options[n.star] = t
                }
                load(t) {
                    var i, e, s;
                    if (void 0 === t) return;
                    const o = null !== (i = t.options) && void 0 !== i ? i : t.custom;
                    if (void 0 !== o)
                        for (const t in o) {
                            const i = o[t];
                            void 0 !== i && (this.options[t] = z.deepExtend(null !== (e = this.options[t]) && void 0 !== e ? e : {}, i))
                        }
                    this.loadShape(t.character, n.character, n.char, !0), this.loadShape(t.polygon, n.polygon, n.star, !1), this.loadShape(null !== (s = t.image) && void 0 !== s ? s : t.images, n.image, n.images, !0), void 0 !== t.type && (this.type = t.type)
                }
                loadShape(t, i, e, s) {
                    var o, n, a, r;
                    void 0 !== t && (t instanceof Array ? (this.options[i] instanceof Array || (this.options[i] = [], this.options[e] && !s || (this.options[e] = [])), this.options[i] = z.deepExtend(null !== (o = this.options[i]) && void 0 !== o ? o : [], t), this.options[e] && !s || (this.options[e] = z.deepExtend(null !== (n = this.options[e]) && void 0 !== n ? n : [], t))) : (this.options[i] instanceof Array && (this.options[i] = {}, this.options[e] && !s || (this.options[e] = {})), this.options[i] = z.deepExtend(null !== (a = this.options[i]) && void 0 !== a ? a : {}, t), this.options[e] && !s || (this.options[e] = z.deepExtend(null !== (r = this.options[e]) && void 0 !== r ? r : {}, t))))
                }
            } ! function (t) {
                t.max = "max", t.min = "min"
            }(u || (u = {}));
            class Z {
                constructor() {
                    this.destroy = c.none, this.enable = !1, this.minimumValue = 0, this.speed = 5, this.startValue = u.max, this.sync = !1
                }
                get size_min() {
                    return this.minimumValue
                }
                set size_min(t) {
                    this.minimumValue = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    void 0 !== t.destroy && (this.destroy = t.destroy), void 0 !== t.enable && (this.enable = t.enable);
                    const e = null !== (i = t.minimumValue) && void 0 !== i ? i : t.size_min;
                    void 0 !== e && (this.minimumValue = e), void 0 !== t.speed && (this.speed = t.speed), void 0 !== t.startValue && (this.startValue = t.startValue), void 0 !== t.sync && (this.sync = t.sync)
                }
            }
            class K {
                constructor() {
                    this.enable = !1, this.minimumValue = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.minimumValue && (this.minimumValue = t.minimumValue))
                }
            }
            class tt {
                constructor() {
                    this.animation = new Z, this.random = new K, this.value = 3
                }
                get anim() {
                    return this.animation
                }
                set anim(t) {
                    this.animation = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    const e = null !== (i = t.animation) && void 0 !== i ? i : t.anim;
                    void 0 !== e && this.animation.load(e), void 0 !== t.random && ("boolean" == typeof t.random ? this.random.enable = t.random : this.random.load(t.random)), void 0 !== t.value && (this.value = t.value)
                }
            }
            class it {
                constructor() {
                    this.enable = !1, this.speed = 0, this.sync = !1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.speed && (this.speed = t.speed), void 0 !== t.sync && (this.sync = t.sync))
                }
            }
            class et {
                constructor() {
                    this.animation = new it, this.direction = h.clockwise, this.random = !1, this.value = 0
                }
                load(t) {
                    void 0 !== t && (this.animation.load(t.animation), void 0 !== t.random && (this.random = t.random), void 0 !== t.direction && (this.direction = t.direction), void 0 !== t.value && (this.value = t.value))
                }
            }
            class st {
                constructor() {
                    this.blur = 0, this.color = new V, this.enable = !1, this.offset = {
                        x: 0,
                        y: 0
                    }, this.color.value = "#000000"
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.blur && (this.blur = t.blur), this.color = V.create(this.color, t.color), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.offset && (void 0 !== t.offset.x && (this.offset.x = t.offset.x), void 0 !== t.offset.y && (this.offset.y = t.offset.y)))
                }
            }
            class ot {
                constructor() {
                    this.color = new V, this.width = 0, this.opacity = 1, this.color.value = "#ff0000"
                }
                load(t) {
                    void 0 !== t && (this.color = V.create(this.color, t.color), void 0 !== t.width && (this.width = t.width), void 0 !== t.opacity && (this.opacity = t.opacity))
                }
            } ! function (t) {
                t.absorb = "absorb", t.bounce = "bounce", t.destroy = "destroy"
            }(v || (v = {}));
            class nt {
                constructor() {
                    this.enable = !1, this.mode = v.bounce
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.mode && (this.mode = t.mode))
                }
            }
            class at {
                constructor() {
                    this.enable = !1, this.frequency = .05, this.opacity = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.frequency && (this.frequency = t.frequency), void 0 !== t.opacity && (this.opacity = t.opacity))
                }
            }
            class rt {
                constructor() {
                    this.lines = new at, this.particles = new at
                }
                load(t) {
                    void 0 !== t && (this.lines.load(t.lines), this.particles.load(t.particles))
                }
            }
            class lt {
                constructor() {
                    this.enable = !1, this.speed = 1, this.sync = !0
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.speed && (this.speed = t.speed), void 0 !== t.sync && (this.sync = t.sync))
                }
            }
            class ct extends V {
                constructor() {
                    super(), this.animation = new lt
                }
                static create(t, i) {
                    const e = null != t ? t : new ct;
                    return void 0 !== i && e.load("string" == typeof i ? {
                        value: i
                    } : i), e
                }
                load(t) {
                    super.load(t), this.animation.load(null == t ? void 0 : t.animation)
                }
            }
            class ht {
                constructor() {
                    this.collisions = new nt, this.color = new ct, this.links = new F, this.move = new G, this.number = new $, this.opacity = new Y, this.rotate = new et, this.shadow = new st, this.shape = new Q, this.size = new tt, this.stroke = new ot, this.twinkle = new rt
                }
                get line_linked() {
                    return this.links
                }
                set line_linked(t) {
                    this.links = t
                }
                get lineLinked() {
                    return this.links
                }
                set lineLinked(t) {
                    this.links = t
                }
                load(t) {
                    var i, e, s, o, n, a, r;
                    if (void 0 === t) return;
                    void 0 !== t.color && (this.color = ct.create(this.color, t.color));
                    const l = null !== (e = null !== (i = t.links) && void 0 !== i ? i : t.lineLinked) && void 0 !== e ? e : t.line_linked;
                    void 0 !== l && this.links.load(l), this.move.load(t.move), this.number.load(t.number), this.opacity.load(t.opacity), this.rotate.load(t.rotate), this.shape.load(t.shape), this.size.load(t.size), this.shadow.load(t.shadow), this.twinkle.load(t.twinkle);
                    const c = null !== (o = null === (s = t.move) || void 0 === s ? void 0 : s.collisions) && void 0 !== o ? o : null === (n = t.move) || void 0 === n ? void 0 : n.bounce;
                    void 0 !== c && (this.collisions.enable = c), this.collisions.load(t.collisions);
                    const h = null !== (a = t.stroke) && void 0 !== a ? a : null === (r = t.shape) || void 0 === r ? void 0 : r.stroke;
                    void 0 !== h && (h instanceof Array ? this.stroke = h.map(t => {
                        const i = new ot;
                        return i.load(t), i
                    }) : (this.stroke instanceof Array && (this.stroke = new ot), this.stroke.load(h)))
                }
            }
            class dt {
                constructor(t, i, e) {
                    var s, o, a, c, d, v, p, m, y, f, g, b, w, k, P, S, A;
                    this.container = t, this.fill = !0, this.close = !0, this.links = [], this.lastNoiseTime = 0, this.destroyed = !1;
                    const C = t.options,
                        O = new ht;
                    if (O.load(C.particles), void 0 !== (null == e ? void 0 : e.shape)) {
                        const t = null !== (s = e.shape.type) && void 0 !== s ? s : O.shape.type;
                        this.shape = t instanceof Array ? z.itemFromArray(t) : t;
                        const i = new Q;
                        if (i.load(e.shape), void 0 !== this.shape) {
                            const t = i.options[this.shape];
                            void 0 !== t && (this.shapeData = z.deepExtend({}, t instanceof Array ? z.itemFromArray(t) : t), this.fill = null !== (a = null === (o = this.shapeData) || void 0 === o ? void 0 : o.fill) && void 0 !== a ? a : this.fill, this.close = null !== (d = null === (c = this.shapeData) || void 0 === c ? void 0 : c.close) && void 0 !== d ? d : this.close)
                        }
                    } else {
                        const t = O.shape.type;
                        this.shape = t instanceof Array ? z.itemFromArray(t) : t;
                        const i = O.shape.options[this.shape];
                        i && (this.shapeData = z.deepExtend({}, i instanceof Array ? z.itemFromArray(i) : i), this.fill = null !== (p = null === (v = this.shapeData) || void 0 === v ? void 0 : v.fill) && void 0 !== p ? p : this.fill, this.close = null !== (y = null === (m = this.shapeData) || void 0 === m ? void 0 : m.close) && void 0 !== y ? y : this.close)
                    }
                    void 0 !== e && O.load(e), void 0 !== (null === (f = this.shapeData) || void 0 === f ? void 0 : f.particles) && O.load(null === (g = this.shapeData) || void 0 === g ? void 0 : g.particles), this.particlesOptions = O;
                    const T = this.particlesOptions.move.noise.delay;
                    this.noiseDelay = 1e3 * (T.random.enable ? z.randomInRange(T.random.minimumValue, T.value) : T.value), t.retina.initParticle(this);
                    const R = this.particlesOptions.color,
                        E = null !== (b = this.sizeValue) && void 0 !== b ? b : t.retina.sizeValue,
                        I = "boolean" == typeof this.particlesOptions.size.random ? this.particlesOptions.size.random : this.particlesOptions.size.random.enable;
                    if (this.size = {
                        value: I && void 0 !== this.randomMinimumSize ? z.randomInRange(this.randomMinimumSize, E) : E
                    }, this.direction = this.particlesOptions.move.direction, this.bubble = {
                        inRange: !1
                    }, this.angle = this.particlesOptions.rotate.random ? 360 * Math.random() : this.particlesOptions.rotate.value, this.particlesOptions.rotate.direction === h.random) {
                        const t = Math.floor(2 * Math.random());
                        this.rotateDirection = t > 0 ? h.counterClockwise : h.clockwise
                    } else this.rotateDirection = this.particlesOptions.rotate.direction;
                    if (this.particlesOptions.size.animation.enable) {
                        switch (this.particlesOptions.size.animation.startValue) {
                            case u.min:
                                if (!I) {
                                    const i = t.retina.pixelRatio;
                                    this.size.value = this.particlesOptions.size.animation.minimumValue * i
                                }
                        }
                        this.size.status = l.increasing, this.size.velocity = (null !== (w = this.sizeAnimationSpeed) && void 0 !== w ? w : t.retina.sizeAnimationSpeed) / 100, this.particlesOptions.size.animation.sync || (this.size.velocity = this.size.velocity * Math.random())
                    }
                    this.particlesOptions.color.animation.enable ? (this.colorVelocity = this.particlesOptions.color.animation.speed / 100, this.particlesOptions.color.animation.sync || (this.colorVelocity = this.colorVelocity * Math.random())) : this.colorVelocity = 0, this.particlesOptions.rotate.animation.enable && (this.particlesOptions.rotate.animation.sync || (this.angle = 360 * Math.random())), this.position = this.calcPosition(this.container, i), this.offset = {
                        x: 0,
                        y: 0
                    }, this.particlesOptions.collisions.enable && this.checkOverlap(i), this.color = x.colorToHsl(R);
                    const D = this.particlesOptions.opacity.random,
                        V = this.particlesOptions.opacity.value;
                    this.opacity = {
                        value: D.enable ? z.randomInRange(D.minimumValue, V) : V
                    }, this.particlesOptions.opacity.animation.enable && (this.opacity.status = r.increasing, this.opacity.velocity = this.particlesOptions.opacity.animation.speed / 100, this.particlesOptions.opacity.animation.sync || (this.opacity.velocity *= Math.random())), this.initialVelocity = this.calculateVelocity(), this.velocity = {
                        horizontal: this.initialVelocity.horizontal,
                        vertical: this.initialVelocity.vertical
                    };
                    let H = t.drawers.get(this.shape);
                    if (H || (H = M.getShapeDrawer(this.shape), H && t.drawers.set(this.shape, H)), this.shape === n.image || this.shape === n.images) {
                        const i = H,
                            e = this.particlesOptions.shape.options[this.shape],
                            s = i.getImages(t).images,
                            o = s[z.arrayRandomIndex(s)],
                            n = e instanceof Array ? e.filter(t => t.src === o.source)[0] : e,
                            a = this.getColor();
                        if (void 0 !== (null == o ? void 0 : o.svgData) && n.replaceColor && a) {
                            const t = z.replaceColorSvg(o, a, this.opacity.value),
                                i = new Blob([t], {
                                    type: "image/svg+xml"
                                }),
                                e = window.URL || window.webkitURL || window,
                                s = e.createObjectURL(i),
                                r = new Image;
                            this.image = {
                                data: o,
                                loaded: !1,
                                ratio: n.width / n.height,
                                replaceColor: null !== (k = n.replaceColor) && void 0 !== k ? k : n.replace_color,
                                source: n.src
                            }, r.addEventListener("load", () => {
                                this.image && (this.image.loaded = !0, o.element = r), e.revokeObjectURL(s)
                            }), r.addEventListener("error", () => {
                                e.revokeObjectURL(s), z.loadImage(n.src).then(t => {
                                    this.image && (o.element = t.element, this.image.loaded = !0)
                                })
                            }), r.src = s
                        } else this.image = {
                            data: o,
                            loaded: !0,
                            ratio: n.width / n.height,
                            replaceColor: null !== (P = n.replaceColor) && void 0 !== P ? P : n.replace_color,
                            source: n.src
                        };
                        this.image.ratio || (this.image.ratio = 1), this.fill = null !== (S = n.fill) && void 0 !== S ? S : this.fill, this.close = null !== (A = n.close) && void 0 !== A ? A : this.close
                    }
                    this.stroke = this.particlesOptions.stroke instanceof Array ? z.itemFromArray(this.particlesOptions.stroke) : this.particlesOptions.stroke, this.strokeColor = x.colorToRgb(this.stroke.color), this.shadowColor = x.colorToRgb(this.particlesOptions.shadow.color), this.updater = new L(this.container, this)
                }
                update(t) {
                    this.links = [], this.updater.update(t)
                }
                draw(t) {
                    var i;
                    !1 !== (null === (i = this.image) || void 0 === i ? void 0 : i.loaded) && this.container.canvas.drawParticle(this, t)
                }
                isOverlapping() {
                    const t = this.container;
                    let i = !1,
                        e = 0;
                    const s = this.getPosition();
                    for (const o of t.particles.array.filter(t => t != this)) {
                        e++;
                        const t = o.getPosition();
                        if (z.getDistance(s, t) <= this.size.value + o.size.value) {
                            i = !0;
                            break
                        }
                    }
                    return {
                        collisionFound: i,
                        iterations: e
                    }
                }
                checkOverlap(t) {
                    const i = this.container,
                        e = this.isOverlapping();
                    e.iterations >= i.particles.count ? i.particles.remove(this) : e.collisionFound && (this.position.x = t ? t.x : Math.random() * i.canvas.size.width, this.position.y = t ? t.y : Math.random() * i.canvas.size.height, this.checkOverlap())
                }
                startInfection(t) {
                    t > this.container.options.infection.stages.length || t < 0 || (this.infectionDelay = 0, this.infectionDelayStage = t)
                }
                updateInfectionStage(t) {
                    t > this.container.options.infection.stages.length || t < 0 || void 0 !== this.infectionStage && this.infectionStage > t || (void 0 !== this.infectionTimeout && window.clearTimeout(this.infectionTimeout), this.infectionStage = t, this.infectionTime = 0)
                }
                updateInfection(t) {
                    const i = this.container.options,
                        e = i.infection,
                        s = i.infection.stages,
                        o = s.length;
                    if (void 0 !== this.infectionDelay && void 0 !== this.infectionDelayStage) {
                        const i = this.infectionDelayStage;
                        if (i > o || i < 0) return;
                        this.infectionDelay > 1e3 * e.delay ? (this.infectionStage = i, this.infectionTime = 0, delete this.infectionDelay, delete this.infectionDelayStage) : this.infectionDelay += t
                    } else delete this.infectionDelay, delete this.infectionDelayStage;
                    if (void 0 !== this.infectionStage && void 0 !== this.infectionTime) {
                        const i = s[this.infectionStage];
                        void 0 !== i.duration && i.duration >= 0 && this.infectionTime > 1e3 * i.duration ? this.nextInfectionStage() : this.infectionTime += t
                    } else delete this.infectionStage, delete this.infectionTime
                }
                getPosition() {
                    return {
                        x: this.position.x + this.offset.x,
                        y: this.position.y + this.offset.y
                    }
                }
                getColor() {
                    var t;
                    return null !== (t = this.bubble.color) && void 0 !== t ? t : this.color
                }
                destroy() {
                    this.destroyed = !0
                }
                nextInfectionStage() {
                    const t = this.container.options,
                        i = t.infection.stages.length;
                    if (!(i <= 0 || void 0 === this.infectionStage) && (this.infectionTime = 0, i <= ++this.infectionStage)) {
                        if (t.infection.cure) return delete this.infectionStage, void delete this.infectionTime;
                        this.infectionStage = 0, this.infectionTime = 0
                    }
                }
                calcPosition(t, i) {
                    var e, s;
                    for (const [, e] of t.plugins) {
                        const t = void 0 !== e.particlePosition ? e.particlePosition(i, this) : void 0;
                        if (void 0 !== t) return z.deepExtend({}, t)
                    }
                    const o = {
                        x: null !== (e = null == i ? void 0 : i.x) && void 0 !== e ? e : Math.random() * t.canvas.size.width,
                        y: null !== (s = null == i ? void 0 : i.y) && void 0 !== s ? s : Math.random() * t.canvas.size.height
                    },
                        n = this.particlesOptions.move.outMode;
                    return (z.isInArray(n, d.bounce) || z.isInArray(n, d.bounceHorizontal)) && (o.x > t.canvas.size.width - 2 * this.size.value ? o.x -= this.size.value : o.x < 2 * this.size.value && (o.x += this.size.value)), (z.isInArray(n, d.bounce) || z.isInArray(n, d.bounceVertical)) && (o.y > t.canvas.size.height - 2 * this.size.value ? o.y -= this.size.value : o.y < 2 * this.size.value && (o.y += this.size.value)), o
                }
                calculateVelocity() {
                    const t = z.getParticleBaseVelocity(this),
                        i = {
                            horizontal: 0,
                            vertical: 0
                        },
                        e = this.particlesOptions.move,
                        s = Math.PI / 180 * e.angle,
                        o = Math.PI / 4,
                        n = {
                            left: Math.sin(o + s / 2) - Math.sin(o - s / 2),
                            right: Math.cos(o + s / 2) - Math.cos(o - s / 2)
                        };
                    return e.straight ? (i.horizontal = t.x, i.vertical = t.y, e.random && (i.horizontal += z.randomInRange(n.left, n.right) / 2, i.vertical += z.randomInRange(n.left, n.right) / 2)) : (i.horizontal = t.x + z.randomInRange(n.left, n.right) / 2, i.vertical = t.y + z.randomInRange(n.left, n.right) / 2), i
                }
            }
            class ut {
                constructor(t, i) {
                    this.position = {
                        x: t,
                        y: i
                    }
                }
            }
            class vt extends ut {
                constructor(t, i, e, s) {
                    super(t, i), this.size = {
                        height: s,
                        width: e
                    }
                }
                contains(t) {
                    return t.x >= this.position.x && t.x <= this.position.x + this.size.width && t.y >= this.position.y && t.y <= this.position.y + this.size.height
                }
                intersects(t) {
                    const i = t,
                        e = t,
                        s = this.size.width,
                        o = this.size.height,
                        n = this.position,
                        a = t.position;
                    if (void 0 !== e.radius) return e.intersects(this);
                    if (void 0 !== i.size) {
                        const t = i.size,
                            e = t.width,
                            r = t.height;
                        return a.x - e < n.x + s && a.x + e > n.x - s && a.y - r < n.y + o && a.y + r > n.y - o
                    }
                    return !1
                }
            }
            class pt {
                constructor(t, i) {
                    this.rectangle = t, this.capacity = i, this.points = [], this.divided = !1
                }
                subdivide() {
                    const t = this.rectangle.position.x,
                        i = this.rectangle.position.y,
                        e = this.rectangle.size.width,
                        s = this.rectangle.size.height,
                        o = this.capacity;
                    this.northEast = new pt(new vt(t, i, e / 2, s / 2), o), this.northWest = new pt(new vt(t + e / 2, i, e / 2, s / 2), o), this.southEast = new pt(new vt(t, i + s / 2, e / 2, s / 2), o), this.southWest = new pt(new vt(t + e / 2, i + s / 2, e / 2, s / 2), o), this.divided = !0
                }
                insert(t) {
                    var i, e, s, o, n;
                    return !!this.rectangle.contains(t.position) && (this.points.length < this.capacity ? (this.points.push(t), !0) : (this.divided || this.subdivide(), null !== (n = (null === (i = this.northEast) || void 0 === i ? void 0 : i.insert(t)) || (null === (e = this.northWest) || void 0 === e ? void 0 : e.insert(t)) || (null === (s = this.southEast) || void 0 === s ? void 0 : s.insert(t)) || (null === (o = this.southWest) || void 0 === o ? void 0 : o.insert(t))) && void 0 !== n && n))
                }
                query(t, i) {
                    var e, s, o, n;
                    const a = null != i ? i : [];
                    if (!t.intersects(this.rectangle)) return [];
                    for (const i of this.points.filter(i => t.contains(i.position))) a.push(i.particle);
                    return this.divided && (null === (e = this.northEast) || void 0 === e || e.query(t, a), null === (s = this.northWest) || void 0 === s || s.query(t, a), null === (o = this.southEast) || void 0 === o || o.query(t, a), null === (n = this.southWest) || void 0 === n || n.query(t, a)), a
                }
            }
            class mt {
                constructor(t, i) {
                    this.position = t, this.particle = i
                }
            }
            class yt extends ut {
                constructor(t, i, e) {
                    super(t, i), this.radius = e
                }
                contains(t) {
                    return Math.pow(t.x - this.position.x, 2) + Math.pow(t.y - this.position.y, 2) <= this.radius * this.radius
                }
                intersects(t) {
                    const i = t,
                        e = t,
                        s = this.position,
                        o = t.position,
                        n = Math.abs(o.x - s.x),
                        a = Math.abs(o.y - s.y),
                        r = this.radius;
                    if (void 0 !== e.radius) {
                        return r + e.radius > Math.sqrt(n * n + a + a)
                    }
                    if (void 0 !== i.size) {
                        const t = i.size.width,
                            e = i.size.height,
                            s = Math.pow(n - t, 2) + Math.pow(a - e, 2);
                        return !(n > r + t || a > r + e) && (n <= t || a <= e || s <= r * r)
                    }
                    return !1
                }
            }
            class ft {
                constructor(t) {
                    this.container = t
                }
                isEnabled() {
                    const t = this.container,
                        i = t.interactivity.mouse,
                        e = t.options.interactivity.events;
                    if (!e.onHover.enable || !i.position) return !1;
                    const s = e.onHover.mode;
                    return z.isInArray(a.grab, s)
                }
                reset() { }
                interact() {
                    var t, i;
                    const e = this.container,
                        s = e.options.interactivity;
                    if (s.events.onHover.enable && e.interactivity.status === w.mouseMoveEvent) {
                        const o = e.interactivity.mouse.position;
                        if (void 0 === o) return;
                        const n = e.retina.grabModeDistance,
                            a = e.particles.quadTree.query(new yt(o.x, o.y, n));
                        for (const n of a) {
                            const a = n.getPosition(),
                                r = z.getDistance(a, o);
                            if (r <= e.retina.grabModeDistance) {
                                const a = s.modes.grab.links,
                                    l = a.opacity,
                                    c = l - r * l / e.retina.grabModeDistance;
                                if (c > 0) {
                                    const s = null !== (t = a.color) && void 0 !== t ? t : n.particlesOptions.links.color;
                                    let r;
                                    if (e.particles.grabLineColor || (e.particles.grabLineColor = s === w.randomColorValue || (null === (i = s) || void 0 === i ? void 0 : i.value) === w.randomColorValue ? w.randomColorValue : x.colorToRgb(s)), r = e.particles.grabLineColor === w.randomColorValue ? x.getRandomRgbColor() : e.particles.grabLineColor, void 0 === r) return;
                                    e.canvas.drawGrabLine(n, r, c, o)
                                }
                            }
                        }
                    }
                }
            } ! function (t) {
                t.bubble = "bubble", t.repulse = "repulse"
            }(p || (p = {})),
                function (t) {
                    t.bubble = "bubble", t.push = "push", t.remove = "remove", t.repulse = "repulse", t.pause = "pause"
                }(m || (m = {})),
                function (t) {
                    t.circle = "circle", t.rectangle = "rectangle"
                }(y || (y = {}));
            class gt {
                constructor(t) {
                    this.container = t
                }
                isEnabled() {
                    const t = this.container,
                        i = t.options,
                        e = t.interactivity.mouse,
                        s = i.interactivity.events,
                        o = s.onDiv,
                        n = z.isDivModeEnabled(p.repulse, o);
                    if (!(n || s.onHover.enable && e.position || s.onClick.enable && e.clickPosition)) return !1;
                    const r = s.onHover.mode,
                        l = s.onClick.mode;
                    return z.isInArray(a.repulse, r) || z.isInArray(m.repulse, l) || n
                }
                reset() { }
                interact() {
                    const t = this.container,
                        i = t.options,
                        e = t.interactivity.status === w.mouseMoveEvent,
                        s = i.interactivity.events,
                        o = s.onHover.enable,
                        n = s.onHover.mode,
                        r = s.onClick.enable,
                        l = s.onClick.mode,
                        c = s.onDiv;
                    e && o && z.isInArray(a.repulse, n) ? this.hoverRepulse() : r && z.isInArray(m.repulse, l) ? this.clickRepulse() : z.divModeExecute(p.repulse, c, (t, i) => this.singleDivRepulse(t, i))
                }
                singleDivRepulse(t, i) {
                    const e = this.container,
                        s = document.getElementById(t);
                    if (!s) return;
                    const o = e.retina.pixelRatio,
                        n = {
                            x: (s.offsetLeft + s.offsetWidth / 2) * o,
                            y: (s.offsetTop + s.offsetHeight / 2) * o
                        },
                        a = s.offsetWidth / 2 * o,
                        r = i.type === y.circle ? new yt(n.x, n.y, a) : new vt(s.offsetLeft * o, s.offsetTop * o, s.offsetWidth * o, s.offsetHeight * o),
                        l = e.options.interactivity.modes.repulse.divs,
                        c = z.divMode(l, t);
                    this.processRepulse(n, a, r, c)
                }
                hoverRepulse() {
                    const t = this.container,
                        i = t.interactivity.mouse.position;
                    if (!i) return;
                    const e = t.retina.repulseModeDistance;
                    this.processRepulse(i, e, new yt(i.x, i.y, e))
                }
                processRepulse(t, i, e, s) {
                    var o;
                    const n = this.container,
                        a = n.particles.quadTree.query(e);
                    for (const e of a) {
                        const {
                            dx: a,
                            dy: r,
                            distance: l
                        } = z.getDistances(e.position, t), c = {
                            x: a / l,
                            y: r / l
                        }, h = 100 * (null !== (o = null == s ? void 0 : s.speed) && void 0 !== o ? o : n.options.interactivity.modes.repulse.speed), u = z.clamp((1 - Math.pow(l / i, 2)) * h, 0, 50), v = e.particlesOptions.move.outMode, p = e.size.value, m = {
                            x: e.position.x + c.x * u,
                            y: e.position.y + c.y * u
                        };
                        if (v === d.bounce || v === d.bounceVertical || v === d.bounceHorizontal) {
                            const t = {
                                horizontal: m.x - p > 0 && m.x + p < n.canvas.size.width,
                                vertical: m.y - p > 0 && m.y + p < n.canvas.size.height
                            };
                            (v === d.bounceVertical || t.horizontal) && (e.position.x = m.x), (v === d.bounceHorizontal || t.vertical) && (e.position.y = m.y)
                        } else e.position.x = m.x, e.position.y = m.y
                    }
                }
                clickRepulse() {
                    const t = this.container;
                    if (t.repulse.finish || (t.repulse.count || (t.repulse.count = 0), t.repulse.count++, t.repulse.count === t.particles.count && (t.repulse.finish = !0)), t.repulse.clicking) {
                        const i = t.retina.repulseModeDistance,
                            e = Math.pow(i / 6, 3),
                            s = t.interactivity.mouse.clickPosition;
                        if (void 0 === s) return;
                        const o = new yt(s.x, s.y, e),
                            n = t.particles.quadTree.query(o);
                        for (const i of n) {
                            const {
                                dx: o,
                                dy: n,
                                distance: a
                            } = z.getDistances(s, i.position), r = a * a, l = t.options.interactivity.modes.repulse.speed, c = -e * l / r;
                            r <= e && (t.repulse.particles.push(i), this.processClickRepulse(i, o, n, c))
                        }
                    } else if (!1 === t.repulse.clicking) {
                        for (const i of t.repulse.particles) i.velocity.horizontal = i.initialVelocity.horizontal, i.velocity.vertical = i.initialVelocity.vertical;
                        t.repulse.particles = []
                    }
                }
                processClickRepulse(t, i, e, s) {
                    const o = this.container,
                        n = o.options,
                        a = Math.atan2(e, i);
                    t.velocity.horizontal = s * Math.cos(a), t.velocity.vertical = s * Math.sin(a);
                    const r = n.particles.move.outMode;
                    if (r === d.bounce || r === d.bounceHorizontal || r === d.bounceVertical) {
                        const i = {
                            x: t.position.x + t.velocity.horizontal,
                            y: t.position.y + t.velocity.vertical
                        };
                        r !== d.bounceVertical && (i.x + t.size.value > o.canvas.size.width || i.x - t.size.value < 0) && (t.velocity.horizontal *= -1), r !== d.bounceHorizontal && (i.y + t.size.value > o.canvas.size.height || i.y - t.size.value < 0) && (t.velocity.vertical *= -1)
                    }
                }
            } ! function (t) {
                t.color = "color", t.opacity = "opacity", t.size = "size"
            }(f || (f = {}));
            class bt {
                constructor(t) {
                    this.container = t
                }
                static calculateBubbleValue(t, i, e, s) {
                    if (i > e) {
                        const o = t + (i - e) * s;
                        return z.clamp(o, t, i)
                    }
                    if (i < e) {
                        const o = t - (e - i) * s;
                        return z.clamp(o, i, t)
                    }
                }
                isEnabled() {
                    const t = this.container,
                        i = t.options,
                        e = t.interactivity.mouse,
                        s = i.interactivity.events,
                        o = s.onDiv,
                        n = z.isDivModeEnabled(p.bubble, o);
                    if (!(n || s.onHover.enable && e.position || s.onClick.enable && e.clickPosition)) return !1;
                    const r = s.onHover.mode,
                        l = s.onClick.mode;
                    return z.isInArray(a.bubble, r) || z.isInArray(m.bubble, l) || n
                }
                reset(t, i) {
                    t.bubble.inRange && !i || (delete t.bubble.divId, delete t.bubble.opacity, delete t.bubble.radius, delete t.bubble.color)
                }
                interact() {
                    const t = this.container.options.interactivity.events,
                        i = t.onHover,
                        e = t.onClick,
                        s = i.enable,
                        o = i.mode,
                        n = e.enable,
                        r = e.mode,
                        l = t.onDiv;
                    s && z.isInArray(a.bubble, o) ? this.hoverBubble() : n && z.isInArray(m.bubble, r) ? this.clickBubble() : z.divModeExecute(p.bubble, l, (t, i) => this.singleDivHover(t, i))
                }
                singleDivHover(t, i) {
                    const e = this.container,
                        s = document.getElementById(t);
                    if (!s) return;
                    const o = e.retina.pixelRatio,
                        n = {
                            x: (s.offsetLeft + s.offsetWidth / 2) * o,
                            y: (s.offsetTop + s.offsetHeight / 2) * o
                        },
                        a = s.offsetWidth / 2 * o,
                        r = i.type === y.circle ? new yt(n.x, n.y, a) : new vt(s.offsetLeft * o, s.offsetTop * o, s.offsetWidth * o, s.offsetHeight * o),
                        l = e.particles.quadTree.query(r);
                    for (const i of l.filter(t => r.contains(t.getPosition()))) {
                        i.bubble.inRange = !0;
                        const s = e.options.interactivity.modes.bubble.divs,
                            o = z.divMode(s, t);
                        i.bubble.divId && i.bubble.divId === t || (this.reset(i, !0), i.bubble.divId = t), this.hoverBubbleSize(i, 1, o), this.hoverBubbleOpacity(i, 1, o), this.hoverBubbleColor(i, o)
                    }
                }
                process(t, i, e, s) {
                    const o = this.container,
                        n = s.bubbleObj.optValue;
                    if (void 0 === n) return;
                    const a = o.options.interactivity.modes.bubble.duration,
                        r = o.retina.bubbleModeDistance,
                        l = s.particlesObj.optValue,
                        c = s.bubbleObj.value,
                        h = s.particlesObj.value || 0,
                        d = s.type;
                    if (n !== l)
                        if (o.bubble.durationEnd) c && (d === f.size && delete t.bubble.radius, d === f.opacity && delete t.bubble.opacity);
                        else if (i <= r) {
                            if ((null != c ? c : h) !== n) {
                                const i = h - e * (h - n) / a;
                                d === f.size && (t.bubble.radius = i), d === f.opacity && (t.bubble.opacity = i)
                            }
                        } else d === f.size && delete t.bubble.radius, d === f.opacity && delete t.bubble.opacity
                }
                clickBubble() {
                    var t;
                    const i = this.container,
                        e = i.options,
                        s = i.interactivity.mouse.clickPosition;
                    if (void 0 === s) return;
                    const o = i.retina.bubbleModeDistance,
                        n = i.particles.quadTree.query(new yt(s.x, s.y, o));
                    for (const o of n) {
                        o.bubble.inRange = !0;
                        const n = o.getPosition(),
                            a = z.getDistance(n, s),
                            r = ((new Date).getTime() - (i.interactivity.mouse.clickTime || 0)) / 1e3;
                        if (i.bubble.clicking) {
                            r > e.interactivity.modes.bubble.duration && (i.bubble.durationEnd = !0), r > 2 * e.interactivity.modes.bubble.duration && (i.bubble.clicking = !1, i.bubble.durationEnd = !1);
                            const s = {
                                bubbleObj: {
                                    optValue: i.retina.bubbleModeSize,
                                    value: o.bubble.radius
                                },
                                particlesObj: {
                                    optValue: null !== (t = o.sizeValue) && void 0 !== t ? t : i.retina.sizeValue,
                                    value: o.size.value
                                },
                                type: f.size
                            };
                            this.process(o, a, r, s);
                            const n = {
                                bubbleObj: {
                                    optValue: e.interactivity.modes.bubble.opacity,
                                    value: o.bubble.opacity
                                },
                                particlesObj: {
                                    optValue: o.particlesOptions.opacity.value,
                                    value: o.opacity.value
                                },
                                type: f.opacity
                            };
                            this.process(o, a, r, n), i.bubble.durationEnd ? delete o.bubble.color : a <= i.retina.bubbleModeDistance ? this.hoverBubbleColor(o) : delete o.bubble.color
                        }
                    }
                }
                hoverBubble() {
                    const t = this.container,
                        i = t.interactivity.mouse.position;
                    if (void 0 === i) return;
                    const e = t.retina.bubbleModeDistance,
                        s = t.particles.quadTree.query(new yt(i.x, i.y, e));
                    for (const e of s) {
                        e.bubble.inRange = !0;
                        const s = e.getPosition(),
                            o = z.getDistance(s, i),
                            n = 1 - o / t.retina.bubbleModeDistance;
                        o <= t.retina.bubbleModeDistance ? n >= 0 && t.interactivity.status === w.mouseMoveEvent && (this.hoverBubbleSize(e, n), this.hoverBubbleOpacity(e, n), this.hoverBubbleColor(e)) : this.reset(e), t.interactivity.status === w.mouseLeaveEvent && this.reset(e)
                    }
                }
                hoverBubbleSize(t, i, e) {
                    var s;
                    const o = this.container,
                        n = (null == e ? void 0 : e.size) ? e.size * o.retina.pixelRatio : o.retina.bubbleModeSize;
                    if (void 0 === n) return;
                    const a = null !== (s = t.sizeValue) && void 0 !== s ? s : o.retina.sizeValue,
                        r = t.size.value,
                        l = bt.calculateBubbleValue(r, n, a, i);
                    void 0 !== l && (t.bubble.radius = l)
                }
                hoverBubbleOpacity(t, i, e) {
                    var s;
                    const o = this.container.options,
                        n = null !== (s = null == e ? void 0 : e.opacity) && void 0 !== s ? s : o.interactivity.modes.bubble.opacity;
                    if (void 0 === n) return;
                    const a = t.particlesOptions.opacity.value,
                        r = t.opacity.value,
                        l = bt.calculateBubbleValue(r, n, a, i);
                    void 0 !== l && (t.bubble.opacity = l)
                }
                hoverBubbleColor(t, i) {
                    var e;
                    const s = this.container.options;
                    if (void 0 === t.bubble.color) {
                        const o = null !== (e = null == i ? void 0 : i.color) && void 0 !== e ? e : s.interactivity.modes.bubble.color;
                        if (void 0 === o) return;
                        const n = o instanceof Array ? z.itemFromArray(o) : o;
                        t.bubble.color = x.colorToHsl(n)
                    }
                }
            }
            class wt {
                constructor(t) {
                    this.container = t
                }
                isEnabled() {
                    const t = this.container,
                        i = t.interactivity.mouse,
                        e = t.options.interactivity.events;
                    if (!e.onHover.enable || !i.position) return !1;
                    const s = e.onHover.mode;
                    return z.isInArray(a.connect, s)
                }
                reset() { }
                interact() {
                    const t = this.container;
                    if (t.options.interactivity.events.onHover.enable && "mousemove" === t.interactivity.status) {
                        const i = t.interactivity.mouse.position;
                        if (!i) return;
                        const e = Math.abs(t.retina.connectModeRadius),
                            s = t.particles.quadTree.query(new yt(i.x, i.y, e));
                        let o = 0;
                        for (const i of s) {
                            const e = i.getPosition();
                            for (const n of s.slice(o + 1)) {
                                const s = n.getPosition(),
                                    o = Math.abs(t.retina.connectModeDistance),
                                    a = Math.abs(e.x - s.x),
                                    r = Math.abs(e.y - s.y);
                                a < o && r < o && t.canvas.drawConnectLine(i, n)
                            } ++o
                        }
                    }
                }
            }
            class xt extends yt {
                constructor(t, i, e, s) {
                    super(t, i, e), this.canvasSize = s, this.canvasSize = {
                        height: s.height,
                        width: s.width
                    }
                }
                contains(t) {
                    if (super.contains(t)) return !0;
                    const i = {
                        x: t.x - this.canvasSize.width,
                        y: t.y
                    };
                    if (super.contains(i)) return !0;
                    const e = {
                        x: t.x - this.canvasSize.width,
                        y: t.y - this.canvasSize.height
                    };
                    if (super.contains(e)) return !0;
                    const s = {
                        x: t.x,
                        y: t.y - this.canvasSize.height
                    };
                    return super.contains(s)
                }
                intersects(t) {
                    if (super.intersects(t)) return !0;
                    const i = t,
                        e = t,
                        s = {
                            x: t.position.x - this.canvasSize.width,
                            y: t.position.y - this.canvasSize.height
                        };
                    if (void 0 !== e.radius) {
                        const t = new yt(s.x, s.y, 2 * e.radius);
                        return super.intersects(t)
                    }
                    if (void 0 !== i.size) {
                        const t = new vt(s.x, s.y, 2 * i.size.width, 2 * i.size.height);
                        return super.intersects(t)
                    }
                    return !1
                }
            }
            class zt {
                constructor(t) {
                    this.container = t
                }
                isEnabled(t) {
                    return t.particlesOptions.links.enable
                }
                reset() { }
                interact(t) {
                    var i;
                    const e = this.container,
                        s = t.particlesOptions.links,
                        o = s.opacity,
                        n = null !== (i = t.linksDistance) && void 0 !== i ? i : e.retina.linksDistance,
                        a = e.canvas.size,
                        r = s.warp,
                        l = t.getPosition(),
                        c = r ? new xt(l.x, l.y, n, a) : new yt(l.x, l.y, n),
                        h = e.particles.quadTree.query(c);
                    for (const i of h) {
                        const c = i.particlesOptions.links;
                        if (t === i || !c.enable || s.id !== c.id) continue;
                        const h = i.getPosition();
                        let d = z.getDistance(l, h);
                        if (r && d > n) {
                            const t = {
                                x: h.x - a.width,
                                y: h.y
                            };
                            if (d = z.getDistance(l, t), d > n) {
                                const t = {
                                    x: h.x - a.width,
                                    y: h.y - a.height
                                };
                                if (d = z.getDistance(l, t), d > n) {
                                    const t = {
                                        x: h.x,
                                        y: h.y - a.height
                                    };
                                    d = z.getDistance(l, t)
                                }
                            }
                        }
                        if (d > n) return;
                        const u = o - d * o / n;
                        if (u > 0) {
                            const s = t.particlesOptions.links;
                            let o = void 0 !== s.id ? e.particles.linksColors[s.id] : e.particles.linksColor;
                            if (!o) {
                                const t = s.color,
                                    i = "string" == typeof t ? t : t.value;
                                o = i === w.randomColorValue ? s.consent ? x.colorToRgb({
                                    value: i
                                }) : s.blink ? w.randomColorValue : w.midColorValue : x.colorToRgb({
                                    value: i
                                }), void 0 !== s.id ? e.particles.linksColors[s.id] = o : e.particles.linksColor = o
                            } - 1 === i.links.map(t => t.destination).indexOf(t) && -1 === t.links.map(t => t.destination).indexOf(i) && t.links.push({
                                destination: i,
                                opacity: u
                            })
                        }
                    }
                }
            }
            class kt {
                constructor(t) {
                    this.container = t
                }
                interact(t) {
                    var i;
                    const e = this.container,
                        s = e.options,
                        o = null !== (i = t.linksDistance) && void 0 !== i ? i : e.retina.linksDistance,
                        n = t.getPosition(),
                        a = e.particles.quadTree.query(new yt(n.x, n.y, o));
                    for (const i of a) {
                        if (t === i || i.particlesOptions.move.attract.enable) continue;
                        const e = i.getPosition(),
                            {
                                dx: o,
                                dy: a
                            } = z.getDistances(n, e),
                            r = s.particles.move.attract.rotate,
                            l = o / (1e3 * r.x),
                            c = a / (1e3 * r.y);
                        t.velocity.horizontal -= l, t.velocity.vertical -= c, i.velocity.horizontal += l, i.velocity.vertical += c
                    }
                }
                isEnabled(t) {
                    return t.particlesOptions.move.attract.enable
                }
                reset() { }
            }
            class Pt {
                constructor(t) {
                    this.container = t
                }
                static rotate(t, i) {
                    return {
                        horizontal: t.horizontal * Math.cos(i) - t.vertical * Math.sin(i),
                        vertical: t.horizontal * Math.sin(i) + t.vertical * Math.cos(i)
                    }
                }
                static collisionVelocity(t, i, e, s) {
                    return {
                        horizontal: t.horizontal * (e - s) / (e + s) + 2 * i.horizontal * s / (e + s),
                        vertical: t.vertical
                    }
                }
                static bounce(t, i) {
                    const e = t.getPosition(),
                        s = i.getPosition(),
                        o = t.velocity.horizontal - i.velocity.horizontal,
                        n = t.velocity.vertical - i.velocity.vertical;
                    if (o * (s.x - e.x) + n * (s.y - e.y) >= 0) {
                        const o = -Math.atan2(s.y - e.y, s.x - e.x),
                            n = t.size.value,
                            a = i.size.value,
                            r = Pt.rotate(t.velocity, o),
                            l = Pt.rotate(i.velocity, o),
                            c = Pt.collisionVelocity(r, l, n, a),
                            h = Pt.collisionVelocity(l, r, n, a),
                            d = Pt.rotate(c, -o),
                            u = Pt.rotate(h, -o);
                        t.velocity.horizontal = d.horizontal, t.velocity.vertical = d.vertical, i.velocity.horizontal = u.horizontal, i.velocity.vertical = u.vertical
                    }
                }
                static destroy(t, i) {
                    void 0 === t.size.value && void 0 !== i.size.value ? t.destroy() : void 0 !== t.size.value && void 0 === i.size.value ? i.destroy() : void 0 !== t.size.value && void 0 !== i.size.value && (t.size.value >= i.size.value ? i.destroy() : t.destroy())
                }
                static getRadius(t, i) {
                    return t.bubble.radius || t.size.value || i
                }
                isEnabled(t) {
                    return t.particlesOptions.collisions.enable
                }
                reset() { }
                interact(t) {
                    const i = this.container,
                        e = t.getPosition(),
                        s = i.particles.quadTree.query(new yt(e.x, e.y, 2 * t.size.value));
                    for (const o of s) {
                        if (t === o || !o.particlesOptions.collisions.enable || t.particlesOptions.collisions.mode !== o.particlesOptions.collisions.mode) continue;
                        const s = o.getPosition(),
                            n = z.getDistance(e, s),
                            a = i.retina.sizeValue;
                        n <= Pt.getRadius(t, a) + Pt.getRadius(o, a) && this.resolveCollision(t, o)
                    }
                }
                resolveCollision(t, i) {
                    switch (t.particlesOptions.collisions.mode) {
                        case v.absorb:
                            this.absorb(t, i);
                            break;
                        case v.bounce:
                            Pt.bounce(t, i);
                            break;
                        case v.destroy:
                            Pt.destroy(t, i)
                    }
                }
                absorb(t, i) {
                    const e = this.container,
                        s = e.options.fpsLimit / 1e3;
                    if (void 0 === t.size.value && void 0 !== i.size.value) t.destroy();
                    else if (void 0 !== t.size.value && void 0 === i.size.value) i.destroy();
                    else if (void 0 !== t.size.value && void 0 !== i.size.value)
                        if (t.size.value >= i.size.value) {
                            const o = z.clamp(t.size.value / i.size.value, 0, i.size.value) * s;
                            t.size.value += o, i.size.value -= o, i.size.value <= e.retina.pixelRatio && (i.size.value = 0, i.destroy())
                        } else {
                            const o = z.clamp(i.size.value / t.size.value, 0, t.size.value) * s;
                            t.size.value -= o, i.size.value += o, t.size.value <= e.retina.pixelRatio && (t.size.value = 0, t.destroy())
                        }
                }
            }
            class Mt {
                constructor(t) {
                    this.container = t
                }
                isEnabled() {
                    return this.container.options.infection.enable
                }
                reset() { }
                interact(t, i) {
                    var e, s;
                    if (t.updateInfection(i), void 0 === t.infectionStage) return;
                    const o = this.container,
                        n = o.options.infection;
                    if (!n.enable || n.stages.length < 1) return;
                    const a = n.stages[t.infectionStage],
                        r = o.retina.pixelRatio,
                        l = 2 * t.size.value + a.radius * r,
                        c = t.getPosition(),
                        h = null !== (e = a.infectedStage) && void 0 !== e ? e : t.infectionStage,
                        d = o.particles.quadTree.query(new yt(c.x, c.y, l)).filter(i => void 0 === i.infectionStage || i.infectionStage !== t.infectionStage),
                        u = a.rate,
                        v = d.length;
                    for (const i of d)
                        if (Math.random() < u / v)
                            if (void 0 === i.infectionStage) i.startInfection(h);
                            else if (i.infectionStage < t.infectionStage) i.updateInfectionStage(h);
                            else if (i.infectionStage > t.infectionStage) {
                                const e = n.stages[i.infectionStage],
                                    o = null !== (s = null == e ? void 0 : e.infectedStage) && void 0 !== s ? s : i.infectionStage;
                                t.updateInfectionStage(o)
                            }
                }
            }
            class St {
                constructor(t) {
                    this.container = t, this.externalInteractors = [new bt(t), new wt(t), new ft(t), new gt(t)], this.particleInteractors = [new kt(t), new Pt(t), new Mt(t), new zt(t)]
                }
                init() { }
                interact(t) {
                    this.externalInteract(t), this.particlesInteract(t)
                }
                externalInteract(t) {
                    for (const i of this.externalInteractors) i.isEnabled() && i.interact(t)
                }
                particlesInteract(t) {
                    for (const i of this.container.particles.array) {
                        for (const t of this.externalInteractors) t.reset(i);
                        for (const e of this.particleInteractors) e.isEnabled(i) && e.interact(i, t)
                    }
                }
            }
            class At {
                constructor(t) {
                    this.container = t, this.array = [], this.interactionManager = new St(t);
                    const i = this.container.canvas.size;
                    this.linksColors = {}, this.quadTree = new pt(new vt(0, 0, i.width, i.height), 4)
                }
                get count() {
                    return this.array.length
                }
                init() {
                    const t = this.container,
                        i = t.options;
                    let e = !1;
                    for (const [, i] of t.plugins)
                        if (void 0 !== i.particlesInitialization && (e = i.particlesInitialization()), e) break;
                    if (!e)
                        for (let t = this.count; t < i.particles.number.value; t++) this.addParticle();
                    if (i.infection.enable)
                        for (let t = 0; t < i.infection.infections; t++) {
                            const t = this.array.filter(t => void 0 === t.infectionStage);
                            z.itemFromArray(t).startInfection(0)
                        }
                    this.interactionManager.init(), t.noise.init()
                }
                redraw() {
                    this.clear(), this.init(), this.draw(0)
                }
                removeAt(t, i) {
                    if (t >= 0 && t <= this.count)
                        for (const e of this.array.splice(t, null != i ? i : 1)) e.destroy()
                }
                remove(t) {
                    this.removeAt(this.array.indexOf(t))
                }
                update(t) {
                    const i = this.container,
                        e = [];
                    i.noise.update();
                    for (const s of this.array) {
                        s.bubble.inRange = !1;
                        for (const [, e] of i.plugins) {
                            if (s.destroyed) break;
                            e.particleUpdate && e.particleUpdate(s, t)
                        }
                        s.destroyed || s.update(t), s.destroyed ? e.push(s) : this.quadTree.insert(new mt(s.getPosition(), s))
                    }
                    for (const t of e) this.remove(t);
                    this.interactionManager.interact(t)
                }
                draw(t) {
                    const i = this.container;
                    i.canvas.clear();
                    const e = this.container.canvas.size;
                    this.quadTree = new pt(new vt(0, 0, e.width, e.height), 4), this.update(t);
                    for (const [, e] of i.plugins) i.canvas.drawPlugin(e, t);
                    for (const i of this.array) i.draw(t)
                }
                clear() {
                    this.array = []
                }
                push(t, i) {
                    var e;
                    const s = this.container,
                        o = s.options,
                        n = o.particles.number.limit * s.density;
                    if (this.pushing = !0, n > 0) {
                        const i = this.count + t - n;
                        i > 0 && this.removeQuantity(i)
                    }
                    let a;
                    i && (a = null !== (e = i.position) && void 0 !== e ? e : {
                        x: 0,
                        y: 0
                    });
                    for (let i = 0; i < t; i++) this.addParticle(a);
                    o.particles.move.enable || this.container.play(), this.pushing = !1
                }
                addParticle(t, i) {
                    const e = new dt(this.container, t, i);
                    return this.array.push(e), e
                }
                removeQuantity(t) {
                    const i = this.container.options;
                    this.removeAt(0, t), i.particles.move.enable || this.container.play()
                }
            }
            class Ct {
                constructor(t) {
                    this.container = t
                }
                init() {
                    const t = this.container,
                        i = t.options;
                    i.detectRetina ? this.pixelRatio = z.isSsr() ? 1 : window.devicePixelRatio : this.pixelRatio = 1;
                    const e = this.pixelRatio;
                    if (t.canvas.element) {
                        const i = t.canvas.element;
                        t.canvas.size.width = i.offsetWidth * e, t.canvas.size.height = i.offsetHeight * e
                    }
                    const s = i.particles;
                    this.linksDistance = s.links.distance * e, this.linksWidth = s.links.width * e, this.moveSpeed = s.move.speed * e, this.sizeValue = s.size.value * e, this.sizeAnimationSpeed = s.size.animation.speed * e;
                    const o = i.interactivity.modes;
                    this.connectModeDistance = o.connect.distance * e, this.connectModeRadius = o.connect.radius * e, this.grabModeDistance = o.grab.distance * e, this.repulseModeDistance = o.repulse.distance * e, this.slowModeRadius = o.slow.radius * e, this.bubbleModeDistance = o.bubble.distance * e, o.bubble.size && (this.bubbleModeSize = o.bubble.size * e)
                }
                initParticle(t) {
                    const i = t.particlesOptions,
                        e = this.pixelRatio;
                    t.linksDistance = i.links.distance * e, t.linksWidth = i.links.width * e, t.moveSpeed = i.move.speed * e, t.sizeValue = i.size.value * e, "boolean" != typeof i.size.random && (t.randomMinimumSize = i.size.random.minimumValue * e), t.sizeAnimationSpeed = i.size.animation.speed * e
                }
            }
            class Ot {
                constructor(t) {
                    this.container = t
                }
                nextFrame(t) {
                    const i = this.container,
                        e = i.options,
                        s = e.fpsLimit > 0 ? e.fpsLimit : 60;
                    if (void 0 !== i.lastFrameTime && t < i.lastFrameTime + 1e3 / s) return void i.draw();
                    const o = t - i.lastFrameTime;
                    i.lastFrameTime = t, i.particles.draw(o), e.particles.move.enable && i.getAnimationStatus() && i.draw()
                }
            } ! function (t) {
                t.canvas = "canvas", t.parent = "parent", t.window = "window"
            }(g || (g = {}));
            class Tt {
                constructor() {
                    this.enable = !1, this.mode = []
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.mode && (this.mode = t.mode))
                }
            }
            class Rt {
                constructor() {
                    this.ids = [], this.enable = !1, this.mode = [], this.type = y.circle
                }
                get elementId() {
                    return this.ids
                }
                set elementId(t) {
                    this.ids = t
                }
                get el() {
                    return this.elementId
                }
                set el(t) {
                    this.elementId = t
                }
                load(t) {
                    var i, e;
                    if (void 0 === t) return;
                    const s = null !== (e = null !== (i = t.ids) && void 0 !== i ? i : t.elementId) && void 0 !== e ? e : t.el;
                    void 0 !== s && (this.ids = s), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.mode && (this.mode = t.mode), void 0 !== t.type && (this.type = t.type)
                }
            }
            class Et {
                constructor() {
                    this.enable = !1, this.force = 2, this.smooth = 10
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.force && (this.force = t.force), void 0 !== t.smooth && (this.smooth = t.smooth))
                }
            }
            class It {
                constructor() {
                    this.enable = !1, this.mode = [], this.parallax = new Et
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.mode && (this.mode = t.mode), this.parallax.load(t.parallax))
                }
            }
            class Dt {
                constructor() {
                    this.onClick = new Tt, this.onDiv = new Rt, this.onHover = new It, this.resize = !0
                }
                get onclick() {
                    return this.onClick
                }
                set onclick(t) {
                    this.onClick = t
                }
                get ondiv() {
                    return this.onDiv
                }
                set ondiv(t) {
                    this.onDiv = t
                }
                get onhover() {
                    return this.onHover
                }
                set onhover(t) {
                    this.onHover = t
                }
                load(t) {
                    var i, e, s;
                    if (void 0 === t) return;
                    this.onClick.load(null !== (i = t.onClick) && void 0 !== i ? i : t.onclick);
                    const o = null !== (e = t.onDiv) && void 0 !== e ? e : t.ondiv;
                    void 0 !== o && (o instanceof Array ? this.onDiv = o.map(t => {
                        const i = new Rt;
                        return i.load(t), i
                    }) : (this.onDiv = new Rt, this.onDiv.load(o))), this.onHover.load(null !== (s = t.onHover) && void 0 !== s ? s : t.onhover), void 0 !== t.resize && (this.resize = t.resize)
                }
            }
            class Lt {
                constructor() {
                    this.distance = 200, this.duration = .4
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.distance && (this.distance = t.distance), void 0 !== t.duration && (this.duration = t.duration), void 0 !== t.opacity && (this.opacity = t.opacity), void 0 !== t.color && (t.color instanceof Array ? this.color = t.color.map(t => V.create(void 0, t)) : (this.color instanceof Array && (this.color = new V), this.color = V.create(this.color, t.color))), void 0 !== t.size && (this.size = t.size))
                }
            }
            class Vt extends Lt {
                constructor() {
                    super(), this.ids = []
                }
                load(t) {
                    super.load(t), void 0 !== t && void 0 !== t.ids && (this.ids = t.ids)
                }
            }
            class Ht extends Lt {
                load(t) {
                    super.load(t), void 0 !== t && void 0 !== t.divs && (t.divs instanceof Array ? this.divs = t.divs.map(t => {
                        const i = new Vt;
                        return i.load(t), i
                    }) : ((this.divs instanceof Array || !this.divs) && (this.divs = new Vt), this.divs.load(t.divs)))
                }
            }
            class _t {
                constructor() {
                    this.opacity = .5
                }
                load(t) {
                    void 0 !== t && void 0 !== t.opacity && (this.opacity = t.opacity)
                }
            }
            class Ft {
                constructor() {
                    this.distance = 80, this.links = new _t, this.radius = 60
                }
                get line_linked() {
                    return this.links
                }
                set line_linked(t) {
                    this.links = t
                }
                get lineLinked() {
                    return this.links
                }
                set lineLinked(t) {
                    this.links = t
                }
                load(t) {
                    var i, e;
                    void 0 !== t && (void 0 !== t.distance && (this.distance = t.distance), this.links.load(null !== (e = null !== (i = t.links) && void 0 !== i ? i : t.lineLinked) && void 0 !== e ? e : t.line_linked), void 0 !== t.radius && (this.radius = t.radius))
                }
            }
            class Bt {
                constructor() {
                    this.opacity = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.opacity && (this.opacity = t.opacity), void 0 !== t.color && (this.color = V.create(this.color, t.color)))
                }
            }
            class qt {
                constructor() {
                    this.distance = 100, this.links = new Bt
                }
                get line_linked() {
                    return this.links
                }
                set line_linked(t) {
                    this.links = t
                }
                get lineLinked() {
                    return this.links
                }
                set lineLinked(t) {
                    this.links = t
                }
                load(t) {
                    var i, e;
                    void 0 !== t && (void 0 !== t.distance && (this.distance = t.distance), this.links.load(null !== (e = null !== (i = t.links) && void 0 !== i ? i : t.lineLinked) && void 0 !== e ? e : t.line_linked))
                }
            }
            class Wt {
                constructor() {
                    this.quantity = 2
                }
                get particles_nb() {
                    return this.quantity
                }
                set particles_nb(t) {
                    this.quantity = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    const e = null !== (i = t.quantity) && void 0 !== i ? i : t.particles_nb;
                    void 0 !== e && (this.quantity = e)
                }
            }
            class Nt {
                constructor() {
                    this.quantity = 4
                }
                get particles_nb() {
                    return this.quantity
                }
                set particles_nb(t) {
                    this.quantity = t
                }
                load(t) {
                    var i;
                    if (void 0 === t) return;
                    const e = null !== (i = t.quantity) && void 0 !== i ? i : t.particles_nb;
                    void 0 !== e && (this.quantity = e)
                }
            }
            class Ut {
                constructor() {
                    this.distance = 200, this.duration = .4, this.speed = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.distance && (this.distance = t.distance), void 0 !== t.duration && (this.duration = t.duration), void 0 !== t.speed && (this.speed = t.speed))
                }
            }
            class Gt extends Ut {
                constructor() {
                    super(), this.ids = []
                }
                load(t) {
                    super.load(t), void 0 !== t && void 0 !== t.ids && (this.ids = t.ids)
                }
            }
            class jt extends Ut {
                load(t) {
                    super.load(t), void 0 !== (null == t ? void 0 : t.divs) && (t.divs instanceof Array ? this.divs = t.divs.map(t => {
                        const i = new Gt;
                        return i.load(t), i
                    }) : ((this.divs instanceof Array || !this.divs) && (this.divs = new Gt), this.divs.load(t.divs)))
                }
            }
            class $t {
                constructor() {
                    this.factor = 3, this.radius = 200
                }
                get active() {
                    return !1
                }
                set active(t) { }
                load(t) {
                    void 0 !== t && (void 0 !== t.factor && (this.factor = t.factor), void 0 !== t.radius && (this.radius = t.radius))
                }
            }
            class Jt {
                constructor() {
                    this.bubble = new Ht, this.connect = new Ft, this.grab = new qt, this.push = new Nt, this.remove = new Wt, this.repulse = new jt, this.slow = new $t
                }
                load(t) {
                    void 0 !== t && (this.bubble.load(t.bubble), this.connect.load(t.connect), this.grab.load(t.grab), this.push.load(t.push), this.remove.load(t.remove), this.repulse.load(t.repulse), this.slow.load(t.slow))
                }
            }
            class Xt {
                constructor() {
                    this.detectsOn = g.canvas, this.events = new Dt, this.modes = new Jt
                }
                get detect_on() {
                    return this.detectsOn
                }
                set detect_on(t) {
                    this.detectsOn = t
                }
                load(t) {
                    var i, e, s;
                    if (void 0 === t) return;
                    const o = null !== (i = t.detectsOn) && void 0 !== i ? i : t.detect_on;
                    void 0 !== o && (this.detectsOn = o), this.events.load(t.events), this.modes.load(t.modes), !0 === (null === (s = null === (e = t.modes) || void 0 === e ? void 0 : e.slow) || void 0 === s ? void 0 : s.active) && (this.events.onHover.mode instanceof Array ? this.events.onHover.mode.indexOf(a.slow) < 0 && this.events.onHover.mode.push(a.slow) : this.events.onHover.mode !== a.slow && (this.events.onHover.mode = [this.events.onHover.mode, a.slow]))
                }
            }
            class Yt {
                constructor() {
                    this.color = new V, this.opacity = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), void 0 !== t.opacity && (this.opacity = t.opacity))
                }
            }
            class Qt {
                constructor() {
                    this.cover = new Yt, this.enable = !1
                }
                load(t) {
                    if (void 0 !== t) {
                        if (void 0 !== t.cover) {
                            const i = t.cover,
                                e = "string" == typeof t.cover ? {
                                    color: t.cover
                                } : t.cover;
                            this.cover.load(void 0 !== i.color ? i : {
                                color: e
                            })
                        }
                        void 0 !== t.enable && (this.enable = t.enable)
                    }
                }
            }
            class Zt {
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), void 0 !== t.image && (this.image = t.image), void 0 !== t.position && (this.position = t.position), void 0 !== t.repeat && (this.repeat = t.repeat), void 0 !== t.size && (this.size = t.size), void 0 !== t.opacity && (this.opacity = t.opacity))
                }
            }
            class Kt {
                constructor() {
                    this.color = new V, this.color.value = "#ff0000", this.radius = 0, this.rate = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), this.duration = t.duration, this.infectedStage = t.infectedStage, void 0 !== t.radius && (this.radius = t.radius), void 0 !== t.rate && (this.rate = t.rate))
                }
            }
            class ti {
                constructor() {
                    this.cure = !1, this.delay = 0, this.enable = !1, this.infections = 0, this.stages = []
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.cure && (this.cure = t.cure), void 0 !== t.delay && (this.delay = t.delay), void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.infections && (this.infections = t.infections), void 0 !== t.stages && (this.stages = t.stages.map(t => {
                        const i = new Kt;
                        return i.load(t), i
                    })))
                }
            }
            class ii {
                constructor() {
                    this.background = new Zt, this.backgroundMask = new Qt, this.detectRetina = !0, this.fpsLimit = 30, this.infection = new ti, this.interactivity = new Xt, this.particles = new ht, this.pauseOnBlur = !0
                }
                get fps_limit() {
                    return this.fpsLimit
                }
                set fps_limit(t) {
                    this.fpsLimit = t
                }
                get retina_detect() {
                    return this.detectRetina
                }
                set retina_detect(t) {
                    this.detectRetina = t
                }
                load(t) {
                    var i, e;
                    if (void 0 === t) return;
                    if (void 0 !== t.preset)
                        if (t.preset instanceof Array)
                            for (const i of t.preset) this.importPreset(i);
                        else this.importPreset(t.preset);
                    const s = null !== (i = t.detectRetina) && void 0 !== i ? i : t.retina_detect;
                    void 0 !== s && (this.detectRetina = s);
                    const o = null !== (e = t.fpsLimit) && void 0 !== e ? e : t.fps_limit;
                    void 0 !== o && (this.fpsLimit = o), void 0 !== t.pauseOnBlur && (this.pauseOnBlur = t.pauseOnBlur), this.background.load(t.background), this.particles.load(t.particles), this.infection.load(t.infection), this.interactivity.load(t.interactivity), this.backgroundMask.load(t.backgroundMask), M.loadOptions(this, t)
                }
                importPreset(t) {
                    this.load(M.getPreset(t))
                }
            }
            class ei {
                constructor(t) {
                    this.container = t, this.canPush = !0, this.mouseMoveHandler = t => this.mouseTouchMove(t), this.touchStartHandler = t => this.mouseTouchMove(t), this.touchMoveHandler = t => this.mouseTouchMove(t), this.touchEndHandler = () => this.mouseTouchFinish(), this.mouseLeaveHandler = () => this.mouseTouchFinish(), this.touchCancelHandler = () => this.mouseTouchFinish(), this.touchEndClickHandler = t => this.mouseTouchClick(t), this.mouseUpHandler = t => this.mouseTouchClick(t), this.visibilityChangeHandler = () => this.handleVisibilityChange(), this.resizeHandler = () => this.handleWindowResize()
                }
                static manageListener(t, i, e, s, o) {
                    if (s) {
                        let s = {
                            passive: !0
                        };
                        "boolean" == typeof o ? s.capture = o : void 0 !== o && (s = o), t.addEventListener(i, e, s)
                    } else {
                        const s = o;
                        t.removeEventListener(i, e, s)
                    }
                }
                addListeners() {
                    this.manageListeners(!0)
                }
                removeListeners() {
                    this.manageListeners(!1)
                }
                manageListeners(t) {
                    const i = this.container,
                        e = i.options,
                        s = e.interactivity.detectsOn;
                    s === g.window ? i.interactivity.element = window : s === g.parent && i.canvas.element ? i.interactivity.element = i.canvas.element.parentNode : i.interactivity.element = i.canvas.element;
                    const o = i.interactivity.element;
                    o && (e.interactivity.events.onHover.enable || e.interactivity.events.onClick.enable) && (ei.manageListener(o, w.mouseMoveEvent, this.mouseMoveHandler, t), ei.manageListener(o, w.touchStartEvent, this.touchStartHandler, t), ei.manageListener(o, w.touchMoveEvent, this.touchMoveHandler, t), e.interactivity.events.onClick.enable || ei.manageListener(o, w.touchEndEvent, this.touchEndHandler, t), ei.manageListener(o, w.mouseLeaveEvent, this.mouseLeaveHandler, t), ei.manageListener(o, w.touchCancelEvent, this.touchCancelHandler, t)), e.interactivity.events.onClick.enable && o && (ei.manageListener(o, w.touchEndEvent, this.touchEndClickHandler, t), ei.manageListener(o, w.mouseUpEvent, this.mouseUpHandler, t)), e.interactivity.events.resize && ei.manageListener(window, w.resizeEvent, this.resizeHandler, t), document && ei.manageListener(document, w.visibilityChangeEvent, this.visibilityChangeHandler, t, !1)
                }
                handleWindowResize() {
                    const t = this.container,
                        i = t.options,
                        e = t.canvas.element;
                    if (!e) return;
                    const s = t.retina.pixelRatio;
                    t.canvas.size.width = e.offsetWidth * s, t.canvas.size.height = e.offsetHeight * s, e.width = t.canvas.size.width, e.height = t.canvas.size.height, i.particles.move.enable || t.particles.redraw(), t.densityAutoParticles();
                    for (const [, i] of t.plugins) void 0 !== i.resize && i.resize()
                }
                handleVisibilityChange() {
                    const t = this.container;
                    t.options.pauseOnBlur && ((null === document || void 0 === document ? void 0 : document.hidden) ? (t.pageHidden = !0, t.pause()) : (t.pageHidden = !1, t.getAnimationStatus() ? t.play(!0) : t.draw()))
                }
                mouseTouchMove(t) {
                    var i, e, s;
                    const o = this.container,
                        n = o.options;
                    let a;
                    const r = o.canvas.element;
                    if (t.type.startsWith("mouse")) {
                        this.canPush = !0;
                        const e = t;
                        if (void 0 === (null === (i = o.interactivity) || void 0 === i ? void 0 : i.element)) return;
                        if (o.interactivity.element === window) {
                            if (r) {
                                const t = r.getBoundingClientRect();
                                a = {
                                    x: e.clientX - t.left,
                                    y: e.clientY - t.top
                                }
                            }
                        } else if (n.interactivity.detectsOn === g.parent) {
                            const t = e.target,
                                i = e.currentTarget;
                            if (t && i) {
                                const s = t.getBoundingClientRect(),
                                    o = i.getBoundingClientRect();
                                a = {
                                    x: e.offsetX + s.left - o.left,
                                    y: e.offsetY + s.top - o.top
                                }
                            } else a = {
                                x: e.offsetX || e.clientX,
                                y: e.offsetY || e.clientY
                            }
                        } else e.target === o.canvas.element && (a = {
                            x: e.offsetX || e.clientX,
                            y: e.offsetY || e.clientY
                        })
                    } else {
                        this.canPush = "touchmove" !== t.type;
                        const i = t,
                            o = i.touches[i.touches.length - 1],
                            n = null == r ? void 0 : r.getBoundingClientRect();
                        a = {
                            x: o.clientX - (null !== (e = null == n ? void 0 : n.left) && void 0 !== e ? e : 0),
                            y: o.clientY - (null !== (s = null == n ? void 0 : n.top) && void 0 !== s ? s : 0)
                        }
                    }
                    const l = o.retina.pixelRatio;
                    a && (a.x *= l, a.y *= l), o.interactivity.mouse.position = a, o.interactivity.status = w.mouseMoveEvent
                }
                mouseTouchFinish() {
                    const t = this.container;
                    delete t.interactivity.mouse.position, t.interactivity.status = w.mouseLeaveEvent
                }
                mouseTouchClick(t) {
                    const i = this.container,
                        e = i.options;
                    let s = !1;
                    const o = i.interactivity.mouse.position;
                    if (void 0 !== o && e.interactivity.events.onClick.enable) {
                        for (const [, t] of i.plugins)
                            if (void 0 !== t.clickPositionValid && (s = t.clickPositionValid(o), s)) break;
                        s || this.doMouseTouchClick(t)
                    }
                }
                doMouseTouchClick(t) {
                    const i = this.container,
                        e = i.options;
                    if (this.canPush) {
                        const t = i.interactivity.mouse.position;
                        if (!t) return;
                        i.interactivity.mouse.clickPosition = {
                            x: t.x,
                            y: t.y
                        }, i.interactivity.mouse.clickTime = (new Date).getTime();
                        const s = e.interactivity.events.onClick;
                        if (s.mode instanceof Array)
                            for (const t of s.mode) this.handleClickMode(t);
                        else this.handleClickMode(s.mode)
                    }
                    "touchend" === t.type && setTimeout(() => this.mouseTouchFinish(), 500)
                }
                handleClickMode(t) {
                    const i = this.container,
                        e = i.options,
                        s = e.interactivity.modes.push.quantity,
                        o = e.interactivity.modes.remove.quantity;
                    switch (t) {
                        case m.push:
                            s > 0 && (e.particles.move.enable || 1 === s ? i.particles.push(s, i.interactivity.mouse) : s > 1 && i.particles.push(s));
                            break;
                        case m.remove:
                            i.particles.removeQuantity(o);
                            break;
                        case m.bubble:
                            i.bubble.clicking = !0;
                            break;
                        case m.repulse:
                            i.repulse.clicking = !0, i.repulse.count = 0;
                            for (const t of i.repulse.particles) t.velocity.horizontal = t.initialVelocity.horizontal, t.velocity.vertical = t.initialVelocity.vertical;
                            i.repulse.particles = [], i.repulse.finish = !1, setTimeout(() => {
                                i.destroyed || (i.repulse.clicking = !1)
                            }, 1e3 * e.interactivity.modes.repulse.duration);
                            break;
                        case m.pause:
                            i.getAnimationStatus() ? i.pause() : i.play()
                    }
                    for (const [, e] of i.plugins) e.handleClickMode && e.handleClickMode(t)
                }
            }
            class si {
                constructor(t, i, ...e) {
                    this.id = t, this.sourceOptions = i, this.started = !1, this.destroyed = !1, this.paused = !0, this.lastFrameTime = 0, this.pageHidden = !1, this.retina = new Ct(this), this.canvas = new I(this), this.particles = new At(this), this.drawer = new Ot(this), this.noise = {
                        generate: () => ({
                            angle: Math.random() * Math.PI * 2,
                            length: Math.random()
                        }),
                        init: () => { },
                        update: () => { }
                    }, this.interactivity = {
                        mouse: {}
                    }, this.bubble = {}, this.repulse = {
                        particles: []
                    }, this.plugins = new Map, this.drawers = new Map, this.density = 1, this.options = new ii;
                    for (const t of e) this.options.load(M.getPreset(t));
                    const s = M.getSupportedShapes();
                    for (const t of s) {
                        const i = M.getShapeDrawer(t);
                        i && this.drawers.set(t, i)
                    }
                    this.sourceOptions && this.options.load(this.sourceOptions), this.eventListeners = new ei(this)
                }
                play(t) {
                    const i = this.paused || t;
                    if (this.paused && (this.paused = !1), i) {
                        for (const [, t] of this.plugins) t.play && t.play();
                        this.lastFrameTime = performance.now()
                    }
                    this.draw()
                }
                pause() {
                    if (void 0 !== this.drawAnimationFrame && (z.cancelAnimation(this.drawAnimationFrame), delete this.drawAnimationFrame), !this.paused) {
                        for (const [, t] of this.plugins) t.pause && t.pause();
                        this.pageHidden || (this.paused = !0)
                    }
                }
                draw() {
                    this.drawAnimationFrame = z.animate(t => {
                        var i;
                        return null === (i = this.drawer) || void 0 === i ? void 0 : i.nextFrame(t)
                    })
                }
                getAnimationStatus() {
                    return !this.paused
                }
                setNoise(t, i, e) {
                    t && ("function" == typeof t ? (this.noise.generate = t, i && (this.noise.init = i), e && (this.noise.update = e)) : (t.generate && (this.noise.generate = t.generate), t.init && (this.noise.init = t.init), t.update && (this.noise.update = t.update)))
                }
                densityAutoParticles() {
                    this.initDensityFactor();
                    const t = this.options.particles.number,
                        i = t.value,
                        e = t.limit > 0 ? t.limit : i,
                        s = Math.min(i, e) * this.density,
                        o = this.particles.count;
                    o < s ? this.particles.push(Math.abs(s - o)) : o > s && this.particles.removeQuantity(o - s)
                }
                destroy() {
                    this.stop(), this.canvas.destroy(), delete this.interactivity, delete this.options, delete this.retina, delete this.canvas, delete this.particles, delete this.bubble, delete this.repulse, delete this.drawer, delete this.eventListeners;
                    for (const [, t] of this.drawers) t.destroy && t.destroy(this);
                    this.drawers = new Map, this.destroyed = !0
                }
                exportImg(t) {
                    this.exportImage(t)
                }
                exportImage(t, i, e) {
                    var s;
                    return null === (s = this.canvas.element) || void 0 === s ? void 0 : s.toBlob(t, null != i ? i : "image/png", e)
                }
                exportConfiguration() {
                    return JSON.stringify(this.options, void 0, 2)
                }
                refresh() {
                    return s(this, void 0, void 0, (function* () {
                        this.stop(), yield this.start()
                    }))
                }
                stop() {
                    if (this.started) {
                        this.started = !1, this.eventListeners.removeListeners(), this.pause(), this.particles.clear(), this.canvas.clear();
                        for (const [, t] of this.plugins) t.stop && t.stop();
                        this.plugins = new Map, this.particles.linksColors = {}, delete this.particles.linksColor
                    }
                }
                start() {
                    return s(this, void 0, void 0, (function* () {
                        if (!this.started) {
                            yield this.init(), this.started = !0, this.eventListeners.addListeners();
                            for (const [, t] of this.plugins) void 0 !== t.startAsync ? yield t.startAsync() : void 0 !== t.start && t.start();
                            this.play()
                        }
                    }))
                }
                init() {
                    return s(this, void 0, void 0, (function* () {
                        this.retina.init(), this.canvas.init();
                        const t = M.getAvailablePlugins(this);
                        for (const [i, e] of t) this.plugins.set(i, e);
                        for (const [, t] of this.drawers) t.init && (yield t.init(this));
                        for (const [, t] of this.plugins) t.init ? t.init(this.options) : void 0 !== t.initAsync && (yield t.initAsync(this.options));
                        this.particles.init(), this.densityAutoParticles()
                    }))
                }
                initDensityFactor() {
                    const t = this.options.particles.number.density;
                    if (!this.canvas.element || !t.enable) return;
                    const i = this.canvas.element,
                        e = this.retina.pixelRatio;
                    this.density = i.width * i.height / (t.factor * e * t.area)
                }
            }
            const oi = [];
            class ni {
                static dom() {
                    return oi
                }
                static domItem(t) {
                    const i = ni.dom(),
                        e = i[t];
                    if (e && !e.destroyed) return e;
                    i.splice(t, 1)
                }
                static loadFromArray(t, i, e) {
                    return s(this, void 0, void 0, (function* () {
                        return ni.load(t, z.itemFromArray(i, e))
                    }))
                }
                static setFromArray(t, i, e, o) {
                    return s(this, void 0, void 0, (function* () {
                        return ni.set(t, i, z.itemFromArray(e, o))
                    }))
                }
                static load(t, i) {
                    return s(this, void 0, void 0, (function* () {
                        const e = document.getElementById(t);
                        if (e) return this.set(t, e, i)
                    }))
                }
                static set(t, i, e) {
                    return s(this, void 0, void 0, (function* () {
                        const s = ni.dom(),
                            o = s.findIndex(i => i.id === t);
                        if (o >= 0) {
                            const t = this.domItem(o);
                            t && !t.destroyed && (t.destroy(), s.splice(o, 1))
                        }
                        let n, a;
                        if ("canvas" === i.tagName) n = i, a = !1;
                        else {
                            const t = i.getElementsByTagName("canvas");
                            t.length ? (n = t[0], n.className || (n.className = w.canvasClass), a = !1) : (a = !0, n = document.createElement("canvas"), n.className = w.canvasClass, n.style.width = "100%", n.style.height = "100%", i.appendChild(n))
                        }
                        const r = new si(t, e);
                        return o >= 0 ? s.splice(o, 0, r) : s.push(r), r.canvas.loadCanvas(n, a), yield r.start(), r
                    }))
                }
                static loadJSON(t, i) {
                    return s(this, void 0, void 0, (function* () {
                        const e = yield fetch(i);
                        if (e.ok) {
                            const i = yield e.json();
                            return i instanceof Array ? ni.loadFromArray(t, i) : ni.load(t, i)
                        }
                        this.fetchError(e.status)
                    }))
                }
                static setJSON(t, i, e) {
                    return s(this, void 0, void 0, (function* () {
                        const s = yield fetch(e);
                        if (s.ok) {
                            const e = yield s.json();
                            return e instanceof Array ? ni.setFromArray(t, i, e) : ni.set(t, i, e)
                        }
                        this.fetchError(s.status)
                    }))
                }
                static setOnClickHandler(t) {
                    const i = ni.dom();
                    if (0 === i.length) throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
                    for (const e of i) {
                        const i = e.interactivity.element;
                        i && i.addEventListener("click", t)
                    }
                }
                static fetchError(t) {
                    console.error("Error tsParticles - fetch status: " + t), console.error("Error tsParticles - File config not found")
                }
            }
            class ai {
                constructor(t, i, e, s) {
                    var o, n;
                    this.absorbers = t, this.container = i, this.initialPosition = s, this.options = e;
                    let a = e.size.value * i.retina.pixelRatio;
                    const r = "boolean" == typeof e.size.random ? e.size.random : e.size.random.enable,
                        l = "boolean" == typeof e.size.random ? 1 : e.size.random.minimumValue;
                    r && (a = z.randomInRange(l, a)), this.opacity = this.options.opacity, this.size = a * i.retina.pixelRatio, this.mass = this.size * e.size.density;
                    const c = e.size.limit;
                    this.limit = void 0 !== c ? c * i.retina.pixelRatio : c;
                    const h = "string" == typeof e.color ? {
                        value: e.color
                    } : e.color;
                    this.color = null !== (o = x.colorToRgb(h)) && void 0 !== o ? o : {
                        b: 0,
                        g: 0,
                        r: 0
                    }, this.position = null !== (n = this.initialPosition) && void 0 !== n ? n : this.calcPosition()
                }
                attract(t) {
                    const i = t.getPosition(),
                        {
                            dx: e,
                            dy: s,
                            distance: o
                        } = z.getDistances(this.position, i),
                        n = Math.atan2(e, s) * (180 / Math.PI),
                        a = this.mass / Math.pow(o, 2);
                    if (o < this.size + t.size.value) {
                        const i = .033 * t.size.value;
                        this.size > t.size.value && o < this.size - t.size.value ? t.destroy() : (t.size.value -= i, t.velocity.horizontal += Math.sin(n * (Math.PI / 180)) * a, t.velocity.vertical += Math.cos(n * (Math.PI / 180)) * a), (void 0 === this.limit || this.size < this.limit) && (this.size += i), this.mass += i * this.options.size.density
                    } else t.velocity.horizontal += Math.sin(n * (Math.PI / 180)) * a, t.velocity.vertical += Math.cos(n * (Math.PI / 180)) * a
                }
                resize() {
                    const t = this.initialPosition;
                    this.position = t && z.isPointInside(t, this.container.canvas.size) ? t : this.calcPosition()
                }
                draw(t) {
                    t.translate(this.position.x, this.position.y), t.beginPath(), t.arc(0, 0, this.size, 0, 2 * Math.PI, !1), t.closePath(), t.fillStyle = x.getStyleFromRgb(this.color, this.opacity), t.fill()
                }
                calcPosition() {
                    var t;
                    const i = this.container,
                        e = null !== (t = this.options.position) && void 0 !== t ? t : {
                            x: 100 * Math.random(),
                            y: 100 * Math.random()
                        };
                    return {
                        x: e.x / 100 * i.canvas.size.width,
                        y: e.y / 100 * i.canvas.size.height
                    }
                }
            }
            class ri {
                constructor() {
                    this.enable = !1, this.minimumValue = 1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.enable && (this.enable = t.enable), void 0 !== t.minimumValue && (this.minimumValue = t.minimumValue))
                }
            }
            class li {
                constructor() {
                    this.density = 5, this.random = new ri, this.value = 50
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.density && (this.density = t.density), void 0 !== t.value && (this.value = t.value), void 0 !== t.random && ("boolean" == typeof t.random ? this.random.load({
                        enable: t.random
                    }) : this.random.load(t.random)), void 0 !== t.limit && (this.limit = t.limit))
                }
            }
            class ci {
                constructor() {
                    this.color = new V, this.color.value = "#000000", this.opacity = 1, this.size = new li
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.color && (this.color = V.create(this.color, t.color)), void 0 !== t.opacity && (this.opacity = t.opacity), void 0 !== t.position && (this.position = {
                        x: t.position.x,
                        y: t.position.y
                    }), void 0 !== t.size && this.size.load(t.size))
                }
            }
            var hi;
            ! function (t) {
                t.absorber = "absorber"
            }(hi || (hi = {}));
            class di {
                constructor(t) {
                    this.container = t, this.array = [], this.absorbers = [], this.interactivityAbsorbers = []
                }
                init(t) {
                    var i, e;
                    if (!t) return;
                    t.absorbers && (t.absorbers instanceof Array ? this.absorbers = t.absorbers.map(t => {
                        const i = new ci;
                        return i.load(t), i
                    }) : (this.absorbers instanceof Array && (this.absorbers = new ci), this.absorbers.load(t.absorbers)));
                    const s = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.modes) || void 0 === e ? void 0 : e.absorbers;
                    if (s && (s instanceof Array ? this.interactivityAbsorbers = s.map(t => {
                        const i = new ci;
                        return i.load(t), i
                    }) : (this.interactivityAbsorbers instanceof Array && (this.interactivityAbsorbers = new ci), this.interactivityAbsorbers.load(s))), this.absorbers instanceof Array)
                        for (const t of this.absorbers) {
                            const i = new ai(this, this.container, t);
                            this.addAbsorber(i)
                        } else {
                        const t = this.absorbers,
                            i = new ai(this, this.container, t);
                        this.addAbsorber(i)
                    }
                }
                particleUpdate(t) {
                    for (const i of this.array)
                        if (i.attract(t), t.destroyed) break
                }
                draw(t) {
                    for (const i of this.array) t.save(), i.draw(t), t.restore()
                }
                stop() {
                    this.array = []
                }
                resize() {
                    for (const t of this.array) t.resize()
                }
                handleClickMode(t) {
                    const i = this.container,
                        e = this.absorbers,
                        s = this.interactivityAbsorbers;
                    if (t === hi.absorber) {
                        let t;
                        s instanceof Array ? s.length > 0 && (t = z.itemFromArray(s)) : t = s;
                        const o = null != t ? t : e instanceof Array ? z.itemFromArray(e) : e,
                            n = i.interactivity.mouse.clickPosition,
                            a = new ai(this, this.container, o, n);
                        this.addAbsorber(a)
                    }
                }
                addAbsorber(t) {
                    this.array.push(t)
                }
                removeAbsorber(t) {
                    const i = this.array.indexOf(t);
                    i >= 0 && this.array.splice(i, 1)
                }
            }
            const ui = new class {
                constructor() {
                    this.id = "absorbers"
                }
                getPlugin(t) {
                    return new di(t)
                }
                needsPlugin(t) {
                    var i, e, s;
                    if (!(null == t ? void 0 : t.absorbers)) return !1;
                    const o = t.absorbers;
                    let n = !1;
                    return o instanceof Array ? o.length && (n = !0) : (void 0 !== o || (null === (s = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.events) || void 0 === e ? void 0 : e.onClick) || void 0 === s ? void 0 : s.mode) && z.isInArray(hi.absorber, t.interactivity.events.onClick.mode)) && (n = !0), n
                }
                loadOptions(t, i) {
                    var e, s;
                    if (!this.needsPlugin(i)) return;
                    const o = t;
                    void 0 === o.absorbers && (o.absorbers = new ci), (null == i ? void 0 : i.absorbers) && ((null == i ? void 0 : i.absorbers) instanceof Array ? o.absorbers = null == i ? void 0 : i.absorbers.map(t => {
                        const i = new ci;
                        return i.load(t), i
                    }) : (o.absorbers instanceof Array && (o.absorbers = new ci), o.absorbers.load(null == i ? void 0 : i.absorbers)));
                    const n = null === (s = null === (e = null == i ? void 0 : i.interactivity) || void 0 === e ? void 0 : e.modes) || void 0 === s ? void 0 : s.absorbers;
                    n && (n instanceof Array ? o.interactivity.modes.absorbers = n.map(t => {
                        const i = new ci;
                        return i.load(t), i
                    }) : ((o.interactivity.modes.absorbers instanceof Array || void 0 === o.interactivity.modes.absorbers) && (o.interactivity.modes.absorbers = new ci), o.interactivity.modes.absorbers.load(n)))
                }
            };
            var vi, pi;
            ! function (t) {
                t.precise = "precise", t.percent = "percent"
            }(vi || (vi = {}));
            class mi {
                constructor() {
                    this.mode = vi.percent, this.height = 0, this.width = 0
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.mode && (this.mode = t.mode), void 0 !== t.height && (this.height = t.height), void 0 !== t.width && (this.width = t.width))
                }
            }
            class yi {
                constructor(t, i, e, s) {
                    var o, n, a;
                    this.emitters = t, this.container = i, this.initialPosition = s, this.emitterOptions = z.deepExtend({}, e), this.position = null !== (o = this.initialPosition) && void 0 !== o ? o : this.calcPosition();
                    let r = z.deepExtend({}, this.emitterOptions.particles);
                    void 0 === r && (r = {}), void 0 === r.move && (r.move = {}), void 0 === r.move.direction && (r.move.direction = this.emitterOptions.direction), this.particlesOptions = r, this.size = null !== (n = this.emitterOptions.size) && void 0 !== n ? n : (() => {
                        const t = new mi;
                        return t.load({
                            height: 0,
                            mode: vi.percent,
                            width: 0
                        }), t
                    })(), this.lifeCount = null !== (a = this.emitterOptions.life.count) && void 0 !== a ? a : -1, this.play()
                }
                play() {
                    (this.lifeCount > 0 || !this.emitterOptions.life.count) && (void 0 === this.startInterval && (this.startInterval = window.setInterval(() => {
                        this.emit()
                    }, 1e3 * this.emitterOptions.rate.delay)), this.lifeCount > 0 && this.prepareToDie())
                }
                pause() {
                    const t = this.startInterval;
                    void 0 !== t && (clearInterval(t), delete this.startInterval)
                }
                resize() {
                    const t = this.initialPosition;
                    this.position = t && z.isPointInside(t, this.container.canvas.size) ? t : this.calcPosition()
                }
                prepareToDie() {
                    var t;
                    this.lifeCount > 0 && void 0 !== (null === (t = this.emitterOptions.life) || void 0 === t ? void 0 : t.duration) && window.setTimeout(() => {
                        var t;
                        this.pause(), this.lifeCount--, this.lifeCount > 0 ? (this.position = this.calcPosition(), window.setTimeout(() => {
                            this.play()
                        }, null !== (t = this.emitterOptions.life.delay) && void 0 !== t ? t : 0)) : this.destroy()
                    }, 1e3 * this.emitterOptions.life.duration)
                }
                destroy() {
                    this.emitters.removeEmitter(this)
                }
                calcPosition() {
                    var t;
                    const i = this.container,
                        e = null !== (t = this.emitterOptions.position) && void 0 !== t ? t : {
                            x: 100 * Math.random(),
                            y: 100 * Math.random()
                        };
                    return {
                        x: e.x / 100 * i.canvas.size.width,
                        y: e.y / 100 * i.canvas.size.height
                    }
                }
                emit() {
                    const t = this.container,
                        i = this.position,
                        e = this.size.mode === vi.percent ? t.canvas.size.width * this.size.width / 100 : this.size.width,
                        s = this.size.mode === vi.percent ? t.canvas.size.height * this.size.height / 100 : this.size.height;
                    for (let o = 0; o < this.emitterOptions.rate.quantity; o++) t.particles.addParticle({
                        x: i.x + e * (Math.random() - .5),
                        y: i.y + s * (Math.random() - .5)
                    }, this.particlesOptions)
                }
            }
            class fi {
                constructor() {
                    this.quantity = 1, this.delay = .1
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.quantity && (this.quantity = t.quantity), void 0 !== t.delay && (this.delay = t.delay))
                }
            }
            class gi {
                load(t) {
                    void 0 !== t && (void 0 !== t.count && (this.count = t.count), void 0 !== t.delay && (this.delay = t.delay), void 0 !== t.duration && (this.duration = t.duration))
                }
            }
            class bi {
                constructor() {
                    this.direction = o.none, this.life = new gi, this.rate = new fi
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.size && (void 0 === this.size && (this.size = new mi), this.size.load(t.size)), void 0 !== t.direction && (this.direction = t.direction), this.life.load(t.life), void 0 !== t.particles && (this.particles = z.deepExtend({}, t.particles)), this.rate.load(t.rate), void 0 !== t.position && (this.position = {
                        x: t.position.x,
                        y: t.position.y
                    }))
                }
            } ! function (t) {
                t.emitter = "emitter"
            }(pi || (pi = {}));
            class wi {
                constructor(t) {
                    this.container = t, this.array = [], this.emitters = [], this.interactivityEmitters = []
                }
                init(t) {
                    var i, e;
                    if (!t) return;
                    t.emitters && (t.emitters instanceof Array ? this.emitters = t.emitters.map(t => {
                        const i = new bi;
                        return i.load(t), i
                    }) : (this.emitters instanceof Array && (this.emitters = new bi), this.emitters.load(t.emitters)));
                    const s = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.modes) || void 0 === e ? void 0 : e.emitters;
                    if (s && (s instanceof Array ? this.interactivityEmitters = s.map(t => {
                        const i = new bi;
                        return i.load(t), i
                    }) : (this.interactivityEmitters instanceof Array && (this.interactivityEmitters = new bi), this.interactivityEmitters.load(s))), this.emitters instanceof Array)
                        for (const t of this.emitters) {
                            const i = new yi(this, this.container, t);
                            this.addEmitter(i)
                        } else {
                        const t = this.emitters,
                            i = new yi(this, this.container, t);
                        this.addEmitter(i)
                    }
                }
                play() {
                    for (const t of this.array) t.play()
                }
                pause() {
                    for (const t of this.array) t.pause()
                }
                stop() {
                    this.array = []
                }
                handleClickMode(t) {
                    const i = this.container,
                        e = this.emitters,
                        s = this.interactivityEmitters;
                    if (t === pi.emitter) {
                        let t;
                        s instanceof Array ? s.length > 0 && (t = z.itemFromArray(s)) : t = s;
                        const o = null != t ? t : e instanceof Array ? z.itemFromArray(e) : e,
                            n = i.interactivity.mouse.clickPosition,
                            a = new yi(this, this.container, z.deepExtend({}, o), n);
                        this.addEmitter(a)
                    }
                }
                resize() {
                    for (const t of this.array) t.resize()
                }
                addEmitter(t) {
                    this.array.push(t)
                }
                removeEmitter(t) {
                    const i = this.array.indexOf(t);
                    i >= 0 && this.array.splice(i, 1)
                }
            }
            const xi = new class {
                constructor() {
                    this.id = "emitters"
                }
                getPlugin(t) {
                    return new wi(t)
                }
                needsPlugin(t) {
                    var i, e, s;
                    if (!(null == t ? void 0 : t.emitters)) return !1;
                    const o = t.emitters;
                    let n = !1;
                    return o instanceof Array ? o.length && (n = !0) : (void 0 !== o || (null === (s = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.events) || void 0 === e ? void 0 : e.onClick) || void 0 === s ? void 0 : s.mode) && z.isInArray(pi.emitter, t.interactivity.events.onClick.mode)) && (n = !0), n
                }
                loadOptions(t, i) {
                    var e, s;
                    if (!this.needsPlugin(i)) return;
                    const o = t;
                    void 0 === o.emitters && (o.emitters = new bi), (null == i ? void 0 : i.emitters) && ((null == i ? void 0 : i.emitters) instanceof Array ? o.emitters = null == i ? void 0 : i.emitters.map(t => {
                        const i = new bi;
                        return i.load(t), i
                    }) : (o.emitters instanceof Array && (o.emitters = new bi), o.emitters.load(null == i ? void 0 : i.emitters)));
                    const n = null === (s = null === (e = null == i ? void 0 : i.interactivity) || void 0 === e ? void 0 : e.modes) || void 0 === s ? void 0 : s.emitters;
                    n && (n instanceof Array ? o.interactivity.modes.emitters = n.map(t => {
                        const i = new bi;
                        return i.load(t), i
                    }) : ((o.interactivity.modes.emitters instanceof Array || void 0 === o.interactivity.modes.emitters) && (o.interactivity.modes.emitters = new bi), o.interactivity.modes.emitters.load(n)))
                }
            };
            var zi, ki, Pi;
            ! function (t) {
                t.inline = "inline", t.inside = "inside", t.outside = "outside", t.none = "none"
            }(zi || (zi = {})),
                function (t) {
                    t.equidistant = "equidistant", t.onePerPoint = "one-per-point", t.perPoint = "per-point", t.randomLength = "random-length", t.randomPoint = "random-point"
                }(ki || (ki = {}));
            class Mi {
                constructor() {
                    this.color = new V, this.width = .5, this.opacity = 1
                }
                load(t) {
                    var i;
                    void 0 !== t && (this.color = V.create(this.color, t.color), "string" == typeof this.color.value && (this.opacity = null !== (i = x.stringToAlpha(this.color.value)) && void 0 !== i ? i : this.opacity), void 0 !== t.opacity && (this.opacity = t.opacity), void 0 !== t.width && (this.width = t.width))
                }
            }
            class Si {
                constructor() {
                    this.enable = !1, this.stroke = new Mi
                }
                get lineWidth() {
                    return this.stroke.width
                }
                set lineWidth(t) {
                    this.stroke.width = t
                }
                get lineColor() {
                    return this.stroke.color
                }
                set lineColor(t) {
                    this.stroke.color = V.create(this.stroke.color, t)
                }
                load(t) {
                    var i;
                    if (void 0 !== t) {
                        void 0 !== t.enable && (this.enable = t.enable);
                        const e = null !== (i = t.stroke) && void 0 !== i ? i : {
                            color: t.lineColor,
                            width: t.lineWidth
                        };
                        this.stroke.load(e)
                    }
                }
            } ! function (t) {
                t.path = "path", t.radius = "radius"
            }(Pi || (Pi = {}));
            class Ai {
                constructor() {
                    this.radius = 10, this.type = Pi.path
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.radius && (this.radius = t.radius), void 0 !== t.type && (this.type = t.type))
                }
            }
            class Ci {
                constructor() {
                    this.arrangement = ki.onePerPoint
                }
                load(t) {
                    void 0 !== t && void 0 !== t.arrangement && (this.arrangement = t.arrangement)
                }
            }
            class Oi {
                constructor() {
                    this.path = [], this.size = {
                        height: 0,
                        width: 0
                    }
                }
                load(t) {
                    void 0 !== t && (void 0 !== t.path && (this.path = t.path), void 0 !== t.size && (void 0 !== t.size.width && (this.size.width = t.size.width), void 0 !== t.size.height && (this.size.height = t.size.height)))
                }
            }
            class Ti {
                constructor() {
                    this.draw = new Si, this.enable = !1, this.inline = new Ci, this.move = new Ai, this.scale = 1, this.type = zi.none
                }
                get inlineArrangement() {
                    return this.inline.arrangement
                }
                set inlineArrangement(t) {
                    this.inline.arrangement = t
                }
                load(t) {
                    var i;
                    if (void 0 !== t) {
                        this.draw.load(t.draw);
                        const e = null !== (i = t.inline) && void 0 !== i ? i : {
                            arrangement: t.inlineArrangement
                        };
                        void 0 !== e && this.inline.load(e), this.move.load(t.move), void 0 !== t.scale && (this.scale = t.scale), void 0 !== t.type && (this.type = t.type), void 0 !== t.enable ? this.enable = t.enable : this.enable = this.type !== zi.none, void 0 !== t.url && (this.url = t.url), void 0 !== t.data && ("string" == typeof t.data ? this.data = t.data : (this.data = new Oi, this.data.load(t.data))), void 0 !== t.position && (this.position = {
                            x: t.position.x,
                            y: t.position.y
                        })
                    }
                }
            }
            class Ri {
                constructor(t) {
                    this.container = t, this.dimension = {
                        height: 0,
                        width: 0
                    }, this.path2DSupported = !!window.Path2D, this.options = new Ti, this.polygonMaskMoveRadius = this.options.move.radius * t.retina.pixelRatio
                }
                static polygonBounce(t) {
                    t.velocity.horizontal = t.velocity.vertical / 2 - t.velocity.horizontal, t.velocity.vertical = t.velocity.horizontal / 2 - t.velocity.vertical
                }
                static drawPolygonMask(t, i, e) {
                    const s = x.colorToRgb(e.color);
                    if (s) {
                        t.beginPath(), t.moveTo(i[0].x, i[0].y);
                        for (const e of i) t.lineTo(e.x, e.y);
                        t.closePath(), t.strokeStyle = x.getStyleFromRgb(s), t.lineWidth = e.width, t.stroke()
                    }
                }
                static drawPolygonMaskPath(t, i, e, s) {
                    t.translate(s.x, s.y);
                    const o = x.colorToRgb(e.color);
                    o && (t.strokeStyle = x.getStyleFromRgb(o, e.opacity), t.lineWidth = e.width, t.stroke(i))
                }
                static parsePaths(t, i, e) {
                    const s = [];
                    for (const o of t) {
                        const t = o.element.pathSegList,
                            n = t.numberOfItems,
                            a = {
                                x: 0,
                                y: 0
                            };
                        for (let o = 0; o < n; o++) {
                            const n = t.getItem(o),
                                r = window.SVGPathSeg;
                            switch (n.pathSegType) {
                                case r.PATHSEG_MOVETO_ABS:
                                case r.PATHSEG_LINETO_ABS:
                                case r.PATHSEG_CURVETO_CUBIC_ABS:
                                case r.PATHSEG_CURVETO_QUADRATIC_ABS:
                                case r.PATHSEG_ARC_ABS:
                                case r.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                                case r.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                                    const t = n;
                                    a.x = t.x, a.y = t.y;
                                    break
                                }
                                case r.PATHSEG_LINETO_HORIZONTAL_ABS:
                                    a.x = n.x;
                                    break;
                                case r.PATHSEG_LINETO_VERTICAL_ABS:
                                    a.y = n.y;
                                    break;
                                case r.PATHSEG_LINETO_REL:
                                case r.PATHSEG_MOVETO_REL:
                                case r.PATHSEG_CURVETO_CUBIC_REL:
                                case r.PATHSEG_CURVETO_QUADRATIC_REL:
                                case r.PATHSEG_ARC_REL:
                                case r.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                                case r.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                                    const t = n;
                                    a.x += t.x, a.y += t.y;
                                    break
                                }
                                case r.PATHSEG_LINETO_HORIZONTAL_REL:
                                    a.x += n.x;
                                    break;
                                case r.PATHSEG_LINETO_VERTICAL_REL:
                                    a.y += n.y;
                                    break;
                                case r.PATHSEG_UNKNOWN:
                                case r.PATHSEG_CLOSEPATH:
                                    continue
                            }
                            s.push({
                                x: a.x * i + e.x,
                                y: a.y * i + e.y
                            })
                        }
                    }
                    return s
                }
                initAsync(t) {
                    return s(this, void 0, void 0, (function* () {
                        this.options.load(null == t ? void 0 : t.polygon);
                        const i = this.options;
                        this.polygonMaskMoveRadius = i.move.radius * this.container.retina.pixelRatio, i.enable && (yield this.initRawData())
                    }))
                }
                resize() {
                    const t = this.container,
                        i = this.options;
                    i.enable && i.type !== zi.none && (this.redrawTimeout && clearTimeout(this.redrawTimeout), this.redrawTimeout = window.setTimeout(() => s(this, void 0, void 0, (function* () {
                        yield this.initRawData(!0), t.particles.redraw()
                    })), 250))
                }
                stop() {
                    delete this.raw, delete this.paths
                }
                particlesInitialization() {
                    const t = this.options;
                    return !(!t.enable || t.type !== zi.inline || t.inline.arrangement !== ki.onePerPoint && t.inline.arrangement !== ki.perPoint) && (this.drawPoints(), !0)
                }
                particlePosition(t, i) {
                    var e, s;
                    const o = this.options;
                    if (!(o.enable && (null !== (s = null === (e = this.raw) || void 0 === e ? void 0 : e.length) && void 0 !== s ? s : 0) > 0)) return;
                    const n = z.deepExtend({}, t || this.randomPoint());
                    return o.type === zi.inline && i && (i.initialPosition = n), n
                }
                particleBounce(t) {
                    const i = this.options;
                    if (i.enable && i.type !== zi.none && i.type !== zi.inline) {
                        if (!this.checkInsidePolygon(t.getPosition())) return Ri.polygonBounce(t), !0
                    } else if (i.enable && i.type === zi.inline && t.initialPosition) {
                        if (z.getDistance(t.initialPosition, t.getPosition()) > this.polygonMaskMoveRadius) return Ri.polygonBounce(t), !0
                    }
                    return !1
                }
                clickPositionValid(t) {
                    const i = this.options;
                    return i.enable && i.type !== zi.none && i.type !== zi.inline && this.checkInsidePolygon(t)
                }
                draw(t) {
                    var i;
                    if (!(null === (i = this.paths) || void 0 === i ? void 0 : i.length)) return;
                    const e = this.options,
                        s = e.draw;
                    if (!e.enable || !s.enable) return;
                    const o = this.raw;
                    for (const i of this.paths) {
                        const e = i.path2d,
                            n = this.path2DSupported;
                        t && (n && e && this.offset ? Ri.drawPolygonMaskPath(t, e, s.stroke, this.offset) : o && Ri.drawPolygonMask(t, o, s.stroke))
                    }
                }
                checkInsidePolygon(t) {
                    var i, e;
                    const s = this.container,
                        o = this.options;
                    if (!o.enable || o.type === zi.none || o.type === zi.inline) return !0;
                    if (!this.raw) throw new Error(w.noPolygonFound);
                    const n = s.canvas.size,
                        a = null !== (i = null == t ? void 0 : t.x) && void 0 !== i ? i : Math.random() * n.width,
                        r = null !== (e = null == t ? void 0 : t.y) && void 0 !== e ? e : Math.random() * n.height;
                    let l = !1;
                    for (let t = 0, i = this.raw.length - 1; t < this.raw.length; i = t++) {
                        const e = this.raw[t],
                            s = this.raw[i];
                        e.y > r != s.y > r && a < (s.x - e.x) * (r - e.y) / (s.y - e.y) + e.x && (l = !l)
                    }
                    return o.type === zi.inside ? l : o.type === zi.outside && !l
                }
                parseSvgPath(t, i) {
                    var e, s, o;
                    const n = null != i && i;
                    if (void 0 !== this.paths && !n) return this.raw;
                    const a = this.container,
                        r = this.options,
                        l = (new DOMParser).parseFromString(t, "image/svg+xml"),
                        c = l.getElementsByTagName("svg")[0];
                    let h = c.getElementsByTagName("path");
                    h.length || (h = l.getElementsByTagName("path")), this.paths = [];
                    for (let t = 0; t < h.length; t++) {
                        const i = h.item(t);
                        i && this.paths.push({
                            element: i,
                            length: i.getTotalLength()
                        })
                    }
                    const d = a.retina.pixelRatio,
                        u = r.scale / d;
                    this.dimension.width = parseFloat(null !== (e = c.getAttribute("width")) && void 0 !== e ? e : "0") * u, this.dimension.height = parseFloat(null !== (s = c.getAttribute("height")) && void 0 !== s ? s : "0") * u;
                    const v = null !== (o = r.position) && void 0 !== o ? o : {
                        x: 50,
                        y: 50
                    };
                    return this.offset = {
                        x: a.canvas.size.width * v.x / (100 * d) - this.dimension.width / 2,
                        y: a.canvas.size.height * v.y / (100 * d) - this.dimension.height / 2
                    }, Ri.parsePaths(this.paths, u, this.offset)
                }
                downloadSvgPath(t, i) {
                    return s(this, void 0, void 0, (function* () {
                        const e = this.options,
                            s = t || e.url,
                            o = null != i && i;
                        if (!s || void 0 !== this.paths && !o) return this.raw;
                        const n = yield fetch(s);
                        if (!n.ok) throw new Error("tsParticles Error - Error occurred during polygon mask download");
                        return this.parseSvgPath(yield n.text(), i)
                    }))
                }
                drawPoints() {
                    if (this.raw)
                        for (const t of this.raw) this.container.particles.addParticle({
                            x: t.x,
                            y: t.y
                        })
                }
                randomPoint() {
                    const t = this.container,
                        i = this.options;
                    let e;
                    if (i.type === zi.inline) switch (i.inline.arrangement) {
                        case ki.randomPoint:
                            e = this.getRandomPoint();
                            break;
                        case ki.randomLength:
                            e = this.getRandomPointByLength();
                            break;
                        case ki.equidistant:
                            e = this.getEquidistantPointByIndex(t.particles.count);
                            break;
                        case ki.onePerPoint:
                        case ki.perPoint:
                        default:
                            e = this.getPointByIndex(t.particles.count)
                    } else e = {
                        x: Math.random() * t.canvas.size.width,
                        y: Math.random() * t.canvas.size.height
                    };
                    return this.checkInsidePolygon(e) ? e : this.randomPoint()
                }
                getRandomPoint() {
                    if (!this.raw || !this.raw.length) throw new Error(w.noPolygonDataLoaded);
                    const t = z.itemFromArray(this.raw);
                    return {
                        x: t.x,
                        y: t.y
                    }
                }
                getRandomPointByLength() {
                    var t, i, e;
                    const s = this.options;
                    if (!this.raw || !this.raw.length || !(null === (t = this.paths) || void 0 === t ? void 0 : t.length)) throw new Error(w.noPolygonDataLoaded);
                    const o = z.itemFromArray(this.paths),
                        n = Math.floor(Math.random() * o.length) + 1,
                        a = o.element.getPointAtLength(n);
                    return {
                        x: a.x * s.scale + ((null === (i = this.offset) || void 0 === i ? void 0 : i.x) || 0),
                        y: a.y * s.scale + ((null === (e = this.offset) || void 0 === e ? void 0 : e.y) || 0)
                    }
                }
                getEquidistantPointByIndex(t) {
                    var i, e, s, o, n, a, r;
                    const l = this.container.options,
                        c = this.options;
                    if (!this.raw || !this.raw.length || !(null === (i = this.paths) || void 0 === i ? void 0 : i.length)) throw new Error(w.noPolygonDataLoaded);
                    let h, d = 0;
                    const u = this.paths.reduce((t, i) => t + i.length, 0) / l.particles.number.value;
                    for (const i of this.paths) {
                        const e = u * t - d;
                        if (e <= i.length) {
                            h = i.element.getPointAtLength(e);
                            break
                        }
                        d += i.length
                    }
                    return {
                        x: (null !== (e = null == h ? void 0 : h.x) && void 0 !== e ? e : 0) * c.scale + (null !== (o = null === (s = this.offset) || void 0 === s ? void 0 : s.x) && void 0 !== o ? o : 0),
                        y: (null !== (n = null == h ? void 0 : h.y) && void 0 !== n ? n : 0) * c.scale + (null !== (r = null === (a = this.offset) || void 0 === a ? void 0 : a.y) && void 0 !== r ? r : 0)
                    }
                }
                getPointByIndex(t) {
                    if (!this.raw || !this.raw.length) throw new Error(w.noPolygonDataLoaded);
                    const i = this.raw[t % this.raw.length];
                    return {
                        x: i.x,
                        y: i.y
                    }
                }
                createPath2D() {
                    var t, i;
                    const e = this.options;
                    if (this.path2DSupported && (null === (t = this.paths) || void 0 === t ? void 0 : t.length))
                        for (const t of this.paths) {
                            const s = null === (i = t.element) || void 0 === i ? void 0 : i.getAttribute("d");
                            if (s) {
                                const i = new Path2D(s),
                                    o = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
                                    n = new Path2D,
                                    a = o.scale(e.scale);
                                n.addPath ? (n.addPath(i, a), t.path2d = n) : delete t.path2d
                            } else delete t.path2d;
                            !t.path2d && this.raw && (t.path2d = new Path2D, t.path2d.moveTo(this.raw[0].x, this.raw[0].y), this.raw.forEach((i, e) => {
                                var s;
                                e > 0 && (null === (s = t.path2d) || void 0 === s || s.lineTo(i.x, i.y))
                            }), t.path2d.closePath())
                        }
                }
                initRawData(t) {
                    return s(this, void 0, void 0, (function* () {
                        const i = this.options;
                        if (i.url) this.raw = yield this.downloadSvgPath(i.url, t);
                        else if (i.data) {
                            const e = i.data;
                            let s;
                            if ("string" != typeof e) {
                                const t = e.path instanceof Array ? e.path.map(t => `<path d="${t}" />`).join("") : `<path d="${e.path}" />`;
                                s = `<svg ${'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'} width="${e.size.width}" height="${e.size.height}">${t}</svg>`
                            } else s = e;
                            this.raw = this.parseSvgPath(s, t)
                        }
                        this.createPath2D()
                    }))
                }
            }
            const Ei = new class {
                constructor() {
                    this.id = "polygonMask"
                }
                getPlugin(t) {
                    return new Ri(t)
                }
                needsPlugin(t) {
                    var i, e, s;
                    return null !== (e = null === (i = null == t ? void 0 : t.polygon) || void 0 === i ? void 0 : i.enable) && void 0 !== e ? e : void 0 !== (null === (s = null == t ? void 0 : t.polygon) || void 0 === s ? void 0 : s.type) && t.polygon.type !== zi.none
                }
                loadOptions(t, i) {
                    if (!this.needsPlugin(i)) return;
                    const e = t;
                    void 0 === e.polygon && (e.polygon = new Ti), e.polygon.load(null == i ? void 0 : i.polygon)
                }
            };
            const Ii = new class extends class {
                constructor() {
                    this.initialized = !1;
                    const t = new b,
                        i = new k,
                        e = new P;
                    M.addShapeDrawer(n.line, new S), M.addShapeDrawer(n.circle, new A), M.addShapeDrawer(n.edge, t), M.addShapeDrawer(n.square, t), M.addShapeDrawer(n.triangle, new O), M.addShapeDrawer(n.star, new T), M.addShapeDrawer(n.polygon, new R), M.addShapeDrawer(n.char, i), M.addShapeDrawer(n.character, i), M.addShapeDrawer(n.image, e), M.addShapeDrawer(n.images, e)
                }
                init() {
                    this.initialized || (this.initialized = !0)
                }
                loadFromArray(t, i, e) {
                    return s(this, void 0, void 0, (function* () {
                        return ni.loadFromArray(t, i, e)
                    }))
                }
                load(t, i) {
                    return s(this, void 0, void 0, (function* () {
                        return ni.load(t, i)
                    }))
                }
                loadJSON(t, i) {
                    return ni.loadJSON(t, i)
                }
                setOnClickHandler(t) {
                    ni.setOnClickHandler(t)
                }
                dom() {
                    return ni.dom()
                }
                domItem(t) {
                    return ni.domItem(t)
                }
                addShape(t, i, e, s, o) {
                    let n;
                    n = "function" == typeof i ? {
                        afterEffect: s,
                        destroy: o,
                        draw: i,
                        init: e
                    } : i, M.addShapeDrawer(t, n)
                }
                addPreset(t, i) {
                    M.addPreset(t, i)
                }
                addPlugin(t) {
                    M.addPlugin(t)
                }
            } {
                constructor() {
                    super(), this.addPlugin(ui), this.addPlugin(xi), this.addPlugin(Ei)
                }
            };
            Ii.init();
            const {
                particlesJS: Di,
                pJSDom: Li
            } = (t => {
                const i = (i, e) => t.load(i, e);
                i.load = (i, e, s) => {
                    t.loadJSON(i, e).then(t => {
                        t && s(t)
                    })
                }, i.setOnClickHandler = i => {
                    t.setOnClickHandler(i)
                };
                return {
                    particlesJS: i,
                    pJSDom: t.dom()
                }
            })(Ii)
        }
    }));

    e(".premium-particles-yes").length && Object.values(window.scopes_array).forEach(function (t) {
        $scope = t,
            function (t) {
                var a = t,
                    i = a.data("id"),
                    s = {};
                s = elementorFrontend.isEditMode() ? function (t) {
                    var i = null,
                        n = {};
                    if (!window.elementor.hasOwnProperty("elements")) return !1;
                    if (!(i = window.elementor.elements).models) return !1;
                    if (e.each(i.models, function (i, s) {
                        t === s.id ? n = s.attributes.settings.attributes : s.id === a.closest(".elementor-top-section").data("id") && e.each(s.attributes.elements.models, function (t, a) {
                            e.each(a.attributes.elements.models, function (e, t) {
                                n = t.attributes.settings.attributes
                            })
                        })
                    }), !n.hasOwnProperty("premium_particles_custom_style")) return !1;
                    if ("" == n.premium_particles_custom_style) return !1;
                    if (s.switcher = n.premium_particles_switcher, s.zindex = n.premium_particles_zindex, s.style = JSON.parse(n.premium_particles_custom_style), s.devices = n.premium_particles_responsive, 0 !== Object.keys(s).length) return s;
                    return !1
                }(i) : function () {
                    var e = a.data();
                    if (!e.particlesStyle) return !1;
                    if (s.zindex = e.particlesZindex, s.style = e.particlesStyle, s.devices = e.particlesDevices.split(" "), 0 !== Object.keys(s).length) return s
                }();
                if (!s) return !1;
                var n = elementorFrontend.getCurrentDeviceMode();
                if (-1 === s.devices.indexOf(n)) return;
                a.attr("id", "premium-section-particles-" + i), tsParticles.load("premium-section-particles-" + i, s.style), a.children("canvas.tsparticles-canvas-el").css({
                    zIndex: s.zindex
                })
            }($scope)
    })
}(jQuery);