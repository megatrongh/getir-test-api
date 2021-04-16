import dotenv from 'dotenv';

import app from './app';
import logger from './utils/logger';

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(
    `[${
      process.env.APP_NAME || `Getir api-server`
    }]: is running at http://localhost:${PORT}`
  );
});
