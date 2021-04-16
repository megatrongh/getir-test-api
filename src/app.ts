import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import Router from './routes';
import documentation from './documentation';
import { handleJoiValidationError, notFound } from './utils/common';

// Load env vars
dotenv.config();

const app = express();

// database connection
const dbEndpoint: string = process.env.DB_URL || '';
mongoose.connect(dbEndpoint, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// routes middleware
app.use('/api/v1/', Router);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(documentation, { explorer: true })
);

app.use(handleJoiValidationError);
app.use(notFound);

export default app;
