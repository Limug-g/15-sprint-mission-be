import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '../config/config.js';

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  omit: {
    user: { password: true },
  }, //-> omit 을 넣어주면 유저 조회시 패스워드가 자동으로 빠짐
});
