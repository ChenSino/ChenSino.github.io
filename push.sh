#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m '证明jdbc打破双亲委派！'
git push

