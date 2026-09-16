import { posts } from "../posts/posts.js";

const themeToggle = document.querySelector("#theme-toggle") || document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

const header = document.querySelector(".site-header");
if (header) {
  const updateHeader = () => header.classList.toggle("not-top", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const navLinks = document.querySelectorAll(".site-header nav a");
navLinks.forEach((link) => {
  if (new URL(link.href, location.href).pathname === location.pathname) link.classList.add("active");
});

function createPostItem(post) {
  const item = document.createElement("a");
  item.className = "post-item";
  item.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
  item.innerHTML = `
    <div class="post-link">
      <time datetime="${post.date}">${post.date}</time>
      <div class="post-title-row">
        <div>${post.title}</div>
        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>
    </div>
    <p class="post-excerpt">${post.excerpt}</p>
  `;
  return item;
}

const postList = document.querySelector("#post-list");
if (postList) {
  [...posts].reverse().forEach((post) => postList.append(createPostItem(post)));
}

const latestPosts = document.querySelector("#latest-posts");
if (latestPosts) {
  [...posts].reverse().slice(0, 3).forEach((post) => {
    const card = createPostItem(post);
    latestPosts.append(card);
  });
}

const articleBody = document.querySelector("#article-body");
if (articleBody) {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const post = posts.find((item) => item.slug === slug);
  const heading = document.querySelector("#post-title");
  const meta = document.querySelector("#post-meta");

  if (!post) {
    heading.textContent = "没有找到文章";
    meta.textContent = "请返回博客列表。";
  } else {
    document.title = `${post.title} · zzb07`;
    heading.textContent = post.title;
    meta.textContent = `${post.date} · ${post.tags.join(" / ")} · ${post.readingTime}`;
    const response = await fetch(`posts/${post.slug}.md`);
    const markdown = await response.text();
    articleBody.innerHTML = marked.parse(markdown);
  }
}
