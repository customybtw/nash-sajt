import dotenv from 'dotenv';
import app, { init } from './app.js';

dotenv.config();

const start = async () => {
  try {
    await init();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
};

start();
