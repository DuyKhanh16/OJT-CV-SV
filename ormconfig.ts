/* eslint-disable @typescript-eslint/no-var-requires */
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;
const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST||"mysql-20396d72-duykhanh16121993.b.aivencloud.com",
  port: Number(process.env.DB_PORT||19656),
  username: process.env.DB_USERNAME||"avnadmin", 
  password: process.env.DB_PASSWORD,
  type: 'mysql',
  database: process.env.DB_NAME, 
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  // autoSchemaSync: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
