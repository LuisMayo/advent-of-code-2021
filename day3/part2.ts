const rawInput = Deno.readTextFileSync('./day3/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

function getCounterForArr(arr: string[]) {
    const counters: {one: number, zero: number}[] = [];
    for(let i = 0;i < arr[0].length;i++) {
      counters.push({ one: 0, zero: 0 });
    }
  
    for(const line of arr) {
      for(let i = 0;i < line.length;i++) {
        const char = line[i];
        if(char === '0') {
          counters[i].zero++;
        } else {
          counters[i].one++;
        }
      }
    }
    return counters;
  }



let oxygenOptions = lines;
let co2Options = lines;

let i = 0;
while (oxygenOptions.length > 1 && i < oxygenOptions[0].length) {
    const counters = getCounterForArr(oxygenOptions);
    let wantedDigit = counters[i].zero > counters[i].one ? '0' : '1';
    oxygenOptions = oxygenOptions.filter(item => item[i] === wantedDigit);
    i++;
}

i = 0;
while (co2Options.length > 1 && i < co2Options[0].length) {
    const counters = getCounterForArr(co2Options);
    let wantedDigit = counters[i].one >= counters[i].zero ? '0' : '1';
    co2Options = co2Options.filter(item => item[i] === wantedDigit);
    i++;
}

if (oxygenOptions.length > 1 || co2Options.length > 1) {
    console.warn('Couldn\'t find a single value for the O2 or CO2');
}

const oxygen = parseInt(oxygenOptions[0], 2);
const c02 = parseInt(co2Options[0], 2);
console.log('oxygen', oxygen);
console.log('c02', c02);
console.log('Life support', oxygen * c02);
