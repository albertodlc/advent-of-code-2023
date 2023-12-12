export default class Card{

    #formatNumberArray( arrayOfNums ){
        const formattedArray = [];

        for( const num of arrayOfNums ){
            if( num?.length > 0 ){
                formattedArray.push( num.trim() );
            }
        }

        return formattedArray;
    }

    constructor(cardLine){
        this.cardId = cardLine.split(': ')[0];
        
        let numbersRaw = cardLine.split(': ')[1].trim();
        let winningNumbersRaw = numbersRaw.split(' | ')[0].trim();
        let userNumbersRaw = numbersRaw.split(' | ')[1].trim();
        this.winningNumbers = this.#formatNumberArray( winningNumbersRaw.split(' ') );
        this.userNumbers = this.#formatNumberArray( userNumbersRaw.split(' ') );
    }

    checkCardValue(){
        let power = -1;

        for( const winningNumber of this.winningNumbers){
            if( this.userNumbers.includes( winningNumber ) ){
                power++;
            }
        }

        return power >= 0 ? Math.pow(2, power) : 0;
    }

    checkNumberOfMatchingCards(){
        let cards = 0;

        for( const winningNumber of this.winningNumbers){
            if( this.userNumbers.includes( winningNumber ) ){
                cards++;
            }
        }

        return cards;
    }
}