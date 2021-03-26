# @luaks/pipe

This library intends to replicate [ES Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator) in a 
somewhat fluent fashion.

It is designed to be simple, and is considered to have its fulfilled goal.

## Usage

Install the library using `$ npm install @luaks/pipe`. Pass the initial value to the `pipe` function and call `through`
on the outgoing pipe with the modifying functions.

Example:

```typescript
pipe('  this is a  long    string')
    .through(
        value => value.trim(),
        value => value.toUpperCase(),
        value => value.replace(/\s{2,}/, ' ')
    )
```

It is also recommended to further wrap the functions in parameterized functions, to have more readable code.
For example:

```typescript

function trim() {
    return value => value.trim();
}

function toUpperCase() {
    return value => value.toUpperCase();
}

function replace(pattern, replacement: string) {
    return value => value.replace(pattern, replacement);
}

pipe('  this is a  long    string')
    .through(
        trim(),
        toUpperCase(),
        replace(/\s{2,}/, ' ')
    )
```

## Generated Code

The library should allow for a dynamic amount of parameters. Unfortunately Typescript does not provide a way for
parameters to reference their predecessors. To accommodate still a wide variety of use cases, the actual source code is
generated, types for up to 20 functions.

If more than 20 functions are needed, another pipe can easily be started. For example:

```typescript
pipe('  this is a  long    string')
    .through(
        trim(),
        toUpperCase(),
        pipe
    )
    .through(
        replace(/\s{2,}/, ' ')
    )
```

### Generated Example Code

When generated for up to three functions looks like this:

```typescript
export function pipe<T>(value: T): Pipe<T> {
    return new Pipe(value);
}

export class Pipe<T> {
    constructor(private value: T) {
    }

    through<R>(f: (v: T) => R): R
    through<R1, R2>(f0: (v0: T) => R1, f1: (v1: R1) => R2): R2;
    through<R1, R2, R3>(f0: (v0: T) => R1, f1: (v1: R1) => R2, f2: (v2: R2) => R3): R3;
    through<R>(fn1: (v: T) => unknown, ...fns: ((v: unknown) => unknown)[]): R {
        return fns.reduce(((previousValue, currentFunction) => currentFunction(previousValue)), fn1(this.value)) as R
    }
}
```
