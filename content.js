
var express = require('express');
var app = express();
var marked = require("marked");
 
var path = require('path');
var fs = require('fs');
 
//得到绝对路径
//var subdir="dalian";
//var dirTarget=path.resolve('./docs'+'/'+subdir);
 
//读取dirTarget下的markdown文件内容
function readMarkdown(dir,articleName,encode){
  var articleContent;
  //同步读目录
  var dir=dir+"/"+articleName;
  articleContent=fs.readFileSync(dir,encode);
 
  return articleContent;
}
 
app.get('/', function(req, res, next) {
  //得到前端发来的选中文章名
  var city = req.query.city
  var article=req.query.article;
  var dirTarget=path.resolve('./docs'+'/'+city);
  var articleContent=readMarkdown(dirTarget,article,"utf-8");
  //渲染jade视图文件，传入相应参数 
  res.render('content', { 
  	title:"正在浏览"+article,
  	note:articleContent, 
    content: marked.parse(articleContent) });
});
 
module.exports = app;