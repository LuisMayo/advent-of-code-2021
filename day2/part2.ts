const rawInput = Deno.readTextFileSync('./day2/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.split('\n').filter(line => line.length !== 0);

type OP = 'forward' | 'up' | 'down';

class Instruction {
    command: OP;
    value: number;
    constructor(command: string) {
        const regex = /(\S+) (\d+)/;
        const parseResults = command.match(regex);
        if (parseResults != null) {
            this.command = parseResults[1] as OP;
            this.value = +parseResults[2];
        } else {
            throw new Error('Error while parsing command ' + command);
        }
    }
}

class Submarine {
    private x = 0;
    private y = 0;
    private aim = 0;

    executeInstruction(instruction: Instruction) {
        switch(instruction.command) {
            case "down":
                this.aim += instruction.value;
                break;
            case "up":
                this.aim -= instruction.value;
                break;
            case "forward":
                this.x += instruction.value;
                this.y += instruction.value * this.aim;
                break;
            default:
                console.error('Unrecognized command ' + instruction.command);     
        }
    }

    getPosition() {
        return this.x * this.y;
    }
}

const submarine = new Submarine();

for (const line of lines) {
    const instruction = new Instruction(line);
    submarine.executeInstruction(instruction);
}

console.log('Submarine position', submarine.getPosition());
