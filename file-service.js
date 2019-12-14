var express = require('express');
const http = require('http');
const path = require('path');

const config = require('./resources/config.json');
const environment = config.development;

var app = express();

app.use(express.static(path.join(environment.dist_path,'assignments-demo')));

app.use('/',(req,res)=>{
	
	res.sendFile(path.join(environment.dist_path,'assignments-demo/index.html'))
});

app.listen(3001);