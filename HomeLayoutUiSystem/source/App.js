
let rows=prompt("please enter the no of rows for the layout");
let cols=prompt("please enter the no of cols for the layout");


// now we have to create a matrix of rows * cols where each cell is a div

// corner case if rows === null or cols === null ask the user to again enter

if(rows===0 || cols===0){
    while(rows>0 && cols>0){
        rows=prompt('please enter a positive non zero value of no of rows');
        cols=prompt('please enter a positive non zero value of no of cols');
    }
}

const root=document.querySelector('.parent-container');

let rowNo=document.querySelector('.value1');
let colNo=document.querySelector('.value2');
let firDiv;
for(let i=0;i<rows;i++){
    let rowElement=document.createElement('div');
    rowElement.classList.add('container');
    for(let j=0;j<cols;j++){
       let colElement=document.createElement('div');
       colElement.classList.add('value-container');
       colElement.setAttribute("rid",i);
       colElement.setAttribute("cid",j);
    //    colElement.addEventListener("click",showIt);
    
       colElement.addEventListener("click",showAvailableTags);
      
       rowElement.appendChild(colElement);
       if(i==0 && j==0){
        firDiv=colElement;
       }
    }
    root.appendChild(rowElement);
}




let rid;
let cid;

function showIt(event){
    let first=event.target.getAttribute('rid');
    let second=event.target.getAttribute('cid');
    rid=first;
    cid=second;
    rowNo.innerText=first;
    colNo.innerText=second;
    return event;
}

// function showAvailableTags(event){
//    let HomesCount=returnHomeCount();
//    // all other tags will be rendered as it is
//    let check
// }

let showList=document.querySelector('.tagsAvailable');



function createList(content,divBe,identity){
    let y=document.createElement('span');
    y.innerText=content;
    y.classList.add('tags');
    y.addEventListener('click',()=>{
        let k=document.createElement('div');
        k.classList.add('textContent');
        k.innerText=content;
        if(identity==="House"){
            k.classList.add('home');
            addHome(rowNo,colNo);
        }else if(identity==="Restaurant"){
            k.classList.add('other');
            addRestaurant(rowNo,colNo);
        }else if(identity==="Hospital"){
            k.classList.add('other');
            addHospital(rowNo,colNo);
        }else{
            k.classList.add('other');
            addGym(rowNo,colNo);
        }
        divBe.target.appendChild(k);
        toRun(divBe);
    });
    return y;
}


/*
 
  now i want to render the available options for a cell 

  1.already house present then dont show.
  2.if not present then show the house tag availablity depending upon current no of houses.
  3.if already a restaurant is present dont add else can add.
  4.if already a gym is present dont add else can add.
  5.if already a hospital is present dont add else can add.


// on home crud action is happening 

 //

// while the rest of them are normal 

*/

firDiv.click();

function showAvailableTags(event){

   let divBe=showIt(event);
   toRun(divBe);
}

function clearAllChildren(element){
    element.querySelectorAll('*').forEach(n=>n.remove());
}


function toRun(divBe){
    clearAllChildren(showList);

    if(checkHomeExist(rid,cid)){
        // do nothing
    }else{
        let countHome=CountHome();
        let homeTag=createList(`House${countHome+1}`,divBe,'House');
        showList.appendChild(homeTag);
    }

    if(checkRestaurantExist(rid,cid)){
        // do nothing
    }else{
        let restaurantTag=createList(`Restaurant`,divBe,'Restaurant');
        showList.appendChild(restaurantTag);
    }

    if(checkGymExist(rid,cid)){
        // do nothing
    }else{
        let GymTag=createList(`Gym`,divBe,'Gym');
        showList.appendChild(GymTag);
    }

    if(checkHospitalExist(rid,cid)){
        // do nothing
    }else{
        let hospitalTag=createList(`Hospital`,divBe,'Hospital');
        showList.appendChild(hospitalTag);
    }
}

const trigger = document.querySelector('#triggered');
const modalWrapper = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const modalContent=document.querySelector('.modalContent');
console.log(modalContent);
trigger.addEventListener('click', function(){
    openModal();
});

closeBtn.addEventListener('click', function(){
    closeModal();
});

modalWrapper.addEventListener('click', function(e){
    if(e.target !== this) return;
    closeModal();
});

document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') {
        closeModal();
    }
})

function openModal() {
    modalContent.innerText="";
    console.log(getResult());
    modalContent.innerText=getResult();
    modalWrapper.classList.add('active');
}
function closeModal() {
    modalWrapper.classList.remove('active');
    modalContent.innerText="";
}

