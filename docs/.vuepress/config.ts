import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";
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
    componentsPlugin({
      components: ["CodePen","Badge"],
      backToTop: true
    }),
  ],

});
