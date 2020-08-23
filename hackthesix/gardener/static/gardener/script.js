var canvas = new fabric.Canvas('c', { selection: false });

canvas.setHeight(600);
canvas.setWidth(600);
canvas.setBackgroundImage('https://thumbs.dreamstime.com/b/fertile-garden-soil-texture-background-top-view-seen-above-gardening-planting-concept-isolated-white-80867918.jpg', canvas.renderAll.bind(canvas), {
  width: canvas.width,
  height: canvas.height, 
  // Needed to position backgroundImage at 0/0
  opacity: .4,
  originX: 'left',
  originY: 'top'
});

// serializing empty canvas 

// var canvas = this.__canvas = new fabric.Canvas('c');
// fabric.Object.prototype.transparentCorners = false;
var grid = 50;

// create grid
for (var i = 0; i < (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false }))
} 

// id generator

function generateId(prefix,start) {
  var i = start || 0;
  return function() {
      return prefix + i++;
  }
}

var idsprout = generateId("sprout",0)
var idbush = generateId("bush",0)
var idflower = generateId("flower",0)
var idtree = generateId("tree",0)
var idgrass = generateId("sprout",0)
// new add objects function

function makesprout(){
  var imgElement = document.getElementById('sprout-pic'); 
  var imgInstance = new fabric.Image(imgElement);
  imgInstance.toObject = (function(toObject) {
    return function() {
      return fabric.util.object.extend(toObject.call(this), {
        name: this.name
      });
    };
  })(imgInstance.toObject); 

  canvas.add(imgInstance).setActiveObject(imgInstance);  
  
  imgInstance.name = idsprout()
  console.log(JSON.stringify(canvas));
} 

function makebush(){
  var imgElement = document.getElementById('bush-pic'); 
  var imgInstance = new fabric.Image(imgElement);
  canvas.add(imgInstance).setActiveObject(imgInstance); 
}
 

function makeflower(imgElement){
  var imgElement = document.getElementById('flower-pic');
  var imgInstance = new fabric.Image(imgElement);
  canvas.add(imgInstance).setActiveObject(imgInstance);
}

function maketree(imgElement){
  var imgElement = document.getElementById('tree-pic');
  var imgInstance = new fabric.Image(imgElement);
  canvas.add(imgInstance).setActiveObject(imgInstance);
}

function removeAll() {
  var activeObject = canvas.getActiveObjects();
  console.log(activeObject)
  if (activeObject) {
    activeObject.forEach(function(object) {
      canvas.remove(object);
    });
    canvas.discardActiveObject();
  }
  canvas.renderAll();
}

function makesquare() {
      var square = new fabric.Rect({ 
        left: 100, 
        top: 100, 
        width: 50, 
        height: 50, 
        fill: '#9f9', 
        originX: 'left', 
        originY: 'top',
        centeredRotation: true
      });
      canvas.add(square);
    }

// // add objects 
//   function makerect() {
//     var square = new fabric.Rect({ 
//       left: 100, 
//       top: 100, 
//       width: 50, 
//       height: 50, 
//       fill: '#faa', 
//       originX: 'left', 
//       originY: 'top',
//       centeredRotation: true
//     });
//     canvas.add(square);
//   }
  
//   function makecircle() {
//     var circle = new fabric.Circle({ 
//       left: 300, 
//       top: 300, 
//       radius: 50, 
//       fill: '#9f9', 
//       originX: 'left', 
//       originY: 'top',
//       centeredRotation: true
//     });
//     canvas.add(circle);
//   }  

// The following section are interactive functions
 
// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

// zoom in on canvas
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  var vpt = this.viewportTransform;
    if (zoom < 400 / 1000) {
      vpt[4] = 200 - 1000 * zoom / 2;
      vpt[5] = 200 - 1000 * zoom / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
        vpt[4] = canvas.getWidth() - 1000 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
        vpt[5] = canvas.getHeight() - 1000 * zoom;
      }}
})

// panning
canvas.on('mouse:down', function(opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});

// panning
canvas.on('mouse:move', function(opt) {
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});

// panning
canvas.on('mouse:up', function(opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});

// button functions

  var $ = function(id){return document.getElementById(id)};  
  var bush= $('bush-but'),
      sprout = $('sprout-but'),
      flower = $('flower-but'),
      tree = $('tree-but'),
      del = $('del-but'), 
      grass = $('grass-but');
      // bush_img = $('bush_pic'),
      // flower_img = $('flower_pic'),
      // tree_img = $('tree_pic');
      // group = $('group'),
      // ungroup = $('ungroup'),
      // multiselect = $('multiselect'),   
      bush.onclick = makebush; 
      flower.onclick = makeflower;
      tree.onclick = maketree;
      sprout.onclick = makesprout;
      grass.onclick = makesquare;

      del.onclick = removeAll;

      // multiselect.onclick = function() {
      //   canvas.discardActiveObject();
      //   var sel = new fabric.ActiveSelection(canvas.getObjects(), {
      //     canvas: canvas,
      //   });
      //   canvas.setActiveObject(sel);
      //   canvas.requestRenderAll();
      // }

      // group.onclick = function() {
      //   if (!canvas.getActiveObject()) {
      //     return;
      //   }
      //   if (canvas.getActiveObject().type !== 'activeSelection') {
      //     return;
      //   }
      //   canvas.getActiveObject().toGroup();
      //   canvas.requestRenderAll();
      // }

      // ungroup.onclick = function() {
      //   if (!canvas.getActiveObject()) {
      //     return;
      //   }
      //   if (canvas.getActiveObject().type !== 'group') {
      //     return;
      //   }
      //   canvas.getActiveObject().toActiveSelection();
      //   canvas.requestRenderAll();
      // }


 

   
  

  