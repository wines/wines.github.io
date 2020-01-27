(function($){
"use strict";
var flag = true;
var COUNT = 0;
var CLICK_COUNT = 0;
var limit = 10;
var $target = $("#js-count");
var $IMG = $("#img");
var $soutsuFace = $('#js-btn'); 
var ROLL_NUMVER = 0;
var GAME_FLAG = false;
var START_FLAG = false;
var levelTxt,levelTxten;
var $url = $("meta[property='og:url']").attr("content");
var $mangaTitle = $("#hgd-manga");
var $GetManga = $("#js-manga");
var $tweetBtn = $("#tweet");
var Tweet = '%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%82%92%e4%bb%8a%e3%81%99%e3%81%90GET%ef%bc%81';

var $gameretry = $('#js-retry');
var $gameover = $('#js-gameover');

var rotation = 0,
    rotationX = 0, 
    rotationY = 0,
    wanderTween, ignoreRollovers;

TweenLite.set($IMG, {transformOrigin:"center center -150px"});
TweenMax.to($IMG, 1.2, {scaleX:0.8, scaleY:0.8, force3D:true, yoyo:true, repeat:-1, ease:Power1.easeInOut});

//sp
$IMG.on('touchstart touchmove touchend',function(event){
  if ('touchstart' == event.type){
    $(this).attr('data-touchstarted', '');
    return;
  }
  if ('touchmove' == event.type){
    $(this).removeAttr('data-touchstarted');
    return;
  }
  if ('undefined' != typeof $(this).attr('data-touchstarted')){
    imgAanimation($(this));
    $(this).removeAttr('data-touchstarted');
    return false;
  }
});
//pc
$IMG.on("click",function(){
  imgAanimation($(this));
});

var imgAanimation = function(img) {
  CLICK_COUNT++;
  if(flag === true && CLICK_COUNT <= 50 ){
      img.removeClass("js-animate2");
      img.addClass("js-animate");
      flag = false;
    }else if(flag === false && CLICK_COUNT <= 50 ){
      img.removeClass("js-animate");
      img.addClass("js-animate2");
      flag = true;
    }else if(flag === true && CLICK_COUNT > 50 ){
      img.removeClass("js-animate");
      img.removeClass("js-animate2");
      if (!ignoreRollovers) {
        rotation += 360;
        ignoreRollovers = true;
        TweenLite.to(img, 2, {rotation:rotation, ease:Elastic.easeOut});
        TweenLite.delayedCall(1, function() {
          ignoreRollovers = false;
        });
      }
      flag = false;
    }else if(flag === false && CLICK_COUNT > 50 ){
      img.removeClass("js-animate");
      img.removeClass("js-animate2");
      rotationX += 360;
      TweenLite.to(img, 2, {rotationX:rotationX, ease:Power2.easeOut});
      flag = true;
    }
};

function countdown($call, $count) {
  $('#count').text($count);
    if($count) {
      setTimeout(function() {
        $count = $count-1;
        countdown($call, $count);
      }, 1000);
    }else{
      GAME_FLAG = true;
      START_FLAG = false;
      $("#level").text(levelTxt);
      $gameover.addClass('block');
      $gameretry.addClass('block');
      $("#ad-box").addClass('block');
      $soutsuFace.hide();

      //manga
      if( 160 < ROLL_NUMVER && ROLL_NUMVER　<= 200 ){
        $GetManga.addClass("block");
        $mangaTitle.find('span').text('『GORIYAKU』');
        $mangaTitle.after('<p><img src="/soutsu/img/img_manga_01.jpg" alt="『GORIYAKU』"></p>');
        Tweet = '%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%80%8eGORIYAKU%e3%80%8fGET%ef%bc%81';
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a'+levelTxten+'%e3%80%80%e2%96%a0%e9%80%a3%e6%89%93%e5%9b%9e%e6%95%b0%ef%bc%9a'+ROLL_NUMVER+'%e3%80%80%e3%81%93%e3%83%b3%e3%81%aa%e3%81%93%e3%81%a8%e3%83%83%e3%81%a6%e2%80%a6%e3%81%81%e3%82%8a%e3%81%87%e3%81%be%e3%81%99%ef%bc%9f+'+Tweet+'+%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86" target="_blank"><i class="fa fa-twitter"></i> 結果をツイート</a>');
      }else if( 200 < ROLL_NUMVER && ROLL_NUMVER　<= 240 ){
        $GetManga.addClass("block");
        $mangaTitle.find('span').text('『ぶっ叩きの刑』');
        $mangaTitle.after('<p><img src="/soutsu/img/img_manga_02.jpg" alt="『ぶっ叩きの刑』"></p>');
        Tweet = '%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%80%8e%e3%81%b6%e3%81%a3%e5%8f%a9%e3%81%8d%e3%81%ae%e5%88%91%e3%80%8fGET%ef%bc%81';
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a'+levelTxten+'%e3%80%80%e2%96%a0%e9%80%a3%e6%89%93%e5%9b%9e%e6%95%b0%ef%bc%9a'+ROLL_NUMVER+'%e3%80%80%e3%81%93%e3%83%b3%e3%81%aa%e3%81%93%e3%81%a8%e3%83%83%e3%81%a6%e2%80%a6%e3%81%81%e3%82%8a%e3%81%87%e3%81%be%e3%81%99%ef%bc%9f+'+Tweet+'+%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86" target="_blank"><i class="fa fa-twitter"></i> 結果をツイート</a>');
      }else if( 240 < ROLL_NUMVER ){
        $GetManga.addClass("block");
        $mangaTitle.find('span').text('『ぼくのアイドル』');
        $mangaTitle.after('<p><img src="/soutsu/img/img_manga_03.jpg" alt="『ぼくのアイドル』"></p>');
        Tweet = '%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%80%8e%e3%81%bc%e3%81%8f%e3%81%ae%e3%82%a2%e3%82%a4%e3%83%89%e3%83%ab%e3%80%8fGET%ef%bc%81';
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a'+levelTxten+'%e3%80%80%e2%96%a0%e9%80%a3%e6%89%93%e5%9b%9e%e6%95%b0%ef%bc%9a'+ROLL_NUMVER+'%e3%80%80%e3%81%93%e3%83%b3%e3%81%aa%e3%81%93%e3%81%a8%e3%83%83%e3%81%a6%e2%80%a6%e3%81%81%e3%82%8a%e3%81%87%e3%81%be%e3%81%99%ef%bc%9f+'+Tweet+'+%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86" target="_blank"><i class="fa fa-twitter"></i> 結果をツイート</a>');
      }else{
        $("#js-no-get").addClass('block');
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a'+levelTxten+'%e3%80%80%e2%96%a0%e9%80%a3%e6%89%93%e5%9b%9e%e6%95%b0%ef%bc%9a'+ROLL_NUMVER+'%e3%80%80%e3%81%93%e3%83%b3%e3%81%aa%e3%81%93%e3%81%a8%e3%83%83%e3%81%a6%e2%80%a6%e3%81%81%e3%82%8a%e3%81%87%e3%81%be%e3%81%99%ef%bc%9f+'+Tweet+'+%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86" target="_blank"><i class="fa fa-twitter"></i> 結果をツイート</a>');
      }

    }
}

//sp
$IMG.on('touchstart touchmove touchend',function(event){
  if ('touchstart' == event.type){
    $(this).attr('data-touchstarted', '');
    return;
  }
  if ('touchmove' == event.type){
    $(this).removeAttr('data-touchstarted');
    return;
  }
  if ('undefined' != typeof $(this).attr('data-touchstarted')){
    startFunc($(this));
    $(this).removeAttr('data-touchstarted');
    return false;
  }
});
//pc
$("#js-start").on("click",function(){
  startFunc($(this));
  return false;
});

var startFunc = function(start){
  start.addClass('block_none');
  $("#btn-area").addClass('block');
  countdown(10,10);
  START_FLAG = true;
};

//sp
$gameretry.on('touchstart touchmove touchend',function(event){
  if ('touchstart' == event.type){
    $(this).attr('data-touchstarted', '');
    return;
  }
  if ('touchmove' == event.type){
    $(this).removeAttr('data-touchstarted');
    return;
  }
  if ('undefined' != typeof $(this).attr('data-touchstarted')){
    gameRetry(($this));
    $(this).removeAttr('data-touchstarted');
    return false;
  }
});
//pc
$gameretry.on("click",function(){
  gameRetry($(this));
  return false;
});

var gameRetry = function(retry) {
  /*
    $("#tweet").find("a").remove();
    retry.removeClass('block');
    $gameover.removeClass('block');
    $("#btn-area").addClass('block');
    ROLL_NUMVER = 0;
    $("#rollnumver").text(ROLL_NUMVER);
    GAME_FLAG = false;
    START_FLAG = true;
    countdown(10,10);
  */
  $('html,body').animate({ scrollTop: 0 },0);
  location.href = "/soutsu/game.html?second";
};

$soutsuFace.on("click touchstart",function(){
  if(GAME_FLAG === false && START_FLAG === true){
    ROLL_NUMVER++;
    $("#rollnumver").text(ROLL_NUMVER);
    if( 0 < ROLL_NUMVER && ROLL_NUMVER <= 10 ){
      levelTxt = "かす";
      levelTxten = encodeURI(levelTxt);
    }else if( 10 < ROLL_NUMVER && ROLL_NUMVER <= 20 ){
      levelTxt = "ぃぼぢ";
      levelTxten = encodeURI(levelTxt);
    }else if( 20 < ROLL_NUMVER && ROLL_NUMVER <= 40 ){
      levelTxt = "ぅンこ";
      levelTxten = encodeURI(levelTxt);
    }else if( 40 < ROLL_NUMVER && ROLL_NUMVER <= 80 ){
      levelTxt = "ふっぅ";
      levelTxten = encodeURI(levelTxt);
    }else if( 80 < ROLL_NUMVER && ROLL_NUMVER <= 120 ){
      levelTxt = "ゎたみ";
      levelTxten = encodeURI(levelTxt);
    }else if( 120 < ROLL_NUMVER && ROLL_NUMVER <= 160 ){
      levelTxt = "ぉっゅ";
      levelTxten = encodeURI(levelTxt);
    }else if( 160 < ROLL_NUMVER && ROLL_NUMVER　<= 200 ){
      levelTxt = "っゎもの";
      levelTxten = encodeURI(levelTxt);
    }else if( 200 < ROLL_NUMVER && ROLL_NUMVER　<= 240 ){
      levelTxt = "きゎみ";
      levelTxten = encodeURI(levelTxt);
    }else if( 240 < ROLL_NUMVER ){
      levelTxt = "まッき";
      levelTxten = encodeURI(levelTxt);
    }
  }
});

$(document).on("click touchstart","#tweet a",function(){
  if(ROLL_NUMVER === 0) {
    alert("きろくねぇ~ぞ、ちゃンとゃれこのゃろ~~~~ なンで…ちょ~せンしてもねぇ~のに、っぃ~としょ~と、してゃがンだこのゃろ~~…ぉまぇのぉくさンの…ぃろンな…ぃろンな…………ぃろンな…むだにすンじゃね~~ぞこら~~~~~ そンなンだから……ぉくさンのぉっゅが…かゎくンだろが~~~ とにも…かくにも…そンなんじゃ…ぁかンのょ  けンこンぃッてき…ちょ~せンしろこら~~~~~~");
    return false;
  }
});


})(jQuery);

