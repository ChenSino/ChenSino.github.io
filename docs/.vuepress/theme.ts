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

  footer: "鄂ICP备2024079959号-1",

  copyright: '',

  displayFooter: true,

  themeColor: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    name:"ChenSino",
    avatar:"https://ddns.chensina.cn:29000/afatpig/blog/20220802180305.png",
    roundAvatar: true,
    description: "洛星星的爸爸",
    intro: "https://chensina.cn/",
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
    search:{
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
    },
    blog: {

    },
    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    // comment: {
    //   /**
    //    * Using Giscus
    //    */
    //   provider: "Giscus",
    //   repo: "ChenSino/Giscus",
    //   repoId: "R_kgDOHwOlTQ",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOHwOlTc4CQkSn",
    // },
    photoSwipe: {

    },
    mdEnhance: {

    },
  }
});
