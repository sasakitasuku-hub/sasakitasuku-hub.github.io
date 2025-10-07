// ===== 画像カルーセルを自動でスライド =====
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  let scrollAmount = 0;
  const step = 1;       // スクロール速度（数字を大きくすると速くなる）
  const interval = 30;  // 移動の間隔（ミリ秒）

  function autoScroll() {
    carousel.scrollLeft += step;
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
    }
  }

  setInterval(autoScroll, interval);
});
