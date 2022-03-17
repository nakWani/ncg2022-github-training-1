This Documents and Project Resources Maked by Taro Nonoyama a.k.a. n2-freevas (taro.nonoyama@access-company.com)

# 概要
Github研修のための簡単なプロジェクトリソースです。
内容としては、JavaScriptファイルに登録しておいた言葉リソースを文節・ないし文章にしてそれをhtmlに出力します。

This Project Resources is for Github Communication Training.
main.html and some JavaScript file generate Phrase or Sentence, and can show the result in Browser.

<br>

# コンパイル方法
main.htmlをブラウザに投げればいいです。

Drag and Drop main.html, and it is allright.

<br>

# プロジェクトの構成 / Project Structure

## Japanese

.  
├── README.md    
├── script  
｜    ├── main.js -> 集約関数  
｜    ├── markdown-to-html.js -> なんちゃってマークダウンを対応するElementに変換する。  
｜    ├── sentence  
｜    ｜    ├── intro_1.js -> 一人目の自己紹介を記載  
｜    ｜    ├── intro_2.js -> 二人目の自己紹介を記載  
｜    ｜    ├── intro_3.js -> いれば、三人目の自己紹介を記載  
├── static  
｜    ├── reset.css -> おまじない  
｜    ├── common.css -> スタイルシート  
└── main.html 

<br>


## Japanese

.  
├── README.md  
├── script  
｜    ├── main.js -> Center Process  
｜    ├── markdown-to-html.js -> Fake Markdown string compile to HTML element.  
｜    ├── sentence  
｜    ｜    ├── intro_1.js -> introduce menber 1  
｜    ｜    ├── intro_2.js -> introduce menber 2  
｜    ｜    ├── intro_3.js -> introduce menber 3  
├── static  
｜    ├── reset.css -> Magic  
｜    ├── common.css -> Main StyleSheet
└── main.html 

<br>
