export default class Drawing{

    static drawPiece(ctx,color,piece,blocksize){
        ctx.save();
        ctx.fillStyle = color;
        for(let block of piece){
            const [x,y] = block.slice();
            ctx.fillRect(x*blocksize,y*blocksize,blocksize-2,blocksize-2);
            }
        ctx.restore();
    }
    static drawPieceInBox(ctx,pieceX,pieceY,blocksize,color){
        ctx.save();
        let c = 0;
        for(let i = 0; i < pieceY.length; i++){
            if(i % 4 == 0 && i > 0)    
                 c++;
            ctx.fillStyle = color[c];
            ctx.fillRect(pieceX[i]*blocksize,pieceY[i]*blocksize,blocksize-2,blocksize-2);
        }
        ctx.restore();
    }
    static nextPiece(newClass){
        const element = document.getElementById("nextPiece");
        element.className = newClass;
    }
    static drawLineAnimation(ctx,bodyY,bodyX,blocksize){
        ctx.save();
        ctx.fillStyle = "#ccccb3";
        ctx.fillRect(bodyX*blocksize,bodyY*blocksize,blocksize-2,blocksize-2);
        ctx.restore();
    }
}