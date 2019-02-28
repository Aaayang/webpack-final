// 源码
function loader(source) {
    console.log('loader1');
    return source;
}

loader.pitch = function() {
    console.log('loader1 的 pitch');
};

module.exports = loader;