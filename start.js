var Tesseract = require('tesseract.js');
var myImage = "./image.jpg";

Tesseract.recognize(myImage)
.progress(function  (p) { console.log('progress', p)    })
.then(function (result) { console.log('result', result) })