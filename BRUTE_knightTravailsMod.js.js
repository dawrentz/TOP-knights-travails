//BRUTEknightTravailsMod.js

// ============================================== note ============================================== //

//this depth-first method works but uses too much memory. need breadth-first (automatically finds shortest path(s))
//abandoning

// ============================================== init ============================================== //

console.clear();

// const waysToMoveArr = [
//   [-2, -1],
//   [-2, 1],
//   [-1, -2],
//   [-1, 2],
//   [1, -2],
//   [1, 2],
//   [2, -1],
//   [2, 1],
// ];

const waysToMoveArr = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const numColumns = 3;
const numRows = 3;

// ============================================== major funcs ============================================== //

function Square(coords, pathLogArg = []) {
  //pathLof array was being updated in the deeper recursion calls
  const pathLog = [...pathLogArg];
  pathLog.push(coords);

  const possMoves = findPossibleMoves(coords, pathLog);
  const possSquares = [];

  possMoves.forEach((move) => {
    //test
    // console.log("======================");
    // console.log(move);
    // console.log(pathLog);
    const square = Square(move, pathLog);

    possSquares.push(square);
  });

  return {
    coords,
    possSquares,
    pathLog,
  };
}

class PathsSet {
  constructor(startCoords) {
    this.root = Square(startCoords);
  }

  //now build finders and sorters

  collectPathsToEnd(endCoords, square = this.root, allPaths = []) {
    if (
      square.coords[0] === endCoords[0] &&
      square.coords[1] === endCoords[1]
    ) {
      allPaths.push(square.pathLog);
    } else {
      square.possSquares.forEach((square) => {
        this.collectPathsToEnd(endCoords, square, allPaths);
      });
    }

    return allPaths;
  }
}

// ============================================== lessor funcs ============================================== //

// function getPathLog(square)

function findPossibleMoves(startCoords, pathLog) {
  const potentialMoves = getPotentialMoves(startCoords);
  const onBoardMoves = removeOutOfBoundsMoves(potentialMoves);
  const possMoves = removePrevCoords(onBoardMoves, pathLog);

  // console.log("========================");
  // console.log(startCoords);
  // console.log(pathLog);
  // console.log(possMoves);

  return possMoves;
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

console.log("========================= new =========================");
const allPaths = new PathsSet([0, 0]);

console.log(allPaths.root);

console.log(allPaths.collectPathsToEnd([2, 1]));

//test
// const testStart = [1, 1];
// console.log("testStart");
// console.log(testStart);
// const testPotMoves = getPotentialMoves(testStart);
// console.log("testPotMoves");
// console.log(testPotMoves);
// const testBoardMoves = removeOutOfBoundsMoves(testPotMoves);
// console.log("testBoardMoves");
// console.log(testBoardMoves);
// const testPossMoves = removePrevCoords(testBoardMoves, [[0, 1]]);
// console.log("testPossMoves");
// console.log(testPossMoves);
