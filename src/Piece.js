import { Tetris } from "./Tetris";

export default class Piece{
    constructor(ctx,body,blocksize,name){
        this.name = name;
        this.body = body;
        this.blocksize = blocksize;
        this.ctx = ctx;
    }
    //précondition: newDirection est initialisé 
    //postcondition: mewDirection est inchangé 
    //résultat: la nouvelle direction du corp de la pièce 
    setDirection(newDirection){
        switch (newDirection) {
            case "left":
                for(let i = 0; i < this.body.length; i++){
                    this.body[i][0]--;
                }
                this.wallTouched(this.body);
            break;
            case "up":
                for(let i = 0; i < this.body.length; i++){
                    Tetris.changePiece();
                }
                this.wallTouched(this.body);
            break;
            case "right":
                for(let i = 0; i < this.body.length; i++){
                    this.body[i][0]++;
                }
                this.wallTouched(this.body);
            break;
            case "Upp":
                for(let i = 0; i < this.body.length; i++){
                    this.body[i][1]--;
                }
                this.wallTouched(this.body);
            break;
            case "down":
                for(let i = 0; i < this.body.length; i++){
                    this.body[i][1]++;
                }
                this.wallTouched(this.body);
            break;
        } 
    }
    wallTouched(body, wallLeft = 0, wallRight = this.ctx.canvas.width/this.blocksize-1){
        let throughFloorBoolean = false;
        const throughFloor = this.ctx.canvas.height/this.blocksize;
        
        for(let i = 0; i < this.body.length; i++){
            if(this.body[i][1] >= throughFloor)
                throughFloorBoolean = true;
        }
        do{
            for(let i = 0; i < this.body.length; i++)
                this.body[i][0]++;
        }while(body[0][0] <= wallLeft || body[1][0] <= wallLeft || body[2][0] <= wallLeft || body[3][0] <= wallLeft);

        do{
            for(let i = 0; i < this.body.length; i++)
                this.body[i][0]--;
        }while(body[0][0] > wallRight || body[1][0] > wallRight || body[2][0] > wallRight ||body[3][0] > wallRight);
        
        if(throughFloorBoolean)
            for(let i = 0; i < this.body.length; i++)
                this.body[i][1]--;
    }
    //précondition: newDirection est initialisé 
    //postcondition: mewDirection est inchangé 
    //résultat: la nouvelle direction du corp de la pièce 
    setPieceFormat(format){
        switch (this.name) {
            case "hat":
                this.setHatFormat(format);
                break;
            case "bar":
                this.setBarFormat(format);
                break;
            case "es":
                this.setEsFormat(format);
                break;
            case "esUpside":
                this.setEsUpFormat(format);
                break;
            case "el":
                this.setElFormat(format);
                break;
            case "elUpside":
                this.setElUpFormat(format);
                break;       
            default:
                break;
        }
        console.log(format)
    }
    setHatFormat(format){
        switch(format){
            case 1:
                this.body[0][0]++;
                this.body[0][1]--;
                this.body[2][0]--;
                this.body[2][1]++;
                this.body[3][0]++;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
            case 2:
                this.body[0][0]++;
                this.body[0][1]++;
                this.body[2][0]--;
                this.body[2][1]--;
                this.body[3][0]--;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
            case 3:
                this.body[0][0]--;
                this.body[0][1]++;
                this.body[2][0]++;
                this.body[2][1]--;
                this.body[3][0]--;
                this.body[3][1]--;
                this.wallTouched(this.body);
                break;
            case 4:
                this.body[0][0]--;
                this.body[0][1]--;
                this.body[2][0]++;
                this.body[2][1]++;
                this.body[3][0]++;
                this.body[3][1]--; 
                this.wallTouched(this.body); 
            break;
        }  
        
    }
    setBarFormat(format){
        switch(format){
            case 2:
            case 4:
                this.body[0][0]-=2;
                this.body[0][1]++;
                this.body[2][1]--;
                this.body[1][0]--;
                this.body[3][0]++;
                this.body[3][1]-=2;
                this.wallTouched(this.body);
            break;
            case 1: 
            case 3:
                this.body[0][0]+=2;
                this.body[0][1]--;
                this.body[1][0]++;
                this.body[2][1]++;
                this.body[3][0]--;
                this.body[3][1]+=2;
                this.wallTouched(this.body);
            break;
        } 
    }
    setElFormat(format){
        switch(format){
            case 1:
                this.body[0][0]+=2;
                this.body[0][1]+=2;
                this.body[1][0]++;
                this.body[1][1]++;
                this.body[3][0]--;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
            case 2:
                this.body[0][0]-=2;
                this.body[0][1]+=2;
                this.body[1][0]--;
                this.body[1][1]++;
                this.body[3][0]--;
                this.body[3][1]--;
                this.wallTouched(this.body);
                break;
            case 3:
                this.body[0][0]-=2;
                this.body[0][1]-=2;
                this.body[1][0]--;
                this.body[1][1]--;
                this.body[3][0]++;
                this.body[3][1]--;
                this.wallTouched(this.body);
                break;
            case 4:
                this.body[0][0]+=2;
                this.body[0][1]-=2;
                this.body[1][0]++;
                this.body[1][1]--;
                this.body[3][0]++;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
        }   
    }                             
    setElUpFormat(format){
        switch(format){
            case 1:
                this.body[0][0]-=2;
                this.body[0][1]-=2;
                this.body[1][0]--;
                this.body[1][1]--;
                this.body[3][0]--;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
            case 2:
                this.body[0][0]+=2;
                this.body[0][1]-=2;
                this.body[1][0]++;
                this.body[1][1]--;
                this.body[3][0]--;
                this.body[3][1]--;
                this.wallTouched(this.body);
                break;
            case 3:
                this.body[0][0]+=2;
                this.body[0][1]+=2;
                this.body[1][0]++;
                this.body[1][1]++;
                this.body[3][0]++;
                this.body[3][1]--;
                this.wallTouched(this.body);
                break;
            case 4:
                this.body[0][0]-=2;
                this.body[0][1]+=2;
                this.body[1][0]--;
                this.body[1][1]++;
                this.body[3][0]++;
                this.body[3][1]++;
                this.wallTouched(this.body);
                break;
        }   
    }
    setEsFormat(format){
        switch (format) {
            case 1:
            case 3:
                this.body[0][0]+=2;
                this.body[1][0]++;
                this.body[1][1]++;
                this.body[3][0]--;
                this.body[3][1]++;
                this.wallTouched(this.body);
            break;
            case 2:
            case 4:
                this.body[0][0]-=2;
                this.body[1][0]--;
                this.body[1][1]--;
                this.body[3][0]++;
                this.body[3][1]--;
                this.wallTouched(this.body);
            break;
        }
    }
    setEsUpFormat(format){
        switch (format) {
            case 1:
            case 3:
                this.body[0][0]-=2;
                this.body[1][0]--;
                this.body[1][1]++;
                this.body[3][0]++;
                this.body[3][1]++;
                this.wallTouched(this.body);
            break;
            case 2:
            case 4:
                this.body[0][0]+=2;
                this.body[1][0]++;
                this.body[1][1]--;
                this.body[3][0]--;
                this.body[3][1]--;
                this.wallTouched(this.body);
            break;
        }
    }
}
