class Node 
{
    constructor(x,y) 
    {
        this.x = x;
        this.y = y;
    }
}

function makeBoard() {
    let x = [0, 1, 2, 3, 4, 5, 6, 7];
    let y = [0, 1, 2, 3, 4, 5, 6, 7];
    let board = [];
    for (let i of x) {
        for (let j of y) {
            let coordinates = new Node(i,j)
            board.push(coordinates);
        }
    }

    return board;
}

const chessBoard = makeBoard()

class KnightBoard 
{
    constructor() 
    {
        this.board = this.makeBoardWithMoves();
    }  

    makeBoardWithMoves() {
        let possibleMoves = [[-2,-1], [-1,-2], [2,-1], [1,-2], [2,1], [1,2], [-2,1], [-1,2]];
        const board = chessBoard;

        for (let square of board) {  
            square.moves = [];

            for (let move of possibleMoves){
                if(square.x + move[0] >= 0 && square.x + move[0] <= 7 && square.y + move[1] >= 0 && square.y + move[1] <= 7) {
                    let newNode = new Node(square.x + move[0], square.y + move[1]);
                    let neighbour = board.find(node => {
                        return node.x === newNode.x && node.y === newNode.y
                    })
                    square.moves.push(neighbour)
                }
            }                       
        }

        return board;
    }
}

const knightTour = new KnightBoard()

const knightMoves = function(start = [], end = []) {
    const isValidCoordinate = ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

    if (![start, end].every(isValidCoordinate)) {
        return 'Please select inputs between [0,0] and [7,7]';
    }

    let visited = new Set();
    let queue = [];
    let path = [];

    const getStartNode = () => {
        return knightTour.board.find(node => {
            return  node.x === start[0] && node.y === start[1];
        })
    } 

    const startNode = getStartNode();
    queue.push([startNode]);
    

    while (queue.length > 0) {
        let currentPath = queue.shift();
        let currentNode = currentPath[currentPath.length - 1];

        if (currentNode.x === end[0] && currentNode.y === end[1]) {
            path = currentPath.map(node => [node.x, node.y]);
            break;
        }

        if (!visited.has(currentNode)) {
            visited.add(currentNode);

            for (let move of currentNode.moves) {
                if (!visited.has(move)) {
                    let newPath = [...currentPath, move];
                    queue.push(newPath);
                }
            }
        }

        if (queue.length === 0) {
            return 'No valid path found';
        }
    }
    return path;
}

// driver code

console.log(knightMoves([3,3], [4,3]));
console.log(knightMoves([0,0], [7,7]));