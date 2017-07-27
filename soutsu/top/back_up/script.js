'use scrict';

$(window).load(function(){
  $('#load').fadeOut(300);
  
  setTimeout(function() {
    $(".profile").addClass('animated');
    $(".jello").addClass('animated');
    
  }, 300);

});

$(function () {
/* =============================
  window size
================================*/
  var getScreenWidth = function() {
      if (window.innerWidth) {
          return window.innerWidth;
      } else if (document.documentElement && document.documentElement.clientWidth !== 0) {
          return document.documentElement.clientWidth;
      } else if (document.body) {
          return document.body.clientWidth;
      }
      return 0;
  };

/* =============================
  Size fit
================================*/
  var currentWidth = window.innerWidth;
  window.addEventListener("resize", function() {
      if (currentWidth == window.innerWidth) {
          // ウインドウ横幅が変わっていないため処理をキャンセル。
          return;
      }
      // ウインドウ横幅が変わったのでリサイズと見なす。
      // 横幅を更新
      currentWidth = window.innerWidth;
      sizing();
  });
  function sizing(){
    var pageHeight = $(window).height();
    var pageWidth = $(window).width();
    var $canvas = $("#home");
    $canvas.css({"height":pageHeight});
    $canvas.css({"width":pageWidth});
  } sizing();

  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    //touch device
    $("figcaption").each(function(){
     $(this).bind('touchstart',function(){
      $(this).attr("touchMove","no");
     });
     $(this).bind('touchmove', function() {
       $(this).attr("touchMove","yes");
     });
     $(this).bind('touchend', function() {
      if($(this).attr("touchmove")!== "yes"){
        var link = $(this).find("a").attr("href");
        window.location.href = link;
      }
     });
    });
  }else{
    //pc
    $("figcaption").on("click",function(){
      var link = $(this).find("a").attr("href");
      window.location.href = link;
    });
  }

});