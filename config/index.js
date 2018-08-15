const config = require('./config.json');

const env = process.env.NODE_ENV;

if (env !== undefined) {
  const envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
