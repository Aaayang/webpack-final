const express = require('express');
const app = express();
const webpack = require('webpack');

let middle = require('webpack-dev-middleware');
let config = require('./webpack.config.js');
let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.send({
        name: 'aaayang',
        age: 18
    });
});

app.listen(3000);