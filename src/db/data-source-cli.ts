import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Substituir __dirname e __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;