import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";

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
  ],
});
