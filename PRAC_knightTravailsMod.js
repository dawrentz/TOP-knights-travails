//knightTravailsMod.js

// ============================================== init ============================================== //

console.clear();

//testing with a 3x2 rectangle (4 paths)
//can only move up, down, left, or right by 1
const waysToMoveArr = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// ============================================== major funcs ============================================== //

export function findShortestPath(startCoords, endCoords, pathLog = []) {
  //update pathLog
  pathLog.push(startCoords);

  //test
  console.log("startCoords");
  console.log(startCoords);
  console.log("pathLog");
  console.log(pathLog);

  //base case: match
  if (startCoords[0] === endCoords[0] && startCoords[1] === endCoords[1]) {
    //test
    console.log("match");
    return pathLog;
  }

  //else recursion
  const possMoves = findPossibleMoves(startCoords, pathLog);
  if (possMoves.length === 0) return null;

  //test
  console.log("possMoves");
  console.log(possMoves);

  possMoves.forEach((move) => {
    //not shortest path, just all paths, then return shortest?
    //maybe just return the coords and make pastlog from cncat ?
    const path = findShortestPath(move, endCoords, pathLog);
    //test

    console.log("move");
    console.log(move);
    console.log(path);
  });
}

// ============================================== lessor funcs ============================================== //

function findPossibleMoves(startCoords, pathLog) {
  const potentialMoves = getPotentialMoves(startCoords);
  const onBoardMoves = removeOutOfBoundsMoves(potentialMoves);
  const possMoves = removePrevCoords(onBoardMoves, pathLog);

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
    if (move[0] >= 0 && move[0] <= 2 && move[1] >= 0 && move[1] <= 1) {
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
  //x-value range
  const numColumns = 3;

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
console.log(findShortestPath([0, 0], [2, 1]));

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
