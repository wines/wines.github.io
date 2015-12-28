(function($){

var flag = true;
var COUNT = 0;
var limit = 10;
var $target = $("#js-count");
var $IMG = $("#img");
var ROLL_NUMVER = 0;
var GAME_FLAG = false;
var START_FLAG = false;
var levelTxt,levelTxten;
var $url = $("meta[property='og:url']").attr("content");

var $gameretry = $('#js-retry');
var $gameover = $('#js-gameover');

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
  if(flag === true){
      img.removeClass("js-animate2");
      img.addClass("js-animate");
      flag = false;
    }else if(flag === false){
      img.removeClass("js-animate");
      img.addClass("js-animate2");
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
      $("#tweet").append('<a href="http://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a'+levelTxten+'%e2%96%a0%e9%80%a3%e6%89%93%e5%9b%9e%e6%95%b0%ef%bc%9a'+ROLL_NUMVER+'%e5%9b%9e%e3%81%93%e3%82%93%e3%81%aa%e3%81%93%e3%81%a8%e3%81%a3%e3%81%a6%e3%81%82%e3%82%8a%e3%81%88%e3%81%be%e3%81%99%ef%bc%9f%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86" target="_blank"><i class="fa fa-twitter"></i> 結果をツイート</a>');
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
  $("#tweet").find("a").remove();
  retry.removeClass('block');
  $gameover.removeClass('block');
  $("#btn-area").addClass('block');
  ROLL_NUMVER = 0;
  $("#rollnumver").text(ROLL_NUMVER);
  GAME_FLAG = false;
  START_FLAG = true;
  countdown(10,10);
};

$('#js-btn').on("click touchstart",function(){
  if(GAME_FLAG === false && START_FLAG === true){
    ROLL_NUMVER++;
    $("#rollnumver").text(ROLL_NUMVER);
    if( 0 < ROLL_NUMVER && ROLL_NUMVER <= 10 ){
      levelTxt = "かす";
      levelTxten = "%e3%82%ab%e3%82%b9";
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
    }else{
      levelTxt = "ぉっゅ";
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

