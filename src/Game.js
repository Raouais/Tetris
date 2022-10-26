import Piece from "./Piece.js";
import Drawing from "./Drawing.js";
import GameOver from "./GameOver.js";
export default class Game {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 325;
        this.canvas.height = 500;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.blockzise = 25 ;
        this.delay = 100;
        this.timeOut;
        this.body; 
        this.piece;
        this.nextPiece;
        this.nextColor;
        this.newDirection = "";
        this.advenceFrequency = 0;
        this.floorTouched = false;
        this.pieces = ["hat","bar","el","elUpside","es","esUpside","square"];
        this.pieceColor = ["#b30000","#009900","#000000","#e6b800","#008ae6","#e65c00","#cc0052"]
        this.boxColor = [];
        this.setTime;
        this.mainBlocX = [];
        this.mainBlocY = [];
        this.lines = 0;
        this.score = 0;
        this.level = 0;
        this.pieceFormatIterator = 0;
        this.next = ["el","bar"];
    }

    init(){
        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        this.canvas.style.border = "5px solid green";   
        document.body.appendChild(this.canvas); 
        this.drawPieces();
        this.refreshCanvas();
    }
    randNextPiece(){
        let random = this.getRandomInt(0,this.pieces.length);
        this.nextPiece = this.pieces[random];
        this.next[1] = this.next[0];
        this.next[0] = this.nextPiece;
    }
    drawPieces(){
        this.randNextPiece();
        this.nextColor = this.pieceColor[this.pieces.indexOf(this.next[1])];
        this.body = this.setName(this.next[1]);
        this.piece = new Piece(this.ctx,this.body,this.blockzise,this.next[1]);
        Drawing.nextPiece(this.next[0]);
        this.floorTouched = false;
        this.advenceFrequency = 0;
        this.pieceFormatIterator = 0;
    }
    setName(value){
        let body;
        switch (value) {
            case "hat":
                body = [[5,1],[6,1],[7,1],[6,0]];
                break;
            case "bar":
                body = [[5,0],[6,0],[7,0],[8,0]];
                break;
            case "el":
                body = [[6,0],[6,1],[6,2],[7,2]];
                break;
            case "elUpside":
                body = [[6,2],[6,1],[6,0],[7,0]]
                break;
            case "es":
                body = [[5,0],[6,0],[6,1],[7,1]];
                break;
            case "esUpside":
                 body = [[7,0],[6,0],[6,1],[5,1]];
                break;
            case "square":
                body = [[6,0],[7,0],[6,1],[7,1]];
                break;
        
            default:
                break;
        }
        return body;
    }
    changePiece(){
        if(this.level > 0){
            this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            this.drawPieces();
        }
        this.level = 0;
    }
    refreshCanvas(){
        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        Drawing.drawPieceInBox(this.ctx,this.mainBlocX,this.mainBlocY,this.blockzise,this.boxColor);
        Drawing.drawPiece(this.ctx,this.nextColor,this.piece.body,this.blockzise); 
        this.advenceFrequency++;
        document.getElementById('level').innerHTML = this.level;
        if(this.advenceFrequency % 5 == 0)
            this.advencePiece();
        if(!this.gameOver()){
            this.timeOut = setTimeout(this.refreshCanvas.bind(this),this.delay); 
        } else {
            GameOver.gameOverAfficher(this.ctx);
        }
        if(this.isFloorTouched() || this.isPieceMainBlockTouched()){
            this.piecesInsideBox(); 
            this.drawPieces();
            for(let i = 0; i < this.blockzise; i++)
                this.clearFullLines(i);
            this.addScore(this.lines);
            this.lines = 0;
        }

    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    advencePiece(){
        for(let i = 0; i < this.body.length; i++)
            this.body[i][1]++;
    } 
    isFloorTouched(){
        let touched = false;
        const floor = this.ctx.canvas.height/this.blockzise;
        for(let k = 0; k < this.body.length ; k++){
            if(this.body[k][1] >= floor)
                touched = true;
        }
        return touched;
    }
    isPieceMainBlockTouched(){
        let j;
        let touched = false;

        if(this.body.length > this.mainBlocX.length)
            j = this.body.length;
        else
            j = this.mainBlocX.length;

        for(let i = 0; i < j; i++)
            for(let k = 0; k < 4 ; k++)
                if(this.mainBlocX[i] == this.body[k][0] && this.mainBlocY[i] == this.body[k][1])
                    touched = true;

        return touched;
    }
    piecesInsideBox(){
        let i = 0;
        while(i < this.body.length){
            this.mainBlocX.push(this.body[i][0]); 
            this.mainBlocY.push(this.body[i][1]-1);
            i++;
        }
        this.boxColor.push(this.nextColor);
        this.i++;
    }
    gameOver(){
        const upBox = -1;
        for(let i = 0; i < this.mainBlocY.length; i++)
            if(this.mainBlocY[i] == upBox){
                clearTimeout(this.timeOut);
                return true;
            }
        return false;
    }
    clearFullLines(line){
        let nLines = 0;
        let lineClear = false;
        //D'abord je compte combien de fois l'axe des Y contient plus de 12 fois le même chiffre 
        for(let i = 0; i < this.mainBlocX.length ; i++)
            if(this.mainBlocY[i] == line)
                nLines++;

        //Ensuite s'il y a plus de n fois des chiffre répétés 12 fois je les effacent
        for(let i = 0; i < this.mainBlocX.length && nLines % (this.canvasWidth/this.blockzise) == 0; i++){
            if(this.mainBlocY[i] == line){
                Drawing.drawLineAnimation(this.ctx,this.mainBlocY[i],this.mainBlocX[i],this.blockzise);
                this.mainBlocY[i] = -1;
                window.set
                lineClear = true;
            }
        }
        if(lineClear){
            this.lines++;
            this.levelFunc();
        }
        //Enfin je descend les autres block de n cases vers le bas
        for(let j = 0; j < nLines / (this.canvasWidth/this.blockzise); j++)
            for(let i = 0; i < this.mainBlocX.length && lineClear; i++)
                if(this.mainBlocY[i] != -1 && this.mainBlocY[i] < line)
                   this.mainBlocY[i]++;
    }
    addScore(lines){
        let element = document.getElementById('score');
        
        switch(lines){
            case 1:
                this.score += 30;
            break;
            case 2:
                this.score += 90;
            break;
            case 3:
                this.score += 180;
            break;
            case 4:
                this.score += 360;
            break;
        }
        element.innerHTML = this.score;
    }
    leftSidePieceTouchedMainBlock(){
        for(let i = 0; i < this.mainBlocY.length && this.mainBlocX.length >= 4; i++) 
            for(let j = 0; j < this.body.length; j++)
                if(this.body[j][0] == this.mainBlocX[i] && this.body[j][1] == this.mainBlocY[i])
                    this.piece.setDirection("right");
    }
    rightSidePieceTouchedMainBlock(){
        for(let i = 0; i < this.mainBlocY.length && this.mainBlocX.length >= 4; i++) 
            for(let j = 0; j < this.body.length; j++)
                if(this.body[j][0] == this.mainBlocX[i] && this.body[j][1] == this.mainBlocY[i])
                    this.piece.setDirection("left");
    }
    downSidePieceTouchedMainBlock(){
        for(let i = 0; i < this.mainBlocY.length && this.mainBlocX.length >= 4; i++) 
            for(let j = 0; j < this.body.length; j++)
                if(this.body[j][0] == this.mainBlocX[i] && this.body[j][1] == this.mainBlocY[i])
                    this.piece.setDirection("Upp");
    }
    sidePieceTouchedMainBlock(){
        for(let i = 0; i < this.mainBlocY.length && this.mainBlocX.length >= 4; i++) 
            for(let j = 0; j < this.body.length; j++)
                if(this.body[j][0] == this.mainBlocX[i] && this.body[j][1] == this.mainBlocY[i])
                    this.piece.wallTouched(this.body,this.mainBlocY,this.mainBlocX);
    }
    collision(){
        for(let i = 0; i < this.mainBlocY.length && this.mainBlocX.length >= 4; i++) 
            for(let j = 0; j < this.body.length; j++)
                if(this.body[j][0] == this.mainBlocX[i] && this.body[j][1] == this.mainBlocY[i]){}
                    
                    
    }
    levelFunc(){
        let element = document.getElementById('level');
        if(this.score % 60 == 0 && element.innerHTML < this.score)
            this.level = 1;
        element.innerHTML = this.level;
    }
}