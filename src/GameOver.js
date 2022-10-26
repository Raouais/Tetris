export default class GameOver{

    static gameOverAfficher(ctx){
        ctx.save();
        ctx.font = "bold 30px sans-serif";
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText("Game Over", 5, 35 );
        ctx.fillText("Game Over", 5, 35 );
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Enter pour rejouer", 5, 65);
        ctx.fillText("Enter pour rejouer", 5, 65);
        ctx.restore();
    }
}