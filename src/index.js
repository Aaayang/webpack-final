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

if(DEV === 'dev') {
    console.log('hello world');
}

if(module.hot) {
    module.hot.accept();
}