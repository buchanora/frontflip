module.exports = {
    parser: 'sugarss',
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      'cssnano': {},
      'autoprefixer': {
        browsers: [
            'last 2 versions',
            'ie >= 9',
            'and_chr >= 2.3'
        ]
      }
    }
  }