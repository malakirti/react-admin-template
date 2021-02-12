module.exports = {
	root: true,
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order',
		'stylelint-config-prettier',
		'stylelint-config-css-modules',
	],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		'color-named': 'never',
		'no-empty-source': true,
		'color-hex-case': 'lower',
		'number-leading-zero': 'always',
		'declaration-no-important': true,
		'no-descending-specificity': true,
		'comment-empty-line-before': 'always',
		'no-invalid-double-slash-comments': true,
		'plugin/declaration-block-no-ignored-properties': true,
		'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }],
		'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }],
	},
};
