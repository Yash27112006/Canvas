var currentPath = [];
var drawing = [];
var dbDrawing = [];
var drawingRef, isDrawing, drawPath;

function setup(){
    canvas = createCanvas(1000,600);
    database = firebase.database();
    drawingRef = database.ref('drawing');
    drawingRef.on("value",readData,showError)
    canvas.mousePressed(start);
    canvas.mouseReleased(end);
    background(51);

}

function draw(){
    if(isDrawing){
       var point = {
          x:mouseX,
          y:mouseY
       }
      currentPath.push(point);
    }
    database.ref('drawing').set({d:currentPath});
    stroke(255);
    strokeWeight(5);
    noFill();
    if(dbDrawing !== undefined){ 
       console.log(dbDrawing); 
       for(var path in dbDrawing){ 
          // drawPath = dbDrawing[path].d; 
          drawPath = dbDrawing[path]; 
          console.log(path); beginShape(); 
          if(drawPath != undefined) { 
             for(var j in drawPath){ 
                vertex(drawPath[j].x,drawPath[j].y); 
                endShape(); } } } }
}
function start(){
   isDrawing = true;
   currentPath = [];
   dbDrawing.push(currentPath);
}
function readData(data){
   dbDrawing = data.val();
}
function showError(){
   console.log("Error");
}
function end(){
    isDrawing = false; 
}
