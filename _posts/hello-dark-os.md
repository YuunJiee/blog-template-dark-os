---
title: "Hello, Dark OS：開始使用這個主題"
date: '2026-11-17'
updated: '2026-11-17'
draft: false
type: blog
category: notes
series: "Dark OS 入門"
tags:
  - dark-os
  - getting-started
summary: 第一篇範例文章。說明要改哪些檔案，才能把這個主題變成你自己的部落格。
---

歡迎使用 **Dark OS**：一個把部落格做成復古作業系統桌面的 Next.js 主題。每個頁面都是一個視窗，首頁有可以打字的終端機，底部有工作列。

> [!TIP]
> 這篇文章本身就是範例。確定不需要之後，直接刪掉 `_posts/hello-dark-os.md` 就好。

## 要改的檔案

| 檔案 | 內容 |
|---|---|
| `src/config/site.ts` | 網站名稱、網址、作者、終端機文字、Giscus 留言 |
| `src/data/about.ts` | 關於頁的經歷、技能、獲獎 |
| `public/images/avatar.svg` | 大頭貼（換成 png 的話記得改 `site.ts` 的 `avatar`） |
| `_posts/` | 文章 |
| `_projects/` | 專案 |
| `_changelog/` | 版本紀錄，會顯示在 `/changelog` |

## 新增一篇文章

```bash
cp _templates/blog-post.md _posts/my-first-post.md
```

把 `draft` 改成 `false` 才會出現在列表上。`category` 可以是 `notes`、`implementation`、`paper`、`til`，或刪掉不填。

## 試試首頁的終端機

回到首頁，在終端機裡輸入 `help`，看看有哪些指令。
