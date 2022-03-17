#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m '添加插件，vuepress支持mermaid解析'
git push

