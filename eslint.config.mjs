import config from 'eslint-config-upleveled';

const eslintConfig = [
  {
    ignores: [
      'content/**/*',
      '*.config.*',
      '.stylelintrc.cjs',
      'tailwind.config.*',
      'next.config.*',
      'postcss.config.*',
      'eslint.config.mjs',
      'scripts/**/*',
    ],
  },
  ...config,
  {
    rules: {
      'react-x/no-array-index-key': 'off',
      'react-x/no-leaked-conditional-rendering': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'jsx-a11y/media-has-caption': 'off',
    },
  },
];

export default eslintConfig;
