import { blogPath, copy, escapeHtml as html, homePath, postMeta } from './shared.mjs';

export function Post({ post, lang }) {
  const content = post.locales[lang];
  const text = copy[lang];
  const toc = content.toc.map(item => `<a href="#${html(item.id)}">${html(item.label)}</a>`).join('');
  // 본문은 repository에서 관리하는 HTML fragment를 그대로 사용한다.
  return `  <main id="main-content" class="article-main wrap">
    <article aria-labelledby="article-title">
      <header class="article-heading"><a class="back-home" href="${blogPath(lang)}"><span aria-hidden="true">←</span> Engineering</a>${postMeta(post)}<h1 id="article-title">${html(content.title)}</h1><p class="lead">${html(content.lead)}</p></header>
      <div class="article-layout"><aside class="article-aside"><nav aria-label="${html(text.contentsLabel)}"><p class="mini-label">${html(text.contents)}</p>${toc}</nav></aside><div class="article-body">
${content.body}
        <div class="article-end"><p>${html(text.ending)}</p><a href="${homePath(lang)}">${html(text.about)} <span aria-hidden="true">↗</span></a><a href="https://rn.ai.kr/intro">RN-AI <span aria-hidden="true">↗</span></a></div>
      </div></div>
    </article>
  </main>`;
}
