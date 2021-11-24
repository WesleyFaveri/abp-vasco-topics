import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Users } from 'controllers';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const DEFAULT_PATH = '/auth';

const app = express();
const router = express.Router();

const post = async (req, res) => {
  try {
    const { token }  = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payloadUser = ticket.getPayload();

    const user = await Users.findCreateUpdate(payloadUser)

    req.session.userId = user.id;

    res.status(201)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApi = async (req, res) => {
  try {
    await req.session.destroy();

    res.status(200);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get = async (req, res) => {
  try {
    res.status(200)
    res.json(req.user)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findByEmailPassword(email, password);

    if (!!user) {
      const token = jwt.sign(user, process.env.TOKEN_SECRET);

      res.json({
        user,
        token,
        success: true,
        error: false,
      });
    } else {
      res.status(401).json({ error: "Usuário e/ou Senha inválido(s)" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const user = await Users.create(req, res, false);

    const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET);

    res.json({
      user,
      token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

router.post('/google', post);
router.delete('/logout', deleteApi);
router.get('/me', get);
router.post('/login', login);
router.post('/register', register);

app.use(DEFAULT_PATH, router);

export default app;
