
let gymArray=[];
let gymCount=0;
function addGym(i,j){
    let obj={
        row:i.innerText,
        col:j.innerText,
    }
    gymCount+=1;
    gymArray.push(obj);
    return gymCount;
}

function checkGymExist(row,col){
    for(let i=0;i<gymArray.length;i++){
         if(gymArray[i].row===row && gymArray[i].col===col){
            return true;
         }
    }
    return false;
}

function CountGym(){
    return gymCount;
}