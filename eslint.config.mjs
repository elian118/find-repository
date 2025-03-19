import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'on',
      '@typescript-eslint/explicit-function-return-type': 'on',
      '@typescript-eslint/explicit-module-boundary-types': 'on',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/rules-of-hooks': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-unused-expressions': ['warn'],
    },
  }),
];

export default eslintConfig;
