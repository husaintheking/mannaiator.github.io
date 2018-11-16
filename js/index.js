var flag=false;

function changeColorDot(x){
  var y = "dot" + x;
  document.getElementById(y).classList.toggle("clicked");
  flag=!flag;
  console.log(flag);
}

var c1 = new AudioContext();
function createOscillator1(oscType)
{
  var osc1= c1.createOscillator();
  var g1 = c1.createGain();
  g1.gain.value=0.1;
  osc1.type="square";
  osc1.connect(g1);
  g1.connect(c1.destination);
  osc1.start();
}

var genDeg=0;

let spinner = document.getElementById('vol1');
    //feedback = document.getElementById('feedback')
let x,
    y,
    deg = genDeg,
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
    deg=Math.abs(deg%360);
    spinner.style.transform = `translateY(-50%) rotate(${deg}deg)`
    //feedback.innerHTML = deg;
    console.log(genDeg)
    genDeg=deg;
  }
})