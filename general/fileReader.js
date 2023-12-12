import f from "fs";

const DIGITS = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function readFile({ pathFile, byLine = false }){
    if( byLine ){
        return f.readFileSync(pathFile, 'utf8').split("\n");
    }

    return f.readFileSync(pathFile, 'utf8');
}

export function parseSchematicNumbers({ pathFile }){
    function isNextCharacterValid( columns, currentDigitPosition ){
        // Valid position
        if( currentDigitPosition + 1 >= columns.length ){
            return false;
        }

        // Next character is a digit
        return DIGITS.includes(columns[currentDigitPosition + 1]);
    }

    const rows = readFile( { pathFile: pathFile, byLine: true } );
    const MAX_ROWS = rows.length;

    const schematicNumbers = [];

    for( let x = 0; x < MAX_ROWS; x++ ){
        const columns = rows[x].split("");

        let currentDigit = "";
        const schematicNumber = {
            number : ""
        };

        for( let y = 0; y < columns.length; y++ ){
            // Current is valid, add to temp var
            let currentColumnValue = columns[y];
            if( DIGITS.includes(currentColumnValue) ){
                currentDigit += currentColumnValue;
            }

            // Next NOT valid, assign to object & Reset aux variable
            if( DIGITS.includes(currentColumnValue) && !isNextCharacterValid( columns, y ) ){
                schematicNumber.number = currentDigit;

                schematicNumbers.push(schematicNumber);
                currentDigit = "";
            }
        }
    }

    return schematicNumbers;
}



