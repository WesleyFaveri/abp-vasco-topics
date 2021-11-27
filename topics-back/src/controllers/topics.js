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

const listAll = async (req, res) => {
  const { limit, offset } = getLimitOffset(req);

  const result = await Topic.findAndCountAll({ order: [["createdAt", "DESC"]], limit, offset, include: [User] });

  result.topics = result.rows
  delete result.rows

  return res.json(result);
};

const listMine = async (req, res) => {
  const { user: { id: userId } } = req;

  const topics = await Topic.findAll({ order: [["createdAt", "DESC"]], where: { UserId: userId }, include: [User] });

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
  const newTopic = await Topic.create(req.body);

  return res.json(newTopic);
};

const update = async (req, res) => {
  const { id } = req.params;

  const newTopic = await Topic.update(req.body, {
    where: {
      id,
    },
  });

  res.json({ topic: newTopic });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await Topic.destroy({
    where: {
      id,
    },
  });

  res.json({ success: !!result });
};

export default {
  listAll,
  listMine,
  findOne,
  create,
  update,
  destroy,
};
