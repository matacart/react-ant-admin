// 版本更新文件 - 自动生成版本号
// scripts/genVersion.js
const fs = require('fs');
const path = require('path');

const version = Date.now(); // 使用时间戳作为版本号
const content = `{"version": "${version}"}`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'version.json'), content);
console.log('Version file generated:', version);
