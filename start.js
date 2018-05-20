var Tesseract = require('tesseract.js');
var fs = require('fs');
var imageFolder = "images/";
var outputFolder = "output/";
var arrayOfImages = [];

//deleting small files
fs.readdirSync(imageFolder).forEach(file => {
  if ( fs.statSync(imageFolder + "/" + file).size < 20000 ){
      console.log("Unnecessary file found, skipping");
      fs.unlink(imageFolder + "/" + file);
  } else {
      console.log (file);
      console.log (fs.statSync(imageFolder + file).size);
      arrayOfImages.push(file);
  }
});

arrayOfImages.forEach(image => {
  Tesseract.recognize(imageFolder + image)
    .progress(function  (p) { console.log('progress', p)})
    .finally(resultOrError => {
      var wstream = fs.createWriteStream(outputFolder + image + '.txt');
      wstream.write(resultOrError.text);
      wstream.end();
    });
    return true;
});