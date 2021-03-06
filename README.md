# List My Repositories
Github API 串接試題。

View in Github Pages - [Link](https://lastor-chen.github.io/github_repo_list/)

## Overview
* 串接 [Github API](https://developer.github.com/v3/)，列出自己的 Repositories
* 無限滾動分頁，使用 IntersectionObserver API
  * 當 Repos 全數加載完畢後，會解除 Observer 釋放效能。
* 背景圖視差滾動效果 (行動裝置時不動作，效能優化)
* UI 設計，參考 Github Your Repositories 頁面，進行簡化
* 支持 RWD
* 加載中，會顯示 Loading Spinner 特效
* 如 Github API 無回應，會 alert 錯誤訊息

※ 已確認，可正常工作的瀏覽器 Chrome、Firefox <br>
※ 已確認，無法工作的瀏覽器 IE

## 技術說明
使用 Vue 框架，以 CDN 引入方式製作。<br>
搭配相關套件，拆分頁面 Components，不需 webpack 打包即可瀏覽。

仿照 vue-cli，以 main.js 作為進入點，並用 App.vue 作為 main viewer。 <br>
由於 http-vue-loader 不支持 js import，故將 API tools function 於 main.js 引入。

#### 使用套件
套件均使用 CDN 引入。

* Vue
* http-vue-loader
* Bootstrap
* axios
* moment.js
* SweetAlert2

## 其他說明
本地端執行時，因使用了 JS module，會出現 CORS 錯誤。<br>
請使用 VSCode 的 Live Server 之類的套件，建立 local server 執行。

如欲使用 Vue-devtools 查看，請將 index.html 中，vue 的引入去掉 min 即可。
<pre>
// 去掉 min
<script src="https://unpkg.com/vue@2.6.11/dist/vue<b>.min</b>.js"></script>
</pre>