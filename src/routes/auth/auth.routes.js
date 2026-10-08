import express from 'express';
import { usersRepository } from '#repositories';
import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { UnAuthorizedException } from '#errors';
import {
  comparePassword,
  generateAllToken,
  hashPassword,
  setAuthCookies,
} from '#utils';
import { validate } from '../../middlewares/validation.middleware.js';
import { loginSchema, signUpSchema } from './auth.schema.js';
import { ConflictException } from '#errors';

export const authRouter = express.Router();

//회원가입 라우터
authRouter.post('/signup', validate('body', signUpSchema), async (req, res) => {
  const { email, password, name } = req.validated.body;

  const existEmail = await usersRepository.findByEmail(email);
  if (existEmail) {
    throw new ConflictException('이미 사용중인 이메일 입니다.');
  }

  const hashedPassword = await hashPassword(password);
  const user = await usersRepository.create({
    email,
    password: hashedPassword,
    name,
  });

  //토큰 발급
  setAuthCookies(res, generateAllToken(user));
  return res.status(HTTP_STATUS.CREATED).json(user);
});

//로그인 라우터
authRouter.post('/login', validate('body', loginSchema), async (req, res) => {
  const { email, password } = req.validated.body;

  const user = await usersRepository.findByEmail(email);

  if (!user) {
    throw new UnAuthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnAuthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  //토큰 발급
  setAuthCookies(res, generateAllToken(user));
  //응답에 패스워드를 빼고 토큰과 나머지 데이터를 유저에게 넘겨준다.
  const { password: _, ...rest } = user;
  return res.status(HTTP_STATUS.OK).json(rest);
});
