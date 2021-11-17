import express from 'express';
import { Users } from 'controllers';
const DEFAULT_PATH = '/users';

const app = express();
const router = express.Router();

router.get(DEFAULT_PATH, Users.listAll);
router.get(DEFAULT_PATH + '/:id', Users.findOne);
router.post(DEFAULT_PATH, Users.create);
router.put(DEFAULT_PATH + '/:id', Users.update);
router.delete(DEFAULT_PATH + '/:id', Users.destroy);

app.use('/', router);

export default app;
