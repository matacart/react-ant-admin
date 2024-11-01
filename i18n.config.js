// 
// module.exports = {
//     // delay: 1500, // 自动翻译延时，必须大于 1000 ms，否则调用百度翻译 API 会失败
//     mapFile: '', // 需要生成默认 map 的文件
//     appid: '', // 百度翻译 appid
//     key: '', // 百度翻译密钥
//     output: 'i18n.data.js', // i18n 输出文件
//     indent: 4, // i18n 输出文件缩进
//     entry: '', // 要翻译的入口目录或文件，默认为命令行当前的 src 目录
//     prefix: '', // i18n 变量前缀  i18n 变量生成规则 prefix + id + suffix
//     suffix: '', // i18n 变量后缀
//     id: 0, // i18n 自增变量 id
//     translation: false, // 是否需要自动翻译中文
//     to: 'en', // 中文翻译的目标语言
//     mode: 1, // 0 翻译所有 i18n 数据，1 只翻译新数据
//     loader: 'loader.js',
//     pluginPrefix: '$t', // i18n 插件前缀 例如 vue-i18n: $t， react-i18next: t
//     include: [], // 需要翻译的目录或文件
//     exclude: [], // 不需要翻译的目录或文件 如果 exclude include 同时存在同样的目录或文件 则 exclude 优先级高
//     extra: /(\.a)|(\.b)$/, // 默认支持 .vue 和 .js 文件 如果需要支持其他类型的文件，请用正则描述 例如这个示例额外支持 .a .b 文件
// }