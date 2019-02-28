const babel = require('@babel/core');
const loaderUtils = require('loader-utils');

function loader(source) {
    // this => loader 的上下文
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop() // sourceMap 的名字
    }, function(err, result) {
        cb(err, result.code, result.map);
    });
}

module.exports = loader;