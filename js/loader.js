(function () {
  const canvas = document.getElementById("loader");
  const lineWidth = document.getElementById("line-width");
  const loaderB = document.getElementById("loader-b");
  const loaderB2 = document.getElementById("loader-b2");
  const loaderB3 = document.getElementById("loader-b3");
  const width = document.getElementById("width");
  const speed = document.getElementById("speed");
  let $ = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    t = 0,
    num = 450,
    u = 0,
    b,
    x,
    y,
    _x,
    _y;

  $.lineWidth = lineWidth.value / 100;

  function anim() {
    init();
    addEvent();
    for (var i = 0; i < 1; i++) {
      x = 0;
      $.beginPath();
      for (var j = 0; j < num; j++) {
        x += width.value * Math.sin(5);
        y = (x * Math.sin(i + 3.3 * t + x / 5)) / loaderB3.value;
        _x = x * Math.cos(b) + y * Math.sin(i) * Math.cos(b);
        _y = x * Math.sin(b) + y * Math.cos(i);
        b = (j * (2 + loaderB2.value * 0.01) * Math.PI) / loaderB.value;
        $.lineTo(w / 2 + _x, h / 2 + _y);
      }
      var g = $.createLinearGradient(
        w / 2 + _x,
        h / 2 + _y,
        1,
        w / 2 + _x,
        h / 2 + _y
      );
      g.addColorStop(0.1, "hsla(" + (u + j) + ",95%,50%,1)");
      g.addColorStop(0.5, "hsla(0,0%,25%,1)");
      g.addColorStop(1, "hsla(0,0%,0%,0)");
      $.strokeStyle = g;
      $.stroke();
    }
    t += 1 / speed.value;
    u -= 0.2;

    function init() {
      $.globalCompositeOperation = "source-over";
      window.requestAnimationFrame(anim);
      $.fillStyle = "hsla(0, 0%, 0%, .9)";
      $.fillRect(0, 0, w, h);
      $.globalCompositeOperation = "lighter";
    }

    function addEvent() {
      window.addEventListener(
        "resize",
        function () {
          canvas.width = w = window.innerWidth;
          canvas.height = h = window.innerHeight;
        },
        false
      );
      lineWidth.addEventListener(
        "change",
        function () {
          $.lineWidth = lineWidth.value / 100;
        },
        false
      );
      speed.addEventListener(
        "change",
        function () {
          _t = 1 / speed.value;
        },
        false
      );
    }
  }
  anim();
})();
