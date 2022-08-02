import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";



export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "ChenSino",
    url: "https://ChenSino.github.io",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "ChenSino/ChenSino.github.io",

  docsDir: "docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "除了自渡，其他人爱莫能助",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "洛星星的爸爸，芳狗子的老公",
    intro: "https://chensino.github.io/",
    medias: {
      Baidu: "https://example.com",
      Weibo: "https://example.com",
      Zhihu: "https://example.com",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["123456"],
    },
  },
  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "ChenSino/Giscus",
      repoId: "R_kgDOHwOlTQ",
      category: "Announcements",
      categoryId: "DIC_kwDOHwOlTc4CQkSn",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      // enableAll: true,
      tabs: true,
      chart: true,
      echarts: true,
      mermaid: true,
      codetabs: true,
      demo: true,
      tasklist: true,
      // 启用图片标记
      imageMark: true,
      // 启用图片大小
      imageSize: true,
      //幻灯片
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      //语法高亮
      mark: true,
      //流程图
      flowchart: true,
      //自定义容器
      container: true
    },
  },
});
