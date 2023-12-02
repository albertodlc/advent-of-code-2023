const f = require('fs');
let file = './1/data.txt';

let sum = 0;
let jsonData = [];
let counter = 1;

function convertSpelledToDigits(line){    
    const spelledValues = new Map([
        ['oneight', '18'],
        ['eightwo', '82'],
        ['eighthree', '83'],
        ['sevenine', '79'],
        ['twone', '21'],
        ['one', '1'],
        ['two', '2'], 
        ['three', '3'], 
        ['four', '4'], 
        ['five', '5'], 
        ['six', '6'], 
        ['seven', '7'],
        ['eight', '8'],
        ['nine', '9']
    ]);

    for(const element of spelledValues.entries()){
        if( line.includes(element[0]) ){
            line = line.replaceAll(element[0], element[1]);
        }
    }

    return line;
}

function flattenDigitArray(digitsArray){
    const auxArray = [];

    for(const element of digitsArray) {            
        const aux = element.split("");

        auxArray.push( aux );
    }

    return auxArray.flat();
}

try {
    const data = f.readFileSync(file, 'utf8');
    const dataArray = data.split("\r\n");

    for(const text of dataArray){
        const currentLine = {
            counter: counter++,
            initialText: text,
            spelledText: convertSpelledToDigits(text),
            currentSum: 0
        };
    
        currentLine.digitsArray = currentLine.spelledText.match(/\d+/g)
        currentLine.flattenedDigitsArray = flattenDigitArray(currentLine.digitsArray);
    
        if( currentLine.flattenedDigitsArray.length === 1 ){
            currentLine.finalNum = Number(currentLine.flattenedDigitsArray[0] + currentLine.flattenedDigitsArray[0]);
        }
    
        if( currentLine.flattenedDigitsArray.length > 1 ){
            currentLine.finalNum = Number(currentLine.flattenedDigitsArray[0] + currentLine.flattenedDigitsArray[currentLine.flattenedDigitsArray.length - 1]);
        }
    
        jsonData.push(currentLine);
    }
} catch (err) {
    console.error(err);
}

// SUMA
for(const num of jsonData){
    sum += num.finalNum;
}

console.log(sum);

f.writeFile("./1/output.json", JSON.stringify(jsonData), function(err) {
    if (err) {
        console.log(err);
    }
});
