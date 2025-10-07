// ===============================
// 自動ループするカルーセル（ガタつき防止版）
// ===============================

document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const images = carousel.querySelectorAll("img");
  const imgWidth = images[0].offsetWidth + 20; // 画像+余白
  let scrollPos = 0;

  // --- カルーセル用複製 ---
  // 無限ループっぽくするために同じ画像をもう一周分コピー
  images.forEach(img => {
    const clone = img.cloneNode(true);
    carousel.appendChild(clone);
  });

  // --- 自動スクロール ---
  function autoScroll() {
    scrollPos += 1.2; // スピード調整
    if (scrollPos >= imgWidth * images.length) {
      // 半分（オリジナル画像分）進んだらリセット
      scrollPos = 0;
      carousel.scrollLeft = 0;
    }
    carousel.scrollLeft = scrollPos;
    requestAnimationFrame(autoScroll);
  }

  autoScroll();
});
