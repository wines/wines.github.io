!function(e){"use strict";e(function(){function a(){var a=e("#game-start-btn");a.addClass("is-block");var i=e("body");createjs.Sound.registerSound("../shooting/common/sound/seishinsekai.mp3","seishin"),createjs.Sound.registerSound("../shooting/common/sound/wani.mp3","wani"),createjs.Sound.registerSound("../shooting/common/sound/gero.mp3","gero"),createjs.Sound.registerSound("../shooting/common/sound/atari.mp3","atari"),a.on("click",function(){return i.hasClass("portrait")?(alert("スマートフォンを横向きにしてください。"),!1):(e("html,body").animate({scrollTop:0},0),t(),e(this).remove(),r(),void 0)})}function t(){var e=createjs.Sound.createInstance("seishin");e.play({loop:-1})}function i(){createjs.Sound.play("gero")}function s(){createjs.Sound.play("atari")}function n(){createjs.Sound.play("wani")}function r(){function a(){var e=new createjs.Bitmap(c.getResult("gero"));i(),e.x=h.x,e.y=h.y,o.addChild(e),g.push(e)}function t(){h.x+=.1*(o.mouseX-h.x),h.y+=.1*(o.mouseY-h.y),u+=1;var e;u%60===0&&(e=w>=50?new createjs.Bitmap(c.getResult("chinko")):w%49===0&&w>0?new createjs.Bitmap(c.getResult("boss")):w%29===0&&w>0?new createjs.Bitmap(c.getResult("yuruawa")):w%23===0&&w>0?new createjs.Bitmap(c.getResult("backin")):w%17===0&&w>0?new createjs.Bitmap(c.getResult("girl")):w%13===0&&w>0?new createjs.Bitmap(c.getResult("unko")):w%11===0&&w>0?new createjs.Bitmap(c.getResult("chinko")):w%7===0&&w>0?new createjs.Bitmap(c.getResult("oji2")):w%5===0&&w>0?new createjs.Bitmap(c.getResult("tori")):w%3===0?new createjs.Bitmap(c.getResult("zonbee")):w%2===0?new createjs.Bitmap(c.getResult("erian")):new createjs.Bitmap(c.getResult("oji")),e.x=l,e.y=m*Math.random(),e.y<95?e.y=100:e.y>284&&(e.y=150),o.addChild(e),d.push(e),w++);for(var a=0;a<g.length;a++)g[a].x+=10,g[a].x>l&&(o.removeChild(g[a]),g.splice(a,1));for(var a=0;a<d.length;a++)1e3>=p?d[a].x-=3:2e4>=p?d[a].x-=4:3e4>=p?d[a].x-=5:4e4>=p?d[a].x-=6:5e4>p?d[a].x-=7:p>=5e4&&6e4>=p?d[a].x-=10:d[a].x-=20,d[a].x<0&&r();for(var t=0;t<d.length;t++)for(var a=0;a<g.length;a++){var i=g[a],e=d[t],n=i.localToLocal(0,0,e);if(e.hitTest(n.x,n.y)===!0){o.removeChild(i),g.splice(a,1),o.removeChild(d[t]),d.splice(t,1),s(),p+=1e3,v.text=String("躁鬱レベル："+p+" ポイント");break}}o.update()}function r(){n(),createjs.Ticker.removeAllEventListeners(),o.removeAllEventListeners(),e("#myCanvas").remove(),e("#js-box-ex").remove();var a=e("meta[property='og:url']").attr("content");p>=5e4?e("#wrap").append('<div id="game-over"><p class="end-game">GAME OVER</p><p class="level">躁鬱くんは<br><span>'+p+' </span>錠のおクスリを飲み、<br>見事に精神を更なる次元へと昇華させたのです…</p><p class="last-msg"><span class="get-manga"><img src="/soutsu/shooting/img/manga.jpg" alt=""><br><span>マンガGET!!</span></span></p></div><div id="tweet"><a href="http://twitter.com/intent/tweet?original_referer='+a+"&amp;url="+a+"&amp;text=%e3%80%8e%e3%81%89%e3%81%8f%e3%81%95%e3%83%b3%e2%80%a6%e3%81%83%e3%83%83%e3%81%b1%e3%81%83%e2%80%a6%e3%81%af%e3%81%8d%e3%81%be%e3%81%97%e3%81%9f%e3%81%ad%e2%80%a6%e3%80%8f%20%e3%82%b9%e3%82%b3%e3%82%a2%ef%bc%9a"+p+'%e3%80%80%e6%bc%ab%e7%94%bb%e3%82%b2%e3%83%83%e3%83%88%ef%bc%81%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86%e3%80%80%23%e8%ba%81%e9%ac%b1%e3%81%97%e3%82%85%e3%80%9c%e3%81%a6%e3%81%83%e3%82%93%e3%81%90%20"><i class="fa fa-twitter" aria-hidden="true"></i> ツイート</a></div><a href="/soutsu/shooting/shooting.html?sec" id="retry-btn"><i class="fa fa-refresh" aria-hidden="true"></i> リトライ</a>').css({height:"auto"}):e("#wrap").append('<div id="game-over"><p class="end-game">GAME OVER</p><p class="level">躁鬱くんは<br><span>'+p+' </span>錠のおクスリを飲み、死にました。<br>躁鬱くんを殺したのは、他でもないあなたなのです…</p><p class="last-msg"><img src="/soutsu/shooting/img/gameover.png" alt=""><br>Happy end<span>❤</span></p></div><div id="tweet"><a href="http://twitter.com/intent/tweet?original_referer='+a+"&amp;url="+a+"&amp;text=%e3%80%8e%e3%81%89%e3%81%8f%e3%81%95%e3%83%b3%e2%80%a6%e3%81%83%e3%83%83%e3%81%b1%e3%81%83%e2%80%a6%e3%81%af%e3%81%8d%e3%81%be%e3%81%97%e3%81%9f%e3%81%ad%e2%80%a6%e3%80%8f%20%e3%82%b9%e3%82%b3%e3%82%a2%ef%bc%9a"+p+'%e3%80%80%e6%bc%ab%e7%94%bb%e3%82%b2%e3%83%83%e3%83%88%e3%81%aa%e3%82%89%e3%81%9a%ef%bc%81%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86%e3%80%80%23%e8%ba%81%e9%ac%b1%e3%81%97%e3%82%85%e3%80%9c%e3%81%a6%e3%81%83%e3%82%93%e3%81%90%20"><i class="fa fa-twitter" aria-hidden="true"></i> ツイート</a></div><a href="/soutsu/shooting/shooting.html?sec" id="retry-btn"><i class="fa fa-refresh" aria-hidden="true"></i> リトライ</a>').css({height:"auto"}),e("#game-over").addClass("bounce"),e("#js-ad").addClass("wrap")}var o=new createjs.Stage("myCanvas"),d=[],g=[],u=0,p=0,l=667,m=330,h=new createjs.Bitmap(c.getResult("soutsukun"));h.scaleX=.5,h.scaleY=.5;var b=h.getBounds().width/2,f=h.getBounds().height/2;h.x=b,h.y=f,h.regX=b,h.regY=f,h.rotation=90,o.addChild(h);var v=new createjs.Text("躁鬱レベル：","20px sans-serif","white");v.x=20,v.y=300,o.addChild(v),createjs.Touch.isSupported()&&createjs.Touch.enable(o),o.addEventListener("click",a),createjs.Ticker.setFPS(60),createjs.Ticker.addEventListener("tick",t);var w=0}var o=[{id:"soutsukun",src:"../shooting/img/index.png"},{id:"gero",src:"../shooting/img/gero.png"},{id:"boss",src:"../shooting/img/boss.png"},{id:"girl",src:"../shooting/img/girl.png"},{id:"unko",src:"../shooting/img/unko.png"},{id:"chinko",src:"../shooting/img/chinko.png"},{id:"tori",src:"../shooting/img/tori.png"},{id:"zonbee",src:"../shooting/img/zonbee.png"},{id:"erian",src:"../shooting/img/erian.png"},{id:"oji",src:"../shooting/img/oji.png"},{id:"yuruawa",src:"../shooting/img/yuruawa.png"},{id:"oji2",src:"../shooting/img/oji2.png"},{id:"backin",src:"../shooting/img/backin.png"}],c=new createjs.LoadQueue;c.setMaxConnections(10),c.loadManifest(o,!0),c.on("complete",a);var d=!1;(navigator.userAgent.indexOf("iPhone")>0||navigator.userAgent.indexOf("iPad")>0||navigator.userAgent.indexOf("iPod")>0||navigator.userAgent.indexOf("Android")>0)&&(d=!0);var g=function(){if(d){if(!(window.innerHeight>window.innerWidth))return e("body").addClass("landscape"),e("body").removeClass("portrait"),!1;e("body").addClass("portrait"),e("body").removeClass("landscape")}};e(window).resize(function(){g()}),g()})}(jQuery);