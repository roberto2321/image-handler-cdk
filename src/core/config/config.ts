import { getEnvString } from '../utils/funcs';

export const CONFIG = {
  stage: getEnvString('STAGE'),
  db: {
    type: 'postgres',
    host: getEnvString('DATABASE_HOST'),
    port: parseInt(getEnvString('DATABASE_PORT')),
    username: getEnvString('DATABASE_USER'),
    database: getEnvString('DATABASE_NAME'),
    password: getEnvString('DATABASE_PASSWORD')
  },
  db_prod: {
    type: 'aurora-data-api-pg',
    database: getEnvString('DATABASE_NAME'),
    resourceArn: getEnvString('DATABASE_CLUSTER_ARN'),
    secretArn: getEnvString('DATABASE_SECRET_ARN'),
    region: getEnvString('AWS_REGION'),
  }
}