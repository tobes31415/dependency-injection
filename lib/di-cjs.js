"use strict";
/**
import DI from "DI"
import Service
import { DIContext } from './di';

class Foo {
   constructor() {
      this.serviceInstance = DI.resolve(Service);
   }
}

class Service {
  stuff() {}
}

const mockService = new Mock();
Di.use(Service, mockService);

const foo = DI.resolve(Foo);
etc
*/
exports.__esModule = true;
var currentContext;
var DIContextImplementation = /** @class */ (function () {
    function DIContextImplementation() {
        this.instances = new Map();
        this.resolvers = new Map();
        this.useFactory = this.useFactory.bind(this);
        this.resolve = this.resolve.bind(this);
    }
    DIContextImplementation.prototype.useFactory = function (token, factoryFn) {
        if (this.instances.has(token)) {
            throw new Error("This token has already been resolved");
        }
        if (this.resolvers.has(token)) {
            throw new Error("A resolver has already been supplied for this token");
        }
        if (typeof factoryFn !== "function") {
            throw new Error("useFactory expects a function");
        }
        this.resolvers.set(token, factoryFn);
    };
    DIContextImplementation.prototype.useClass = function (token, substitute) {
        var _this = this;
        this.useFactory(token, function () { return _this.resolve(substitute); });
    };
    ;
    DIContextImplementation.prototype.useObject = function (token, substitute) {
        this.useFactory(token, function () { return substitute; });
    };
    ;
    DIContextImplementation.prototype.resolve = function (token) {
        var didSetContext = !currentContext;
        try {
            if (didSetContext) {
                currentContext = this;
            }
            if (currentContext !== this) {
                throw new Error("Cross Context resolution detected");
            }
            if (!this.instances.has(token)) {
                var resolver = this.resolvers.get(token) || this.defaultResolver;
                var instance = resolver(token);
                if (!instance) {
                    throw new Error("Resolver didn't return an instance");
                }
                this.instances.set(token, instance);
            }
            return this.instances.get(token);
        }
        finally {
            if (didSetContext) {
                currentContext = undefined;
            }
        }
    };
    DIContextImplementation.prototype.defaultResolver = function (token) {
        if (typeof token !== "function") {
            throw new Error("Tokens must either be factory functions, or you must supply a resolver before trying to resolve them");
        }
        return new token();
    };
    return DIContextImplementation;
}());
var DIAdaptiveRootImplementation = /** @class */ (function () {
    function DIAdaptiveRootImplementation() {
        this.defaultRoot = new DIContextImplementation();
    }
    DIAdaptiveRootImplementation.prototype.useFactory = function (token, factoryFn) {
        return this.context().useFactory(token, factoryFn);
    };
    DIAdaptiveRootImplementation.prototype.useClass = function (token, substitute) {
        return this.context().useClass(token, substitute);
    };
    ;
    DIAdaptiveRootImplementation.prototype.useObject = function (token, substitute) {
        return this.context().useObject(token, substitute);
    };
    ;
    DIAdaptiveRootImplementation.prototype.resolve = function (token) {
        return this.context().resolve(token);
    };
    ;
    DIAdaptiveRootImplementation.prototype.context = function () {
        return currentContext || this.defaultRoot;
    };
    ;
    return DIAdaptiveRootImplementation;
}());
var root = new DIAdaptiveRootImplementation();
exports.DI = root;
/**
 * Creates a new dependency injection root with no resolved instances.  Use for unit testing to provide mocks
 */
function createRoot() {
    return new DIContextImplementation();
}
exports.createRoot = createRoot;
exports["default"] = root;
