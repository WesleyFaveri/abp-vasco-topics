import express from 'express';
import teste from './teste';
import users from './users';
import topics from './topics';

const app = express();

app.use(teste);
app.use(users);
app.use(topics);

export default app;
