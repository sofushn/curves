import { Player } from './Player'
export class Game 
{
    Map: HTMLCanvasElement;
    private MapContext: CanvasRenderingContext2D;
    Player: Player;

    constructor(map: HTMLCanvasElement){
        this.Map = map;
        this.MapContext = map.getContext('2d');
        this.MapContext.lineCap = "round";
    }

    IsColidedWithWall(player: Player): boolean {
        let newestPoint = player.Line[player.Line.length - 1];
        if(newestPoint[0] < 0 || newestPoint[1] < 0 || newestPoint[0] > this.Map.width || newestPoint[1] > this.Map.height)
            return true;
        else
            return false;
    }

    StartGame(): void
    {
        // create and start player in map center
        let mapcenter: number = this.Map.width / 2;
        this.Player = new Player(mapcenter, mapcenter);
        
        // move player to center of map when game starts
        let playerPosition: [number, number] = this.Player.Line[this.Player.Line.length -1];
        this.MapContext.moveTo(playerPosition[0], playerPosition[1]);

        // game clock runs at 60 ticks per second
        let intervalId: number = setInterval(() => {
            let newPostion: [number, number] = this.Player.UpdatePosition();

            this.RenderPlayer(newPostion);

            // end game if player is coliding with wall 
            if(this.IsColidedWithWall(this.Player))
            {
                clearInterval(intervalId);
                this.EndGame();
            }
        }, 1000 / 60);                       
    }

    EndGame(): void
    {
        this.MapContext.textAlign = 'center';       
        this.MapContext.fillStyle = '#757575';
        this.MapContext.font = 'bold 100px Arial';
        this.MapContext.fillText('Game has ended', this.Map.width / 2, 200);
    }

    RenderPlayer(newPostion: [number, number]): void 
    {  
        this.MapContext.lineTo(newPostion[0], newPostion[1]);
        this.MapContext.lineWidth = this.Player.LineWidth;
        this.MapContext.stroke();
    }
}