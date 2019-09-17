var express = require('express');
var cors = require('cors');
var serveStatic = require('serve-static');

var app = express();

app.use(cors());
app.use(serveStatic('c:/Users/Bill/Downloads', { 'index': ['default.html', 'default.htm'] }));

app.listen(3100);