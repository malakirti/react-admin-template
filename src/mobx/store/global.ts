import { makeAutoObservable } from 'mobx';

class Global {
	private permissions: string[];

	constructor() {
		this.permissions = [
			'admin',
			'张三',
			'李四',
		];

		makeAutoObservable(this);
	}

	setPermissions(permissions: string[]) {
		this.permissions = permissions;
	}
}

// module.exports = new Global();

export default new Global();
