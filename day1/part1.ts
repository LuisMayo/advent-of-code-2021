const rawInput = Deno.readTextFileSync('./day1/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.split('\n').filter(line => line.length !== 0);

let increments = 0;
for (let i = 1; i < lines.length; i++) {
    // + are important as it's a string-to-number conversion
    if (+lines[i] > + lines[i-1]) {
        increments++;
    }
}

console.log(`There have been ${increments} depth increments`);