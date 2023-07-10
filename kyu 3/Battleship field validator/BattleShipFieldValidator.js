// Initialize the EXPECTED_HITS constant with the total number of cells that should be occupied by ships on the battleship board.
const EXPECTED_HITS = 20;

// Define the different types of ships that should be present on the board. The keys represent the size of the ship. Each object contains 'count' (how many of that ship type should exist) and 'name' (the name of the ship type).
const SHIP_TYPES = {
  4: { count: 1, name: 'battleship' },
  3: { count: 2, name: 'cruiser' },
  2: { count: 3, name: 'destroyer' },
  1: { count: 4, name: 'submarine' },
};

// Define a function to check whether the placement of ships on the board is valid. The placement is invalid if any ship parts are diagonally adjacent to each other.
function isValidPlacement(hitCoords) {
  // Create a Set to store unique hit coordinates.
  // Each coordinate is converted to a string of format 'x,y'.
  const coordSet = new Set(hitCoords.map(coord => `${coord.x},${coord.y}`));

  // Iterate over each coordinate in hitCoords to verify if there are diagonally adjacent hits.
  for (let cur of hitCoords) {
    // Define the diagonal coordinates from the current coordinate.
    const diagonals = [
      { x: cur.x + 1, y: cur.y - 1 },
      { x: cur.x + 1, y: cur.y + 1 },
    ];

    // If any of the diagonal positions contain a hit, return false (placement is invalid).
    if (diagonals.some(pos => coordSet.has(`${pos.x},${pos.y}`))) {
      return false;
    }
  }

  // If no diagonally adjacent hits are found, the placement is valid. Return true.
  return true;
}

// Define the main validation function. This function takes a 'field' parameter which represents the 10x10 battleship board.
function validateBattlefield(field) {
  // Check if the field is a 10x10 array, if it isn't, return false and log an error.
  if (!Array.isArray(field) || field.length !== 10 || field.some(row => !Array.isArray(row) || row.length !== 10)) {
    console.log("Field must be a 10x10 array");
    return false;
  }

  // Convert the field array into an array of hit coordinates. Each hit coordinate is represented as an object { x: i, y: j }.
  let hitCoords = field.flatMap((row, i) =>
    row.reduce((hits, point, j) => point ? [...hits, { x: i, y: j }] : hits, [])
  );

  // Check if the total number of hits is equal to EXPECTED_HITS. If not, log an error and return false.
  if (hitCoords.length !== EXPECTED_HITS) {
    console.log(`Wrong number of hits: expected ${EXPECTED_HITS}, got ${hitCoords.length}`);
    return false;
  }

  // Check if the placement of hits on the board is valid using the isValidPlacement function. If not, log an error and return false.
  if (!isValidPlacement(hitCoords)) {
    console.log("Invalid placement: ships cannot be placed diagonally adjacent to each other");
    return false;
  }

  // Initialize a 'ships' object with the values from SHIP_TYPES to keep track of the count of each ship type that we find on the board.
  const ships = { ...SHIP_TYPES };

  // Main loop to go through each hit coordinate and categorize them into individual ships.
  while (hitCoords.length) {
    // Start a new ship with the first hit coordinate from hitCoords.
    let shipCoords = [hitCoords[0]];
    // Remove the first hit coordinate from hitCoords.
    hitCoords = hitCoords.slice(1);

    // Check for more adjacent hit coordinates to add to the current ship.
    let hasMatch = true;
    while (hasMatch) {
      hasMatch = false;

      // Iterate over each coordinate in hitCoords.
      for (let i = 0; i < hitCoords.length; i++) {
        let last = shipCoords[shipCoords.length - 1]; // The last coordinate added to the current ship.
        let current = hitCoords[i]; // The current coordinate from hitCoords.

        // If the current coordinate is adjacent to the last coordinate in the ship, add it to the current ship and remove it from hitCoords.
        if (
          (current.x === last.x && Math.abs(current.y - last.y) === 1) ||
          (current.y === last.y && Math.abs(current.x - last.x) === 1)
        ) {
          shipCoords.push(current);
          hitCoords.splice(i, 1);
          hasMatch = true;
          break;
        }
      }
    }

    // After all adjacent coordinates are added to the ship, check if the size of the ship is valid (between 1 and 4).
    let shipSize = shipCoords.length;
    if (shipSize < 1 || shipSize > 4) {
      console.log(`Invalid ship size: got ${shipSize}`);
      return false;
    }

    // If the ship size is valid, decrement the count of that ship size in the 'ships' object.
    ships[shipSize].count--;
  }

  // After processing all the hits, check if all the ships were found. If not, log an error and return false.
  if (!Object.values(ships).every(({ count }) => count === 0)) {
    console.log("Invalid ship counts");
    return false;
  }

  // If all validations have passed, return true.
  return true;
}
