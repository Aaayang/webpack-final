let {SyncHook} = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            // 挂载钩子
            arch: new SyncHook(['name'])
        };
    }
    tap() {
        // 注册监听函数
        this.hooks.arch.tap('node', function(name) {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', function(name) {
            console.log('react', name);
        });
    }
    start() {
        this.hooks.arch.call('xxx');
    }
}

let l = new Lesson();
// 注册两个事件
l.tap();
// 启动钩子
l.start();