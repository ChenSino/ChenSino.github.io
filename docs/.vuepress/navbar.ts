import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/home",
  "/",
  {
    text: "Java",
    icon: "java",
    link: "/java/"
  },
  {
    text: "前端",
    icon: "javascript",
    link: "/frontweb/",
  },
  {
    text: "设计模式",
    icon: "java",
    link: "/designpattern/",
  },
  {
    text: "C++学习",
    icon: "app",
    link: "/cpp/study/"
  },
  {
    text: "家庭服务器",
    icon: "app",
    link: "/myserver/"
  },
  {
    text: "更多...",
    icon: "others",
    link: "/other/"
  }
]);
