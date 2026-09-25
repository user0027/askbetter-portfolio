// 사이트 전역 문구. 페이지 이름을 바꿀 때는 이 파일만 고친다.
// HTML 에 적힌 문구는 스크립트가 못 돌 때의 대체값이고, 로드되면 아래 값으로 덮인다.
window.SITE = {
  brand: 'ASKBETTER',
  // 헤더 메뉴는 로고에 맞춰 영어로 쓴다. 본문 링크 문구는 story.label(한글)을 쓴다
  nav: {
    work: 'Work',
    story: 'Interview',
    about: 'About',
    contact: 'Contact',
  },
  // 메인 히어로. 헤드라인 옆 여백에서 work 의 질문을 하나씩 정렬해 보여 준다
  hero: {
    role: '안녕하세요, 기획자 박유진이라고 합니다.',
    interval: 7000,   // 질문 하나가 머무는 시간(ms)
  },
  // 대표 작업. 메인 Work 장과 히어로 질문이 이 목록을 같이 쓴다.
  // did 는 한 일, result 는 결과. plate 는 작업 화면이 없을 때 판에 크게 잘라 넣는 낱말
  work: [
    { q: '반복되는 기획 업무를 어디까지 자동화할 수 있을까?', name: 'Claude TFT', org: '더존비즈온', year: '2025',
      did: '반복되는 Jira 티켓 작성·QA 검토를 자동화하는 워크플로 설계.', result: '' },
    { q: '복잡한 금융 업무를 어떻게 더 명확하게 만들 수 있을까?', name: 'DJBank', org: '더존비즈온', year: '2025',
      did: 'ERP 급여 데이터와 은행 이체 업무를 연동.', result: '급여이체 서비스 상용화.', plate: '명확하게' },
    { q: '사용자가 겪는 불편함에서 무엇을 먼저 바꿔야 할까?', name: 'AI 수임처 연말정산 웹', org: '더존비즈온', year: '2026',
      did: 'VOC 기반으로 재설계.', result: "사내 '최고의 기획자상' 수상.", plate: '불편함' },
    { q: '학생·초보 개발자가 계속 만들고 싶어지는 이유는 무엇일까?', name: '게임 제작 툴 & 커뮤니티', org: '프롬더레드', year: '2019–2024',
      did: 'GA 데이터로 운영 방향을 검증.', result: '이탈률 개선, DAU 상승. 초·중학교 대상 MOU 체결로 B2B 확장.', plate: '계속' },
  ],
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
