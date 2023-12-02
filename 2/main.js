const f = require('fs');
let file = './2/data.txt';

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const data = f.readFileSync(file, 'utf8');
const dataArray = data.split("\r\n");

function cleanString(text){
    let textClean = text.trim();

    return textClean;
}

function processColors(colorLine){
    const setsOfCubes = colorLine.split(";");
    const setsArray = [];

    for(const sets of setsOfCubes){
        const colors = sets.split(", ");
        const auxSet = {R: 0, G: 0, B: 0}

        for( const color of colors ){
            let cleanedColor = cleanString(color);

            if( cleanedColor.includes("red") ){
                auxSet.R = Number(cleanedColor.split(" ")[0]);
            }else if( cleanedColor.includes("blue") ){
                auxSet.B = Number(cleanedColor.split(" ")[0]);
            }else if( cleanedColor.includes("green") ){
                auxSet.G = Number(cleanedColor.split(" ")[0]);
            }
        }

        setsArray.push(auxSet);
    }

    return setsArray;
}

function checkValidGame(colorsSets){
    for(const color of colorsSets){
        if( color.R > RED_CUBES ){
            return false;
        }

        if( color.G > GREEN_CUBES ){
            return false;
        }

        if( color.B > BLUE_CUBES ){
            return false;
        }
    }

    return true;
}

function maxColorsPerGame(colorsSets){
    let maxR = 0;
    let maxG = 0;
    let maxB = 0;

    for(const color of colorsSets){
        if( color.R > maxR ){
            maxR = color.R;
        }

        if( color.G > maxG ){
            maxG = color.G;
        }

        if( color.B > maxB ){
            maxB = color.B;
        }
    }

    return {
        maxR,
        maxG,
        maxB
    }
}

function colorPower(maxR, maxG, maxB){
    return maxR*maxG*maxB;
}

const games = [];
for(const line of dataArray){
    const game = {};
    game.name = line.split(": ")[0];
    game.colors = processColors(line.split(": ")[1]);
    game.id = Number(game.name.split(" ")[1]);
    game.isValid = checkValidGame( game.colors );
    const auxColors = maxColorsPerGame( game.colors );
    game.maxR = auxColors.maxR;
    game.maxG = auxColors.maxG;
    game.maxB = auxColors.maxB;

    game.colorPower = colorPower(game.maxR, game.maxG, game.maxB);

    games.push(game);
}

// Valid game sum
let sum = 0;
for( const game of games ){
    if( game.isValid ){
        sum += game.id;
    }
}

// COLOR Power
let sumPower = 0;
for( const game of games ){
    sumPower += game.colorPower;
}

console.log(sumPower);