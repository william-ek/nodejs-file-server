var express = require('express');
var cors = require('cors');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var fs = require('fs');

const config = require('./resources/config.json');
const environment = config.development;

var app = express();

app.use(cors());

// app.use(serveStatic('c:/Users/Bill/Downloads', { 'index': ['default.html', 'default.htm'] }));

app.use(bodyParser.json({

  limit: '50mb',

  parameterLimit: 100000,

  type: 'application/json'

}));

app.get('/:filename', function(request, response) {

    console.log(' get filename');

    console.log(request.params.filename);

    fs.readFile(environment.file_path + request.params.filename, { encoding: 'utf-8' }, function(err, data) {
        if (!err) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ status: 'good', content: data }));
            console.log('status : good');
            response.end();
        } else {
            console.log(err);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ status: 'not-found', content: err }));
            console.log('status : bad' + err);
            response.end();
        }
    });

});


app.post('/:filename', function(request, response) {

    console.log('create filename');
    console.log(request.params.filename);

    var wstream = fs.createWriteStream('c:/Users/Bill/Downloads/' + request.params.filename)

    .on('error', function(err) {

        response.statusCode = 500;

        response.setHeader('Content-Type', 'application/json');

        response.end(JSON.stringify({ status: 'failed', content: err }));

    });

    wstream.write(JSON.stringify(request.body));
    wstream.end();

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ status: 'good' }));

});

app.delete('/:filename', function(request, response) {

    console.log('delete filename');
    console.log(request.params.filename);


    fs.unlink('c:/Users/Bill/Downloads/' + request.params.filename, (error) => {
        console.error(error);
        return;
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ status: 'good' }));

});

app.listen(environment.node_port);