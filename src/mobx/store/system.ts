import { makeAutoObservable } from 'mobx';

class System {
	private systemName: string;

	constructor() {
		this.systemName = 'React Admin Template';

		makeAutoObservable(this);
	}
}

// export default
module.exports = new System();
