import express from 'express';
import { Topics } from 'controllers';
import { AuthMiddleware } from 'middlewares';

const DEFAULT_PATH = '/topics';

const app = express();
const router = express.Router();

router.get('', Topics.listAll);
router.get('/me', Topics.listMine);
router.get('/:id', Topics.findOne);
router.post('', Topics.create);
router.put('/:id', Topics.update);
router.delete('/:id', Topics.destroy);

app.use(DEFAULT_PATH, AuthMiddleware.tokenMiddleware, router);

export default app;
