var c1,c2,c3;
var o1,o2,o3;
var n = 0;
var f1,f2;
var gradi = [];
var selectedGain = [];
var deg=0;
var sel1= document.getElementById("select_box1");
var sel2= document.getElementById("select_box2");
var firstTime=true;
var turnOn1=false, turnOn2=false;
var gates=[];
sel1.disabled=true;
sel2.disabled=true;

function createAudio1(){
  c1= new AudioContext();
  canvas = document.querySelector("#canv1");
  ctx = canvas.getContext("2d");
  analyser = c1.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
}

function createAudio2(){
  c2= new AudioContext();
  canvas = document.querySelector("#canv2");
  ctx = canvas.getContext("2d");
  analyser = c2.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}


function attack1(freq ,selGain) {
  console.log("cia");
  o1 = c1.createOscillator();
  g = c1.createGain();
  o1.connect(g);
  g.connect(analyser);
  analyser.connect(c1.destination);
  o1.frequency.value = freq;
  g.gain.value = 0;
  var now = c1.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates[freq] = g;
  o1.start();
  if (sel1.options.selectedIndex=="0") {o1.type='sine'}
  if (sel1.options.selectedIndex=="1") {o1.type='triangle'}
  if (sel1.options.selectedIndex=="2") {o1.type='square'}
   if (sel1.options.selectedIndex=="3") {o1.type='sawtooth'}
}

function attack2(freq ,selGain) {
  o2 = c2.createOscillator();
  g = c2.createGain();
  o2.connect(g);
  g.connect(analyser);
  analyser.connect(c2.destination);
  o2.frequency.value = freq;
  g.gain.value = 0;
  var now = c2.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates[freq] = g;
  o2.start();
  if (sel2.options.selectedIndex=="0") {o2.type='sine'}
  if (sel2.options.selectedIndex=="1") {o2.type='triangle'}
  if (sel2.options.selectedIndex=="2") {o2.type='square'}
   if (sel2.options.selectedIndex=="3") {o2.type='sawtooth'}
}


function deleteAudio(){
  if(turnOn1) c1.close();
  if(turnOn2) c2.close();  
}

function activateAudio(x){
  
  changeColorDot(x);
  
  if(x==1){
    if (!turnOn1) {
          createAudio1();
      
          drawSamples();
          sel1.disabled = false;
          
    }
    else {
      analyser = c1.createAnalyser();
      deleteAudio();
      sel1.disabled = true
    }
  
    turnOn1=!turnOn1;  
  }
  
  
  if(x==2){
    if (!turnOn2) {
          createAudio2();
          drawSamples();
          sel2.disabled = false;
          
      
    }
    else {
      analyser = c2.createAnalyser();
      deleteAudio();
      sel2.disabled = true
    }
  
    turnOn2=!turnOn2;  
  }
  }


function changeColorDot(x){
  var y = "dot" + x;
  var z = "osc" + x;
  document.getElementById(y).classList.toggle("clicked");
  document.getElementById(z).classList.toggle("selectedOsc") 
}


function drawSamples(){
  analyser.getByteTimeDomainData(dataArray);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  for (var i=0; i<canvas.width; i++) {
    ctx.lineTo(i,dataArray[i]-canvas.height*0.8)
  }
  ctx.strokeStyle = "#00FF00";
  ctx.stroke();
  requestAnimationFrame(drawSamples)
}





function release(freq) {
  c = new AudioContext();
  if (turnOn1)  c=c1;
  if (turnOn2)  c=c2;
  gates[freq].gain.linearRampToValueAtTime(0,c.currentTime+0.8);
}

tones = [] //note
steps = [] //tasti
mouseSteps = []; //tasti cliccati col mouse
for(var i=0;i<25;i++) {
  tones[i] = Math.round(440*Math.pow(2,1/12)**i);
  steps[i] = document.querySelector("#s"+i);
  mouseSteps[i] = "s"+i;
  }
keys = "qwertyuiopasdfghjklzxcvbn"

document.querySelectorAll(".step").forEach(toggleStep)

