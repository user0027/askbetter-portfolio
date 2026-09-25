// 사이트 전역 문구. 페이지 이름을 바꿀 때는 이 파일만 고친다.
// HTML 에 적힌 문구는 스크립트가 못 돌 때의 대체값이고, 로드되면 아래 값으로 덮인다.
window.SITE = {
  brand: 'ASKBETTER',
  // 헤더 메뉴는 로고에 맞춰 영어로 쓴다. 본문 링크 문구는 story.label(한글)을 쓴다
  nav: {
    work: 'Work',
    story: 'Interview',
    contact: 'Contact',
  },
  // 메인 히어로. variant 는 'note'(여백 주석) · 'stack'(질문이 흘러 한 문장으로) · 'qa'(문답)
  // 주소 뒤에 ?hero=note 처럼 붙이면 이 값을 바꾸지 않고 미리 볼 수 있다
  hero: {
    variant: 'stack',
    sub: '문제를 발견하고 제품의 방향을 만들어가는 기록',
    role: 'Product Manager · 데이터 기반 전략 × UX',
    q: '더 나은 제품은 어디서 시작될까?',          // qa 에서만 쓴다
    // stack 은 전부, note 는 meta 가 있는 것(실제 작업)만 쓴다
    questions: [
      { text: '무엇이 진짜 문제일까?' },
      { text: '반복되는 기획 업무를 어디까지 자동화할 수 있을까?', meta: 'Claude TFT · 2025' },
      { text: '누구에게 필요한가?' },
      { text: '복잡한 금융 업무를 어떻게 더 명확하게 만들 수 있을까?', meta: 'DJBank · 2025' },
      { text: '어떻게 검증할 수 있을까?' },
      { text: '사용자가 겪는 불편함에서 무엇을 먼저 바꿔야 할까?', meta: 'AI 수임처 연말정산 웹 · 2026' },
      { text: '데이터는 무엇을 말하고 있을까?' },
      { text: '학생·초보 개발자가 계속 만들고 싶어지는 이유는 무엇일까?', meta: '게임 제작 툴 & 커뮤니티 · 2019–2024' },
    ],
  },
  // 탭 제목은 로고에 맞춰 영어로 쓴다
  home: {
    title: 'Product Manager',
  },
  story: {
    label: '인터뷰',
    href: 'case-study.html',
    title: 'AI Workflow Interview',
  },
  // 숙련자용 심화 자료. 이름은 사용자 확인 전 임시값
  advanced: {
    label: 'Deep Dive',
    href: 'deep-dive.html',
    title: 'Deep Dive',
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
