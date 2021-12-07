const rawInput = Deno.readTextFileSync('./day6/input.txt')
const values = rawInput.split(',');


const goldFishTimers = values.map(value => +value);


for (let day = 0; day < 80; day++) {
    let babies = 0;
    for(let i = 0; i< goldFishTimers.length; i++) {
        if (goldFishTimers[i] === 0) {
            babies++;
            goldFishTimers[i] = 7;
        }
        goldFishTimers[i]--;
    }

    for (let i=0; i < babies; i++) {
        goldFishTimers.push(8);
    }
}

console.log('GoldFish numer', goldFishTimers.length);
