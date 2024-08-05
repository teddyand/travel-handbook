const express = require('express');
const { Liquid } = require('liquidjs');
const path = require('path');
var contentRouter = require('./content');
//var cityRouter =require('./city');

var router = express.Router();

var fs = require('fs')
//import { marked } from 'marked';
const { marked } = require('marked');


const app = express();
const engine = new Liquid({
  root: __dirname, // for layouts and partials
  extname: '.liquid'
})

//var subdir="";

const dirTarget=path.resolve('./docs');


function readCityLst(dir){
    var cityList=[];
  //同步读目录
    var files = fs.readdirSync(dir);
      files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
      //同步得到其状态
        const stat = fs.statSync(fullPath);
      //若不是目录则加入数组
        //if (!stat.isDirectory()) {      
          cityList.push(item);   
        //}  
      });
  return cityList;
}


function readMarkdownLst(dir){
    var markdownList=[];
  //同步读目录
    var files = fs.readdirSync(dir);
      files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
      //同步得到其状态
        const stat = fs.statSync(fullPath);
      //若不是目录则加入数组
        if (!stat.isDirectory()) {      
          markdownList.push(item);   
        }  
      });
  return markdownList;
}


app.engine('liquid', engine.express()) // register liquid engine
app.use('/markdown/content', contentRouter);  
//app.use('/city',cityRouter);
app.use(express.static(path.join(__dirname, '/')));
app.set('views', ['./partials', './views']) // specify the views directory
app.set('view engine', 'liquid') // set to default

app.get('/', function (req, res) {
  const todos = ['金石滩', '圣亚海洋世界', '老虎滩']
  const descriptions = ['金石滩度假区位于辽东半岛黄海之滨，距大连市中心50公里。这里由东西两个半岛和中间的众多景点组成……',
  					   '大连圣亚海洋世界位于大连市星海广场西侧，由圣亚海洋世界、圣亚极地世界、圣亚深海传奇等组成……',
  					   '大连南部海滨的中部,与滨海西路相邻，占地面积118万平方米，被国家旅游局首批评为AAAAA级景区……']
  res.render('todolist', {
    todos: todos,
    descriptions: descriptions,
    title: 'David\'s tourist handbook',  
    my_variable: true    
  })
})



app.get('/city', function(req, res, next) {
  //var html = marked('# Marked in Node.js\n\nRendered by **marked**.');
  //res.send(html);
  //var content="";
  //readMarkdownLst(dirTarget).forEach(function(e){
   // content+=e;
  //})
  //res.send(content);
  

  res.render('city',{
    titleList:readCityLst(dirTarget),
    title: 'you are welcome!'
    
  });
});


app.get('/markdown', function(req, res, next) {
  //var html = marked('# Marked in Node.js\n\nRendered by **marked**.');
  //res.send(html);
  //var content="";
  //readMarkdownLst(dirTarget).forEach(function(e){
   // content+=e;
  //})
  //res.send(content);
  var city=req.query.city;
  //var cityList=readMarkdown(dirTarget,article,"utf-8");
  var dirTarget=path.resolve('./docs'+'/'+city);

  res.render('index',{
    titleList:readMarkdownLst(dirTarget),
    title: 'welcome to ',
    city: city    
  });
});




module.exports = app
