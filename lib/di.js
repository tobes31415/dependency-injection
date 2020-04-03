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
let currentContext;
class DIContextImplementation {
    constructor() {
        this.instances = new Map();
        this.resolvers = new Map();
        this.useFactory = this.useFactory.bind(this);
        this.resolve = this.resolve.bind(this);
    }
    useFactory(token, factoryFn) {
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
    }
    useClass(token, substitute) {
        this.useFactory(token, () => this.resolve(substitute));
    }
    ;
    useObject(token, substitute) {
        this.useFactory(token, () => substitute);
    }
    ;
    resolve(token) {
        const didSetContext = !currentContext;
        try {
            if (didSetContext) {
                currentContext = this;
            }
            if (currentContext !== this) {
                throw new Error("Cross Context resolution detected");
            }
            if (!this.instances.has(token)) {
                const resolver = this.resolvers.get(token) || this.defaultResolver;
                const instance = resolver(token);
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
    }
    defaultResolver(token) {
        if (typeof token !== "function") {
            throw new Error("Tokens must either be factory functions, or you must supply a resolver before trying to resolve them");
        }
        return new token();
    }
}
const root = new DIContextImplementation();
/**
 * Creates a new dependency injection root with no resolved instances.  Use for unit testing to provide mocks
 */
export function createRoot() {
    return new DIContextImplementation();
}
export default root;
export { root as DI };
