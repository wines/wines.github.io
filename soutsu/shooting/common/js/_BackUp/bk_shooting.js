(function($){
"use strict";
$(function () {

  // 画像を読み込み。
  var manifest = [
      {id:"soutsukun", src:"../shooting/img/index.png"},
      {id:"gero", src:"../shooting/img/gero.png"},
      {id:"boss", src:"../shooting/img/boss.png"},
      {id:"girl", src:"../shooting/img/girl.png"},
      {id:"unko", src:"../shooting/img/unko.png"},
      {id:"chinko", src:"../shooting/img/chinko.png"},
      {id:"tori", src:"../shooting/img/tori.png"},
      {id:"zonbee", src:"../shooting/img/zonbee.png"},
      {id:"erian", src:"../shooting/img/erian.png"},
      {id:"oji", src:"../shooting/img/oji.png"},
      {id:"yuruawa", src:"../shooting/img/yuruawa.png"},
      {id:"oji2", src:"../shooting/img/oji2.png"},
      {id:"backin", src:"../shooting/img/backin.png"}
  ];

  // PreloadJSのインスタンスを作成します。
  // 引数falseは、XHR2を使うか否かの指定。Android4でも動かしたい場合にはfalseを指定する。
  var loader = new createjs.LoadQueue();

  // 同時にファイルを読み込む
  loader.setMaxConnections(10);

  // 第2引数はロードを始めるか否か
  loader.loadManifest(manifest, true);

  // すべて読み込みが終わったタイミングで発火
  //loader.on("complete", init);
  loader.on("complete", start);

  function start(){
    var $startBtn = $("#game-start-btn");
    $startBtn.addClass('is-block');
    var $body = $('body');
    createjs.Sound.registerSound("../shooting/common/sound/seishinsekai.mp3","seishin");
    createjs.Sound.registerSound("../shooting/common/sound/wani.mp3","wani");
    createjs.Sound.registerSound("../shooting/common/sound/gero.mp3","gero");
    createjs.Sound.registerSound("../shooting/common/sound/atari.mp3","atari");

    $startBtn.on('click',function(){
      if($body.hasClass('portrait')){
        alert("スマートフォンを横向きにしてください。");
        return false;
      }else{
        backSound();
        $(this).remove();
        init();
      }
    });
  }

  function backSound(){
    //back music
    var soundInstance = createjs.Sound.createInstance("seishin");
    //var instance = createjs.Sound.play("seishin", {loop:-1});
    soundInstance.play({loop:-1});
  }

  function pauseMusic(){
    var soundInstance = createjs.Sound.createInstance("seishin");
    soundInstance.pause();
  }

  function geroSound(){
    //効果音1
    createjs.Sound.play("gero");
  }

  function atariSound(){
    //効果音2
    createjs.Sound.play("atari");
  }

  function waniSound(){
    //ワニ
    createjs.Sound.play("wani");
  }

  function init() {
    var stage = new createjs.Stage("myCanvas");
    var enemyList = []; // 敵の配列
    var bulletList = []; // 発射弾の配列
    var count = 0; // フレーム番号
    var scoreNum = 0; // スコア
    var STAGE_W = 667; // 画面サイズ
    var STAGE_H = 330;
    
    // 躁鬱くんを生成
    var player = new createjs.Bitmap(loader.getResult("soutsukun"));

    // 1/2　表示 高解像度対応
    player.scaleX = 0.5;
    player.scaleY = 0.5;

    // Bitmapオブジェクトの中心座標を取得
    var plx = player.getBounds().width / 2;
    var ply = player.getBounds().height / 2;

    // Bitmapオブジェクトの基準点を画像の中心に設定
    player.x = plx;
    player.y = ply;
    player.regX = plx;
    player.regY = ply;

    // Bitmapオブジェクトを90度回転
    player.rotation = 90;

    stage.addChild(player);

    // スコア欄を作成
    var score = new createjs.Text("躁鬱レベル：", "20px sans-serif", "white");
    score.x = 20;
    score.y = 300;
    stage.addChild(score);
    // タッチ操作も可能にする(iOS,Android向け)
    if (createjs.Touch.isSupported()) {
      createjs.Touch.enable(stage);
    }
    // マウスイベントの登録
    stage.addEventListener("click", handleClick);
    // tick イベントの登録
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
    // クリックした時の処理
    function handleClick(event) {
      //ゲロ生成
      var bullet = new createjs.Bitmap(loader.getResult("gero"));
      //効果音
      geroSound();
      bullet.x = player.x;
      bullet.y = player.y;
      stage.addChild(bullet); // 画面に表示
      bulletList.push(bullet); // 配列に保存
    }

    var enemyCount = 0;

    // tick イベントの処理
    function handleTick() {
      // 自機をマウス座標まで移動させる(減速で移動)
      player.x += (stage.mouseX - player.x) * 0.1;
      player.y += (stage.mouseY - player.y) * 0.1;
      // フレーム番号を更新(インクリメント)
      count = count + 1;
      var enemy;
      
      // 60フレームに1回、敵を生成
      if (count % 60 === 0) {
        if(enemyCount % 100 === 0 && enemyCount > 0){
          /*ボス*/
          enemy = new createjs.Bitmap(loader.getResult("boss"));
        }else if(enemyCount % 53 === 0 && enemyCount > 0){
          /*ゆるあわ*/
          enemy = new createjs.Bitmap(loader.getResult("yuruawa"));
        }else if(enemyCount % 23 === 0 && enemyCount > 0){
          /*バック*/
          enemy = new createjs.Bitmap(loader.getResult("backin"));
        }else if(enemyCount % 17 === 0 && enemyCount > 0){
          /*少女*/
          enemy = new createjs.Bitmap(loader.getResult("girl"));
        }else if(enemyCount % 13 === 0 && enemyCount > 0){
          /*うんこ*/
          enemy = new createjs.Bitmap(loader.getResult("unko"));
        }else if(enemyCount % 11 === 0　&& enemyCount > 0){
          /*ちんこ*/
          enemy = new createjs.Bitmap(loader.getResult("chinko"));
        }else if(enemyCount % 7 === 0　&& enemyCount > 0){
          /*お願いおじさん*/
          enemy = new createjs.Bitmap(loader.getResult("oji2"));
        }else if(enemyCount % 5 === 0　&& enemyCount > 0){
          /*トリ*/
          enemy = new createjs.Bitmap(loader.getResult("tori"));
        }else if(enemyCount % 3 === 0){
          /*ゾンビっぽいやつ*/
          enemy = new createjs.Bitmap(loader.getResult("zonbee"));
        }else if(enemyCount % 2 === 0){
          /*エイリアン*/
          enemy = new createjs.Bitmap(loader.getResult("erian"));
        }else{
          /*こげたおじさん*/
          enemy = new createjs.Bitmap(loader.getResult("oji"));
        }
        
        enemy.x = STAGE_W;
        enemy.y = STAGE_H * Math.random();

        /*上下 50pxには敵を出さない*/
        if(enemy.y < 95) {
          enemy.y = 100;
        }else if(enemy.y > 284){
          enemy.y = 150;
        }

        stage.addChild(enemy); // 画面に表示
        enemyList.push(enemy); // 配列に保存

        enemyCount++;
     }

      // 発射弾の移動処理
      for (var i = 0; i < bulletList.length; i++) {
        bulletList[i].x += 10;
        // 画面端まで移動したら
        if (bulletList[i].x > STAGE_W) {
          stage.removeChild(bulletList[i]); // 画面から削除
          bulletList.splice(i, 1); // 配列から削除
        }
      }
      // 敵の移動処理
      for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].x -= 2;
        // 画面端まで移動したら
        if (enemyList[i].x < 0) {
          showGameOver(); // ゲームオーバー処理へ
        }
      }
      // 発射弾と敵の当たり判定
      for (var j = 0; j < enemyList.length; j++) {
        for (var i = 0; i < bulletList.length; i++) {
          var bullet = bulletList[i];
          var enemy = enemyList[j];
          // 敵から見た発射弾のローカル座標を取得
          var pt = bullet.localToLocal(0, 0, enemy);

          // 当たり判定を行う
          if (enemy.hitTest(pt.x, pt.y) === true) {
            // 発射弾の削除
            stage.removeChild(bullet);
            bulletList.splice(i, 1);
            // 敵の削除
            stage.removeChild(enemyList[j]);
            enemyList.splice(j, 1);
            //効果音
            atariSound();
            // スコアの更新
            scoreNum += 1000;
            score.text = String("躁鬱レベル："+scoreNum+" ポイント");
            break;
          }
        }
      }
      // ステージの更新
      stage.update();
    }
    function showGameOver() {
      // 各種イベントをまとめて解除
      waniSound();

      createjs.Ticker.removeAllEventListeners();
      stage.removeAllEventListeners();
      $("#myCanvas").remove();
      $("#js-box-ex").remove();

      /*tweet*/
      var $url = $("meta[property='og:url']").attr("content");
      $("#wrap").append('<div id="game-over"><p class="end-game">GAME OVER</p><p class="level">躁鬱くんは<br><span>'+ scoreNum + ' </span>錠のおクスリを飲み、死にました。<br>躁鬱くんを殺したのは、他でもないあなたなのです…</p><p class="last-msg"><img src="/soutsu/shooting/img/gameover.png" alt=""><br>Happy end<span>❤</span></p></div><div id="tweet"><a href="http://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text=%e3%80%8e%e3%81%89%e3%81%8f%e3%81%95%e3%83%b3%e2%80%a6%e3%81%83%e3%83%83%e3%81%b1%e3%81%83%e2%80%a6%e3%81%af%e3%81%8d%e3%81%be%e3%81%97%e3%81%9f%e3%81%ad%e2%80%a6%e3%80%8f%20%e3%82%b9%e3%82%b3%e3%82%a2%ef%bc%9a'+ scoreNum +'%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86%e3%80%80%23%e8%ba%81%e9%ac%b1%e3%81%97%e3%82%85%e3%80%9c%e3%81%a6%e3%81%83%e3%83%b3%e3%81%90"><i class="fa fa-twitter" aria-hidden="true"></i> ツイート</a></div><a href="/soutsu/shooting/shooting.html?sec" id="retry-btn"><i class="fa fa-refresh" aria-hidden="true"></i> リトライ</a>').css({"height":"auto"});
      
      $('#game-over').addClass('bounce');
      $('#js-ad').addClass('wrap');
    }
  }

/*横向き判定*/
var spFlag = false;
  /*userAgent判定*/
  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
      spFlag = true;
  }

  var isLandscape = function(){
    if(spFlag){
      if (window.innerHeight > window.innerWidth) {
        $("body").addClass("portrait");
        $("body").removeClass("landscape");
      }else{
        $("body").addClass("landscape");
        $("body").removeClass("portrait");
        return false;
      }
    }
  };

  /*ランドスケープ*/
  $(window).resize(function(){
    isLandscape();
  });isLandscape();


});
})(jQuery);