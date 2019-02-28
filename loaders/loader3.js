// 源码
function loader(source) {
    console.log('loader3');
    return 'hello';
}

loader.pitch = function() {
    console.log('loader3 的 pitch');
};

module.exports = loader;