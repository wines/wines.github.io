"use scrict";$(function(){var c=function(){if(window.innerWidth){return window.innerWidth}else{if(document.documentElement&&document.documentElement.clientWidth!==0){return document.documentElement.clientWidth}else{if(document.body){return document.body.clientWidth}}}return 0};var b=window.innerWidth;window.addEventListener("resize",function(){if(b==window.innerWidth){return}b=window.innerWidth;a()});function a(){var f=$(window).height();var d=$(window).width();var e=$("#home");e.css({height:f});e.css({width:d})}a()});if(navigator.userAgent.indexOf("iPhone")>0||navigator.userAgent.indexOf("iPad")>0||navigator.userAgent.indexOf("iPod")>0||navigator.userAgent.indexOf("Android")>0){$("figcaption").each(function(){$(this).bind("touchstart",function(){$(this).attr("touchMove","no")});$(this).bind("touchmove",function(){$(this).attr("touchMove","yes")});$(this).bind("touchend",function(){if($(this).attr("touchmove")!=="yes"){var a=$(this).find("a").attr("href");window.location.href=a}})})}else{$("figcaption").on("click",function(){var a=$(this).find("a").attr("href");window.location.href=a})}(function(a,b){if(typeof define==="function"&&define.amd){define([],b)}else{if(typeof exports==="object"){module.exports=b()}else{b()}}}(this,function(){var t="";var o=20;var c=true;var n=[];var b=false;var i=true;var e=true;var v=null;var r=true;var g=true;var h=null;var q=true;var d=false;var y=true;var x="en";var p=true;var a=false;var w=null;var f=false;function l(C){if(h===null){var z=C.length;var D=0;var B=document.getElementById(t);var A="<ul>";while(D<z){A+="<li>"+C[D]+"</li>";D++}A+="</ul>";B.innerHTML=A}else{h(C)}}function k(z){return z.replace(/<b[^>]*>(.*?)<\/b>/gi,function(A,B){return B}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function u(B){var z=B.getElementsByTagName("a");for(var A=z.length-1;A>=0;A--){z[A].setAttribute("target","_blank")}}function s(E,F){var z=[];var D=new RegExp("(^| )"+F+"( |$)");var A=E.getElementsByTagName("*");for(var C=0,B=A.length;C<B;C++){if(D.test(A[C].className)){z.push(A[C])}}return z}function j(z){if(z!==undefined&&z.innerHTML.indexOf("data-srcset")>=0){var A=z.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];return decodeURIComponent(A).split('"')[1]}}var m={fetch:function(z){if(z.maxTweets===undefined){z.maxTweets=20}if(z.enableLinks===undefined){z.enableLinks=true}if(z.showUser===undefined){z.showUser=true}if(z.showTime===undefined){z.showTime=true}if(z.dateFunction===undefined){z.dateFunction="default"}if(z.showRetweet===undefined){z.showRetweet=true}if(z.customCallback===undefined){z.customCallback=null}if(z.showInteraction===undefined){z.showInteraction=true}if(z.showImages===undefined){z.showImages=false}if(z.linksInNewWindow===undefined){z.linksInNewWindow=true}if(z.showPermalinks===undefined){z.showPermalinks=true}if(z.dataOnly===undefined){z.dataOnly=false}if(b){n.push(z)}else{b=true;t=z.domId;o=z.maxTweets;c=z.enableLinks;e=z.showUser;i=z.showTime;g=z.showRetweet;v=z.dateFunction;h=z.customCallback;q=z.showInteraction;d=z.showImages;y=z.linksInNewWindow;p=z.showPermalinks;a=z.dataOnly;var A=document.getElementsByTagName("head")[0];if(w!==null){A.removeChild(w)}w=document.createElement("script");w.type="text/javascript";if(z.list!==undefined){w.src="https://syndication.twitter.com/timeline/list?callback=twitterFetcher.callback&dnt=false&list_slug="+z.list.listSlug+"&screen_name="+z.list.screenName+"&suppress_response_codes=true&lang="+(z.lang||x)+"&rnd="+Math.random()}else{if(z.profile!==undefined){w.src="https://syndication.twitter.com/timeline/profile?callback=twitterFetcher.callback&dnt=false&screen_name="+z.profile.screenName+"&suppress_response_codes=true&lang="+(z.lang||x)+"&rnd="+Math.random()}else{if(z.likes!==undefined){w.src="https://syndication.twitter.com/timeline/likes?callback=twitterFetcher.callback&dnt=false&screen_name="+z.likes.screenName+"&suppress_response_codes=true&lang="+(z.lang||x)+"&rnd="+Math.random()}else{w.src="https://cdn.syndication.twimg.com/widgets/timelines/"+z.id+"?&lang="+(z.lang||x)+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+Math.random()}}}A.appendChild(w)}},callback:function(S){S.body=S.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,"");if(!d){S.body=S.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,"")}if(!e){S.body=S.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g,"")}var I=document.createElement("div");I.innerHTML=S.body;if(typeof(I.getElementsByClassName)==="undefined"){r=false}function B(U){var T=U.getElementsByTagName("img")[0];T.src=T.getAttribute("data-src-2x");return U}var J=[];var R=[];var E=[];var F=[];var z=[];var Q=[];var P=[];var D=0;if(r){var N=I.getElementsByClassName("timeline-Tweet");while(D<N.length){if(N[D].getElementsByClassName("timeline-Tweet-retweetCredit").length>0){z.push(true)}else{z.push(false)}if(!z[D]||z[D]&&g){J.push(N[D].getElementsByClassName("timeline-Tweet-text")[0]);Q.push(N[D].getAttribute("data-tweet-id"));if(e){R.push(B(N[D].getElementsByClassName("timeline-Tweet-author")[0]))}E.push(N[D].getElementsByClassName("dt-updated")[0]);P.push(N[D].getElementsByClassName("timeline-Tweet-timestamp")[0]);if(N[D].getElementsByClassName("timeline-Tweet-media")[0]!==undefined){F.push(N[D].getElementsByClassName("timeline-Tweet-media")[0])}else{F.push(undefined)}}D++}}else{var N=s(I,"timeline-Tweet");while(D<N.length){if(s(N[D],"timeline-Tweet-retweetCredit").length>0){z.push(true)}else{z.push(false)}if(!z[D]||z[D]&&g){J.push(s(N[D],"timeline-Tweet-text")[0]);Q.push(N[D].getAttribute("data-tweet-id"));if(e){R.push(B(s(N[D],"timeline-Tweet-author")[0]))}E.push(s(N[D],"dt-updated")[0]);P.push(s(N[D],"timeline-Tweet-timestamp")[0]);if(s(N[D],"timeline-Tweet-media")[0]!==undefined){F.push(s(N[D],"timeline-Tweet-media")[0])}else{F.push(undefined)}}D++}}if(J.length>o){J.splice(o,(J.length-o));R.splice(o,(R.length-o));E.splice(o,(E.length-o));z.splice(o,(z.length-o));F.splice(o,(F.length-o));P.splice(o,(P.length-o))}var M=[];var D=J.length;var K=0;if(a){while(K<D){M.push({tweet:J[K].innerHTML,author:R[K]?R[K].innerHTML:"Unknown Author",time:E[K].textContent,timestamp:E[K].getAttribute("datetime").replace("+0000","Z").replace(/([\+\-])(\d\d)(\d\d)/,"$1$2:$3"),image:j(F[K]),rt:z[K],tid:Q[K],permalinkURL:(P[K]===undefined)?"":P[K].href});K++}}else{while(K<D){if(typeof(v)!=="string"){var H=E[K].getAttribute("datetime");var A=new Date(E[K].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]);var O=v(A,H);E[K].setAttribute("aria-label",O);if(J[K].textContent){if(r){E[K].textContent=O}else{var L=document.createElement("p");var G=document.createTextNode(O);L.appendChild(G);L.setAttribute("aria-label",O);E[K]=L}}else{E[K].textContent=O}}var C="";if(c){if(y){u(J[K]);if(e){u(R[K])}}if(e){C+='<div class="user">'+k(R[K].innerHTML)+"</div>"}C+='<p class="tweet">'+k(J[K].innerHTML)+"</p>";if(i){if(p){C+='<p class="timePosted"><a href="'+P[K]+'">'+E[K].getAttribute("aria-label")+"</a></p>"}else{C+='<p class="timePosted">'+E[K].getAttribute("aria-label")+"</p>"}}}else{if(J[K].textContent){if(e){C+='<p class="user">'+R[K].textContent+"</p>"}C+='<p class="tweet">'+J[K].textContent+"</p>";if(i){C+='<p class="timePosted">'+E[K].textContent+"</p>"}}else{if(e){C+='<p class="user">'+R[K].textContent+"</p>"}C+='<p class="tweet">'+J[K].textContent+"</p>";if(i){C+='<p class="timePosted">'+E[K].textContent+"</p>"}}}if(d&&F[K]!==undefined&&j(F[K])!==undefined){C+='<div class="media"><img src="'+j(F[K])+'" alt="Image from tweet" /></div>'}if(d){M.push(C)}else{if(!d&&J[K].textContent.length){M.push(C)}}K++}}l(M);b=false;if(n.length>0){m.fetch(n[0]);n.splice(0,1)}}};window.twitterFetcher=m;return m}));var configProfile={profile:{screenName:"So_Utsu_M"},domId:"tweet",maxTweets:1,enableLinks:true,showUser:true,showTime:false,showImages:true,lang:"JP"};twitterFetcher.fetch(configProfile);