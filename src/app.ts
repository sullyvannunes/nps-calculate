import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import  createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };