// Setting up the canvas - size, setting a background, and getting the image data(all of the pixels) of the canvas.
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasData = ctx.createImageData(canvas.width, canvas.height);

//Event listeners that set the canvas size to that of the window when the page loads, and each time the user resizes the window
window.addEventListener("load", windowResize);
window.addEventListener("resize", windowResize);

function windowResize(){
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}

//A function that manipulates the array of pixel colour data created above using createImageData()
function setPixel(x, y, r, g, b, a){
  var index = (x + y * canvasData.width) * 4;

  canvasData.data[index] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

window.requestAnimationFrame(mainLoop);

function mainLoop(){
  // Looping through all the colour data and changing each pixel to a random colour at a random coordinate, using the setPixel function defined earlier
  for(i = 0; i < canvasData.data.length / 4; i++){
    var red = Math.floor(Math.random()* 60);
    var green = Math.floor(Math.random()* 60);
    var blue = Math.floor(Math.random()* 60);
    var randX = Math.floor(Math.random()*canvas.width);
    var randY = Math.floor(Math.random()*canvas.height);

    setPixel(randX, randY, red, green, blue, 255);
  }

  //Place the image data we created and manipulated onto the canvas
  ctx.putImageData(canvasData, 0, 0);

  //And then do it all again...
  window.requestAnimationFrame(mainLoop);
}
