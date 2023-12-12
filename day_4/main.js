import { readFile } from "../general/fileReader.js";
import Card from "./Card.js";

const pathFile = './day_4/data.txt';

export default function dayFour({ pathFile }){
    // !Process data (clean and format)
    const rawLines = readFile({pathFile: pathFile, byLine: true });

    // List of Cards
    const cards = [];
    for( const rawLine of rawLines ){
        cards.push( new Card(rawLine) );
    }

    // !Part 1

    // Get Total points
    let totalPoints = 0;
    for( const card of cards ){
        totalPoints += card.checkCardValue();
    }

    //console.log(totalPoints);

    // !Part 2
    const cardsDuplication = [];
    for( let i = 0; i < cards.length; i++ ){
        if( cards[i].checkNumberOfMatchingCards() > 1 ){
            console.log(cards[i].checkNumberOfMatchingCards());

            for( let x = 0; x <= cards[i].checkNumberOfMatchingCards(); x++ ){
                console.log( cards[i + x].cardId );
                cardsDuplication.push( cards[i + x] );
            }

            console.log();
        }else if( cards[i].checkNumberOfMatchingCards() === 1 ){

            console.log(cards[i].checkNumberOfMatchingCards());
            console.log( cards[i].cardId );

            cardsDuplication.push( cards[i] );
        }
    }

    console.log( cardsDuplication.length );

    return {
        totalPoints,
        totalCards : cardsDuplication.length
    }
}

dayFour({pathFile});