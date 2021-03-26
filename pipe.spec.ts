import {pipe} from "./pipe";

function spy(returnValue: Symbol, expectedInput: Symbol) {
    return (value: Symbol) => {
        if (value !== expectedInput) {
            throw new Error(`Unexpected argument ${value.toString()}, should have been ${expectedInput.toString()}`);
        }
        return returnValue;
    }
}

for (let i = 2; i <= 100; i++) {
    const initialValue = Symbol('initialValue');
    const values = new Array(i + 1).fill('').map((_, n) => Symbol(`Symbol ${n}`));
    const mappers = new Array(i)
        .fill('')
        .map((_, n) => spy(values[n + 1], values[n]));
    const initialMapper = spy(values[0], initialValue)

    // @ts-ignore
    const result = pipe(initialValue).through(initialMapper, ...mappers);

    if (result !== values[i]) {
        throw new Error(`Unexpected initial value ${result.toString()}, should have been ${values[i].toString()}`)
    }
}

console.log('Success!');
