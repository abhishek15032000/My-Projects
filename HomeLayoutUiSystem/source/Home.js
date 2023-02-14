
let homeArray=[];
let homeCount=0;
function addHome(i,j){
    let obj={
       row:i.innerText,
       col:j.innerText,
       homeCount:`House${homeCount+1}`
    }
    homeCount+=1;
    homeArray.push(obj);
    return homeCount;
}

function checkHomeExist(row,col){
    for(let i=0;i<homeArray.length;i++){
         if(homeArray[i].row===row && homeArray[i].col===col){
            // console.log(true);
            return true;
         }
    }
    console.log(false);
    return false;
}

function CountHome(){
    // console.log(homeCount);
    return homeCount;
}