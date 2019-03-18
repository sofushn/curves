export class Player 
{
    Line: [number, number][] = [];
    PressingRight: boolean = false;
    PressingLeft: boolean = false;
    
    Speed: number = 1;
    TurnSpeed: number = 2.5;
    LineWidth: number = 8;

    constructor(x: number, y: number){
        // Add start position to line
        this.Line.push([x,y]);
        this.Line.push([x + this.Speed, y + this.Speed])
    }

    UpdatePosition(): [number, number] 
    {
        let turnAngle: number;

        // find angle from how fast the player turns 
        if(this.PressingLeft == this.PressingRight)
            turnAngle = 0;
        else if(this.PressingLeft)
            turnAngle = -this.TurnSpeed* Math.PI / 180
        else if (this.PressingRight)
            turnAngle = this.TurnSpeed* Math.PI / 180
        
        // get previous 2 points
        let pointA = this.Line[this.Line.length - 1];
        let pointB = this.Line[this.Line.length - 2];

        // find the vector from last two points  
        let vectorX: number = pointA[0] - pointB[0];
        let vectorY: number = pointA[1] - pointB[1];

        // rotate vector 
        let rotatedVectorX: number = vectorX * Math.cos(turnAngle) - vectorY * Math.sin(turnAngle);
        let rotatedVectorY: number = vectorX * Math.sin(turnAngle) + vectorY * Math.cos(turnAngle);

        // find new position
        let new_x: number = pointA[0] + rotatedVectorX;
        let new_y: number = pointA[1] + rotatedVectorY;
        
        let newPosition: [number, number] = [new_x, new_y];

        //adds new position to line and return it
        this.Line.push(newPosition);
        return newPosition;
    }
}