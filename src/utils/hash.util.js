import bcrypt from 'bcrypt';

const BCRYPT_COST = 10;

export function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function comparePassword(password, passwordhash) {
  try {
    return await bcrypt.compare(password, passwordhash);
  } catch (error) {
    console.log(error);
    return false;
  }
}
