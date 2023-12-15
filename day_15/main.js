import { readFile } from "../general/fileReader.js";

const pathFile = './day_15/data.txt';

function hashAlgorithm({ characters }){
    let currentValue = 0;

    for( const character of characters.split('') ){
        // Get ASCII code
        const asciiCode = character.charCodeAt(0);
        // Increment current Value by ASCII Code
        currentValue += asciiCode;
        // Set the current value to itself multiplied by 17
        currentValue *= 17;
        // Set the current value to the remainder of dividing itself by 256
        currentValue %= 256;

    }

    console.log(currentValue);

    return currentValue;
}

// !Process data (clean and format)
const rawLines = readFile({pathFile: pathFile, byLine: true });
const splittedLines = [];

for( const line of rawLines ){
    splittedLines.push( ...line.split(',') );
}

let sum = 0;
for( const splittedLine of splittedLines ){
    sum += hashAlgorithm( {characters : splittedLine} );
}

console.log(sum);
