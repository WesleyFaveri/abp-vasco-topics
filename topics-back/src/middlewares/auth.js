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

const verifyToken = (req, res, next) => {
  const { 'x-access-token': token } = req.headers;
  console.log(token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.session.userId = decoded.id;

    next();
  });
};

export default {
  validateUser,
  authMiddleware: verifyToken,
};
