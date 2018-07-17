let code='LL20LL60R80R61FFF97LFL10LLL71RR36LRLRF74RF47FR100R91L51FRRLRF31F17RRF65FRRFF13L44F69FF4RRLL95RL99LF49L18RLRFF9R96RFLF15R69R74R28RFRR43FR56FL59R84FR31FF85FLL9RL33L59L86LL77RLR48R99LRR90RR'
let cond=0,curX=0,curY=0,ans='',preTxt='';
let obj=[[1]];

let str=code.replace(/(\D+)/g,(w)=>{
    let V=w.split('').join();
    return ','+V+',';
});
str.split(',').forEach((x,k)=>{
    if(x!=='F' && x!=='R' && x!=='L'){
        for(let i=1;i<x;i++){
            setArr(preTxt);
        }
    }else{
        setArr(preTxt=x);
    }  
});

function setArr(n){
    if(n==='L') --cond;
    else if(n==='R') ++cond;
    else if(n==='F'){
        //move x y
        cond=(cond+8)%4;
        if (cond===0) ++curY;
        else if (cond===1) ++curX;
        else if (cond===2) --curY;
        else if (cond===3) --curX;
        //correct x y
        if(curX<0){
            obj.unshift([0]);
            curX=0;
        }
        if(curY<0){ 
            obj.forEach(x=>x.unshift(0));
            curY=0;
        }
        if(obj[curX]===undefined) obj[curX]=[];
        //set current path
        obj[curX][curY]=1;
    }
}

//this is the most confuse thing I have to do
//fill the blank in the end even that's not necessary at all !!
//because the grid looks same
let maxLen=0;
obj.forEach(x=>{
    if(x.length>maxLen) maxLen=x.length;
});

//print
obj.forEach((x,k)=>{
  for(let i=0;i<maxLen;i++){
      if(x[i]===undefined) x[i]=0;
      ans+= x[i]==0? ' ':'*';
  }
  if(k!=obj.length-1) ans+='\r\n';
});

//console.log(ans);