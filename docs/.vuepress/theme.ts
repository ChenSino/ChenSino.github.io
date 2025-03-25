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
  logo: "/logo.svg",

  repo: "ChenSino/ChenSino.github.io",

  docsDir: "docs",

  docsBranch:"dev",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "鄂ICP备2024079959号-1 鄂公网安备42018502007734号",

  copyright: '',

  displayFooter: true,

  themeColor: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    name:"ChenSino",
    avatar:"https://ddns.chensina.cn:29000/afatpig/blog/20220802180305.png",
    description: "洛星星的笔记",
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
      "/other/windows/系统安装.html": ["chensino"],
    },
  },
  plugins: {
    icon: {
      assets: "fontawesome"
    },
    pwa:{
      showInstall: true,
      manifest: {
        name: "ChenSino技术博客",
        short_name: "ChenSino",
        description: "Good good study,day day up!"
      }
    },
    sitemap:false,
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
    blog: true,
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
  },
  markdown: {
    mermaid: true,
    align: true,
    attrs: true,
    component: true,
    demo: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tasklist: true,
    vPre: true,
  },
});
