const readLine = require('readline');
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

try {
    const data = f.readFileSync(file, 'utf8');
    const dataArray = data.split("\r\n");

    for(const text of dataArray){
        const currentLine = {
            counter: counter++,
            initialText: text
        };
    
        let spelledText = convertSpelledToDigits(text);
    
        currentLine.spelledText = spelledText;
    
        let digits = spelledText.match(/\d+/g);
    
        currentLine.digitsArray = digits;
        
        const auxArray = [];
        for(const element of digits) {            
            const aux = element.split("");
    
            auxArray.push(aux);
        }
    
        const flattenArray = auxArray.flat();
    
        currentLine.flattenedDigitsArray = flattenArray;
    
        let currentNum = null;
        if( flattenArray.length === 1 ){
            currentNum = flattenArray[0] + flattenArray[0];
            sum += Number(flattenArray[0] + flattenArray[0]);
        }
    
        if( flattenArray.length > 1 ){
            currentNum = flattenArray[0] + flattenArray[flattenArray.length - 1];
            sum += Number(flattenArray[0] + flattenArray[flattenArray.length - 1]);
        }
    
        currentLine.finalNum = currentNum;
        currentLine.currentSum = sum;
    
        jsonData.push(currentLine);
    }
} catch (err) {
    console.error(err);
}

f.writeFile("./1/output.json", JSON.stringify(jsonData), function(err) {
    if (err) {
        console.log(err);
    }
});
