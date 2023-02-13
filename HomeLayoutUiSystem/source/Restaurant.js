

let restaurantArr=[];
let restaurantCount=0;
function addRestaurant(i,j){
    let obj={
        row:i.innerText,
        col:j.innerText,
    }
    restaurantCount+=1;
    restaurantArr.push(obj);
    return restaurantCount;
}

function checkRestaurantExist(row,col){
    for(let i=0;i<restaurantArr.length;i++){
         if(restaurantArr[i].row===row && restaurantArr[i].col===col){
            return true;
         }
    }
    return false;
}

function CountRestaurant(){
    return restaurantCount;
}