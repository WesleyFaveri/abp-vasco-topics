import models from 'models';
import { encryptSHA256 } from 'utils';
const { User } = models;

const DEFAULT_ATTR = ['id', 'name', 'surname', 'email', 'createdAt'];

const listAll = async (req, res) => {
  const users = await User.findAll({ attributes: DEFAULT_ATTR, order: [["id", "ASC"]] });

  return res.json(users);
};

const findOne = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: DEFAULT_ATTR,
    where: {
      id,
    }
  });

  if (!!user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
};

const create = async (req, res, returnReq = true) => {
  const newUser = await User.create({
    ...req.body,
    password: encryptSHA256(req.body.password),
  });

  if (returnReq) {
    return res.json(newUser);
  }

  return newUser;
};

const update = async (req, res) => {
  const { id } = req.params;

  const newUser = await User.update(req.body, {
    where: {
      id,
    },
  });

  res.json({ user: newUser });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await User.destroy({
    where: {
      id,
    },
  });

  res.json({ success: !!result });
};

const findCreateUpdate = async (user) => {
  const dbUser = await User.findOne({
    where: {
      email: user.email,
    }
  });

  if (dbUser) {
    const newUser = await User.update(user, {
      where: {
        id,
      },
    });

    return { ...newUser, created: false };
  } else {
    const newUser = await User.create(user);

    return { ...newUser, created: false };
  }
}

const find = async (sessionId) => {
  const user = await User.findOne({ where: { id: sessionId }});

  return user;
}

const findByEmailPassword = (email, password) => User.findOne({
  attributes: ["id", "name", "email"],
  where: {
    email,
    password: encryptSHA256(password),
  },
  raw: true,
});

export default {
  listAll,
  findOne,
  create,
  update,
  destroy,
  find,
  findByEmailPassword,
};
