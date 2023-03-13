function Spline (){
    this.vertices = [],
    this.colors= [],
    this.speed = (Math.random() + 0.1) * 0.0002,
    this.Color = Math.floor(Math.random() * 80 + 180)
    this.proj = [];
}
var splines = [];
var v , prevA =0 , offset =0;
var mouseJump = 0;
var a = 0;
var Scale = 9;
var length = 30;
function setup(){
    createCanvas(windowWidth,windowHeight);
    //perspective(60/180*PI , width/height ,0.0,100)
    background(0);
for(var i =0 ;i<12 ; i++){
        var spline = new Spline();
          colorMode(HSB,360);
    for(var j =0 ;j<180;j++){
     v = new p5.Vector(j / 180 * length * 2 - length,0,0);
        spline.vertices.push(v);
    c = color(j * 0.6 + spline.Color,200,200);
        spline.colors.push(c);
    }
        
        splines.push(spline);
}

}

function update(){
    for(var i =0 ;i<splines.length ; i++){
        var spline = splines[i];
    for (var j = 0; j < spline.vertices.length; j++) {
      var vector = spline.vertices[j];
     
      vector.y = map(noise(j * 0.025 + i - offset, a * spline.speed),0,1,-1,1) * 16;
     
      vector.z = map(noise(vector.x * 0.025 + i, a * spline.speed),0,1,-1,1) * 16;

      vector.y *= 1 - Math.abs(vector.x / length);
      vector.z *= 1 - Math.abs(vector.x / length);
    }
    }
    if (mouseIsPressed) {
      // console.log(frameRate());
    mouseJump += 0.001;
    if (a - prevA > PI * 50) {
      updateColor();
      prevA = a
    }
  } else {
    mouseJump -= 0.001;
  }
  mouseJump = Math.max(0, Math.min(0.07, mouseJump));
  offset += mouseJump;
    
    
}

function updateColor(){
      for(var i =0 ;i<splines.length ; i++){
        var spline = splines[i];
    colorMode(HSB, 360);
    var Color = Math.abs((spline.Color - offset * 10) % 360);
    for (var j = 0; j < spline.colors.length; j++) {
      spline.colors[j] = color(j*0.6 + Color,200,200);
    }
      }

}
function show(){ 
    background(0);
    push();
    strokeWeight(1);
    translate(width/2,height/2);
   noFill();
    stroke(255);
    colorMode(HSB, 360);
    for(var j =0 ;j<splines.length ; j++){
        
        var spline = splines[j];
//        var grad = this.drawingContext.createLinearGradient(spline.vertices[0].x,0,spline.vertices[179].x,0);
//        grad.addColorStop(0,spline.colors[0]);
//        grad.addColorStop(1,spline.colors[179]);
//        this.drawingContext.strokeStyle = grad;
    beginShape();
    stroke(spline.colors[floor(j*180/splines.length)]);
    for(var i = 1; i< spline.vertices.length; i++){
//        stroke(spline.colors[i]);
//   line(spline.vertices[i-1].x *Scale,spline.vertices[i-1].y*Scale,spline.vertices[i-1].z*Scale,spline.vertices[i].x *Scale,spline.vertices[i].y*Scale,spline.vertices[i].z*Scale);
        
//    vertex(spline.vertices[i].x *Scale,spline.vertices[i].y*Scale,spline.vertices[i].z*Scale);
//    }
    curveVertex(spline.vertices[i].x *Scale,spline.proj[i]*Scale);
    }
    endShape();
 
    }
       pop();
}
function RX(){
      for(var i =0 ;i<splines.length ; i++){
        var spline = splines[i];
    for (var j = 0; j < spline.vertices.length; j++) {
      var vector = spline.vertices[j];
     spline.proj[j]=vector.y*cos(a*0.001) - vector.z*sin(a*0.001)
      
    }
    }
}

function draw(){
    RX();
    update();
        a+=5;
    show();
}