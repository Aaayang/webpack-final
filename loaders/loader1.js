// source 代表源码
function loader(source) {
    console.log('loader1');
    return source;
}

module.exports = loader;