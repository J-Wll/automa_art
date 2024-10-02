
let c2 = 255;
let c1 = 0;
let length = 250;
let moveOffset = 20;
let increment = 0;
let run_count = 0;
let ran2 = 0;
let ran3 = 0;
let ranfactor = 1;
let runtime = 300 // 300 actual value higher for testing
let opacity = 0.6
let ofst = 0.5
let decrease = true;
let triHeightFactor = 1;
// TODO: Make moving a checkbox
let moving = true;

const canvas = document.querySelector('.my_canvas');
const width = canvas.width = window.innerWidth - 500;
const height = canvas.height = window.innerHeight - 100;
const ctx = canvas.getContext('2d');

runtimeSlider = document.querySelector("#sld_runtime");
runtimeSlider.value = runtime;
runtimeSlider.onchange = function () {
  runtime = this.value;
}

opacitySlider = document.querySelector("#sld_opacity");
opacitySlider.value = opacity;
opacitySlider.onchange = function () {
  opacity = this.value;
}

ranfactorSlider = document.querySelector("#sld_randomization");
ranfactorSlider.value = ranfactor;
ranfactorSlider.onchange = function () {
  ranfactor = this.value;
  increment = Math.floor(Math.random() * (1.5 * ranfactor)) + 1;
  ran2 = Math.floor(Math.random() * (3 * ranfactor)) + 1;
  ran3 = Math.floor(Math.random() * (50 * ranfactor)) + 1;
}

triSlider = document.querySelector("#sld_triheight");
triSlider.value = triHeightFactor;
triSlider.onchange = function () {
  triHeightFactor = this.value;
}

function degToRad(degrees) {
  return degrees * Math.PI / 160;
}

function canvasReset() {
  ctx.reset()
  run_count = 0;
  c2 = 255;
  c1 = 0;
  length = 250;
  moveOffset = 20;
  increment = 0;
  ofst = 0.5;
  ran2 = 0;
  ran3 = 0;
  decrease = true;

  ctx.translate(width / 2, height / 2);
  ctx.fillStyle = 'rgb(40,40,40)';
  ctx.fillRect(0, 0, width, height);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  increment += Math.floor(Math.random() * (1.5 * ranfactor)) + 1;
  ran2 += Math.floor(Math.random() * (3 * ranfactor)) + 1;
  ran3 += Math.floor(Math.random() * (50 * ranfactor)) + 1;

  gen()
}

function gen() {
  run_count += 1

  const triHeight = (length / 2 * Math.tan(degToRad(60)) * triHeightFactor);
  ofst = 0.5
  // this toggle replaces gen2
  if (moving) {
    ofst += increment / 2
    moveOffset += ofst;
  }
  ctx.fillStyle = `rgba(${c1}, 100, ${c2}, ${opacity})`
  ctx.beginPath();
  ctx.moveTo(moveOffset, moveOffset);
  ctx.lineTo(moveOffset + length, moveOffset);
  ctx.lineTo(moveOffset + (length / 2), moveOffset + triHeight);
  ctx.lineTo(moveOffset, moveOffset);
  ctx.fill();

  ctx.rotate(degToRad(ran3));

  // this system stops the triangles from becoming insanely large because its not interesting to have the whole screen be a triangle 
  if (decrease) {
    length -= ran2;
  } else {
    length += ran2;
  }

  if (length < -400) {
    decrease = false;
  }
  if (length > 400) {
    decrease = true;
  }

  if (c1 >= 150) {
    c1 -= 200;
    c2 += 200;
  }
  else {
    c1 += 200;
    c2 -= 200;
  }

  if (run_count >= runtime) {
    setTimeout(() => {
      canvasReset();
    }, 500)
  }
  else {
    window.requestAnimationFrame(gen)
    console.log(triHeight, c1, c2, opacity, moveOffset, length, ofst, "AAA", increment, ranfactor, ran2, ran3, run_count)
  }

}

canvasReset();
gen();

