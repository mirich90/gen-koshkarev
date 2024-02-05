(function () {
  const W = 100;
  const H = 100;
  const S = 3;
  const mtx = new Uint16Array((W + 1) * H);
  const canvas = document.getElementById("flame");
  const ctx = canvas.getContext("2d", { lowLatency: true, alpha: true });
  canvas.width = W * S;
  canvas.height = H * S;
  let xm = 50;
  let ym = 80;

  const flame = () => {
    requestAnimationFrame(flame);
    if (xm > 1 && xm < W - 1 && ym > 1 && ym < H - 1) {
      mtx[ym * W + xm] = 8192 * Math.random();
    }
    for (let i = 1; i < H - 1; i++) {
      for (let j = 1; j < W - 1; j++) {
        const p = i * W + j;
        const ap = p + W - Math.round(Math.random());
        const nc = Math.round(
          (mtx[ap] + mtx[ap + 1] + mtx[ap - W] + mtx[ap - W + 1]) *
            0.485 *
            Math.random()
        );
        mtx[p] = nc;
        const z = -ym + i;
        ctx.fillStyle = `rgb(${Math.round(nc * 4)}, ${Math.round(
          nc * 2
        )},${Math.round(nc * nc * nc * 0.000005 + nc * 0.001 * z * z * z)})`;
        ctx.fillRect(j * S, i * S, S, S);
      }
    }
  };
  flame();
})();
