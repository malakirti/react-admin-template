import { makeAutoObservable } from 'mobx';

class Test1 {
	test1 = 'test1';

	constructor() {
		makeAutoObservable(this);
	}

	onSetTest1(name: string): void {
		this.test1 = name;
	}
}

module.exports = new Test1();
