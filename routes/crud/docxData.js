var express = require('express');
var router = express.Router();
var docx = require('docx')
var path = require('path')
var fs = require('fs')
var http = require('http')
var DocxMerger =  require('docx-merger')
var bodyParser = require('body-parser');
var request = require('request-promise');
var red = require('child_process')
router.post('/', function (req, res) {
    console.log("req = ", req.body)
    var mod = req.body.mod
    var model = require('./../../models/'+mod)
    var obj={}
    if(mod === 'spent') {
        if(req.body.year !== 'NaN') obj = Object.assign({"time.year":req.body.year}, obj);
        if(req.body.months !== 'NaN') obj = Object.assign({"time.month":req.body.months}, obj);
    }
    else if(mod === 'income'){
        if(req.body.year !== 'NaN') obj = Object.assign({"time.year":req.body.year}, obj);
        if(req.body.months !== 'NaN') obj = Object.assign({"time.month":req.body.months}, obj);
    }
    else if(mod === 'employee'){
        
    }
    else if(mod === 'equipment'){
        if(req.body.SalleName !== 'NaN') obj = Object.assign({"SalleName": req.body.SalleName});
    }
    else if(mod === 'kid'){
        if(req.body.type === 'جميع الاطفال'){
            obj = {}
        }else if(req.body.type === 'الوفيات'){
            obj = {deathDate:{$ne : null}}
        }
        else{
            obj = {leavingDate:{$ne : null}}
        }
        
    }
    else if(mod === 'salary'){
        
        if(req.body.year !== 'NaN') obj = Object.assign({"time.year": req.body.year});
        if(req.body.months !== 'NaN') obj = Object.assign({"time.month": req.body.months});
        console.log("onj === ", obj)
    }
    else if(mod === 'track'){
        obj = {}
        if(req.body.days !== "NaN" ) obj = Object.assign({'time.day' : req.body.days}, obj)
        if(req.body.months !== "NaN") obj = Object.assign({'time.month' : req.body.months}, obj)
        if(req.body.year !== "NaN") obj = Object.assign({'time.year' : req.body.year}, obj)
        console.log("cur obj ", obj)
    }
    else if(mod === 'product'){
        obj = {}
        if(req.body.type !== "NaN" ) obj = Object.assign({'type1' : req.body.type}, obj)
        if(req.body.genre !== "NaN") obj = Object.assign({'genre' : req.body.genre}, obj)
    }
    console.log("obj = ", obj)
    model.find(obj).then(
       async (result)=>{
           console.log("result : ", result)
           var tab = model.getTable(result) 
           var arabicField = model.getFieldsArabic().reverse()
           console.log("tab ", tab)
           console.log("arabic ", arabicField.length)
            var mat = []
            mat.push(arabicField)
            if(req.body.mod == "salary")
                mat.push( Array(arabicField.length) )
            for(var i=0; i<tab.length; i++){
                mat.push(tab[i])
            }

            console.log("mat ======== ", mat)
            var mod;
            if(req.body.mod == "track")
                mod = req.body.genre
            else
                mod = req.body.mod

            var data = { // this variable contains the data you want to send
                data: mat,
                mod : mod
            }
            
            var options = {
                method: 'POST',
                uri: 'http://localhost:5000/postdata',
                body: data,
                json: true 
            };
            
            var returndata;
            var sendrequest = await request(options)
            .then(function (parsedBody) {
                console.log("parser data : ",parsedBody); 
                returndata = parsedBody;
                red.exec('start "" "C:/Users/Lahia omar/Documents/stuff/asso amal/docx_server"' , (err, stdout, stderr)=>{
                    if(err){
                        console.log("err ", err)
                    }else{
                        res.redirect('/')
                    }
                })
                
            })
            .catch(function (err) {
                console.log("error");
            });
            
        }
    )
});

const getDocx = (data,model)=>{
    return new Promise((resolve,reject)=>{
        var lenData = data
        var arabicField = model.getFieldsArabic().reverse()
        var tab = model.getTable(data)
        var doc = new docx.Document();

        //doc.addParagraph(getHeader())
        
        doc.createImage('public/images/logo-1.jpg')
        console.log("tab ==", tab)
        console.log("arabic len ", arabicField.length)
        console.log("table len", tab[0].length  )
        
        const table = doc.createTable(tab.length+1, tab[0].length)
        for(var i=0; i<arabicField.length; i++){
            table.getCell(0,i).addContent( new docx.Paragraph(arabicField[i]) )
        }
        for(var i =0; i<tab.length; i++){
            tab[i] =  tab[i].reverse()
            for(var j=0; j<tab[0].length; j++){
                table.getCell(i+1,j).addContent( new docx.Paragraph(tab[i][j]) )
                console.log("tab[i][j] : ", tab[i][j])
            }
        }
        doc.addTable(table)
        var exporter = new docx.LocalPacker(doc);        
        exporter.pack("myDoc").then(
                (packResolt)=>{
                console.log("pack resolt", packResolt)
                resolve()
        }).catch(
            (packCatch)=>{
                console.log("pack erro ", packCatch)
                reject(packCatch)
           }
        )
        
    })
}
const get = (left,rigth)=>{
  var para = new docx.Paragraph()
  var paraleft = new docx.Paragraph()
  var pararigth = new docx.Paragraph()
  for(var info of left){
    console.log("infos ", info.toString())
    var str = info.toString()
    //para.addRun( new docx.TextRun(str).break() )
    paraleft.addRun( new docx.TextRun(str) )
  }
  para.addRun(new docx.TextRun(paraleft))
  for(var info of rigth){
    var str = info.toString()
    pararigth.addRun( new docx.TextRun(str).tab() )
  }
  para.addRun( new docx.TextRun( pararigth ))
  return (para)
}
const getHeader = ()=>{
  const para = new docx.Paragraph().maxRightTabStop()
  //para.addRun(new docx.TextRun("left"))
  
  para.addRun(get(header.left,header.rigth))
  //para.addRun(new docx.Document().createImage(header.center.toString()))
  //para.addRun(new docx.TextRun("right").tab())
  return para
}

module.exports = router;