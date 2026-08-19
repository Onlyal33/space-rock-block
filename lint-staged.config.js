const formatCommand = 'prettier --write';

module.exports = {
  '*.{js,jsx,ts,tsx}': [formatCommand, 'eslint --fix'],
  '*.{css,scss,sass,md,json}': [formatCommand],
};
