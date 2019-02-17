// source 代表源码
function loader(source) {
    console.log('loader2');
    return source;
}

module.exports = loader;