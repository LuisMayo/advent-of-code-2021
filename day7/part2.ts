const rawInput = Deno.readTextFileSync('./day7/input.txt')
// each line is a value in this problem, also we don't want blank lines
const input = rawInput.split(',');
const numbers = input.map(val => +val);

const min = Math.min(...numbers);
const max = Math.max(...numbers);

let bestPosition = {fuel: Number.MAX_VALUE, position: -1};

for (let i = min; i <=max; i++) {
    const fuelConsumition = numbers.reduce((sum, crabPosition) => {
        const distance = Math.abs(crabPosition - i);
        return sum + ((Math.pow(distance, 2) + distance)/2);
    }, 0);
    if (fuelConsumition < bestPosition.fuel) {
        bestPosition.fuel = fuelConsumition;
        bestPosition.position = i;
    }
}

console.log(bestPosition);