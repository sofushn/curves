export class Vector {
    //First point
    A: [number, number];
    //Second second
    B: [number, number];

    constructor(a: [number, number], b: [number, number]){
        this.A = a
        this.B = b
    }

    //Updates vector to a new postion 
    UpdateVector(A: [number, number]): void
    UpdateVector(x: number, y: number): void
    UpdateVector(anyOptional: any, optional?: number): void{
        // Moves point b to point a
        this.A = this.B

        // Set point B to new coordiantes
        if(anyOptional instanceof Array) {
            this.B = <[number, number]>anyOptional
        }
        else this.B = [anyOptional, optional]
    }
}