import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/home",
  "/",
  {
    text: "Java",
    icon: "java",
    prefix: "/java/",
    children: [
      { text: "Java基础", icon: "java", link: "base/Serialization" },
      { text: "Java进阶", icon: "java", link: "advance/ProxyInJava" },
      { text: "Java虚拟机", icon: "java", link: "jvm/NewObject" },
      {
        text: "Java框架", icon: "java", prefix: "framework/", children: [
          { text: "Spring", link: "spring/" },
          { text: "Security", link: "security/" },
          { text: "SpringBoot", link: "springboot/" },
          { text: "Mybatis", link: "mybatis/" },
        ]
      },
      {
        text: "其他", icon: "other", prefix: "other/", children: [
          { text: "Maven", link: "maven/" },
          { text: "Gradle", icon: "java",link:"gradle/" },
          { text: "Java问题定位", icon: "java",link:"locateproblem/" },
          { text: "Java版本", icon: "java",link:"JdkVersion.md" },
        ]
      },
    ]
  },
  {
    text: "前端",
    icon: "javascript",
    prefix: "/frontweb/",
    children: [
      { text: "Vue", icon: "vue", link: "vue/" },
      { text: "Vite", icon: "vue", link: "vite/" },
      { text: "ES5", icon: "javascript", link: "es5/" },
      { text: "ES6", icon: "javascript", link: "es6/" },
      { text: "TypeScript", icon: "javascript", link: "typeScript/" },
    ]
  },
  {
    text: "前后分离项目搭建",
    icon: "app",
    link: "/other/web/README.md"
  },
  {
    text: "其他",
    icon: "others",
    prefix: "/other/",
    // children: ["git/","linux/","database/","tools/","training/","essay/","books/","distributeservice/"]
    children: [
      { text: "Web", icon: "vue", link: "web/" },
      { text: "Git", icon: "git", link: "git/GitCommands" },
      { text: "Linux", icon: "linux", link: "linux/CommonUsedCMD" },
      { text: "Docker", icon: "ubuntu", link: "docker/Docker.md" },
      { text: "DataBase", icon: "java", link: "database/CPUOverLoad" },
      { text: "MarkDown", icon: "markdown", link: "markdown/" },
      { text: "工具软件", icon: "software", link: "tools/IdeaDebug" },
      { text: "小组分享", icon: "share", link: "training/CloudServiceTraining" },
      { text: "随笔杂记", icon: "activity", link: "essay/2022-04-12" },
      { text: "电子书资源", icon: "app", link: "books/ebooks" },
      { text: "分布式微服务", icon: "class", link: "distributeservice/DistributeLock" },
      { text: "OAuth2.0", icon: "class", link: "oauth2/" },
    ]
  }
]);
