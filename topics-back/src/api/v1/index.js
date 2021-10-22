import express from 'express';
import teste from './teste';

const app = express();

app.use(teste);

export default app;
