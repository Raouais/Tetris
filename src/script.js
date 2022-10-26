// import "babel-polyfill"; 
import {Tetris} from "./Tetris.js"
window.onload = () => {


    Tetris.init();
    document.onkeydown = e =>{

        let newDirection;
        const key = e.keyCode;
        if(Tetris.pieceFormatIterator == 4)
            Tetris.pieceFormatIterator = 0

        switch(key){
            case 37:
                newDirection = "left";
                Tetris.piece.setDirection(newDirection);
                Tetris.leftSidePieceTouchedMainBlock();
            break;
            case 38:
                newDirection = "up";
                Tetris.piece.setDirection(newDirection);
            break;
            case 39:
                newDirection = "right";
                Tetris.piece.setDirection(newDirection);
                Tetris.rightSidePieceTouchedMainBlock();
            break;
            case 40:
                newDirection = "down";
                Tetris.piece.setDirection(newDirection);
                Tetris.downSidePieceTouchedMainBlock();
            break;
            case 13:
                location.reload();
                Tetris.refreshCanvas();
            break;
            case 32:
                Tetris.pieceFormatIterator++;
                Tetris.piece.setPieceFormat(Tetris.pieceFormatIterator);
                Tetris.collision();
           break;
        }
    }

}