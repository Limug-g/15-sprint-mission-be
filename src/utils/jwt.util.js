import { config } from '#config';
import { usersRepository } from '#repositories';
import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, config.JWT_ACCESS_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
}

// JWT의 accessToken 발급 및 검증 과정

export function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, config.JWT_REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
}
// JWT의 refreshToken 발급 및 검증 과정

export function generateAllToken(user) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}
// 두 토큰 한번에 발급

export function verifyToken(token, tokenType = 'access') {
  if (!token || !['access', 'refresh'].includes(tokenType)) return null;

  const secret =
    tokenType === 'access'
      ? config.JWT_ACCESS_SECRET
      : config.JWT_REFRESH_SECRET;
  try {
    return jwt.verify(token, secret, {
      algorithms: ['HS256'],
    });
  } catch {
    return null;
  }
}

export function shouldRefreshToken(payload) {
  if (!payload.exp) return false; //-> 얼리리턴

  const lastExpiration = payload.exp - Math.floor(Date.now() / 1000);
  return lastExpiration > 0 && lastExpiration < 5 * 60;
  //-> sholdRefreshToken 함수 값 = true: 재발급 가능
}

export async function refreshTokens(refreshToken, expectedUserId) {
  const payload = verifyToken(refreshToken, 'refresh');
  if (!payload || payload.userId !== expectedUserId) return null;

  //토큰을 재발급 해줄 사용자를 찾아야됨
  const user = await usersRepository.findById(payload.userId);
  if (!user) return null;

  return generateAllToken({ id: user.id });
}
