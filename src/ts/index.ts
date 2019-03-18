import { Game } from './Game'

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game-canvas');

canvas.height = 1000;
canvas.width = 1000;

let game: Game = new Game(canvas);

document.addEventListener('keydown', function(event: KeyboardEvent){
    // 37 = left arrow
    // 39 = right arrow
    if(event.keyCode == 37)
        game.Player.PressingLeft = true;
    if(event.keyCode == 39)
        game.Player.PressingRight = true;
});
        
document.addEventListener('keyup', function(event: KeyboardEvent){
    // 37 = left arrow
    // 39 = right arrow
    if(event.keyCode == 37)
        game.Player.PressingLeft = false;
    if(event.keyCode == 39)
        game.Player.PressingRight = false;
});

// Starts the game
game.StartGame();