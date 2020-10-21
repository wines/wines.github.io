/**
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {
    function Node(obj, dimension, parent) {
        this.obj = obj;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.dimension = dimension;
    }

    function kdTree(points, metric, dimensions) {

        var self = this;

        function buildTree(points, depth, parent) {
            var dim = depth % dimensions.length,
                median,
                node;

            if (points.length === 0) {
                return null;
            }
            if (points.length === 1) {
                return new Node(points[0], dim, parent);
            }

            points.sort(function (a, b) {
                return a[dimensions[dim]] - b[dimensions[dim]];
            });

            median = Math.floor(points.length / 2);
            node = new Node(points[median], dim, parent);
            node.left = buildTree(points.slice(0, median), depth + 1, node);
            node.right = buildTree(points.slice(median + 1), depth + 1, node);

            return node;
        }

        // Reloads a serialied tree
        function loadTree (data) {
            // Just need to restore the `parent` parameter
            self.root = data;

            function restoreParent (root) {
                if (root.left) {
                    root.left.parent = root;
                    restoreParent(root.left);
                }

                if (root.right) {
                    root.right.parent = root;
                    restoreParent(root.right);
                }
            }

            restoreParent(self.root);
        }

        // If points is not an array, assume we're loading a pre-built tree
        if (!Array.isArray(points)) loadTree(points, metric, dimensions);
        else this.root = buildTree(points, 0, null);

        // Convert to a JSON serializable structure; this just requires removing
        // the `parent` property
        this.toJSON = function (src) {
            if (!src) src = this.root;
            var dest = new Node(src.obj, src.dimension, null);
            if (src.left) dest.left = self.toJSON(src.left);
            if (src.right) dest.right = self.toJSON(src.right);
            return dest;
        };

        this.insert = function (point) {
            function innerSearch(node, parent) {

                if (node === null) {
                    return parent;
                }

                var dimension = dimensions[node.dimension];
                if (point[dimension] < node.obj[dimension]) {
                    return innerSearch(node.left, node);
                } else {
                    return innerSearch(node.right, node);
                }
            }

            var insertPosition = innerSearch(this.root, null),
                newNode,
                dimension;

            if (insertPosition === null) {
                this.root = new Node(point, 0, null);
                return;
            }

            newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
            dimension = dimensions[insertPosition.dimension];

            if (point[dimension] < insertPosition.obj[dimension]) {
                insertPosition.left = newNode;
            } else {
                insertPosition.right = newNode;
            }
        };

        this.remove = function (point) {
            var node;

            function nodeSearch(node) {
                if (node === null) {
                    return null;
                }

                if (node.obj === point) {
                    return node;
                }

                var dimension = dimensions[node.dimension];

                if (point[dimension] < node.obj[dimension]) {
                    return nodeSearch(node.left, node);
                } else {
                    return nodeSearch(node.right, node);
                }
            }

            function removeNode(node) {
                var nextNode,
                    nextObj,
                    pDimension;

                function findMin(node, dim) {
                    var dimension,
                        own,
                        left,
                        right,
                        min;

                    if (node === null) {
                        return null;
                    }

                    dimension = dimensions[dim];

                    if (node.dimension === dim) {
                        if (node.left !== null) {
                            return findMin(node.left, dim);
                        }
                        return node;
                    }

                    own = node.obj[dimension];
                    left = findMin(node.left, dim);
                    right = findMin(node.right, dim);
                    min = node;

                    if (left !== null && left.obj[dimension] < own) {
                        min = left;
                    }
                    if (right !== null && right.obj[dimension] < min.obj[dimension]) {
                        min = right;
                    }
                    return min;
                }

                if (node.left === null && node.right === null) {
                    if (node.parent === null) {
                        self.root = null;
                        return;
                    }

                    pDimension = dimensions[node.parent.dimension];

                    if (node.obj[pDimension] < node.parent.obj[pDimension]) {
                        node.parent.left = null;
                    } else {
                        node.parent.right = null;
                    }
                    return;
                }

                // If the right subtree is not empty, swap with the minimum element on the
                // node's dimension. If it is empty, we swap the left and right subtrees and
                // do the same.
                if (node.right !== null) {
                    nextNode = findMin(node.right, node.dimension);
                    nextObj = nextNode.obj;
                    removeNode(nextNode);
                    node.obj = nextObj;
                } else {
                    nextNode = findMin(node.left, node.dimension);
                    nextObj = nextNode.obj;
                    removeNode(nextNode);
                    node.right = node.left;
                    node.left = null;
                    node.obj = nextObj;
                }

            }

            node = nodeSearch(self.root);

            if (node === null) { return; }

            removeNode(node);
        };

        this.nearest = function (point, maxNodes, maxDistance) {
            var i,
                result,
                bestNodes;

            bestNodes = new BinaryHeap(
                function (e) { return -e[1]; }
            );

            function nearestSearch(node) {
                var bestChild,
                    dimension = dimensions[node.dimension],
                    ownDistance = metric(point, node.obj),
                    linearPoint = {},
                    linearDistance,
                    otherChild,
                    i;

                function saveNode(node, distance) {
                    bestNodes.push([node, distance]);
                    if (bestNodes.size() > maxNodes) {
                        bestNodes.pop();
                    }
                }

                for (i = 0; i < dimensions.length; i += 1) {
                    if (i === node.dimension) {
                        linearPoint[dimensions[i]] = point[dimensions[i]];
                    } else {
                        linearPoint[dimensions[i]] = node.obj[dimensions[i]];
                    }
                }

                linearDistance = metric(linearPoint, node.obj);

                if (node.right === null && node.left === null) {
                    if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
                        saveNode(node, ownDistance);
                    }
                    return;
                }

                if (node.right === null) {
                    bestChild = node.left;
                } else if (node.left === null) {
                    bestChild = node.right;
                } else {
                    if (point[dimension] < node.obj[dimension]) {
                        bestChild = node.left;
                    } else {
                        bestChild = node.right;
                    }
                }

                nearestSearch(bestChild);

                if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
                    saveNode(node, ownDistance);
                }

                if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
                    if (bestChild === node.left) {
                        otherChild = node.right;
                    } else {
                        otherChild = node.left;
                    }
                    if (otherChild !== null) {
                        nearestSearch(otherChild);
                    }
                }
            }

            if (maxDistance) {
                for (i = 0; i < maxNodes; i += 1) {
                    bestNodes.push([null, maxDistance]);
                }
            }

            if(self.root)
                nearestSearch(self.root);

            result = [];

            for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
                if (bestNodes.content[i][0]) {
                    result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
                }
            }
            return result;
        };

        this.balanceFactor = function () {
            function height(node) {
                if (node === null) {
                    return 0;
                }
                return Math.max(height(node.left), height(node.right)) + 1;
            }

            function count(node) {
                if (node === null) {
                    return 0;
                }
                return count(node.left) + count(node.right) + 1;
            }

            return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
        };
    }

    // Binary heap implementation from:
    // http://eloquentjavascript.net/appendix2.html

    function BinaryHeap(scoreFunction){
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    BinaryHeap.prototype = {
        push: function(element) {
            // Add the new element to the end of the array.
            this.content.push(element);
            // Allow it to bubble up.
            this.bubbleUp(this.content.length - 1);
        },

        pop: function() {
            // Store the first element so we can return it later.
            var result = this.content[0];
            // Get the element at the end of the array.
            var end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it sink down.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.sinkDown(0);
            }
            return result;
        },

        peek: function() {
            return this.content[0];
        },

        remove: function(node) {
            var len = this.content.length;
            // To remove a value, we must search through the array to find
            // it.
            for (var i = 0; i < len; i++) {
                if (this.content[i] == node) {
                    // When it is found, the process seen in 'pop' is repeated
                    // to fill up the hole.
                    var end = this.content.pop();
                    if (i != len - 1) {
                        this.content[i] = end;
                        if (this.scoreFunction(end) < this.scoreFunction(node))
                            this.bubbleUp(i);
                        else
                            this.sinkDown(i);
                    }
                    return;
                }
            }
            throw new Error("Node not found.");
        },

        size: function() {
            return this.content.length;
        },

        bubbleUp: function(n) {
            // Fetch the element that has to be moved.
            var element = this.content[n];
            // When at 0, an element can not go up any further.
            while (n > 0) {
                // Compute the parent element's index, and fetch it.
                var parentN = Math.floor((n + 1) / 2) - 1,
                    parent = this.content[parentN];
                // Swap the elements if the parent is greater.
                if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                    this.content[parentN] = element;
                    this.content[n] = parent;
                    // Update 'n' to continue at the new position.
                    n = parentN;
                }
                // Found a parent that is less, no need to move it further.
                else {
                    break;
                }
            }
        },

        sinkDown: function(n) {
            // Look up the target element and its score.
            var length = this.content.length,
                element = this.content[n],
                elemScore = this.scoreFunction(element);

            while(true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) * 2, child1N = child2N - 1;
                // This is used to store the new position of the element,
                // if any.
                var swap = null;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    var child1 = this.content[child1N],
                        child1Score = this.scoreFunction(child1);
                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore)
                        swap = child1N;
                }
                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = this.content[child2N],
                        child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap == null ? elemScore : child1Score)){
                        swap = child2N;
                    }
                }

                // If the element needs to be moved, swap it, and continue.
                if (swap != null) {
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                }
                // Otherwise, we are done.
                else {
                    break;
                }
            }
        }
    };

    this.kdTree = kdTree;

    exports.kdTree = kdTree;
    exports.BinaryHeap = BinaryHeap;
}));


/* ==========================================================
   Sketch-o-rithm
=============================================================*/
// kd-tree implementation: https://github.com/ubilabs/kd-tree-javascript
// output canvas
var viewWidth = 0,
    viewHeight = 0,
    canvas = document.getElementById('obs-ca'),
    ctx = canvas.getContext('2d');

