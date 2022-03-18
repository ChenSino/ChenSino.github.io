#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m '添加依赖，解决文件和目录中文不支持的问题'
git push

