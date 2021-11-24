import { Users } from 'controllers';
import expressJwt from 'express-jwt';

async function validateUser (req, res, next) {
  let user = null;

  if (req.session?.userId) {
    user = await Users.find(req.session.userId);
  }

  req.user = user;

  next();
}

export default {
  validateUser,
  tokenMiddleware: expressJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
};
