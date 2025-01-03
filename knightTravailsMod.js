//knightTravailsMod.js

// ============================================== init ============================================== //

console.clear();

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

const numColumns = 8;
const numRows = 8;

// ============================================== major funcs ============================================== //
export function knightMoves(startCoords, endCoords) {
  const newPath = new PathFinder(startCoords);

  //run
  const shortestPath = newPath.shortestPath(endCoords);
  logShortestPath(shortestPath);
}

function logShortestPath(shortestPath) {
  console.log(`You made it in ${shortestPath.length} moves! Heres your path:`);
  shortestPath.forEach((move) => {
    console.log(move);
  });
}

function Square(coords, parent = null) {
  return {
    coords,
    parent,
  };
}

class PathFinder {
  constructor(startCoords) {
    this.root = Square(startCoords);
  }

  shortestPath(endCoords, queue = [this.root]) {
    const currentSquare = queue.shift();

    const pathLog = getPathLog(currentSquare);
    if (
      currentSquare.coords[0] === endCoords[0] &&
      currentSquare.coords[1] === endCoords[1]
    ) {
      return pathLog;
    }

    const possMoveCoords = findPossibleMoves(currentSquare.coords, pathLog);

    possMoveCoords.forEach((possMoveCoord) => {
      const newSquare = Square(possMoveCoord, currentSquare);
      queue.push(newSquare);
    });

    return this.shortestPath(endCoords, queue);
  }

  findMatches(possMoveCoords, endCoords) {
    let hasEndCoords = [];

    possMoveCoords.forEach((move) => {
      if (move[0] === endCoords[0] && move[1] === endCoords[1]) {
        hasEndCoords.push(move);
      }
    });

    return hasEndCoords;
  }
}

// ============================================== lessor funcs ============================================== //

function findPossibleMoves(startCoords, pathLog) {
  const potentialMoves = getPotentialMoves(startCoords);
  const onBoardMoves = removeOutOfBoundsMoves(potentialMoves);
  const possMoveCoords = removePrevCoords(onBoardMoves, pathLog);

  return possMoveCoords;
}

function getPotentialMoves(startCoords) {
  let potentialMoves = [];

  waysToMoveArr.forEach((move) => {
    const tempMove = [startCoords[0] + move[0], startCoords[1] + move[1]];
    potentialMoves.push(tempMove);
  });

  return potentialMoves;
}

function removeOutOfBoundsMoves(potentialMoves) {
  const onBoardMoves = [];

  potentialMoves.forEach((move) => {
    //move[0] = x-coord
    //move[1] = y-coord
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
  const adjacencyPathLog = createAdjacencyList(pathLog);

  let nonPrevMoves = [];
  onBoardMoves.forEach((move) => {
    //x-coord of move lines up with index for adjacency list
    const searchArr = adjacencyPathLog[move[0]];

    //y-coord of move would be in the array at that index in adjacency list
    if (!searchArr.includes(move[1])) {
      nonPrevMoves.push(move);
    }
  });

  return nonPrevMoves;
}

function getPathLog(square) {
  if (!square.parent) return [square.coords];
  return getPathLog(square.parent).concat([square.coords]);
}

function createAdjacencyList(coordArr) {
  let adjacencyList = [];

  //conver to index with -1
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
