module.exports = {
  apps: [
    {
      name: 'auth-3000',
      script: './server.js',
      env: {
        PORT: 3000,
        HOST: '127.0.0.1',
      },
    },
    {
      name: 'auth-3001',
      script: './server.js',
      env: {
        PORT: 3001,
        HOST: '127.0.0.1',
      },
    },
    {
      name: 'auth-3002',
      script: './server.js',
      env: {
        PORT: 3002,
        HOST: '127.0.0.1',
      },
    },
  ],
};