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
declare const root: DIContext;
/**
 * Creates a new dependency injection root with no resolved instances.  Use for unit testing to provide mocks
 */
export declare function createRoot(): DIContext;
export default root;
export { root as DI };
