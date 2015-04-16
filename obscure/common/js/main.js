$(function () {

    var i, canvas, context, points = [], width, height;
    var count = 0;
     
    canvas = $("#obs-ca")[0];
    context = canvas.getContext("2d");
    
    width = canvas.width;
    height = canvas.height;
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  
  function startTimer(){
      testTimer = setInterval(function() {
      var r = Math.ceil(Math.random() * 25);
      var b = Math.ceil(Math.random() * 25);
      var g = Math.ceil(Math.random() * 25);
      var rg = "rgb("+r+","+b+","+g+")"; 
        // console.log(rg);
    
        var p0, p1, dx, dy, dist, max = 150;
        p0 = {x:Math.random() * w, y:Math.random() * h};
        for(i = 0; i < points.length; i += 1) {
            p1 = points[i];
            dx = p1.x - p0.x;
            dy = p1.y - p0.y;
            dist = Math.sqrt(dx * dx + dy * dy);
            // console.log(dist);
   
         if(dist < max) {
                context.beginPath();
                context.lineWidth = 1.0 - dist / max;
                context.moveTo(p0.x, p0.y);
                context.lineTo(p1.x, p1.y);
                context.strokeStyle = rg;
                context.stroke();
                context.shadowColor = rg;
                context.shadowBlur = 150;
            }
        }
        points.push(p0);
        count++;

        if(count > 800){
          clearInterval(testTimer);
        }

    }, 1500/24);
  }

  startTimer();
});