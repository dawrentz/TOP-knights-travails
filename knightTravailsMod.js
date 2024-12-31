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
  //if endCoords not in possMoves, run again on all,
  //should always end on the first possible move
  //may have to compare the recursively returned moveListArr.length and take shortest(s)

  //test
  //   console.log(pathLog);

  //log the current jump
  pathLog.push(startCoords);
  //base case: match
  if (startCoords === endCoords) {
    console.log("match");
    return pathLog;
  }

  //endCoords[0] tells which nested array in adjacenyPossMoves to look at. Looks if that array contains a link to the endCoords second coordinate
  //   if (adjacenyPossMoves[endCoords[0]].includes(endCoords[1])) {
  //     console.log("match");
  //     return pathLog;
  //   }

  //else recursive call on all possible moves
  const possMoves = findPossibleMoves(startCoords);
  //   const adjacenyPossMoves = convertToAdjacencyList(possMoves);

  //   findShortestPath(possMoves[0], endCoords, pathLog);

  //getting a loop stuck between two moves, back and forth: need run check for no previous move?
  possMoves.forEach((move) => {
    findShortestPath(move, endCoords, pathLog);
  });
}

// ============================================== lessor funcs ============================================== //

//return adjacency list of all valid moves from input coords
function findPossibleMoves(startCoords) {
  let possibleMovesArr = [];

  waysToMoveArr.forEach((move) => {
    //grab all possible moves and see which are on on the board
    //board is 8x8 (#'s 0-7)
    const pontentialMove = [startCoords[0] - move[0], startCoords[1] - move[1]];
    if (
      pontentialMove[0] >= 0 &&
      pontentialMove[0] <= 7 &&
      pontentialMove[1] >= 0 &&
      pontentialMove[1] <= 7
    ) {
      possibleMovesArr.push(pontentialMove);
    }
  });

  return possibleMovesArr;
}

//is this really needed?
//i cant find a place for it, seem to make things more complicated
function convertToAdjacencyList(possibleMovesArr) {
  //will be an array of arrays
  let adjacencyList = [];
  //board vertices are 0 - 7
  for (let i = 0; i <= 7; i++) {
    //nested array for each column on board (column # = i), add j value (row value) here
    let tempArr = [];
    possibleMovesArr.forEach((move) => {
      if (move[0] === i) tempArr.push(move[1]);
    });
    adjacencyList.push(tempArr);
  }

  return adjacencyList;
}

// ============================================== testing ============================================== //

console.log(findShortestPath([3, 3], [4, 5]));
