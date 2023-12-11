module.exports = api => {
  api.cache(true);
  const plugins = [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', 'js', 'jsx'],
        alias: {
          '~': './src',
          '@theme': './src/theme',
          '@ui': './src/ui',
          '@lib': './src/lib',
        },
      },
    ],
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ];
  return {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    plugins,
  };
};
