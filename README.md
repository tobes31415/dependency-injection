# DI
Dependency-injection is a tiny framework agnostic library to handle dependency injection in your javascript projects.  It Facilitates unit and A/B testing and improves the team's ability to rapidly develop in parallel by enabling mocks to be transparently inserted when needed and replaced later. 

[View API Docs](docs/di.md)

# Installation
    npm install --save @tobes31415/di

# Basic Useage
    import { DI } from "@tobes31415/dependency-injection";
    import { SomeService } from "./someService";

    class SomeClass {
        constructor() {
            this.service = DI.resolve(SomeService);
        }
    }

# Advanced Useage
    DI.useClass(Potato, Carrot);
    const obj = DI.resolve(Potato) // instance of Carrot
    
    DI.useObject(Potato, {banana});
    const obj = DI.resolve(Potato) // {banana}
    
    DI.useFactory(Potato, () => 123);
    const obj = DI.resolve(Potato) //123
