import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";
import { componentsPlugin } from "vuepress-plugin-components";

export default defineUserConfig({
  lang: "zh-CN",
  title: "ChenSino",
  description: "ChenSino's Blog",
  base: "/",
  theme,
  plugins: [
    searchPlugin({
      // 你的选项
    }),
    photoSwipePlugin({
      // your options
    }),
    componentsPlugin({
      components: ["CodePen","Badge",]
    }),
  ],

});
