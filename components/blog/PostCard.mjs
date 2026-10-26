import { blogPath, copy, escapeHtml as html, postMeta } from './shared.mjs';

export function PostCard({ post, lang, index }) {
  const content = post.locales[lang];
  const href = blogPath(lang, post.slug);
  return `<article class="post-entry"><div class="post-number" aria-hidden="true">${String(index + 1).padStart(2, '0')} /</div><div>${postMeta(post)}<h2><a href="${href}">${html(content.title)}</a></h2><p>${html(content.description)}</p><a class="post-link" href="${href}">${html(copy[lang].read)} <span aria-hidden="true">↗</span></a></div></article>`;
}
