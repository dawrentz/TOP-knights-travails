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

// ============================================== major funcs ============================================== //

export function findShortestPath(startCoords, endCoords, pathLog = []) {
  //test
  // console.log("=========================");
  // console.log(startCoords);
  // console.log(endCoords);

  //log the current jump
  pathLog.push(startCoords);

  //base case: match
  //can't do array === array
  if (startCoords[0] === endCoords[0] && startCoords[1] === endCoords[1]) {
    console.log("match");
    // console.table(pathLog);
    return pathLog;
  }

  //need pass all prevCoords so they are not included in the next set of possMoves, else can get a infinite loop back and forth with two of the same moves
  //need check for paths that "trap" themselves also
  const possMoves = findPossibleMoves(startCoords, pathLog);

  //test
  // console.log(possMoves);

  //test
  // console.log("=========================");
  // console.log(possMoves);

  //if did not match and out of moves, means path traps itself
  if (possMoves.length === 0) return null;

  let shortestPath;

  //else, recursive call on all possible moves
  possMoves.forEach((move) => {
    const tempShortestPath = findShortestPath(move, endCoords, pathLog);

    //if pathLog no return null
    if (tempShortestPath) {
    }

    //if shortestPath is still in init, overwrite
    if (!shortestPath) {
      shortestPath = tempShortestPath;
    }

    if (tempShortestPath && tempShortestPath.length < shortestPath) {
      shortestPath = tempShortestPath;
    }
  });

  return;

  //will have to compare the returned paths and add up moves(like BST height)
}

// ============================================== lessor funcs ============================================== //

//return adjacency list of all valid moves from input coords
function findPossibleMoves(startCoords, pathLog) {
  const movesOnBoard = getMovesOnBoard(startCoords);
  const nonRepeatMoves = removePrevCoords(movesOnBoard, pathLog);

  return nonRepeatMoves;
}

//returns all possible moves, minus those off the board
function getMovesOnBoard(startCoords) {
  let movesOnBoard = [];

  waysToMoveArr.forEach((move) => {
    //calc each move
    const pontentialMove = [startCoords[0] - move[0], startCoords[1] - move[1]];

    //check for within bounds (board is 8x8 (#'s 0-7))
    if (
      pontentialMove[0] >= 0 &&
      pontentialMove[0] <= 7 &&
      pontentialMove[1] >= 0 &&
      pontentialMove[1] <= 7
    ) {
      movesOnBoard.push(pontentialMove);
    }
  });

  return movesOnBoard;
}

function removePrevCoords(movesOnBoard, pathLog) {
  const adjacencyPathLog = convertToAdjacencyList(pathLog);
  const nonPrevMoves = [];

  movesOnBoard.forEach((move) => {
    //if array ind
    // if (adjacencyPathLog[move[0]]) {
    // }

    if (!adjacencyPathLog[move[0]].includes(move[1])) nonPrevMoves.push(move);
  });

  return nonPrevMoves;
}

//is this really needed?
function convertToAdjacencyList(movesArr) {
  //will be an array of arrays
  let adjacencyList = [];
  //board vertices are 0 - 7
  for (let i = 0; i <= 7; i++) {
    //nested array for each column on board (column # = i), add j value (row value) here
    let tempArr = [];
    movesArr.forEach((move) => {
      if (move[0] === i) tempArr.push(move[1]);
    });
    adjacencyList.push(tempArr);
  }

  return adjacencyList;
}

// ============================================== testing ============================================== //

console.log("========================= new =========================");
console.log(findShortestPath([3, 3], [4, 5]));
