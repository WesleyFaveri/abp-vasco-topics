import { Users } from 'controllers';

async function validateUser (req, res, next) {
  let user = null;

  if (req.session?.userId) {
    user = await Users.find(req.session.userId);
  }

  req.user = user;

  next();
}

export default validateUser;
