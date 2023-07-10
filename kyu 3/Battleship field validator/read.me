# Battleship Board Validator

## Overview

This kata is a board validator for the classic naval combat game known as Battleship. It has been designed with a focus on the Soviet/Russian version of the game. The program receives a Battleship game board as a 10x10 two-dimensional array. Each cell of the array represents a spot on the game board, with '0' symbolizing a free spot and '1' representing a spot occupied by a part of a ship.

This software aims to verify whether the game board respects the game rules, returning `true` if the board is correctly set up and `false` otherwise.

## Time: 844ms

## Rules of the game

The following are the Battleship board setup rules as per the Soviet/Russian version:

1. **Ship types and quantities**: The board must contain:
    - One Battleship (4 cells)
    - Two Cruisers (3 cells each)
    - Three Destroyers (2 cells each)
    - Four Submarines (1 cell each)

2. **Linearity of Ships**: Except for Submarines, all ships must occupy a straight line of cells, either vertically or horizontally.

3. **Ship Placement**: Ships must not overlap or touch each other, neither by the edge nor by the corner. In other words, no two ships should have any cells adjacent to each other.

## Code Design

The code is flexible and can be easily adjusted for different versions of the game. For instance, the `SHIP_TYPES` constant, which defines the types and quantities of ships, can be modified to accommodate the ship configuration of other Battleship game variations.

## Validation Process

The validation process is performed in a sequence of stages:

1. **Input Validation**: The software first verifies if the input is a valid 10x10 two-dimensional array. It returns `false` and logs an error message if the input doesn't comply with these requirements.

2. **Total Occupied Cells Validation**: The software counts the number of cells occupied by the ships (`hitCoords`). If the total count is different from the expected count (`EXPECTED_HITS`), it's an incorrect setup. The program logs the error and returns `false`.

3. **Ship Placement Validation**: The validator checks if any two parts of a ship are placed diagonally adjacent to each other. If it finds any such placements, it returns `false` as this would indicate an incorrect setup as per the game rules.

4. **Ship Size and Count Validation**: In the final stage, the software verifies the size and count of each ship on the board. It starts by checking one occupied cell and finds all its adjacent occupied cells to form a ship. This process repeats until all occupied cells are checked. If a ship is identified with less than 1 or more than 4 cells, it is not a valid size and the function returns `false`. Once all the ships are identified, the software checks the quantity of each ship type to make sure it matches the expected counts.

If the board passes all these validation stages, the function returns `true`, confirming the setup is correct as per the game rules.

## Using the Validator

To use this validator, import the `validateBattlefield` function from this module and call it with the game board you wish to validate. The game board must be a 10x10 two-dimensional array, following the conventions mentioned above. 

Here's an example:

```javascript
const board = [
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

console.log(validateBattlefield(board)); // This should return either `true` or `false`.

