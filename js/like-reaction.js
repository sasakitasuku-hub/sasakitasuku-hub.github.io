/* like-reaction.js
   既存のHTMLを一切書き換えずに、全ページへ「いいね」ボタンを自動挿入するスクリプト。
   （カウント表示機能を除外したバージョン）
   - 配置: js/like-reaction.js
   - 読込: 既存 scripts.js の後で <script defer src="js/like-reaction.js"></script>
   - 計測: dataLayer.push({event:'reaction', reaction_type:'like', content_id, value:1})
*/
(function(){
  // 1) スタイルをJSから追加（既存CSSを触らない）
  var css = `
  .like-box{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:16px}
  .like-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);
     border-radius:999px;padding:8px 18px;color:inherit;cursor:pointer;
     transition:transform .15s ease, background .2s ease}
  .like-btn:hover{background:rgba(255,255,255,.15);transform:translateY(-1px)}
  .like-btn[aria-pressed="true"]{
     background:linear-gradient(90deg, rgba(138,209,255,.25), rgba(161,255,207,.25));
     border-color: rgba(138,209,255,.6); cursor:default}
  `;
  var style = document.createElement('style');
  style.setAttribute('data-like-style','1');
  style.textContent = css;
  document.head.appendChild(style);

  // 2) どのページかをゆるく判定（URLパスで）
  var path = location.pathname.toLowerCase();
  var contentId = 'home';
  if (path.indexOf('profile') !== -1) contentId = 'profile';
  else if (path.indexOf('strength') !== -1) contentId = 'strength';
  else if (path.indexOf('goals') !== -1) contentId = 'goals';
  else if (path.indexOf('index') !== -1) contentId = 'home';

  // 3) いいねボックスを生成
  var section = document.createElement('section');
  section.className = 'box reveal like-box';
  section.setAttribute('aria-label','このページのリアクション');

  var btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.setAttribute('data-like-button','');
  btn.setAttribute('data-content-id', contentId);
  btn.setAttribute('aria-pressed','false');
  btn.textContent = '👍 いいね';

  section.appendChild(btn);

  // 4) 差し込み位置：footerの直前 > mainの末尾 > bodyの末尾
  var parent = document.querySelector('footer')?.parentElement
             || document.querySelector('main')
             || document.body;
  var anchor = document.querySelector('footer');
  if(anchor && anchor.parentElement){
     anchor.parentElement.insertBefore(section, anchor);
  }else{
     parent.appendChild(section);
  }

  // 5) localStorageで二度押し防止
  function storageKey(id){ return 'like_' + id; }
  var pressed = localStorage.getItem(storageKey(contentId)) === '1';
  if(pressed){
     btn.setAttribute('aria-pressed','true');
     btn.textContent = '💙 ありがとうございます！';
     btn.disabled = true;
  }

  btn.addEventListener('click', function(){
     if(btn.getAttribute('aria-pressed') === 'true') return;
     btn.setAttribute('aria-pressed','true');
     btn.textContent = '💙 ありがとう！';
     btn.disabled = true;

     try{
       localStorage.setItem(storageKey(contentId), '1');
     }catch(e){/* ignore */}

     // 6) GA4へ送る（GTMで reaction カスタムイベントを拾う）
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
       event: 'reaction',
       reaction_type: 'like',
       content_id: contentId,
       value: 1
     });
  });

  // 7) 既存の .reveal がある前提で、IntersectionObserverが無ければ簡易発火
  if ('IntersectionObserver' in window) {
     var io = new IntersectionObserver(function(entries){
       entries.forEach(function(en){
         if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
       });
     }, {threshold: 0.15});
     io.observe(section);
  } else {
     // フォールバック
     section.classList.add('is-in');
  }
})();
