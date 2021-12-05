const rawInput = Deno.readTextFileSync('./day5/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

class Coordinate {
    constructor (public x: number, public y: number) {
    }

    static createCoordinateFromString(serial: string) {
        let x: number;
        let y: number;
        [x, y] = serial.trim().split(',').map(item => +item);
        return new this(x, y);
    }
}

class Line {
    start: Coordinate;
    end: Coordinate;
    constructor(serial: string) {
        [this.start, this.end] = serial.split('->').map(item => Coordinate.createCoordinateFromString(item));
    }

    getPointsCoveredByLine() {
        const points: Coordinate[] = [];
        if (this.start.x === this.end.x) {
            // Lines may be pointing in a decreasing matter
            const realStart = Math.min(this.start.y, this.end.y);
            const realEnd = Math.max(this.start.y, this.end.y);
            for (let i = realStart; i <= realEnd; i++) {
                points.push(new Coordinate(this.start.x, i));
            }
        } else if (this.start.y === this.end.y) {
            // Lines may be pointing in a decreasing matter
            const realStart = Math.min(this.start.x, this.end.x);
            const realEnd = Math.max(this.start.x, this.end.x);
            for (let i = realStart; i <= realEnd; i++) {
                points.push(new Coordinate(i, this.start.y));
            }
        } else {
            const xIncrements = this.start.x < this.end.x;
            const yIncrements = this.start.y < this.end.y;
            let x = this.start.x;
            let y = this.start.y;
            // We have to repeat this the amount of times as the distance between the points
            for (let i = 0; i <= Math.abs(this.start.x - this.end.x); i++) {
                points.push(new Coordinate(x, y));
                x += xIncrements ? 1 : -1;
                y += yIncrements ? 1 : -1;
            }
        }
        return points;
    }
}

class HydroMap {
    // Column, row(x, y) format
    map: number[][]= [];

    addLine(lineStr: string) {
        const line = new Line(lineStr);
        const points = line.getPointsCoveredByLine();
        for (const point of points) {
            // Does this column even exists?
            if (this.map[point.x] == null) {
                this.map[point.x] = [];
            }
            // Does this point exists?
            if (this.map[point.x][point.y] == null) {
                this.map[point.x][point.y] = 1;
            } else {
                this.map[point.x][point.y]++;
            }
        }
    }

    getNumberOfDangerousPoints() {
        const dangerousPoints = this.map.flat().filter(point => point >= 2);
        return dangerousPoints.length;
    }

}

const map = new HydroMap();
for (const line of lines) {
    map.addLine(line);
}

console.log('Dangerous points', map.getNumberOfDangerousPoints());
