// スクロール時に要素をフェードイン
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".card, .skill-card, .timeline-item");

  function revealElements() {
    const triggerBottom = window.innerHeight * 0.85;
    elements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealElements);
  revealElements(); // 初期表示も適用
});
