module.exports = {
  singleQuote: true,
  useTabs: false,
  trailingComma: 'all',
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: [
    'prettier-plugin-tailwindcss',
    // require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
  endOfLine: 'lf',
};
