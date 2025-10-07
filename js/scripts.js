/* Beginner-friendly JS (no frameworks)
   - nav active state (progressive enhancement)
   - simple IntersectionObserver reveal
   - optional auto-scroll for carousel (pause on hover)
*/
(function(){
  // Add aria-current to active nav if not present
  var links = document.querySelectorAll('header nav a');
  links.forEach(function(a){
    if (a.classList.contains('active')) a.setAttribute('aria-current','page');
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.content-box, .intro-section, .carousel-container');
  els.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: .15});
  els.forEach(function(el){ io.observe(el); });

  // Simple auto-slide for first .carousel if present
  var car = document.querySelector('.carousel');
  if (car){
    var hovering = false;
    car.addEventListener('mouseenter', function(){ hovering = true; });
    car.addEventListener('mouseleave', function(){ hovering = false; });
    var step = 1; // px per tick
    function tick(){
      if (!hovering){
        // If near the end, bounce back to start
        if (car.scrollLeft + car.clientWidth >= car.scrollWidth - 2){
          car.scrollTo({left: 0, behavior: 'smooth'});
        } else {
          car.scrollLeft += step;
        }
      }
      window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }
})();
