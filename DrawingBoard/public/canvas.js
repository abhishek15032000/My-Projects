let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


/*
// drawing path
// API

let tool=canvas.getContext('2d');
tool.beginPath();// new graphic or new line
// start point
// takes input x,y (x axis ,y axis)
tool.moveTo(0,0);
// point upto which we want the line to be (x,y)
tool.lineTo(100,150);
// creates a new line which is invisible 
tool.stroke()
// change color of the line which is just created
tool.strokeStyle='red';
// change width of line created
tool.lineWidth='8';

*/

let redo=document.querySelector('.redo');
let undo=document.querySelector('.undo');


let download=document.querySelector('.download');


let tool=canvas.getContext('2d');

let undoRedoTracker=[];// Data
let track=0;// represent which action from tracker array


let mouseClicked=false;
/*
  selecting all the colors
*/
let pencilColorCont=document.querySelectorAll('.pencil-color');
/*
selecting the input element for pencil width
*/
let pencilWidthElem=document.querySelector('.pencil-width');
/*
  selecting the eraser width from the input value of eraser width.
*/
let eraserWidthElem=document.querySelector('.eraser-width');

/*
  initial pen color default is red
  we will be getting pencilWidth from the range 
  and eraserWidth from the range 
*/

let penColor='red';
let eraserColor="white";
let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;


// mouse down(event for mouse click ) ->start new Path,
// move mover -> fill the path or color the path created while moving mouse.

tool.strokeStyle=penColor;
tool.lineWidth=penWidth;




canvas.addEventListener('mousedown',(e)=>{
    mouseClicked=true;
    // beginPath(
    //     {
    //     x:e.clientX,
    //     y:e.clientY
    //      }
    // )

    // send data to the server
    let data={
      x:e.clientX,
      y:e.clientY,
    }

    socket.emit('beginPath',data);
})

canvas.addEventListener('mousemove',(e)=>{
    
     // we have clicked and dragging the mouse while being clicked
    if(mouseClicked){
        let data={
          x:e.clientX,
          y:e.clientY,
          color:eraserFlag? eraserColor :penColor,
          width:eraserFlag? eraserWidth :penWidth,
        }
        socket.emit('drawStroke',data);
    }

})

canvas.addEventListener('mouseup',(e)=>{
    // we are not clicking now 
    mouseClicked=false;

    /* 
      to add just created graphic
    */

      let url=canvas.toDataURL();
      undoRedoTracker.push(url);
      track=undoRedoTracker.length-1;
})

function beginPath(strokeObj){
    tool.beginPath();
    // clientX gives us the coorindate where the scren
    tool.moveTo(strokeObj.x,strokeObj.y);
}

/*
   here we will be drawing the line 
   in this function 
   it will be called when mouse is first called
   and will be called then when we are moving the mouse while clicking to set the lineTo to draw the graphic on the canvas.
*/

function drawStroke(strokeObj){
    tool.strokeStyle=strokeObj.color;
    tool.lineWidth=strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
    
}

/*
  for selecting color of pencil 
  adding an event listener to the color
  which on clicking will make the penColor change

*/

pencilColorCont.forEach((colorElem)=>{
     colorElem.addEventListener('click',(e)=>{
        let color=colorElem.classList[0];
        penColor=color;
        tool.strokeStyle=penColor;
     })
})


/* 
   add event listener on change on pencil width
*/

pencilWidthElem.addEventListener('change',(e)=>{
    penWidth=pencilWidthElem.value;
    tool.lineWidth=penWidth;
})

/*
   add event listener on change on eraser width
*/

eraserWidthElem.addEventListener('change',(e)=>{
   eraserWidth=eraserWidthElem.value;
   tool.lineWidth=eraserWidth;
});



/*
  here we are checking if the eraserFlag is true
  which means we have clicked on erase icon and the input box is open , now if this is the case then we will be making the color of the stroke white in order to give the feeling of the erase and setting the erase width.
  now if the eraserFlag is closed or eraser is no longer taking an input we are just reverting back to the previous color of the pen and setting the prev width of the pen and color.
*/
eraser.addEventListener('click',(e)=>{
    if(eraserFlag){
        tool.strokeStyle=eraserColor;
        tool.lineWidth=eraserWidth;
    }else{
        tool.strokeStyle=penColor;
        tool.lineWidth=penWidth;
    }
});


/*
  download the image created on the canvas
*/

download.addEventListener('click',(e)=>{
    
    /*
       converts canvas to url
    */

    let url=canvas.toDataURL();
   
    /*
      create anchor element 
    */
   let a=document.createElement('a');
   a.href=url;
   a.download="board.jpg";
   a.click();


})


/*
   add event listener when we click on undo
*/

undo.addEventListener('click',(e)=>{
   if(track>0){
    // we can undo only if there is a graphic left
    // underflow case
     track--;
   }
   // track action
   let trackObj={
    trackValue:track,
    undoRedoTracker
  }
  //  undoRedoCanvas(trackObj);
  
  // send the data to server
  socket.emit('redoUndo',trackObj);
})

redo.addEventListener('click',(e)=>{
   if(track<undoRedoTracker.length-1){
    // means we can redo only when our current position is smaller than last graphic added position
    track++;
   }
   // track action
   let trackObj={
     trackValue:track,
     undoRedoTracker
   }
  //  undoRedoCanvas(trackObj);
  socket.emit('redoUndo',trackObj);

})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    // getting the url of the image earlier created
    // and then creating an image and assigning the url to it
    // now clearing first 
    let url = undoRedoTracker[track];
    let img= new Image();
    // clearing the canvas in a rectangular area 
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    img.src = url;
    // image onloading we will be drawing an image 
    img.onload = (e)=>{
      tool.drawImage(img,0,0,canvas.width,canvas.height);      //starting coordinate and ending coordinate
    }
}


// when data is received from the server
socket.on('beginPath',(data)=>{
  // data represent -> data from server
  // now call the function beginPath with the data received from the server
  beginPath(data);

})
// call the drawStroke function when we receive data from the server
socket.on('drawStroke',(data)=>{
  drawStroke(data);
})

socket.on('redoUndo',(data)=>{
  undoRedoCanvas(data);
})