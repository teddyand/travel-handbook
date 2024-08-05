var express = require('express');
var app = express();


var path = require('path');
var fs = require('fs');


var subdir="shanghai";
var dirTarget=path.resolve('./docs'+'/'+subdir);

function readCityLst(dir){
    var CityList=[];
  //同步读目录
    var files = fs.readdirSync(dir);
      files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
      //同步得到其状态
        const stat = fs.statSync(fullPath);
      //若不是目录则加入数组
        if (!stat.isDirectory()) {      
          CityList.push(item);   
        }  
      });
  return CityList;
}

app.get('/markdown', function(req, res, next) {
  //var html = marked('# Marked in Node.js\n\nRendered by **marked**.');
  //res.send(html);
  //var content="";
  //readMarkdownLst(dirTarget).forEach(function(e){
   // content+=e;
  //})
  //res.send(content);
  

  res.render('index',{
    titleList:readCityLst(dirTarget)
  });
});


module.exports = app
