const rawInput = Deno.readTextFileSync('./day8/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

const displayOutputs = lines.map(line =>line.split('|')[1].trim());
// We're looking for 1, 4, 7 and 8
let totalOfDesirableNumbers = 0;

for (const displayOutput of displayOutputs) {
    const values = displayOutput.split(' ');
    const desiredValues = values.filter(value => [2, 4, 3, 7].includes(value.length));
    totalOfDesirableNumbers += desiredValues.length;
}

console.log('Wanted numbers', totalOfDesirableNumbers);
