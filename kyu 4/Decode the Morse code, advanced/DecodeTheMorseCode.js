const decodeBits = (bits) => {
    // Remove leading and trailing zeros
    bits = bits.replace(/^0+|0+$/g, '');

    // Find the length of the shortest sequence of 1s or 0s
    const timeUnitLength = bits.match(/0+|1+/g)
                               .reduce((min, str) => Math.min(min, str.length), bits.length);

    // Create the conversion map
    const conversionMap = [
        {code: `1{${3*timeUnitLength}}`, value: '-'},
        {code: `1{${timeUnitLength}}`, value: '.'},
        {code: `0{${7*timeUnitLength}}`, value: '   '},
        {code: `0{${3*timeUnitLength}}`, value: ' '},
        {code: `0{${timeUnitLength}}`, value: ''}
    ];

    // Initialize the output string
    let morseCode = bits;

    // Replace the patterns in the input string with Morse code
    conversionMap.forEach(({code, value}) => {
        const regex = new RegExp(code, 'g');
        morseCode = morseCode.replace(regex, value);
    });

    return morseCode;
};



const decodeMorse = (morseCode) => {
    // Trim leading/trailing spaces, split into words, and decode each word
    return morseCode.trim().split('   ').reduce((message, word) => {
        // Split word into characters and decode each character
        let decodedWord = word.split(' ').reduce((decodedWord, character) => {
            // Add the decoded character to the decoded word
            return decodedWord + MORSE_CODE[character];
        }, '');

        // Add the decoded word (plus a space) to the message
        return message + decodedWord + ' ';
    }, '').trim();
};
