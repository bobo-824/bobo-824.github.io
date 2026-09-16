# 个人网站

这是一个纯静态个人网站，包含主页、自我介绍和博客。

## 预览

在这个目录运行：

```powershell
python -m http.server 8000
```

然后访问：<http://localhost:8000>

## 写博客

1. 在 `posts/` 中创建一个 Markdown 文件，例如 `my-second-post.md`。
2. 打开 `posts/posts.js`，在数组最上面添加一条记录：

```js
{
  slug: "my-second-post",
  title: "文章标题",
  date: "2026-09-07",
  tags: ["思考"],
  excerpt: "这里填写文章摘要。",
  readingTime: "4 分钟",
}
```

`slug` 必须和 Markdown 文件名相同（不包含 `.md`）。网站会自动把最新文章排在前面。
