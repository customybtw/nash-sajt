const app = require('./app');
const config = require('./config/env');
const { getPool } = require('./config/database');

async function start() {
  try {
    await getPool();
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
