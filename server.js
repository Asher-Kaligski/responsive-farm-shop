const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(__dirname + '/dist/responsive-farm-shop'));
 
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/responsive-farm-shop/index.html'));
})


app.listen(process.env.PORT || 8080);
