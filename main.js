var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvas(yyy)

listenToMouse(yyy)


/**************************/

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}


/********************************/


function autoSetCanvas(canvas) {
  setSize()

  window.onresize = function () {
    setSize()
  }

  function setSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black'
  context.moveTo(x1, y1); //起点
  context.lineTo(x2, y2); //终点
  context.lineWidth = 5;
  context.stroke();
  context.closePath();
}

function listenToMouse(canvas) {

  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  canvas.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x, y, 10, 10)
    } else {
      lastPoint = {
        x: x,
        y: y
      }
    }
  }

  canvas.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    var newPoint = {
      x: x,
      y: y
    }
    if (using) {
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }

  canvas.onmouseup = function (aaa) {
    using = false
  }
}