// input canvas (not in DOM)
var osCanvas = document.createElement('canvas'),
    osCtx = osCanvas.getContext('2d');

// settings for image processing and drawing
// some combinations may be very slow :)
var settings = {
    // must be equal to the side of the image being loaded
    width:400,
    // must be equal to the side of the image being loaded
    height:400,
    // range 0 to 255. pixels above this lightness will be stored as points
    threshold:250,
    // range 0 to 1. scale down the sample image for performance and different effects
    sampleScale:1,
    // range 4 to many. max number of neighbors lines will be drawn to, based on brightness
    maxWeight:24,
    // range 1 to many. controls the speed of the drawing (lines drawn each requestAnimationFrame)
    frameStep:4,
    // width of the lines being drawn
    lineWidth:0.1
};

// image processing output and drawing vars
var outputPath,
    outputTree,
    currentFrame = 0;

var image = document.createElement('img');
// must be set in order to read pixels from images loaded from another domain
image.crossOrigin = 'Anonymous';
image.src = '/obscure/common/img/sketch.jpg';

image.onload = function() {
    viewWidth = canvas.width = canvas.clientWidth;
    viewHeight = canvas.height = canvas.clientHeight;

    // first set dimensions for sampling
    osCanvas.width = settings.width;
    osCanvas.height = settings.height;
    // then sample
    processImage();
    // then set dimensions for drawing
    osCanvas.width = viewWidth;
    osCanvas.height = viewHeight;
    // then draw, yay!
    //requestAnimationFrame(update);
};

