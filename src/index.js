class Person {
    constructor() {
        this.name = 'xxx';
    }
    getName() {
        console.log(this.name);
    }
}

let x = new Person();
x.getName();