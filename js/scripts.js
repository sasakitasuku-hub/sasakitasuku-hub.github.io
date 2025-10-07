document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const imgs = carousel.querySelectorAll("img");

  function updateCenter() {
    const centerX = carousel.scrollLeft + carousel.clientWidth / 2;
    imgs.forEach(img => {
      const imgCenter = img.offsetLeft + img.offsetWidth / 2;
      const distance = Math.abs(centerX - imgCenter);
      if (distance < img.offsetWidth / 2) {
        img.classList.add("center");
      } else {
        img.classList.remove("center");
      }
    });
  }

  carousel.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateCenter);
  });

  updateCenter();
});
