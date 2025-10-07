
(function(){
  var links=document.querySelectorAll('header nav a');
  links.forEach(function(a){ if(a.classList.contains('active')) a.setAttribute('aria-current','page'); });
  var els=document.querySelectorAll('.box,.hero,.page-title,.lead,.quote');
  els.forEach(function(e){ e.classList.add('reveal'); });
  var io=new IntersectionObserver(function(es){ es.forEach(function(ent){ if(ent.isIntersecting){ ent.target.classList.add('is-in'); io.unobserve(ent.target);} }); },{threshold:.1});
  els.forEach(function(e){ io.observe(e); });
})();
// Auto-scroll the first carousel (non-blocking)
(function(){
  var car = document.querySelector('.carousel');
  if(!car) return;
  var hover=false;
  car.addEventListener('mouseenter',()=>hover=true);
  car.addEventListener('mouseleave',()=>hover=false);
  function tick(){
    if(!hover){
      if (car.scrollLeft + car.clientWidth >= car.scrollWidth - 2){
        car.scrollTo({left:0, behavior:'smooth'});
      }else{
        car.scrollLeft += 1;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
