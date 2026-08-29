import { defineCofig, env } from 'prisma/config';

export default defineCofig({
  schema: 'prisma/schema.prisma',
  migration: {
    path: 'prisma/migration',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
