(function($){
"use strict";
$(function () {

var $body = $('body');
var $spFlag = false;

/*userAgent判定*/
if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  if (window.innerHeight > window.innerWidth) {
    $spFlag = true;
  }
}

var isLandscape = function(){
  if (window.innerHeight > window.innerWidth) {
    $body.addClass("portrait");
    $body.removeClass("landscape");
  }else{
    $body.addClass("landscape");
    $body.removeClass("portrait");
  }
};

/*ランドスケープ*/
if($spFlag){
  $(window).resize(function(){
    isLandscape();
  });
  isLandscape();
}

var timeLine = new TimelineMax();
var elm1 = $("#js-readanim-01");
var elm2 = $("#js-readanim-02");
var elm2_1 = $("#js-readanim-02-1");
var elm2_2 = $("#js-readanim-02-2");
var elm3 = $("#js-readanim-03");
var elm3_1 = $("#js-readanim-03-1");
var elm3_2 = $("#js-readanim-03-2");
var elm4 = $("#js-readanim-04");
var elm4_1 = $("#js-readanim-04-1");
var elm4_2 = $("#js-readanim-04-2");
var elm5 = $("#js-readanim-05");
var elm5_1 = $("#js-readanim-05-1");
var elm5_2 = $("#js-readanim-05-2");
var elm6 = $("#js-readanim-06");
var elm7 = $("#js-readanim-07");
var elm7_1 = $("#js-readanim-07-1");
var elm7_2 = $("#js-readanim-07-2");
var elm7_3 = $("#js-readanim-07-3");
var elm8 = $("#js-readanim-08");
var elm8_1 = $("#js-readanim-08-1");
var elm8_2 = $("#js-readanim-08-2");
var elm9 = $("#js-readanim-09");
var img1 = $("#js-imganim-01");
var img2 = $("#js-imganim-02");
var img3 = $("#js-imganim-03");
var img4 = $("#js-imganim-04");

timeLine.to(elm1, 1, {top: '40%',opacity: '1'})
        .to(elm1, 1, {opacity: '0',delay: 0.8})
        .to(elm2_1, 1, {opacity: '1'})
        .to(elm2_2, 1, {opacity: '1'})
        .to(img1, 1.5, {opacity: '1', rotation:1080})
        .to(elm2, 1, {opacity: '0',delay: 1})
        .to(img2, 1, {opacity: '1', onComplete: function(){img1.addClass('anim');}})
        .to(elm3_1, 1, {opacity: '1'})
        .to(elm3_2, 1, {opacity: '1'})
        .to(elm3, 1, {opacity: '0',delay: 1})
        .to(elm4_1, 1, {opacity: '1'})
        .to(elm4_2, 1, {opacity: '1'})
        .to(elm4, 1, {opacity: '0',delay: 3, onComplete: function(){img1.removeClass('anim');}})
        .to(elm5_1, 1, {opacity: '1'})
        .to(elm5_2, 1, {opacity: '1'})
        .to(elm5, 1, {opacity: '0',delay: 1.5})
        .to(img1, 1, {opacity: '0',delay: 0.5})
        .to(img2, 1, {opacity: '0',delay: 0.5})
        .to(elm6, 1, {top: '15%',opacity: '1'})
        .to(elm6, 1, {opacity: '0'})
        .to(elm6, 1, {top: '25%',opacity: '1'})
        .to(elm6, 1, {opacity: '0'})
        .to(img3, 1, {opacity: '1'})
        .to(elm7_1, 1, {opacity: '1'})
        .to(elm7_2, 1, {opacity: '1'})
        .to(elm7_3, 1, {opacity: '1'})
        .to(elm7, 1, {opacity: '0',delay: 3.5})
        .to(img3, 1, {opacity: '0'})
        .to(img2, 1, {opacity: '1'})
        .to(elm8_1, 1, {opacity: '1'})
        .to(elm8_2, 1, {opacity: '1'})
        .to(elm6, 1, {opacity: '0'})
        .to(elm8, 2, {opacity: '0',delay: 2})
        .to(img2, 2, {opacity: '0', onComplete: 
          function(){
              location.href = '/soutsu/shooting/shooting.html';
            }
        });
});

})(jQuery);