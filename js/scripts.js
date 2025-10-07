// ===============================
// なめらかループカルーセル（transform方式）
// ===============================
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const slides = carousel.querySelectorAll("img");

  // スライドの基本設定
  let currentIndex = 0;
  const slideCount = slides.length;

  // 画像を横並びに設定
  carousel.style.display = "flex";
  carousel.style.transition = "transform 0.6s ease-in-out";
  carousel.style.width = `${slideCount * 100}%`;

  slides.forEach(slide => {
    slide.style.width = `${100 / slideCount}%`;
    slide.style.flexShrink = "0";
  });

  // 自動スライド
  setInterval(() => {
    currentIndex++;
    if (currentIndex >= slideCount) {
      currentIndex = 0;
      carousel.style.transition = "none"; // リセット時のカクつき防止
      carousel.style.transform = `translateX(0%)`;
      void carousel.offsetWidth; // ブラウザの再描画を強制
      carousel.style.transition = "transform 0.6s ease-in-out";
    } else {
      carousel.style.transform = `translateX(-${(100 / slideCount) * currentIndex}%)`;
    }
  }, 3000); // 3秒ごとにスライド
});
