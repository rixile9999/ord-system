export const origin = 'https://ord.systems';
export const languages = ['en', 'ko'];

export const copy = {
  en: {
    home: 'Home', skip: 'Skip to content', pages: 'Pages', language: 'Language',
    footer: 'Footer', contact: 'Investment & collaboration',
    contactDescription: 'Get in touch to discuss our technology, investment, or opportunities to work together.',
    description: 'Notes from ORD Systems on operational problems, mathematical optimization, and AI for professional work.',
    heading: ['Understanding the problem.', 'Examining the decision.'],
    lead: 'Notes on operational problems, mathematical optimization, and AI for professional work. Starting with questions from practice, we examine the reasoning behind technical decisions.',
    latest: 'Latest writing', read: 'Read article', contentsLabel: 'In this article', contents: 'In this article',
    ending: 'Explore our technical direction and RN-AI, powered by the ORCA engine.',
    about: 'About ORD Systems',
  },
  ko: {
    home: '홈', skip: '본문으로 이동', pages: '페이지', language: '언어 선택',
    footer: '하단 메뉴', contact: '투자 및 협업 문의',
    contactDescription: 'ORD Systems의 기술과 사업에 관심 있으시면 연락해 주세요.',
    description: '운영 문제, mathematical optimization, 업무용 AI에 대한 ORD Systems의 기술적 관점과 판단 기준을 기록합니다.',
    heading: ['운영의 문제를 이해하고,', '판단의 기준을 묻습니다.'],
    lead: '운영 문제, mathematical optimization, 업무용 AI를 바라보는 관점을 기록합니다. 현장의 질문에서 시작해 기술적 판단의 근거를 살펴봅니다.',
    latest: '최근 글', read: '글 읽기', contentsLabel: '이 글의 목차', contents: '이 글에서',
    ending: 'ORD Systems의 기술 방향과 ORCA engine을 사용하는 RN-AI를 더 알아보세요.',
    about: '회사 소개',
  },
};

export function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

export function homePath(lang) {
  return lang === 'en' ? '/' : `/${lang}/`;
}

export function blogPath(lang, slug = '') {
  return `${homePath(lang)}blog/${slug ? `${slug}/` : ''}`;
}

export function postMeta(post) {
  return `<div class="post-meta"><span>${escapeHtml(post.category)}</span><time datetime="${escapeHtml(post.published)}">${escapeHtml(post.published.replaceAll('-', '.'))}</time><span>${escapeHtml(post.author)}</span></div>`;
}
