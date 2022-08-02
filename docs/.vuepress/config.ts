import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "ChenSino",
  description: "ChenSino's Blog",
  base: "/",
  theme,
});
