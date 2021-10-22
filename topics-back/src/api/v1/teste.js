import express from 'express';

const DEFAULT_PATH = '/teste';

const app = express();
const router = express.Router();

const post = async (req, res) => {
  try {
    res.status(200).json({ message: 'Adicionado com sucesso', ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get = async (req, res) => {
  try {
    res.status(200).json({ message: 'teste' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post(DEFAULT_PATH, post);
router.get(DEFAULT_PATH, get);

app.use('/', router);

export default app;
