const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
    ],
  },
  jquery: true,
  html: {
    template: './src/index.html',
    build: 'index.html',
  },
  cdn: {
    upload: false,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/static',
      domain: 'https://ecs7.tokopedia.net/',
    },
  },
};

module.exports = config;
