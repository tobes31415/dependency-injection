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

let currentContext: DIContext | undefined;

/**
 * Context for resolving dependencies
 */
export interface DIContext {
  /**
   * Resolves a token into an instance
   * @param token the token to be looked up
   */
  resolve(token: any): any;
  /**
   * Overrides the function used to provide the specified token
   * @param token The token to register the substitution for
   * @param factory A function that will be invoked when resolving the token
   */
  useFactory(token: any, factory: () => any): void;

  /**
   * Overrides the function used to provide the specified token
   * @param token  The token to register the substitution for
   * @param substitute A class that will be resovled instead of the token
   */
  useClass(token: any, substitute: any): void;

  /**
   * Overrides the function used to provide the specified token
   * @param token  The token to register the substitution for
   * @param substitute This specific object will be used without changes or being invoked
   */
  useObject(token: any, substitute: any): void;
}

class DIContextImplementation implements DIContext {
  instances: Map<any, any> = new Map();
  resolvers: Map<any, (v) => any> = new Map();

  constructor() {
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
  useClass(token: any, substitute: any) {
    this.useFactory(token, () => this.resolve(substitute));
  };
  useObject(token: any, substitute: any) {
    this.useFactory(token, () => substitute);
  };

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
    } finally {
      if (didSetContext) {
        currentContext = undefined;
      }
    }
  }

  private defaultResolver(token) {
    if (typeof token !== "function") {
      throw new Error(
        "Tokens must either be factory functions, or you must supply a resolver before trying to resolve them",
      );
    }
    return new token();
  }
}

class DIAdaptiveRootImplementation implements DIContext {
  private defaultRoot = new DIContextImplementation();

  useFactory(token, factoryFn) {
    return this.context().useFactory(token, factoryFn);
  }
  useClass(token: any, substitute: any) {
    return this.context().useClass(token, substitute);
  };
  useObject(token: any, substitute: any) {
    return this.context().useObject(token, substitute);
  };

  resolve(token) {
    return this.context().resolve(token);
  };

  private context() {
    return currentContext || this.defaultRoot;
  };
}

const root: DIContext = new DIAdaptiveRootImplementation();

/**
 * Creates a new dependency injection root with no resolved instances.  Use for unit testing to provide mocks
 */
export function createRoot(): DIContext {
  return new DIContextImplementation();
}

export default root;
export { root as DI };
