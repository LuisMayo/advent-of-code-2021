const slidingWindowLength = 3;
const rawInput = Deno.readTextFileSync('./day1/input.txt')
// each line is a value in this problem, also we don't want blank lines
// + are important as it's a string-to-number conversion
const lines = rawInput.split('\n').filter(line => line.length !== 0).map(line => +line);

let increments = 0;
let lastSlidingWindow: number | null = null;
for (let i = slidingWindowLength - 1; i < lines.length; i++) {
    let currentSlidingWindow = 0;
    // We compute the current sliding window we're in right now
    // We do it by adding up the previous "slidingWindowLength" number of items in the array
    for (let j = i - (slidingWindowLength - 1); j <= i; j++) {
        currentSlidingWindow += lines[j];
    }
    // If this isn't the first sliding window and it's bigger than te previous we got it
    if (lastSlidingWindow != null && currentSlidingWindow > lastSlidingWindow) {
        increments++;
    }
    lastSlidingWindow = currentSlidingWindow;
}
console.log(`There have been ${increments} depth increments`);