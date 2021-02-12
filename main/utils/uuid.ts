/**
 * from: https://github.com/Microsoft/vscode/blob/master/src/vs/base/common/uuid.ts
 */

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// prep-work
const data = new Uint8Array(16);
const hex: string[] = [];
for (let i = 0; i < 256; i++) {
	hex.push(i.toString(16).padStart(2, '0'));
}

const fillRandomValues = function fillRandomValues(bucket: Uint8Array): Uint8Array {
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < bucket.length; i++) {
		bucket[i] = Math.floor(Math.random() * 256);
	}
	return bucket;
};

export function generateUuid(): string {
	// get data
	fillRandomValues(data);

	// set version bits
	// eslint-disable-next-line no-bitwise
	data[6] = (data[6] & 0x0f) | 0x40;
	// eslint-disable-next-line no-bitwise
	data[8] = (data[8] & 0x3f) | 0x80;

	// print as string
	let i = 0;
	let result = '';
	result += hex[data[i]];
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += '-';
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += '-';
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += '-';
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += '-';
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += hex[data[i += 1]];
	result += hex[data[i + 1]];

	return result;
}

export function isUUID(value: string): boolean {
	return UUID_PATTERN.test(value);
}
