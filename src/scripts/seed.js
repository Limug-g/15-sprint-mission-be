// 파일: scripts/seed.js
import { faker } from '@faker-js/faker';
import { PrismaClient } from '#generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { assertSafeSeedTarget, resetBlogData } from './seed-safety.js';

const NUM_USERS_TO_CREATE = 10;

const makeUserInput = (index) => ({
  email: `user${index}@example.com`,
  name: faker.person.fullName(),
});

const makePostInput = (writerId) => ({
  title: faker.lorem.sentence({ min: 3, max: 8 }),
  content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
  writerId,
});

async function seed(prisma) {
  const userData = Array.from({ length: NUM_USERS_TO_CREATE }, (_, index) =>
    makeUserInput(index + 1),
  );

  // 1. 부모 User 생성
  const users = await prisma.user.createManyAndReturn({ data: userData });

  // 2. 부모 ID를 가진 자식 Post 입력 생성
  const articleData = [];
  for (const user of users) {
    const count = faker.number.int({ min: 1, max: 5 });
    for (let index = 0; index < count; index += 1) {
      articleData.push(makePostInput(user.id));
    }
  }

  // 3. 자식 Post 생성
  await prisma.article.createMany({ data: articleData });

  return { userCount: users.length, articleCount: articleData.length };
}

async function main(prisma) {
  assertSafeSeedTarget({
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    args: process.argv,
  });

  await resetBlogData(prisma);
  const result = await seed(prisma);

  console.log(`${result.userCount}명의 사용자가 생성되었습니다.`);
  console.log(`${result.articleCount}개의 게시글이 생성되었습니다.`);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

main(prisma)
  .catch((error) => {
    console.error('시딩 오류:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
