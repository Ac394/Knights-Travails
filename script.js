const gridSize = 7;
const graph = {};
const graphTable = [];

// Check if Knight movement is out of board
const inRange = (num) => {
  return num >= 0 && num <= gridSize ? true : false;
}

// Print each valid move in a readable manner
const printGraph = () => {
  for (const [key, value] of Object.entries(graph)) {
    console.log(`${key} = ${value.join(" | ")}`);
  }
}

// Create a graph of valid Knight movements
(() => {
  for (let i = 0; i <= gridSize; i++) {
    graphTable[i] = [];
    for (let j = 0; j <= gridSize; j++) {
      const array = [];
      if (inRange(i - 2) && inRange(j - 1)) array.push([i - 2, j - 1]);
      if (inRange(i + 2) && inRange(j + 1)) array.push([i + 2, j + 1]);
      if (inRange(i + 1) && inRange(j - 2)) array.push([i + 1, j - 2]);
      if (inRange(i + 1) && inRange(j + 2)) array.push([i + 1, j + 2]);
      if (inRange(i - 1) && inRange(j - 2)) array.push([i - 1, j - 2]);
      if (inRange(i - 2) && inRange(j + 2)) array.push([i - 1, j + 2]);
      if (inRange(i + 2) && inRange(j - 1)) array.push([i + 2, j - 1]);
      if (inRange(i - 2) && inRange(j + 1)) array.push([i - 2, j + 1]);
      graph[[i, j]] = array;
    }
  }
})();

// Check if input is in the proper format
const correctInput = (input) => {
  return Array.isArray(input) && input.length === 2 && typeof input[0] === "number" && typeof input[1] === "number" ? true : false
}

// Check if two arrays are equal
const isEqual = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2) ? true : false;
}

const knightMoves = (start, end) => {

  if (!correctInput(start) || !correctInput(end)) {
    return console.log("Invalid input, use arrays in the following format ex.[1,4]")
  }

  const queue = [start];
  const parent = { [start]: null };

  while (queue.length) {
    let curr = queue.shift();

    if (isEqual(curr, end)) {
      const path = [];

      while (curr) {
        path.unshift(curr);
        curr = parent[curr];
      }
      console.log("Path is", path.join(" | "));
      return path;
    };
    if (curr in graph) {
      for (arr of graph[curr]) {
        if (!(arr in parent)) {
          parent[arr] = curr;
          queue.push(arr);
        }
      }
    }
  }
}

// Example
knightMoves([3, 3], [4, 3]);