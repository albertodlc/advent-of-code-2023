import { readFile } from "../general/fileReader.js";
import Boat from "../day_6/Boat.js";

const pathFile = './day_6/data.txt';

const rawLines = readFile({pathFile: pathFile, byLine: true });

function cleanDuplicatedSpaces(line){
    return line.replace( /  +/g, ' ' );
}

function calculatePosibilities(currentAvailableTime, currentRecordDistance ){

    let numOfWinningCasesCurrentRace = 0;
    // Check all cases for the available time
    for( let t = 0; t <= currentAvailableTime; t++ ){
        // Initialize boat for current case (t)
        const currentBoat = new Boat(t);
        
        if( currentBoat.isValidDistance(currentRecordDistance, currentAvailableTime - t) ){
            numOfWinningCasesCurrentRace++;
        }
    }
    
    return numOfWinningCasesCurrentRace;
}

let times = []
let distances = [];
for(let i = 0; i < rawLines.length; i++){
    // Times
    if(i === 0){
        times = cleanDuplicatedSpaces(rawLines[i]).split(' ').slice(1);
    }

    // Distance
    if( i === 1 ){
        distances = cleanDuplicatedSpaces(rawLines[i]).split(' ').slice(1);
    }
}

if( times.length !== distances.length ){
    throw new Error('Invalid File!');
}

// PART ONE
const numOfRaces = times.length;
let multipliedPossibilities = 1;
for( let i = 0; i < numOfRaces; i++ ){
    let currentAvailableTime = times[i];
    let currentRecordDistance = distances[i];

    multipliedPossibilities *= calculatePosibilities( currentAvailableTime, currentRecordDistance );
}

console.log(multipliedPossibilities);

// PART TWO
let singleTime = times.join('');
let singleDistance = distances.join('');

let singlePossibilities = calculatePosibilities( singleTime, singleDistance );

console.log(singlePossibilities);

