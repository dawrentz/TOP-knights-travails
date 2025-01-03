//knightTravailsMod.js

// ============================================== init ============================================== //

console.clear();

//what the knight can do (vectors)
const waysToMoveArr = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

//for testing
// const waysToMoveArr = [
//   [-1, 0],
//   [1, 0],
//   [0, -1],
//   [0, 1],
// ];

//customize for testing
const numColumns = 8;
const numRows = 8;

// ============================================== major funcs ============================================== //

//main interaction
export function knightMoves(startCoords, endCoords) {
  const newPath = new PathFinder(startCoords);
  const shortestPath = newPath.shortestPath(endCoords);
  logShortestPath(shortestPath);
}

//format solution
function logShortestPath(shortestPath) {
  //path includes starting point (starts at zero), subtract one for accuracy
  console.log(
    `You made it in ${shortestPath.length - 1} moves! Heres your path:`
  );
  shortestPath.forEach((move) => {
    console.log(move);
  });
}

//node creation (square on chessboard)
function Square(coords, parent = null) {
  return {
    coords,
    parent,
  };
}

//having this.root is helpful, but probably figure out a way to do without a class
class PathFinder {
  //init root at starting coords, helps with shortestPath() init
  constructor(startCoords) {
    this.root = Square(startCoords);
  }

  shortestPath(endCoords, queue = [this.root]) {
    //take first, shift queue up
    const currentSquare = queue.shift();
    const pathLog = getPathLog(currentSquare);
    //no longer need pass startCoords; queue init's to root (has startCoords)
    const possMoveCoords = findPossibleMoves(currentSquare.coords, pathLog);

    //if currently on end point
    if (
      currentSquare.coords[0] === endCoords[0] &&
      currentSquare.coords[1] === endCoords[1]
    ) {
      return pathLog;
    }

    //else add all possMove nodes from current node to que and recursive call till find first solution
    possMoveCoords.forEach((possMoveCoord) => {
      //need pass node to access parent prop (for pathLog)
      const newSquare = Square(possMoveCoord, currentSquare);
      queue.push(newSquare);
    });

    return this.shortestPath(endCoords, queue);
  }
}

// ============================================== lessor funcs ============================================== //
//all these should be inside the class?

function findPossibleMoves(startCoords, pathLog) {
  //get all moves, remove off board, remove prev moves
  const potentialMoves = getPotentialMoves(startCoords);
  const onBoardMoves = removeOutOfBoundsMoves(potentialMoves);
  const possMoveCoords = removePrevCoords(onBoardMoves, pathLog);

  return possMoveCoords;
}

function getPotentialMoves(startCoords) {
  let potentialMoves = [];

  //run current coords through all possibilities
  waysToMoveArr.forEach((move) => {
    const tempMove = [startCoords[0] + move[0], startCoords[1] + move[1]];
    potentialMoves.push(tempMove);
  });

  return potentialMoves;
}

function removeOutOfBoundsMoves(potentialMoves) {
  const onBoardMoves = [];

  //if out of bounds, leave behind
  potentialMoves.forEach((move) => {
    //move[0] = x-coord
    //move[1] = y-coord
    //coords start with 0
    if (
      move[0] >= 0 &&
      move[0] <= numColumns - 1 &&
      move[1] >= 0 &&
      move[1] <= numRows - 1
    ) {
      onBoardMoves.push(move);
    }
  });

  return onBoardMoves;
}

function removePrevCoords(onBoardMoves, pathLog) {
  //need adjacency list: with nested arrays cant use "array.includes(array)""; JS doesn't see it as the same object
  const adjacencyPathLog = createAdjacencyList(pathLog);

  let nonPrevMoves = [];
  //if no match, add to list
  onBoardMoves.forEach((move) => {
    //x-coord of move lines up with index for adjacency list (by design)
    const searchArr = adjacencyPathLog[move[0]];

    //if present, y-coord of move would be in the array at that index in adjacency list
    if (!searchArr.includes(move[1])) {
      nonPrevMoves.push(move);
    }
  });

  return nonPrevMoves;
}

//returns array of all past move coords (nested arrays)
function getPathLog(square) {
  //root.parent is null
  if (!square.parent) return [square.coords];
  //concat after to maintain chronological order
  return getPathLog(square.parent).concat([square.coords]);
}

//from TOP
function createAdjacencyList(coordArr) {
  let adjacencyList = [];

  //collect all y-coords with common x-coords into arrays where the contain array index # lines up with the x-coord
  //convert to index with -1
  for (let i = 0; i <= numColumns - 1; i++) {
    let tempNestArr = [];

    coordArr.forEach((coord) => {
      if (coord[0] === i) tempNestArr.push(coord[1]);
    });

    adjacencyList.push(tempNestArr);
  }

  return adjacencyList;
}

// ============================================== testing ============================================== //