// image processing

function processImage() {
    console.log('processing...');

    var t0 = Date.now();
    var points = getPointsFromImage();
    var t1 = Date.now();

    console.log('point count:', points.length);
    console.log('image processing took:', (t1 - t0));

    generatePathFromPoints(points);

    var t2 = Date.now();

    console.log('path finding took:', (t2 - t1));

    osCtx.clearRect(0, 0, settings.width, settings.height);
}

function getPointsFromImage() {
    var threshold = settings.threshold,
        sampleScale = settings.sampleScale,
        outputScale = sampleScale * (settings.width / viewWidth),
        infOutputScale = 1 / outputScale,
        maxWeight = settings.maxWeight,
        sampleSize = (osCanvas.height * sampleScale) | 0;

    // draw the image into the canvas we will sample from
    osCtx.drawImage(image, 0, 0, sampleSize, sampleSize);

    // get the pixel color data for each pixel
    var imageData = this.osCtx.getImageData(0, 0, sampleSize, sampleSize),
        pixels = imageData.data,
        points = [];

    // for each pixel,
    // check if the average of R+G+B is higher than the threshold
    // if it is, store the {x,y} coordinates of the pixel
    // also weigh lighter pixels more heavily
    for (var i = 0; i < pixels.length; i += 4) {
        var r = pixels[i    ],
            g = pixels[i + 1],
            b = pixels[i + 2],
            avg = ((r + g + b) / 3) | 0,
            x = ((i / 4) % sampleSize) * infOutputScale,
            y = ((i / 4 / sampleSize) | 0) * infOutputScale;

        if (avg > threshold) {
            var p = {
                // offset the points a little for effect
                // also, the kdTree breaks down if it has too many similar points...
                x:x + randomRange(-0.1, 0.1),
                y:y + randomRange(-0.1, 0.1),
                weight:map(avg, threshold, 255, 1, maxWeight) | 0
            };

            points.push(p);
        }
    }

    return points;
}

