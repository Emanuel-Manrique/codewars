const getPINs = observed => {
    const adjacent = {
        '0': ['0', '8'],
        '1': ['1', '2', '4'],
        '2': ['1', '2', '3', '5'],
        '3': ['2', '3', '6'],
        '4': ['1', '4', '5', '7'],
        '5': ['2', '4', '5', '6', '8'],
        '6': ['3', '5', '6', '9'],
        '7': ['4', '7', '8'],
        '8': ['0', '5', '7', '8', '9'],
        '9': ['6', '8', '9'],
    };

    // Base case: if observed pin is one digit, return its variations
    if (observed.length === 1) return adjacent[observed];

    // Split the observed pin into the first digit and the remaining digits
    const [firstDigit, ...remainingDigits] = observed;

    // Use flatMap to simplify nested looping. For each variation of the first digit,
    // recursively call getPINs on the remaining digits and join the results.
    return adjacent[firstDigit].flatMap(variation => getPINs(remainingDigits.join('')).map(combination => variation + combination));
};
