!function e(t,a,i){function n(o,s){if(!a[o]){if(!t[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var h=a[o]={exports:{}};t[o][0].call(h.exports,function(e){var a=t[o][1][e];return n(a?a:e)},h,h.exports,e,t,a,i)}return a[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)n(i[o]);return n}({1:[function(e,t,a){"use strict";var i=function(){function e(){}return e.prototype.generateShape=function(e){var t=window.particlejs.assets,a=t[e];return new a},e}();a.ShapeGenerator=i},{}],2:[function(e,t,a){"use strict";var i=function(){function e(){this.hue=0,this.hueVariance=0,this.saturation=0,this.saturationVariance=0,this.luminance=0,this.luminanceVariance=0}return e}();a.ColorData=i},{}],3:[function(e,t,a){"use strict";var i=e("./data-color"),n=e("../enum/alpha-curve-type"),r=function(){function e(e){void 0===e&&(e=null),this.bgColor="",this.width=0,this.height=0,this.emitFrequency=0,this.startX=0,this.startXVariance=0,this.startY=0,this.startYVariance=0,this.initialDirection=0,this.initialDirectionVariance=0,this.initialSpeed=0,this.initialSpeedVariance=0,this.friction=0,this.accelerationSpeed=0,this.accelerationDirection=0,this.startScale=0,this.startScaleVariance=0,this.finishScale=0,this.finishScaleVariance=0,this.lifeSpan=0,this.lifeSpanVariance=0,this.startAlpha=0,this.startAlphaVariance=0,this.finishAlpha=0,this.finishAlphaVariance=0,this.shapeIdList=[""],this.startColor=new i.ColorData,this.blendMode=!0,this.alphaCurveType=n.AlphaCurveType.Normal,e&&this.importFromJson(e)}return e.prototype.importFromJson=function(e){var t=function(e){return"width"==e||"height"==e||"bgColor"==e};this.setData(e,t)},e.prototype.importData=function(e){var t=function(e){return"width"==e||"height"==e||"startX"==e||"startY"==e};this.setData(e,t)},e.checkReflectEnable=function(){try{var e=!(!Reflect||!Reflect.has);return e}catch(t){return!1}},e.prototype.setData=function(t,a){if(e.ENABLE_REFLECT){for(var i in t)if(!a(i)&&1==Reflect.has(this,i)){var n=t[i];Reflect.set(this,i,n)}}else{var r=this;for(var i in t)a(i)||this.hasOwnProperty(i)&&(r[i]=t[i])}},e.ENABLE_REFLECT=e.checkReflectEnable(),e}();a.DrawingData=r},{"../enum/alpha-curve-type":5,"./data-color":2}],4:[function(e,t,a){"use strict";var i=function(){function e(){this.assetList=["blur_circle","circle","flower","heart","kirakira","kirakira2","reverse_blur_circle","square","star","star_10","triangle"]}return e}();a.ShapeData=i},{}],5:[function(e,t,a){"use strict";!function(e){e[e.Normal=0]="Normal",e[e.Random=1]="Random"}(a.AlphaCurveType||(a.AlphaCurveType={}));a.AlphaCurveType},{}],6:[function(e,t,a){"use strict";var i=function(){function e(){}return e.BLUR_CIRCLE="blur_circle",e.CIRCLE="circle",e.FLOWER="flower",e.HEART="heart",e.KIRAKIRA="kirakira",e.KIRAKIRA2="kirakira2",e.REVERSE_CIRCLE="reverse_blur_circle",e.SQUARE="square",e.STAR="star",e.STAR_10="star_10",e.TRIANGLE="triangle",e}();a.ShapeType=i},{}],7:[function(e,t,a){"use strict";var i=e("./particle/particle-system"),n=e("./data/data-drawing"),r=e("./data/data-color"),o=e("./data/data-shape"),s=e("./enum/alpha-curve-type"),c=e("./enum/shape-type");window.particlejs=window.effects||{},window.particlejs.ParticleSystem=i.ParticleSystem,window.particlejs.DrawingData=n.DrawingData,window.particlejs.ColorData=r.ColorData,window.particlejs.AlphaCurveType=s.AlphaCurveType,window.particlejs.ShapeType=c.ShapeType,window.particlejs.ShapeData=o.ShapeData},{"./data/data-color":2,"./data/data-drawing":3,"./data/data-shape":4,"./enum/alpha-curve-type":5,"./enum/shape-type":6,"./particle/particle-system":8}],8:[function(e,t,a){"use strict";var i=e("./particle"),n=e("../data/data-drawing"),r=e("../assets/shape-generator"),o=e("../enum/alpha-curve-type"),s=function(){function e(){this._frameCount=0,this._drawingData=new n.DrawingData,this._particlesPool=[],this._activeParticles=[],this.container=new createjs.Container,this.container.mouseChildren=!1,this.container.mouseEnabled=!1,this._playing=!0,this.shapeGenerator=new r.ShapeGenerator}return e.prototype.isPlaying=function(){return this._playing},e.prototype.setData=function(e){this._drawingData=e},e.prototype.importFromJson=function(e){this._drawingData.importFromJson(e)},e.prototype.update=function(){this._playing&&(this.emit(),this.animate(),this.lifeCheck())},e.prototype.animate=function(){for(var e=createjs.Matrix2D.DEG_TO_RAD*this._drawingData.accelerationDirection,t=Math.cos(e)*this._drawingData.accelerationSpeed,a=Math.sin(e)*this._drawingData.accelerationSpeed,i=0;i<this._activeParticles.length;i++){var n=this._activeParticles[i];n.vx+=t,n.vy+=a,n.vx*=1-this._drawingData.friction,n.vy*=1-this._drawingData.friction,n.x+=n.vx,n.y+=n.vy,n.particleShape.x=n.x,n.particleShape.y=n.y;var r=n.currentLife/n.totalLife;switch(Number(n.alphaCurveType)){case o.AlphaCurveType.Random:var s=Math.min(n.finishAlpha,n.startAlpha),c=Math.max(n.finishAlpha,n.startAlpha);n.particleShape.alpha=Math.random()*(c-s)+s;break;case o.AlphaCurveType.Normal:default:var l=this.calcCurrentValue(n.startAlpha,n.finishAlpha,r);n.particleShape.alpha=l}var h=this.calcCurrentValue(n.startScale,n.finishScale,r);n.particleShape.scaleX=n.particleShape.scaleY=h,n.currentLife<0&&(n.isAlive=!1),n.currentLife--}},e.prototype.lifeCheck=function(){for(var e=0;e<this._activeParticles.length;e++)if(!this._activeParticles[e].isAlive){var t=this._activeParticles[e];this.container.removeChild(t.particleShape),this._activeParticles.splice(e,1),this._particlesPool.push(t),e--}},e.prototype.clear=function(){for(var e=0;e<this._activeParticles.length;e++){var t=this._activeParticles[e];t.isAlive=!1,this.container.removeChild(t.particleShape),this._activeParticles.splice(e,1),this._particlesPool.push(t),e--}},e.prototype.dispose=function(){for(var e=0;e<this._activeParticles.length;e++){var t=this._activeParticles[e];t.isAlive=!1,this.container.removeChild(t.particleShape)}this._activeParticles.splice(0,this._activeParticles.length),this._particlesPool.splice(0,this._particlesPool.length),this._activeParticles=null,this._particlesPool=null,this.container=null},e.prototype.emit=function(){for(var e=Math.round(createjs.Ticker.framerate),t=this._frameCount%e,a=this._drawingData.emitFrequency,i=Math.floor(a/e),n=0;i>n;n++)this.emitParticle();var r=a/e-i;t%Math.floor(1/r)==0&&this.emitParticle(),this._frameCount++,this._frameCount>=e&&(this._frameCount=0)},e.prototype.emitParticle=function(){var e=this.generateParticle();this.container.addChild(e.particleShape),this._activeParticles.push(e)},e.prototype.generateParticle=function(){var e=null;return e=this._particlesPool.length>=1?this._particlesPool.shift():new i.Particle,this.setParticleParameter(e),e},e.prototype.setParticleParameter=function(e){e.particleShape.removeAllChildren(),e.isAlive=!0,e.x=this.calcRandomValueWithVariance(this._drawingData.startX,this._drawingData.startXVariance,!1),e.y=this.calcRandomValueWithVariance(this._drawingData.startY,this._drawingData.startYVariance,!1),this.generateShape(e,this._drawingData.shapeIdList),e.totalLife=Math.max(1,this.calcRandomValueWithVariance(this._drawingData.lifeSpan,this._drawingData.lifeSpanVariance,!0)),e.currentLife=e.totalLife;var t=Math.max(0,this.calcRandomValueWithVariance(this._drawingData.initialSpeed,this._drawingData.initialSpeedVariance,!1)),a=createjs.Matrix2D.DEG_TO_RAD*this.calcRandomValueWithVariance(this._drawingData.initialDirection,this._drawingData.initialDirectionVariance,!1);e.vx=Math.cos(a)*t,e.vy=Math.sin(a)*t,e.startAlpha=this.calcRandomValueWithRange(0,1,this.calcRandomValueWithVariance(this._drawingData.startAlpha,this._drawingData.startAlphaVariance,!1)),e.finishAlpha=this.calcRandomValueWithRange(0,1,this.calcRandomValueWithVariance(this._drawingData.finishAlpha,this._drawingData.finishAlphaVariance,!1)),e.startScale=Math.max(0,this.calcRandomValueWithVariance(this._drawingData.startScale,this._drawingData.startScaleVariance,!1)),e.finishScale=Math.max(0,this.calcRandomValueWithVariance(this._drawingData.finishScale,this._drawingData.finishScaleVariance,!1)),e.particleShape.compositeOperation=1==this._drawingData.blendMode?"lighter":null,e.alphaCurveType=this._drawingData.alphaCurveType},e.prototype.generateShape=function(t,a){t.particleShape.removeAllChildren();var i=this._drawingData.startColor;t.startColor.hue=this.calcRandomValueWithVariance(i.hue,i.hueVariance,!1)%360,t.startColor.luminance=this.calcRandomValueWithVariance(i.luminance,i.luminanceVariance,!1),t.startColor.saturation=this.calcRandomValueWithVariance(i.saturation,i.saturationVariance,!1);var n=Number(t.startColor.hue),r=Number(t.startColor.saturation),o=Number(t.startColor.luminance),s="hsl("+n+", "+r+"%, "+o+"%)",c=Math.floor(Math.random()*this._drawingData.shapeIdList.length),l=0==this._drawingData.shapeIdList.length?"":this._drawingData.shapeIdList[c];t.colorCommand=null;var h=this.shapeGenerator.generateShape(l);t.particleShape.addChild(h);var u=h.getChildAt(0);if(null!=u){var p=u.graphics.instructions;if(p&&p.length>0)for(var d=0;d<p.length;d++){var f=p[d];if(f instanceof createjs.Graphics.Fill)if(f.style instanceof CanvasGradient){var g=f.style,v=e.HELPER_GRAPHICS,T=v.beginRadialGradientFill([s,"hsla("+n+", "+r+"%, "+o+"%, 0)"],g.props.ratios,g.props.x0,g.props.y0,g.props.r0,g.props.x1,g.props.y1,g.props.r1).command;p[d]=T}else f.style=s,t.colorCommand=f;else f instanceof createjs.Graphics.Stroke&&(f.style=s,t.colorCommand=f)}}},e.prototype.pause=function(){this._playing=!1},e.prototype.resume=function(){this._playing=!0},e.prototype.calcRandomValueWithRange=function(e,t,a){return Math.min(t,Math.max(e,a))},e.prototype.calcRandomValueWithVariance=function(e,t,a){var i=Number(e)+(Math.random()-.5)*t;return 1==a?Math.floor(i):i},e.prototype.calcCurrentValue=function(e,t,a){return Number(e)*a+Number(t)*(1-a)},Object.defineProperty(e.prototype,"emitFrequency",{get:function(){return this._drawingData.emitFrequency},set:function(e){this._drawingData.emitFrequency=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startX",{get:function(){return this._drawingData.startX},set:function(e){this._drawingData.startX=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startXVariance",{get:function(){return this._drawingData.startX},set:function(e){this._drawingData.startXVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startY",{get:function(){return this._drawingData.startY},set:function(e){this._drawingData.startY=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startYVariance",{get:function(){return this._drawingData.startYVariance},set:function(e){this._drawingData.startYVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialDirection",{get:function(){return this._drawingData.initialDirection},set:function(e){this._drawingData.initialDirection=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialDirectionVariance",{get:function(){return this._drawingData.initialDirectionVariance},set:function(e){this._drawingData.initialDirectionVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialSpeed",{get:function(){return this._drawingData.initialSpeed},set:function(e){this._drawingData.initialSpeed=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialSpeedVariance",{get:function(){return this._drawingData.initialSpeedVariance},set:function(e){this._drawingData.initialSpeedVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"friction",{get:function(){return this._drawingData.friction},set:function(e){this._drawingData.friction=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"accelerationSpeed",{get:function(){return this._drawingData.accelerationSpeed},set:function(e){this._drawingData.accelerationSpeed=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"accelerationDirection",{get:function(){return this._drawingData.accelerationDirection},set:function(e){this._drawingData.accelerationDirection=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startScale",{get:function(){return this._drawingData.startScale},set:function(e){this._drawingData.startScale=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startScaleVariance",{get:function(){return this._drawingData.startScaleVariance},set:function(e){this._drawingData.startScaleVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"finishScale",{get:function(){return this._drawingData.finishScale},set:function(e){this._drawingData.finishScale=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"finishScaleVariance",{get:function(){return this._drawingData.finishScaleVariance},set:function(e){this._drawingData.finishScaleVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lifeSpan",{get:function(){return this._drawingData.lifeSpan},set:function(e){this._drawingData.lifeSpan=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lifeSpanVariance",{get:function(){return this._drawingData.lifeSpanVariance},set:function(e){this._drawingData.lifeSpanVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startAlpha",{get:function(){return this._drawingData.startAlpha},set:function(e){this._drawingData.startAlpha=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startAlphaVariance",{get:function(){return this._drawingData.startAlphaVariance},set:function(e){this._drawingData.startAlphaVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"finishAlpha",{get:function(){return this._drawingData.finishAlpha},set:function(e){this._drawingData.finishAlpha=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"finishAlphaVariance",{get:function(){return this._drawingData.finishAlphaVariance},set:function(e){this._drawingData.finishAlphaVariance=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shapeIdList",{get:function(){return this._drawingData.shapeIdList},set:function(e){this._drawingData.shapeIdList=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startColor",{get:function(){return this._drawingData.startColor},set:function(e){this._drawingData.startColor=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"blendMode",{get:function(){return this._drawingData.blendMode},set:function(e){this._drawingData.blendMode=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"alphaCurveType",{get:function(){return this._drawingData.alphaCurveType},set:function(e){this._drawingData.alphaCurveType=e},enumerable:!0,configurable:!0}),e.HELPER_GRAPHICS=new createjs.Graphics,e}();a.ParticleSystem=s},{"../assets/shape-generator":1,"../data/data-drawing":3,"../enum/alpha-curve-type":5,"./particle":9}],9:[function(e,t,a){"use strict";var i=e("../data/data-color"),n=function(){function e(){this.particleShape=new createjs.Container,this.startColor=new i.ColorData}return e}();a.Particle=n},{"../data/data-color":2}]},{},[7]),function(e,t,a,i){var n;e.properties={width:550,height:400,fps:24,color:"#999999",manifest:[]},(e.triangle=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-.7,-27.8).lineTo(32,27.1).lineTo(-32,27.8).closePath(),this.shape.setTransform(0,-7),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-34.8,64,55.7),(e.star_10=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.3,18.3).lineTo(-19.9,29.3).lineTo(-14.1,10.3).lineTo(-32,10.3).lineTo(-19.7,.7).lineTo(-31.2,-8.7).lineTo(-15.2,-8.8).lineTo(-21.7,-26.4).lineTo(-5.4,-16.4).lineTo(-.2,-31.8).lineTo(4.4,-17.6).lineTo(17.8,-27.4).lineTo(13.1,-8.5).lineTo(30.3,-8.1).lineTo(19.9,.1).lineTo(32,8.4).lineTo(12.8,9.5).lineTo(18.2,29.8).lineTo(4.9,20).lineTo(1.4,31.8).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-31.7,64,63.6),(e.star=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-.2,17.3).lineTo(-20.2,31.5).lineTo(-13,7.4).lineTo(-32,-8).lineTo(-7.8,-8.4).lineTo(.3,-32).lineTo(8,-8.2).lineTo(32,-7.4).lineTo(12.8,7.5).lineTo(19.4,32).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-32,64,64),(e.square=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill().beginStroke("#FFFFFF").setStrokeStyle(8,1,1).moveTo(-32,-32).lineTo(32,-32).lineTo(32,32).lineTo(-32,32).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-36,-36,72,72),(e.reverse_blur_circle=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill().beginStroke("#FFFFFF").setStrokeStyle(8,1,1).moveTo(32,0).curveTo(32,13.2,22.6,22.6).curveTo(13.3,32,0,32).curveTo(-13.2,32,-22.7,22.6).curveTo(-32,13.2,-32,0).curveTo(-32,-13.3,-22.7,-22.7).curveTo(-13.2,-32,0,-32).curveTo(13.3,-32,22.6,-22.7).curveTo(32,-13.3,32,0).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-36,-36,72,72),(e.kirakira2=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4,9.5).curveTo(-7.8,0,-13.4,-.1).curveTo(-7.8,-.2,-4,-9.9).curveTo(-.1,-19.2,0,-32).curveTo(.1,-19.2,4,-9.9).curveTo(8,-.2,13.4,-.1).curveTo(8,0,4,9.5).curveTo(.1,19,0,32).curveTo(-.1,19,-4,9.5).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-13.4,-32,26.8,64),(e.kirakira=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-9.6,9.3).curveTo(-18.9,0,-32,-.1).curveTo(-18.9,-.2,-9.6,-9.6).curveTo(-.2,-19,-.1,-32).curveTo(0,-19,9.4,-9.6).curveTo(18.9,-.2,32,-.1).curveTo(18.9,0,9.4,9.3).curveTo(0,18.8,-.1,32).curveTo(-.2,18.8,-9.6,9.3).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-32,64,64),(e.heart=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-20.2,10).lineTo(-24.8,3.5).curveTo(-27,.1,-28.5,-3.1).curveTo(-30.1,-6.4,-31.1,-9.5).curveTo(-32,-13,-32,-16).curveTo(-32,-19.7,-30.4,-22.7).curveTo(-29.1,-25.4,-26.6,-27.4).curveTo(-24,-29.1,-21,-30.1).curveTo(-18.1,-31.1,-15,-31.1).curveTo(-11.7,-31.1,-8.8,-29.9).curveTo(-6.4,-29,-4.5,-27.4).curveTo(-3,-25.9,-1.7,-23.9).lineTo(0,-20.8).lineTo(1.7,-23.9).curveTo(3,-25.9,4.5,-27.4).curveTo(6.6,-29.1,8.8,-29.9).curveTo(11.7,-31.1,15.2,-31.1).curveTo(18.4,-31.1,21.3,-30.1).curveTo(24.2,-29.1,26.7,-27.2).curveTo(29.1,-25.3,30.5,-22.6).curveTo(32,-19.7,32,-16.1).curveTo(32,-13.3,31,-9.7).curveTo(30.2,-6.5,28.5,-3.2).curveTo(27.1,0,24.9,3.3).lineTo(20.3,9.7).curveTo(13.4,17.7,9.7,21.6).lineTo(0,31).curveTo(-13.6,18.3,-20.2,10).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-31,64,62.1),(e.flower=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(4,27.3).curveTo(.5,23.7,.5,18.9).lineTo(.5,15.2).lineTo(-.5,15.2).lineTo(-.7,18.9).curveTo(-.9,24,-4.1,27.6).curveTo(-7.4,31.1,-12.1,31.1).curveTo(-17,31.1,-20.8,27.5).curveTo(-24.7,23.7,-24.7,19.1).curveTo(-24.7,15.3,-22.2,12.1).curveTo(-19.7,8.8,-16.1,7.7).lineTo(-12.5,6.4).lineTo(-12.7,5.8).lineTo(-13,5.4).lineTo(-16.5,6.6).lineTo(-20.2,7.1).curveTo(-25.3,7.1,-28.7,4).curveTo(-32,.7,-32,-4.1).curveTo(-32,-9.4,-28.7,-13).curveTo(-25.5,-16.8,-20.6,-16.8).curveTo(-17.8,-16.8,-15,-15.4).curveTo(-12.2,-14,-10.5,-11.6).lineTo(-8.4,-8.7).lineTo(-8,-8.8).lineTo(-7.4,-9.3).lineTo(-9.6,-12.2).curveTo(-10.7,-14,-11.3,-15.8).curveTo(-11.9,-17.9,-12,-19.9).curveTo(-12,-24.7,-8.5,-28).curveTo(-5.3,-31.1,-.1,-31.1).curveTo(5.2,-31.1,8.5,-28).curveTo(11.7,-24.7,11.8,-19.9).curveTo(11.7,-17.7,11.2,-15.7).curveTo(10.7,-13.8,9.5,-12.2).lineTo(7.4,-9.3).lineTo(7.8,-9).lineTo(8.2,-8.7).lineTo(10.5,-11.6).curveTo(12.2,-14,14.8,-15.4).curveTo(17.6,-16.8,20.4,-16.8).curveTo(25.3,-16.8,28.5,-13).curveTo(32,-9.4,32,-4.1).curveTo(32,.8,28.5,4).curveTo(25.3,7.1,20,7.1).lineTo(16.4,6.6).lineTo(12.9,5.5).curveTo(12.8,5.6,12.8,5.6).curveTo(12.7,5.7,12.7,5.7).curveTo(12.7,5.8,12.7,5.8).curveTo(12.7,5.9,12.7,6).lineTo(12.5,6.4).lineTo(15.9,7.7).curveTo(19.7,9.1,22.1,12.2).curveTo(24.5,15.3,24.5,19.1).curveTo(24.5,23.7,20.8,27.5).curveTo(16.9,31.1,11.9,31.1).curveTo(7.4,31.1,4,27.3).closePath().moveTo(-7.7,-5.9).curveTo(-10.9,-2.7,-10.9,1.8).curveTo(-10.9,6.3,-7.7,9.4).curveTo(-4.6,12.5,-.1,12.5).curveTo(4.4,12.5,7.6,9.4).curveTo(10.6,6.3,10.6,1.8).curveTo(10.6,-2.7,7.6,-5.9).curveTo(4.4,-9,-.1,-9).curveTo(-4.6,-9,-7.7,-5.9).closePath(),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-31,64,62.2),(e.circle=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginFill("#FFFFFF").beginStroke().drawEllipse(-10.8,-10.8,21.7,21.7),this.shape.setTransform(0,0,2.949,2.949),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32,-32,64,64),(e.blur_circle=function(){this.initialize(),this.shape=new a.Shape,this.shape.graphics.beginRadialGradientFill(["#FFFFFF","rgba(255,255,255,0)"],[0,1],0,0,0,0,0,11).beginStroke().drawEllipse(-10.8,-10.8,21.7,21.7),this.shape.setTransform(0,0,3,3),this.addChild(this.shape)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(-32.5,-32.5,65.1,65.1),(e.assetshapes=function(){this.initialize(),this.instance=new e.triangle,this.instance.setTransform(323.6,39.6),this.instance_1=new e.square,this.instance_1.setTransform(518,151.5),this.instance_2=new e.kirakira2,this.instance_2.setTransform(420.8,32.6),this.instance_3=new e.kirakira,this.instance_3.setTransform(32,151.5),this.instance_4=new e.flower,this.instance_4.setTransform(396.5,151.5),this.instance_5=new e.star_10,this.instance_5.setTransform(518,32.6),this.instance_6=new e.star,this.instance_6.setTransform(275,151.5),this.instance_7=new e.circle,this.instance_7.setTransform(226.4,32.6),this.instance_8=new e.reverse_blur_circle,this.instance_8.setTransform(153.5,151.5),this.instance_9=new e.blur_circle,this.instance_9.setTransform(129.2,32.6),this.instance_10=new e.heart,this.instance_10.setTransform(32,32.6),this.addChild(this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance)}).prototype=n=new a.Container,n.nominalBounds=new a.Rectangle(275,200,554,187.5)}((particlejs=particlejs||{}).assets=particlejs.assets||{},images=images||{},createjs=createjs||{},ss=ss||{});var particlejs,images,createjs,ss;
(function($){
"use strict";

　  var particleSystem = null;
    var stage = null;
    window.addEventListener("load", function () {
      stage = new createjs.Stage("myCanvas");
      particleSystem = new particlejs.ParticleSystem();
      stage.addChild(particleSystem.container);
      particleSystem.importFromJson(
      {
          "bgColor": "#000000",
          "width": 100,
          "height": 100,
          "emitFrequency": 118,
          "startX": 310,
          "startXVariance": "3000",
          "startY": 268,
          "startYVariance": "559",
          "initialDirection": "94",
          "initialDirectionVariance": "360",
          "initialSpeed": "29.4",
          "initialSpeedVariance": 0,
          "friction": 0.107,
          "accelerationSpeed": 0.0505,
          "accelerationDirection": "275.8",
          "startScale": 0.75,
          "startScaleVariance": 1,
          "finishScale": 0,
          "finishScaleVariance": 0.47,
          "lifeSpan": 114,
          "lifeSpanVariance": "74",
          "startAlpha": "1",
          "startAlphaVariance": "0",
          "finishAlpha": "0",
          "finishAlphaVariance": 0.5,
          "shapeIdList": [
              "blur_circle"
          ],
          "startColor": {
              "hue": 132,
              "hueVariance": 360,
              "saturation": "91",
              "saturationVariance": 0,
              "luminance": "56",
              "luminanceVariance": "16"
          },
          "blendMode": true,
          "alphaCurveType": "1"
      }
      );
      createjs.Ticker.framerate = 60;
      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", handleTick);
    });
    function handleTick() {
      particleSystem.update();
      stage.update();
    }

$(function () {
  sizing();
  $(window).resize(function() {
    sizing();
  });
});

function sizing(){
  $("#myCanvas").attr({height:$("#page-wrap").height()});
  $("#myCanvas").attr({width:$("#page-wrap").width()});
}

var quizeFunc = function(){
  var count = 0;
  var $NUM = $('#count');
  $('<img src="../quiz/img/img_manga_01.jpg" alt="" >');
  $('<img src="../quiz/img/img_manga_02.jpg" alt="" >');
  $('<img src="../quiz/img/img_manga_03.jpg" alt="" >');
  $('<img src="../quiz/img/img_manga_04.jpg" alt="" >');
  $('<img src="../quiz/img/img_manga_05.jpg" alt="" >');
  var img1 = '<img src="../quiz/img/img_manga_01.jpg" alt="" >';
  var img2 = '<img src="../quiz/img/img_manga_02.jpg" alt="" >';
  var img3 = '<img src="../quiz/img/img_manga_03.jpg" alt="" >';
  var img4 = '<img src="../quiz/img/img_manga_04.jpg" alt="" >';
  var img5 = '<img src="../quiz/img/img_manga_05.jpg" alt="" >';


  $("#ans-quiz-1").on('click',function(){
    var ans = $("#quiz-01").val();
    var $jd = $("#judge-01");
    if(ans == '岡崎令治' ){
      $jd.find('p').remove();
      $jd.append('<p><span class="get">せぃかぃ！</span>描き下ろし漫画「クローン」をGET！<span class="anim">'+img1+'</span></p>');
      $(this).remove();
      count++;
      $NUM.text(count);
      tweetFunc(count);
    }else{
      $jd.find('p').remove();
      $jd.append('<p class="no-get">ふせぃかぃ！！<br><img src="../quiz/img/false.png" alt="" ></p>');
    }
  });
  $("#ans-quiz-2").on('click',function(){
    var ans = $("#quiz-02").val();
    var $jd = $("#judge-02");
    if(ans == 'ダンベル' ){
      $jd.find('p').remove();
      $jd.append('<p><span class="get">せぃかぃ！</span>描き下ろし漫画「連続殺人」をGET！<span class="anim">'+img2+'</span></p>');
      $(this).remove();
      count++;
      $NUM.text(count);
      tweetFunc(count);
    }else{
      $jd.find('p').remove();
      $jd.append('<p class="no-get">ふせぃかぃ！！<br><img src="../quiz/img/false.png" alt="" ></p>');
    }
  });
  $("#ans-quiz-3").on('click',function(){
    var ans = $("#quiz-03").val();
    var $jd = $("#judge-03");
    if(ans == 'おっとせい' ){
      $jd.find('p').remove();
      $jd.append('<p><span class="get">せぃかぃ！</span>描き下ろし漫画「膃肭臍」をGET！<span class="anim">'+img3+'</span></p>');
      $(this).remove();
      count++;
      $NUM.text(count);
      tweetFunc(count);
    }else{
      $jd.find('p').remove();
      $jd.append('<p class="no-get">ふせぃかぃ！！<br><img src="../quiz/img/false.png" alt="" ></p>');
    }
  });
  $("#ans-quiz-4").on('click',function(){
    var ans = $("#quiz-04").val();
    var $jd = $("#judge-04");
    if(ans == '一寸先は鬱' ){
      $jd.find('p').remove();
      $jd.append('<p><span class="get">せぃかぃ！</span>描き下ろし漫画「躁鬱の目覚め」をGET！<span class="anim">'+img4+'</span></p>');
      $(this).remove();
      count++;
      $NUM.text(count);
      tweetFunc(count);
    }else{
      $jd.find('p').remove();
      $jd.append('<p class="no-get">ふせぃかぃ！！<br><img src="../quiz/img/false.png" alt="" ></p>');
    }
  });
  $("#ans-quiz-5").on('click',function(){
    var ans = $("#quiz-05").val();
    var $jd = $("#judge-05");
    if(ans == '44' ){
      $jd.find('p').remove();
      $jd.append('<p><span class="get">せぃかぃ！</span>描き下ろし漫画「世界のアツナベ」をGET！<span class="anim">'+img5+'</span></p>');
      $(this).remove();
      count++;
      $NUM.text(count);
      tweetFunc(count);
    }else{
      $jd.find('p').remove();
      $jd.append('<p class="no-get">ふせぃかぃ！！<br><img src="../quiz/img/false.png" alt="" ></p>');
    }
  });
};quizeFunc();


var $tweetBtn = $('#shareTweet');
//complete
$('<img src="../quiz/img/img_manga_06.jpg" alt="" >');
$('<img src="../quiz/img/comp.png" alt="" >');
var img6 = '<img src="../quiz/img/img_manga_06.jpg" alt="" >';
var imgcomp = '<img src="../quiz/img/comp.png" alt="" >';

//set tweet btn
var $tweetBtn = $('#tweet');
$tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer=https://wines.github.io/soutsu/quiz/index.html&amp;url=https://wines.github.io/soutsu/quiz/index.html&amp;text=%e2%96%a0%e6%ad%a3%e8%a7%a3%e6%95%b0%ef%bc%9a0%e3%80%80%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a%e3%80%8c%e3%82%8e%e3%81%9f%e3%81%bf%e3%81%a7%e3%81%8d%e3%81%9f%e3%81%87%e3%81%a6%e3%81%93%e3%81%83%e3%80%8d%e3%80%80%20%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%af%e3%82%a4%e3%82%ba%e3%81%ab%e7%ad%94%e3%81%88%e3%81%a6%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%82%92%e4%bb%8a%e3%81%99%e3%81%90GET%ef%bc%81%20%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%af%e3%82%a4%e3%82%ba%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86"> 結果をツイート</a>');

var tweetFunc = function(NUM){
    var count = NUM;
    var $url = $("meta[property='og:url']").attr("content");
    var str1 = '%e2%96%a0%e6%ad%a3%e8%a7%a3%e6%95%b0%ef%bc%9a'//■正解数：
    var str2 = '%e3%80%80%e2%96%a0%e8%ba%81%e9%ac%b1%e3%83%ac%e3%83%99%e3%83%ab%ef%bc%9a%e3%80%8c'//　■躁鬱レベル：「
    var str3 = '%e3%80%8d%e3%80%80%20%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%af%e3%82%a4%e3%82%ba%e3%81%ab%e7%ad%94%e3%81%88%e3%81%a6%e6%8f%8f%e3%81%8d%e4%b8%8b%e3%82%8d%e3%81%97%e6%bc%ab%e7%94%bb%e3%82%92%e4%bb%8a%e3%81%99%e3%81%90GET%ef%bc%81%20%20%23%e8%ba%81%e9%ac%b1%e3%81%8f%e3%82%93%e3%81%ae%e3%82%af%e3%82%a4%e3%82%ba%e3%80%80%23%e8%ba%81%e9%ac%b1%e6%bc%ab%e7%94%bb%e9%9b%86' //」　 躁鬱くんのクイズに答えて描き下ろし漫画を今すぐGET！  #躁鬱くんのクイズ　#躁鬱漫画集
    var level;

    switch (count) {
      case 1:
        level = '%e3%82%8e%e3%81%9f%e3%81%bf%e3%81%ae%e3%81%a3%e3%83%83%e3%81%b1%e3%82%8a%e3%81%ab%e3%82%82%e3%81%aa%e3%83%b3%e3%81%aa%e3%81%83';
        $tweetBtn.find('a').remove();
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text='+str1+count+str2+level+str3+'"> 結果をツイート</a>');
        break;
      
      case 2:
        level = '%e3%82%82%e3%83%83%e3%81%a8%e3%82%8e%e3%81%9f%e3%81%bf%e3%81%ab%e3%81%aa%e3%82%8c';
        $tweetBtn.find('a').remove();
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text='+str1+count+str2+level+str3+'"> 結果をツイート</a>');
        break;
      
      case 3:
        level = '%e3%81%a1%e3%82%85%e2%80%be%e3%81%a8%e3%81%af%e3%83%b3%e3%81%b1%e3%81%ae%e3%82%8e%e3%81%9f%e3%81%bf';
        $tweetBtn.find('a').remove();
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text='+str1+count+str2+level+str3+'"> 結果をツイート</a>');
        break;
      
      case 4:
        level = '%e3%82%82%e2%80%be%e3%81%99%e3%81%90%e3%81%a7%e3%82%8e%e3%81%9f%e3%81%bf';
        $tweetBtn.find('a').remove();
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text='+str1+count+str2+level+str3+'"> 結果をツイート</a>');
        break;
        
      case 5:
        level = '%e3%81%99%e3%81%94%e2%80%be%e3%81%83%20%e3%82%8e%e3%81%9f%e3%81%bf%e3%81%bf%e3%81%9f%e3%81%83';
        $tweetBtn.find('a').remove();
        $tweetBtn.append('<a href="https://twitter.com/intent/tweet?original_referer='+$url+'&amp;url='+$url+'&amp;text='+str1+count+str2+level+str3+'"> 結果をツイート</a>');
        var $comp = $('#comp');
        $('<p>ぜンもンせぃかぃ、ぉめでとぅ</p><div>'+imgcomp+'</div><p>描き下ろし漫画「全クリ」をGET！</p><div>'+img6+'</div>').appendTo($comp);        
        break;
    }
};

})(jQuery);