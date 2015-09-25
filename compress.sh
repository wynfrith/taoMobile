#!/bin/zsh

echo "压缩公共js"
uglifyjs m/assets/common/mobile.js \
m/assets/common/operate.js \
m/vendors/zepto/*.js \
m/vendors/fastclick/*.js \
m/vendors/art-template/template.min.js \
m/vendors/art-template/template.helper.js \
m/vendors/history/*.js \
-o m/dist/common.js -c -m

echo "压缩独立js"
uglifyjs m/assets/jobs.js -o m/dist/jobs.js -c -m
uglifyjs m/assets/shlist.js -o m/dist/shlist.js -c -m
uglifyjs m/assets/jobdetail.js -o m/dist/jobdetail.js -c -m
uglifyjs m/assets/shdetail.js -o m/dist/shdetail.js -c -m

echo "压缩css"
minify --output m/dist/style.css m/assets/main.css

echo "压缩html"
html-minifier m/jobs/list.html -o m/dist/jobs/list.html --remove-comments --conservative-collapse --collapse-whitespace
html-minifier m/jobs/detail.html -o m/dist/jobs/detail.html --remove-comments --conservative-collapse --collapse-whitespace
html-minifier m/shs/list.html -o m/dist/shs/list.html --remove-comments --conservative-collapse --collapse-whitespace
html-minifier m/shs/detail.html -o m/dist/shs/detail.html --remove-comments --conservative-collapse --collapse-whitespace

