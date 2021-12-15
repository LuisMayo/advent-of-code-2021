const rawInput = Deno.readTextFileSync('./day15/input.txt')
// each line is a value in this problem, also we don't want blank lines
const lines = rawInput.replaceAll('\r', '').split('\n').filter(line => line.length !== 0);

// row, column (y, x)
const map: number[][] = [];


class Point {
    constructor(public x: number, public y: number) { }
}

class AstarNode {
    public heuristic: number;
    // Cost it took to come here
    get f() {
        return this.cost + this.heuristic;
    }
    constructor(public position: Point, public cost: number, public parent: AstarNode | null) {
        const lastY = map.length - 1;
        const lastX = map[0].length - 1;
        this.heuristic = Math.abs(position.x - lastX) + Math.abs(position.y - lastY);
    }

    equals(node: AstarNode) {
        return node.position.x === this.position.x && node.position.y === this.position.y;
    }

    isGoal() {
        return this.position.y === map.length - 1 && this.position.x === map[this.position.y].length - 1;
    }

    getAllNeighbors() {
        const neighbors: AstarNode[] = [];
        if (this.position.y > 0) {
            neighbors.push(this.getSuccesor(this.position.x, this.position.y - 1));
        }
        if (this.position.x > 0) {
            neighbors.push(this.getSuccesor(this.position.x - 1, this.position.y));
        }
        if (this.position.y < map.length - 1) {
            neighbors.push(this.getSuccesor(this.position.x, this.position.y + 1));
        }
        if (this.position.x < map[this.position.y].length - 1) {
            neighbors.push(this.getSuccesor(this.position.x + 1, this.position.y));
        }
        return neighbors;
    }

    private getSuccesor(x: number, y: number) {
        const newPoint = new Point(x, y);
        const newCost = this.cost + map[y][x];
        return new AstarNode(newPoint, newCost, this);
    }

    toString() {
        return `(${this.position.x}, ${this.position.y})`;
    }
}

// We get the data
for (const line of lines) {
    const row = line.split('').map(item => +item);
    map.push(row);
}

const closedNodes: AstarNode[] = [];
const startNode = new AstarNode(new Point(0, 0), 0, null);
const openNodes: AstarNode[] = [startNode];
let endNode: AstarNode | null = null;

// A*
while (openNodes.length > 0 && endNode == null) {
    let bestNodeIndex = 0;
    // We finde the best node
    for (let i = 1; i < openNodes.length; i++) {
        if (openNodes[i].f < openNodes[bestNodeIndex].f) {
            bestNodeIndex = i;
        }
    }
    const bestNode = openNodes[bestNodeIndex];
    openNodes.splice(bestNodeIndex, 1);

    ///////////
    // let trailNode = bestNode;
    // const trail = [trailNode];
    // while (trailNode.parent != null) {
    //     trailNode = trailNode.parent;
    //     trail.push(trailNode);
    // }
    // trail.reverse();
    // console.log(trail.join(' -> '));
    //////////////
    // Node found
    closedNodes.push(bestNode);
    if (bestNode.isGoal()) {
        endNode = bestNode;
    } else {
        const possibleNeighbors = bestNode.getAllNeighbors();
        for (const neighbor of possibleNeighbors) {
            const closedNode = closedNodes.findIndex(node => node.equals(neighbor));
            if (closedNode !== -1) {
                continue;
            }
            const openNode = openNodes.findIndex(node => node.equals(neighbor));
            if (openNode !== -1) {
                if (openNodes[openNode].f > neighbor.f) {
                    openNodes.splice(openNode, 1);
                } else {
                    continue;
                }
            }
            openNodes.push(neighbor);
        }
    }
}
console.log(endNode?.cost);
