

let hospitalArray=[];
let hospitalCount=0;
function addHospital(i,j){
    let obj={
        row:i.innerText,
        col:j.innerText,
    }
    hospitalCount+=1;
    hospitalArray.push(obj);
    return hospitalCount;
}

function checkHospitalExist(row,col){
    for(let i=0;i<hospitalArray.length;i++){
         if(hospitalArray[i].row===row && hospitalArray[i].col===col){
            return true;
         }
    }
    return false;
}

function CountHospital(){
    return hospitalCount;
}