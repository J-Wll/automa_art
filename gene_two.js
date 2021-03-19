function degToRad(degrees) {
    return degrees * Math.PI / 160;}

let run_count2 = 0;
  function loop() {   
  c2 = 255;
  c1 = 0;
  let length = 200;
  let moveOffset = 20;
  let increment = 0;
  let run_count = 0;

  let ran2 = 0 ;
  let ran3 = 0;
  let ranfactor = 1;
  let i = 1;
  let ofst = 0.5
  increment = Math.floor(Math.random() * (1.5*ranfactor)) + 2;
  ran2 = Math.floor(Math.random() * (3*ranfactor)) + 2;
  ran3 = Math.floor(Math.random() * (50*ranfactor)) + 2;
  let canvas = document.querySelector('.my_canvas');
  let width = canvas.width = window.innerWidth - 300;
  let height = canvas.height = window.innerHeight-200;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(40,40,40)';
  ctx.clearRect(0,0,width,height);
  ctx.translate(width/2, height/2);
  run_count2 += 1;

  if (run_count2 >= 7){
    run_count2=0
    window.location.href = "gene_two.html"
  } 
  gen()
       function gen() {
        run_count += 1
        if (run_count >= 300) { // run_count 300 neat number for just the circle in the middle. 900 decent for second monitor
                run_count = 0;
                loop();
                }
            ctx.fillStyle = `rgba(${c1}, 100, ${c2}, 0.4)`
            ctx.beginPath();
            ctx.moveTo(moveOffset,moveOffset);
            ctx.lineTo(moveOffset+length,moveOffset);
            let triHeight = length/2 * Math.tan(degToRad(60));
            ctx.lineTo(moveOffset+(length/2),moveOffset+triHeight);
            ctx.lineTo(moveOffset,moveOffset+ran2);
            ctx.fill();
            if (c1 >= 150){
              c1 -= 100;
              c2 += 100;}
            else {
              c1 += 100;
              c2 -= 100;}
            ctx.rotate(degToRad(ran3));
            window.requestAnimationFrame(gen);}}
            
  loop();
  