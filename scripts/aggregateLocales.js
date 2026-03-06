// scripts/aggregateLocales.js
const fs = require('fs');
const path = require('path');
const glob = require('glob'); // 需要安装: npm install glob

// 1. 配置：要扫描的目录和生成目录
const SCAN_DIRS = ['src/pages/**', 'src/components/**', 'src/services/**'];
const OUTPUT_DIR = 'src/locales';
const LOCALES = ['zh-CN', 'en-US', 'zh-TW']; // 支持的语言

// 2. 初始化聚合对象，如：{ 'zh-CN': {}, 'en-US': {} }
const aggregated = {};
LOCALES.forEach(locale => aggregated[locale] = {});

// 3. 核心：递归查找并合并所有 locale 文件
SCAN_DIRS.forEach(pattern => {
  glob.sync(pattern).forEach(itemPath => {
    const localesDir = path.join(itemPath, 'locales');
    if (fs.existsSync(localesDir)) {
      // 从路径生成命名空间前缀
      const namespace = generateNamespace(itemPath);
      
      LOCALES.forEach(locale => {
        const filePath = path.join(localesDir, `${locale}.json`);
        if (fs.existsSync(filePath)) {
          try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            // 为内容添加命名空间前缀后深度合并到聚合对象中
            const namespacedContent = addNamespaceToKeys(content, namespace);
            deepMerge(aggregated[locale], namespacedContent);
          } catch (e) {
            console.error(`Error reading ${filePath}:`, e.message);
          }
        }
      });
    }
  });
});

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 4. 将聚合后的对象写入到 src/locales/ 目录
LOCALES.forEach(locale => {
    const outputPath = path.join(OUTPUT_DIR, `${locale}.ts`);
    const fileContent = `// 此文件由 scripts/aggregateLocales.js 自动生成
        const ${locale.replace('-', '')} = ${JSON.stringify(aggregated[locale], null, 2)};
        export default ${locale.replace('-', '')};
    `;
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    console.log(`✅ 已生成 ${outputPath}`);
});

console.log('🎉 所有语言文件聚合完成！');

// --- 生成命名空间 ---
function generateNamespace(itemPath) {
  // 将路径转换为命名空间，例如: src/pages/Settings/Index -> settings.index
  const relativePath = path.relative('src', itemPath).split(path.sep);
  // 移除第一个元素（pages, components, services等）
  if (relativePath[0] === 'pages' || relativePath[0] === 'components' || relativePath[0] === 'services') {
    relativePath.shift();
  }
  
  // 转换为小写并使用点号连接
  return relativePath
    .map(segment => segment.toLowerCase())
    .join('.');
}

// --- 为对象的所有键添加命名空间前缀 ---
function addNamespaceToKeys(obj, namespace) {
  const result = {};
  
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      // 对于嵌套对象，递归处理，并构建完整路径
      const nestedResult = addNamespaceToKeys(obj[key], namespace ? `${namespace}.${key}` : key);
      Object.assign(result, nestedResult);
    } else {
      // 如果值不是对象，直接添加带命名空间的键
      const fullKey = namespace ? `${namespace}.${key}` : key;
      result[fullKey] = obj[key];
    }
  }
  return result;
}

// --- 深度合并工具函数 ---
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}