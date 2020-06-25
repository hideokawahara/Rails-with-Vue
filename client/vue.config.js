const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../build'),
  devserver: {
    proxy: {
      '/api': {
        target: 'https://immense-reaches-97957.herokuapp.com/'
      }
    }
  }
}