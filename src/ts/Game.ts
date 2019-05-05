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

    IsColidingWithWall(player: Player): boolean {
        let newestPoint = player.LatestMove.B;
        if(newestPoint[0] < 0 || newestPoint[1] < 0 || newestPoint[0] > this.Map.width || newestPoint[1] > this.Map.height)
            return true;
        else
            return false;
    }
    IsColidingWithPlayer(player: Player): boolean {
        return this.MapContext.isPointInStroke(player.Line, player.LatestMove.B[0], player.LatestMove.B[1])
    }

    StartGame(): void
    {
        // create and start player in map center
        let mapcenter: number = this.Map.width / 2;
        this.Player = new Player(mapcenter, mapcenter);
        
        // move player to center of map when game starts
        let playerPosition: [number, number] = this.Player.LatestMove.B;
        this.MapContext.moveTo(playerPosition[0], playerPosition[1]);

        // game clock runs at 60 ticks per second
        let intervalId: number = setInterval(() => {
            let newPostion: [number, number] = this.Player.UpdatePosition();

            this.RenderPlayer(newPostion);

            // end game if player is coliding with wall 
            if(this.IsColidingWithPlayer(this.Player) || this.IsColidingWithWall(this.Player))
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