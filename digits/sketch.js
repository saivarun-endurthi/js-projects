var a1=[];
var a2=[];
var a=[];
var b=[];
let xs,ys,xs1,ys1;
var pix=[];
var pix1=[];
var pix2=[];

let model;
var d=[];

var submit,clear,see,val,Sav,retrain;
function preload(){
    for(var i=0;i<=9;i++){
        a.push(loadBytes("data"+i));
    }
    
 a=loadBytes("x_test");
    console.log('loaded ', a);
    
}

function setup(){
    createCanvas(280,280);   
    background(0);

    submit = createButton("submit");
    clear  = createButton("clear");
    see = createInput("27");
    Sav = createButton("save");
    val = createP("");
    retrain = createButton("train");
    for(var j=0;j<=9;j++){
    for(var i=0;i<784000;i++){
        b.push(a.bytes[i+1000*j]);
       // b.push(a[j].bytes[i]);
        b[i+j*784000]/=255;

            }}
//    console.log(b.slice(100,400))
            a=[];
    var start =0;
    var p;
    for(var i=0;i<b.length;i+=784){

         p = [];
        for(var j=0;j<784;j++){

            p.push(b[j+i]);
                }
         pix.push(p); 
        start++;
        
   }
 for(var i=0;i<b.length;i+=784){

         p = [];
        for(var j=0;j<784;j++){

            p.push(b[j+i]);
                }
         pix.push(p); 
        start++;
        
   }
    
            b=[];



   
    var start=0;
    for(var j=0;j<10;j++){
    for(var i=0;i<1000;i++){

         a.push(j);
            }}

    Shuffle(a,pix);
    for(var i=0;i<pix.length;i++){
        if(i<9000){
            a1.push(a[i]);
            pix1.push(pix[i]);
        }
        if(i>=9000){
            a2.push(a[i]);
            pix2.push(pix[i]);
        }
    }
    
    
         show(27);
        
    xs=tf.tensor2d(pix1);   
    let  c= tf.tensor1d(a1,'int32');
    xs1=tf.tensor2d(pix2);   
    let  c1= tf.tensor1d(a2,'int32');
    ys = tf.oneHot(c,10);
    ys1 = tf.oneHot(c1,10);

    model=tf.sequential();
      
     let hidden1 = tf.layers.dense({
         units:784,
         activation:'relu6',
         inputDim:784
     });
     
     let hidden2 = tf.layers.dense({
         units:128,
         activation:'relu6'
         
     });  
    let output = tf.layers.dense({
         units:10,
         activation:'softmax'
         
     });   
     
     model.add(hidden1);
     model.add(hidden2);    
     model.add(output);
     
     let lr = 0.2;
     const optimizer = tf.train.sgd(lr); 
 
     model.compile({
         optimizer:optimizer,
         loss:'categoricalCrossentropy',
       
//         validationData:[xs1,ys1],
         metrics:['accuracy']
     });
//         tf.tidy(() => {
//    train().then(results => {
//         // console.log(results.history);
//      });   
//    });
}
async function train()
{
    const options = {
        epochs:100,
          shuffle : true,
        batchSize:32,
      callbacks:{
          onEpochEnd: (num,logs)=>{
              console.log('epoch: '+num);
              console.log( logs);
          }
      }
        
     };   
         
     return await model.fit(xs1,ys1,options);
}

function Shuffle(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
     console.log("shuffled");
}

function draw(){
    retrain.mousePressed(Train);
    submit.mousePressed(make);
    clear.mousePressed(blank);
    Sav.mousePressed(async ()=>{
      await model.save('localstorage://my-model-1');
   // loadedModel = await tf.loadModel('localstorage://my-model-1');
  });
    see.changed(saw);
     stroke(255);
    strokeWeight(25);
    
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    
}

function saw(){
    show(see.value());
   
}

function Train(){
    tf.tidy(() => {
    train().then(results => {
         // console.log(results.history);
      });   
    });
}

function make(){
       
    var k = [];
    var img = get();
    img.resize(28,28);
  img.loadPixels();
  
for(var i = 0; i < 784; i++) {
    
      k.push(img.pixels[i*4]/255); 
    }
  
//  async function sav(){
//      //await model.save('downloads://my-model-1');
//    loadedModel = await tf.loadModel('indexeddb://my-model-1');
//  }
  
   // console.log(k);
//    console.log(pix[see.value()]);
    //var k = pix[see.value()];
   // console.log(a[see.value()]);
    tf.tidy( ()=>{
    let xval = tf.tensor2d([k]);
//    xval.print();
    //console.log(xval.dataSync());
//    let results = loadedModel.predict(xval);
         let results = model.predict(xval);
    let index = results.argMax(1).dataSync()[0];
    //console.log(index);
        val.html(index);
    // console.log(results.argMax(1));
    });
}

function blank(){
    background(0);
}



function show(k){
    blank();
    var img = createImage(28, 28);
  img.loadPixels();
 for(var y = 0; y < img.height; y++) { 
     for(var x = 0; x < img.width; x++) {  
      var c = pix[k][x+y*28]*255;
      img.set(x, y, color(c, c, c, 255)); 
    }
  }
  
  img.updatePixels();
    //console.log(img);
    image(img,0,0,width,height);
    console.log(a[k]);
 
}
    
