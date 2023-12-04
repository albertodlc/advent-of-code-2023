import f from "fs";

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function readFile({ pathFile, byLine = false }){
    if( byLine ){
        return f.readFileSync(pathFile, 'utf8').split("\n");
    }

    return f.readFileSync(pathFile, 'utf8');
}

export function parseSchematicNumbers({ pathFile }){
    function isNextCharacterValid( columns, currentDigitPosition ){
        // Valid position
        if( currentDigitPosition + 1 >= rows[x].split("").length ){
            return false;
        }

        // Next character is a digit
        return DIGITS.includes(columns[currentDigitPosition + 1]);
    }

    const rows = readFile( { pathFile: pathFile, byLine: true } );
    const MAX_ROWS = rows.length;

    const schematicNumber = {
        number : ""
    };

    for( let x = 0; x < MAX_ROWS; x++ ){


        const columns = rows[x].split("");

        let currentDigit = "";
        for( let y = 0; y < rows[x].split("").length; y++ ){
            // Current is valid
            if( DIGITS.includes(columns[y]) ){
                currentDigit += columns[y];
            }

            // Next NOT valid, assign to object & Reset aux variable
            if( !isNextCharacterValid( columns, y ) ){
                schematicNumber.number = currentDigit;

                currentDigit = "";
            }
        }
    }
}



