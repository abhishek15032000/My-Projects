let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

// drawing path
// API





let tool=canvas.getContext('2d');
tool.beginPath();// new graphic or new line
// change color of the line 
tool.strokeStyle='red';
// change width of line created
tool.lineWidth='8';
// start point
// takes input x,y (x axis ,y axis)
tool.moveTo(0,0);
// point upto which we want the line to be (x,y)
tool.lineTo(100,150);
// color fill in the line created
tool.stroke()