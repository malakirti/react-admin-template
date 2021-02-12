export default class ApiResponseException extends Error {
	private readonly code: number;
	private readonly data: any;
	private readonly memo: string;
	constructor(message: string, code: number, data?: any, memo?: string) {
		super();
		this.message = message;
		this.code = code;
		this.data = data as unknown;
		this.memo = memo || '';
	}
	toString() {
		return `code: ${this.code}; message: ${this.message}; data: ${JSON.stringify(this.data)}; memo: ${this.memo}`;
	}
}
