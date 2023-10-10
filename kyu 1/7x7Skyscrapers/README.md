# Description: 

In a grid of 7 by 7 squares you want to place a skyscraper in each square with only some clues:
The height of the skyscrapers is between 1 and 7
No two skyscrapers in a row or column may have the same number of floors
A clue is the number of skyscrapers that you can see in a row or column from the outside
Higher skyscrapers block the view of lower skyscrapers located behind them
Can you write a program that can solve this puzzle in time?

This kata is based on 4 By 4 Skyscrapers and 6 By 6 Skyscrapers by FrankK. By now, examples should be superfluous; you should really solve Frank's kata first, and then probably optimise some more. A naive solution that solved a 4×4 puzzle within 12 seconds might need time somewhere beyond the Heat Death of the Universe for this size. It's quite bad.

## Task:
Create

function solvePuzzle(clues)

Clues are passed in as an Array(28) of integers.
The return value is an Array(7) of Array(7) of integers.
All puzzles have one possible solution.

# My opinion
I'm the first to complete this kyu with JS and upload it to GitHub. I'm a badass!
