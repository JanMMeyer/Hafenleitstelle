// @ts-check

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
	globalIgnores(['node_modules/*', 'dist/*', '.angular/*']),
	{
		files: ['**/*.{js,ts}'],
		extends: [js.configs.recommended, tseslint.configs.strict],
		plugins: {
			'unused-imports': unusedImports,
		},
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
]);
