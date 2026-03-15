// board/build.js
const fs = require("fs");
const path = require("path");

const postsPath = path.join(__dirname, "posts.json");
const tplPath = path.join(__dirname, "template.html");
const outPath = path.join(__dirname, "index.html");

const data = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const esc = (s="") => String(s)
  .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
  .replaceAll('"',"&quot;").replaceAll("'","&#039;");

const postsHtml = (data.posts || []).map(p => `
  <div class="post">
    <div class="ph">
      <span class="num">${esc(p.num)}:</span>
      <span class="name">${esc(p.name || "名無し")}</span>
      <span class="date">${esc(p.date || "")}</span>
    </div>
    <div class="content">${esc(p.content || "")}</div>
  </div>
`).join("\n");

const template = fs.readFileSync(tplPath, "utf8")
  .replace("{{THREAD_TITLE}}", esc(data.threadTitle || "AI社内掲示板"))
  .replace("{{THREAD_NOTE}}", esc(data.threadNote || ""))
  .replace("{{POSTS_HTML}}", postsHtml);

fs.writeFileSync(outPath, template, "utf8");
console.log("built board/index.html");
