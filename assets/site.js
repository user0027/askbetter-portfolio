// 사이트 전역 문구. 페이지 이름을 바꿀 때는 이 파일만 고친다.
// HTML 에 적힌 문구는 스크립트가 못 돌 때의 대체값이고, 로드되면 아래 값으로 덮인다.
window.SITE = {
  brand: 'ASKBETTER',
  // 탭 제목은 로고에 맞춰 영어로 쓴다
  home: {
    title: 'Product Manager',
  },
  story: {
    label: '인터뷰',
    href: 'case-study.html',
    title: 'AI Workflow Interview',
  },
};

(function () {
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, window.SITE);
  }
  // data-site="story.label"      → 글자 채우기
  // data-site-href="story.href"  → 링크 주소 채우기
  // data-site-title="story.title" (html 요소) → 문서 제목을 '값 · 브랜드' 로
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var v = get(el.getAttribute('data-site'));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-site-href]').forEach(function (el) {
    var v = get(el.getAttribute('data-site-href'));
    if (v != null) el.setAttribute('href', v);
  });
  var t = document.documentElement.getAttribute('data-site-title');
  if (t && get(t) != null) document.title = get(t) + ' · ' + window.SITE.brand;
})();
