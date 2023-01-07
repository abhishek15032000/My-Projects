
let optionsCont=document.querySelector('.options-cont');
let toolsCont=document.querySelector('.tools-cont');
let pencilToolCont=document.querySelector('.pencil-tool-cont');
let eraserToolCont=document.querySelector('.eraser-tool-cont');
let pencil=document.querySelector('.pencil');
let eraser=document.querySelector('.eraser');

let sticky=document.querySelector('.sticky-notes');

let upload=document.querySelector('.upload');

/* 
  state of pencil tool and erase tool
*/ 
let pencilFlag=false;
let eraserFlag=false;
/* 
  state of pencil tool and erase tool
*/ 
let optionsFlag=true;
// true == show dashboard
// false == hide dashboard
optionsCont.addEventListener('click',(e)=>{
    // modify ui when hambruger is clicked
    optionsFlag=!optionsFlag;
    /*
      since we are using svg icons and using flat icons cdn we use <i></i> to load svg
      we will be replacing fa-bars with fa-xmark in class list to change icons upon clicking to
      preserve the state of the open and close of dashboard we are keeping options flag
    */
    if(optionsFlag){
        openTools();
    }else{
        closeTools();
    }
})



function openTools(){
    let iconElem=optionsCont.children[0];
    iconElem.classList.remove("fa-xmark")
    iconElem.classList.add("fa-bars");
    toolsCont.style.display='flex';
}

function closeTools(){
     let iconElem=optionsCont.children[0];
     iconElem.classList.remove("fa-bars");
     iconElem.classList.add("fa-xmark");
     toolsCont.style.display='none';

     /*
       closing pencilToolCont and eraser tool container if opened while hiding the dashboard
     */
     pencilToolCont.style.display='none';
     eraserToolCont.style.display='none';
     /*

     */
}

pencil.addEventListener('click',(e)=>{
   // true --> show pencil tool
   // false --> hide pencil
   pencilFlag=!pencilFlag;
   if(pencilFlag){
       pencilToolCont.style.display='block';
   }else{
       pencilToolCont.style.display='none';
   }
})

eraser.addEventListener('click',(e)=>{
    // true --> show erase tool
    // false --> hide eraser
    eraserFlag=!eraserFlag;
    if(eraserFlag){
        eraserToolCont.style.display='flex';
    }else{
        eraserToolCont.style.display='none';
    }
 })

  upload.addEventListener('click',(e)=>{
    /*
      open file explorer to upload image from hard disk
    */
    let input=document.createElement('input');
    input.setAttribute('type','file');
    input.click();
   
    input.addEventListener('change',(e)=>{
        let uploadedFile=input.files[0];
        // url to be passed in the image source of the newly created sticky note URL is a global object so we create an object out of the file uploaded 
        let url=URL.createObjectURL(uploadedFile);

        let stickyTemplateHTML=` 
        <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src=${url}></img>
        </div>
        `
        createSticky(stickyTemplateHTML);
    }) 
  })



 sticky.addEventListener('click',(e)=>{
 
   let  stickyTemplateHTML=` 
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
    
 })




 function createSticky(stickyTemplateHTML){
    let stickyCont=document.createElement('div');
    stickyCont.setAttribute('class',"sticky-cont");
    // creating a sticky note on click adding attribute of sticky-cont so that all styles of sticky container apply and then add innerHtml to the created stickyContainer 
    stickyCont.innerHTML=stickyTemplateHTML;
    
    document.body.appendChild(stickyCont);


    let minimize=stickyCont.querySelector('.minimize');
    let close=stickyCont.querySelector('.remove');

    noteActions(minimize,close,stickyCont);

    // algorithm of mouse drag and drop is taken from javascript.info
    
    stickyCont.onmousedown =function (e){
        dragAndDrop(stickyCont,e);
    }
    
    stickyCont.ondragstart=function(){
        return false;
    }
 } 






 /*
   
 minimize and close note actions

 */

 function noteActions(minimize,remove,stickyCont){
    remove.addEventListener('click',(e)=>{
        stickyCont.remove();
    })

    minimize.addEventListener('click',(e)=>{
        // to know whether the container is minimized or not  using computedStyles
        let noteCont=stickyCont.querySelector('.note-cont');
        let display=getComputedStyle(noteCont).getPropertyValue("display");
        if(display==="none"){
            noteCont.style.display='block';
        }else{
            noteCont.style.display='none';
        }
    })
 }



 function dragAndDrop(element,event){
    let shiftX = event.clientX -element.getBoundingClientRect().left;
    let shiftY = event.clientY -element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
  
    // moves theelement at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move theelement on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop theelement, remove unneeded handlers
   element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
    };
  
 }