import express from 'express';
import { usersRepository } from '#repositories';
import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '#errors';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await usersRepository.findAll();

  res.status(200).json({
    success: true,
    data: users,
  });
});

userRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await usersRepository.findById(userId);

  res.json({ success: true, data: user });
});

userRouter.post('/', async (req, res) => {
  const { email, name } = req.body ?? {};

  if (!email || !name) {
    throw new BadRequestException('필수 정보가 누락 되었습니다.');
  }

  const exists = await usersRepository.findByEmail(email);
  if (exists) {
    throw new ConflictException('이메일이 중복 되었습니다.');
  }

  const user = await usersRepository.create({ email, name });
  res.status(HTTP_STATUS.CREATED).json({ success: true, data: user });
});

user


userRouter.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { email, name } = req.body ?? {};

  if (!email || !name) {
    throw new BadRequestException('필수 정보가 누락 되었습니다.');
  }

  const exists = await usersRepository.findByEmail(email);
  if (exists) {
    throw new ConflictException('이메일이 중복 되었습니다.');
  }

  const updated = await usersRepository.update(userId, { email, name });
  res.json({
    success: true,
    data: updated,
  });
});

userRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  await usersRepository.remove(userId);
  res.sendStatus(HTTP_STATUS.OK);
});

userRouter.get('/:userId/articles', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new BadRequestException(ERROR_MESSAGE.REQUIRED_USER_ID);
  }

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
  }

  const data = await usersRepository.findArticlesWithuserId(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});
