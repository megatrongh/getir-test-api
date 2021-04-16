import express from 'express';
import { createValidator } from 'express-joi-validation';
import RecordController from '../controllers/record';
import { records } from '../validators';

const Router = express.Router();
const { body } = createValidator({ passError: true });

Router.post('/records', [body(records)], RecordController);

export default Router;
