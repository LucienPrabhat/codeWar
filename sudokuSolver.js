function sudoku(puzzle) {
    var arr=puzzle;

    this.possible=function (target,x,y) {
        if (target==0) target=[1,2,3,4,5,6,7,8,9];
        var count=0;
        var area=[0,3,6];
        var a=area[parseInt(x/3)];
        var b=area[parseInt(y/3)];
        /*
        3*3 area
        ------------------
          A B C > /3=0
          D E F > /3=1
          G H I > /3=2
          v v v
           % 3
        = 0 1 2
        ------------------*/
        //
        for (var cur=0;cur<9;cur++){
            //check row
            if (arr[x][cur]!=0 && cur!=y && typeof arr[x][cur]=="number") { target=target.filter(t => t!=arr[x][cur]) }
            //check column
            if (arr[cur][y]!=0 && cur!=x && typeof arr[cur][y]=="number") { target=target.filter(t => t!=arr[cur][y]) }
            //check the 3*3 area
            //area start point >> arr[a][b]
            var p=parseInt(a)+parseInt(cur/3);
            var q=parseInt(b)+parseInt(cur%3);
            if (arr[p][q]!=0 && p!=x && q!=y && typeof arr[p][q]=="number"){
                target=target.filter(t => t!=arr[p][q])
            }
        }
        if (target.length==1){ target=target[0]; count++;}
        return [target,count];
    };

    //refresh the array od possible number
    this.refesh=function (number,x,y) {
        var area=[0,3,6];
        var a=area[parseInt(x/3)];
        var b=area[parseInt(y/3)];
        for (var cur=0;cur<9;cur++){
            //check row
            if (Array.isArray(arr[x][cur]) && cur!=y) { arr[x][cur]=arr[x][cur].filter(t => t!=number) }
            if (arr[x][cur].length==1){ arr[x][cur]=arr[x][cur][0]; this.refesh(arr[x][cur],x,cur); }
            //check column
            if (Array.isArray(arr[cur][y]) && cur!=x) { arr[cur][y]=arr[cur][y].filter(t => t!=number) }
            if (arr[cur][y].length==1){ arr[cur][y]=arr[cur][y][0]; this.refesh(arr[cur][y],cur,y); }
            //check the 3*3 area
            var p=parseInt(a)+parseInt(cur/3);
            var q=parseInt(b)+parseInt(cur%3);
            if (Array.isArray(arr[p][q]) && p!=x && q!=y){
                arr[p][q]=arr[p][q].filter(t => t!=number)
            }
            if (arr[p][q].length==1){ arr[p][q]=arr[p][q][0]; this.refesh(arr[p][q],p,q); }
        }
    };

    //go for each one which list the possible number and find if the only number is included.
    this.isUnique=function (targetArray,x,y) {
        var area=[0,3,6];
        var a=area[parseInt(x/3)];
        var b=area[parseInt(y/3)];

        for(var n of targetArray){
            var solo;

            //(check if unique number) in row
            for (var cur=0;cur<9;cur++){
                solo=true;
                if (Array.isArray(arr[x][cur]) && cur!=y) { for(var m of arr[x][cur]){ if(n==m){ solo=false; break; } } }
                if(!solo) break;
            }
            if(solo) {this.refesh(n,x,y); return n;}

            //(check if unique number) in column
            for (var cur=0;cur<9;cur++){
                solo=true;
                if (Array.isArray(arr[cur][y]) && cur!=x) { for(var m of arr[cur][y]){ if(n==m){ solo=false; break; } } }
                if(!solo) break;
            }
            if(solo) {this.refesh(n,x,y); return n;}

            //(check if unique number) in 3*3 area
            for (var cur=0;cur<9;cur++){
                solo=true;
                var p=parseInt(a)+parseInt(cur/3);
                var q=parseInt(b)+parseInt(cur%3);
                if (Array.isArray(arr[p][q]) && p!=x && q!=y){
                    for (var m of arr[p][q] ){
                        if (n==m){ solo=false; break; }
                    }
                }
                if(!solo) break;
            }
            if(solo) {this.refesh(n,x,y); return n;}
        }
        return targetArray;
    };

    //go for each one and find the possible answer then store as an array
    this.possibleNum=function (step) {
        var done=0;
        if (step==1){ var count=0;}
        for (var i=0;i<9;i++){
            for (var k=0;k<9;k++){
                if(step==1){
                    if (arr[i][k]==0 || Array.isArray(arr[i][k])){
                        var tmp=this.possible(arr[i][k],i,k);
                        arr[i][k]=tmp[0];
                        count+=tmp[1];
                    }else{
                        done++;
                        if (done==81) count=-1;
                    }
                }
                if(step==2){
                    if (Array.isArray(arr[i][k])){
                        arr[i][k]=this.isUnique(arr[i][k],i,k);
                    }
                }
            }
        }
        console.log(count);
        return count;
    };

    var find;
    do {
        find=this.possibleNum(1);
    }while(find>0);
    if (find==0 && find!=-1) this.possibleNum(2);
    return arr;

}

var puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]];

var test=new sudoku(puzzle);

console.log(test);