const rawInput = Deno.readTextFileSync('./day3/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

const counters: {one: number, zero: number}[] = [];
for (let i = 0; i < lines[0].length; i++) {
    counters.push({one: 0, zero: 0});
}

for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '0') {
            counters[i].zero++;
        } else {
            counters[i].one++;
        }
    }
}

let gammaString = '';
let epsilonString = '';

for (const counter of counters) {
    if (counter.zero > counter.one) {
        gammaString += '0';
        epsilonString += '1';
    } else {
        gammaString += '1';
        epsilonString += '0';
    }
}
const gamma = parseInt(gammaString, 2);
const epsilon = parseInt(epsilonString, 2);

console.log('GammaBinary', gammaString);
console.log('EpsilonBinary', epsilonString);
console.log('Gamma', gamma);
console.log('Epsilon', epsilon);
console.log('Power', gamma * epsilon);
