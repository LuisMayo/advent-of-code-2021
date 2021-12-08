const rawInput = Deno.readTextFileSync('./day8/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);


let sum = 0;
for (const line of lines) {
    function translateCharacter(char: string) {
        // This is terrible, I didn't really think a lot about the data structure I used
        // And the structure I used is not easily reversable so I just do it by hand
        if (char === equivalences.realA) {
            return 'a';
        }
        if (char === equivalences.realB) {
            return 'b';
        }
        if (char === equivalences.realC) {
            return 'c';
        }
        if (char === equivalences.realD) {
            return 'd';
        }
        if (char === equivalences.realE) {
            return 'e';
        }
        if (char === equivalences.realF) {
            return 'f';
        }
        if (char === equivalences.realG) {
            return 'g';
        }
    }
    function findDigitForCharacters(display: string) {
        const translatedDisplay = Array.from(display).map((item) => translateCharacter(item));
        if (display.length === 2) {
            return 1;
        }
        if (display.length === 3) {
            return 7;
        }
        if (display.length === 7) {
            return 8;
        }
        if (display.length === 4) {
            return 4;
        }

        // if it lacks a central segment it's number 0
        if (!translatedDisplay.includes('d')) {
            return 0;
        }
        // if it lacks the e segment and it's length is 6, then it's number 9
        if (!translatedDisplay.includes('e') && display.length === 6) {
            return 9;
        }


        // if it has both e and f it's a 6
        if (translatedDisplay.includes('e') && translatedDisplay.includes('f')) {
            return 6;
        }

        // if it has both c and f it's a 3
        if (translatedDisplay.includes('c') && translatedDisplay.includes('f')) {
            return 3;
        }

        // if it has b it's a 5
        if (translatedDisplay.includes('b')) {
            return 5;
        }

        return 2;
    }
    const parts = line.split('|');
    // Here we have a demonstration of all possible numbers outputted by this display
    const showcase = parts[0].trim();
    const actualValues = parts[1].trim();
    const numbers = showcase.split(' ');
    const equivalences = {realA: '', realB: '', realC: '', realD: '', realE: '', realF: '', realG: ''};
    const counter = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0};

    // Let's count how many of them we have, it'll come in handy later
    for (const character of showcase) {
        if (character !== ' ') {
            // @ts-ignore
            counter[character]++;
        }
    }

    equivalences.realE = Object.entries(counter).find(characterCount => characterCount[1] === 4)![0];
    // F appears 9 times
    equivalences.realF = Object.entries(counter).find(characterCount => characterCount[1] === 9)![0];
    
    let one = '';
    let seven = '';
    let four = ''
    // We'll need the 1 and the 7
    for (let i = 0; i < numbers.length && (one === '' || seven === '' || four === '' ); i++) {
        if (numbers[i].length === 2) {
            one = numbers[i];
        } else if (numbers[i].length === 3) {
            seven = numbers[i];
        } else if (numbers[i].length === 4) {
            four = numbers[i];
        }
    }

    // The A will be present in the seven but not in the one so.
    // So we look in the seven number for any character which is nowhere to be found on the one one.
    equivalences.realA = Array.from(seven).find(character => Array.from(one).find(char => character === char) == null)!;

    // C will be in one, and will not be F
    equivalences.realC = Array.from(one).find(char => char !== equivalences.realF)!;

    // Only D appear in 7 numbers and in number 4
    equivalences.realD = Object.entries(counter).find(characterCount => characterCount[1] === 7 && Array.from(four).includes(characterCount[0]))![0];

    // B it's in 4 and it's not d c or f
    equivalences.realB = Array.from(four).find(char => 
        ![equivalences.realD, equivalences.realC, equivalences.realF].includes(char))!;
    // G is the only one behind so we must found that letter that is NOT on the equivalences map
    equivalences.realG = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    .find(char => Object.values(equivalences).find(charEquivalent => char === charEquivalent) == null)!;
    console.log(equivalences);
    let digits = '';
    // We get all the digits for the segmented displays
    for (const digit of actualValues.split(' ')) {
        digits += findDigitForCharacters(digit).toString();
    }
    console.log({digits});
    // Once we have all digits we can actually obtain a number
    sum += +digits;
}

console.log({sum});
