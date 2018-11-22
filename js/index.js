var cMaster;
var o1,o2,o3;
var analyser1, analyser2, analyser3;
var o1Array = new Array(25);
var o2Array = new Array(25);
var o3Array = new Array(25);
var n = 0;
var f1,f2,f3;      //index of the current grade calcualted by "calculateDeg" function
var gradi = [];
var selectedGain = [];
var deg=0;
var sel1= document.getElementById("select_box1");
var sel2= document.getElementById("select_box2");
var sel3= document.getElementById("select_box3");
var firstTime=true;
var turnOn1=false, turnOn2=false, turnOn3=false;
var gates1=[], gates2=[], gates3=[];
sel1.disabled=true;
sel2.disabled=true;
sel3.disabled=true;
var cMaster = new AudioContext();
var gainMaster= cMaster.createGain();
gainMaster.connect(cMaster.destination);


function createAudio1(){
  canvas1 = document.querySelector("#canv1");
  ctx1 = canvas1.getContext("2d");
  analyser1 = cMaster.createAnalyser();
  bufferLength = analyser1.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
}

function createAudio2(){
  canvas2 = document.querySelector("#canv2");
  ctx2 = canvas2.getContext("2d");
  analyser2 = cMaster.createAnalyser();
  bufferLength = analyser2.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function createAudio3(){
  canvas3 = document.querySelector("#canv3");
  ctx3 = canvas3.getContext("2d");
  analyser3 = cMaster.createAnalyser();
  bufferLength = analyser3.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}



function attack1(freq ,selGain) {
  o1 = cMaster.createOscillator();
  g = cMaster.createGain();
  o1.connect(g);
  g.connect(analyser1);
  analyser1.connect(gainMaster);
  o1.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates1[freq] = g;
  
  o1Array[tones.indexOf(freq)] = o1;
  
 
  
  o1.start();
  if (sel1.options.selectedIndex=="0") {o1.type='sine'}
  if (sel1.options.selectedIndex=="1") {o1.type='triangle'}
  if (sel1.options.selectedIndex=="2") {o1.type='square'}
   if (sel1.options.selectedIndex=="3") {o1.type='sawtooth'}
    
}

function release1(freq) { 
  gates1[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+0.8);
}

function attack2(freq ,selGain) {
  o2 = cMaster.createOscillator();
  g = cMaster.createGain();
  o2.connect(g);
  g.connect(analyser2);
  analyser2.connect(gainMaster);
  o2.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates2[freq] = g;
  
  o2Array[tones.indexOf(freq)] = o2;
  
  o2.start();
  if (sel2.options.selectedIndex=="0") {o2.type='sine'}
  if (sel2.options.selectedIndex=="1") {o2.type='triangle'}
  if (sel2.options.selectedIndex=="2") {o2.type='square'}
   if (sel2.options.selectedIndex=="3") {o2.type='sawtooth'}
}

function release2(freq) { 
  gates2[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+0.8);
}


function attack3(freq ,selGain) {
  o3 = cMaster.createOscillator();
  g = cMaster.createGain();
  o3.connect(g);
  g.connect(analyser3);
  analyser3.connect(gainMaster);
  o3.frequency.value = freq;
  g.gain.value = 0;
  var now = cMaster.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates3[freq] = g;
  
  o3Array[tones.indexOf(freq)] = o3;
  
  o3.start();
  if (sel3.options.selectedIndex=="0") {o3.type='sine'}
  if (sel3.options.selectedIndex=="1") {o3.type='triangle'}
  if (sel3.options.selectedIndex=="2") {o3.type='square'}
   if (sel3.options.selectedIndex=="3") {o3.type='sawtooth'}
}

function release3(freq) { 
  gates3[freq].gain.linearRampToValueAtTime(0,cMaster.currentTime+0.8);
}


function deleteAudio(){
  if(turnOn1 && !turnOn2 ) {
    o1.stop();
    for(i=0;i<o1Array.length;i++)
      {if(o1Array[i]!=undefined)
        o1Array[i].stop();
      }
  }
  if(turnOn2 && !turnOn1) {
    for(i=0;i<o2Array.length;i++)
      {if(o2Array[i]!=undefined)
        o2Array[i].stop();
      }
  } 
 
}


function activateAudio(x){
  changeColorDot(x);
  if(x==1){
   
    if (!turnOn1) {
          createAudio1();
          drawSamples1();
          sel1.disabled = false;     
    }
    else {
      
      analyser1 = cMaster.createAnalyser();
      deleteAudio();
      sel1.disabled = true
    }
  
    turnOn1=!turnOn1;  
  }
  
  
  if(x==2){
    if (!turnOn2) {
          createAudio2();
          drawSamples2();
          sel2.disabled = false;
          
      
    }
    else {
      analyser2 = cMaster.createAnalyser();
      deleteAudio();
      sel2.disabled = true
    }
  
    turnOn2=!turnOn2;  
  }
  
  if(x==3){
    if (!turnOn3) {
          createAudio3();
          drawSamples3();
          sel3.disabled = false;
          
      
    }
    else {
      analyser3 = cMaster.createAnalyser();
      deleteAudio();
      sel3.disabled = true
    }
  
    turnOn3=!turnOn3;  
  }
  
  
  
}


function changeColorDot(x){
  
  var y = "dot" + x;
  var z = "osc" + x;
  document.getElementById(y).classList.toggle("clicked");
  document.getElementById(z).classList.toggle("selectedOsc") 
}


function drawSamples1(){
  analyser1.getByteTimeDomainData(dataArray);
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx1.beginPath();
  for (var i=0; i<canvas1.width; i++) {
    ctx1.lineTo(i,dataArray[i]-canvas1.height*0.8)
  }
  ctx1.strokeStyle = "#00FF00";
  ctx1.stroke();
  requestAnimationFrame(drawSamples1)
}

function drawSamples2(){
  analyser2.getByteTimeDomainData(dataArray);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  ctx2.beginPath();
  for (var i=0; i<canvas2.width; i++) {
    ctx2.lineTo(i,dataArray[i]-canvas2.height*0.8)
  }
  ctx2.strokeStyle = "#00FF00";
  ctx2.stroke();
  requestAnimationFrame(drawSamples2)
}

function drawSamples3(){
  analyser3.getByteTimeDomainData(dataArray);
  ctx3.clearRect(0,0,canvas3.width,canvas3.height);
  ctx3.beginPath();
  for (var i=0; i<canvas3.width; i++) {
    ctx3.lineTo(i,dataArray[i]-canvas3.height*0.8)
  }
  ctx3.strokeStyle = "#00FF00";
  ctx3.stroke();
  requestAnimationFrame(drawSamples3)
}








tones = [] //note
steps = [] //tasti
mouseSteps = []; //tasti cliccati col mouse
for(var i=0;i<25;i++) {
  tones[i] = Math.round(440*Math.pow(2,1/12)**i);
  steps[i] = document.querySelector("#s"+i);
  mouseSteps[i] = "s"+i;
  }
keys = "qwertyuiopasdfghjklzxcvbn";
document.querySelectorAll(".step").forEach(toggleStep)

function toggleStep(step){  
  step.onmousedown= function (step) {
    if(!step.repeat) 
      {step.target.classList.toggle("clicked-step");
       if(turnOn1 && !turnOn2 && !turnOn3)
            {attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
            }
       
       if(!turnOn1 && turnOn2 && !turnOn3){
            attack2(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
      }
    
      if(!turnOn1 && !turnOn2 && turnOn3){
            attack3(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
      }
    
     if(turnOn1 && turnOn2)
            {attack1(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
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
}

function clickOnKeyBoard(step){
  step.classList.toggle("clicked-step")
  
}


document.onkeydown = function(e) {  
  if(!e.repeat){

    clickOnKeyBoard(steps[keys.indexOf(e.key)])
    if(turnOn1 && !turnOn2 && !turnOn3)
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1])
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2])
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3])
    
    if(turnOn1 && turnOn2 && !turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1])
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2])
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3])
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3])
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        attack1(tones[keys.indexOf(e.key)], selectedGain[f1])
        attack2(tones[keys.indexOf(e.key)], selectedGain[f2])
        attack3(tones[keys.indexOf(e.key)], selectedGain[f3])
    }
            
  }
}


