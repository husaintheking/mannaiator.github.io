var c1;
var o;
var n = 0;
var f;
var gradi = [];
var selectedGain = [];
var deg=0;
var sel= document.getElementById("select_box");
function createAudio(){
  c1= new AudioContext();
  canvas = document.querySelector("#canv1");
  ctx = canvas.getContext("2d");
  analyser = c1.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function attack(freq ,selGain) {
  o= c1.createOscillator();
  g = c1.createGain();
  o.connect(g);
  g.connect(analyser);
  analyser.connect(c1.destination);
  o.frequency.value = freq;
  g.gain.value = 0;
  var now = c1.currentTime;
  g.gain.linearRampToValueAtTime(selGain,now+0.1);
  gates[freq] = g;
  o.start();
  if (sel.options.selectedIndex=="0") {o.type='sine'}
  if (sel.options.selectedIndex=="1") {o.type='triangle'}
  if (sel.options.selectedIndex=="2") {o.type='square'}
   if (sel.options.selectedIndex=="3") {o.type='sawtooth'}
}

function deleteAudio(){
  c1.close();  
}


var firstTime=true;
var turnOn=false;
sel.disabled=true;

function changeColorDot(x){
  var y = "dot" + x;
  var z = "osc" + x;
  document.getElementById(y).classList.toggle("clicked");
  document.getElementById(z).classList.toggle("selectedOsc");
  if (turnOn==false) {
          createAudio();
          drawSamples();
          sel.disabled = false;
  }
  else {
    analyser = c1.createAnalyser();
    deleteAudio();
    sel.disabled = true
  }
  
    turnOn=!turnOn;
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

var gates=[];



function release(freq) {
  gates[freq].gain.linearRampToValueAtTime(0,c1.currentTime+0.8);
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
  //step.onclick= clickOnKeyBoard
  step.onmousedown= function (step) {
    if(!step.repeat) 
      {step.target.classList.toggle("clicked-step");

       attack(tones[mouseSteps.indexOf(step.target.id)], selectedGain[f]);
       
       
      }
  }
  step.onmouseup= function (step) {
    if(!step.repeat) 
      {step.target.classList.toggle("clicked-step")
      //console.log(step.target.id);
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
    attack(tones[keys.indexOf(e.key)], selectedGain[f])
  }
}

document.onkeyup = function(e) { 
  
  clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  release(tones[keys.indexOf(e.key)]);
  //drawSamples();       
}


function calculateDeg(deg){
  f = gradi.indexOf(deg);
  console.log(f)
}

let spinner = document.getElementById('vol1');
    //feedback = document.getElementById('feedback')
let x,
    y,
    saveX=0,
    saveY=0,
    startX,
    startY,
    diffX,
    diffY,
    tryFlag= true,
    firstDeg,
    oldDelta,
    delta,
    hold = false
spinner.addEventListener('mousedown',function(e){
  hold = true;
  startX = e.clientX;
  startY = e.clientY;
  
})
window.addEventListener('mouseup',function(e){
  if (hold){
    
    saveX=diffX;
    saveY=diffY;
    hold = false;
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
      
      calculateDeg(deg);
      
      
      if(deg==225){
         
        if(delta>=oldDelta) tryFlag=false;
        else tryFlag=true;
      }
      
      if(deg==135){
         
        if(delta<=oldDelta) tryFlag=false;
        else tryFlag=true;
      }
      
    
      
    
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    //feedback.innerHTML = deg;
    
    
    
    }
  
  }
  
  
})


function expandSelect(id){
    var select_flag = document.getElementById('select_flag').value;
        if(select_flag==1){
            var select_box = document.getElementById(id);
            if(id.selectedIndex=="2") {o.type= 'square'}
            document.getElementById('select_flag').value = 0;
        }else{
            var select_box = document.getElementById(id);
            select_box.size = select_box.options.length; 
            document.getElementById('select_flag').value = 1;
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




console.log(deg);