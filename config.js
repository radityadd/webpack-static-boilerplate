const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
    ],
  },
  jquery: false,
  html: [
    {
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    },
  ],
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
