import { createRoot, DIContext } from "./di";

describe("DI", () => {
  let DI: DIContext;
  
  beforeEach(() => {
    DI = createRoot();
  });

  test("it creates an instance of a function", () => {
    const foo = function() {};
    const instance = DI.resolve(foo);

    expect (instance.constructor).toBe(foo);
  });

  test("it handles nested dependencies", () => {
    const Inside = function() { }
    const Outside = function() { 
      const inside = DI.resolve(Inside);
      expect (inside.constructor).toBe(Inside);
    }
    const outside = DI.resolve(Outside);
    expect(outside.constructor).toBe(Outside);
  });

  test("token resolver can be overridden wtih a factory function ", () => {
    const A = function() {};
    const B = {};
    DI.useFactory(A, () => B);
    const instance = DI.resolve(A);
    expect (instance).toBe(B);
  })

  test("token resolver can be overridden with another token", () => {
    const A = function () {};
    const B = function () {};
    DI.useClass(A, B);
    const instance = DI.resolve(A);
    expect(instance.constructor).toBe(B);
  });

  test("token resolver can be overridden with an instance object", () => {
    const A = function () {};
    const B = {};
    DI.useObject(A, B);
    const instance = DI.resolve(A);
    expect(instance).toBe(B);
  });

  test("multiple resolves returns the exact same object", () => {
    const A = {};
    const B = () => Math.random();
    DI.useFactory(A, B);
    const o1 = DI.resolve(A);
    const o2 = DI.resolve(A);
    const o3 = DI.resolve(A);

    expect(o1).toBe(o2);
    expect(o2).toBe(o3);
  })
});
