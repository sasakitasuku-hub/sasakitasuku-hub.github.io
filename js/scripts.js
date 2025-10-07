// js/scripts.js
// ===============================
// カルーセルを自動でスライドさせる
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return; // 安全対策

  let scrollAmount = 0;
  const step = 2; // スクロール速度（小さいほどゆっくり）
  const intervalTime = 20; // ミリ秒単位（20msで1フレーム）

  function autoScroll() {
    scrollAmount += step;
    carousel.scrollLeft = scrollAmount;

    // 最後まで行ったら戻る
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
      scrollAmount = 0;
    }
  }

  setInterval(autoScroll, intervalTime);
});


  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  function onScrollReveal(){
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el=>{
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('show');
    });
  }
  window.addEventListener('scroll', onScrollReveal);
  onScrollReveal();
});
