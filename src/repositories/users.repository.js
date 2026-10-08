import { prisma } from '#db/prisma.js';

//CRUD DB와 연결만 하는 곳

function create(data) {
  return prisma.user.create({ data });
}

function findById(userId) {
  return prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
}

function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    omit: { password: false },
  });
}

function findAll() {
  return prisma.user.findMany();
}

function update(userId, data) {
  return prisma.user.update({
    where: { id: Number(userId) },
    data,
  });
}

function remove(userId) {
  return prisma.user.delete({
    where: { id: Number(userId) },
  });
}

function findArticlesWithuserId(userId) {
  return prisma.user.findUnique({
    where: { id: Number(userId) },
    include: { articles: { select: { id: true, name: true } } },
  });
}

function findItemsWithuserId(userId) {
  return prisma.user.findUnique({
    where: { id: Number(userId) },
    include: { items: { select: { id: true, name: true } } },
  });
}

export const usersRepository = {
  create,
  findById,
  findByEmail,
  findAll,
  update,
  remove,
  findArticlesWithuserId,
  findItemsWithuserId,
};
