
import { readFile, parseSchematicNumbers } from "../general/fileReader.js";

const DIGITS = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function parseSymbolMap(pathFile){
    const rows = readFile( { pathFile: pathFile, byLine: true } );

    const matrix = [];

    for(const element of rows){
        const symbolColumns = [];
        for(let y = 0; y < element.split("").length; y++){
            if( !DIGITS.includes(element.split("")[y] ) ){
                symbolColumns.push(element.split("")[y]);
            }else{
                symbolColumns.push('.');
            }
        }

        matrix.push(symbolColumns);
    }

    return matrix;
}