
c2 = 255;
c1 = 0;
let length = 250;
let moveOffset = 20;
let increment = 0;
let run_count = 0;
let ran2 = 0;
let ran3 = 0;
let ranfactor = 1;
let runtime = 300 // 300 actual value higher for testing
let opacity = 0.6

runtimeSlider = document.querySelector("#sld_runtime");
runtimeSlider.value = ranfactor;
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
  increment += Math.floor(Math.random() * (1.5 * ranfactor)) + 1;
  ran2 += Math.floor(Math.random() * (3 * ranfactor)) + 1;
  ran3 += Math.floor(Math.random() * (50 * ranfactor)) + 1;

}
// let runtime = document.querySelector("sld_runtime").value;
// let opacity = document.querySelector("sld_transparency").value;
// let ranfactor = document.querySelector("sld_randomization").value;

// a_runtime.oninput = function() {
//   output.innerHTML = this.value;
// }


increment += Math.floor(Math.random() * (1.5 * ranfactor)) + 1;
ran2 += Math.floor(Math.random() * (3 * ranfactor)) + 1;
ran3 += Math.floor(Math.random() * (50 * ranfactor)) + 1;


// const canvas = document.querySelector('.my_canvas');
// var width = canvas.width = window.innerWidth - 300;
// var height = canvas.height = window.innerHeight - 200;
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'rgb(40,40,40)';
// ctx.fillRect(0, 0, width, height);
// ctx.translate(width / 2, height / 2);

function degToRad(degrees) {
  return degrees * Math.PI / 160;
}




const canvas = document.querySelector('.my_canvas');
const width = canvas.width = window.innerWidth - 500;
const height = canvas.height = window.innerHeight - 100;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(40,40,40)';
ctx.fillRect(0, 0, width, height);
ctx.translate(width / 2, height / 2);

function gen() {
  run_count += 1
  if (run_count >= runtime) { // run_count 300 neat number for just the circle in the middle. 900 decent for second monitor 
    run_count = 0;
    // window.location.href = "gene_one.html"
  }
  let i = 1;
  let ofst = 0.5
  ctx.fillStyle = `rgba(${c1}, 100, ${c2}, ${opacity})`
  ctx.beginPath();
  ctx.moveTo(moveOffset, moveOffset);
  ctx.lineTo(moveOffset + length, moveOffset);
  let triHeight = length / 2 * Math.tan(degToRad(60));
  ctx.lineTo(moveOffset + (length / 2), moveOffset + triHeight);
  ctx.lineTo(moveOffset, moveOffset);
  ctx.fill();
  ofst += increment / 2
  length -= ran2;
  moveOffset += ofst;
  if (c1 >= 150) {
    c1 -= 200;
    c2 += 200;
  }
  else {
    c1 += 200;
    c2 -= 200;
  }
  ctx.rotate(degToRad(ran3));
  window.requestAnimationFrame(gen)
}

gen()

