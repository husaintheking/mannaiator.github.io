var c1;
var canvas;
var ctx;
var analyser;
var bufferLength;
var dataArray;
  

function createAudio(){
  c1= new AudioContext();
  canvas = document.querySelector("#canv1");
  ctx = canvas.getContext("2d");
  analyser = c1.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function deleteAudio(){
  c1.close();
  
}


var firstTime=true;
var turnOn=false;


function changeColorDot(x){
  var y = "dot" + x;
  document.getElementById(y).classList.toggle("clicked");
  if (turnOn==false) {
          
          createAudio();
          drawSamples()}
  else {
    analyser = c1.createAnalyser();
    deleteAudio();
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
  ctx.stroke();
  requestAnimationFrame(drawSamples)
}

var gates=[];

function attack(freq) {
  
  var o = c1.createOscillator();
  var g = c1.createGain();
  o.connect(g);
  g.connect(analyser);
  analyser.connect(c1.destination);
  o.frequency.value = freq;
  g.gain.value = 0;
  var now = c1.currentTime;
  g.gain.linearRampToValueAtTime(1,now+0.1);
  o.start();
  gates[freq] = g;  
  
  
}

function release(freq) {
  gates[freq].gain.linearRampToValueAtTime(0,c1.currentTime+0.8);
}

tones = [] //note
steps = [] //tasti
for(var i=0;i<25;i++) {
  tones[i] = Math.round(440*Math.pow(2,1/12)**i);
  steps[i] = document.querySelector("#s"+i);
  }
keys = "qwertyuiopasdfghjklzxcvbn"

document.querySelectorAll(".step").forEach(toggleStep)

function toggleStep(step){
  step.onclick= clickOnKeyBoard
}

function clickOnKeyBoard(step){
  step.classList.toggle("clicked-step")
}

document.onkeydown = function(e) {
  
  if(!e.repeat){
    clickOnKeyBoard(steps[keys.indexOf(e.key)])
    attack(tones[keys.indexOf(e.key)])
  }
}

document.onkeyup = function(e) {   
  clickOnKeyBoard(steps[keys.indexOf(e.key)]);
  release(tones[keys.indexOf(e.key)]);
  //drawSamples();       
}




let spinner = document.getElementById('vol1');
    //feedback = document.getElementById('feedback')
let x,
    y,
    deg = 0,
    startX,
    startY,
    hold = false
spinner.addEventListener('mousedown',function(e){
  hold = true;
  startX = e.clientX;
  startY = e.clientY;
})
window.addEventListener('mouseup',function(e){
  if (hold){
    hold = false;
  }
})
window.addEventListener('mousemove',function(e){
  if (hold){
    let diffX = e.clientX - startX;
    let diffY = e.clientY - startY;
    let delta = Math.abs(diffX) > Math.abs(diffY) ? -diffX : diffY
    deg = (Math.round(-delta/15) * 15);
    deg=deg%360;
    if(deg<0)
      deg=360-Math.abs(deg);
    
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    //feedback.innerHTML = deg;
    console.log(deg)
  
  }
})