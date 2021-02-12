import { makeAutoObservable } from 'mobx';

class Test2 {
	test2 = 'test2';

	constructor() {
		makeAutoObservable(this);
	}

	onSetTest2(name: string): void {
		this.test2 = name;
	}
}

module.exports = new Test2();
