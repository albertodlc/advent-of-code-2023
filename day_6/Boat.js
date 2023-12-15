export default class Boat{
    constructor(buttonHoldTime){
        this.boatSpeed = buttonHoldTime;
    }

    traveledDistance(availableTime){
        return availableTime*this.boatSpeed;
    }

    isValidDistance(recordDistance, availableTime){
        return this.traveledDistance(availableTime) > recordDistance;
    }
}