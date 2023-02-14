/**
 *  we need to find a good house 
 *  a good house is which which has maximum no of amenities at a small distance
 *  so we need to compute this for each house and find the best house
 */

function findNearestHospital(sourceX,sourceY){
    // returns the minimum distance of the current house from the most closest hospital
    // if there is no hospital it will return NULL.

    let distance=-1;// since distance cant be negative 
    for(let i=0;i<hospitalArray.length;i++){
        let destinationX=hospitalArray[i].row;
        let destinationY=hospitalArray[i].col;

        let totalDistance=Math.abs(destinationX-sourceX)+Math.abs(destinationY-sourceY);
        if(distance===-1){
            distance=totalDistance;
        }else{
            distance=Math.min(distance,totalDistance);
        }
    }
    
    return distance;
}

function findNearestGym(sourceX,sourceY){
    let distance=-1;// since distance cant be negative 
    for(let i=0;i<gymArray.length;i++){
        let destinationX=gymArray[i].row;
        let destinationY=gymArray[i].col;

        let totalDistance=Math.abs(destinationX-sourceX)+Math.abs(destinationY-sourceY);
        if(distance===-1){
            distance=totalDistance;
        }else{
            distance=Math.min(distance,totalDistance);
        }
    }
    
    return distance;
}

function findNearestRestaurant(sourceX,sourceY){
    let distance=-1;// since distance cant be negative 
    for(let i=0;i<restaurantArr.length;i++){
        let destinationX=restaurantArr[i].row;
        let destinationY=restaurantArr[i].col;

        let totalDistance=Math.abs(destinationX-sourceX)+Math.abs(destinationY-sourceY);
        if(distance===-1){
            distance=totalDistance;
        }else{
            distance=Math.min(distance,totalDistance);
        }
    }
    
    return distance;
}

function bestHouse(arr){
   let bestHouse;
   let totalDistance=-1;
   for(let i=0;i<arr.length;i++){
      let localSum=0;
      if('HospitalDistance' in arr[i]){
          localSum+=arr[i].HospitalDistance;
      }
      if('GymDistance' in arr[i]){
          localSum+=arr[i].GymDistance;
      }
      if('RestaurantDistance' in arr[i]){
        localSum+=arr[i].RestaurantDistance;
      }
      if(totalDistance==-1){
        totalDistance=localSum;
        bestHouse=arr[i].HouseIdentity;
      }else{
         if(localSum<totalDistance){
             bestHouse=arr[i].HouseIdentity;
             totalDistance=Math.min(totalDistance,localSum);
         }
      }
   }
   return bestHouse;
}

function getResult(){
    let result;
    let ansExist=true;
    let noOfHomesPresent=+(CountHome());
    // console.log(`No of homes Present is ${noOfHomesPresent}`);
    if(noOfHomesPresent===0){
        // Then show a message since there are no houses currently present in the layout
        // so no house will be shown as the best recommendation for a house.
        result=`Insufficient number of houses assigned to compute the result`;
        // console.log('entered in this');
        ansExist=false;
        return result;
     }
     else{
         /**
          * make an array of object where each houses distance from each of the hotel,restaurant,gym has been calculated
          * for each house we would be finding
          * house->hotel==min one
          * house->restaurant==min one
          * house->gym==min one
          * Time Complexity will be 0(N^2).
          */
     
         let processedData=[];
         for(let i=0;i<homeArray.length;i++){
             let sourceX=homeArray[i].row;
             let sourceY=homeArray[i].col;
             let leastHospitalDistance=findNearestHospital(sourceX,sourceY);
             let leastGymDistance=findNearestGym(sourceX,sourceY);
             let leastRestaurantDistance=findNearestRestaurant(sourceX,sourceY);
             let obj={};
             if(leastHospitalDistance!==-1){
                obj['HospitalDistance']=leastHospitalDistance;
             }
             if(leastGymDistance!==-1){
                 obj['GymDistance']=leastGymDistance;
             }
             if(leastRestaurantDistance!==-1){
                 obj['RestaurantDistance']=leastRestaurantDistance;
             }
     
             if(JSON.stringify(obj)==='{}'){
                 // that means insufficient data so there needs to be more data around restaurant,Gyms,hotels to be put
                 /**
                  * return and  show the message
                  */

                 result=`Insufficient number of amenities(eg:-Hospital,Gym,Restaurant) to provide the result`;
                 ansExist=false;
                 break;
             }else{
                 obj['HouseIdentity']=homeArray[i].homeCount;
                 processedData.push(obj);
             }
         }
     
         // now after this we need to compare all the data.
         /**
          * there can be a case when all object present inside the processed data is empty because of no prsence of 
          * restaurant,gyms,hospitals in the presently constructedMatrix.
          * in that case one will show a message insufficient input of restaurant,gyms,hospitals to the user
          */
     
         /**
          *  in case this is not the case we can compare based on this.
          *  one can compare this data based on addition of all the distances from these amenities
          *  or there could be a prefernce be given like:- hospitals first,gym first,restaurant first.
          */
         
         /**
          *  now we have got all the distances of the house 
          *  the function bestHouse will give us the bestHouse which we will be showing on the screen.
          */
         if(ansExist===false){
            console.log(result);
            return result;
         }
         let houseNo=bestHouse(processedData);
         result=`For the given user input the best house is ${houseNo}`;
         return result;
          
     }
}

