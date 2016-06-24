/**
 * jsPDF AutoTable plugin v2.0.26
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 *
 * @preserve
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("jspdf")) : "function" == typeof define && define.amd ? define(["jspdf"], e) : e(t.jsPDF)
}(this, function(t) {
    "use strict";

    function e() {
        return {
            theme: "striped",
            styles: {},
            headerStyles: {},
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
            startY: !1,
            margin: 40,
            pageBreak: "auto",
            tableWidth: "auto",
            createdHeaderCell: function(t, e) {},
            createdCell: function(t, e) {},
            drawHeaderRow: function(t, e) {},
            drawRow: function(t, e) {},
            drawHeaderCell: function(t, e) {},
            drawCell: function(t, e) {},
            beforePageContent: function(t) {},
            afterPageContent: function(t) {}
        }
    }

    function n() {
        return {
            cellPadding: 5,
            fontSize: 10,
            font: "helvetica",
            lineColor: 200,
            lineWidth: .1,
            fontStyle: "normal",
            overflow: "ellipsize",
            fillColor: 255,
            textColor: 20,
            halign: "left",
            valign: "top",
            fillStyle: "F",
            rowHeight: 20,
            columnWidth: "auto"
        }
    }

    function o(t, e, n) {
        t && "object" === ("undefined" == typeof t ? "undefined" : g["typeof"](t)) || console.error("The headers should be an object or array, is: " + ("undefined" == typeof t ? "undefined" : g["typeof"](t))), e && "object" === ("undefined" == typeof e ? "undefined" : g["typeof"](e)) || console.error("The data should be an object or array, is: " + ("undefined" == typeof e ? "undefined" : g["typeof"](e))), n && "object" !== ("undefined" == typeof n ? "undefined" : g["typeof"](n)) && console.error("The data should be an object or array, is: " + ("undefined" == typeof e ? "undefined" : g["typeof"](e))), Array.prototype.forEach || console.error("The current browser does not support Array.prototype.forEach which is required for jsPDF-AutoTable. You can try polyfilling it by including this script https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill")
    }

    function i(t, e) {
        A = new p;
        var n = /\r\n|\r|\n/g,
            o = new w(t);
        o.index = -1;
        var i = C.styles([x[z.theme].table, x[z.theme].header]);
        o.styles = Object.assign({}, i, z.styles, z.headerStyles), t.forEach(function(t, e) {
            "object" === ("undefined" == typeof t ? "undefined" : g["typeof"](t)) && (e = "undefined" != typeof t.dataKey ? t.dataKey : t.key), "undefined" != typeof t.width && console.error("Use of deprecated option: column.width, use column.styles.columnWidth instead.");
            var i = new m(e);
            i.styles = z.columnStyles[i.dataKey] || {}, A.columns.push(i);
            var r = new b;
            r.raw = "object" === ("undefined" == typeof t ? "undefined" : g["typeof"](t)) ? t.title : t, r.styles = Object.assign({}, o.styles), r.text = "" + r.raw, r.contentWidth = 2 * r.styles.cellPadding + y(r.text, r.styles), r.text = r.text.split(n), o.cells[e] = r, z.createdHeaderCell(r, {
                column: i,
                row: o,
                settings: z
            })
        }), A.headerRow = o, e.forEach(function(t, e) {
            var o = new w(t),
                i = e % 2 === 0,
                r = C.styles([x[z.theme].table, i ? x[z.theme].alternateRow : {}]),
                l = Object.assign({}, z.styles, z.bodyStyles, i ? z.alternateRowStyles : {});
            o.styles = Object.assign({}, r, l), o.index = e, A.columns.forEach(function(e) {
                var i = new b;
                i.raw = t[e.dataKey], i.styles = Object.assign({}, o.styles, e.styles), i.text = "undefined" != typeof i.raw ? "" + i.raw : "", o.cells[e.dataKey] = i, z.createdCell(i, c({
                    column: e,
                    row: o
                })), i.contentWidth = 2 * i.styles.cellPadding + y(i.text, i.styles), i.text = i.text.split(n)
            }), A.rows.push(o)
        })
    }

    function r(t, e) {
        var n = 0;
        A.columns.forEach(function(t) {
            t.contentWidth = A.headerRow.cells[t.dataKey].contentWidth, A.rows.forEach(function(e) {
                var n = e.cells[t.dataKey].contentWidth;
                n > t.contentWidth && (t.contentWidth = n)
            }), t.width = t.contentWidth, n += t.contentWidth
        }), A.contentWidth = n;
        var o = e - z.margin.left - z.margin.right,
            i = o;
        "number" == typeof z.tableWidth ? i = z.tableWidth : "wrap" === z.tableWidth && (i = A.contentWidth), A.width = o > i ? i : o;
        var r = [],
            a = 0,
            s = A.width / A.columns.length,
            d = 0;
        A.columns.forEach(function(t) {
            var e = C.styles([x[z.theme].table, z.styles, t.styles]);
            "wrap" === e.columnWidth ? t.width = t.contentWidth : "number" == typeof e.columnWidth ? t.width = e.columnWidth : ("auto" === e.columnWidth, t.contentWidth <= s && A.contentWidth > A.width ? t.width = t.contentWidth : (r.push(t), a += t.contentWidth, t.width = 0)), d += t.width
        }), l(r, d, a, s), A.height = 0;
        var h = A.rows.concat(A.headerRow);
        h.forEach(function(e, n) {
            var o = 0;
            A.columns.forEach(function(n) {
                var i = e.cells[n.dataKey];
                f(i.styles);
                var r = n.width - 2 * i.styles.cellPadding;
                if ("linebreak" === i.styles.overflow) try {
                    i.text = t.splitTextToSize(i.text, r + 1, {
                        fontSize: i.styles.fontSize
                    })
                } catch (l) {
                    if (!(l instanceof TypeError && Array.isArray(i.text))) throw l;
                    i.text = t.splitTextToSize(i.text.join(" "), r + 1, {
                        fontSize: i.styles.fontSize
                    })
                } else "ellipsize" === i.styles.overflow ? i.text = u(i.text, r, i.styles) : "visible" === i.styles.overflow || ("hidden" === i.styles.overflow ? i.text = u(i.text, r, i.styles, "") : "function" == typeof i.styles.overflow ? i.text = i.styles.overflow(i.text, r) : console.error("Unrecognized overflow type: " + i.styles.overflow));
                var a = Array.isArray(i.text) ? i.text.length - 1 : 0;
                a > o && (o = a)
            }), e.heightStyle = e.styles.rowHeight, e.height = e.heightStyle + o * e.styles.fontSize * v, A.height += e.height
        })
    }

    function l(t, e, n, o) {
        for (var i = A.width - e - n, r = 0; r < t.length; r++) {
            var a = t[r],
                s = a.contentWidth / n,
                d = a.contentWidth + i * s < o;
            if (0 > i && d) {
                t.splice(r, 1), n -= a.contentWidth, a.width = o, e += a.width, l(t, e, n, o);
                break
            }
            a.width = a.contentWidth + i * s
        }
    }

    function a(t) {
        z.afterPageContent(c()), t(), A.pageCount++, W = {
            x: z.margin.left,
            y: z.margin.top
        }, z.beforePageContent(c()), z.drawHeaderRow(A.headerRow, c({
            row: A.headerRow
        })) !== !1 && h(A.headerRow, z.drawHeaderCell)
    }

    function s(t) {
        var e = W.y + t + z.margin.bottom;
        return e >= j.height
    }

    function d(t) {
        A.rows.forEach(function(e, n) {
            if (s(e.height)) {
                a(t)
            }
            e.y = W.y, z.drawRow(e, c({
                row: e
            })) !== !1 && h(e, z.drawCell)
        })
    }

    function h(t, e) {
        W.x = z.margin.left;
        for (var n = 0; n < A.columns.length; n++) {
            var o = A.columns[n],
                i = t.cells[o.dataKey];
            if (i) {
                f(i.styles), i.x = W.x, i.y = W.y, i.height = t.height, i.width = o.width, "top" === i.styles.valign ? i.textPos.y = W.y + i.styles.cellPadding : "bottom" === i.styles.valign ? i.textPos.y = W.y + t.height - i.styles.cellPadding : i.textPos.y = W.y + t.height / 2, "right" === i.styles.halign ? i.textPos.x = i.x + i.width - i.styles.cellPadding : "center" === i.styles.halign ? i.textPos.x = i.x + i.width / 2 : i.textPos.x = i.x + i.styles.cellPadding;
                var r = c({
                    column: o,
                    row: t
                });
                e(i, r) !== !1 && (S.rect(i.x, i.y, i.width, i.height, i.styles.fillStyle), S.autoTableText(i.text, i.textPos.x, i.textPos.y, {
                    halign: i.styles.halign,
                    valign: i.styles.valign
                })), W.x += i.width
            }
        }
        W.y += t.height
    }

    function f(t) {
        Object.keys(P).forEach(function(e) {
            var n = t[e],
                o = P[e];
            "undefined" != typeof n && (n.constructor === Array ? o.apply(this, n) : o(n))
        })
    }

    function c(t) {
        return Object.assign({
            pageCount: A.pageCount,
            settings: z,
            table: A,
            cursor: W
        }, t || {})
    }

    function y(t, e) {
        f(e);
        var n = S.getStringUnitWidth(t);
        return n * e.fontSize
    }

    function u(t, e, n, o) {
        if (o = "undefined" != typeof o ? o : "...", Array.isArray(t)) return t.forEach(function(i, r) {
            t[r] = u(i, e, n, o)
        }), t;
        if (e >= y(t, n)) return t;
        for (; e < y(t + o, n) && !(t.length < 2);) t = t.substring(0, t.length - 1);
        return t.trim() + o
    }
    t = "default" in t ? t["default"] : t;
    var g = {};
    g["typeof"] = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
    }, g.classCallCheck = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }, g.createClass = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e
        }
    }();
    var p = function R() {
            g.classCallCheck(this, R), this.height = 0, this.width = 0, this.contentWidth = 0, this.rows = [], this.columns = [], this.headerRow = null, this.settings = {}, this.pageCount = 1
        },
        w = function T(t) {
            g.classCallCheck(this, T), this.raw = t || {}, this.index = 0, this.styles = {}, this.cells = {}, this.height = 0, this.y = 0
        },
        b = function O(t) {
            g.classCallCheck(this, O), this.raw = t, this.styles = {}, this.text = "", this.contentWidth = 0, this.textPos = {}, this.height = 0, this.width = 0, this.x = 0, this.y = 0
        },
        m = function E(t) {
            g.classCallCheck(this, E), this.dataKey = t, this.options = {}, this.styles = {}, this.contentWidth = 0, this.width = 0, this.x = 0
        },
        v = 1.15,
        x = {
            striped: {
                table: {
                    fillColor: 255,
                    textColor: 80,
                    fontStyle: "normal",
                    fillStyle: "F"
                },
                header: {
                    textColor: 255,
                    fillColor: [41, 128, 185],
                    rowHeight: 23,
                    fontStyle: "bold"
                },
                body: {},
                alternateRow: {
                    fillColor: 245
                }
            },
            grid: {
                table: {
                    fillColor: 255,
                    textColor: 80,
                    fontStyle: "normal",
                    lineWidth: .1,
                    fillStyle: "DF"
                },
                header: {
                    textColor: 255,
                    fillColor: [26, 188, 156],
                    rowHeight: 23,
                    fillStyle: "F",
                    fontStyle: "bold"
                },
                body: {},
                alternateRow: {}
            },
            plain: {
                header: {
                    fontStyle: "bold"
                }
            }
        },
        C = function() {
            function t() {
                g.classCallCheck(this, t)
            }
            return g.createClass(t, null, [{
                key: "initSettings",
                value: function(t) {
                    var n = Object.assign({}, e(), t);
                    "undefined" != typeof n.extendWidth && (n.tableWidth = n.extendWidth ? "auto" : "wrap", console.error("Use of deprecated option: extendWidth, use tableWidth instead.")), "undefined" != typeof n.margins && ("undefined" == typeof n.margin && (n.margin = n.margins), console.error("Use of deprecated option: margins, use margin instead.")), [
                        ["padding", "cellPadding"],
                        ["lineHeight", "rowHeight"], "fontSize", "overflow"
                    ].forEach(function(t) {
                        var e = "string" == typeof t ? t : t[0],
                            o = "string" == typeof t ? t : t[1];
                        "undefined" != typeof n[e] && ("undefined" == typeof n.styles[o] && (n.styles[o] = n[e]), console.error("Use of deprecated option: " + e + ", use the style " + o + " instead."))
                    });
                    var o = n.margin;
                    return n.margin = {}, "number" == typeof o.horizontal && (o.right = o.horizontal, o.left = o.horizontal), "number" == typeof o.vertical && (o.top = o.vertical, o.bottom = o.vertical), ["top", "right", "bottom", "left"].forEach(function(t, e) {
                        if ("number" == typeof o) n.margin[t] = o;
                        else {
                            var i = Array.isArray(o) ? e : t;
                            n.margin[t] = "number" == typeof o[i] ? o[i] : 40
                        }
                    }), n
                }
            }, {
                key: "styles",
                value: function(t) {
                    return t.unshift(n()), t.unshift({}), Object.assign.apply(this, t)
                }
            }]), t
        }();
    "function" != typeof Object.assign && ! function() {
        Object.assign = function(t) {
            if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var o = arguments[n];
                if (void 0 !== o && null !== o)
                    for (var i in o) o.hasOwnProperty(i) && (e[i] = o[i])
            }
            return e
        }
    }(), Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), Object.values || (Object.values = function(t) {
        return Object.keys(t).map(function(e) {
            return t[e]
        })
    });
    var S, W, P, j, z, A;
    t.API.autoTable = function(t, e, n) {
        o(t, e, n), S = this, j = S.internal.pageSize, P = {
            fillColor: S.setFillColor,
            textColor: S.setTextColor,
            fontStyle: S.setFontStyle,
            lineColor: S.setDrawColor,
            lineWidth: S.setLineWidth,
            font: S.setFont,
            fontSize: S.setFontSize
        }, z = C.initSettings(n || {}), W = {
            x: z.margin.left,
            y: z.startY === !1 ? z.margin.top : z.startY
        };
        var l = {
            textColor: 30,
            fontSize: S.internal.getFontSize(),
            fontStyle: S.internal.getFont().fontStyle
        };
        i(t, e), r(this, j.width);
        var a = A.rows[0] && "auto" === z.pageBreak ? A.rows[0].height : 0,
            s = z.startY + z.margin.bottom + A.headerRow.height + a;
        return "avoid" === z.pageBreak && (s += A.height), ("always" === z.pageBreak && z.startY !== !1 || z.startY !== !1 && s > j.height) && (this.addPage(this.addPage), W.y = z.margin.top), f(l), z.beforePageContent(c()), z.drawHeaderRow(A.headerRow, c({
            row: A.headerRow
        })) !== !1 && h(A.headerRow, z.drawHeaderCell), f(l), d(this.addPage), z.afterPageContent(c()), f(l), this
    }, t.API.autoTableEndPosY = function() {
        return "undefined" == typeof W || "undefined" == typeof W.y ? 0 : W.y
    }, t.API.autoTableHtmlToJson = function(t, e) {
        e = e || !1;
        for (var n = {}, o = [], i = t.rows[0], r = 0; r < i.cells.length; r++) {
            var l = i.cells[r],
                a = window.getComputedStyle(l);
            (e || "none" !== a.display) && (n[r] = l ? l.textContent.trim() : "")
        }
        for (var s = 1; s < t.rows.length; s++) {
            var d = t.rows[s],
                a = window.getComputedStyle(d);
            if (e || "none" !== a.display) {
                var h = [],
                    f = !0,
                    c = !1,
                    y = void 0;
                try {
                    for (var u, g = Object.keys(n)[Symbol.iterator](); !(f = (u = g.next()).done); f = !0) {
                        var p = u.value,
                            l = d.cells[p],
                            w = l ? l.textContent.trim() : "";
                        h.push(w)
                    }
                } catch (b) {
                    c = !0, y = b
                } finally {
                    try {
                        !f && g["return"] && g["return"]()
                    } finally {
                        if (c) throw y
                    }
                }
                o.push(h)
            }
        }
        return {
            columns: Object.values(n),
            rows: o,
            data: o
        }
    }, t.API.autoTableText = function(t, e, n, o) {
        "number" == typeof e && "number" == typeof n || console.error("The x and y parameters are required. Missing for the text: ", t);
        var i = this.internal.getFontSize() / this.internal.scaleFactor,
            r = v,
            l = /\r\n|\r|\n/g,
            a = null,
            s = 1;
        if ("middle" !== o.valign && "bottom" !== o.valign && "center" !== o.halign && "right" !== o.halign || (a = "string" == typeof t ? t.split(l) : t, s = a.length || 1), n += i * (2 - r), "middle" === o.valign ? n -= s / 2 * i : "bottom" === o.valign && (n -= s * i), "center" === o.halign || "right" === o.halign) {
            var d = i;
            if ("center" === o.halign && (d *= .5), s >= 1) {
                for (var h = 0; h < a.length; h++) this.text(a[h], e - this.getStringUnitWidth(a[h]) * d, n), n += i;
                return S
            }
            e -= this.getStringUnitWidth(t) * d
        }
        return this.text(t, e, n), this
    }
});
