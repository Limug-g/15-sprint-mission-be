import { ERROR_MESSAGE } from '#constants';
import {
  refreshTokens,
  setAuthCookies,
  shouldRefreshToken,
  verifyAccessToken,
} from '#utils';
import { UnAuthorizedException } from '../error/UnAuthorized-excep.js';

export async function authMiddleware(req, res, next) {
  const { accessToken, refreshToken } = req.cookies;
  const payload = verifyAccessToken(accessToken, 'access'); //->secret이 추가 되었음

  if (!payload || !Number.isInteger(payload.userId)) {
    throw new UnAuthorizedException(ERROR_MESSAGE.ACCESS_TOKEN_REQUIRED);
  }

  req.user = { id: payload.userId };

  if (refreshToken && shouldRefreshToken(payload)) {
    const tokens = await refreshTokens(refreshToken, payload.userId);
    if (tokens) setAuthCookies(res, tokens);
  }
  return next();
}
