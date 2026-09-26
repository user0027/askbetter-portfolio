// 스크롤하면 헤더에 얇은 선
(function(){
  var nav = document.getElementById('nav');
  if (!nav) return;
  var onScroll = function(){ nav.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
})();
