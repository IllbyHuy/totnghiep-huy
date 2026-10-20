const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { name } = req.query;
  const decodedName = name ? decodeURIComponent(name).replace(/[-_]+/g, ' ').trim() : 'Bạn';

  const filePath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Cập nhật Server-Side Meta Tags để Facebook / Zalo / Messenger cào được preview đích danh
  const title = `Kính mời ${decodedName} đến dự Lễ Tốt Nghiệp của Huy`;
  const desc = `Chân thành gửi đến ${decodedName} lời mời tham dự Lễ Tốt Nghiệp Tân Kỹ sư Công nghệ Phần mềm tại Đại học FPT TP.HCM vào ngày 07/11/2026.`;

  html = html
    .replace(/<title>.*?<\/title>/i, `<title>Will u...?</title>`)
    .replace(/<meta property="og:title" content=".*?">/i, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content=".*?">/i, `<meta property="og:description" content="${desc}">`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
};
