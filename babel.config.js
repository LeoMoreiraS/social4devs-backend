module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@shared': './src/shared',
          '@user': './src/modules/user/',
          '@post': './src/modules/post/',
          '@specialty': './src/modules/specialty/',
          '@follow': './src/modules/follow/',
          '@message': './src/modules/message/',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['cycle-circular'],
  ],
};
