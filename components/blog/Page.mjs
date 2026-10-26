import { blogPath, copy, escapeHtml as html, homePath, languages, origin } from './shared.mjs';

export function Page({ lang, post, main, asset }) {
  const text = copy[lang];
  const content = post?.locales[lang];
  const title = `${content?.title ?? 'Engineering'} — ORD Systems`;
  const description = content?.description ?? text.description;
  const path = blogPath(lang, post?.slug);
  const home = homePath(lang);
  const alternates = [...languages, 'x-default'].map(language =>
    `  <link rel="alternate" hreflang="${language}" href="${origin}${blogPath(language === 'x-default' ? 'en' : language, post?.slug)}" />`
  ).join('\n');
  const languageLinks = languages.map(language => {
    const href = blogPath(language, post?.slug);
    return `<a href="${href}" lang="${language}" hreflang="${language}"${language === lang ? ' aria-current="page"' : ''} data-language-href="${href}">${language.toUpperCase()}</a>`;
  }).join('');
  const organization = { '@type': 'Organization', name: 'ORD Systems', url: `${origin}/` };
  const structuredData = post ? {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: content.title, description, datePublished: post.published,
    dateModified: post.updated, inLanguage: lang,
    author: { ...organization, name: post.author }, publisher: organization,
    mainEntityOfPage: `${origin}${path}`,
  } : null;
  const scripts = (post?.scripts ?? []).map(src => `  <script src="${html(asset(src))}" defer></script>`);
  if (structuredData) {
    scripts.unshift(`  <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`);
  }
  return `<!DOCTYPE html>
<!-- scripts/build-blog.mjs로 생성합니다. content/blog 또는 components/blog에서 수정하세요. -->
<html lang="${lang}" class="editorial-document">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${html(title)}</title>
  <meta name="description" content="${html(description)}" />
  <meta name="theme-color" content="#fafaf8" />
  <meta property="og:title" content="${html(title)}" />
  <meta property="og:description" content="${html(description)}" />
  <meta property="og:type" content="${post ? 'article' : 'website'}" />
  <meta property="og:url" content="${origin}${path}" />
  <link rel="canonical" href="${origin}${path}" />
${alternates}
  <link rel="icon" type="image/svg+xml" href="/brand/ord-favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="preconnect" href="https://rsms.me" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
  <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
  <link rel="stylesheet" href="${html(asset('/styles/site.css'))}" />
  <link rel="stylesheet" href="${html(asset('/styles/blog.css'))}" />
  <script src="${html(asset('/scripts/site.js'))}" defer></script>
${scripts.length ? `${scripts.join('\n')}\n` : ''}</head>
<body class="editorial-page ${post ? 'article' : 'journal'}-page">
  <a class="skip" href="#main-content">${html(text.skip)}</a>
  <header class="header">
    <div class="header-inner wrap">
      <a class="brand" href="${home}" aria-label="ORD Systems — ${html(text.home)}">ORD <span>Systems</span></a>
      <nav class="page-nav" aria-label="${html(text.pages)}"><a href="${home}business.html"><span>Business</span> <span>Vision</span></a><a href="${blogPath(lang)}" aria-current="${post ? 'true' : 'page'}">Engineering</a></nav>
      <div class="languages" aria-label="${html(text.language)}">${languageLinks}</div>
    </div>
    <div class="reading-progress" aria-hidden="true"></div>
  </header>
${main}
  <footer class="site-footer" id="contact" aria-labelledby="contact-title">
    <div class="wrap contact-layout">
      <div><p class="eyebrow">Contact / ORD Systems</p><h2 id="contact-title">${html(text.contact)}</h2><p class="contact-copy">${html(text.contactDescription)}</p></div>
      <a class="contact-email" href="mailto:rixile@ord.systems">rixile@ord.systems <span aria-hidden="true">↗</span></a>
    </div>
    <div class="wrap footer-bottom"><span>© 2026 ORD Systems · Operations Research &amp; Decision</span><nav aria-label="${html(text.footer)}"><a href="${blogPath(lang)}">Engineering</a><a href="${home}business.html">Business Vision</a></nav></div>
  </footer>
</body>
</html>
`;
}
