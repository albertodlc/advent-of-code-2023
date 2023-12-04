import { readFile } from "../general/fileReader.js";
let file = './day_3/data.txt';

for(const data of readFile( { pathFile: file, byLine: true } )){
    console.log(data);
}