$(function(){"use scrict";function e(){var e=$("#obs-ca"),t=$("#wrap-canvas");e.attr({height:t.height()}),e.attr({width:t.width()})}function t(){testTimer=setInterval(function(){var e,t,r,o,a,l=Math.ceil(25*Math.random()),m=Math.ceil(25*Math.random()),u=Math.ceil(25*Math.random()),v="rgb("+l+","+m+","+u+")",W=150;for(e={x:Math.random()*c,y:Math.random()*w},i=0;i<h.length;i+=1)t=h[i],r=t.x-e.x,o=t.y-e.y,a=Math.sqrt(r*r+o*o),W>a&&(d.beginPath(),d.lineWidth=1-a/W,d.moveTo(e.x,e.y),d.lineTo(t.x,t.y),d.strokeStyle=v,d.stroke(),d.shadowColor=v,d.shadowBlur=150);h.push(e),s++,n()>640?s>500&&clearInterval(testTimer):s>250&&clearInterval(testTimer)},62.5)}window.sr=ScrollReveal(),sr.reveal(".js-scroll-01"),sr.reveal(".js-scroll-02"),sr.reveal(".js-scroll-03"),sr.reveal(".js-scroll-04"),sr.reveal(".js-scroll-05"),sr.reveal(".js-scroll-06");var n=function(){return window.innerWidth?window.innerWidth:document.documentElement&&0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body?document.body.clientWidth:0},r=window.innerWidth;window.addEventListener("resize",function(){r!=window.innerWidth&&(r=window.innerWidth,e())}),e();var i,o,d,a,l,h=[],s=0;o=$("#obs-ca")[0],d=o.getContext("2d"),a=o.width,l=o.height;var c=window.innerWidth,w=window.innerHeight;o.width=c,o.height=w,t()});