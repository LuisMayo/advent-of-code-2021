const rawInput = Deno.readTextFileSync('./day12/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

class Cave {
    public start = false;
    public end = false;
    public big = false;
    public connections: Cave[] = [];
    constructor(public name: string) {
        if (name === 'start') {
            this.start = true;
        } else if (name === 'end') {
            this.end = true;
        } else if (name[0] >= 'A' && name[0] <= 'Z') {
            this.big = true;
        }
    }

    createConnection(cave: Cave) {
        if (this.connections.find(con => con === cave) == null) {
            this.connections.push(cave);
        }
    }
}

class Path {
    public path: Cave[] = [];
    public started = false;
    public finished = false;
    // Only one small cave may be duplicated twice
    public duplicatedSmallCave = false;
    addConection(cave: Cave) {
        if (!cave.big) {
            // If we have twice the same small cave then we won't be able to have any new cave
            if (this.path.find(item => item === cave)) {
                this.duplicatedSmallCave = true;
            }
        }
        this.path.push(cave);
        if (cave.start) {
            this.started = true;
        } else if (cave.end) {
            this.finished = true;
        }
    }

    checkIfCaveCanBeAdded(cave: Cave) {
        if (this.finished) {
            return false;
        }
        if (cave.start) {
            return !this.started;
        }

        if (this.duplicatedSmallCave === false) {
            return true;
        }
        // Small caves can only be traversed once
        if (!cave.big) {
            return this.path.find(item => item === cave) == null;
        }
        return true;
    }

    clone() {
        const clone = Object.assign(new Path(), this);
        clone.path = this.path.slice();
        return clone;
    }

    getPossibleNextSteps() {
        const steps: Cave[] = [];
        for (const cave of this.path[this.path.length -1 ].connections) {
            if (this.checkIfCaveCanBeAdded(cave)) {
                steps.push(cave);
            }
        }
        return steps;
    }
}

function iteratePaths(path: Path): Path[] {
    const pathArray: Path[] = [];
    const posiblities = path.getPossibleNextSteps();
    for (const posibility of posiblities) {
        const newPath = path.clone();
        newPath.addConection(posibility);
        if (newPath.finished) {
            pathArray.push(newPath);
        } else {
            pathArray.push(...iteratePaths(newPath));
        }
    }
    return pathArray;
}

const caves = new Map<string, Cave>();
const allInputCaves = lines.map(line => line.split('-')).flat();
let startCave!: Cave;

// We create all caves objects
for (const cave of allInputCaves) {
    if (!caves.has(cave)) {
        const newCave = new Cave(cave);
        caves.set(cave, newCave);
        if (newCave.start) {
            startCave = newCave;
        }
    }
}

// We create all conections
for (const line of lines) {
    const connectedCaves = line.split('-');
    const cave1 = caves.get(connectedCaves[0])!;
    const cave2 = caves.get(connectedCaves[1])!;
    cave1.createConnection(cave2);
    cave2.createConnection(cave1);
}

const startPath = new Path();
startPath.addConection(startCave);
const possiblePaths = iteratePaths(startPath);
console.log(`There are ${possiblePaths.length} possible paths`);
