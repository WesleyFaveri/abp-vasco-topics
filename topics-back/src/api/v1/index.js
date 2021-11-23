import express from 'express';
import teste from './teste';
import users from './users';
import topics from './topics';
import auth from './auth';

const app = express();

app.use(teste);
app.use(users);
app.use(topics);
app.use(auth);

export default app;
