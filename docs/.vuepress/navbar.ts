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
    text: "前后分离项目搭建",
    icon: "app",
    link: "/other/web/"
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
    text: "其他",
    icon: "others",
    link: "/other/"
  }
]);
