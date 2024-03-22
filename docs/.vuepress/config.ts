import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: "zh-CN",
  title: "ChenSino",
  description: "ChenSino's Blog",
  base: "/blog/",
  theme,
  plugins: [

  ],
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
});
