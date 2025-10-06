// js/scripts.js
// Carousel (index) + simple reveal on scroll
document.addEventListener("DOMContentLoaded", () => {
  // Carousel
  const carouselImgs = document.querySelectorAll('.carousel img');
  if (carouselImgs.length){
    let cur = 0;
    carouselImgs[cur].classList.add('active');
    setInterval(()=> {
      carouselImgs[cur].classList.remove('active');
      cur = (cur+1) % carouselImgs.length;
      carouselImgs[cur].classList.add('active');
    }, 3500);
  }

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
