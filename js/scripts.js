
// Active nav + reveal
(function(){
  var links=document.querySelectorAll('header nav a');
  links.forEach(function(a){ if(a.classList.contains('active')) a.setAttribute('aria-current','page'); });
  var els=document.querySelectorAll('.box,.hero,.page-title,.lead,.quote,.carousel-container,.page-nav');
  els.forEach(function(e){ e.classList.add('reveal'); });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(ent){ if(ent.isIntersecting){ ent.target.classList.add('is-in'); io.unobserve(ent.target);} });
  },{threshold:.1});
  els.forEach(function(e){ io.observe(e); });
})();

// Carousel auto-scroll (pause on hover); reduced-motion aware
(function(){
  var car=document.querySelector('.carousel');
  if(!car) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  var hover=false;
  car.addEventListener('mouseenter',()=>hover=true);
  car.addEventListener('mouseleave',()=>hover=false);
  function tick(){
    if(!hover){
      if(car.scrollLeft + car.clientWidth >= car.scrollWidth - 2){
        car.scrollTo({left:0, behavior:'smooth'});
      }else{
        car.scrollLeft += 1;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// Copy to clipboard (for Slack ID / email)
(function(){
  document.addEventListener('click', function(e){
    var t = e.target;
    if(t.matches('[data-copy]')){
      var text = t.getAttribute('data-copy');
      if(navigator.clipboard){
        navigator.clipboard.writeText(text).then(function(){
          t.textContent = 'コピーしました';
          setTimeout(function(){ t.textContent='コピー'; }, 1200);
        });
      }
    }
  });
})();

// Back to top
(function(){
  var btn=document.createElement('button');
  btn.className='back-top'; btn.setAttribute('aria-label','ページ上部へ戻る'); btn.textContent='↑ Top';
  document.body.appendChild(btn);
  function onScroll(){ btn.style.display = (window.scrollY>400)?'inline-block':'none'; }
  window.addEventListener('scroll', onScroll, {passive:true});
  btn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  onScroll();
})();
