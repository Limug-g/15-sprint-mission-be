// 파일: src/utils/cookie.util.js
import { config } from '#config';

const authCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};
//-> 쿠키 옵션을 하나로 묶어서 응답 쿠키헤더에 넣어준다

export function setAuthCookies(res, { accessToken, refreshToken }) {
  res.cookie('accessToken', accessToken, {
    ...authCookieOptions,
    maxAge: 15 * 60 * 1000, // 15분
  });
  res.cookie('refreshToken', refreshToken, {
    ...authCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  });
}
//-> 응답에 쿠키헤더를 심어주는 과정 setAuthCookies
