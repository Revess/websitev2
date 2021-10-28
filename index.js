const express = require('express');
const app = express();
const http = require('http').Server(app);
var session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const ip = require("ip");

var ip_address = "localhost";//ip.address();

http.listen(5000, function () {
    console.log('listening on ' + ip_address + ':5000');
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(__dirname + '/client/'))
app.use(['/projects/smartlappen', '/projects/AWN', '/projects/ADM', '/projects/lyre', '/projects/studai', '/projects'], express.static(__dirname + '/client/pages/projects/'))
app.use(['/papers/ADM', '/papers'], express.static(__dirname + '/client/pages/papers/'))
app.use('/resume', express.static(__dirname + '/client/pages/resume/'))
