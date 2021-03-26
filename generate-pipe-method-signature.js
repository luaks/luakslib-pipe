const process = require('process');

const levels = Number.parseInt(process.argv[2], 10);

function buildPipeLevel(level) {
    if (level === 1) {
        return `    through<R>(f: (v: T) => R): R`
    } else {
        const genericType = new Array(level).fill('R').map((value, index) => `${value}${index + 1}`).join(', ')
        const params = new Array(level).fill('R').map((value, index) => `f${index}: (v${index}: ${index === 0 ? 'T' : 'R'}${index === 0 ? '' : index}) => R${index + 1}`).join(', ')
        return `    through<${genericType}>(${params}): R${level};`;
    }
}

for (let i = 1; i <= levels; i++) {
    console.log(buildPipeLevel(i));
}
