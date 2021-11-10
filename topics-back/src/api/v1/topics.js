import express from 'express';
import { Topics } from 'controllers';
const DEFAULT_PATH = '/topics';

const app = express();
const router = express.Router();

router.get(DEFAULT_PATH, Topics.listAll);
router.get(DEFAULT_PATH + '/:id', Topics.findOne);
router.post(DEFAULT_PATH, Topics.create);
router.put(DEFAULT_PATH + '/:id', Topics.update);
router.delete(DEFAULT_PATH + '/:id', Topics.destroy);

app.use('/', router);

export default app;
