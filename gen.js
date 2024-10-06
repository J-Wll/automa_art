
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
let decrease = true;
let triHeightFactor = 1;
let moving = false;
// classic colours
let colour1 = 'rgba(200, 100, 55';
let colour2 = 'rgba(0, 100, 255';
let firstColour = true;

const genDiv = document.querySelector('.gen');
const canvas = document.querySelector('.my_canvas');
// client and offset 
let width = canvas.width = genDiv.clientWidth;
let height = canvas.height = genDiv.clientHeight;
const ctx = canvas.getContext('2d');

// html only uses hex, rgb allows for easy opacity control from the slider
function hexToRGB(hex) {
  // https://stackoverflow.com/questions/36697749/html-get-color-in-rgb
  return "rgba(" + hex.match(/[A-Za-z0-9]{2}/g).map(function (v) { return parseInt(v, 16) }).join(",");
}

function RGBToHex(rgb) {
  // chatgippty
  return "#" + rgb.match(/\d+/g).map(function (v) { return ("0" + parseInt(v).toString(16)).slice(-2); }).join("");
}

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

movingBox = document.querySelector("#chk_moving");
movingBox.checked = moving;
movingBox.onclick = function () {
  if (movingBox.checked) {
    console.log("checked")
  }
  moving = this.checked;
}

colourPick1 = document.querySelector("#col_1");
colourPick1.value = RGBToHex(colour1);
colourPick1.onchange = function () {
  colour1 = hexToRGB(this.value)
  console.log(colour1)
}

colourPick2 = document.querySelector("#col_2");
colourPick2.value = RGBToHex(colour2);
colourPick2.onchange = function () {
  colour2 = hexToRGB(this.value)
  console.log(colour2)
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
  ran2 = 0;
  ran3 = 0;
  decrease = true;

  ctx.fillStyle = 'rgb(40,40,40)';
  ctx.fillRect(0, 0, width, height);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  moveOffset += Math.floor(Math.random() * (1.5 * ranfactor)) + 1;
  ran2 += Math.floor(Math.random() * (3 * ranfactor)) + 1;
  ran3 += Math.floor(Math.random() * (50 * ranfactor)) + 1;
  width = canvas.width = ctx.canvas.width = genDiv.offsetWidth;
  height = canvas.height = ctx.canvas.height = genDiv.offsetHeight;
  ctx.translate(width / 2, height / 2);

  gen()
}

function gen() {
  run_count += 1
  const triHeight = (length / 2 * Math.tan(degToRad(60)) * triHeightFactor);

  // this toggle replaces gen2
  if (moving) {
    moveOffset += Math.floor(Math.random() * 5) * (ranfactor) + 1;
    // console.log(moveOffset)
  }

  if (firstColour) {
    ctx.fillStyle = `${colour1}, ${opacity})`
    firstColour = false;
  } else {
    ctx.fillStyle = `${colour2}, ${opacity})`
    firstColour = true;
  }
  // ctx.fillStyle = `rgba(${c1}, 100, ${c2}, ${opacity})`


  ctx.beginPath();
  // ctx.moveTo(moveOffset, moveOffset);

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
    // console.log(triHeight, c1, c2, opacity, moveOffset, length, "AAA", increment, ranfactor, ran2, ran3, run_count)
  }

}

canvasReset();
gen();

