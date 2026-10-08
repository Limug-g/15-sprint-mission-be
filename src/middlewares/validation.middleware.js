import { ERROR_MESSAGE } from '#constants';
import { flattenError } from 'zod/v4/core';
import { BadRequestException } from '../errors/Bad-request-excep.js';

export function validate(target, schema) {
  if (!['body', 'params', 'query'].includes(target)) {
    throw new Error(`지원하지 않는 검증 대상입니다.: ${target}`);
  }

  return (req, _res, next) => {
    const result = schema.safeParse(req[target]);
    //zod에 있는 메서드: 에러가 났을 때 {success: true, data} 이런 형식의 리턴을 보냄

    if (!result.success) {
      const { fieldErrors, formErrors } = flattenError(result.error);
      throw new BadRequestException(
        ERROR_MESSAGE.VALIDATION_FAILED,
        fieldErrors,
        formErrors,
      );
    }

    req.validated = {
      ...req.validated,
      [target]: result.data,
    };
    //-> ...req.validated 처럼 스프레드 연산자로 쓰는 이유
    // validate라는 함수 자체를 한 라우트에서 여러번 적용할 수 있기 때문에
    // ...을 사용해서 배열 형태로 누적되도록 두는 것이 좋다 그래야 서로 덮어씌어지지 않는다.
    return next();
  };
}
