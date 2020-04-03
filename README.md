# DI
A tiny library to handle basic dependency injection

[View API Docs](docs/di.md)

# Installation
    npm install --save @tobes31415/di

# Basic Useage
    import { onDispose, dispose } from "@tobes31415/dispose"
    
    onDispose(foo, () => {
      //release resources
      //disconnect from servers, etc
    });
    
    dispose(foo);

# Advanced Useage
    import { isDisposed, assertNotDisposed, createDisposeableFunctionWrapper, dispose } from "@tobes31415/dispose"
    
    if (isDisposed(foo)) {
        foo = new Foo();
    }
    
    assertNotDisposed(bar); //throws exception if bar has been disposed
    
    const baz = createDisposeableFunctionWrapper( (a,b,c) => a * b + c );
    baz(1,2,3) //outputs 5
    
    dispose(baz);
    baz(1,2,3) // throws an exception
    
