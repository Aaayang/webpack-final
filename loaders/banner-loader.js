const fs = require('fs');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

function loader(source) {
    this.cacheable && this.cacheable(); // 开启 loader 缓存，也是默认的
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    };
    validateOptions(schema, options, 'banner-loader');
    if(options.filename) {
        // 这个文件变化，也会让 webpack 重新打包
        this.addDependency(options.filename);
        fs.readFile(options.filename, 'utf8', (err, data) => {
            cb(err, `/**${data}**/${source}`);
        });
    } else {
        cb(null, `/**${options.text}**/${source}`);
    }
    return source;
}

module.exports = loader;