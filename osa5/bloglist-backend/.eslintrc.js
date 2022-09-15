module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"jest": true,
	},
	"extends": "eslint:recommended",
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"eqeqeq": "error",
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"no-console": 0,
	}
}
