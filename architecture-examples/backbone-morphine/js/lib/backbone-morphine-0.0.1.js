(function() {
    var root;
    root = "undefined" != typeof exports && null !== exports ? exports : this, root.Morphine || (root.Morphine = {}), 
    _.extend(Morphine, {
        VERSION: "0.0.1",
        setup: function(mappings) {
            var context, event, injector, klass, name, value, _ref, _ref1, _ref2, _ref3, _results;
            injector = Morphine.Injector.instance(), context = Morphine.Context.instance(), 
            _ref = mappings.singletons;
            for (name in _ref) klass = _ref[name], injector.mapSingleton(name, klass);
            _ref1 = mappings.values;
            for (name in _ref1) value = _ref1[name], injector.mapValue(name, value);
            _ref2 = mappings.commands;
            for (event in _ref2) klass = _ref2[event], context.mapCommand(event, klass);
            _ref3 = mappings.single_shot_commands, _results = [];
            for (event in _ref3) klass = _ref3[event], _results.push(context.mapCommand(event, klass, !0));
            return _results;
        }
    });
}).call(this), function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
        child;
    };
    Morphine.Collection = function(_super) {
        function Collection(models, options) {
            null == models && (models = []), null == options && (options = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), Collection.__super__.constructor.call(this, models, options);
        }
        return __extends(Collection, _super), Collection;
    }(Backbone.Collection);
}.call(this), function() {
    Morphine.Command = function() {
        function Command() {
            Morphine.Injector.instance().injectInto(this);
        }
        return Command.extend = Backbone.Model.extend, Command.prototype.execute = function() {
            throw Error("Execute not implemented.");
        }, Command;
    }();
}.call(this), function() {
    var ContextSingleton, __slice = [].slice;
    Morphine.Context = function() {
        function Context() {}
        var _instance;
        return _instance = null, Context.instance = function() {
            return null != _instance ? _instance : _instance = new ContextSingleton();
        }, Context.reset = function() {
            return null != _instance ? _instance.reset() : void 0;
        }, Context;
    }(), ContextSingleton = function() {
        function ContextSingleton() {
            _.extend(this, Backbone.Events), this.mappings = [];
        }
        return ContextSingleton.prototype.reset = function() {
            var mapping, _results;
            for (_results = []; mapping = this.mappings.pop(); ) _results.push(this.off(mapping.event, mapping.callback));
            return _results;
        }, ContextSingleton.prototype.mapCommand = function(event, klass, singleShot) {
            var mapping;
            return null == singleShot && (singleShot = !1), mapping = {
                event: event,
                klass: klass,
                singleShot: singleShot,
                callback: function() {
                    var args, obj;
                    return args = arguments.length >= 1 ? __slice.call(arguments, 0) : [], obj = new klass(), 
                    obj.execute.apply(obj, args);
                }
            }, this.mappings.push(mapping), singleShot ? this.once(mapping.event, mapping.callback) : this.on(mapping.event, mapping.callback);
        }, ContextSingleton.prototype.unmapCommand = function(event, klass) {
            var mapping;
            return mapping = _.findWhere(this.mappings, {
                event: event,
                klass: klass
            }), mapping ? (this.off(mapping.event, mapping.callback), this.mappings.splice(_.indexOf(this.mappings, mapping), 1)) : void 0;
        }, ContextSingleton;
    }();
}.call(this), function() {
    var InjectorSingleton;
    Morphine.Injector = function() {
        function Injector() {}
        var _instance;
        return _instance = null, Injector.instance = function() {
            return null != _instance ? _instance : _instance = new InjectorSingleton();
        }, Injector.reset = function() {
            return null != _instance ? _instance.reset() : void 0;
        }, Injector;
    }(), InjectorSingleton = function() {
        function InjectorSingleton() {
            this.reset();
        }
        return InjectorSingleton.prototype.reset = function() {
            return this.mappings = {};
        }, InjectorSingleton.prototype._validateUniqueness = function(name) {
            if (this.hasMapping(name)) throw Error("Mapping already exists for " + name + ".");
        }, InjectorSingleton.prototype.hasMapping = function(name) {
            return name in this.mappings;
        }, InjectorSingleton.prototype.mapSingleton = function(name, klass) {
            return this._validateUniqueness(name), this.mappings[name] = {
                klass: klass,
                singleton: !0,
                instance: null
            };
        }, InjectorSingleton.prototype.mapValue = function(name, obj) {
            return this._validateUniqueness(name), this.mappings[name] = {
                klass: null,
                singleton: !0,
                instance: obj
            };
        }, InjectorSingleton.prototype.mapClass = function(name, klass) {
            return this._validateUniqueness(name), this.mappings[name] = {
                klass: klass,
                singleton: !1,
                instance: null
            };
        }, InjectorSingleton.prototype.getInstance = function(name) {
            var mapping, _ref;
            return mapping = this.mappings[name], null == mapping ? null : mapping.singleton ? null != (_ref = mapping.instance) ? _ref : mapping.instance = new mapping.klass() : new mapping.klass();
        }, InjectorSingleton.prototype.unmap = function(name) {
            var mapping;
            return mapping = this.mappings[name], delete this.mappings[name];
        }, InjectorSingleton.prototype.injectInto = function(obj, optional_mappings) {
            var attr, mappings, name;
            if (null == optional_mappings && (optional_mappings = {}), !_.isObject(obj)) throw Error("Cannot inject into undefined.");
            mappings = _.extend({}, obj.injections, optional_mappings);
            for (attr in mappings) name = mappings[attr], obj[attr] = this.getInstance(name);
            return obj.afterInjection ? obj.afterInjection.call(obj) : void 0;
        }, InjectorSingleton;
    }();
}.call(this), function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
        child;
    };
    Morphine.Model = function(_super) {
        function Model(attributes, options) {
            null == attributes && (attributes = {}), null == options && (options = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), Model.__super__.constructor.call(this, attributes, options);
        }
        return __extends(Model, _super), Model;
    }(Backbone.Model);
}.call(this), function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
        child;
    };
    Morphine.Router = function(_super) {
        function Router(options) {
            null == options && (options = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), Router.__super__.constructor.call(this, options);
        }
        return __extends(Router, _super), Router;
    }(Backbone.Router);
}.call(this), function() {
    var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
        child;
    };
    Morphine.View = function(_super) {
        function View(options) {
            null == options && (options = {}), this.injector = Morphine.Injector.instance(), 
            this.context = Morphine.Context.instance(), this.injector.injectInto(this), View.__super__.constructor.call(this, options);
        }
        return __extends(View, _super), View;
    }(Backbone.View);
}.call(this);