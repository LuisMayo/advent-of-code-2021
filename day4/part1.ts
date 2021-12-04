const rawInput = Deno.readTextFileSync('./day4/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n\n').filter(line => line.length !== 0);

class Card {
    // Row, column format
    cells: {number: number, drawn: boolean}[][] = [];
    // For perfomance reasons we have a map to look for any number drawn, so we don't have to do an O(n) search
    lookUpTable = new Map<number, {number: number, drawn: boolean}>();
    constructor(serializedCard: string) {
        // Be careful if there are any empty lines
        const rows = serializedCard.split('\n').filter(item => item.trim().length > 0);
        for (let i = 0; i < rows.length; i++) {
            this.cells[i] = [];
            // Due to how the data is formatted, there may be blank spaces when separating it by spaces
            const cells = rows[i].split(' ').filter(item => item.trim().length > 0);
            for (let j = 0; j< cells.length; j++) {
                const cell = cells[j];
                const obj = { number: +cell, drawn: false };
                this.cells[i].push(obj);
                this.lookUpTable.set(+cell, obj);
            }
        }
    }

    drawNumber(number: number) {
        if (this.lookUpTable.has(number)) {
            const cell = this.lookUpTable.get(number)!;
            cell.drawn = true;
        }
    }

    checkWinningState() {
        let win = false;
        for (let i = 0; i< this.cells.length && !win; i++) {
            let winning = true;
            // Check row
            for (let j = 0; j < this.cells[i].length && winning; j++) {
                winning = this.cells[i][j].drawn;
            }

            if(!winning) {
                winning = true;
                // Row was not succesful, check columns
                for (let j = 0; j < this.cells[i].length && winning; j++) {
                    winning = this.cells[j][i].drawn;
                }
            }
            win = winning;
        }
        return win;
    }

    getSumOfUnmarked() {
        let sum = 0;
        for (const row of this.cells) {
            for (const cell of row) {
                if (!cell.drawn) {
                    sum += cell.number;
                }
            }
        }
        return sum;
    }
}



const numbersDrawn = lines[0].split(',');
const cards: Card[] = [];
for (const line of lines.slice(1)) {
    cards.push(new Card(line));
}

let win: Card | null = null;
let i = 0
for (i = 0; i < numbersDrawn.length && win == null; i++) {
    for (const card of cards) {
        card.drawNumber(+numbersDrawn[i]);
        if (card.checkWinningState()) {
            win = card;
            break;
        }
    }
}

console.log('Score', win?.getSumOfUnmarked()! * +numbersDrawn[i-1]);
