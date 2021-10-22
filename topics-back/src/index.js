import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import sdk from './sdk';

require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

const httpServer = http.createServer(sdk(app));

httpServer.listen(process.env.PORT, () => {
  console.log(`🚀 http://localhost:${process.env.PORT}`);
});

export default app;