document.onkeyup = function(e) {   
  clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  
  
  if(turnOn1 && !turnOn2 && !turnOn3)
        release1(tones[keys.indexOf(e.key)]);
    
    if(!turnOn1 && turnOn2 && !turnOn3)
        release2(tones[keys.indexOf(e.key)]);
    
    if(!turnOn1 && !turnOn2 && turnOn3)
        release3(tones[keys.indexOf(e.key)]);
    
    if(turnOn1 && turnOn2 && !turnOn3){
        release1(tones[keys.indexOf(e.key)]);
        release2(tones[keys.indexOf(e.key)]);
    }
    
    if(!turnOn1 && turnOn2 && turnOn3){
        release2(tones[keys.indexOf(e.key)]);
        release3(tones[keys.indexOf(e.key)]);
    }
    
    if(turnOn1 && !turnOn2 && turnOn3){
        release1(tones[keys.indexOf(e.key)]);
        release3(tones[keys.indexOf(e.key)]);
    }
    
    if(turnOn1 && turnOn2 && turnOn3){
        release1(tones[keys.indexOf(e.key)]);
        release2(tones[keys.indexOf(e.key)]);
        release3(tones[keys.indexOf(e.key)]);
    }
  
  
  
  //drawSamples();       
}


function calculateDeg(deg,name){
  if(name=='vol1')
    f1= gradi.indexOf(deg);
  if(name=='vol2')
    f2= gradi.indexOf(deg);
   if(name=='vol3')
    f3= gradi.indexOf(deg);
}




moveKnob('vol1');
moveKnob('vol2');
moveKnob('vol3');

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