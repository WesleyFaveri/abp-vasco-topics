import models from 'models';

const { Topic, User } = models;

const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;

const getLimitOffset = ({ query }) => {
  if (query && query.limit && query.offset) {
    return {
      limit: query.limit,
      offset: query.offset,
    };
  }

  return {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
  };
}

const listAllUser = async (req, res) => {
  const { limit, offset } = getLimitOffset(req);
  const { id } = req.params;

  const result = await Topic.findAndCountAll({ order: [["createdAt", "DESC"]], where: { UserId: id }, limit, offset, include: [User] });

  result.topics = result.rows
  delete result.rows

  return res.json(result);
};

const listAll = async (req, res) => {
  const { limit, offset } = getLimitOffset(req);

  const result = await Topic.findAndCountAll({ order: [["createdAt", "DESC"]], limit, offset, include: [User] });

  result.topics = result.rows
  delete result.rows

  return res.json(result);
};

const listMine = async (req, res) => {
  const { user: { id: UserId } } = req;

  const topics = await Topic.findAll({ order: [["createdAt", "DESC"]], where: { UserId: UserId }, include: [User] });

  return res.json(topics);
};

const findOne = async (req, res) => {
  const { id } = req.params;

  const topic = await Topic.findOne({
    where: {
      id,
    }
  });

  if (!!topic) {
    return res.json(topic);
  } else {
    return res.status(404).json({ error: "Publicação não encontrada" });
  }
};

const create = async (req, res) => {
  const { user: { id: UserId } } = req;
  const newTopic = await Topic.create({ ...req.body, UserId });

  return res.json(newTopic);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { user: { id: UserId } } = req;


  try {
    const newTopic = await Topic.update(req.body, {
      where: {
        id,
        UserId,
      },
      returning: true,
    });

    if (newTopic && newTopic[0] && newTopic[0] > 0) {
      res.json({ topic: newTopic });
    } else {
      return res.status(500).json({ error: 'Não foi possível encontrar o tópico' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { user: { id: UserId } } = req;

  try {
    const result = await Topic.destroy({
      where: {
        id,
        UserId
      },
    });
    if (result) {
      res.json({ success: !!result });
    } else {
      return res.status(500).json({ error: 'Não foi possível encontrar o tópico' });
    }

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export default {
  listAll,
  listMine,
  listAllUser,
  findOne,
  create,
  update,
  destroy,
};
