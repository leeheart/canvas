var yyy = document.getElementById("xxx");
var context = yyy.getContext("2d");

autoSetCanvas(yyy);

listenToUser(yyy);

/**************************/

var eraserEnabled = false;
pen.onclick = function () {
  eraserEnabled = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
};
eraser.onclick = function () {
  eraserEnabled = true;
  eraser.classList.add("active");
  pen.classList.remove("active");
};
red.onclick = function () {
  context.fillStyle = "red";
  context.strokeStyle = "red";
  red.classList.add("active");
  green.classList.remove("active");
  blue.classList.remove("active");
};
green.onclick = function () {
  context.fillStyle = "green";
  context.strokeStyle = "green";
  green.classList.add("active");
  red.classList.remove("active");
  blue.classList.remove("active");
};
blue.onclick = function () {
  context.fillStyle = "blue";
  context.strokeStyle = "blue";
  blue.classList.add("active");
  red.classList.remove("active");
  green.classList.remove("active");
};
clear.onclick = function () {
  context.clearRect(0, 0, yyy.width, yyy.height);
};
save.onclick = function () {
  var url = yyy.toDataURL("image/png");
  var a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.download = "我的画";
  document.body.appendChild(a);
  a.click();
};

/********************************/

function autoSetCanvas(canvas) {
  setSize();

  window.onresize = function () {
    setSize();
  };

  function setSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    context.lineCap = "round";
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.lineWidth = 5;
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1); //起点
  context.lineTo(x2, y2); //终点
  context.stroke();
  context.closePath();
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined,
  };

  if (document.body.ontouchstart !== undefined) {
    //触控设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };

    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      var newPoint = {
        x: x,
        y: y,
      };
      if (using) {
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20);
        } else {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      }
    };

    canvas.ontouchend = function (aaa) {
      using = false;
    };
  } else {
    //非触控设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      var newPoint = {
        x: x,
        y: y,
      };
      if (using) {
        if (eraserEnabled) {
          context.clearRect(x - 10, y - 10, 20, 20);
        } else {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      }
    };

    canvas.onmouseup = function (aaa) {
      using = false;
    };
  }
}
