import { prisma } from '#db/prisma.js';

//CRUD DB와 연결만 하는 곳

const ARTICLE_WRITER_SELECT = {
  writer: { select: { id: true, name: true } },
};

function create(data) {
  return prisma.article.create({ data });
}

function findById(articleId, writerId) {
  return prisma.article.findUnique({
    where: {
      id: Number(articleId),
    },
    include: {
      writer: { select: { id: true, name: true } },
      _count: { select: { articleLikes: true } },
      articleLikes: writerId ? { where: writerId } : false,
    },
  });
}

function findAll({
  published,
  page = 1,
  limit = 10,
  include = ARTICLE_WRITER_SELECT,
} = {}) {
  return prisma.article.findMany({
    where: typeof published === 'boolean' ? { published } : {},
    skip: (page - 1) * limit,
    take: limit,
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    ...(include && { include }),
  });
}

function update(articleId, data) {
  return prisma.article.update({
    where: {
      id: Number(articleId),
    },
    data,
  });
}

function remove(articleId) {
  return prisma.article.delete({
    where: {
      id: Number(articleId),
    },
  });
}

export const articleRepository = {
  create,
  findById,
  findAll,
  update,
  remove,
};
