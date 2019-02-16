fetch('/api/user').then(res => {
    return res.json();
}).then(data => {
    console.log(data);
});

// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/user', true);
// xhr.onload = function() {
//     console.log(xhr.response);
// };
// xhr.send();

/* if(DEV === 'dev') {
    console.log('hello world');
}

import jquery from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 手动引入中文包
moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();


import React from 'react';
import {render} from 'react-dom';

render(
    <h1>hello world</h1>,
    document.querySelector('#root')
);
 */

/* import calc from './test2.js';

calc.sum(1,2);

let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log(d); */

// import './a';
// import './b';
// console.log('index.js');

/* let btn = document.createElement('button');
btn.innerHTML = 'xxx';
btn.addEventListener('click', function() {
    // ES6 草案中的语法，JSONP 实现动态加载文件
    import('./source.js').then(res => {
        console.log(res.default);
    });
});
document.body.appendChild(btn); */

import './source.js';

if(module.hot) {
    module.hot.accept();
}