const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
      './src/js/jqueryui.js',
    ],
  },
  jquery: true,
  html: [
    {
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    },
    {
      template: './src/buttons/index.html',
      filename: './buttons/index.html',
      chunks: ['main'],
    },
    {
      template: './src/example/index.html',
      filename: 'example/index.html',
      chunks: ['main'],
    },
    {
      template: './src/example/form.html',
      filename: 'example/form.html',
      chunks: ['main'],
    },
  ],
  cdn: {
    upload: false,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/webpacktest/',
      domain: 'https://ecs7.tokopedia.net/',
    },
  },
};

module.exports = config;
