import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/java/": [
    {
      text: "Java 基础",
      icon: "discover",
      prefix: "base/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Java 进阶",
      icon: "blog",
      prefix: "advance/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Java 虚拟机",
      icon: "write",
      prefix: "jvm/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Java框架",
      icon: "write",
      prefix: "framework/",
      collapsable: true,
      children: "structure",
    }
  ],
  "/java/other/":[
   "JdkVersion",
    {
      text: "Maven",
      icon: "discover",
      prefix: "maven/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Gradle",
      icon: "discover",
      prefix: "gradle/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Java问题定位",
      icon: "java",
      prefix: "locateproblem/",
      collapsable: true,
      children: "structure",
    },
  ],
  "/frontweb/": [
    {
      text: "Vue",
      icon: "vue",
      prefix: "vue/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Vite",
      icon: "vue",
      prefix: "vite/",
      collapsable: true,
      children: [],
    },
    {
      text: "ECMAScript 5",
      icon: "write",
      prefix: "es5/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "ECMAScript 6",
      icon: "blog",
      prefix: "es6/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "TypeScript",
      icon: "typescript",
      prefix: "typeScript/",
      collapsable: true,
      children: "structure",
    },
  ],
  "/other/": [

    {
      text: "Git",
      icon: "git",
      prefix: "git/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "Linux",
      icon: "linux",
      prefix: "linux/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "repo",
      prefix: "database/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "MarkDown",
      icon: "markdown",
      prefix: "markdown/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "工具软件",
      icon: "software",
      prefix: "tools/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "小组分享",
      icon: "share",
      prefix: "training/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "随笔分享",
      icon: "share",
      prefix: "essay/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "web",
      icon: "share",
      prefix: "web/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "分布式微服务",
      icon: "share",
      prefix: "distributeservice/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "OAuth2.0",
      icon: "share",
      prefix: "oauth2/",
      collapsable: true,
      children: "structure",
    },{
      text: "Docker",
      icon: "ubuntu",
      prefix: "docker/",
      collapsable: true,
      children: "structure",
    },
  ]
});
