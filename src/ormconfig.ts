
const baseConfig = {
  name: 'default',
  type: 'postgres',
  entities: ['src/core/entities/*.ts'],
  migrations: ['src/core/migrations/*.ts'],
  logging: true,
  cli: {
    migrationsDir: 'src/core/migrations',
    entitiesDir: 'src/core/entities',
  },
};

export default {
  ...baseConfig,
  url: process.env.DATABASE_URL,
}