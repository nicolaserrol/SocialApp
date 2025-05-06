module.exports = {
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier', 'react-hooks', 'react', 'react-native'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
