const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
    ],
    'about/about': [
      './src/js/index.js',
      './src/sass/style.scss',
      './src/about/about.js',
    ],
  },
  jquery: false,
  html: [
    {
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    },
    {
      template: './src/about/index.html',
      filename: './about/index.html',
      chunks: ['about/about'],
    },
  ],
  cdn: {
    upload: true,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/webpacktest/',
      domain: 'https://ecs7.tokopedia.net/',
    },
  },
};

module.exports = config;
