import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from '../components/blog/Page.mjs';
import { Post } from '../components/blog/Post.mjs';
import { PostList } from '../components/blog/PostList.mjs';
import { blogPath, languages, origin } from '../components/blog/shared.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.includes('--check');
assert(process.argv.slice(2).every(arg => arg === '--check'), '사용법: node scripts/build-blog.mjs [--check]');
const contentRoot = join(root, 'content/blog');
const slugs = new Set();
const posts = readdirSync(contentRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => {
    const folder = join(contentRoot, entry.name);
    const post = JSON.parse(readFileSync(join(folder, 'post.json'), 'utf8'));
    const requireText = (value, field) => assert(typeof value === 'string' && value.trim(), `${entry.name}: ${field}가 필요합니다.`);
    assert(typeof post.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug), `${entry.name}: slug 형식을 확인하세요.`);
    assert(!slugs.has(post.slug), `${entry.name}: slug가 중복됩니다.`);
    slugs.add(post.slug);
    for (const field of ['category', 'author', 'published', 'updated']) requireText(post[field], field);
    for (const field of ['published', 'updated']) {
      const value = post[field];
      assert(/^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value, `${entry.name}: ${field}는 유효한 YYYY-MM-DD 날짜여야 합니다.`);
    }
    assert(post.updated >= post.published, `${entry.name}: updated가 published보다 이릅니다.`);
    post.scripts ??= [];
    assert(Array.isArray(post.scripts) && post.scripts.every(src => typeof src === 'string' && /^\/scripts\/[a-z0-9-]+\.js$/.test(src)), `${entry.name}: scripts에는 /scripts/*.js 경로를 사용하세요.`);
    for (const lang of languages) {
      const content = post.locales?.[lang];
      assert(content, `${entry.name}: ${lang} metadata가 필요합니다.`);
      for (const field of ['title', 'description', 'lead']) requireText(content[field], `${lang}.${field}`);
      content.body = readFileSync(join(folder, `${lang}.html`), 'utf8').trimEnd();
      requireText(content.body, `${lang}.html`);
      assert(Array.isArray(content.toc) && content.toc.length, `${entry.name}: ${lang}.toc가 필요합니다.`);
      const anchors = new Set();
      for (const item of content.toc) {
        assert(typeof item.id === 'string' && /^[a-z][a-z0-9-]*$/.test(item.id) && !anchors.has(item.id), `${entry.name}: ${lang}.toc의 id를 확인하세요.`);
        anchors.add(item.id);
        requireText(item.label, `${lang}.toc.label`);
        assert(content.body.includes(`id="${item.id}"`) || content.body.includes(`id='${item.id}'`), `${entry.name}: ${lang} 본문에 #${item.id}가 없습니다.`);
      }
    }
    return post;
  })
  .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug, 'en'));
assert(posts.length, 'content/blog에 게시글이 필요합니다.');

const assets = new Map();
function asset(path) {
  if (!assets.has(path)) {
    const digest = createHash('sha256').update(readFileSync(join(root, path.slice(1)))).digest('hex').slice(0, 12);
    assets.set(path, `${path}?v=${digest}`);
  }
  return assets.get(path);
}

// 모든 source와 asset을 확인한 다음에만 output을 쓴다.
const outputs = new Map();
for (const lang of languages) {
  outputs.set(`${blogPath(lang).slice(1)}index.html`, Page({ lang, main: PostList({ posts, lang }), asset }));
  for (const post of posts) {
    outputs.set(`${blogPath(lang, post.slug).slice(1)}index.html`, Page({ lang, post, main: Post({ post, lang }), asset }));
  }
}
const routes = ['/', '/ko/', '/business.html', '/ko/business.html', ...languages.map(lang => blogPath(lang)), ...posts.flatMap(post => languages.map(lang => blogPath(lang, post.slug)))];
outputs.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}
</urlset>
`);

const stale = [];
for (const [relativePath, output] of outputs) {
  const path = join(root, relativePath);
  let current;
  try {
    current = readFileSync(path, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (current === output) continue;
  if (check) {
    stale.push(relativePath);
  } else {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, output);
  }
}
if (stale.length) {
  console.error(`다음 output을 갱신하세요: node scripts/build-blog.mjs\n${stale.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`${posts.length}개 게시글 · ${outputs.size}개 output ${check ? '확인 완료' : '생성 완료'}`);
}
