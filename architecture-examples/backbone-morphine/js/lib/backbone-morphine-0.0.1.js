(function() {
    var n;
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    _.extend(n.Morphine, {
        VERSION: "0.0.1"
    });
}).call(this), function() {
    var n, t = {}.hasOwnProperty, e = function(n, e) {
        function o() {
            this.constructor = n;
        }
        for (var i in e) t.call(e, i) && (n[i] = e[i]);
        return o.prototype = e.prototype, n.prototype = new o(), n.__super__ = e.prototype, 
        n;
    };
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    Morphine.Collection = function(n) {
        function t(n, e) {
            null == n && (n = []), null == e && (e = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), t.__super__.constructor.call(this, n, e);
        }
        return e(t, n), t;
    }(Backbone.Collection);
}.call(this), function() {
    var n;
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    Morphine.Command = function() {
        function n() {
            Morphine.Injector.instance().injectInto(this);
        }
        return n.extend = Backbone.Model.extend, n.prototype.execute = function() {
            throw Error("Execute not implemented.");
        }, n;
    }();
}.call(this), function() {
    var n, t, e = [].slice;
    t = "undefined" != typeof exports && null !== exports ? exports : this, t.Morphine || (t.Morphine = {}), 
    Morphine.Context = function() {
        function t() {}
        var e;
        return e = null, t.instance = function() {
            return null != e ? e : e = new n();
        }, t.reset = function() {
            return null != e ? e.reset() : void 0;
        }, t;
    }(), n = function() {
        function n() {
            _.extend(this, Backbone.Events), this.mappings = [];
        }
        return n.prototype.reset = function() {
            var n, t;
            for (t = []; n = this.mappings.pop(); ) t.push(this.off(n.event, n.callback));
            return t;
        }, n.prototype.mapCommand = function(n, t, o) {
            var i;
            return null == o && (o = !1), i = {
                event: n,
                klass: t,
                singleShot: o,
                callback: function() {
                    var n, o;
                    return n = arguments.length >= 1 ? e.call(arguments, 0) : [], o = new t(), o.execute.apply(o, n);
                }
            }, this.mappings.push(i), o ? this.once(i.event, i.callback) : this.on(i.event, i.callback);
        }, n.prototype.unmapCommand = function(n, t) {
            var e;
            return e = _.findWhere(this.mappings, {
                event: n,
                klass: t
            }), e ? (this.off(e.event, e.callback), this.mappings.splice(_.indexOf(this.mappings, e), 1)) : void 0;
        }, n;
    }();
}.call(this), function() {
    var n, t;
    t = "undefined" != typeof exports && null !== exports ? exports : this, t.Morphine || (t.Morphine = {}), 
    Morphine.Injector = function() {
        function t() {}
        var e;
        return e = null, t.instance = function() {
            return null != e ? e : e = new n();
        }, t.reset = function() {
            return null != e ? e.reset() : void 0;
        }, t;
    }(), n = function() {
        function n() {
            this.reset();
        }
        return n.prototype.reset = function() {
            return this.mappings = {};
        }, n.prototype._validateUniqueness = function(n) {
            if (this.hasMapping(n)) throw Error("Mapping already exists for " + n + ".");
        }, n.prototype.hasMapping = function(n) {
            return n in this.mappings;
        }, n.prototype.mapSingleton = function(n, t) {
            return this._validateUniqueness(n), this.mappings[n] = {
                klass: t,
                singleton: !0,
                instance: null
            };
        }, n.prototype.mapValue = function(n, t) {
            return this._validateUniqueness(n), this.mappings[n] = {
                klass: null,
                singleton: !0,
                instance: t
            };
        }, n.prototype.mapClass = function(n, t) {
            return this._validateUniqueness(n), this.mappings[n] = {
                klass: t,
                singleton: !1,
                instance: null
            };
        }, n.prototype.getInstance = function(n) {
            var t, e;
            return t = this.mappings[n], null == t ? null : t.singleton ? null != (e = t.instance) ? e : t.instance = new t.klass() : new t.klass();
        }, n.prototype.unmap = function(n) {
            var t;
            return t = this.mappings[n], delete this.mappings[n];
        }, n.prototype.injectInto = function(n, t) {
            var e, o, i;
            if (null == t && (t = {}), !_.isObject(n)) throw Error("Cannot inject into undefined.");
            o = _.extend({}, n.injections, t);
            for (e in o) i = o[e], n[e] = this.getInstance(i);
            return n.afterInjection ? n.afterInjection.call(n) : void 0;
        }, n;
    }();
}.call(this), function() {
    var n, t = {}.hasOwnProperty, e = function(n, e) {
        function o() {
            this.constructor = n;
        }
        for (var i in e) t.call(e, i) && (n[i] = e[i]);
        return o.prototype = e.prototype, n.prototype = new o(), n.__super__ = e.prototype, 
        n;
    };
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    Morphine.Model = function(n) {
        function t(n, e) {
            null == n && (n = {}), null == e && (e = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), t.__super__.constructor.call(this, n, e);
        }
        return e(t, n), t;
    }(Backbone.Model);
}.call(this), function() {
    var n, t = {}.hasOwnProperty, e = function(n, e) {
        function o() {
            this.constructor = n;
        }
        for (var i in e) t.call(e, i) && (n[i] = e[i]);
        return o.prototype = e.prototype, n.prototype = new o(), n.__super__ = e.prototype, 
        n;
    };
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    Morphine.Router = function(n) {
        function t(n) {
            null == n && (n = {}), this.injector = Morphine.Injector.instance(), this.context = Morphine.Context.instance(), 
            this.injector.injectInto(this), t.__super__.constructor.call(this, n);
        }
        return e(t, n), t;
    }(Backbone.Router);
}.call(this), function() {
    var n, t = {}.hasOwnProperty, e = function(n, e) {
        function o() {
            this.constructor = n;
        }
        for (var i in e) t.call(e, i) && (n[i] = e[i]);
        return o.prototype = e.prototype, n.prototype = new o(), n.__super__ = e.prototype, 
        n;
    };
    n = "undefined" != typeof exports && null !== exports ? exports : this, n.Morphine || (n.Morphine = {}), 
    Morphine.View = function(n) {
        function t(n) {
            null == n && (n = {}), this.injector = Morphine.Injector.instance(), this.context = Morphine.Context.instance(), 
            this.injector.injectInto(this), t.__super__.constructor.call(this, n);
        }
        return e(t, n), t;
    }(Backbone.View);
}.call(this);