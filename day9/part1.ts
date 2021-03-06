const rawInput = Deno.readTextFileSync('./day9/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

const map: number[][] = [];

// We get the data
for (const line of lines) {
    const row = line.split('').map(item => +item);
    map.push(row);
}

let sum = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const number = map[i][j];
        if ((i === 0 || map[i-1][j] > number) &&
            (j === 0 || map[i][j-1] > number) &&
            (i === map.length - 1 || map[i+1][j] > number) &&
            (j === map[i].length -1 || map[i][j+1] > number)) {
                sum += number + 1;
            }
    }
}

console.log('Risk level', sum);
