export class Vector {
    A: [number, number];
    B: [number, number];

    constructor(a: [number, number], b: [number, number]){
        this.A = a
        this.B = b
    }

    UpdateVector(A: [number, number]): void
    UpdateVector(x: number, y: number): void
    UpdateVector(anyOptional: any, optional?: number): void{
        this.B = this.A
        if(anyOptional instanceof Array) {
            this.A = <[number, number]>anyOptional
        }
        else this.A = [anyOptional, optional]
    }
}