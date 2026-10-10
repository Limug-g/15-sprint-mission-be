// 파일: src/routes/auth/auth.schemas.js
import { Buffer } from 'node:buffer';
import { z } from 'zod';

function fitsBcryptInput(password) {
  return Buffer.byteLength(password, 'utf8') <= 72;
}
//Buffer: 입력 데이터의 바이트 수를 조절할 수 있는 클래스

export const signUpSchema = z.object({
  email: z.email('유효한 이메일 형식이 아닙니다.'),
  password: z
    .string({ error: '비밀번호는 필수입니다.' })
    .min(10, '비밀번호는 10자 이상이어야 합니다.')
    .refine(fitsBcryptInput, '비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.'),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.').optional(),
});

export const loginSchema = z.object({
  email: z.email('유효한 이메일 형식이 아닙니다.'),
  password: z
    .string({ error: '비밀번호는 필수입니다.' })
    .min(10, '비밀번호는 10자 이상이어야 합니다.')
    .refine(fitsBcryptInput, '비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.'),
});
