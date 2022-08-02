import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";



export default hopeTheme({
  hostname: "https://ChenSino.github.io",

  fullscreen: true,

  author: {
    name: "ChenSino",
    url: "https://ChenSino.github.io",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "ChenSino/ChenSino.github.io",

  docsDir: "docs",

  docsBranch:"dev",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "除了自渡，其他人爱莫能助",

  displayFooter: true,

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    name:"ChenSino",
    avatar:"https://afatpig.oss-cn-chengdu.aliyuncs.com/blog/20220802180305.png",
    roundAvatar: true,
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
    photoSwipe: {
      
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
