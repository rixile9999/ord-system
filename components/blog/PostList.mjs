import { copy, escapeHtml as html } from './shared.mjs';
import { PostCard } from './PostCard.mjs';

export function PostList({ posts, lang }) {
  const text = copy[lang];
  return `  <main id="main-content" class="journal-main wrap">
    <div class="journal-heading"><p class="eyebrow">ORD Systems / Engineering</p><h1>${html(text.heading[0])}<br><span>${html(text.heading[1])}</span></h1><p class="lead">${html(text.lead)}</p></div>
    <section class="post-list" aria-labelledby="latest-title"><div class="journal-label"><h2 id="latest-title">${html(text.latest)}</h2><span>${String(posts.length).padStart(2, '0')}</span></div>
      ${posts.map((post, index) => PostCard({ post, lang, index })).join('\n      ')}
    </section>
  </main>`;
}
