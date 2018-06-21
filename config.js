const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
      './src/js/jqueryui.js',
    ]
  },
  jquery: true,
  html: {
    template: './src/index.html',
    build: 'index.html'
  },
  cdn: {
    upload: true,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/static',
      domain: 'https://ecs7.tokopedia.net/'
    }
  }
}

module.exports = config