function generatePathFromPoints(points) {
    var random = Math.random;

    var distance = function(a, b) {
            // add a little noise
            var dx = (a.x - b.x) * (random() - 0.5);
            var dy = (a.y - b.y) * (random() - 0.5);
            // no need to sqrt because the exact distance does not matter
            return dx * dx + dy * dy;
        },
        dims = ['x', 'y'];
    // create two trees
    // one to construct a path (points will be removed from this tree)
    // the other will be used for nearest neighbor search during the drawing phase (points will NOT be removed from this tree)
    var pathTree = new kdTree(points, distance, dims),
        copyTree = new kdTree(points, distance, dims),
        path = [],
        point = points[0],
        length = points.length,
        next;
    // the next point in the path is the nearest neighbor
    while (length) {
        next = pathTree.nearest(point, 1)[0][0];
        point = next;

        pathTree.remove(point);
        path.push(point);

        length--;
    }

    outputPath = path;
    outputTree = copyTree;
}

// draw the stuff

function update() {
    // only draw new lines on the off-screen canvas (no need to redraw old ones)
    this.updateDrawing();
    // draw the output image to the on-screen canvas
    // this is saver because resize/scroll events can cause the context to be cleared
    this.drawToCanvas();

    requestAnimationFrame(update);
}

function updateDrawing() {
    var point = outputPath[currentFrame],
    step = 0,
    steps = settings.frameStep;

    // colorized version
    //var h = (frame % 360),
    //    s = 80,
    //    l = 40;
    //
    //osCtx.strokeStyle = 'hsl(' + h + ',' + s + '%,' + l + '%)';

    osCtx.strokeStyle = '#333';
    osCtx.lineWidth = settings.lineWidth;

    var neighbors;
    // for each point in the path
    // find neighbors
    // draw lines to neighbors
    while ((++step <= steps) && point) {

        osCtx.beginPath();
        osCtx.moveTo(point.x, point.y);

        neighbors = outputTree.nearest(point, point.weight);

        neighbors.forEach(function(n){
            osCtx.lineTo(n[0].x, n[0].y);
        });

        osCtx.stroke();

        point = outputPath[++this.currentFrame];
    }
}

function drawToCanvas() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    ctx.drawImage(osCanvas, 0, 0, viewWidth, viewHeight);
}

// utils

function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

function map(s, a1, a2, b1, b2) {
    return ((s - a1)/(a2 - a1)) * (b2 - b1) + b1;
}

/* ================================================================
 jQuery
====================================================================*/

$(function () {
  'use scrict';

    function mainVisual(){
      var pageHeight = $(window).height();
      var pageWidth = $(window).width();
      $("#main-visual").css({"height":pageHeight});
      //三平方の定理 - 対角線
      var square = pageHeight * pageHeight + pageWidth * pageWidth;
      square = Math.sqrt(square);
      $("#main-visual-bg").css({"height":square});
      //$(".box-event").css({"height":square});
    }mainVisual();

     var timeLine = new TimelineMax();
     var $mdlayer = $("#js-modal-layer");

     $(document).on('click','#js-instalib li a',function(){
        var path = $(this).find("img").attr("src");
        $("#img-insta").addClass("block").css({"top":$(document).scrollTop() + 40});
        timeLine.to( $mdlayer , 0 , {opacity:'.7' , onComplete : function(){
            $mdlayer.addClass("block");
        }});
        $("#img-insta").append('<img src='+path+' alt="">');
        return false;
    });

     $mdlayer.on('click',function(){
        timeLine.to( $("#img-insta").find("img") , 0.2 ,{opacity:"0", transform: "scale(.2)" , onComplete : function(){
            $("#img-insta").find("img").remove();
            $("#img-insta").removeClass("block");
        }});

        timeLine.to( $(this) , 0.3 , {opacity:'0' , onComplete : function(){
            $mdlayer.removeClass("block");
        }});
     });

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
    mainVisual();
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
    var $canvas = $("#obs-ca");
    var $wrapCanvas = $("#wrap-canvas");
    $canvas.attr({height:$wrapCanvas.height()});
    $canvas.attr({width:$wrapCanvas.width()});
  } sizing();

/* ==========================================================
   scroll
=============================================================*/
var flag = true;
//reload to top
$('html,body').animate({ scrollTop: 0 },0);

 $(window).scroll(function(){
    var obj_t_pos = $('.main').offset().top;
    var scr_count = $(document).scrollTop() + (window.innerHeight/2); // ディスプレイの半分の高さを追加
    if(scr_count > obj_t_pos && flag === true){
       //startTimer();
       $('#js-instalib li').addClass('item');

        if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
            //gif animation
            $("#main").addClass("sp");
        }else{
            //not sp canvas
            requestAnimationFrame(update);
        }
       flag = false;
    }
 });

});
