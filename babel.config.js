const config = require('./config.json')

module.exports = function(api) {
  // Configure babel
  api.cache(true)

  const babelConfig = {
    presets: [ 'babel-preset-expo' ],
    plugins: [[
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "test/*": ["./test/"]
        }
      }
    ]]
  }

  // Handle mocks for native modules
  if(!config.isEjected) {
    babelConfig.plugins[0][1].alias['react-native-open-application$'] = './src/mocks/Launcher'
  }

  // Return babel config
  return babelConfig
}
