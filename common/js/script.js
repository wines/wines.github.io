/* jRumble v1.3 - http://jackrugile.com/jrumble - MIT License */
(function(f){f.fn.jrumble=function(g){var a=f.extend({x:2,y:2,rotation:1,speed:15,opacity:false,opacityMin:0.5},g);return this.each(function(){var b=f(this),h=a.x*2,i=a.y*2,k=a.rotation*2,g=a.speed===0?1:a.speed,m=a.opacity,n=a.opacityMin,l,j,o=function(){var e=Math.floor(Math.random()*(h+1))-h/2,a=Math.floor(Math.random()*(i+1))-i/2,c=Math.floor(Math.random()*(k+1))-k/2,d=m?Math.random()+n:1,e=e===0&&h!==0?Math.random()<0.5?1:-1:e,a=a===0&&i!==0?Math.random()<0.5?1:-1:a;b.css("display")==="inline"&&(l=true,b.css("display","inline-block"));b.css({position:"relative",left:e+"px",top:a+"px","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity="+d*100+")",filter:"alpha(opacity="+d*100+")","-moz-opacity":d,"-khtml-opacity":d,opacity:d,"-webkit-transform":"rotate("+c+"deg)","-moz-transform":"rotate("+c+"deg)","-ms-transform":"rotate("+c+"deg)","-o-transform":"rotate("+c+"deg)",transform:"rotate("+c+"deg)"})},p={left:0,top:0,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",filter:"alpha(opacity=100)","-moz-opacity":1,"-khtml-opacity":1,opacity:1,"-webkit-transform":"rotate(0deg)","-moz-transform":"rotate(0deg)","-ms-transform":"rotate(0deg)","-o-transform":"rotate(0deg)",transform:"rotate(0deg)"};b.bind({startRumble:function(a){a.stopPropagation();clearInterval(j);j=setInterval(o,g)},stopRumble:function(a){a.stopPropagation();clearInterval(j);l&&b.css("display","inline");b.css(p)}})})}})(jQuery);

/*-------------------------------------------
jRumble
-------------------------------------------*/
$(function() {
  $('#num1, #num2, #num3, #num4, #num5, #num6, #num7, #num8, #num9, #num10, #num11, #num12, #num13, #num14, #num15, #num16, #num17, #num18, #num19, #num20, #num21, #num22, #num23, #num24, #num25, #num26, #num27, #num28, #num29, #num30, #num31, #num32, #num33, #num34, #num35, #num36, #num37, #num38, #num39, #num40').jrumble();
  var demoTimeout;
  $('#num1, #num2, #num3, #num4, #num5, #num6, #num7, #num8, #num9, #num10, #num11, #num12, #num13, #num14, #num15, #num16, #num17, #num18, #num19, #num20, #num21, #num22, #num23, #num24, #num25, #num26, #num27, #num28, #num29, #num30, #num31, #num32, #num33, #num34, #num35, #num36, #num37, #num38, #num39, #num40').bind({
    'touchstart mousedown': function(e) {
    //e.preventDefault();
    $this = $(this);
    clearTimeout(demoTimeout);
    $this.trigger('startRumble');
    demoTimeout = setTimeout(function(){$this.trigger('stopRumble');}, 1500);
  }});

  $('#num15').bind({
    'touchstart mousedown': function(e) {
      alert("当たりです!!!!おめでとうございます!!!!!さすがですね!!!!!良く発見できましたね。。すごいです。信じられないです。これから運気バンバン上がりますよ!!!きっと。");
    }});

});

/*-------------------------------------------
各種SNS
-------------------------------------------*/

/* DOMの読み込み完了後に処理 */
if(window.addEventListener) {
  window.addEventListener( "load" , shareButtonReadSyncer, false );
}else{
  window.attachEvent( "onload", shareButtonReadSyncer );
}

/* シェアボタンを読み込む関数 */
function shareButtonReadSyncer(){
//Twitter
window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));

//Facebook
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Google+
var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.src = "https://apis.google.com/js/platform.js";
scriptTag.async = true;
document.getElementsByTagName("head")[0].appendChild(scriptTag);

//はてなブックマーク
var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript"
scriptTag.src = "https://b.st-hatena.com/js/bookmark_button.js";
scriptTag.async = true;
document.getElementsByTagName("head")[0].appendChild(scriptTag);

//pocket
(!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js"));
}

/*-------------------------------------------
Parallax
-------------------------------------------*/
$('#page-wrap').mousemove(function(e) {
    var x = (e.pageX * -1 / 5), y = (e.pageY * -1 / 5);
    $(this).css('background-position', x + 'px ' + y + 'px');
});

/*-------------------------------------------
GA
-------------------------------------------*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-60936625-1', 'auto');
ga('send', 'pageview');