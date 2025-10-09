// Like button script with localStorage & dataLayer push
(function(){
  var buttons = document.querySelectorAll('[data-like-button]');
  if(!buttons.length) return;
  function storageKey(id){return 'like_'+id;}
  function countKey(id){return 'like_count_'+id;}

  buttons.forEach(function(btn){
    var id = btn.getAttribute('data-content-id') || location.pathname.replace(/\W+/g,'_') || 'page';
    var countEl = btn.nextElementSibling && btn.nextElementSibling.classList.contains('like-count') ? btn.nextElementSibling : null;
    var pressed = localStorage.getItem(storageKey(id))==='1';
    if(pressed){btn.setAttribute('aria-pressed','true');btn.textContent='💙 ありがとう！';btn.disabled=true;}
    var savedCount=parseInt(localStorage.getItem(countKey(id))||'0',10);
    if(countEl)countEl.textContent=savedCount;

    btn.addEventListener('click',function(){
      if(btn.getAttribute('aria-pressed')==='true')return;
      btn.setAttribute('aria-pressed','true');btn.textContent='💙 ありがとう！';btn.disabled=true;
      var newCount=savedCount+1;savedCount=newCount;
      localStorage.setItem(countKey(id),String(newCount));
      localStorage.setItem(storageKey(id),'1');
      if(countEl)countEl.textContent=newCount;
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'reaction',reaction_type:'like',content_id:id,value:1});
    });
  });
})();