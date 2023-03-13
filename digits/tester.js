
var submit,clear,val,Load;
//let jsonUpload = document.getElementById('json-upload');
//let weightsUpload = document.getElementById('weights-upload');




let loadedModel ; 

function setup(){
    createCanvas(280,280); 
    console.log("test");
    background(0);

    submit = createButton("submit");
    clear  = createButton("clear");
    
    Load = createButton("load");
    val = createP("");
    
  
}


function draw(){
    
    submit.mousePressed(make);
    clear.mousePressed(blank);
    
//    Load.mousePressed(async ()=>{ loadedModel = await tf.loadModel(
//     tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]]));
//                                console.log(loadedModel);});
   
    Load.mousePressed(load);
     stroke(255);
    strokeWeight(25);
    
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    
}
 
async function load(){ 
    try{
    loadedModel = await tf.loadModel("model.json");
    console.log('done');
    }
    catch{
        console.log("error");
}
}


function make(){
       
    var k = [];
    var img = get();
    img.filter(BLUR, 2);
    img.resize(28,28);
    image(img,0,0,width,height)
  img.loadPixels();
  
for(var i = 0; i < 784; i++) {
    
      k.push(img.pixels[i*4]/255); 
    }
  

  
  
    tf.tidy( ()=>{
        
       let xval = tf.tensor(k, [1,28,28,1])
//    let xval = tf.tensor(k);
//        xval.reshape(-1,28,28,1);
        //console.log(xval);
    let results = loadedModel.predict(xval);
       // console.log(results.dataSync());
    let index = results.argMax(1).dataSync()[0];
    console.log(index);
        val.html(index);
   
    });
}

function blank(){
    background(0);
    
}




  