function toggleStep(step){  
  step.onmousedown= function (step) {
    if(!step.repeat) 
      {step.target.classList.toggle("clicked-step");
       if(turnOn1)
            {attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
             
            }
       if(turnOn2)
            attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
      }

  }
      
  step.onmouseup= function (step) {
    if(!step.repeat){
       step.target.classList.toggle("clicked-step")
      release(tones[mouseSteps.indexOf(step.target.id)]);
      }
  }
}


function clickOnKeyBoard(step){
  step.classList.toggle("clicked-step")
  
}


document.onkeydown = function(e) {  
  if(!e.repeat){
    clickOnKeyBoard(steps[keys.indexOf(e.key)])
    if(turnOn1)
    attack1(tones[keys.indexOf(e.key)], selectedGain[f1])
    if(turnOn2)
    attack2(tones[keys.indexOf(e.key)], selectedGain[f2])
  }
}


document.onkeyup = function(e) {   
  clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  release(tones[keys.indexOf(e.key)]);
  //drawSamples();       
}


function calculateDeg(deg,name){
  if(name=='vol1')
    f1= gradi.indexOf(deg);
  if(name=='vol2')
    f2= gradi.indexOf(deg);
  
  console.log(f1,f2)
}




moveKnob('vol1');
moveKnob('vol2');

function moveKnob(name){

let spinner = document.getElementById(name);
    //feedback = document.getElementById('feedback')
let x,
    y,
    saveX=0,
    saveY=0,
    startX,
    startY,
    diffX,
    diffY,
    calculate=false,
    tryFlag=true,
    firstDeg,
    oldDelta,
    delta,
    hold = false,
    indice=0
spinner.addEventListener('mousedown',function(e){
  hold = true;
  calculate=true;
  startX = e.clientX;
  startY = e.clientY;
  indice=0;
  
})
window.addEventListener('mouseup',function(e){
  if (hold){
    
    if(tryFlag){
    saveX=diffX;
    saveY=diffY;}
    hold = false;
    delta=oldDelta;
    
  }
  
})
window.addEventListener('mousemove',function(e){
  diffX=0;
  diffY=0;
  if (hold){
     diffX= e.clientX - startX + saveX;
     diffY= e.clientY - startY + saveY;
    
    delta = Math.abs(diffX) > Math.abs(diffY) ? -diffX : diffY;
    if(tryFlag){
  
    firstDeg = (Math.round(-delta/15) * 15);
    firstDeg=firstDeg%360;
    if(firstDeg<0)
      firstDeg=360-Math.abs(firstDeg);
    oldDelta=delta;
    }
    
    if((firstDeg>=0 && firstDeg<=135) || (firstDeg>=225 && firstDeg<=360)){
      deg=firstDeg;
      
      calculateDeg(deg, name);
      
      
      if(deg==225){ 
        calculateCoord();
        if(delta>=oldDelta) tryFlag=false;
        else tryFlag=true;
      }
      
      if(deg==135){
        
        calculateMax();
        //if(indice==0){console.log(indice);
                      //indice++;}
        //calculateCoord(); 
        if(delta<=oldDelta) tryFlag=false;
        else tryFlag=true;
        //console.log(indice);
        
        
      }
      
    
      
    
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    //feedback.innerHTML = deg;
    
    
    
    }
  
  }
  
  
})


function calculateMax(){
  if(indice==0)
    {
      saveX=diffX;
      saveY=diffY;
      
    }
  indice++;
  //console.log(indice);
}

function calculateCoord(){
  if(calculate){
  saveX=diffX;
  saveY=diffY;}
  calculate=false;
}

}

function expandSelect(id){
    var select_flag = document.getElementById('select_flag1').value;
        if(select_flag==1){
            var select_box = document.getElementById(id);
            if(id.selectedIndex=="2") {o1.type= 'square'}
            document.getElementById('select_flag1').value = 0;
        }else{
            var select_box = document.getElementById(id);
            select_box.size = select_box.options.length; 
            document.getElementById('select_flag1').value = 1;
        }
   }



for(i=0;i<10;i++){
  gradi[i] = 225+i*15;
}
k=10;
for(i=0;i<10;i++){
  gradi[k] = 0+i*15;
  k++;
}

numGain=1/gradi.length;
j = 0;
for(i=0;i<=20;i++){
  selectedGain[i] = j;
  j+=numGain;
}




//console.log(deg);