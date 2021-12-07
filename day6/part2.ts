const rawInput = Deno.readTextFileSync('./day6/input.txt')
const values = rawInput.split(',');

console.time();
// For each internal timer
const goldFishGenerations: {
    /**Internal timer */
    timer: number;
    /**How many of them have this timer */
    individuals: number;
}[] = [];


// Let's add all the initial fishes into the array
for (const value of values) {
    const timer = +value;
    const generation = goldFishGenerations.find(generation => generation.timer === timer);
    if (generation == null) {
        goldFishGenerations.push({individuals: 1, timer});
    } else {
        generation.individuals++;
    }
}



for (let day = 0; day < 256; day++) {
    let babies = 0;
    for(let i = 0; i< goldFishGenerations.length; i++) {
        if (goldFishGenerations[i].timer === 0) {
            babies += goldFishGenerations[i].individuals;
            goldFishGenerations[i].timer = 7;
        }
        goldFishGenerations[i].timer--;
    }

    goldFishGenerations.push({individuals: babies, timer: 8});
    // Further optimitaions are available. Because at this point, two generations with 6 as internal timer could exist, and we could merge them
}


const totalNumber = goldFishGenerations.reduce((a, b) => a + b.individuals, 0)
console.log('GoldFish numer', totalNumber);
console.timeEnd();